import { temperaturePV, temperatureTank } from "@/app/(main)/risk-based-inspection/tab-menu/pof-rbi-date/external-corrosion/operatingTemperature";
import IGeneralData from "@/types/IGeneralData";
import IRBIThinning from "@/types/IRBIThinning";
import { calculateThinning } from "./calcRBIThinningValue";
import IRBIExCor from "@/types/IRBIExCor";
import { conditional, prior } from "@/app/(main)/risk-based-inspection/tab-menu/pof-rbi-date/thinning/probabilityTable";
import ncdf from "./cumulativeDistribution";

export const calculateExCor = (generalData: IGeneralData, thinning: IRBIThinning, exCor: IRBIExCor, componentType: string = "") => {
    if(!Object.keys(generalData).length) return {}
    
    const {
        age,
        rbiDateObj,
        startingDateObj,
        lastInspDateObj,
        allowableStressKpa,
        shellStrengthRatio,
        headStrengthRatio,
        ageTimeInServiceTk,
        tMinMM,
    } = calculateThinning(generalData, thinning)
    
    const {
        gData_operatingTemperatureC,
        gData_headMinimumThicknessInch,
        gData_headMinimumThicknessMM,
        gData_startingDate,
        gData_shellMinimumThicknessMM,
        gData_shellMinimumThicknessInch,
        gData_yieldStrength,
        gData_tensileStrength,
        gData_jointEfficiency,
        gData_shellTreqMM,
        gData_headTreqMM,
        gData_lastInspection,
        gData_operatingTemperatureF
    } = generalData;
    
    const {
        rbiThinning_nInspA,
        rbiThinning_nInspB,
        rbiThinning_nInspC,
        rbiThinning_nInspD,
        rbiThinning_tMinInch,
        rbiThinning_tMinMM,
    } = thinning
    
    let baseCRb;
    let temperatureList; 
    
    if(["Pressure Vessel", "Pipe"].includes(componentType)) {
        temperatureList = temperaturePV.map(i => i.operating)
        baseCRb = interpolationTemperature(gData_operatingTemperatureC, temperaturePV, temperatureList)
    } else if (["Tank"].includes(componentType)) {
        temperatureList = temperatureTank.map(i => i.operating)
        baseCRb = interpolationTemperature(gData_operatingTemperatureF, temperatureTank, temperatureList)
    }

    // if( !temperatureList?.includes(gData_operatingTemperatureC) ) {
    // }

    const finalCR = baseCRb! * (Math.max(exCor?.rbiExCor_equationDesign, exCor?.rbiExCor_interface))

    const ageCoat = Math.abs(rbiDateObj - startingDateObj) * 3.168E-11 || null

    const adjCoat = Math.min(5, ageCoat!) - Math.min(5, ageCoat! - age!)

    const shellArt = finalCR * ageTimeInServiceTk! / gData_shellMinimumThicknessMM

    const headArt = finalCR * ageTimeInServiceTk! / gData_headMinimumThicknessMM

    const flowStress = ((Number(gData_yieldStrength) + Number(gData_tensileStrength)) / 2) * gData_jointEfficiency * 1.1

    // const shellStrengthRatio = ((Number(allowableStressKpa)! * gData_jointEfficiency) / flowStress) * (Math.max(gData_shellTreqMM, gData_shellTreqMM) / gData_shellMinimumThicknessMM)
    // const headStrengthRatio = ((Number(allowableStressKpa)! * gData_jointEfficiency) / flowStress) * (Math.max(gData_headTreqMM, gData_headTreqMM) / gData_headMinimumThicknessMM)

    const inspectionI1 = prior[0].medium * ((conditional[0].a) ** rbiThinning_nInspA) * ((conditional[0].b) ** rbiThinning_nInspB) * ((conditional[0].c) ** rbiThinning_nInspC) * ((conditional[0].d) ** rbiThinning_nInspD)
    
    const inspectionI2 = prior[1].medium * ((conditional[1].a) ** rbiThinning_nInspA) * ((conditional[1].b) ** rbiThinning_nInspB) * ((conditional[1].c) ** rbiThinning_nInspC) * ((conditional[1].d) ** rbiThinning_nInspD)
    
    const inspectionI3 = prior[2].medium * ((conditional[2].a) ** rbiThinning_nInspA) * ((conditional[2].b) ** rbiThinning_nInspB) * ((conditional[2].c) ** rbiThinning_nInspC) * ((conditional[2].d) ** rbiThinning_nInspD)

    const posteriorP1 = inspectionI1 / (inspectionI1 + inspectionI2 + inspectionI3)
    const posteriorP2 = inspectionI2 / (inspectionI1 + inspectionI2 + inspectionI3)
    const posteriorP3 = inspectionI3 / (inspectionI1 + inspectionI2 + inspectionI3)

    const damageState1 = 1
    const damageState2 = 2
    const damageState3 = 4
    const covDt = 0.2
    const covSf = 0.2
    const covP = 0.05

    const shellRBIBeta1 = ((1 - (damageState1 * shellArt)) - Number(shellStrengthRatio)) / (((damageState1 ** 2) * (shellArt ** 2) * (covDt ** 2)) + (((1 - (damageState1 * shellArt)) ** 2) * (covSf ** 2)) + ((Number(shellStrengthRatio) ** 2) * (covP ** 2))) ** 0.5
    const shellRBIBeta2 = ((1 - (damageState2 * shellArt)) - Number(shellStrengthRatio)) / (((damageState2 ** 2) * (shellArt ** 2) * (covDt ** 2)) + (((1 - (damageState2 * shellArt)) ** 2) * (covSf ** 2)) + ((Number(shellStrengthRatio) ** 2) * (covP ** 2))) ** 0.5
    const shellRBIBeta3 = ((1 - (damageState3 * shellArt)) - Number(shellStrengthRatio)) / (((damageState3 ** 2) * (shellArt ** 2) * (covDt ** 2)) + (((1 - (damageState3 * shellArt)) ** 2) * (covSf ** 2)) + ((Number(shellStrengthRatio) ** 2) * (covP ** 2))) ** 0.5

    const headRBIBeta1 = ((1 - (damageState1 * headArt)) - headStrengthRatio!) / (((damageState1 ** 2) * (headArt ** 2) * (covDt ** 2)) + (((1 - (damageState1 * headArt)) ** 2) * (covSf ** 2)) + ((headStrengthRatio! ** 2) * (covP ** 2))) ** 0.5
    const headRBIBeta2 = ((1 - (damageState2 * headArt)) - headStrengthRatio!) / (((damageState2 ** 2) * (headArt ** 2) * (covDt ** 2)) + (((1 - (damageState2 * headArt)) ** 2) * (covSf ** 2)) + ((headStrengthRatio! ** 2) * (covP ** 2))) ** 0.5
    const headRBIBeta3 = ((1 - (damageState3 * headArt)) - headStrengthRatio!) / (((damageState3 ** 2) * (headArt ** 2) * (covDt ** 2)) + (((1 - (damageState3 * headArt)) ** 2) * (covSf ** 2)) + ((headStrengthRatio! ** 2) * (covP ** 2))) ** 0.5

    const rbiShellSection = ((posteriorP1 * (ncdf(-shellRBIBeta1))) + (posteriorP2 * (ncdf(-shellRBIBeta2))) + (posteriorP3 * (ncdf(-shellRBIBeta3)))) / 0.000156
    const rbiHeadSection = ((posteriorP1 * (ncdf(-headRBIBeta1))) + (posteriorP2 * (ncdf(-headRBIBeta2))) + (posteriorP3 * (ncdf(-headRBIBeta3)))) / 
    0.000156

    return {
        age,
        thicknessMM: componentType == "Tank" ? exCor.rbiExCor_tMinInch : gData_shellMinimumThicknessInch,
        thicknessInch: componentType == "Tank" ? exCor.rbiExCor_tMinMM : gData_shellMinimumThicknessMM,
        baseCRb,
        finalCR,
        ageCoat,
        adjCoat,
        shellArt,
        headArt,
        flowStress,
        shellStrengthRatio,
        headStrengthRatio,
        inspectionI1,
        inspectionI2,
        inspectionI3,
        posteriorP1,
        posteriorP2,
        posteriorP3,
        shellRBIBeta1,
        shellRBIBeta2,
        shellRBIBeta3,
        headRBIBeta1,
        headRBIBeta2,
        headRBIBeta3,
        rbiShellSection,
        rbiHeadSection,
        ageTimeInServiceTk
    }
}

const interpolationTemperature = (T: any, temperatureInterpolation: any, temperatureList: any) => {
    const indexInterpolation = temperatureList.findIndex((i: any) => T < i)
    const x1 = temperatureInterpolation[indexInterpolation - 1].operating
    const x2 = temperatureInterpolation[indexInterpolation].operating

    const y1 = temperatureInterpolation[indexInterpolation - 1].arid
    const y2 = temperatureInterpolation[indexInterpolation].arid

    return y1 + (((T - x1) / (x2 - x1)) * (y2 - y1))
}
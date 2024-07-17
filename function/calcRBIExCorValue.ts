import { temperature as temperatureInterpolation } from "@/app/(main)/risk-based-inspection/tab-menu/pof-rbi-date/external-corrosion/operatingTemperature";
import IGeneralData from "@/types/IGeneralData";
import IRBIThinning from "@/types/IRBIThinning";
import { calculateThinning } from "./calcRBIThinningValue";
import IRBIExCor from "@/types/IRBIExCor";
import { conditional, prior } from "@/app/(main)/risk-based-inspection/tab-menu/pof-rbi-date/thinning/probabilityTable";
import ncdf from "./cumulativeDistribution";

const temperatureList = temperatureInterpolation.map(i => i.operating)
export const calculateExCor = (generalData: IGeneralData, thinning: IRBIThinning, exCor: IRBIExCor ) => {
    if(!Object.keys(generalData).length) return {}

    const {
        age,
        rbiDateObj,
        startingDateObj,
        lastInspDateObj,
        allowableStressKpa,
        shellStrengthRatio
    } = calculateThinning(generalData, thinning)

    const {
        gData_operatingTemperatureC,
        gData_headMinimumThicknessInch,
        gData_headMinimumThicknessMM,
        gData_startingDate,
        gData_shellMinimumThicknessMM,
        gData_yieldStrength,
        gData_tensileStrength,
        gData_jointEfficiency,
        gData_shellTreqMM,
        gData_headTreqMM,
        gData_lastInspection
    } = generalData;

    const {
        rbiThinning_nInspA,
        rbiThinning_nInspB,
        rbiThinning_nInspC,
        rbiThinning_nInspD,
    } = thinning

    let baseCRb;
    if( !temperatureList.includes(gData_operatingTemperatureC) ) {
        baseCRb = interpolationTemperature(generalData)
    }

    const finalCR = baseCRb! * (Math.max(exCor?.rbiExCor_equationDesign, exCor?.rbiExCor_interface))

    const ageCoat = Math.abs(rbiDateObj - startingDateObj) * 3.168E-11 || null

    const adjCoat = Math.min(5, ageCoat!) - Math.min(5, ageCoat! - age!)

    const timeInService: number = Math.abs(rbiDateObj - lastInspDateObj) * 3.169E-11

    const shellArt = finalCR * timeInService / gData_shellMinimumThicknessMM

    const headArt = finalCR * timeInService / gData_headMinimumThicknessMM

    const flowStress = ((gData_yieldStrength + gData_tensileStrength) / 2) * gData_jointEfficiency * 1.1

    // const shellStrengthRatio = ((Number(allowableStressKpa)! * gData_jointEfficiency) / flowStress) * (Math.max(gData_shellTreqMM, gData_shellTreqMM) / gData_shellMinimumThicknessMM)

    const headStrengthRatio = ((Number(allowableStressKpa)! * gData_jointEfficiency) / flowStress) * (Math.max(gData_headTreqMM, gData_headTreqMM) / gData_headMinimumThicknessMM)

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

    const headRBIBeta1 = ((1 - (damageState1 * headArt)) - headStrengthRatio) / (((damageState1 ** 2) * (headArt ** 2) * (covDt ** 2)) + (((1 - (damageState1 * headArt)) ** 2) * (covSf ** 2)) + ((headStrengthRatio ** 2) * (covP ** 2))) ** 0.5
    const headRBIBeta2 = ((1 - (damageState2 * headArt)) - headStrengthRatio) / (((damageState2 ** 2) * (headArt ** 2) * (covDt ** 2)) + (((1 - (damageState2 * headArt)) ** 2) * (covSf ** 2)) + ((headStrengthRatio ** 2) * (covP ** 2))) ** 0.5
    const headRBIBeta3 = ((1 - (damageState3 * headArt)) - headStrengthRatio) / (((damageState3 ** 2) * (headArt ** 2) * (covDt ** 2)) + (((1 - (damageState3 * headArt)) ** 2) * (covSf ** 2)) + ((headStrengthRatio ** 2) * (covP ** 2))) ** 0.5

    const rbiShellSection = ((posteriorP1 * (ncdf(-shellRBIBeta1))) + (posteriorP2 * (ncdf(-shellRBIBeta2))) + (posteriorP3 * (ncdf(-shellRBIBeta3)))) / 0.000156
    const rbiHeadSection = ((posteriorP1 * (ncdf(-headRBIBeta1))) + (posteriorP2 * (ncdf(-headRBIBeta2))) + (posteriorP3 * (ncdf(-headRBIBeta3)))) / 
    0.000156

    return {
        age,
        thicknessMM: gData_headMinimumThicknessMM,
        thicknessInch: gData_headMinimumThicknessInch,
        baseCRb,
        finalCR,
        ageCoat,
        adjCoat,
        timeInService,
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
    }
}

const interpolationTemperature = (generalData: IGeneralData) => {
    const { gData_operatingTemperatureC } = generalData;
    const indexInterpolation = temperatureList.findIndex(i => gData_operatingTemperatureC < i)
    const x1 = temperatureInterpolation[indexInterpolation - 1].operating
    const x2 = temperatureInterpolation[indexInterpolation].operating

    const y1 = temperatureInterpolation[indexInterpolation - 1].arid
    const y2 = temperatureInterpolation[indexInterpolation].arid

    return y1 + (((gData_operatingTemperatureC - x1) / (x2 - x1)) * (y2 - y1))
}
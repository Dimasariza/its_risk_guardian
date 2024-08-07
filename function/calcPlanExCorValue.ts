import { temperaturePV, temperatureTank } from "@/app/(main)/risk-based-inspection/tab-menu/pof-plan-date/external-corrosion/operatingTemperature";
import IGeneralData from "@/types/IGeneralData";
import { conditional, prior } from "@/app/(main)/risk-based-inspection/tab-menu/pof-plan-date/thinning/probabilityTable";
import ncdf from "./cumulativeDistribution";
import { calculateThinning } from "./calcPlanThinningValue";
import IPlanThinning from "@/types/IPlanThinning";
import IPlanExCor from "@/types/IPlanExCor";

export const calculateExCor = (generalData: IGeneralData, thinning: IPlanThinning, exCor: IPlanExCor, componentType: string = "") => {
    if(!Object.keys(generalData).length) return {}

    const {
        age,
        planDateObj,
        startingDateObj,
        lastInspDateObj,
        allowableStressKpa,
        shellStrengthRatio,
        headStrengthRatio,
        ageTimeInServiceTk
    } = calculateThinning(generalData, thinning)

    const {
        gData_operatingTemperatureC,
        gData_operatingTemperatureF,
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
    } = generalData;

    const {
        planThinning_nInspA,
        planThinning_nInspB,
        planThinning_nInspC,
        planThinning_nInspD,
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

    const finalCR = baseCRb! * (Math.max(exCor?.planExCor_equationDesign, exCor?.planExCor_interface))

    const ageCoat = Math.abs(planDateObj - startingDateObj) * 3.168E-11 || null

    const adjCoat = Math.min(5, ageCoat!) - Math.min(5, ageCoat! - age!)

    const shellArt = finalCR * ageTimeInServiceTk! / gData_shellMinimumThicknessMM

    const headArt = finalCR * ageTimeInServiceTk! / gData_headMinimumThicknessMM

    const flowStress = ((Number(gData_yieldStrength) + Number(gData_tensileStrength)) / 2) * gData_jointEfficiency * 1.1

    // const shellStrengthRatio = ((Number(allowableStressKpa)! * gData_jointEfficiency) / flowStress) * (Math.max(gData_shellTreqMM, gData_shellTreqMM) / gData_shellMinimumThicknessMM)

    // const headStrengthRatio = ((Number(allowableStressKpa)! * gData_jointEfficiency) / flowStress) * (Math.max(gData_headTreqMM, gData_headTreqMM) / gData_headMinimumThicknessMM)

    const inspectionI1 = prior[0].medium * ((conditional[0].a) ** planThinning_nInspA) * ((conditional[0].b) ** planThinning_nInspB) * ((conditional[0].c) ** planThinning_nInspC) * ((conditional[0].d) ** planThinning_nInspD)
    
    const inspectionI2 = prior[1].medium * ((conditional[1].a) ** planThinning_nInspA) * ((conditional[1].b) ** planThinning_nInspB) * ((conditional[1].c) ** planThinning_nInspC) * ((conditional[1].d) ** planThinning_nInspD)
    
    const inspectionI3 = prior[2].medium * ((conditional[2].a) ** planThinning_nInspA) * ((conditional[2].b) ** planThinning_nInspB) * ((conditional[2].c) ** planThinning_nInspC) * ((conditional[2].d) ** planThinning_nInspD)

    const posteriorP1 = inspectionI1 / (inspectionI1 + inspectionI2 + inspectionI3)
    const posteriorP2 = inspectionI2 / (inspectionI1 + inspectionI2 + inspectionI3)
    const posteriorP3 = inspectionI3 / (inspectionI1 + inspectionI2 + inspectionI3)

    const damageState1 = 1
    const damageState2 = 2
    const damageState3 = 4
    const covDt = 0.2
    const covSf = 0.2
    const covP = 0.05

    const shellPlanBeta1 = ((1 - (damageState1 * shellArt)) - Number(shellStrengthRatio)) / (((damageState1 ** 2) * (shellArt ** 2) * (covDt ** 2)) 
    + (((1 - (damageState1 * shellArt)) ** 2) * (covSf ** 2)) 
    + ((Number(shellStrengthRatio) ** 2) * (covP ** 2))) ** 0.5
    const shellPlanBeta2 = ((1 - (damageState2 * shellArt)) - Number(shellStrengthRatio)) / (((damageState2 ** 2) * (shellArt ** 2) * (covDt ** 2)) 
    + (((1 - (damageState2 * shellArt)) ** 2) * (covSf ** 2)) 
    + ((Number(shellStrengthRatio) ** 2) * (covP ** 2))) ** 0.5
    const shellPlanBeta3 = ((1 - (damageState3 * shellArt)) - Number(shellStrengthRatio)) / (((damageState3 ** 2) * (shellArt ** 2) * (covDt ** 2)) 
    + (((1 - (damageState3 * shellArt)) ** 2) * (covSf ** 2)) 
    + ((Number(shellStrengthRatio) ** 2) * (covP ** 2))) ** 0.5

    const headPlanBeta1 = ((1 - (damageState1 * headArt)) - headStrengthRatio!) / (((damageState1 ** 2) * (headArt ** 2) * (covDt ** 2)) + (((1 - (damageState1 * headArt)) ** 2) * (covSf ** 2)) + ((headStrengthRatio! ** 2) * (covP ** 2))) ** 0.5
    const headPlanBeta2 = ((1 - (damageState2 * headArt)) - headStrengthRatio!) / (((damageState2 ** 2) * (headArt ** 2) * (covDt ** 2)) + (((1 - (damageState2 * headArt)) ** 2) * (covSf ** 2)) + ((headStrengthRatio! ** 2) * (covP ** 2))) ** 0.5
    const headPlanBeta3 = ((1 - (damageState3 * headArt)) - headStrengthRatio!) / (((damageState3 ** 2) * (headArt ** 2) * (covDt ** 2)) + (((1 - (damageState3 * headArt)) ** 2) * (covSf ** 2)) + ((headStrengthRatio! ** 2) * (covP ** 2))) ** 0.5

    const planShellSection = ((posteriorP1 * (ncdf(-shellPlanBeta1))) + (posteriorP2 * (ncdf(-shellPlanBeta2))) + (posteriorP3 * (ncdf(-shellPlanBeta3)))) / 0.000156
    const planHeadSection = ((posteriorP1 * (ncdf(-headPlanBeta1))) + (posteriorP2 * (ncdf(-headPlanBeta2))) + (posteriorP3 * (ncdf(-headPlanBeta3)))) / 0.000156

    return {
        age,
        thicknessMM: componentType == "Tank" ? exCor.planExCor_tMinMM : gData_shellMinimumThicknessMM,
        thicknessInch: componentType == "Tank" ? exCor.planExCor_tMinInch : gData_shellMinimumThicknessInch,
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
        shellPlanBeta1,
        shellPlanBeta2,
        shellPlanBeta3,
        headPlanBeta1,
        headPlanBeta2,
        headPlanBeta3,
        planShellSection,
        planHeadSection,
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
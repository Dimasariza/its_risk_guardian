import { conditional, prior } from "@/app/(main)/risk-based-inspection/tab-menu/pof-plan-date/thinning/probabilityTable";
import IGeneralData from "@/types/IGeneralData";
import ncdf from "./cumulativeDistribution";
import IPlanThinning from "@/types/IPlanThinning";

export const calculateThinning = (generalData: IGeneralData, thinning: IPlanThinning) => {
    if(!Object?.keys(generalData).length || !Object?.keys(thinning).length ) return {}
    const {
        gData_lastInspection,
        gData_headTreqInch,
        gData_headTreqMM,
        gData_shellTreqMM,
        gData_yieldStrength,
        gData_tensileStrength,
        gData_jointEfficiency,
        gData_allowableStressKpa,
        gData_shellMinimumThicknessMM,
        gData_headMinimumThicknessMM
    } = generalData as IGeneralData;

    const {
        planThinning_corrosionRate,
        planThinning_planDate,
        planThinning_nInspA,
        planThinning_nInspB,
        planThinning_nInspC,
        planThinning_nInspD,
    } = thinning as IPlanThinning;

    const lastInspDateObj: Date | any = new Date(gData_lastInspection);
    const planDateObj: Date | any = new Date(planThinning_planDate);

    console.log(planThinning_planDate)

    const age: number | null= planDateObj?.getFullYear() - lastInspDateObj?.getFullYear() || null;

    const shellArt: number | null = planThinning_corrosionRate * age! / gData_shellMinimumThicknessMM || null;

    const headArt: number | null = planThinning_corrosionRate * age! / gData_headMinimumThicknessMM || null;

    const flowStress: number | null = (Number(gData_yieldStrength) + Number(gData_tensileStrength)) / 2 * gData_jointEfficiency * 1.1 || null;

    const shellStrengthRatio: number  = (Number(gData_allowableStressKpa) * Number(gData_jointEfficiency)) / flowStress! * Math.max(Number(gData_headTreqMM), Number(gData_headTreqMM)) / gData_shellMinimumThicknessMM;

    const headStrengthRatio: number = (Number(gData_allowableStressKpa) * Number(gData_jointEfficiency)) / flowStress! * Math.max(Number(gData_headTreqMM), Number(gData_headTreqMM)) / gData_headMinimumThicknessMM;

    const inspEffectiveness1: number | null = prior[0].medium * (conditional[0].a ** planThinning_nInspA) * (conditional[0].b ** planThinning_nInspB) * (conditional[0].c ** planThinning_nInspC) * (conditional[0].d ** planThinning_nInspD) || null;
    const inspEffectiveness2: number | null = prior[1].medium * (conditional[1].a ** planThinning_nInspA) * (conditional[1].b ** planThinning_nInspB) * (conditional[1].c ** planThinning_nInspC) * (conditional[1].d ** planThinning_nInspD) || null;
    const inspEffectiveness3: number | null = prior[2].medium * (conditional[2].a ** planThinning_nInspA) * (conditional[2].b ** planThinning_nInspB) * (conditional[2].c ** planThinning_nInspC) * (conditional[2].d ** planThinning_nInspD) || null;

    const postProbability1: number | null = inspEffectiveness1! / (inspEffectiveness1! + inspEffectiveness2! + inspEffectiveness3!) || null;
    const postProbability2: number | null = inspEffectiveness2! / (inspEffectiveness1! + inspEffectiveness2! + inspEffectiveness3!) || null;
    const postProbability3: number | null = inspEffectiveness3! / (inspEffectiveness1! + inspEffectiveness2! + inspEffectiveness3!) || null;

    const shellSectionB1: number | null = ((1 - (parameterBCoef.damageState1 * shellArt!)) - shellStrengthRatio) / (((parameterBCoef.damageState1 ** 2) * (shellArt! ** 2) * (parameterBCoef.thinning ** 2)) + (((1 - (parameterBCoef.damageState1 * shellArt!)) ** 2) * (parameterBCoef.flowStress) ** 2) + ((shellStrengthRatio ** 2) * (parameterBCoef.pressure ** 2))) ** 0.5 || null;

    const shellSectionB2: number | null = ((1 - (parameterBCoef.damageState2 * shellArt!)) - shellStrengthRatio) / (((parameterBCoef.damageState2 ** 2) * (shellArt! ** 2) * (parameterBCoef.thinning ** 2)) + (((1 - (parameterBCoef.damageState2 * shellArt!)) ** 2) * (parameterBCoef.flowStress) ** 2) + ((shellStrengthRatio ** 2) * (parameterBCoef.pressure ** 2))) ** 0.5 || null;

    const shellSectionB3: number | null = ((1 - (parameterBCoef.damageState3 * shellArt!)) - shellStrengthRatio) / (((parameterBCoef.damageState3 ** 2) * (shellArt! ** 2) * (parameterBCoef.thinning ** 2)) + (((1 - (parameterBCoef.damageState3 * shellArt!)) ** 2) * (parameterBCoef.flowStress) ** 2) + ((shellStrengthRatio ** 2) * (parameterBCoef.pressure ** 2))) ** 0.5 || null;

    const headSectionB1: number | null = ((1 - (parameterBCoef.damageState1 * headArt!)) - headStrengthRatio) / (((parameterBCoef.damageState1 ** 2) * (headArt! ** 2) * (parameterBCoef.thinning ** 2)) + (((1 - (parameterBCoef.damageState1 * headArt!)) ** 2) * (parameterBCoef.flowStress) ** 2) + ((headStrengthRatio ** 2) * (parameterBCoef.pressure ** 2))) ** 0.5 || null;

    const headSectionB2: number | null = ((1 - (parameterBCoef.damageState2 * headArt!)) - headStrengthRatio) / (((parameterBCoef.damageState2 ** 2) * (headArt! ** 2) * (parameterBCoef.thinning ** 2)) + (((1 - (parameterBCoef.damageState2 * headArt!)) ** 2) * (parameterBCoef.flowStress) ** 2) + ((headStrengthRatio ** 2) * (parameterBCoef.pressure ** 2))) ** 0.5 || null;

    const headSectionB3: number | null = ((1 - (parameterBCoef.damageState3 * headArt!)) - headStrengthRatio) / (((parameterBCoef.damageState3 ** 2) * (headArt! ** 2) * (parameterBCoef.thinning ** 2)) + (((1 - (parameterBCoef.damageState3 * headArt!)) ** 2) * (parameterBCoef.flowStress) ** 2) + ((headStrengthRatio ** 2) * (parameterBCoef.pressure ** 2))) ** 0.5 || null;

    const shellBaseDF = ((postProbability1! * (ncdf(-shellSectionB1!))) + (postProbability2! * (ncdf(-shellSectionB2!))) + (postProbability3! * (ncdf(-shellSectionB3!)))) / 0.000156;

    const headBaseDF = ((postProbability1! * (ncdf(-headSectionB1!))) + (postProbability2! * (ncdf(-headSectionB2!))) + (postProbability3! * (ncdf(-headSectionB3!)))) / 0.000156;

    return {
        lastInspection: gData_lastInspection,
        lastInspDateObj,
        planDateObj,
        age,
        tMinInch: gData_headTreqInch,
        tMinMM: gData_headTreqMM,
        shellArt,
        headArt,
        flowStress,
        shellStrengthRatio: shellStrengthRatio == Infinity ? null : shellStrengthRatio,
        headStrengthRatio: headStrengthRatio == Infinity ? null : headStrengthRatio,
        inspEffectiveness1,
        inspEffectiveness2,
        inspEffectiveness3,
        postProbability1,
        postProbability2,
        postProbability3,
        shellSectionB1,
        shellSectionB2,
        shellSectionB3,
        headSectionB1,
        headSectionB2,
        headSectionB3,
        shellBaseDF,
        headBaseDF
    }
}

export const parameterBCoef = {
    thinning: 0.2,
    flowStress: 0.2,
    pressure: 0.05,
    damageState1: 1,
    damageState2: 2,
    damageState3: 4,
}



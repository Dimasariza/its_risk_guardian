import { conditional, prior } from "@/app/(main)/risk-based-inspection/tab-menu/pof-rbi-date/thinning/probabilityTable";
import IGeneralData from "@/types/IGeneralData";
import IRBIThinning from "@/types/IRBIThinning";
import ncdf from "./cumulativeDistribution";

export const calculateThinning = (generalData: IGeneralData, thinning: IRBIThinning) => {
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
        gData_headMinimumThicknessMM,
        gData_startingDate
    } = generalData as IGeneralData;

    const {
        rbiThinning_corrosionRate,
        rbiThinning_rbiDate,
        rbiThinning_nInspA,
        rbiThinning_nInspB,
        rbiThinning_nInspC,
        rbiThinning_nInspD,
    } = thinning as IRBIThinning;

    const lastInspDateObj: Date | any = new Date(gData_lastInspection);
    const startingDateObj: Date | any = new Date(gData_startingDate);
    const rbiDateObj: Date | any = new Date(rbiThinning_rbiDate);

    const age: number | null = Math.abs(rbiDateObj - startingDateObj) * 3.168E-11 || null;

    const ageTimeInServiceTk = Math.abs(rbiDateObj - lastInspDateObj) * 3.16865E-11 || null;

    const shellArt: number | null = rbiThinning_corrosionRate * Number(ageTimeInServiceTk!.toFixed(5))! / gData_shellMinimumThicknessMM || null;

    const headArt: number | null = rbiThinning_corrosionRate * Number(ageTimeInServiceTk!.toFixed(5))! / gData_headMinimumThicknessMM || null;

    const flowStress: number | null = (Number(gData_yieldStrength) + Number(gData_tensileStrength)) / 2 * gData_jointEfficiency * 1.1 || null;

    const shellStrengthRatioReal: number  = (Number(gData_allowableStressKpa) * Number(gData_jointEfficiency)) / flowStress! * Math.max(gData_shellTreqMM, gData_shellTreqMM) / gData_shellMinimumThicknessMM;
    const shellStrengthRatio: number = Number(shellStrengthRatioReal.toFixed(3))

    const headStrengthRatioReal: number = (Number(gData_allowableStressKpa) * Number(gData_jointEfficiency)) / flowStress! * Math.max(gData_headTreqMM, gData_headTreqMM) / gData_headMinimumThicknessMM;
    const headStrengthRatio: number = Number(headStrengthRatioReal.toFixed(3))

    const inspEffectiveness1: number | null = prior[0].medium * (conditional[0].a ** rbiThinning_nInspA) * (conditional[0].b ** rbiThinning_nInspB) * (conditional[0].c ** rbiThinning_nInspC) * (conditional[0].d ** rbiThinning_nInspD) || null;
    const inspEffectiveness2: number | null = prior[1].medium * (conditional[1].a ** rbiThinning_nInspA) * (conditional[1].b ** rbiThinning_nInspB) * (conditional[1].c ** rbiThinning_nInspC) * (conditional[1].d ** rbiThinning_nInspD) || null;
    const inspEffectiveness3: number | null = prior[2].medium * (conditional[2].a ** rbiThinning_nInspA) * (conditional[2].b ** rbiThinning_nInspB) * (conditional[2].c ** rbiThinning_nInspC) * (conditional[2].d ** rbiThinning_nInspD) || null;

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
        rbiDateObj,
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
        headBaseDF,
        startingDateObj,
        ageTimeInServiceTk
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



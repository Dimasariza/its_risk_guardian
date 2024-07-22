import { conditional, prior } from "@/app/(main)/risk-based-inspection/tab-menu/pof-plan-date/thinning/probabilityTable";
import IGeneralData from "@/types/IGeneralData";
import IPlanThinning from "@/types/IPlanThinning";
import * as formulaJs from '@formulajs/formulajs'

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
        gData_headMinimumThicknessMM,
        gData_startingDate,
        gData_designPressurePsi,
        gData_outerDiameterMM,
        gData_shellMinimumThicknessInch
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
    const startingDateObj: Date | any = new Date(gData_startingDate);
    const planDateObj: Date | any = new Date(planThinning_planDate);

    const age: number | null = Math.abs(planDateObj - startingDateObj) / 3.1556E+10 || null;

    const ageTimeInServiceTk = Math.abs(planDateObj - lastInspDateObj) / 3.1556E+10 || null; // 3.1536E+10

    const shellArt: number | null = planThinning_corrosionRate * Number(ageTimeInServiceTk!?.toFixed(2))! / gData_shellMinimumThicknessMM || null;

    const headArt: number | null = planThinning_corrosionRate * Number(ageTimeInServiceTk!?.toFixed(2))! / gData_headMinimumThicknessMM || null;

    const flowStress: number | null = (Number(gData_yieldStrength) + Number(gData_tensileStrength)) / 2 
    * gData_jointEfficiency * 1.1 || null;

    const allowableStressKpa = gData_allowableStressKpa
    const elipticalhead = 1 
    const allowableStressPsig = gData_allowableStressKpa / 6.89475729
    
    const shellRequiredWallThickness = gData_headTreqMM // change to head 
    || (gData_designPressurePsi * gData_outerDiameterMM * elipticalhead) / ((2 * allowableStressPsig * gData_jointEfficiency) - (0.2 * gData_designPressurePsi))
    const headRequiredWallThickness = gData_headTreqMM

    const shellStrengthRatioPV: number  = (Number(allowableStressKpa) * Number(gData_jointEfficiency)) / flowStress! * Math.max
    (Number(shellRequiredWallThickness), Number(shellRequiredWallThickness)) / gData_shellMinimumThicknessMM;
    const shellStrengthRatio: number = Number(shellStrengthRatioPV.toFixed(3))

    const headStrengthRatioPV: number = (Number(allowableStressKpa) * Number(gData_jointEfficiency)) / flowStress! * Math.max
    (Number(headRequiredWallThickness), Number(headRequiredWallThickness)) / gData_headMinimumThicknessMM;
    const headStrengthRatio: number = Number(headStrengthRatioPV.toFixed(3))

    const inspEffectiveness1: number | null = prior[0].medium * (conditional[0].a ** planThinning_nInspA) * (conditional[0].b ** planThinning_nInspB) * (conditional[0].c ** planThinning_nInspC) * (conditional[0].d ** planThinning_nInspD) || null;
    const inspEffectiveness2: number | null = prior[1].medium * (conditional[1].a ** planThinning_nInspA) * (conditional[1].b ** planThinning_nInspB) * (conditional[1].c ** planThinning_nInspC) * (conditional[1].d ** planThinning_nInspD) || null;
    const inspEffectiveness3: number | null = prior[2].medium * (conditional[2].a ** planThinning_nInspA) * (conditional[2].b ** planThinning_nInspB) * (conditional[2].c ** planThinning_nInspC) * (conditional[2].d ** planThinning_nInspD) || null;

    const postProbability1: number | null = inspEffectiveness1! / (inspEffectiveness1! + inspEffectiveness2! + inspEffectiveness3!) || null;
    const postProbability2: number | null = inspEffectiveness2! / (inspEffectiveness1! + inspEffectiveness2! + inspEffectiveness3!) || null;
    const postProbability3: number | null = inspEffectiveness3! / (inspEffectiveness1! + inspEffectiveness2! + inspEffectiveness3!) || null;

    const shellSectionB1: number | null = ((1 - (parameterBCoef.damageState1 * shellArt!)) - shellStrengthRatio) 
    / (((parameterBCoef.damageState1 ** 2) * (shellArt! ** 2) * (parameterBCoef.thinning ** 2)) 
    + (((1 - (parameterBCoef.damageState1 * shellArt!)) ** 2) * (parameterBCoef.flowStress) ** 2) 
    + ((shellStrengthRatio ** 2) * (parameterBCoef.pressure ** 2))) ** 0.5 || null;

    const shellSectionB2: number | null = ((1 - (parameterBCoef.damageState2 * shellArt!)) - shellStrengthRatio) 
    / (((parameterBCoef.damageState2 ** 2) * (shellArt! ** 2) * (parameterBCoef.thinning ** 2)) 
    + (((1 - (parameterBCoef.damageState2 * shellArt!)) ** 2) * (parameterBCoef.flowStress) ** 2) 
    + ((shellStrengthRatio ** 2) * (parameterBCoef.pressure ** 2))) ** 0.5 || null;

    const shellSectionB3: number | null = ((1 - (parameterBCoef.damageState3 * shellArt!)) - shellStrengthRatio) 
    / (((parameterBCoef.damageState3 ** 2) * (shellArt! ** 2) * (parameterBCoef.thinning ** 2)) 
    + (((1 - (parameterBCoef.damageState3 * shellArt!)) ** 2) * (parameterBCoef.flowStress) ** 2) 
    + ((shellStrengthRatio ** 2) * (parameterBCoef.pressure ** 2))) ** 0.5 || null;

    const headSectionB1: number | null = ((1 - (parameterBCoef.damageState1 * headArt!)) - headStrengthRatio) 
    / (((parameterBCoef.damageState1 ** 2) * (headArt! ** 2) * (parameterBCoef.thinning ** 2)) 
    + (((1 - (parameterBCoef.damageState1 * headArt!)) ** 2) * (parameterBCoef.flowStress) ** 2) 
    + ((headStrengthRatio ** 2) * (parameterBCoef.pressure ** 2))) ** 0.5 || null;

    const headSectionB2: number | null = ((1 - (parameterBCoef.damageState2 * headArt!)) - headStrengthRatio) 
    / (((parameterBCoef.damageState2 ** 2) * (headArt! ** 2) * (parameterBCoef.thinning ** 2)) 
    + (((1 - (parameterBCoef.damageState2 * headArt!)) ** 2) * (parameterBCoef.flowStress) ** 2) 
    + ((headStrengthRatio ** 2) * (parameterBCoef.pressure ** 2))) ** 0.5 || null;

    const headSectionB3: number | null = ((1 - (parameterBCoef.damageState3 * headArt!)) - headStrengthRatio) 
    / (((parameterBCoef.damageState3 ** 2) * (headArt! ** 2) * (parameterBCoef.thinning ** 2)) 
    + (((1 - (parameterBCoef.damageState3 * headArt!)) ** 2) * (parameterBCoef.flowStress) ** 2) 
    + ((headStrengthRatio ** 2) * (parameterBCoef.pressure ** 2))) ** 0.5 || null;

    const shellBaseDF = ((postProbability1! * (formulaJs.NORM.S.DIST(-shellSectionB1!, true))) 
    + (postProbability2! * (formulaJs.NORM.S.DIST(-shellSectionB2!, true))) 
    + (postProbability3! * (formulaJs.NORM.S.DIST(-shellSectionB3!, true)))) / 0.000156;

    const headBaseDF = ((postProbability1! * (formulaJs.NORM.S.DIST(-headSectionB1!, true))) 
    + (postProbability2! * (formulaJs.NORM.S.DIST(-headSectionB2!, true))) + (postProbability3! 
        * (formulaJs.NORM.S.DIST(-headSectionB3!, true)))) / 0.000156;

    return {
        lastInspection: gData_lastInspection,
        lastInspDateObj,
        planDateObj,
        age,
        tMinInch: gData_shellMinimumThicknessInch,
        tMinMM: gData_shellMinimumThicknessMM,
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
        ageTimeInServiceTk,
        allowableStressKpa
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



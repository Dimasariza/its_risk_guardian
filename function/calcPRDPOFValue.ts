import { adjFactorEnvirontment } from "@/app/(main)/risk-based-inspection/tab-menu/prd pof/adjusmentFactor";
import { severity } from "@/app/(main)/risk-based-inspection/tab-menu/prd pof/serviceSeverity";
import IGeneralData from "@/types/IGeneralData";
import IPOFRBI from "@/types/IPOFRBI";
import * as formulajs from '@formulajs/formulajs'

export const calcPRDPOFValue = (generalData: IGeneralData, pofRBI: any) => {
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
        gData_allowableOverPress,
        gData_setPressurePsig
    } = generalData as IGeneralData;

    const {
        rbi_rbiDate,
        rbi_adjusmentFactor,
        rbi_envAdjusmentFactor,
        rbi_serviceSeverity,
        rbi_confidenceFactor,
        severity,
        adjFactor,
        weibullParameter,
        inspEffectiveness,
        confidence,
        eventFire,
        eventOverFilling,
        // protected,
    } = pofRBI as IPOFRBI

    const lastInspDateObj: Date | any = new Date(gData_lastInspection);
    const startingDateObj: Date | any = new Date(gData_startingDate);
    const planDateObj: Date | any = new Date(rbi_rbiDate);

    const ageTimeInServiceTk = Math.abs(planDateObj - lastInspDateObj) * 3.16865E-11 || null;
    
    const ndef = severity?.mu_conventional! - (25 / 100) * severity?.mu_conventional! 
    const beta = severity?.beta_conventional
    const nmod = adjFactor?.number! * weibullParameter?.pofod! * ndef
    
    // pass value
    const Fopj = 1
    const gffTotal = 0.0000306
    const df = 34.30865
    const fms = 1
    const timePrior = 1 - Math.exp(-((ageTimeInServiceTk! / nmod) **  severity?.beta_conventional!))
    const priorProbability = 1 - timePrior
    const conditionPOf = (1 - confidence?.ineffective) * priorProbability
    const weightedPOF: any = timePrior - (0.2 * timePrior * (ageTimeInServiceTk! / beta)) + (0.2 * conditionPOf * (ageTimeInServiceTk! / beta))
    const lnweight: any = -formulajs.LN(1 - weightedPOF)
    const muUpd = ageTimeInServiceTk! / (lnweight! ** (1 / beta))
    const finalUpdateValue = 1 - Math.exp(-((ageTimeInServiceTk! / muUpd) ** beta))
    const pofodShouladj = finalUpdateValue * Fopj 
    const DRFire = eventFire?.ef * eventFire?.drrf
    const DROverfilling = eventOverFilling?.ef * eventOverFilling?.drrf
    const mawp = Number(gData_setPressurePsig) +  Number((gData_allowableOverPress / 100)  * gData_setPressurePsig)
    const fpoj = 121 / 100 * gData_setPressurePsig
    const protectedEq = (0.0312881 * gffTotal * df * fms) * (Math.exp(3.464837 * (fpoj / mawp)))
    const pofFire = pofodShouladj * DRFire * protectedEq
    const pofOverFilling = pofodShouladj * DROverfilling * protectedEq

    return {
        ageTimeInServiceTk,
        timePrior,
        priorProbability,
        conditionPOf,
        weightedPOF,
        muUpd,
        finalUpdateValue,
        pofodShouladj,
        DRFire,
        DROverfilling,
        mawp,
        protectedEq,
        pofFire,
        pofOverFilling,
    }
}   
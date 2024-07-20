import IGeneralData from "@/types/IGeneralData";
import IPOFRBI from "@/types/IPOFRBI";
import * as formulajs from '@formulajs/formulajs'

export const calcPRDPOFRBI = (generalData: IGeneralData, pofRBI: any, from: string = "pofod") => {
    const {
        gData_lastInspection,
        gData_startingDate,
        gData_allowableOverPress,
        gData_setPressurePsig,
        gData_operatingPressurePsi
    } = generalData as IGeneralData;

    const {
        rbi_rbiDate,
        severity,
        adjFactor,
        weibullParameter,
        inspEffectiveness,
        confidence,
        eventFire,
        eventOverFilling,
    } = pofRBI as IPOFRBI

    const lastInspDateObj: Date | any = new Date(gData_lastInspection);
    const startingDateObj: Date | any = new Date(gData_startingDate);
    const planDateObj: Date | any = new Date(rbi_rbiDate);

    const ageTimeInServiceTk = Math.abs(planDateObj - lastInspDateObj) * 3.16865E-11 || null;
    
    const ndef = severity?.mu_conventional! - (25 / 100) * severity?.mu_conventional! 
    const beta = severity?.beta_conventional
    const nmod = adjFactor?.number! * weibullParameter?.[from]! * ndef
    
    // pass value
    const Fopj = 1
    const gffTotal = 0.0000306
    const df = 16.04127
    const fms = 1
    const timePrior = 1 - Math.exp(-((ageTimeInServiceTk! / nmod) **  severity?.beta_conventional!))
    const priorProbability = 1 - timePrior
    const effectiveToConfidence: any = (e: any) => {
        switch(e) {
            case "Hightly Effective A":
                return "highly"
            case "Usually Effective B":
                return "usually"
            case "Fairly Effective C":
                return "fairly"
            case "Inefective D":
                return "ineffective"
        }
    }
    const conditionPOf = (1 - confidence?.[effectiveToConfidence(inspEffectiveness.effectiveness)]) * priorProbability
    const weibull = from == "pofod" ? beta : nmod 
    const weightedPOF: any = timePrior - (0.2 * timePrior * (ageTimeInServiceTk! / weibull)) + (0.2 * conditionPOf * (ageTimeInServiceTk! / weibull))
    const lnweight: any = -formulajs.LN(1 - weightedPOF)
    const muUpd = ageTimeInServiceTk! / (lnweight! ** (1 / beta))
    const finalUpdateValue = 1 - Math.exp(-((ageTimeInServiceTk! / muUpd) ** beta))
    const fSet = 1 - ((0.9 - Math.min(gData_operatingPressurePsi / gData_setPressurePsig) / 0.9)) 
    const pofodShouladj = finalUpdateValue * Fopj 
    const DRFire = eventFire?.ef * eventFire?.drrf
    const DROverfilling = eventOverFilling?.ef * eventOverFilling?.drrf
    const mawp = Number(gData_setPressurePsig) +  Number((gData_allowableOverPress / 100)  * gData_setPressurePsig)
    const fpoj = 121 / 100 * gData_setPressurePsig
    const protectedEq = (0.0312881 * gffTotal * df * fms) * (Math.exp(3.464837 * (fpoj / mawp)))
    const pofFire = pofodShouladj * DRFire * protectedEq
    const pofOverFilling = Number(pofodShouladj) * Number(DROverfilling) * Number(protectedEq)

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
        fSet
    }
}   
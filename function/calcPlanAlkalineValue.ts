import IGeneralData from "@/types/IGeneralData"
import IPlanThinning from "@/types/IPlanThinning"
import { calculateThinning } from "./calcPlanThinningValue"
import { calculateExCor } from "./calcPlanExCorValue"

export const calculateAlkaline = ({
        generalData, 
        thinning, 
        exCor = null, 
        alkaline,
        componentType = ""
    }: any) => {

    const { 
        shellBaseDF,
        headBaseDF,
        ageTimeInServiceTk
    } = calculateThinning(generalData as IGeneralData, thinning as IPlanThinning, componentType)

    const {
        planShellSection,
        planHeadSection
    } = calculateExCor(generalData, thinning, exCor, componentType)
    
    const shellPWHT = alkaline?.planAlkaline_numOfInspection * Math.max(ageTimeInServiceTk!, 1) ** 1.1
    const headPWHT = alkaline?.planAlkaline_numOfInspection * Math.max(ageTimeInServiceTk!, 1) ** 1.1

    const shellTotal = Math.max(shellBaseDF!, planShellSection!) + shellPWHT
    const headTotal = Math.max(headBaseDF!, planHeadSection!) + headPWHT

    return {
        shellBaseDF,
        headBaseDF,
        planShellSection,
        planHeadSection,
        shellPWHT,
        headPWHT,
        ageTimeInServiceTk,
        shellTotal,
        headTotal
    }
}
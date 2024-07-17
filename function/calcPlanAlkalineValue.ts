import IGeneralData from "@/types/IGeneralData"
import { calculateExCor } from "./calcPlanExCorValue"
import IPlanThinning from "@/types/IPlanThinning"
import { calculateThinning } from "./calcPlanThinningValue"

export const calculateAlkaline = ({
        generalData, 
        thinning, 
        exCor = null, 
        alkaline
    }: any) => {

    const { 
        age,
        shellBaseDF,
        headBaseDF,
        ageTimeInServiceTk
    } = calculateThinning(generalData as IGeneralData, thinning as IPlanThinning)

    const {
        planShellSection,
        planHeadSection
    } = calculateExCor(generalData, thinning, exCor)
    
    const shellPWHT = alkaline?.planAlkaline_numOfInspection * Math.max(ageTimeInServiceTk!, 1) ** 1.1
    const headPWHT = alkaline?.planAlkaline_numOfInspection * Math.max(ageTimeInServiceTk!, 1) ** 1.1
    
    return {
        shellBaseDF,
        headBaseDF,
        age,
        planShellSection,
        planHeadSection,
        shellPWHT,
        headPWHT,
        ageTimeInServiceTk
    }
}
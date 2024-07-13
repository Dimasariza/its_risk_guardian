import IGeneralData from "@/types/IGeneralData"
import IRBIExCor from "@/types/IRBIExCor"
import IRBIThinning from "@/types/IRBIThinning"
import { calculateThinning } from "./calcRBIThinningValue"
import { calculateExCor } from "./calcRBIExCorValue"

export const calculateAlkaline = ({
    generalData, 
    thinning, 
    exCor = null, 
    alkaline
    }: any) => {

    const { 
        age,
        shellBaseDF,
        headBaseDF
    } = calculateThinning(generalData as IGeneralData, thinning as IRBIThinning)

    const {
        rbiShellSection,
        rbiHeadSection
    } = calculateExCor(generalData, thinning, exCor)
    
    const shellPWHT = alkaline.rbiAlkaline_numOfInspection * Math.max(age!, 1) ** 1.1
    const headPWHT = alkaline.rbiAlkaline_numOfInspection * Math.max(age!, 1) ** 1.1
    
    return {
        shellBaseDF,
        headBaseDF,
        age,
        rbiShellSection,
        rbiHeadSection,
        shellPWHT,
        headPWHT
    }
}
import IGeneralData from "@/types/IGeneralData"
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
        shellBaseDF,
        headBaseDF,
        ageTimeInServiceTk
    } = calculateThinning(generalData as IGeneralData, thinning as IRBIThinning)

    const {
        rbiShellSection,
        rbiHeadSection
    } = calculateExCor(generalData, thinning, exCor)
    
    const shellPWHT = alkaline.rbiAlkaline_numOfInspection * Math.max(ageTimeInServiceTk!, 1) ** 1.1
    const headPWHT = alkaline.rbiAlkaline_numOfInspection * Math.max(ageTimeInServiceTk!, 1) ** 1.1

    const shellTotal = Math.max(shellBaseDF!, rbiShellSection!) + shellPWHT
    const headTotal = Math.max(headBaseDF!, rbiHeadSection!) + headPWHT

    return {
        shellBaseDF,
        headBaseDF,
        rbiShellSection,
        rbiHeadSection,
        shellPWHT,
        headPWHT,
        ageTimeInServiceTk,
        shellTotal,
        headTotal
    }
}
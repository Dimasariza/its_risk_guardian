import IGeneralData from "@/types/IGeneralData";
import IRBIThinning from "@/types/IRBIThinning";

export default function calculateThinning(generalData: IGeneralData, thinning: IRBIThinning) {
    if(!Object.keys(generalData).length) return {}
    console.log(new Date(generalData.gData_lastInspection))
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
        rbiThinning_rbiDate,
        rbiThinning_corrosionRate
    } = thinning as IRBIThinning;

    const lastInspDateObj: Date | any = new Date(gData_lastInspection);
    
    const age: number = rbiThinning_rbiDate?.getFullYear() - lastInspDateObj?.getFullYear();

    const shellArt: number = rbiThinning_corrosionRate * age / gData_shellTreqMM;

    const headArt: number = rbiThinning_corrosionRate * age / gData_headTreqMM;

    const flowStress: number = (gData_yieldStrength + gData_tensileStrength) / 2 * gData_jointEfficiency * 1.1;

    const shellStrengthRatio: number = (gData_allowableStressKpa * gData_jointEfficiency) / flowStress * Math.max(gData_headTreqMM, gData_headTreqMM) / gData_shellMinimumThicknessMM;

    const headStrengthRatio: number = (gData_allowableStressKpa * gData_jointEfficiency) / flowStress * Math.max(gData_headTreqMM, gData_headTreqMM) / gData_headMinimumThicknessMM;

    return {
        lastInspection: gData_lastInspection,
        lastInspDateObj,
        age,
        tMinInch: gData_headTreqInch,
        tMinMM: gData_headTreqMM,
        shellArt,
        headArt,
        flowStress,
        shellStrengthRatio,
        headStrengthRatio
    }
}
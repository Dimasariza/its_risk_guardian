import IGeneralData from "@/types/IGeneralData";

export const calculateCOF = (generalData: IGeneralData, fluidSelected: any) => {
    if(!Object.keys(generalData).length) return {}

    const gData_operatingTempOnF = (generalData?.gData_operatingTemperature * 9 / 5) + 32
    const gData_operatingTempOnK = (gData_operatingTempOnF - 32) * 5 / 9 + 273.15

    const { constant_a = null, constant_b = null, constant_c = null , constant_d = null } = fluidSelected;
    const kRatio = constant_a + (constant_b * gData_operatingTempOnK) + ((constant_c * gData_operatingTempOnK) ** 2) + ((constant_d * gData_operatingTempOnK) ** 3) 
    
    const constantR = 8.314
    return {
        getIdealGasHeatRatio: (kRatio / (kRatio - constantR)).toFixed(4) || null

    }
}
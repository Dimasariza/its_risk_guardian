import IGeneralData from "@/types/IGeneralData";

interface ICofCalculation {
    generalData: IGeneralData
    fluidSelected: any
    cofValue: any
}

export const calculateCOF = ({generalData, fluidSelected, cofValue}: ICofCalculation) => {
    if(!Object.keys(generalData).length) return {}

    const {
        gData_operatingTemperature,
        gData_operatingPressure
    } = generalData;

    const gData_operatingTempOnF = (gData_operatingTemperature * 9 / 5) + 32
    const gData_operatingTempOnK = (gData_operatingTempOnF - 32) * 5 / 9 + 273.15

    const { constant_a = null, constant_b = null, constant_c = null , constant_d = null } = fluidSelected;
    const kRatio = constant_a + (constant_b * gData_operatingTempOnK) + ((constant_c * gData_operatingTempOnK) ** 2) + ((constant_d * gData_operatingTempOnK) ** 3) 
    
    const constantR = 8.314

    const {
        cof_massComponent,
        cof_massInventory,
        cof_representativeFluid,
        cof_phaseOfFluid,
        cof_releaseHoleSizeD1,
        cof_releaseHoleSizeD2,
        cof_releaseHoleSizeD3,
        cof_releaseHoleSizeD4,
        cof_liquidInventories,
        cof_detectionSystem,
        cof_isolationSystem,
        cof_flamableCons,
        cof_damageCons
    } = cofValue

    const basedOnDNSmallmm = ((Math.PI * (cof_releaseHoleSizeD1) ** 2)) / 4
    const basedOnDNSmallm = basedOnDNSmallmm / 1000
    const basedOnDNMediummm = ((Math.PI * (cof_releaseHoleSizeD2) ** 2)) / 4
    const basedOnDNMediumm = basedOnDNMediummm / 1000
    const basedOnDNLargemm = ((Math.PI * (cof_releaseHoleSizeD3) ** 2)) / 4
    const basedOnDNLargem = basedOnDNLargemm / 1000
    const basedOnDNRupturemm = ((Math.PI * (cof_releaseHoleSizeD4) ** 2)) / 4
    const basedOnDNRupturem = basedOnDNRupturemm / 1000

    const C2 = 1
    
    const releaseRateWnSmall = 0
    const releaseRateWnMedium = 0
    const releaseRateWnLarge = 0
    const releaseRateWnRupture = 0

    return {
        getIdealGasHeatRatio: kRatio / (kRatio - constantR),
        basedOnDNSmallmm,
        basedOnDNSmallm,
        basedOnDNMediummm,
        basedOnDNMediumm,
        basedOnDNLargemm,
        basedOnDNLargem,
        basedOnDNRupturemm,
        basedOnDNRupturem
    }
}
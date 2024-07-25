export const calcCOFTank = ({generalData, fluidSelected, cofValue, componentType}: any) => {
    const {
        gData_operatingTemperatureC,
        gData_operatingPressureBar
    } = generalData;

    const {
        cof_massComponent,
        cof_massInventory,
        cof_releaseHoleSizeD1,
        cof_releaseHoleSizeD2,
        cof_releaseHoleSizeD3,
        cof_releaseHoleSizeD4,
        cof_ps,
        failureFreq
    } = cofValue || {}

    const PI = 3.142

    const basedOnDNSmallmm = ((PI * cof_releaseHoleSizeD1 ** 2)) / 4
    const basedOnDNSmallm = basedOnDNSmallmm / 1000
    const basedOnDNMediummm = ((PI * cof_releaseHoleSizeD2 ** 2)) / 4
    const basedOnDNMediumm = basedOnDNMediummm / 1000
    const basedOnDNLargemm = ((PI * cof_releaseHoleSizeD3 ** 2)) / 4
    const basedOnDNLargem = basedOnDNLargemm / 1000
    const basedOnDNRupturemm = ((PI * cof_releaseHoleSizeD4 ** 2)) / 4
    const basedOnDNRupturem = basedOnDNRupturemm / 1000

    return {
        basedOnDNSmallmm,
        basedOnDNSmallm,
        basedOnDNMediummm,
        basedOnDNMediumm,
        basedOnDNLargem,
        basedOnDNLargemm,
        basedOnDNRupturem,
        basedOnDNRupturemm
    }
}
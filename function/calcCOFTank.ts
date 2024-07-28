import { releaseRateValue } from "@/app/(main)/uikit/table/cof/cof Tank/releaseRateValue";

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

    const Cd = 0.61
    const conversionFactor = 0.534
    const gravity = 1
    const maximumHeight = 8
    const Rho1 = 775.019
    const DTank = 4.64
    const C13 = 6.29

    const basedOnDNSmallmm = ((PI * cof_releaseHoleSizeD1 ** 2)) / 4
    const basedOnDNSmallm = basedOnDNSmallmm / 1000000
    const basedOnDNMediummm = ((PI * cof_releaseHoleSizeD2 ** 2)) / 4
    const basedOnDNMediumm = basedOnDNMediummm / 1000000
    const basedOnDNLargemm = ((PI * cof_releaseHoleSizeD3 ** 2)) / 4
    const basedOnDNLargem = basedOnDNLargemm / 1000000
    const basedOnDNRupturemm = ((PI * cof_releaseHoleSizeD4 ** 2)) / 4
    const basedOnDNRupturem = basedOnDNRupturemm / 1000000

    const releaseRateWnSmall = conversionFactor * Cd * basedOnDNSmallm * ( 2 * gravity * maximumHeight) ** 0.5
    const releaseRateWnMedium = conversionFactor * Cd * basedOnDNMediumm * ( 2 * gravity * maximumHeight) ** 0.5
    const releaseRateWnLarge = conversionFactor * Cd * basedOnDNLargem * ( 2 * gravity * maximumHeight) ** 0.5
    const releaseRateWnRupture = conversionFactor * Cd * basedOnDNRupturem * ( 2 * gravity * maximumHeight) ** 0.5

    const basedOnDNTable: any = [
        {
            small: basedOnDNSmallm?.toExponential(6),
            medium: basedOnDNMediumm?.toExponential(6),
            large: basedOnDNLargem?.toExponential(6),
            rupture: basedOnDNRupturem?.toExponential(6)
        },
        {
            small: basedOnDNSmallm?.toExponential(5),
            medium: basedOnDNMediumm?.toExponential(5),
            large: basedOnDNLargem?.toExponential(5),
            rupture: basedOnDNRupturem?.toExponential(5)
        },
        {
            small: basedOnDNSmallm?.toExponential(6),
            medium: basedOnDNMediumm?.toExponential(6),
            large: basedOnDNLargem?.toExponential(6),
            rupture: basedOnDNRupturem?.toExponential(6)
        },
        {
            small: basedOnDNSmallm?.toExponential(6),
            medium: basedOnDNMediumm?.toExponential(6),
            large: basedOnDNLargem?.toExponential(6),
            rupture: basedOnDNRupturem?.toExponential(6)
        },
    ]

    const releaseRateTable = [
        {
            small: conversionFactor * Cd * basedOnDNTable[0].small * ( 2 * gravity * releaseRateValue[0].lht) ** 0.5,
            medium: conversionFactor * Cd * basedOnDNTable[0].medium * ( 2 * gravity * releaseRateValue[0].lht) ** 0.5,
            large: conversionFactor * Cd * basedOnDNTable[0].large * ( 2 * gravity * releaseRateValue[0].lht) ** 0.5,
            rupture: conversionFactor * Cd * basedOnDNTable[0].rupture * ( 2 * gravity * releaseRateValue[0].lht) ** 0.5
        },
        {
            small: conversionFactor * Cd * basedOnDNTable[1].small * ( 2 * gravity * releaseRateValue[1].lht) ** 0.5,
            medium: conversionFactor * Cd * basedOnDNTable[1].medium * ( 2 * gravity * releaseRateValue[1].lht) ** 0.5,
            large: conversionFactor * Cd * basedOnDNTable[1].large * ( 2 * gravity * releaseRateValue[1].lht) ** 0.5,
            rupture: conversionFactor * Cd * basedOnDNTable[1].rupture * ( 2 * gravity * releaseRateValue[1].lht) ** 0.5
        },
        {
            small: conversionFactor * Cd * basedOnDNTable[2].small * ( 2 * gravity * releaseRateValue[2].lht) ** 0.5,
            medium: conversionFactor * Cd * basedOnDNTable[2].medium * ( 2 * gravity * releaseRateValue[2].lht) ** 0.5,
            large: conversionFactor * Cd * basedOnDNTable[2].large * ( 2 * gravity * releaseRateValue[2].lht) ** 0.5,
            rupture: conversionFactor * Cd * basedOnDNTable[2].rupture * ( 2 * gravity * releaseRateValue[2].lht) ** 0.5
        },       
        {
            small: conversionFactor * Cd * basedOnDNTable[3].small * ( 2 * gravity * releaseRateValue[3].lht) ** 0.5,
            medium: conversionFactor * Cd * basedOnDNTable[3].medium * ( 2 * gravity * releaseRateValue[3].lht) ** 0.5,
            large: conversionFactor * Cd * basedOnDNTable[3].large * ( 2 * gravity * releaseRateValue[3].lht) ** 0.5,
            rupture: conversionFactor * Cd * basedOnDNTable[3].rupture * ( 2 * gravity * releaseRateValue[3].lht) ** 0.5
        },
    ]

    const totalVolumeFluidC1 = (PI * DTank ** 2 / 4) * releaseRateValue[0].lht
    const totalVolumeFluidC2 = (PI * DTank ** 2 / 4) * releaseRateValue[1].lht
    const totalVolumeFluidC3 = (PI * DTank ** 2 / 4) * releaseRateValue[2].lht
    const totalVolumeFluidC4 = (PI * DTank ** 2 / 4) * releaseRateValue[3].lht

    const theLocationHoleTable = [
        {
            small: totalVolumeFluidC1,
            medium: totalVolumeFluidC1,
            large: totalVolumeFluidC1,
            rupture: totalVolumeFluidC1
        },
        {
            small: totalVolumeFluidC2,
            medium: totalVolumeFluidC2,
            large: totalVolumeFluidC2,
            rupture: totalVolumeFluidC2
        },
        {
            small: totalVolumeFluidC3,
            medium: totalVolumeFluidC3,
            large: totalVolumeFluidC3,
            rupture: totalVolumeFluidC3
        },
        {
            small: totalVolumeFluidC4,
            medium: totalVolumeFluidC4,
            large: totalVolumeFluidC4,
            rupture: totalVolumeFluidC4
        },
    ]

    const astVolumeSmall = theLocationHoleTable[0].small * C13
    const astVolumeMedium = theLocationHoleTable[0].medium * C13
    const astVolumeLarge = theLocationHoleTable[0].large * C13
    const astVolumeRupture = theLocationHoleTable[0].rupture * C13

    const astVolumeTable = [
        {
            small: theLocationHoleTable[0].small * C13,
            medium: theLocationHoleTable[0].medium * C13,
            large: theLocationHoleTable[0].large * C13,
            rupture: theLocationHoleTable[0].rupture * C13
        },
        {
            small: theLocationHoleTable[1].small * C13,
            medium: theLocationHoleTable[1].medium * C13,
            large: theLocationHoleTable[1].large * C13,
            rupture: theLocationHoleTable[1].rupture * C13
        },
        {
            small: theLocationHoleTable[2].small * C13,
            medium: theLocationHoleTable[2].medium * C13,
            large: theLocationHoleTable[2].large * C13,
            rupture: theLocationHoleTable[2].rupture * C13
        },
        {
            small: theLocationHoleTable[3].small * C13,
            medium: theLocationHoleTable[3].medium * C13,
            large: theLocationHoleTable[3].large * C13,
            rupture: theLocationHoleTable[3].rupture * C13
        },
    ]

    const astMassSmall = theLocationHoleTable[0].small * Rho1
    const astMassMedium = theLocationHoleTable[0].medium * Rho1
    const astMassLarge = theLocationHoleTable[0].large * Rho1
    const astMassRupture = theLocationHoleTable[0].rupture * Rho1

    const astMassTable = [
        {
            small: theLocationHoleTable[0].small * Rho1,
            medium: theLocationHoleTable[0].medium * Rho1,
            large: theLocationHoleTable[0].large * Rho1,
            rupture: theLocationHoleTable[0].rupture * Rho1
        },
        {
            small: theLocationHoleTable[1].small * Rho1,
            medium: theLocationHoleTable[1].medium * Rho1,
            large: theLocationHoleTable[1].large * Rho1,
            rupture: theLocationHoleTable[1].rupture * Rho1
        },
        {
            small: theLocationHoleTable[2].small * Rho1,
            medium: theLocationHoleTable[2].medium * Rho1,
            large: theLocationHoleTable[2].large * Rho1,
            rupture: theLocationHoleTable[2].rupture * Rho1
        },
        {
            small: theLocationHoleTable[3].small * Rho1,
            medium: theLocationHoleTable[3].medium * Rho1,
            large: theLocationHoleTable[3].large * Rho1,
            rupture: theLocationHoleTable[3].rupture * Rho1
        },
    ]

    const releaseRatenBblSmall = releaseRateWnSmall
    const releaseRatenBblMedium = releaseRateWnMedium
    const releaseRatenBblLarge = releaseRateWnLarge
    const releaseRatenBblRupture = releaseRateWnRupture

    const releaseRatenBblTable = [...releaseRateTable]

    const leakDetectionTable = [
        {
            small: cof_releaseHoleSizeD1 <= 3.175 ? 7 : 1,
            medium: 0,
            large: 0,
            rupture: 0
        },
        {
            small: cof_releaseHoleSizeD1 <= 3.175 ? 7 : 1,
            medium: 0,
            large: 0,
            rupture: 0
        },
        {
            small: cof_releaseHoleSizeD1 <= 3.175 ? 7 : 1,
            medium: 0,
            large: 0,
            rupture: 0
        },
        {
            small: cof_releaseHoleSizeD1 <= 3.175 ? 7 : 1,
            medium: 0,
            large: 0,
            rupture: 0
        },
    ]

    return {
        PI,
        basedOnDNSmallmm,
        basedOnDNSmallm,
        basedOnDNMediummm,
        basedOnDNMediumm,
        basedOnDNLargem,
        basedOnDNLargemm,
        basedOnDNRupturem,
        basedOnDNRupturemm,
        releaseRateWnSmall,
        releaseRateWnMedium,
        releaseRateWnLarge,
        releaseRateWnRupture,
        releaseRateTable,
        basedOnDNTable,
        totalVolumeFluidC1,
        totalVolumeFluidC2,
        totalVolumeFluidC3,
        totalVolumeFluidC4,
        theLocationHoleTable,
        astVolumeSmall,
        astVolumeMedium,
        astVolumeLarge,
        astVolumeRupture,
        astVolumeTable,
        astMassSmall,
        astMassMedium,
        astMassLarge,
        astMassRupture,
        astMassTable,
        releaseRatenBblSmall,
        releaseRatenBblMedium,
        releaseRatenBblLarge,
        releaseRatenBblRupture,
        releaseRatenBblTable
    }
}
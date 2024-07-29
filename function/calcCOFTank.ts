import { releaseRateValue } from "@/app/(main)/uikit/table/cof/cof Tank/releaseRateValue";

export const calcCOFTank = ({generalData, cofValue, componentType}: any) => {
    const {
        gData_operatingTemperatureC,
        gData_operatingPressureBar
    } = generalData;

    const {
        cof_massComponent,
        cof_massInventory,
        cof_C1mfracTox,
        cof_releaseHoleSizeD1,
        cof_releaseHoleSizeD2,
        cof_releaseHoleSizeD3,
        cof_releaseHoleSizeD4,
        mitigation,
        fluidSelected,
        damage,
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
    const C5 = 25.2

    const basedOnDNSmallmm = ((PI * cof_releaseHoleSizeD1 ** 2)) / 4
    const basedOnDNSmallm = basedOnDNSmallmm / 1000000
    const basedOnDNMediummm = ((PI * cof_releaseHoleSizeD2 ** 2)) / 4
    const basedOnDNMediumm = basedOnDNMediummm / 1000000
    const basedOnDNLargemm = ((PI * cof_releaseHoleSizeD3 ** 2)) / 4
    const basedOnDNLargem = basedOnDNLargemm / 1000000
    const basedOnDNRupturemm = ((PI * cof_releaseHoleSizeD4 ** 2)) / 4
    const basedOnDNRupturem = basedOnDNRupturemm / 1000000

    const releaseRateWnSmall = conversionFactor * Cd * basedOnDNSmallm * ( 2 * gravity * maximumHeight ) ** 0.5
    const releaseRateWnMedium = conversionFactor * Cd * basedOnDNMediumm * ( 2 * gravity * maximumHeight ) ** 0.5
    const releaseRateWnLarge = conversionFactor * Cd * basedOnDNLargem * ( 2 * gravity * maximumHeight ) ** 0.5
    const releaseRateWnRupture = conversionFactor * Cd * basedOnDNRupturem * ( 2 * gravity * maximumHeight ) ** 0.5

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
            small: conversionFactor * Cd * basedOnDNTable[2].small * ( 2 * gravity * releaseRateValue[2].lht ) ** 0.5,
            medium: conversionFactor * Cd * basedOnDNTable[2].medium * ( 2 * gravity * releaseRateValue[2].lht ) ** 0.5,
            large: conversionFactor * Cd * basedOnDNTable[2].large * ( 2 * gravity * releaseRateValue[2].lht ) ** 0.5,
            rupture: conversionFactor * Cd * basedOnDNTable[2].rupture * ( 2 * gravity * releaseRateValue[2].lht ) ** 0.5
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
            medium: cof_releaseHoleSizeD2 <= 3.175 ? 7 : 1,
            large: cof_releaseHoleSizeD3 <= 3.175 ? 7 : 1,
            rupture: cof_releaseHoleSizeD4 <= 3.175 ? 7 : 1
        },
        {
            small: cof_releaseHoleSizeD1 <= 3.175 ? 7 : 1,
            medium: cof_releaseHoleSizeD2 <= 3.175 ? 7 : 1,
            large: cof_releaseHoleSizeD3 <= 3.175 ? 7 : 1,
            rupture: cof_releaseHoleSizeD4 <= 3.175 ? 7 : 1
        },
        {
            small: cof_releaseHoleSizeD1 <= 3.175 ? 7 : 1,
            medium: cof_releaseHoleSizeD2 <= 3.175 ? 7 : 1,
            large: cof_releaseHoleSizeD3 <= 3.175 ? 7 : 1,
            rupture: cof_releaseHoleSizeD4 <= 3.175 ? 7 : 1
        },
        {
            small: cof_releaseHoleSizeD1 <= 3.175 ? 7 : 1,
            medium: cof_releaseHoleSizeD2 <= 3.175 ? 7 : 1,
            large: cof_releaseHoleSizeD3 <= 3.175 ? 7 : 1,
            rupture: cof_releaseHoleSizeD4 <= 3.175 ? 7 : 1
        },
    ]

    // i80 ast
    const leakDurationSmall = Math.min((astVolumeTable[0].small / releaseRatenBblTable[0].small), leakDetectionTable[0].small)
    const leakDurationMedium = Math.min((astVolumeTable[0].medium / releaseRatenBblTable[0].medium), leakDetectionTable[0].medium)
    const leakDurationLarge = Math.min((astVolumeTable[0].large / releaseRatenBblTable[0].large), leakDetectionTable[0].large)
    const leakDurationRupture = Math.min((astVolumeTable[0].rupture / releaseRatenBblTable[0].rupture), leakDetectionTable[0].rupture)

    const leakDurationTable = [
        {
            small: Math.min((astVolumeTable[0].small / releaseRatenBblTable[0].small), leakDetectionTable[0].small),
            medium: Math.min((astVolumeTable[0].medium / releaseRatenBblTable[0].medium), leakDetectionTable[0].medium),
            large: Math.min((astVolumeTable[0].large / releaseRatenBblTable[0].large), leakDetectionTable[0].large),
            rupture: Math.min((astVolumeTable[0].rupture / releaseRatenBblTable[0].rupture), leakDetectionTable[0].rupture)
        },
        {
            small: Math.min((astVolumeTable[1].small / releaseRatenBblTable[1].small), leakDetectionTable[1].small),
            medium: Math.min((astVolumeTable[1].medium / releaseRatenBblTable[1].medium), leakDetectionTable[1].medium),
            large: Math.min((astVolumeTable[1].large / releaseRatenBblTable[1].large), leakDetectionTable[1].large),
            rupture: Math.min((astVolumeTable[1].rupture / releaseRatenBblTable[1].rupture), leakDetectionTable[1].rupture)
        },
        {
            small: Math.min((astVolumeTable[2].small / releaseRatenBblTable[2].small), leakDetectionTable[2].small),
            medium: Math.min((astVolumeTable[2].medium / releaseRatenBblTable[2].medium), leakDetectionTable[2].medium),
            large: Math.min((astVolumeTable[2].large / releaseRatenBblTable[2].large), leakDetectionTable[2].large),
            rupture: Math.min((astVolumeTable[2].rupture / releaseRatenBblTable[2].rupture), leakDetectionTable[2].rupture)
        },
        {
            small: Math.min((astVolumeTable[3].small / releaseRatenBblTable[3].small), leakDetectionTable[3].small),
            medium: Math.min((astVolumeTable[3].medium / releaseRatenBblTable[3].medium), leakDetectionTable[3].medium),
            large: Math.min((astVolumeTable[3].large / releaseRatenBblTable[3].large), leakDetectionTable[3].large),
            rupture: Math.min((astVolumeTable[3].rupture / releaseRatenBblTable[3].rupture), leakDetectionTable[3].rupture)
        },
    ]

    const rVolLeakageBBLSmall = Math.min((releaseRatenBblTable[0].small * leakDetectionTable[0].small), astVolumeTable[0].small) 
    const rVolLeakageBBLMedium = Math.min((releaseRatenBblTable[0].medium * leakDetectionTable[0].medium), astVolumeTable[0].medium) 
    const rVolLeakageBBLLarge = Math.min((releaseRatenBblTable[0].large * leakDetectionTable[0].large), astVolumeTable[0].large) 
    const rVolLeakageBBLRupture = Math.min((releaseRatenBblTable[0].rupture * leakDetectionTable[0].rupture), astVolumeTable[0].rupture) 

    const rVolLeakageTable = [
        {
            small: Math.min((releaseRatenBblTable[0].small * leakDetectionTable[0].small), astVolumeTable[0].small),
            medium: Math.min((releaseRatenBblTable[0].medium * leakDetectionTable[0].medium), astVolumeTable[0].medium),
            large: Math.min((releaseRatenBblTable[0].large * leakDetectionTable[0].large), astVolumeTable[0].large),
            rupture: Math.min((releaseRatenBblTable[0].rupture * leakDetectionTable[0].rupture), astVolumeTable[0].rupture)
        },
        {
            small: Math.min((releaseRatenBblTable[1].small * leakDetectionTable[1].small), astVolumeTable[1].small),
            medium: Math.min((releaseRatenBblTable[1].medium * leakDetectionTable[1].medium), astVolumeTable[1].medium),
            large: Math.min((releaseRatenBblTable[1].large * leakDetectionTable[1].large), astVolumeTable[1].large),
            rupture: Math.min((releaseRatenBblTable[1].rupture * leakDetectionTable[1].rupture), astVolumeTable[1].rupture)
        },
        {
            small: Math.min((releaseRatenBblTable[2].small * leakDetectionTable[2].small), astVolumeTable[2].small),
            medium: Math.min((releaseRatenBblTable[2].medium * leakDetectionTable[2].medium), astVolumeTable[2].medium),
            large: Math.min((releaseRatenBblTable[2].large * leakDetectionTable[2].large), astVolumeTable[2].large),
            rupture: Math.min((releaseRatenBblTable[2].rupture * leakDetectionTable[2].rupture), astVolumeTable[2].rupture)
        },
        {
            small: Math.min((releaseRatenBblTable[3].small * leakDetectionTable[3].small), astVolumeTable[3].small),
            medium: Math.min((releaseRatenBblTable[3].medium * leakDetectionTable[3].medium), astVolumeTable[3].medium),
            large: Math.min((releaseRatenBblTable[3].large * leakDetectionTable[3].large), astVolumeTable[3].large),
            rupture: Math.min((releaseRatenBblTable[3].rupture * leakDetectionTable[3].rupture), astVolumeTable[3].rupture)
        },
    ]

    const rMassLeakageTable = [...rVolLeakageTable]

    const rVolRuptureBBLTable = [...astVolumeTable]

    const rMassRuptureBBLTable = [...rVolRuptureBBLTable]

    const {
        CAINLLA,
        CAINLLB,
        CAILLA,
        CAILLB,
        CAINLGA,
        CAINLGB,
        CAILGA,
        CAILGB
    } = damage?.data || {}
    
    const consCAINLSmall = CAINLLA * (releaseRateTable[0].small ** CAINLLB) * (1 - mitigation?.factorLimit)
    const consCAINLMedium = CAINLLA * (releaseRateTable[0].medium ** CAINLLB) * (1 - mitigation?.factorLimit)
    const consCAINLLarge = CAINLLA * (releaseRateTable[0].large ** CAINLLB) * (1 - mitigation?.factorLimit)
    const consCAINLRupture = CAINLLA * (releaseRateTable[0].rupture ** CAINLLB) * (1 - mitigation?.factorLimit)

    const consCAINLTable = [
        {
            small: CAINLLA * (releaseRateTable[0].small ** CAINLLB) * (1 - mitigation?.factorLimit),
            medium: CAINLLA * (releaseRateTable[0].medium ** CAINLLB) * (1 - mitigation?.factorLimit),
            large: CAINLLA * (releaseRateTable[0].large ** CAINLLB) * (1 - mitigation?.factorLimit),
            rupture: CAINLLA * (releaseRateTable[0].rupture ** CAINLLB) * (1 - mitigation?.factorLimit)
        },
        {
            small: CAINLLA * (releaseRateTable[1].small ** CAINLLB) * (1 - mitigation?.factorLimit),
            medium: CAINLLA * (releaseRateTable[1].medium ** CAINLLB) * (1 - mitigation?.factorLimit),
            large: CAINLLA * (releaseRateTable[1].large ** CAINLLB) * (1 - mitigation?.factorLimit),
            rupture: CAINLLA * (releaseRateTable[1].rupture ** CAINLLB) * (1 - mitigation?.factorLimit)
        },
        {
            small: CAINLLA * (releaseRateTable[2].small ** CAINLLB) * (1 - mitigation?.factorLimit),
            medium: CAINLLA * (releaseRateTable[2].medium ** CAINLLB) * (1 - mitigation?.factorLimit),
            large: CAINLLA * (releaseRateTable[2].large ** CAINLLB) * (1 - mitigation?.factorLimit),
            rupture: CAINLLA * (releaseRateTable[2].rupture ** CAINLLB) * (1 - mitigation?.factorLimit)
        },
        {
            small: CAINLLA * (releaseRateTable[3].small ** CAINLLB) * (1 - mitigation?.factorLimit),
            medium: CAINLLA * (releaseRateTable[3].medium ** CAINLLB) * (1 - mitigation?.factorLimit),
            large: CAINLLA * (releaseRateTable[3].large ** CAINLLB) * (1 - mitigation?.factorLimit),
            rupture: CAINLLA * (releaseRateTable[3].rupture ** CAINLLB) * (1 - mitigation?.factorLimit)
        },
    ]

    const consCAILLSmall = CAILLA * (releaseRateTable[0].small ** CAILLB) * (1 - mitigation?.factorLimit)
    const consCAILLMedium = CAILLA * (releaseRateTable[0].medium ** CAILLB) * (1 - mitigation?.factorLimit)
    const consCAILLLarge = CAILLA * (releaseRateTable[0].large ** CAILLB) * (1 - mitigation?.factorLimit)
    const consCAILLRupture = CAILLA * (releaseRateTable[0].rupture ** CAILLB) * (1 - mitigation?.factorLimit)

    const consCAILTable = [
        {
            small: CAILLA * (releaseRateTable[0].small ** CAILLB) * (1 - mitigation?.factorLimit),
            medium: CAILLA * (releaseRateTable[0].medium ** CAILLB) * (1 - mitigation?.factorLimit),
            large: CAILLA * (releaseRateTable[0].large ** CAILLB) * (1 - mitigation?.factorLimit),
            rupture: CAILLA * (releaseRateTable[0].rupture ** CAILLB) * (1 - mitigation?.factorLimit)
        },
        {
            small: CAILLA * (releaseRateTable[1].small ** CAILLB) * (1 - mitigation?.factorLimit),
            medium: CAILLA * (releaseRateTable[1].medium ** CAILLB) * (1 - mitigation?.factorLimit),
            large: CAILLA * (releaseRateTable[1].large ** CAILLB) * (1 - mitigation?.factorLimit),
            rupture: CAILLA * (releaseRateTable[1].rupture ** CAILLB) * (1 - mitigation?.factorLimit)
        },
        {
            small: CAILLA * (releaseRateTable[2].small ** CAILLB) * (1 - mitigation?.factorLimit),
            medium: CAILLA * (releaseRateTable[2].medium ** CAILLB) * (1 - mitigation?.factorLimit),
            large: CAILLA * (releaseRateTable[2].large ** CAILLB) * (1 - mitigation?.factorLimit),
            rupture: CAILLA * (releaseRateTable[2].rupture ** CAILLB) * (1 - mitigation?.factorLimit)
        },
        {
            small: CAILLA * (releaseRateTable[3].small ** CAILLB) * (1 - mitigation?.factorLimit),
            medium: CAILLA * (releaseRateTable[3].medium ** CAILLB) * (1 - mitigation?.factorLimit),
            large: CAILLA * (releaseRateTable[3].large ** CAILLB) * (1 - mitigation?.factorLimit),
            rupture: CAILLA * (releaseRateTable[3].rupture ** CAILLB) * (1 - mitigation?.factorLimit)
        },
    ]

    const consCAINLGSmall = CAINLGA * (releaseRateTable[0].small ** CAINLGB) * (1 - mitigation?.factorLimit)
    const consCAINLGMedium = CAINLGA * (releaseRateTable[0].medium ** CAINLGB) * (1 - mitigation?.factorLimit)
    const consCAINLGLarge = CAINLGA * (releaseRateTable[0].large ** CAINLGB) * (1 - mitigation?.factorLimit)
    const consCAINLGRupture = CAINLGA * (releaseRateTable[0].rupture ** CAINLGB) * (1 - mitigation?.factorLimit)

    const consCAINLGTable = [
        {
            small: CAINLGA * (releaseRateTable[0].small ** CAINLGB) * (1 - mitigation?.factorLimit),
            medium: CAINLGA * (releaseRateTable[0].medium ** CAINLGB) * (1 - mitigation?.factorLimit),
            large: CAINLGA * (releaseRateTable[0].large ** CAINLGB) * (1 - mitigation?.factorLimit),
            rupture: CAINLGA * (releaseRateTable[0].rupture ** CAINLGB) * (1 - mitigation?.factorLimit)
        },
        {
            small: CAINLGA * (releaseRateTable[1].small ** CAINLGB) * (1 - mitigation?.factorLimit),
            medium: CAINLGA * (releaseRateTable[1].medium ** CAINLGB) * (1 - mitigation?.factorLimit),
            large: CAINLGA * (releaseRateTable[1].large ** CAINLGB) * (1 - mitigation?.factorLimit),
            rupture: CAINLGA * (releaseRateTable[1].rupture ** CAINLGB) * (1 - mitigation?.factorLimit)
        },
        {
            small: CAINLGA * (releaseRateTable[2].small ** CAINLGB) * (1 - mitigation?.factorLimit),
            medium: CAINLGA * (releaseRateTable[2].medium ** CAINLGB) * (1 - mitigation?.factorLimit),
            large: CAINLGA * (releaseRateTable[2].large ** CAINLGB) * (1 - mitigation?.factorLimit),
            rupture: CAINLGA * (releaseRateTable[2].rupture ** CAINLGB) * (1 - mitigation?.factorLimit)
        },
        {
            small: CAINLGA * (releaseRateTable[3].small ** CAINLGB) * (1 - mitigation?.factorLimit),
            medium: CAINLGA * (releaseRateTable[3].medium ** CAINLGB) * (1 - mitigation?.factorLimit),
            large: CAINLGA * (releaseRateTable[3].large ** CAINLGB) * (1 - mitigation?.factorLimit),
            rupture: CAINLGA * (releaseRateTable[3].rupture ** CAINLGB) * (1 - mitigation?.factorLimit)
        },
    ]

    const consCAILGSmall = CAILGA * (releaseRateTable[0].small ** CAILGB) * (1 - mitigation?.factorLimit)
    const consCAILGMedium = CAILGA * (releaseRateTable[0].medium ** CAILGB) * (1 - mitigation?.factorLimit)
    const consCAILGLarge = CAILGA * (releaseRateTable[0].large ** CAILGB) * (1 - mitigation?.factorLimit)
    const consCAILGRupture = CAILGA * (releaseRateTable[0].rupture ** CAILGB) * (1 - mitigation?.factorLimit)
    
    const consCAILGTable = [
        {
            small: CAILGA * (releaseRateTable[0].small ** CAILGB) * (1 - mitigation?.factorLimit),
            medium: CAILGA * (releaseRateTable[0].medium ** CAILGB) * (1 - mitigation?.factorLimit),
            large: CAILGA * (releaseRateTable[0].large ** CAILGB) * (1 - mitigation?.factorLimit),
            rupture: CAILGA * (releaseRateTable[0].rupture ** CAILGB) * (1 - mitigation?.factorLimit)
        },
        {
            small: CAILGA * (releaseRateTable[1].small ** CAILGB) * (1 - mitigation?.factorLimit),
            medium: CAILGA * (releaseRateTable[1].medium ** CAILGB) * (1 - mitigation?.factorLimit),
            large: CAILGA * (releaseRateTable[1].large ** CAILGB) * (1 - mitigation?.factorLimit),
            rupture: CAILGA * (releaseRateTable[1].rupture ** CAILGB) * (1 - mitigation?.factorLimit)
        },
        {
            small: CAILGA * (releaseRateTable[2].small ** CAILGB) * (1 - mitigation?.factorLimit),
            medium: CAILGA * (releaseRateTable[2].medium ** CAILGB) * (1 - mitigation?.factorLimit),
            large: CAILGA * (releaseRateTable[2].large ** CAILGB) * (1 - mitigation?.factorLimit),
            rupture: CAILGA * (releaseRateTable[2].rupture ** CAILGB) * (1 - mitigation?.factorLimit)
        },
        {
            small: CAILGA * (releaseRateTable[3].small ** CAILGB) * (1 - mitigation?.factorLimit),
            medium: CAILGA * (releaseRateTable[3].medium ** CAILGB) * (1 - mitigation?.factorLimit),
            large: CAILGA * (releaseRateTable[3].large ** CAILGB) * (1 - mitigation?.factorLimit),
            rupture: CAILGA * (releaseRateTable[3].rupture ** CAILGB) * (1 - mitigation?.factorLimit)
        },
    ]

    const blendingFactorSmall = Math.min((releaseRateWnSmall / C5), 1)
    const blendingFactorMedium = Math.min((releaseRateWnMedium / C5), 1)
    const blendingFactorLarge = Math.min((releaseRateWnLarge / C5), 1)
    const blendingFactorRupture = Math.min((releaseRateWnRupture / C5), 1)
    
    const blendingFactorTable = [
        {
            small: Math.min((releaseRateTable[0].small / C5), 1),
            medium: Math.min((releaseRateTable[0].medium / C5), 1),
            large: Math.min((releaseRateTable[0].large / C5), 1),
            rupture: Math.min((releaseRateTable[0].rupture / C5), 1)
        },
        {
            small: Math.min((releaseRateTable[1].small / C5), 1),
            medium: Math.min((releaseRateTable[1].medium / C5), 1),
            large: Math.min((releaseRateTable[1].large / C5), 1),
            rupture: Math.min((releaseRateTable[1].rupture / C5), 1)
        },
        {
            small: Math.min((releaseRateTable[2].small / C5), 1),
            medium: Math.min((releaseRateTable[2].medium / C5), 1),
            large: Math.min((releaseRateTable[2].large / C5), 1),
            rupture: Math.min((releaseRateTable[2].rupture / C5), 1)
        },
        {
            small: Math.min((releaseRateTable[3].small / C5), 1),
            medium: Math.min((releaseRateTable[3].medium / C5), 1),
            large: Math.min((releaseRateTable[3].large / C5), 1),
            rupture: Math.min((releaseRateTable[3].rupture / C5), 1)
        },
    ]

    const eDurationMassSmall = Math.min(releaseRateWnSmall * leakDurationSmall, astMassSmall)
    const eDurationMassMedium = Math.min(releaseRateWnMedium * leakDurationMedium, astMassMedium)
    const eDurationMassLarge = Math.min(releaseRateWnLarge * leakDurationLarge, astMassLarge)
    const eDurationMassRupture = Math.min(releaseRateWnRupture * leakDurationRupture, astMassRupture)

    const eDurationMassTable = [
        {
            small: Math.min(releaseRateTable[0].small * leakDurationTable[0].small, astMassTable[0].small),
            medium: Math.min(releaseRateTable[0].medium * leakDurationTable[0].medium, astMassTable[0].medium),
            large: Math.min(releaseRateTable[0].large * leakDurationTable[0].large, astMassTable[0].large),
            rupture: Math.min(releaseRateTable[0].rupture * leakDurationTable[0].rupture, astMassTable[0].rupture),
        },
        {
            small: Math.min(releaseRateTable[1].small * leakDurationTable[1].small, astMassTable[1].small),
            medium: Math.min(releaseRateTable[1].medium * leakDurationTable[1].medium, astMassTable[1].medium),
            large: Math.min(releaseRateTable[1].large * leakDurationTable[1].large, astMassTable[1].large),
            rupture: Math.min(releaseRateTable[1].rupture * leakDurationTable[1].rupture, astMassTable[1].rupture),
        },
        {
            small: Math.min(releaseRateTable[2].small * leakDurationTable[2].small, astMassTable[2].small),
            medium: Math.min(releaseRateTable[2].medium * leakDurationTable[2].medium, astMassTable[2].medium),
            large: Math.min(releaseRateTable[2].large * leakDurationTable[2].large, astMassTable[2].large),
            rupture: Math.min(releaseRateTable[2].rupture * leakDurationTable[2].rupture, astMassTable[2].rupture),
        },
        {
            small: Math.min(releaseRateTable[3].small * leakDurationTable[3].small, astMassTable[3].small),
            medium: Math.min(releaseRateTable[3].medium * leakDurationTable[3].medium, astMassTable[3].medium),
            large: Math.min(releaseRateTable[3].large * leakDurationTable[3].large, astMassTable[3].large),
            rupture: Math.min(releaseRateTable[3].rupture * leakDurationTable[3].rupture, astMassTable[3].rupture),
        },
    ]

    const leakDurationIdnSmall = Math.min(3600, (eDurationMassSmall/releaseRateWnSmall), 60 * leakDurationSmall)
    const leakDurationIdnMedium = Math.min(3600, (eDurationMassMedium/releaseRateWnMedium), 60 * leakDurationMedium)
    const leakDurationIdnLarge = Math.min(3600, (eDurationMassLarge/releaseRateWnLarge), 60 * leakDurationLarge)
    const leakDurationIdnRupture = Math.min(3600, (eDurationMassRupture/releaseRateWnRupture), 60 * leakDurationRupture)

    const leakDurationIdnTable = [
        {
            small: Math.min(3600, (eDurationMassTable[0].small / releaseRateTable[0].small), 60 * leakDurationTable[0].small),
            medium: Math.min(3600, (eDurationMassTable[0].medium / releaseRateTable[0].medium), 60 * leakDurationTable[0].medium),
            large: Math.min(3600, (eDurationMassTable[0].large / releaseRateTable[0].large), 60 * leakDurationTable[0].large),
            rupture: Math.min(3600, (eDurationMassTable[0].rupture / releaseRateTable[0].rupture), 60 * leakDurationTable[0].rupture),
        },
        {
            small: Math.min(3600, (eDurationMassTable[1].small / releaseRateTable[1].small), 60 * leakDurationTable[1].small),
            medium: Math.min(3600, (eDurationMassTable[1].medium / releaseRateTable[1].medium), 60 * leakDurationTable[1].medium),
            large: Math.min(3600, (eDurationMassTable[1].large / releaseRateTable[1].large), 60 * leakDurationTable[1].large),
            rupture: Math.min(3600, (eDurationMassTable[1].rupture / releaseRateTable[1].rupture), 60 * leakDurationTable[1].rupture),
        },
        {
            small: Math.min(3600, (eDurationMassTable[2].small / releaseRateTable[2].small), 60 * leakDurationTable[2].small),
            medium: Math.min(3600, (eDurationMassTable[2].medium / releaseRateTable[2].medium), 60 * leakDurationTable[2].medium),
            large: Math.min(3600, (eDurationMassTable[2].large / releaseRateTable[2].large), 60 * leakDurationTable[2].large),
            rupture: Math.min(3600, (eDurationMassTable[2].rupture / releaseRateTable[2].rupture), 60 * leakDurationTable[2].rupture),
        },
        {
            small: Math.min(3600, (eDurationMassTable[3].small / releaseRateTable[3].small), 60 * leakDurationTable[3].small),
            medium: Math.min(3600, (eDurationMassTable[3].medium / releaseRateTable[3].medium), 60 * leakDurationTable[3].medium),
            large: Math.min(3600, (eDurationMassTable[3].large / releaseRateTable[3].large), 60 * leakDurationTable[3].large),
            rupture: Math.min(3600, (eDurationMassTable[3].rupture / releaseRateTable[3].rupture), 60 * leakDurationTable[3].rupture),
        }
    ]

    const releaseRateToxSmall = cof_C1mfracTox * releaseRateWnSmall
    const releaseRateToxMedium = cof_C1mfracTox * releaseRateWnMedium
    const releaseRateToxLarge = cof_C1mfracTox * releaseRateWnLarge
    const releaseRateToxRupture = cof_C1mfracTox * releaseRateWnRupture

    const releaseRateToxTable = [
        {
            small: cof_C1mfracTox * releaseRateTable[0].small,
            medium: cof_C1mfracTox * releaseRateTable[0].medium,
            large: cof_C1mfracTox * releaseRateTable[0].large,
            rupture: cof_C1mfracTox * releaseRateTable[0].rupture,
        },
        {
            small: cof_C1mfracTox * releaseRateTable[1].small,
            medium: cof_C1mfracTox * releaseRateTable[1].medium,
            large: cof_C1mfracTox * releaseRateTable[1].large,
            rupture: cof_C1mfracTox * releaseRateTable[1].rupture,
        },
        {
            small: cof_C1mfracTox * releaseRateTable[2].small,
            medium: cof_C1mfracTox * releaseRateTable[2].medium,
            large: cof_C1mfracTox * releaseRateTable[2].large,
            rupture: cof_C1mfracTox * releaseRateTable[2].rupture,
        },
        {
            small: cof_C1mfracTox * releaseRateTable[3].small,
            medium: cof_C1mfracTox * releaseRateTable[3].medium,
            large: cof_C1mfracTox * releaseRateTable[3].large,
            rupture: cof_C1mfracTox * releaseRateTable[3].rupture,
        },
    ]

    const toxicMassSmall = cof_C1mfracTox * eDurationMassSmall
    const toxicMassMedium = cof_C1mfracTox * eDurationMassMedium
    const toxicMassLarge = cof_C1mfracTox * eDurationMassLarge
    const toxicMassRupture = cof_C1mfracTox * eDurationMassRupture

    const toxicMassTable = [
        {
            small: cof_C1mfracTox * eDurationMassTable[0].small,
            medium: cof_C1mfracTox * eDurationMassTable[0].medium,
            large: cof_C1mfracTox * eDurationMassTable[0].large,
            rupture: cof_C1mfracTox * eDurationMassTable[0].rupture,
        },
        {
            small: cof_C1mfracTox * eDurationMassTable[1].small,
            medium: cof_C1mfracTox * eDurationMassTable[1].medium,
            large: cof_C1mfracTox * eDurationMassTable[1].large,
            rupture: cof_C1mfracTox * eDurationMassTable[1].rupture,
        },
        {
            small: cof_C1mfracTox * eDurationMassTable[2].small,
            medium: cof_C1mfracTox * eDurationMassTable[2].medium,
            large: cof_C1mfracTox * eDurationMassTable[2].large,
            rupture: cof_C1mfracTox * eDurationMassTable[2].rupture,
        },
        {
            small: cof_C1mfracTox * eDurationMassTable[3].small,
            medium: cof_C1mfracTox * eDurationMassTable[3].medium,
            large: cof_C1mfracTox * eDurationMassTable[3].large,
            rupture: cof_C1mfracTox * eDurationMassTable[3].rupture,
        },
    ]

    const AITBlendedSmall = 0
    const AITBlendedMedium = 0
    const AITBlendedLarge = 0
    const AITBlendedRupture = 0

    const continousReleaseSmall = 15150 * releaseRateToxSmall ** 1.097
    const continousReleaseMedium = 15150 * releaseRateToxMedium ** 1.097
    const continousReleaseLarge = 15150 * releaseRateToxLarge ** 1.097
    const continousReleaseRupture = 15150 * releaseRateToxRupture ** 1.097

    const {sizeSmall, sizeMedium, sizeLarge, sizeRupture, total} = failureFreq || {}

    const consequenceAreaCMD = 0
    const consequenceAreaINJ = ((sizeSmall * continousReleaseSmall) + (sizeMedium * continousReleaseMedium) + (sizeLarge * continousReleaseLarge) + (sizeRupture * continousReleaseRupture)) / total

    const finalConsequenceM = Math.max(consequenceAreaCMD, consequenceAreaINJ)

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
        releaseRatenBblTable,
        leakDetectionTable,
        leakDurationSmall,
        leakDurationMedium,
        leakDurationLarge,
        leakDurationRupture,
        leakDurationTable,
        rVolLeakageBBLSmall,
        rVolLeakageBBLMedium,
        rVolLeakageBBLLarge,
        rVolLeakageBBLRupture,
        rVolLeakageTable,
        rMassLeakageTable,
        rVolRuptureBBLTable,
        rMassRuptureBBLTable,
        consCAINLSmall,
        consCAINLMedium,
        consCAINLLarge,
        consCAINLRupture,
        consCAINLTable,
        consCAILLSmall,
        consCAILLMedium,
        consCAILLLarge,
        consCAILLRupture,
        consCAILTable,
        consCAINLGSmall,
        consCAINLGMedium,
        consCAINLGLarge,
        consCAINLGRupture,
        consCAINLGTable,
        consCAILGSmall,
        consCAILGMedium,
        consCAILGLarge,
        consCAILGRupture,
        consCAILGTable,
        blendingFactorSmall,
        blendingFactorMedium,
        blendingFactorLarge,
        blendingFactorRupture,
        blendingFactorTable,
        eDurationMassSmall,
        eDurationMassMedium,
        eDurationMassLarge,
        eDurationMassRupture,
        eDurationMassTable,
        leakDurationIdnSmall,
        leakDurationIdnMedium,
        leakDurationIdnLarge,
        leakDurationIdnRupture,
        leakDurationIdnTable,
        releaseRateToxSmall,
        releaseRateToxMedium,
        releaseRateToxLarge,
        releaseRateToxRupture,
        releaseRateToxTable,
        toxicMassSmall,
        toxicMassMedium,
        toxicMassLarge,
        toxicMassRupture,
        toxicMassTable,
        finalConsequenceM
    }
}
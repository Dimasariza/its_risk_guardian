import { amoniaAndChlorine } from "@/app/(main)/risk-based-inspection/tab-menu/cof/amoniaAndChlorine";
import IGeneralData from "@/types/IGeneralData";
import { useSelector } from "react-redux";

interface ICofCalculation {
    generalData: IGeneralData
    fluidSelected: any
    cofValue: any,
    impact: any
    componentType: string
}

export const totalLeakDuration = [
    {
        detection: ["A"],
        isolation: ["A"],
        leakDuration: [
            {
                value: 20,
                notes: "20 minutes for 1/4 inch leaks"
            },
            {
                value: 10,
                notes: "10 minutes for 1 inch leaks"
            },
            {
                value: 5,
                notes: "5 minutes for 4 inch leaks"
            },
        ]
    },
    {
        detection: ["A"],
        isolation: ["B"],
        leakDuration: [
            {
                value: 30,
                notes: "30 minutes for 1/4 inch leaks"
            },
            {
                value: 20,
                notes: "20 minutes for 1 inch leaks"
            },
            {
                value: 10,
                notes: "10 minutes for 4 inch leaks"
            },
        ]
    },
    {
        detection: ["A"],
        isolation: ["C"],
        leakDuration: [
            {
                value: 40,
                notes: "40 minutes for 1/4 inch leaks"
            },
            {
                value: 30,
                notes: "30 minutes for 1 inch leaks"
            },
            {
                value: 20,
                notes: "20 minutes for 4 inch leaks"
            },
        ]
    },
    {
        detection: ["B"],
        isolation: ["A", "B"],
        leakDuration: [
            {
                value: 40,
                notes: "40 minutes for 1/4 inch leaks"
            },
            {
                value: 30,
                notes: "30 minutes for 1 inch leaks"
            },
            {
                value: 20,
                notes: "20 minutes for 4 inch leaks"
            },
        ]
    },
    {
        detection: ["B"],
        isolation: ["C"],
        leakDuration: [
            {
                value: 60,
                notes: "1 hour for 1/4 inch leaks"
            },
            {
                value: 30,
                notes: "30 minutes for 1 inch leaks"
            },
            {
                value: 20,
                notes: "20 minutes for 4 inch leaks"
            },
        ]
    },
    {
        detection: ["C"],
        isolation: ["A", "B", "C"],
        leakDuration: [
            {
                value: 60,
                notes: "1 hour for 1/4 inch leaks"
            },
            {
                value: 40,
                notes: "40 minutes for 1 inch leaks"
            },
            {
                value: 20,
                notes: "20 minutes for 4 inch leaks"
            },
        ]
    },
]

const reductionFactor = [
    {
        detection: ["A"],
        isolation: ["A"],
        release: "Reduce release rate or mass by 25%",
        factor: 0.25
    },
    {
        detection: ["A"],
        isolation: ["B"],
        release: "Reduce release rate or mass by 20%",
        factor: 0.2
    },
    {
        detection: ["A", "B"],
        isolation: ["C"],
        release: "Reduce release rate or mass by 10%",
        factor: 0.1
    },
    {
        detection: ["B"],
        isolation: ["B"],
        release: "Reduce release rate or mass by 15%",
        factor: 0.15
    },
    {
        detection: ["C"],
        isolation: ["C"],
        release: "No adjustment to release rate or mass",
        factor: 0
    },
]

export const calculateCOF = ({generalData, fluidSelected, cofValue, impact, componentType}: ICofCalculation) => {
    if(!Object.keys(generalData).length) return {}

    const {
        gData_operatingTemperatureC,
        gData_operatingPressureBar
    } = generalData;

    const gData_operatingTempOnF = (gData_operatingTemperatureC * 9 / 5) + 32
    const gData_operatingTempOnK = (gData_operatingTempOnF - 32) * 5 / 9 + 273.15

    const { constant_a, constant_b, constant_c , constant_d, mw } = fluidSelected || {};
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
        cof_damageCons,
        cof_ps,
        failureFreq
    } = cofValue || {}

    const {
        sizeSmall,
        sizeMedium,
        sizeLarge,
        sizeRupture,
        total
    } = failureFreq || {}

    const PI = 3.142

    const basedOnDNSmallmm = ((PI * cof_releaseHoleSizeD1 ** 2)) / 4
    const basedOnDNSmallm = basedOnDNSmallmm / 1000
    const basedOnDNMediummm = ((PI * cof_releaseHoleSizeD2 ** 2)) / 4
    const basedOnDNMediumm = basedOnDNMediummm / 1000
    const basedOnDNLargemm = ((PI * cof_releaseHoleSizeD3 ** 2)) / 4
    const basedOnDNLargem = basedOnDNLargemm / 1000
    const basedOnDNRupturemm = ((PI * cof_releaseHoleSizeD4 ** 2)) / 4
    const basedOnDNRupturem = basedOnDNRupturemm / 1000

    const C2 = 1
    const C3 = 4536 // kg
    const C4 = 2.205 // 1/kg
    const C5 = 25.2
    const C9 = 0.123
    const C10 = 9.744
    const Gc = 1
    const Cd = componentType == "Pipe" ? 0.61 : 0.9  // 0.61 untuk pipa
    const Ps = cof_ps ? cof_ps * 6.895 : gData_operatingPressureBar * 14.5037738 * 6.895
    const idealGasHeatRatio = 1.19953997
    const universalGasConstant = 8.314

    const releaseRateWnSmall = ((Cd / C2) * basedOnDNSmallm * Ps) 
    * (((Number(idealGasHeatRatio) * mw! * Gc) / (universalGasConstant * gData_operatingTempOnK)) 
    * (2 / (Number(idealGasHeatRatio) + 1)) ** ((Number(idealGasHeatRatio) + 1) / (Number(idealGasHeatRatio) - 1))) ** 0.5
    const releaseRateWnMedium = ((Cd / C2) * basedOnDNMediumm * Ps) 
    * (((idealGasHeatRatio * mw! * Gc) / (universalGasConstant * gData_operatingTempOnK)) 
    * (2 / (idealGasHeatRatio + 1)) ** ((idealGasHeatRatio + 1) / (idealGasHeatRatio - 1))) ** 0.5
    const releaseRateWnLarge = ((Cd / C2) * basedOnDNLargem * Ps) 
    * (((idealGasHeatRatio * mw! * Gc) / (universalGasConstant * gData_operatingTempOnK)) 
    * (2 / (idealGasHeatRatio + 1)) ** ((idealGasHeatRatio + 1) / (idealGasHeatRatio - 1))) ** 0.5
    const releaseRateWnRupture = ((Cd / C2) * basedOnDNRupturem * Ps) 
    * (((idealGasHeatRatio * mw! * Gc) / (universalGasConstant * gData_operatingTempOnK)) 
    * (2 / (idealGasHeatRatio + 1)) ** ((idealGasHeatRatio + 1) / (idealGasHeatRatio - 1))) ** 0.5
    
    const wMax = ((Cd / C2) * 0.03244 * Ps)
    * (((idealGasHeatRatio * mw * Gc) / (universalGasConstant * gData_operatingTempOnK))
    * (2 / (idealGasHeatRatio + 1)) ** ((idealGasHeatRatio + 1) / (idealGasHeatRatio - 1))) ** 0.5
    
    const addedFluidMassSmall = 180 * Math.min(releaseRateWnSmall, wMax) 
    const addedFluidMassMedium = 180 * Math.min(releaseRateWnMedium, wMax) 
    const addedFluidMassLarge = 180 * Math.min(releaseRateWnLarge, wMax) 
    const addedFluidMassRupture = 180 * Math.min(releaseRateWnRupture, wMax) 
    
    const availableMassSmall = Math.min(Number(cof_massComponent) + Number(addedFluidMassSmall), cof_massInventory)
    const availableMassMedium = Math.min(Number(cof_massComponent) + Number(addedFluidMassMedium), cof_massInventory)
    const availableMassLarge = Math.min(Number(cof_massComponent) + Number(addedFluidMassLarge), cof_massInventory)
    const availableMassRupture = Math.min(Number(cof_massComponent) + Number(addedFluidMassRupture), cof_massInventory)
    
    const timeRequiredSmall = C3 / releaseRateWnSmall
    const timeRequiredMedium = C3 / releaseRateWnMedium
    const timeRequiredLarge = C3 / releaseRateWnLarge
    const timeRequiredRupture = C3 / releaseRateWnRupture

    const {factor}: any = reductionFactor.find((i: any) => (i.detection.includes(impact?.cof_detectionSystem?.classification) 
    && i.isolation.includes(impact?.cof_isolationSystem?.classification))) || {}
    const adjReleaseRateSmall = releaseRateWnSmall * (1 - factor!)
    const adjReleaseRateMedium = releaseRateWnMedium * (1 - factor!)
    const adjReleaseRateLarge = releaseRateWnLarge * (1 - factor!)
    const adjReleaseRateRupture = releaseRateWnRupture * (1 - factor!)

    const { leakDuration } : any = totalLeakDuration?.find((i: any) => (i.detection.includes(impact?.cof_detectionSystem?.classification) && i.isolation.includes(impact?.cof_isolationSystem?.classification))) || {}
    const leakDurationSmall = Math.min((availableMassSmall / adjReleaseRateSmall), (60 * leakDuration?.[0]?.value))
    const leakDurationMedium = Math.min((availableMassMedium / adjReleaseRateMedium), (60 * leakDuration?.[1]?.value))
    const leakDurationLarge = Math.min((availableMassLarge / adjReleaseRateLarge), (60 * leakDuration?.[2]?.value))
    const leakDurationRupture = Math.min((availableMassRupture / adjReleaseRateRupture), (60 * leakDuration?.[2]?.value))

    const releaseMassSmall = Math.min((adjReleaseRateSmall * leakDurationSmall), availableMassSmall)
    const releaseMassMedium = Math.min((adjReleaseRateMedium * leakDurationMedium), availableMassMedium)
    const releaseMassLarge = Math.min((adjReleaseRateLarge * leakDurationLarge), availableMassLarge)
    const releaseMassRupture = Math.min((adjReleaseRateRupture * leakDurationRupture), availableMassRupture)
    
    const energyEfficiencySmall = 4 * Math.log10(C4 * releaseMassSmall) - 15
    const energyEfficiencyMedium = 4 * Math.log10(C4 * releaseMassMedium) - 15
    const energyEfficiencyLarge = 4 * Math.log10(C4 * releaseMassLarge) - 15
    const energyEfficiencyRupture = 4 * Math.log10(C4 * releaseMassRupture) - 15

    const { 
        CAINLGA: d_CAINLGA, 
        CAINLGB: d_CAINLGB, 
        CAILGA: d_CAILGA, 
        CAILGB: d_CAILGB, 
        IAINLGA: d_IAINLGA, 
        IAINLGB: d_IAINLGB, 
        IAILGA: d_IAILGA, 
        IAILGB: d_IAILGB 
    } = cofValue?.damage?.data || {}
    const CAAINL_C_Small = d_CAINLGA * ((adjReleaseRateSmall ** d_CAINLGB) * (1 - cofValue?.mitigation?.factorLimit))
    const CAAINL_C_Medium = d_CAINLGA * ((adjReleaseRateMedium ** d_CAINLGB) * (1 - cofValue?.mitigation?.factorLimit))
    const CAAINL_C_Large = d_CAINLGA * ((adjReleaseRateLarge ** d_CAINLGB) * (1 - cofValue?.mitigation?.factorLimit))
    const CAAINL_C_Rupture = d_CAINLGA * ((adjReleaseRateRupture ** d_CAINLGB) * (1 - cofValue?.mitigation?.factorLimit))
    
    const CAAIL_C_Small = d_CAILGA * ((adjReleaseRateSmall ** d_CAILGB) * (1 - cofValue?.mitigation?.factorLimit))
    const CAAIL_C_Medium = d_CAILGA * ((adjReleaseRateMedium ** d_CAILGB) * (1 - cofValue?.mitigation?.factorLimit))
    const CAAIL_C_Large = d_CAILGA * ((adjReleaseRateLarge ** d_CAILGB) * (1 - cofValue?.mitigation?.factorLimit))
    const CAAIL_C_Rupture = d_CAILGA * ((adjReleaseRateRupture ** d_CAILGB) * (1 - cofValue?.mitigation?.factorLimit))

    const IAAINL_C_Small = (d_IAINLGA * releaseMassSmall ** d_IAINLGB * ((1 - cofValue?.mitigation?.factorLimit) / energyEfficiencySmall))
    const IAAINL_C_Medium = (d_IAINLGA * releaseMassMedium ** d_IAINLGB * ((1 - cofValue?.mitigation?.factorLimit) / energyEfficiencyMedium))
    const IAAINL_C_Large = (d_IAINLGA * releaseMassLarge ** d_IAINLGB * ((1 - cofValue?.mitigation?.factorLimit) / energyEfficiencyLarge))
    const IAAINL_C_Rupture = (d_IAINLGA * releaseMassRupture ** d_IAINLGB * ((1 - cofValue?.mitigation?.factorLimit) / energyEfficiencyRupture))

    const IAAIL_C_Small = (d_IAILGA * releaseMassSmall ** d_IAILGB * ((1 - cofValue?.mitigation?.factorLimit) / energyEfficiencySmall))
    const IAAIL_C_Medium = (d_IAILGA * releaseMassMedium ** d_IAILGB * ((1 - cofValue?.mitigation?.factorLimit) / energyEfficiencyMedium))
    const IAAIL_C_Large = (d_IAILGA * releaseMassLarge ** d_IAILGB * ((1 - cofValue?.mitigation?.factorLimit) / energyEfficiencyLarge))
    const IAAIL_C_Rupture = (d_IAILGA * releaseMassRupture ** d_IAILGB * ((1 - cofValue?.mitigation?.factorLimit) / energyEfficiencyRupture))

    const { 
        CAINLGA: f_CAINLGA, 
        CAINLGB: f_CAINLGB, 
        CAILGA: f_CAILGA, 
        CAILGB: f_CAILGB, 
        IAINLGA: f_IAINLGA, 
        IAINLGB: f_IAINLGB, 
        IAILGA: f_IAILGA, 
        IAILGB: f_IAILGB 
    } = cofValue?.flamable?.data || {}

    const CAAINL_P_Small = f_CAINLGA * ((adjReleaseRateSmall ** f_CAINLGB) * (1 - cofValue?.mitigation?.factorLimit))
    const CAAINL_P_Medium = f_CAINLGA * ((adjReleaseRateMedium ** f_CAINLGB) * (1 - cofValue?.mitigation?.factorLimit))
    const CAAINL_P_Large = f_CAINLGA * ((adjReleaseRateLarge ** f_CAINLGB) * (1 - cofValue?.mitigation?.factorLimit))
    const CAAINL_P_Rupture = f_CAINLGA * ((adjReleaseRateRupture ** f_CAINLGB) * (1 - cofValue?.mitigation?.factorLimit))
    
    const CAAIL_P_Small = f_CAILGA * ((adjReleaseRateSmall ** f_CAILGB) * (1 - cofValue?.mitigation?.factorLimit))
    const CAAIL_P_Medium = f_CAILGA * ((adjReleaseRateMedium ** f_CAILGB) * (1 - cofValue?.mitigation?.factorLimit))
    const CAAIL_P_Large = f_CAILGA * ((adjReleaseRateLarge ** f_CAILGB) * (1 - cofValue?.mitigation?.factorLimit))
    const CAAIL_P_Rupture = f_CAILGA * ((adjReleaseRateRupture ** f_CAILGB) * (1 - cofValue?.mitigation?.factorLimit))

    const IAAINL_P_Small = (f_IAINLGA * releaseMassSmall ** f_IAINLGB * ((1 - cofValue?.mitigation?.factorLimit) / energyEfficiencySmall))
    const IAAINL_P_Medium = (f_IAINLGA * releaseMassMedium ** f_IAINLGB * ((1 - cofValue?.mitigation?.factorLimit) / energyEfficiencyMedium))
    const IAAINL_P_Large = (f_IAINLGA * releaseMassLarge ** f_IAINLGB * ((1 - cofValue?.mitigation?.factorLimit) / energyEfficiencyLarge))
    const IAAINL_P_Rupture = (f_IAINLGA * releaseMassRupture ** f_IAINLGB * ((1 - cofValue?.mitigation?.factorLimit) / energyEfficiencyRupture))

    const IAAIL_P_Small = (f_IAILGA * releaseMassSmall ** f_IAILGB * ((1 - cofValue?.mitigation?.factorLimit) / energyEfficiencySmall))
    const IAAIL_P_Medium = (f_IAILGA * releaseMassMedium ** f_IAILGB * ((1 - cofValue?.mitigation?.factorLimit) / energyEfficiencyMedium))
    const IAAIL_P_Large = (f_IAILGA * releaseMassLarge ** f_IAILGB * ((1 - cofValue?.mitigation?.factorLimit) / energyEfficiencyLarge))
    const IAAIL_P_Rupture = (f_IAILGA * releaseMassRupture ** f_IAILGB * ((1 - cofValue?.mitigation?.factorLimit) / energyEfficiencyRupture))

    const factICSmall = Math.min((adjReleaseRateSmall / C5), 1)
    const factICMedium = Math.min((adjReleaseRateMedium / C5), 1)
    const factICLarge = Math.min((adjReleaseRateLarge / C5), 1)
    const factICRupture = Math.min((adjReleaseRateRupture / C5), 1)

    const factAIt = 0

    const CAAILcmdSmall = (IAAIL_C_Small * factICSmall) + (CAAIL_C_Small * (1 - factICSmall))
    const CAAILcmdMedium = (IAAIL_C_Medium * factICMedium) + (CAAIL_C_Medium * (1 - factICMedium))
    const CAAILcmdLarge = (IAAIL_C_Large * factICLarge) + (CAAIL_C_Large * (1 - factICLarge))
    const CAAILcmdRupture = (IAAIL_C_Rupture * factICRupture) + (CAAIL_C_Rupture * (1 - factICRupture))

    const CAAILinjSmall = (IAAIL_P_Small * factICSmall) + (CAAIL_P_Small * (1 - factICSmall))
    const CAAILinjMedium = (IAAIL_P_Medium * factICMedium) + (CAAIL_P_Medium * (1 - factICMedium))
    const CAAILinjLarge = (IAAIL_P_Large * factICLarge) + (CAAIL_P_Large * (1 - factICLarge))
    const CAAILinjRupture = (IAAIL_P_Rupture * factICRupture) + (CAAIL_P_Rupture * (1 - factICRupture))

    const CAAINLcmdSmall = (IAAINL_C_Small * factICSmall) + (CAAINL_C_Small * (1 - factICSmall))
    const CAAINLcmdMedium = (IAAINL_C_Medium * factICMedium) + (CAAINL_C_Medium * (1 - factICMedium))
    const CAAINLcmdLarge = (IAAINL_C_Large * factICLarge) + (CAAINL_C_Large * (1 - factICLarge))
    const CAAINLcmdRupture = (IAAINL_C_Rupture * factICRupture) + (CAAINL_C_Rupture * (1 - factICRupture))

    const CAAINLinjSmall = (IAAINL_P_Small * factICSmall) + (CAAINL_P_Small * (1 - factICSmall))
    const CAAINLinjMedium = (IAAINL_P_Medium * factICMedium) + (CAAINL_P_Medium * (1 - factICMedium))
    const CAAINLinjLarge = (IAAINL_P_Large * factICLarge) + (CAAINL_P_Large * (1 - factICLarge))
    const CAAINLinjRupture = (IAAINL_P_Rupture * factICRupture) + (CAAINL_P_Rupture * (1 - factICRupture))

    const CAFlamCmdSmall = (CAAILcmdSmall * factAIt) + (CAAINLcmdSmall * (1 - factAIt))
    const CAFlamCmdMedium = (CAAILcmdMedium * factAIt) + (CAAINLcmdMedium * (1 - factAIt))
    const CAFlamCmdLarge = (CAAILcmdLarge * factAIt) + (CAAINLcmdLarge * (1 - factAIt))
    const CAFlamCmdRupture = (CAAILcmdRupture * factAIt) + (CAAINLcmdRupture * (1 - factAIt))

    const CAFlamInjSmall = (CAAILinjSmall * factAIt) + (CAAINLinjSmall * (1 - factAIt))
    const CAFlamInjMedium = (CAAILinjMedium * factAIt) + (CAAINLinjMedium * (1 - factAIt))
    const CAFlamInjLarge = (CAAILinjLarge * factAIt) + (CAAINLinjLarge * (1 - factAIt))
    const CAFlamInjRupture = (CAAILinjRupture * factAIt) + (CAAINLinjRupture * (1 - factAIt))

    const durationToxicSmall = Math.min(3600, (releaseMassSmall / releaseRateWnSmall), (60 * leakDuration?.[0]?.value))
    const durationToxicMedium = Math.min(3600, (releaseMassMedium / releaseRateWnMedium), (60 * leakDuration?.[1]?.value))
    const durationToxicLarge = Math.min(3600, (releaseMassLarge / releaseRateWnLarge), (60 * leakDuration?.[2]?.value))
    const durationToxicRupture = Math.min(3600, (releaseMassRupture / releaseRateWnRupture), (60 * leakDuration?.[2]?.value))

    const C1mfracTox = 0.0004
    const toxicReleaseRateSmall = releaseRateWnSmall * C1mfracTox
    const toxicReleaseRateMedium = releaseRateWnMedium * C1mfracTox
    const toxicReleaseRateLarge = releaseRateWnLarge * C1mfracTox
    const toxicReleaseRateRupture = releaseRateWnRupture * C1mfracTox

    const toxicReleaseMassSmall = releaseMassSmall * C1mfracTox
    const toxicReleaseMassMedium = releaseMassMedium * C1mfracTox
    const toxicReleaseMassLarge = releaseMassLarge * C1mfracTox
    const toxicReleaseMassRupture = releaseMassRupture * C1mfracTox

    const {chlorineE: cESmall, chlorineF: cFSmall}: any = amoniaAndChlorine.find((i: any) => i.duration == leakDuration?.[0].value) || {}
    const {chlorineE: cEMedium, chlorineF: cFMedium}: any = amoniaAndChlorine.find((i: any) => i.duration == leakDuration?.[1].value) || {}
    const {chlorineE: cELarge, chlorineF: cFLarge}: any = amoniaAndChlorine.find((i: any) => i.duration == leakDuration?.[2].value) || {}
    const {chlorineE: cERupture, chlorineF: cFRupture}: any = amoniaAndChlorine.find((i: any) => i.duration == leakDuration?.[2].value) || {}
    const toxicConsAreqSmall =  cESmall * toxicReleaseRateSmall  ** cFSmall
    const toxicConsAreqMedium =  cEMedium * toxicReleaseRateMedium  ** cFMedium
    const toxicConsAreqLarge =  cELarge * toxicReleaseRateLarge  ** cFLarge
    const toxicConsAreqRupture =  cERupture * toxicReleaseRateRupture  ** cFRupture

    const forSteamSmall = C9 * adjReleaseRateSmall
    const forSteamMedium = C9 * adjReleaseRateMedium
    const forSteamLarge = (C10 * releaseMassLarge) ** 0.6384
    const forSteamRupture = (C10 *  releaseMassRupture) ** 0.6384

    const forAcidCausticSmall = (0 * factICSmall) + (forSteamSmall * (1 - factICSmall))
    const forAcidCausticMedium = (forSteamLarge * factICLarge) + (0 * (1 - factICMedium))
    const forAcidCausticLarge = (0 * factICLarge) + (forSteamLarge * (1 - factICLarge))
    const forAcidCausticRupture = (forSteamRupture * factICRupture) + (0 * (1 - factICRupture))

    const CA_ToxInjuries = ((sizeSmall * toxicConsAreqSmall) 
    + (sizeMedium * toxicConsAreqMedium) 
    + (sizeLarge * toxicConsAreqLarge) 
    + (sizeRupture * toxicConsAreqRupture)) 
    / total
    const CA_NonFlamable = ((sizeSmall * forAcidCausticSmall) 
    + (sizeMedium * forAcidCausticMedium) + (sizeLarge * forAcidCausticLarge) 
    + (sizeRupture * forAcidCausticRupture)) 
    / total
    const CA_ComponentDamage = ((sizeSmall * CAFlamCmdSmall) 
    + (sizeMedium * CAFlamCmdMedium) 
    + (sizeLarge * CAFlamCmdLarge) 
    + (sizeRupture * CAFlamCmdRupture)) 
    / total
    const CA_PersonalInjuries = ((sizeSmall * CAFlamInjSmall) 
    + (sizeMedium * CAFlamInjMedium) 
    + (sizeLarge * CAFlamInjLarge) 
    + (sizeRupture * CAFlamInjRupture)) 
    / total

    const finalConsequenceM = Math.max(
        Number(CA_ToxInjuries), 
        Number(CA_NonFlamable),
        Number(CA_ComponentDamage), 
        Number(CA_PersonalInjuries), 
    )

    return {
        getIdealGasHeatRatio: kRatio / (kRatio - constantR),
        basedOnDNSmallmm,
        basedOnDNSmallm,
        basedOnDNMediummm,
        basedOnDNMediumm,
        basedOnDNLargemm,
        basedOnDNLargem,
        basedOnDNRupturemm,
        basedOnDNRupturem,
        releaseRateWnSmall,
        releaseRateWnMedium,
        releaseRateWnLarge,
        releaseRateWnRupture,
        addedFluidMassSmall,
        addedFluidMassMedium,
        addedFluidMassLarge,
        addedFluidMassRupture,
        availableMassSmall,
        availableMassMedium,
        availableMassLarge,
        availableMassRupture,
        timeRequiredSmall,
        timeRequiredMedium,
        timeRequiredLarge,
        timeRequiredRupture,
        adjReleaseRateSmall,
        adjReleaseRateMedium,
        adjReleaseRateLarge,
        adjReleaseRateRupture,
        leakDurationSmall,
        leakDurationMedium,
        leakDurationLarge,
        leakDurationRupture,
        releaseMassSmall,
        releaseMassMedium,
        releaseMassLarge,
        releaseMassRupture,
        energyEfficiencySmall,
        energyEfficiencyMedium,
        energyEfficiencyLarge,
        energyEfficiencyRupture,
        CAAINL_C_Small,
        CAAINL_C_Medium,
        CAAINL_C_Large,
        CAAINL_C_Rupture,
        CAAIL_C_Small,
        CAAIL_C_Medium,
        CAAIL_C_Large,
        CAAIL_C_Rupture,
        IAAINL_C_Small,
        IAAINL_C_Medium,
        IAAINL_C_Large,
        IAAINL_C_Rupture,
        IAAIL_C_Small,
        IAAIL_C_Medium,
        IAAIL_C_Large,
        IAAIL_C_Rupture,
        CAAINL_P_Small,
        CAAINL_P_Medium,
        CAAINL_P_Large,
        CAAINL_P_Rupture,
        CAAIL_P_Small,
        CAAIL_P_Medium,
        CAAIL_P_Large,
        CAAIL_P_Rupture,
        IAAINL_P_Small,
        IAAINL_P_Medium,
        IAAINL_P_Large,
        IAAINL_P_Rupture,
        IAAIL_P_Small,
        IAAIL_P_Medium,
        IAAIL_P_Large,
        IAAIL_P_Rupture,
        factICSmall,
        factICMedium,
        factICLarge,
        factICRupture,
        CAAILcmdSmall,
        CAAILcmdMedium,
        CAAILcmdLarge,
        CAAILcmdRupture,
        CAAILinjSmall,
        CAAILinjMedium,
        CAAILinjLarge,
        CAAILinjRupture,
        CAAINLcmdSmall,
        CAAINLcmdMedium,
        CAAINLcmdLarge,
        CAAINLcmdRupture,
        CAAINLinjSmall,
        CAAINLinjMedium,
        CAAINLinjLarge,
        CAAINLinjRupture,
        CAFlamCmdSmall,
        CAFlamCmdMedium,
        CAFlamCmdLarge,
        CAFlamCmdRupture,
        CAFlamInjSmall,
        CAFlamInjMedium,
        CAFlamInjLarge,
        CAFlamInjRupture,
        CA_ComponentDamage,
        CA_PersonalInjuries,
        durationToxicSmall,
        durationToxicMedium,
        durationToxicLarge,
        durationToxicRupture,
        toxicReleaseRateSmall,
        toxicReleaseRateMedium,
        toxicReleaseRateLarge,
        toxicReleaseRateRupture,
        toxicReleaseMassSmall,
        toxicReleaseMassMedium,
        toxicReleaseMassLarge,
        toxicReleaseMassRupture,
        toxicConsAreqSmall,
        toxicConsAreqMedium,
        toxicConsAreqLarge,
        toxicConsAreqRupture,
        forSteamSmall,
        forSteamMedium,
        forSteamLarge,
        forSteamRupture,
        forAcidCausticSmall,
        forAcidCausticMedium,
        forAcidCausticLarge,
        forAcidCausticRupture,
        finalConsequenceM
    }
}
import IGeneralData from "@/types/IGeneralData";

interface ICofCalculation {
    generalData: IGeneralData
    fluidSelected: any
    cofValue: any,
    impact: any
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

export const calculateCOF = ({generalData, fluidSelected, cofValue, impact}: ICofCalculation) => {
    if(!Object.keys(generalData).length) return {}

    const {
        gData_operatingTemperature,
        gData_operatingPressure
    } = generalData;

    const gData_operatingTempOnF = (gData_operatingTemperature * 9 / 5) + 32
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
        cof_damageCons
    } = cofValue

    const basedOnDNSmallmm = ((Math.PI * cof_releaseHoleSizeD1 ** 2)) / 4
    const basedOnDNSmallm = basedOnDNSmallmm / 1000
    const basedOnDNMediummm = ((Math.PI * cof_releaseHoleSizeD2 ** 2)) / 4
    const basedOnDNMediumm = basedOnDNMediummm / 1000
    const basedOnDNLargemm = ((Math.PI * cof_releaseHoleSizeD3 ** 2)) / 4
    const basedOnDNLargem = basedOnDNLargemm / 1000
    const basedOnDNRupturemm = ((Math.PI * cof_releaseHoleSizeD4 ** 2)) / 4
    const basedOnDNRupturem = basedOnDNRupturemm / 1000

    const C2 = 1
    const C3 = 4536 // kg
    const C4 = 2.205 // 1/kg
    const Gc = 1
    const Cd = 0.9
    const Ps = gData_operatingPressure * 14.5037738 * 6.895
    const idealGasHeatRatio = 1.1995
    const universalGasConstant = 8.314

    const releaseRateWnSmall = ((Cd / C2) * basedOnDNSmallm * Ps) 
    * (((idealGasHeatRatio * mw! * Gc) / (universalGasConstant * gData_operatingTempOnK)) 
    * (2 / (idealGasHeatRatio + 1)) ** ((idealGasHeatRatio + 1) / (idealGasHeatRatio - 1))) ** 0.5
    const releaseRateWnMedium = ((Cd / C2) * basedOnDNMediumm * Ps) 
    * (((idealGasHeatRatio * mw! * Gc) / (universalGasConstant * gData_operatingTempOnK)) 
    * (2 / (idealGasHeatRatio + 1)) ** ((idealGasHeatRatio + 1) / (idealGasHeatRatio - 1))) ** 0.5
    const releaseRateWnLarge = ((Cd / C2) * basedOnDNLargem * Ps) 
    * (((idealGasHeatRatio * mw! * Gc) / (universalGasConstant * gData_operatingTempOnK)) 
    * (2 / (idealGasHeatRatio + 1)) ** ((idealGasHeatRatio + 1) / (idealGasHeatRatio - 1))) ** 0.5
    const releaseRateWnRupture = ((Cd / C2) * basedOnDNRupturem * Ps) 
    * (((idealGasHeatRatio * mw! * Gc) / (universalGasConstant * gData_operatingTempOnK)) 
    * (2 / (idealGasHeatRatio + 1)) ** ((idealGasHeatRatio + 1) / (idealGasHeatRatio - 1))) ** 0.5
    
    const wMax = ((Cd / C2) * basedOnDNSmallm * Ps)
    * (((idealGasHeatRatio * mw * Gc) / (universalGasConstant * gData_operatingTempOnK))
    * (2 / (idealGasHeatRatio + 1)) ** ((idealGasHeatRatio + 1) / (idealGasHeatRatio - 1))) ** 0.5

    const addedFluidMassSmall = 180 * Math.min(releaseRateWnSmall, wMax) 
    const addedFluidMassMedium = 180 * Math.min(releaseRateWnMedium, wMax) 
    const addedFluidMassLarge = 180 * Math.min(releaseRateWnLarge, wMax) 
    const addedFluidMassRupture = 180 * Math.min(releaseRateWnRupture, wMax) 

    const availableMassSmall = Math.min((cof_massComponent + addedFluidMassSmall), cof_massInventory)
    const availableMassMedium = Math.min((cof_massComponent + addedFluidMassMedium), cof_massInventory)
    const availableMassLarge = Math.min((cof_massComponent + addedFluidMassLarge), cof_massInventory)
    const availableMassRupture = Math.min((cof_massComponent + addedFluidMassRupture), cof_massInventory)

    const timeRequiredSmall = C3 / releaseRateWnSmall
    const timeRequiredMedium = C3 / releaseRateWnMedium
    const timeRequiredLarge = C3 / releaseRateWnLarge
    const timeRequiredRupture = C3 / releaseRateWnRupture

    const {factor}: any = reductionFactor.find((i: any) => (i.detection.includes(impact?.cof_detectionSystem?.classification) && i.isolation.includes(impact?.cof_isolationSystem?.classification))) || {}
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
    }
}
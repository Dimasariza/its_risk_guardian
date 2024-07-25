import { inputs } from "./inputs";
import RepresentativeFluidDialog, { representativeFluidNodes } from "../../../uikit/table/cof/representativeFluidDialog";
import InputValueOnly from "@/app/(main)/uikit/input/inputValueOnly";
import PhaseOfFluid, { liquidPhase } from "../../../uikit/table/cof/phaseOfFluidDialog";
import LiquidInventories, { liquidInventories } from "../../../uikit/table/cof/liquidInventoriesDialog";
import DetectionAndIsolation, { detection, isolation } from "../../../uikit/table/cof/detectionAndIsolation";
import FlamableDialog, { flamableTable } from "../../../uikit/table/cof/flamableDialog";
import DamageDialog, { damageTable } from "../../../uikit/table/cof/damageDialog";
import ReleaseHoleSize from "../../../uikit/table/cof/realeseHoleSizeDialog";
import InputTypeText from "@/app/(main)/uikit/input/input-type-text";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GeneralDataService } from "@/service/calculation/generalData-service";
import { calculateCOF } from "@/function/calcCOFValue";
import { CofService } from "@/service/calculation/cofService";
import AdjusmentToFlamable, { adjMitigation } from "../../../uikit/table/cof/adjustmentToFlamable";
import AmoniaChlorineDialog from "./amoniaAndChlorine";
import { gffTableValue } from "@/public/tableBasedOnAPI/gffTableValue";
import { getValue } from "@/service/calculation/pofRBIDate-service";
import { getPOFPRDRBI } from "@/service/calculation/pofPRDService";

function COFPV({toast}: any) {
    const [value, setValue] = useState<any>({});
    const [submit, setSubmit] = useState<boolean>(true)
    const [error, setError] = useState<any>({});
    const [generalData, setGeneralData] = useState<any>({});
    const data = useSelector((state: any) => state.Reducer);
    const componentType = data.menu.comp_componentType
    let { edit, undoEdit } = useSelector((state: any) => state.EditReducer);

    const componentId = data.menu?.comp_id

    useEffect(() => {
        edit = true
        if(!componentId) return
        Promise.all([
            GeneralDataService.fetchData(componentId), 
            componentType == "Pressure Relief Device" ? getPOFPRDRBI(componentId) : getValue(componentId),
            CofService.fetchData(componentId)
        ])
       .then(([generalData, pofValue, cofValue]) => {
           setGeneralData(generalData)

           const failureData = componentType == "Pressure Relief Device" ? pofValue.rbi_failureFrequency : pofValue.rbiValue_failureFrequency
           const failureFreq = gffTableValue.find(i => i.id == failureData)

           setValue({
                ...cofValue,
                failureFreq,
                fluidSelected: representativeFluidNodes.find((i: any) => i.id == cofValue.cof_representativeFluid),
                detectionSystem: detection.find((i: any) => i.id == cofValue.cof_detectionSystem),
                isolationSystem: isolation.find((i: any) => i.id == cofValue.cof_isolationSystem),
                flamable: flamableTable.find((i: any) => i.id == cofValue.cof_flamableCons),
                damage: damageTable.find((i: any) => i.id == cofValue.cof_damageCons),
                phase: liquidPhase.find((i: any) => i.id == cofValue.cof_phaseOfFluid),
                inventories: liquidInventories.find((i: any) => i.id == cofValue.cof_liquidInventories),
                mitigation: adjMitigation.find((i: any) => i.id == cofValue.cof_adjToFlamable),
                amoniaChloride: {}
           })
       })

    }, [data]);

    useEffect(() => {
        if(Object.keys(error).length === 0 && !edit && !undoEdit) {
        CofService.editData(value)
        .then(res => {
            toast.current.show({
            severity: 'success',
            summary: 'Data Updated',
            detail: `You update General Data`
            });
        })
        .catch((e: any) => {
            toast.current.show({
            severity: 'error',
            summary: 'Data Failed to Updated',
            detail: `Damage mechanism not updated`
            });
        })
        } 
    }, [edit, submit])

    const {
        getIdealGasHeatRatio,
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
    } = calculateCOF({
        generalData, 
        cofValue: value,
        componentType
    })
    
    return (
        <>
        <div className="flex w-full lg:gap-5 md:gap-2 sm:gap-1 flex-column">
            <div className='flex flex-wrap lg:column-gap-3 mt-4'>
                {inputs.map((props: any, key: number) => (
                    <InputTypeText props={{
                        ...props, 
                        disabled: !edit || props?.notview?.includes(componentType) 
                    }} 
                    key={key} value={value} 
                    setValue={setValue} 
                    errorMessage={error[props.name]} />
                ))}
            </div>
            <div className="flex flex-wrap gap-2">
                <RepresentativeFluidDialog value={value} setValue={setValue} setSubmit={setSubmit}/>
                <PhaseOfFluid value={value} setValue={setValue} setSubmit={setSubmit}/>
                <ReleaseHoleSize value={value} setValue={setValue} setSubmit={setSubmit}/>
                <LiquidInventories value={value} setValue={setValue} setSubmit={setSubmit}/>
                <DetectionAndIsolation value={value} setValue={setValue} setSubmit={setSubmit}/>
                <AdjusmentToFlamable value={value} setValue={setValue} setSubmit={setSubmit}/>
                <FlamableDialog value={value} setValue={setValue} setSubmit={setSubmit}/>
                <DamageDialog value={value} setValue={setValue} setSubmit={setSubmit}/>
                <AmoniaChlorineDialog value={value} setValue={setValue} setSubmit={setSubmit}/>
            </div>
        </div>

        <div className="flex w-full flex-wrap mt-8">
            {
                [
                    {
                        label: "AIT (°C)",
                        value: Number(value.fluidSelected?.ait).toFixed(4)
                    },
                    {
                        label: "AIT (°F)",
                        value: Number(value.fluidSelected?.ait * 1.8 + 32).toFixed(3)
                    },
                    {
                        label: "AIT (K)",
                        value: value.fluidSelected?.ait + 273
                    },
                    {
                        label: "AIT (°R)",
                        value: value.fluidSelected?.ait * 4 / 5 
                    },
                    {
                        label: "Ideal Gas Spesific Heat Ratio",
                        value:  Number(getIdealGasHeatRatio)!?.toFixed(4) 
                    },
                    {
                        label: "Final consequence area (m²)",
                        value:  Number(finalConsequenceM)?.toFixed(4)
                    },
                    {
                        label: "Final consequence area (ft²)",
                        value:  Number(finalConsequenceM! * 10.7639104).toFixed(4)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>

        <h5>Release hole size area based on dn</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: `Small Release Hole Size ${componentType == "Pressure Relief Device" ? "(Inch)" : "(mm²)"}`,
                        value: Number(basedOnDNSmallmm)?.toFixed(6) || "_"
                    },
                    {
                        label: "Small Release Hole Size (m²)",
                        value: Number(basedOnDNSmallm)?.toFixed(6) || "-"
                    },
                    {
                        label: `Medium Release Hole Size ${componentType == "Pressure Relief Device" ? "(Inch)" : "(mm²)"}`,
                        value: Number(basedOnDNMediummm)?.toFixed(6) || "-"
                    },
                    {
                        label: "Medium Release Hole Size (m²)",
                        value: Number(basedOnDNMediumm)?.toFixed(6) || "-"
                    },
                    {
                        label: `Large Release Hole Size ${componentType == "Pressure Relief Device" ? "(Inch)" : "(mm²)"} `,
                        value: Number(basedOnDNLargemm)?.toFixed(6) || "-"
                    },
                    {
                        label: "Large Release Hole Size (m²)",
                        value: Number(basedOnDNLargem)?.toFixed(6) || "-"
                    },
                    {
                        label: `Rupture Release Hole Size ${componentType == "Pressure Relief Device" ? "(Inch)" : "(mm²)"} `,
                        value: Number(basedOnDNRupturemm)?.toFixed(6) || "-"
                    },
                    {
                        label: "Rupture Release Hole Size (m²)",
                        value: Number(basedOnDNRupturem)?.toFixed(6) || "-"
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>      
        
        <h5>Release rate (Wn)</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size (kg/s)",
                        value: Number(releaseRateWnSmall)?.toFixed(6) || "-"
                    },
                    {
                        label: "Medium Release Hole Size (kg/s)",
                        value: Number(releaseRateWnMedium)?.toFixed(6) || "-"
                    },
                    {
                        label: "Large Release Hole Size (kg/s)",
                        value: Number(releaseRateWnLarge)?.toFixed(6) || "-"
                    },
                    {
                        label: "Rupture Release Hole Size (kg/s)",
                        value: Number(releaseRateWnRupture)?.toFixed(6) || "-"
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>      
        
        <h5>Added fluid mass</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(addedFluidMassSmall)?.toFixed(6) || "-"
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(addedFluidMassMedium)?.toFixed(6) || "-"
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(addedFluidMassLarge)?.toFixed(6) || "-"
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(addedFluidMassRupture)?.toFixed(6) || "-"
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>      
        
        <h5>Available mass</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: availableMassSmall?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(availableMassMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(availableMassLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(availableMassRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>      
        
        <h5>Time required to release</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(timeRequiredSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(timeRequiredMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(timeRequiredLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(timeRequiredRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>      
        
        <h5>Total leak durations</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(adjReleaseRateSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(adjReleaseRateMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(adjReleaseRateLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(adjReleaseRateRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>      
        
        <h5>Adjusted release rate</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(adjReleaseRateSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(adjReleaseRateMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(adjReleaseRateLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(adjReleaseRateRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>      
        
        <h5>Leak duration</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(leakDurationSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(leakDurationMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(leakDurationLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(leakDurationRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>
        
        <h5>Release mass</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(releaseMassSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(releaseMassMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(releaseMassLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(releaseMassRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>      
        
        <h5>Energy efficiency</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(energyEfficiencySmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(energyEfficiencyMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(energyEfficiencyLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(energyEfficiencyRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>      
        
        <h5>Component damage Auto-Ignition Not Likely, Continous Release</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(CAAINL_C_Small)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(CAAINL_C_Medium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(CAAINL_C_Large)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(CAAINL_C_Rupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>

        <h5>Component damage Auto-Ignition Likely, Continous Release</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(CAAIL_C_Small)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(CAAIL_C_Medium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(CAAIL_C_Large)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(CAAIL_C_Rupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div> 

        <h5>Component damage Auto-ignition Not Likely, Instaneous Release</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(IAAINL_C_Small)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(IAAINL_C_Medium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(IAAINL_C_Large)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(IAAINL_C_Rupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>      
        
        <h5>Component damage Auto-Ignition Likely, Instataneous Release</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(IAAIL_C_Small)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(IAAIL_C_Medium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(IAAIL_C_Large)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(IAAIL_C_Rupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>

        <h5>Personal Injury Auto-Ignition Not Likely, Continous Release</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(CAAINL_P_Small)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(CAAINL_P_Medium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(CAAINL_P_Large)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(CAAINL_P_Rupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>

        <h5>Personal Injury Auto-Ignition Likely, Continous Release</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(CAAIL_P_Small)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(CAAIL_P_Medium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(CAAIL_P_Large)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(CAAIL_P_Rupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div> 

        <h5>Personal Injury Auto-ignition Not Likely, Instaneous Release</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(IAAINL_P_Small)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(IAAINL_P_Medium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(IAAINL_P_Large)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(IAAINL_P_Rupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>      
        
        <h5>Personal Injury Auto-Ignition Likely, Instataneous Release</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(IAAIL_P_Small)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(IAAIL_P_Medium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(IAAIL_P_Large)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(IAAIL_P_Rupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>

        <h5>IC blending factor</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: factICSmall
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: factICMedium
                    },
                    {
                        label: "Large Release Hole Size",
                        value: factICLarge
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: factICRupture
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>

        <h5>Continuous/instantaneous blended consequence area</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "(CAAIL cmd) Small Release Hole Size",
                        value: Number(CAAILcmdSmall)?.toFixed(6)
                    },
                    {
                        label: "(CAAIL cmd) Medium Release Hole Size",
                        value: Number(CAAILcmdMedium)?.toFixed(6)
                    },
                    {
                        label: "(CAAIL cmd) Large Release Hole Size",
                        value: Number(CAAILcmdLarge)?.toFixed(6)
                    },
                    {
                        label: "(CAAIL cmd) Rupture Release Hole Size",
                        value: Number(CAAILcmdRupture)?.toFixed(6)
                    },
                    {
                        label: "(CAAIL inj) Small Release Hole Size",
                        value: Number(CAAILinjSmall)?.toFixed(6)
                    },
                    {
                        label: "(CAAIL inj) Medium Release Hole Size",
                        value: Number(CAAILinjMedium)?.toFixed(6)
                    },
                    {
                        label: "(CAAIL inj) Large Release Hole Size",
                        value: Number(CAAILinjLarge)?.toFixed(6)
                    },
                    {
                        label: "(CAAIL inj) Rupture Release Hole Size",
                        value: Number(CAAILinjRupture)?.toFixed(6)
                    },
                    {
                        label: "(CAAINL cmd) Small Release Hole Size",
                        value: Number(CAAINLcmdSmall)?.toFixed(6)
                    },
                    {
                        label: "(CAAINL cmd) Medium Release Hole Size",
                        value: Number(CAAINLcmdMedium)?.toFixed(6)
                    },
                    {
                        label: "(CAAINL cmd) Large Release Hole Size",
                        value: Number(CAAINLcmdLarge)?.toFixed(6)
                    },
                    {
                        label: "(CAAINL cmd) Rupture Release Hole Size",
                        value: Number(CAAINLcmdRupture)?.toFixed(6)
                    },
                    {
                        label: "(CAAINL inj) Small Release Hole Size",
                        value: Number(CAAINLinjSmall)?.toFixed(6)
                    },
                    {
                        label: "(CAAINL inj) Medium Release Hole Size",
                        value: Number(CAAINLinjMedium)?.toFixed(6)
                    },
                    {
                        label: "(CAAINL inj) Large Release Hole Size",
                        value: Number(CAAINLinjLarge)?.toFixed(6)
                    },
                    {
                        label: "(CAAINL inj) Rupture Release Hole Size",
                        value: Number(CAAINLinjRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>

        <h5>AIT blended consequence areas</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "(CAflam cmd) Small Release Hole Size",
                        value: Number(CAFlamCmdSmall)?.toFixed(6)
                    },
                    {
                        label: "(CAflam cmd) Medium Release Hole Size",
                        value: Number(CAFlamCmdMedium)?.toFixed(6)
                    },
                    {
                        label: "(CAflam cmd) Large Release Hole Size",
                        value: Number(CAFlamCmdLarge)?.toFixed(6)
                    },
                    {
                        label: "(CAflam cmd) Rupture Release Hole Size",
                        value: Number(CAFlamCmdRupture)?.toFixed(6)
                    },
                    {
                        label: "(CAflam inj) Small Release Hole Size",
                        value: Number(CAFlamInjSmall)?.toFixed(6)
                    },
                    {
                        label: "(CAflam inj) Medium Release Hole Size",
                        value: Number(CAFlamInjMedium)?.toFixed(6)
                    },
                    {
                        label: "(CAflam inj) Large Release Hole Size",
                        value: Number(CAFlamInjLarge)?.toFixed(6)
                    },
                    {
                        label: "(CAflam inj) Rupture Release Hole Size",
                        value: Number(CAFlamInjRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>

        {/* <h5>CONSEQUENCE AREA</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "COMPONENT DAMAGE",
                        value: Number(CA_ComponentDamage)?.toFixed(6)
                        
                    },
                    {
                        label: "PERSONNEL INJURY",
                        value: Number(CA_PersonalInjuries)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div> */}

        <h5>Effective duration of the toxic release</h5>
        <div className="flex flex-wrap">
        {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(durationToxicSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(durationToxicMedium)?.toFixed(6)  
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(durationToxicLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(durationToxicRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>

        <h5>Toxic release Raste</h5>
        <div className="flex flex-wrap">
        {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(toxicReleaseRateSmall)?.toFixed(5)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(toxicReleaseRateMedium)?.toFixed(5)  
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(toxicReleaseRateLarge)?.toFixed(5)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(toxicReleaseRateRupture)?.toFixed(5)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>

        <h5>Toxic release Mass</h5>
        <div className="flex flex-wrap">
        {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(toxicReleaseMassSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(toxicReleaseMassMedium)?.toFixed(6)  
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(toxicReleaseMassLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(toxicReleaseMassRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>        
        
        <h5>Toxic consequence area</h5>
        <div className="flex flex-wrap">
        {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(toxicConsAreqSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(toxicConsAreqMedium)?.toFixed(6)  
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(toxicConsAreqLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(toxicConsAreqRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>
        
        <h5>FOR STEAM</h5>
        <div className="flex flex-wrap">
        {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(forSteamSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(forSteamMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(forSteamLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(forSteamRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>
        
        <h5>FOR ACIDS AND CAUSTIC</h5>
        <div className="flex flex-wrap">
        {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(forAcidCausticSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(forAcidCausticMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(forAcidCausticLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(forAcidCausticRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>
        
        </>
    )
}

export default COFPV;
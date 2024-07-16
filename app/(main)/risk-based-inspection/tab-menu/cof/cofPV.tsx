import { inputs } from "./inputs";
import RepresentativeFluidDialog, { representativeFluidNodes } from "./representativeFluidDialog";
import InputValueOnly from "@/fragments/inputValueOnly";
import PhaseOfFluid, { liquidPhase } from "./phaseOfFluidDialog";
import LiquidInventories, { liquidInventories } from "./liquidInventoriesDialog";
import DetectionAndIsolation, { detection, isolation } from "./detectionAndIsolation";
import FlamableDialog, { flamableTable } from "./flamableDialog";
import DamageDialog, { damageTable } from "./damageDialog";
import ReleaseHoleSize from "./realeseHoleSizeDialog";
import InputTypeText from "@/fragments/input-type-text";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GeneralDataService } from "@/service/calculation/generalData-service";
import { calculateCOF } from "@/function/calcCOFValue";
import { CofService } from "@/service/calculation/cofService";
import AdjusmentToFlamable, { adjMitigation } from "./adjustmentToFlamable";
import { getValue } from "@/service/calculation/pofRBIDate-service";
import { gffTableValue } from "../pof-rbi-date/value/gffTableValue";
import AmoniaChlorineDialog from "./amoniaAndChlorine";

function COFPV({toast}: any) {
    const [value, setValue] = useState<any>({});

    const [error, setError] = useState<any>({});
    const [generalData, setGeneralData] = useState<any>({});
    const data = useSelector((state: any) => state.Reducer);
    let { edit, undoEdit } = useSelector((state: any) => state.EditReducer);

    const componentId = data.menu?.comp_id
    useEffect(() => {
        edit = true

        if(!componentId) return
        GeneralDataService.fetchData(componentId)
        .then((res: any) => {
            setGeneralData(res)
        })

        CofService.fetchData(componentId)
        .then(res => {
            setValue({
                ...res,
                fluidSelected: representativeFluidNodes.find((i: any) => i.id == res.cof_representativeFluid),
                impact: {
                    cof_detectionSystem: detection.find((i: any) => i.id == res.cof_detectionSystem),
                    cof_isolationSystem: isolation.find((i: any) => i.id == res.cof_isolationSystem),
                },
                flamable: flamableTable.find((i: any) => i.id == res.cof_flamableCons),
                damage: damageTable.find((i: any) => i.id == res.cof_damageCons),
                phase: liquidPhase.find((i: any) => i.id == res.cof_phaseOfFluid),
                inventories: liquidInventories.find((i: any) => i.id == res.cof_liquidInventories),
                mitigation: adjMitigation.find((i: any) => i.id == res.cof_adjToFlamable),
                amoniaChloride: {}
            })
        })

        getValue(componentId)
        .then((res) => {
          const failureFreq = gffTableValue.find(i => i.id == res.rbiValue_failureFrequency)
          setValue((prev: any) => ({...prev, failureFreq}))
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
    }, [edit])

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
    } = calculateCOF({
        generalData, 
        fluidSelected: value.fluidSelected,
        cofValue: value,
        impact: value.impact
    })

    return (
        <>
        <div className="flex w-full lg:gap-8 md:gap-3 sm:gap-2">
            <div className='flex flex-wrap flex-column lg:mr-5 mt-5'>
                {inputs.map((props: any, key: number) => (
                    <InputTypeText props={{...props, disabled: !edit}} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
                ))}
            </div>
            <div className="flex flex-wrap gap-5 mt-5">
                <RepresentativeFluidDialog value={value} setValue={setValue} toast={toast} />
                <PhaseOfFluid value={value} setValue={setValue} toast={toast}/>
                <ReleaseHoleSize value={value} setValue={setValue} toast={toast}/>
                <LiquidInventories value={value} setValue={setValue} toast={toast}/>
                <DetectionAndIsolation value={value} setValue={setValue} toast={toast} />
                <AdjusmentToFlamable value={value} setValue={setValue} toast={toast}/>
                <FlamableDialog value={value} setValue={setValue} toast={toast}/>
                <DamageDialog value={value} setValue={setValue} toast={toast} />
                <AmoniaChlorineDialog value={value} setValue={setValue} toast={toast}/>
            </div>
        </div>

        <div className="flex w-full flex-wrap mt-8">
            {
                [
                    {
                        label: "AIT (°C)",
                        value: (value.fluidSelected?.ait.toFixed(4))
                    },
                    {
                        label: "AIT (°F)",
                        value: (value.fluidSelected?.ait * 1.8 + 32).toFixed(3)
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
                        value:  getIdealGasHeatRatio!?.toFixed(4) 
                    },
                    {
                        label: "Final consequence area (m²)",
                        value:  finalConsequenceM?.toFixed(4)
                    },
                    {
                        label: "Final consequence area (ft²)",
                        value:  (finalConsequenceM! * 10.7639104).toFixed(4)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>

        <h5>Release hole size area based on dn</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size (mm²)",
                        value: basedOnDNSmallmm?.toFixed(4) || "_"
                    },
                    {
                        label: "Small Release Hole Size (m²)",
                        value: basedOnDNSmallm?.toFixed(4) || "-"
                    },
                    {
                        label: "Medium Release Hole Size (mm²)",
                        value: basedOnDNMediummm?.toFixed(4) || "-"
                    },
                    {
                        label: "Medium Release Hole Size (m²)",
                        value: basedOnDNMediumm?.toFixed(4) || "-"
                    },
                    {
                        label: "Large Release Hole Size (mm²)",
                        value: basedOnDNLargemm?.toFixed(4) || "-"
                    },
                    {
                        label: "Large Release Hole Size (m²)",
                        value: basedOnDNLargem?.toFixed(4) || "-"
                    },
                    {
                        label: "Rupture Release Hole Size (mm²)",
                        value: basedOnDNRupturemm?.toFixed(4) || "-"
                    },
                    {
                        label: "Rupture Release Hole Size (m²)",
                        value: basedOnDNRupturem?.toFixed(4) || "-"
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
                        value: releaseRateWnSmall?.toFixed(4) || "-"
                    },
                    {
                        label: "Medium Release Hole Size (kg/s)",
                        value: releaseRateWnMedium?.toFixed(4) || "-"
                    },
                    {
                        label: "Large Release Hole Size (kg/s)",
                        value: releaseRateWnLarge?.toFixed(4) || "-"
                    },
                    {
                        label: "Rupture Release Hole Size (kg/s)",
                        value: releaseRateWnRupture?.toFixed(4) || "-"
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
                        value: addedFluidMassSmall?.toFixed(4) || "-"
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: addedFluidMassMedium?.toFixed(4) || "-"
                    },
                    {
                        label: "Large Release Hole Size",
                        value: addedFluidMassLarge?.toFixed(4) || "-"
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: addedFluidMassRupture?.toFixed(4) || "-"
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
                        value: availableMassSmall?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: availableMassMedium?.toFixed(4)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: availableMassLarge?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: availableMassRupture?.toFixed(4)
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
                        value: timeRequiredSmall?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: timeRequiredMedium?.toFixed(4)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: timeRequiredLarge?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: timeRequiredRupture?.toFixed(4)
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
                        value: adjReleaseRateSmall?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: adjReleaseRateMedium?.toFixed(4)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: adjReleaseRateLarge?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: adjReleaseRateRupture?.toFixed(4)
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
                        value: adjReleaseRateSmall?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: adjReleaseRateMedium?.toFixed(4)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: adjReleaseRateLarge?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: adjReleaseRateRupture?.toFixed(4)
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
                        value: leakDurationSmall?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: leakDurationMedium?.toFixed(4)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: leakDurationLarge?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: leakDurationRupture?.toFixed(4)
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
                        value: releaseMassSmall?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: releaseMassMedium?.toFixed(4)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: releaseMassLarge?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: releaseMassRupture?.toFixed(4)
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
                        value: energyEfficiencySmall?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: energyEfficiencyMedium?.toFixed(4)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: energyEfficiencyLarge?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: energyEfficiencyRupture?.toFixed(4)
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
                        value: CAAINL_C_Small?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: CAAINL_C_Medium?.toFixed(4)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: CAAINL_C_Large?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: CAAINL_C_Rupture?.toFixed(4)
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
                        value: CAAIL_C_Small?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: CAAIL_C_Medium?.toFixed(4)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: CAAIL_C_Large?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: CAAIL_C_Rupture?.toFixed(4)
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
                        value: IAAINL_C_Small?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: IAAINL_C_Medium?.toFixed(4)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: IAAINL_C_Large?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: IAAINL_C_Rupture?.toFixed(4)
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
                        value: IAAIL_C_Small?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: IAAIL_C_Medium?.toFixed(4)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: IAAIL_C_Large?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: IAAIL_C_Rupture?.toFixed(4)
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
                        value: CAAINL_P_Small?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: CAAINL_P_Medium?.toFixed(4)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: CAAINL_P_Large?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: CAAINL_P_Rupture?.toFixed(4)
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
                        value: CAAIL_P_Small?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: CAAIL_P_Medium?.toFixed(4)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: CAAIL_P_Large?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: CAAIL_P_Rupture?.toFixed(4)
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
                        value: IAAINL_P_Small?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: IAAINL_P_Medium?.toFixed(4)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: IAAINL_P_Large?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: IAAINL_P_Rupture?.toFixed(4)
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
                        value: IAAIL_P_Small?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: IAAIL_P_Medium?.toFixed(4)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: IAAIL_P_Large?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: IAAIL_P_Rupture?.toFixed(4)
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
                        value: CAAILcmdSmall?.toFixed(4)
                    },
                    {
                        label: "(CAAIL cmd) Medium Release Hole Size",
                        value: CAAILcmdMedium?.toFixed(4)
                    },
                    {
                        label: "(CAAIL cmd) Large Release Hole Size",
                        value: CAAILcmdLarge?.toFixed(4)
                    },
                    {
                        label: "(CAAIL cmd) Rupture Release Hole Size",
                        value: CAAILcmdRupture?.toFixed(4)
                    },
                    {
                        label: "(CAAIL inj) Small Release Hole Size",
                        value: CAAILinjSmall?.toFixed(4)
                    },
                    {
                        label: "(CAAIL inj) Medium Release Hole Size",
                        value: CAAILinjMedium?.toFixed(4)
                    },
                    {
                        label: "(CAAIL inj) Large Release Hole Size",
                        value: CAAILinjLarge?.toFixed(4)
                    },
                    {
                        label: "(CAAIL inj) Rupture Release Hole Size",
                        value: CAAILinjRupture?.toFixed(4)
                    },
                    {
                        label: "(CAAINL cmd) Small Release Hole Size",
                        value: CAAINLcmdSmall?.toFixed(4)
                    },
                    {
                        label: "(CAAINL cmd) Medium Release Hole Size",
                        value: CAAINLcmdMedium?.toFixed(4)
                    },
                    {
                        label: "(CAAINL cmd) Large Release Hole Size",
                        value: CAAINLcmdLarge?.toFixed(4)
                    },
                    {
                        label: "(CAAINL cmd) Rupture Release Hole Size",
                        value: CAAINLcmdRupture?.toFixed(4)
                    },
                    {
                        label: "(CAAINL inj) Small Release Hole Size",
                        value: CAAINLinjSmall?.toFixed(4)
                    },
                    {
                        label: "(CAAINL inj) Medium Release Hole Size",
                        value: CAAINLinjMedium?.toFixed(4)
                    },
                    {
                        label: "(CAAINL inj) Large Release Hole Size",
                        value: CAAINLinjLarge?.toFixed(4)
                    },
                    {
                        label: "(CAAINL inj) Rupture Release Hole Size",
                        value: CAAINLinjRupture?.toFixed(4)
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
                        value: CAFlamCmdSmall?.toFixed(4)
                    },
                    {
                        label: "(CAflam cmd) Medium Release Hole Size",
                        value: CAFlamCmdMedium?.toFixed(4)
                    },
                    {
                        label: "(CAflam cmd) Large Release Hole Size",
                        value: CAFlamCmdLarge?.toFixed(4)
                    },
                    {
                        label: "(CAflam cmd) Rupture Release Hole Size",
                        value: CAFlamCmdRupture?.toFixed(4)
                    },
                    {
                        label: "(CAflam inj) Small Release Hole Size",
                        value: CAFlamInjSmall?.toFixed(4)
                    },
                    {
                        label: "(CAflam inj) Medium Release Hole Size",
                        value: CAFlamInjMedium?.toFixed(4)
                    },
                    {
                        label: "(CAflam inj) Large Release Hole Size",
                        value: CAFlamInjLarge?.toFixed(4)
                    },
                    {
                        label: "(CAflam inj) Rupture Release Hole Size",
                        value: CAFlamInjRupture?.toFixed(4)
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
                        value: CA_ComponentDamage?.toFixed(4)
                        
                    },
                    {
                        label: "PERSONNEL INJURY",
                        value: CA_PersonalInjuries?.toFixed(4)
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
                        value: durationToxicSmall?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: durationToxicMedium?.toFixed(4)  
                    },
                    {
                        label: "Large Release Hole Size",
                        value: durationToxicLarge?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: durationToxicRupture?.toFixed(4)
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
                        value: toxicReleaseRateSmall?.toFixed(5)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: toxicReleaseRateMedium?.toFixed(5)  
                    },
                    {
                        label: "Large Release Hole Size",
                        value: toxicReleaseRateLarge?.toFixed(5)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: toxicReleaseRateRupture?.toFixed(5)
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
                        value: toxicReleaseMassSmall?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: toxicReleaseMassMedium?.toFixed(4)  
                    },
                    {
                        label: "Large Release Hole Size",
                        value: toxicReleaseMassLarge?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: toxicReleaseMassRupture?.toFixed(4)
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
                        value: toxicConsAreqSmall?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: toxicConsAreqMedium?.toFixed(4)  
                    },
                    {
                        label: "Large Release Hole Size",
                        value: toxicConsAreqLarge?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: toxicConsAreqRupture?.toFixed(4)
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
                        value: forSteamSmall?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: forSteamMedium?.toFixed(4)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: forSteamLarge?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: forSteamRupture?.toFixed(4)
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
                        value: forAcidCausticSmall?.toFixed(4)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: forAcidCausticMedium?.toFixed(4)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: forAcidCausticLarge?.toFixed(4)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: forAcidCausticRupture?.toFixed(4)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ !isNaN(value) ? value : "-" } key={key}/>)
            }
        </div>
        
        </>
    )
}

export default COFPV;
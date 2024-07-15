import { inputs } from "./inputs";
import RepresentativeFluidDialog, { representativeFluidNodes } from "./representativeFluidDialog";
import InputValueOnly from "@/fragments/inputValueOnly";
import PhaseOfFluid from "./phaseOfFluidDialog";
import LiquidInventories from "./liquidInventoriesDialog";
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
import AdjusmentToFlamable from "./adjustmentToFlamable";

function COFPV({toast}: any) {
    const [value, setValue] = useState<any>({});
    const [fluidSelected, setFluidSelected] = useState<any>({});
    const [impact, setImpact] = useState<any>({
        cof_detectionSystem: null,
        cof_isolationSystem: null
    });
    const [damage, setDamage] = useState<any>({});
    const [flamable, setFlamable] = useState<any>({});

    const [error, setError] = useState<any>({});
    const [generalData, setGeneralData] = useState<any>({});
    const data = useSelector((state: any) => state.Reducer);
    let { edit } = useSelector((state: any) => state.EditReducer);

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
            setValue(res)
            setFluidSelected(representativeFluidNodes.find((i: any) => i.id == res.cof_representativeFluid))
            setImpact({
                cof_detectionSystem: detection.find((i: any) => i.id == res.cof_detectionSystem),
                cof_isolationSystem: isolation.find((i: any) => i.id == res.cof_isolationSystem)
            })
            setFlamable(flamableTable.find((i: any) => i.id == res.cof_flamableCons))
            setDamage(damageTable.find((i: any) => i.id == res.cof_damageCons))
        })
    }, [data]);

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
    } = calculateCOF({
        generalData, 
        fluidSelected,
        cofValue: value,
        impact
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
                <RepresentativeFluidDialog fluidSelected={fluidSelected} setFluidSelected={setFluidSelected} cofValue={value} toast={toast} />
                <PhaseOfFluid cofValue={value} toast={toast}/>
                <ReleaseHoleSize cofValue={value} toast={toast}/>
                <LiquidInventories cofValue={value} toast={toast}/>
                <DetectionAndIsolation impact={impact} setImpact={setImpact} cofValue={value} toast={toast} />
                <AdjusmentToFlamable cofValue={value} toast={toast}/>
                <FlamableDialog flamable={flamable} setFlamable={setFlamable} cofValue={value} toast={toast}/>
                <DamageDialog damage={damage} setDamage={setDamage} cofValue={value} toast={toast} />
            </div>
        </div>

        <div className="flex w-full flex-wrap mt-8">
            {
                [
                    {
                        label: "AIT (°C)",
                        value: fluidSelected?.ait || "-"
                    },
                    {
                        label: "AIT (°F)",
                        value: (fluidSelected?.ait * 1.8 + 32).toFixed(3) || "-"
                    },
                    {
                        label: "AIT (K)",
                        value: fluidSelected?.ait + 273 || "-"
                    },
                    {
                        label: "AIT (°R)",
                        value: fluidSelected?.ait * 4 / 5 || "-"
                    },
                    {
                        label: "Ideal Gas Spesific Heat Ratio",
                        value:  getIdealGasHeatRatio!?.toFixed(4) || "-"
                    },
                    {
                        label: "Final consequence area (m²)",
                        value:  ""
                    },
                    {
                        label: "Final consequence area (ft²)",
                        value:  ""
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
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
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
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
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
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
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
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
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
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
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
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
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
            }
        </div>      
        
        <h5>Component damage consequence areas for Auto-Ignition Likely, Continous Release (AIL-CONT), CAAIL-CONT</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Large Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: ""
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
            }
        </div>

        <h5>Component damage consequence areas for Auto-Ignition Likely, Continous Release (AIL-CONT), CAAIL-CONT</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Large Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: ""
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
            }
        </div>      
        
        <h5>Component damage consequence areas for Auto-ignition Not Likely, Instaneous Release, (AINL-INST), CAAINL-INST</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Large Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: ""
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
            }
        </div>

        <h5>Component damage consequence areas for Auto-Ignition Likely, Instataneous Release (AIL-INST), CAAIL-INST</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Large Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: ""
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
            }
        </div>

        <h5>Personnel injury consequence areas for Auto-ignition Not Likely, Continous Release (AINL-CONT)</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Large Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: ""
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
            }
        </div>

        <h5>Personnel injury consequence areas for Auto-ignition Likely, Continous Release (AIL-CONT)</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Large Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: ""
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
            }
        </div>

        <h5>Personnel injury consequence areas for Auto-ignition Not Likely, Instataneous Release (AINL-INST)</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Large Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: ""
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
            }
        </div>

        <h5>Personnel injury consequence areas for Auto-ignition Likely, Instataneous Release (AIL-INST)</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Large Release Hole Size",
                        value: ""
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: ""
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
            }
        </div>

        </>
    )
}

export default COFPV;
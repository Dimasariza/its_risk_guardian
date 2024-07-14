import { inputs } from "./inputs";
import RepresentativeFluidDialog from "./representativeFluidDialog";
import InputValueOnly from "@/fragments/inputValueOnly";
import PhaseOfFluid from "./phaseOfFluid";
import LiquidInventories from "./liquidInventories";
import DetectionAndIsolation from "./DetectionAndIsolationTable";
import FlamableDialog from "./flamableDialog";
import DamageDialog from "./damageDialog";
import ReleaseHoleSize from "./realeseHoleSize";
import InputTypeText from "@/fragments/input-type-text";
import IGeneralData from "@/types/IGeneralData";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GeneralDataService } from "@/service/calculation/generalData-service";
import { calculateCOF } from "@/function/calcCOFValue";

function COFPV({toast}: any) {
    const [fluidSelected, setFluidSelected] = useState<any>({});
    const [value, setValue] = useState<any>({});
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
        basedOnDNRupturem
    } = calculateCOF({
        generalData, 
        fluidSelected,
        cofValue: value
    })

    return (
        <>
        <div className="flex flex-wrap w-full lg:gap-8 md:gap-3 sm:gap-2">
            <div className='flex flex-wrap flex-column lg:mr-5 mt-5'>
            {inputs.map((props: any, key: number) => (
                <InputTypeText props={{...props, disabled: !edit}} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
            ))}
            </div>
            <div className="flex flex-wrap flex-column gap-2 mt-5">
            <RepresentativeFluidDialog fluidSelected={fluidSelected} setFluidSelected={setFluidSelected} />
            <PhaseOfFluid />
            <ReleaseHoleSize />
            <LiquidInventories />
            <DetectionAndIsolation />
            <FlamableDialog />
            <DamageDialog />
            </div>
        </div>

        <div className="flex w-full flex-wrap mt-5">
            {
                [
                    {
                    label: "AIT (°C)",
                    value: fluidSelected.ait || "-"
                    },
                    {
                    label: "AIT (°F)",
                    value: (fluidSelected.ait * 1.8 + 32).toFixed(3) || "-"
                    },
                    {
                    label: "AIT (K)",
                    value: fluidSelected.ait + 273 || "-"
                    },
                    {
                    label: "AIT (°R)",
                    value: fluidSelected.ait * 4 / 5 || "-"
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
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
            }
        </div>      
        
        <h5>Release rate (Wn)</h5>
        <div className="flex flex-wrap">
            {
                [
                    {
                    label: "Small Release Hole Size (kg/s)",
                    value: ""
                    },
                    {
                    label: "Medium Release Hole Size (kg/s)",
                    value: ""
                    },
                    {
                    label: "Large Release Hole Size (kg/s)",
                    value: ""
                    },
                    {
                    label: "Rupture Release Hole Size (kg/s)",
                    value: ""
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
            }
        </div>      
        
        <h5>Added fluid mass</h5>
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
        
        <h5>Available mass</h5>
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
        
        <h5>Time required to release</h5>
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
        
        <h5>Release type</h5>
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
        
        <h5>Total leak durations</h5>
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
        
        <h5>Adjusted release rate</h5>
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
        
        <h5>Leak duration</h5>
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
        
        <h5>Release mass</h5>
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
        
        <h5>Energy efficiency</h5>
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
        
        <h5>Component damage consequence areas for Auto-Ignition Not Likely (Continous Release)</h5>
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

        <h5>Component damage consequence areas for Auto-Ignition Likely (Continous Release)</h5>
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
        
        <h5>Component damage consequence areas for Auto-ignition Not Likely (Instaneous Release)</h5>
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

        <h5>Component damage consequence areas for Auto-ignition Not Likely (Instaneous Release)</h5>
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
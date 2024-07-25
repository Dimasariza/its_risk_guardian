"use client"

import InputTypeText from "@/app/(main)/uikit/input/input-type-text";
import { useState } from "react";
import { useSelector } from "react-redux";
import { inputs } from "./inputs";
import RepresentativeFluidDialog from "@/app/(main)/uikit/table/cof/cof PV/representativeFluidDialog";
import ReleaseHoleSize from "@/app/(main)/uikit/table/cof/cof PV/realeseHoleSizeDialog";
import { calcCOFTank } from "@/function/calcCOFTank";
import InputValueOnly from "@/app/(main)/uikit/input/inputValueOnly";

function COFTank() {
    const [value, setValue] = useState<any>({
        cof_massComponent: "",
        cof_massInventory: "",
        cof_C1mfracTox: "",
        cof_ps: "",
        cof_representativeFluid: "",
        fluidSelected: ""
    });
    const [submit, setSubmit] = useState<boolean>(true)
    const [error, setError] = useState<any>({});
    const [generalData, setGeneralData] = useState<any>({});
    const data = useSelector((state: any) => state.Reducer);
    const componentType = data.menu.comp_componentType
    let { edit, undoEdit } = useSelector((state: any) => state.EditReducer);

    const componentId = data.menu?.comp_id

    const {
        basedOnDNSmallm,
        basedOnDNSmallmm,
        basedOnDNMediumm,
        basedOnDNMediummm,
        basedOnDNLargem,
        basedOnDNLargemm,
        basedOnDNRupturem,
        basedOnDNRupturemm
    } = calcCOFTank({
        generalData,
        cofValue: value,
        componentType
    })

    console.log(basedOnDNSmallm)

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
                <ReleaseHoleSize value={value} setValue={setValue} setSubmit={setSubmit}/>
                {/* <PhaseOfFluid value={value} setValue={setValue} setSubmit={setSubmit}/>
                <LiquidInventories value={value} setValue={setValue} setSubmit={setSubmit}/>
                <DetectionAndIsolation value={value} setValue={setValue} setSubmit={setSubmit}/>
                <AdjusmentToFlamable value={value} setValue={setValue} setSubmit={setSubmit}/>
                <FlamableDialog value={value} setValue={setValue} setSubmit={setSubmit}/>
                <DamageDialog value={value} setValue={setValue} setSubmit={setSubmit}/>
                <AmoniaChlorineDialog value={value} setValue={setValue} setSubmit={setSubmit}/> */}
            </div>
        </div>

        <div className="flex w-full flex-wrap mt-8">
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

        </div>
        </>
    )
}

export default COFTank;
"use client"

import InputTypeText from "@/app/(main)/uikit/input/input-type-text";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { inputs } from "./inputs";
import RepresentativeFluidDialog, { representativeFluidNodes } from "@/app/(main)/uikit/table/cof/cof PV/representativeFluidDialog";
import ReleaseHoleSize from "@/app/(main)/uikit/table/cof/cof PV/realeseHoleSizeDialog";
import { calcCOFTank } from "@/function/calcCOFTank";
import InputValueOnly from "@/app/(main)/uikit/input/inputValueOnly";
import TankComponentDialog from "@/app/(main)/uikit/table/cof/cof Tank/tankComponentDialog";
import { CofService } from "@/service/calculation/cofService";
import { GeneralDataService } from "@/service/calculation/generalData-service";
import { getValue } from "@/service/calculation/pofRBIDate-service";

function COFTank({toast}: any) {
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
            getValue(componentId),
            CofService.fetchData(componentId)
        ])
       .then(([generalData, rbiValue, cofValue]) => {
           setGeneralData(generalData)

           console.log(cofValue)

        //    const failureData = componentType == "Pressure Relief Device" ? pofValue.rbi_failureFrequency : pofValue.rbiValue_failureFrequency
        //    const failureFreq = gffTableValue.find(i => i.id == failureData)

           setValue({
                ...cofValue,
                // failureFreq,
                fluidSelected: representativeFluidNodes.find((i: any) => i.id == cofValue.cof_representativeFluid),
                // detectionSystem: detection.find((i: any) => i.id == cofValue.cof_detectionSystem),
                // isolationSystem: isolation.find((i: any) => i.id == cofValue.cof_isolationSystem),
                // flamable: flamableTable.find((i: any) => i.id == cofValue.cof_flamableCons),
                // damage: damageTable.find((i: any) => i.id == cofValue.cof_damageCons),
                // phase: liquidPhase.find((i: any) => i.id == cofValue.cof_phaseOfFluid),
                // inventories: liquidInventories.find((i: any) => i.id == cofValue.cof_liquidInventories),
                // mitigation: adjMitigation.find((i: any) => i.id == cofValue.cof_adjToFlamable),
                // amoniaChloride: {}
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
        PI,
        basedOnDNSmallm,
        basedOnDNSmallmm,
        basedOnDNMediumm,
        basedOnDNMediummm,
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
    } = calcCOFTank({
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
            <TankComponentDialog value={basedOnDNTable} options={{tableTitle: "Release Hole Size Area An (m²)"}}/>
            <div className="flex flex-wrap">
                {
                    [
                        {
                            label: `Small Release Hole Size ${componentType == "Pressure Relief Device" ? "(Inch)" : "(mm²)"}`,
                            value: Number(basedOnDNSmallmm)?.toExponential(6) || "_"
                        },
                        {
                            label: "Small Release Hole Size (m²)",
                            value: Number(basedOnDNSmallm)?.toExponential(6)
                        },
                        {
                            label: `Medium Release Hole Size ${componentType == "Pressure Relief Device" ? "(Inch)" : "(mm²)"}`,
                            value: Number(basedOnDNMediummm)?.toExponential(6)
                        },
                        {
                            label: "Medium Release Hole Size (m²)",
                            value: Number(basedOnDNMediumm)?.toExponential(6)
                        },
                        {
                            label: `Large Release Hole Size ${componentType == "Pressure Relief Device" ? "(Inch)" : "(mm²)"} `,
                            value: Number(basedOnDNLargemm)?.toExponential(6)
                        },
                        {
                            label: "Large Release Hole Size (m²)",
                            value: Number(basedOnDNLargem)?.toExponential(6)
                        },
                        {
                            label: `Rupture Release Hole Size ${componentType == "Pressure Relief Device" ? "(Inch)" : "(mm²)"} `,
                            value: Number(basedOnDNRupturemm)?.toExponential(6)
                        },
                        {
                            label: "Rupture Release Hole Size (m²)",
                            value: Number(basedOnDNRupturem)?.toExponential(6)
                        },
                    ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
                }
            </div> 

            <h5>Release rate (Wn)</h5>
            <TankComponentDialog value={releaseRateTable
                .map(({small, medium, large, rupture}: any) => ({
                    small: small?.toExponential(4),
                    medium: medium?.toExponential(4),
                    large: large?.toExponential(4),
                    rupture: rupture?.toExponential(4),
                }))
            } 
            options={{tableTitle: "Release Hole Size Area An (m²)"}}/>
            <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(releaseRateWnSmall)?.toExponential(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(releaseRateWnMedium)?.toExponential(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(releaseRateWnLarge)?.toExponential(6) 
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(releaseRateWnRupture)?.toExponential(6) 
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
            </div>   

            {/* Part 4 */}

            <h5>The location of the hole on the AST Shell</h5>
            <TankComponentDialog value={theLocationHoleTable
                .map(({small, medium, large, rupture}: any) => ({
                    small: small?.toExponential(4),
                    medium: medium?.toExponential(4),
                    large: large?.toExponential(4),
                    rupture: rupture?.toExponential(4),
                }))
            } options={{tableTitle: "Volume of available fluid Lvolavail,n  (m³)"}}/>
            <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(totalVolumeFluidC1)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(totalVolumeFluidC2)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(totalVolumeFluidC3)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(totalVolumeFluidC4)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
            </div>  

            <h5>AST Volume in barrels</h5>
            <TankComponentDialog value={astVolumeTable
                .map(({small, medium, large, rupture}: any) => ({
                    small: small?.toExponential(4),
                    medium: medium?.toExponential(4),
                    large: large?.toExponential(4),
                    rupture: rupture?.toExponential(4),
                }))
            } options={{tableTitle: "Volume of available fluid Bblavail,n  (bbl)"}}/>
            <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(astVolumeSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(astVolumeMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(astVolumeLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(astVolumeRupture)?.toFixed(6) 
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
            </div>   

            <h5>AST Mass</h5>
            <TankComponentDialog value={astMassTable
                .map(({small, medium, large, rupture}: any) => ({
                    small: small?.toExponential(4),
                    medium: medium?.toExponential(4),
                    large: large?.toExponential(4),
                    rupture: rupture?.toExponential(4),
                }))
            } options={{tableTitle: "Mass of available fluid massavail,n  (kg)"}}/>
            <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(astMassSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(astMassMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(astMassLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(astMassRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
            </div>   

            
            {/* Part 7 */}
            
            <h5>Release rate, raten , in bbls/day </h5>
            <TankComponentDialog value={releaseRatenBblTable
                .map(({small, medium, large, rupture}: any) => ({
                    small: small?.toExponential(4),
                    medium: medium?.toExponential(4),
                    large: large?.toExponential(4),
                    rupture: rupture?.toExponential(4),
                }))
            } options={{tableTitle: "Release Rate, Raten  (bbl/day)"}}/>
            <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        value: Number(releaseRatenBblSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        value: Number(releaseRatenBblMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        value: Number(releaseRatenBblLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        value: Number(releaseRatenBblRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
            </div> 
            
            <h5>Leak Detection (tld)</h5>
            <TankComponentDialog value={[
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
            ]} options={{tableTitle: "Leak detection tld (day)"}}/>
            
            <h5>Leak Detection (Idn)</h5>
            <TankComponentDialog value={[
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
            ]} options={{tableTitle: "Leak detection Idn (day)"}}/>
            <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        // value: Number(releaseRateWnSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        // value: Number(releaseRateWnMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        // value: Number(releaseRateWnLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        // value: Number(releaseRateWnRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
            </div>
            
            <h5>Release volume from leakage (bbl)</h5>
            <TankComponentDialog value={[
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
            ]} options={{tableTitle: "Release volume from leakage (bbl)"}}/>
            <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        // value: Number(releaseRateWnSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        // value: Number(releaseRateWnMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        // value: Number(releaseRateWnLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        // value: Number(releaseRateWnRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
            </div>   

            <h5>Release volume from leakage (mass)</h5>
            <TankComponentDialog value={[
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
            ]} options={{tableTitle: "Release volume from leakage (mass)"}}/>
            <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        // value: Number(releaseRateWnSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        // value: Number(releaseRateWnMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        // value: Number(releaseRateWnLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        // value: Number(releaseRateWnRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
            </div>  
            
            <h5>Release volume from a rupture (Bbl)</h5>
            <TankComponentDialog value={[
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
            ]} options={{tableTitle: "Volume of available fluid Bblavail (bbl)"}}/>
            <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        // value: Number(releaseRateWnSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        // value: Number(releaseRateWnMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        // value: Number(releaseRateWnLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        // value: Number(releaseRateWnRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
            </div>   

            <h5>Release volume from a rupture (Mass)</h5>
            <TankComponentDialog value={[
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
            ]} options={{tableTitle: "Volume of available fluid Bblavail (Mass)"}}/>
            <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        // value: Number(releaseRateWnSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        // value: Number(releaseRateWnMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        // value: Number(releaseRateWnLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        // value: Number(releaseRateWnRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
            </div>  

            <h5>Consequence of area for Auto-Ignition Likely, Continous Release (AIL-CONT), CAAIL-CONT</h5>
            <TankComponentDialog value={[
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
            ]} options={{tableTitle: "CA AINL-CONT (m²)"}}/>
            <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        // value: Number(releaseRateWnSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        // value: Number(releaseRateWnMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        // value: Number(releaseRateWnLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        // value: Number(releaseRateWnRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
            </div> 
            
            <h5>Consequence of area for Auto-ignition Not Likely, Continous Release (AINL-CONT)</h5>
            <TankComponentDialog value={[
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
            ]} options={{tableTitle: "CA AINL-CONT (m²)"}}/>
            <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        // value: Number(releaseRateWnSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        // value: Number(releaseRateWnMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        // value: Number(releaseRateWnLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        // value: Number(releaseRateWnRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
            </div> 

            <h5>Instataneous/continous blending factor</h5>
            <TankComponentDialog value={[
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
            ]} options={{tableTitle: "CA AINL-CONT (m²)"}}/>
            <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        // value: Number(releaseRateWnSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        // value: Number(releaseRateWnMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        // value: Number(releaseRateWnLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        // value: Number(releaseRateWnRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
            </div>  



            <h5>Effective duration of the toxic release</h5>
            <TankComponentDialog value={[
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
            ]} options={{tableTitle: "Mass (kgs)"}}/>
            <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        // value: Number(releaseRateWnSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        // value: Number(releaseRateWnMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        // value: Number(releaseRateWnLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        // value: Number(releaseRateWnRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
            </div>  

            <h5>Leak Duration Idm (s)</h5>
            <TankComponentDialog value={[
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
            ]} options={{tableTitle: "Leak Duration Idm(s)"}}/>
            <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        // value: Number(releaseRateWnSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        // value: Number(releaseRateWnMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        // value: Number(releaseRateWnLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        // value: Number(releaseRateWnRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
            </div>  

            <h5>Release Rate</h5>
            <TankComponentDialog value={[
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
            ]} options={{tableTitle: "Release Rate (kg/s)"}}/>
            <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        // value: Number(releaseRateWnSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        // value: Number(releaseRateWnMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        // value: Number(releaseRateWnLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        // value: Number(releaseRateWnRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
            </div> 
            
            <h5>Toxic Analysis</h5>
            <TankComponentDialog value={[
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
                {
                    small: 0,
                    medium: 0,
                    large: 0,
                    rupture: 0
                },
            ]} options={{tableTitle: ""}}/>
            <div className="flex flex-wrap">
            {
                [
                    {
                        label: "Small Release Hole Size",
                        // value: Number(releaseRateWnSmall)?.toFixed(6)
                    },
                    {
                        label: "Medium Release Hole Size",
                        // value: Number(releaseRateWnMedium)?.toFixed(6)
                    },
                    {
                        label: "Large Release Hole Size",
                        // value: Number(releaseRateWnLarge)?.toFixed(6)
                    },
                    {
                        label: "Rupture Release Hole Size",
                        // value: Number(releaseRateWnRupture)?.toFixed(6)
                    },
                ].map(({label, value}: any, key) => <InputValueOnly label={label} value={ value && !isNaN(value) ? value : "-" } key={key}/>)
            }
            </div>  


        </div>
        </>
    )
}

export default COFTank;
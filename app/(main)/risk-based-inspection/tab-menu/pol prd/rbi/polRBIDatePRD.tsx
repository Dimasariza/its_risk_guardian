"use client"

import InputValueOnly from "@/app/(main)/uikit/inputValueOnly";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useRef, useState } from "react";
import InputTypeText from "@/app/(main)/uikit/input-type-text";
import InputDropDown from "@/app/(main)/uikit/input-drop-down";
import inputs from "./input";
import { useSelector } from "react-redux";
import ServiceSeverityDialog, { severity } from "./dialog/serviceSeverity";
import AdjusmentFactorDialog, { adjFactorEnvirontment } from "./dialog/adjusmentFactor";
import InspectionEffectiveness, { effectivenessPofRBI } from "./dialog/inspectionEffectiveness";
import InspectionConfidenceFactor, { confidenceFactors } from "./dialog/inspectionConfidenceFactor";
import { eventFreq } from "./dialog/initiatingEventFrequencies";
import { protectedEquipment } from "./dialog/classProtected";
import { Toast } from "primereact/toast";
import IGeneralData from "@/types/IGeneralData";
import { GeneralDataService } from "@/service/calculation/generalData-service";
import { convertDateToString } from "@/function/common";
import { calcPRDPOFRBI } from "@/function/calcPRDPOFRBI";
import { getPOLPRDRBI, updatePOLPRDRBI } from "@/service/calculation/polPRDService";
import InputCalendar from "@/app/(main)/uikit/input-calendar";

export const adjusmentFactor = [
    { name: 'Conventional valves', number: 1.25, id: "adjFactor001" },
    { name: 'All other cases', number: 1, id: "adjFactor002" },
];

function POLRBIDatePRD() {
    const [value, setValue] = useState<any>({});
    const [error, setError] = useState<any>({});
    const [generalData, setGeneralData] = useState<IGeneralData|any>({})

    let { edit, undoEdit } = useSelector((state: any) => state.EditReducer);

    const data = useSelector((state: any) => state.Reducer);
    const componentId = data.menu?.comp_id
    const toast = useRef<any>(null);

    useEffect(() => {
        edit = true;
        Promise.all([
            GeneralDataService.fetchData(componentId),
            getPOLPRDRBI(componentId)
        ])
        .then(([generalData, PRDPolRbi]: any) => {
            setGeneralData(generalData)
            const { rbi_adjusmentFactor, rbi_envAdjusmentFactor, rbi_inspEffectiveness, rbi_serviceSeverity, rbi_confidenceFactor, rbi_eventFreqFire, rbi_eventFreqOverFilling, rbi_protectedEquipment} = PRDPolRbi
            setValue({
                ...PRDPolRbi,
                rbi_rbiDate: new Date(PRDPolRbi.rbi_rbiDate),
                severity: severity.find((i) => i.id == rbi_serviceSeverity),
                adjFactor: adjusmentFactor.find((i) => i.id == rbi_adjusmentFactor),
                weibullParameter: adjFactorEnvirontment.find((i) => i.id == rbi_envAdjusmentFactor),
                inspEffectiveness: effectivenessPofRBI.find((i) => i.id == rbi_inspEffectiveness),
                confidence: confidenceFactors.find((i) => i.id == rbi_confidenceFactor),
                eventFire: eventFreq.find((i) => i.id == rbi_eventFreqFire),
                eventOverFilling: eventFreq.find((i) => i.id == rbi_eventFreqOverFilling),
                protected: protectedEquipment.find((i) => i.id == rbi_protectedEquipment),
            })
        })
    }, [data])

    useEffect(() => {
        if(Object.keys(error).length === 0 && !edit && !undoEdit) {
            updatePOLPRDRBI({
                ...value,
                rbi_rbiDate: convertDateToString(value.rbi_rbiDate)
            }, componentId)
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
        ageTimeInServiceTk,
        timePrior,
        priorProbability,
        conditionPOf,
        weightedPOF,
        muUpd,
        finalUpdateValue,
        pofodShouladj,
        fSet
    } = calcPRDPOFRBI(generalData, value, "pol")

    return (
        <section className="p-3">
            <Toast ref={toast}  position="bottom-right" />
            <div className='flex flex-wrap lg:column-gap-3 mt-4'>
                {inputs.map((props: any, key: number) => {
                if (props.type == 'text') {
                    return <InputTypeText props={{...props, disabled: !edit}} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />;
                } else if (props.type == 'calendar') {
                    return <InputCalendar props={{...props, disabled: !edit}} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />;
                } else if (props.type == 'drop-down') {
                    return <InputDropDown props={{...props, disabled: !edit}} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />;
                } 
                })}
            </div>
            <div style={{width: "405px"}} className="flex justify-content-between mt-5">
                <span>Adjusment Factor</span>
                <Dropdown 
                    value={value.adjFactor} 
                    disabled={!edit}
                    onChange={(e) => {
                        const adjFactor = adjusmentFactor.find((i: any) => i.id == e?.value?.id)
                        setValue((prev: any) => ({
                            ...prev, 
                            rbi_adjusmentFactor: adjFactor?.id,
                            adjFactor
                        }))
                    }} 
                    options={adjusmentFactor} 
                    optionLabel="name" 
                    placeholder="Select adjusment Factor" 
                    className="w-full md:w-14rem" 
                />
            </div>
            <div className='flex flex-wrap gap-2 mt-3'>
                <ServiceSeverityDialog value={value} setValue={setValue} toast={toast}/>
                <AdjusmentFactorDialog value={value} setValue={setValue} toast={toast}/>
                <InspectionEffectiveness value={value} setValue={setValue} toast={toast}/>
                <InspectionConfidenceFactor value={value} setValue={setValue} toast={toast}/>
            </div>
            <div className='flex w-full flex-wrap mt-5'>
                {
                    [
                        {
                            label: "T inspection",
                            value: Number(ageTimeInServiceTk)?.toFixed(4)
                        },
                        {
                            label: "Prior Probability of Leakage",
                            value: Number(timePrior)?.toFixed(4)
                        },
                        {
                            label: "Prior Probability of Passing",
                            value: Number(priorProbability)?.toFixed(4)
                        },
                        {
                            label: "Conditional Probability of Pass",
                            value: Number(conditionPOf)?.toFixed(4)
                        },
                        {
                            label: "Weighted of Probability",
                            value: Number(weightedPOF)?.toFixed(4)
                        },
                        {
                            label: "Characteristif Life (ηupd)",
                            value: Number(muUpd)?.toFixed(4)
                        },
                        {
                            label: "Final Update Value",
                            value: Number(finalUpdateValue)?.toFixed(4)
                        },
                        {
                            label: "F Set",
                            value: Number(fSet)?.toFixed(4)
                        },
                        {
                            label: "RBI Date Value",
                            value: Number(fSet * finalUpdateValue)?.toFixed(4)
                        },
                    ].map(({label, value} : any, key) => <InputValueOnly label={label} value={ isNaN(Number(value)) ? "-" : value } key={label + key}/>)
                }
            </div>

        </section>
    )
}

export default POLRBIDatePRD;
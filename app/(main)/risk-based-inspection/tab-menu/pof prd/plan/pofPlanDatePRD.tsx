"use client"

import InputValueOnly from "@/app/(main)/uikit/input/inputValueOnly";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useRef, useState } from "react";
import InputTypeText from "@/app/(main)/uikit/input/input-type-text";
import InputDropDown from "@/app/(main)/uikit/input/input-drop-down";
import inputs from "./input";
import { useSelector } from "react-redux";
import ServiceSeverityDialog, { severity } from "./dialog/serviceSeverity";
import AdjusmentFactorDialog, { adjFactorEnvirontment } from "./dialog/adjusmentFactor";
import InspectionEffectiveness, { effectivenessPofPlan } from "./dialog/inspectionEffectiveness";
import InspectionConfidenceFactor, { confidenceFactors } from "./dialog/inspectionConfidenceFactor";
import InitiatingEventFrequencies, { eventFreq } from "./dialog/initiatingEventFrequencies";
import ClassProtectedDialogs, { protectedEquipment } from "./dialog/classProtected";
import { getPOFPRDPlan, updatePOFPRDPlan } from "@/service/calculation/pofPRDService";
import { Toast } from "primereact/toast";
import IGeneralData from "@/types/IGeneralData";
import { GeneralDataService } from "@/service/calculation/generalData-service";
import { convertDateToString } from "@/function/common";
import { calcPRDPOFPlan } from "@/function/calcPRDPOFPlan";
import GenericFailureFrequency from "../../pof-plan-date/value/genericFailureFreq";
import { gffTableValue } from "@/public/tableBasedOnAPI/gffTableValue";
import InputCalendar from "@/app/(main)/uikit/input/input-calendar";

export const adjusmentFactor = [
    { name: 'Conventional valves', number: 0.75, id: "adjFactor001" },
    { name: 'All other cases', number: 1, id: "adjFactor002" },
];

function POFPlanDatePRD() {
    const [value, setValue] = useState<any>({});
    const [error, setError] = useState<any>({});
    const [generalData, setGeneralData] = useState<IGeneralData|any>({})
    const [onSubmit, setOnSubmit] = useState(false);
    const [failureFrequency, setFailureFrequency] = useState<any>({});

    let { edit, undoEdit } = useSelector((state: any) => state.EditReducer);

    const data = useSelector((state: any) => state.Reducer);
    const componentId = data.menu?.comp_id
    const toast = useRef<any>(null);

    useEffect(() => {
        edit = true;
        Promise.all([
            GeneralDataService.fetchData(componentId),
            getPOFPRDPlan(componentId)
        ])
        .then(([generalData, PRDPofPlan]: any) => {
            setGeneralData(generalData)
            const { plan_adjusmentFactor, plan_envAdjusmentFactor, plan_inspEffectiveness, plan_serviceSeverity, plan_confidenceFactor, plan_eventFreqFire, plan_eventFreqOverFilling, plan_protectedEquipment} = PRDPofPlan
            setValue({
                ...PRDPofPlan,
                plan_planDate: new Date(PRDPofPlan.plan_planDate),
                severity: severity.find((i) => i.id == plan_serviceSeverity),
                adjFactor: adjusmentFactor.find((i) => i.id == plan_adjusmentFactor),
                weibullParameter: adjFactorEnvirontment.find((i) => i.id == plan_envAdjusmentFactor),
                inspEffectiveness: effectivenessPofPlan.find((i) => i.id == plan_inspEffectiveness),
                confidence: confidenceFactors.find((i) => i.id == plan_confidenceFactor),
                eventFire: eventFreq.find((i) => i.id == plan_eventFreqFire),
                eventOverFilling: eventFreq.find((i) => i.id == plan_eventFreqOverFilling),
                protected: protectedEquipment.find((i) => i.id == plan_protectedEquipment),
            })
            setFailureFrequency( gffTableValue.find((i) => PRDPofPlan.plan_failureFrequency == i.id ))
        })
    }, [data])

    useEffect(() => {
        if(Object.keys(error).length === 0 && !edit && !undoEdit) {
            updatePOFPRDPlan({
                ...value,
                plan_planDate: convertDateToString(value.plan_planDate),
                plan_failureFrequency: failureFrequency?.id
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
    }, [edit, onSubmit])

    const {
        ageTimeInServiceTk,
        timePrior,
        priorProbability,
        conditionPOf,
        weightedPOF,
        muUpd,
        finalUpdateValue,
        pofodShouladj,
        DRFire,
        DROverfilling,
        mawp,
        protectedEq,
        pofFire,
        pofOverFilling,
    } = calcPRDPOFPlan(generalData, value)

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
                            plan_adjusmentFactor: adjFactor?.id,
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
                <ServiceSeverityDialog value={value} setValue={setValue} setOnSubmit={setOnSubmit}/>
                <AdjusmentFactorDialog value={value} setValue={setValue} setOnSubmit={setOnSubmit}/>
                <InspectionEffectiveness value={value} setValue={setValue} setOnSubmit={setOnSubmit}/>
                <InspectionConfidenceFactor value={value} setValue={setValue} setOnSubmit={setOnSubmit}/>
                <InitiatingEventFrequencies value={value} setValue={setValue} setOnSubmit={setOnSubmit} name={{
                        db: "plan_eventFreqFire",
                        fe: "eventFire"
                    }}/>
                <InitiatingEventFrequencies value={value} setValue={setValue} setOnSubmit={setOnSubmit} name={{
                        db: "plan_eventFreqOverFilling",
                        fe: "eventOverFilling"
                    }}/>
                <ClassProtectedDialogs value={value} setValue={setValue} setOnSubmit={setOnSubmit}/>
                <GenericFailureFrequency failureFrequency={failureFrequency} setFailureFrequency={setFailureFrequency} setOnSubmit={setOnSubmit} />
            </div>
            <div className='flex w-full flex-wrap mt-5'>
                {
                    [
                        {
                            label: "T inspection",
                            value: Number(ageTimeInServiceTk)?.toFixed(4)
                        },
                        {
                            label: "Prior Probability of Failure",
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
                            label: "POFOD Should be adjust",
                            value: Number(pofodShouladj)?.toFixed(4)
                        },
                        {
                            label: "Demand Rate Place (Fire)",
                            value: Number(DRFire)?.toFixed(4)
                        },
                        {
                            label: "Demand Rate Place (Overfilling)",
                            value: Number(DROverfilling)?.toFixed(4)
                        },
                        {
                            label: "MAWP",
                            value: Number(mawp)?.toFixed(4)
                        },
                        {
                            label: "POF of Protected Equipment",
                            value: Number(protectedEq)?.toFixed(4)
                        },
                        {
                            label: "POF Fire",
                            value: Number(pofFire)?.toExponential(4)
                        },
                        {
                            label: "POF Overfilling",
                            value: Number(pofOverFilling)?.toExponential(4)
                        },
                    ].map(({label, value} : any, key) => <InputValueOnly label={label} value={ isNaN(Number(value)) ? "-" : value } key={label + key}/>)
                }
            </div>

        </section>
    )
}

export default POFPlanDatePRD;
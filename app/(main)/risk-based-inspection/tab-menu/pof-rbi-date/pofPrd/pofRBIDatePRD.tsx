"use client"

import InputValueOnly from "@/fragments/inputValueOnly";
import ServiceCategoryTable from "../../pol-plan-date/serviceCategoryTable";
import AdjusmentFactorTable from "../../pol-plan-date/adjusmetnFactor";
import InspectionEffectivenessTable from "../thinning/inspectionEfectivenessTableRef";
import InspectionConfidenceFactor from "../../pol-plan-date/inspectionConfidenceTable";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import InputTypeText from "@/fragments/input-type-text";
import InputCalendar from "@/fragments/input-calendar";
import InputDropDown from "@/fragments/input-drop-down";
import inputs from "./input";
import { useSelector } from "react-redux";

function POFRBIDatePRD() {
    const [value, setValue] = useState({
        inspectionConfidence: ""
    });
    const [error, setError] = useState<any>({});
    const confidentialValue = [
        { name: 'Conventional valves', value: 0.75, id: "confidence001" },
        { name: 'All other cases', value: 1, id: "confidence002" },
    ];

    let { edit, undoEdit } = useSelector((state: any) => state.EditReducer);

    return (
        <section className="p-3">
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
                <Dropdown value={value.inspectionConfidence} onChange={(e) => setValue((prev: any) => ({...prev, inspectionConfidence: e.value}))} options={confidentialValue} optionLabel="name" 
                    placeholder="Select adjusment Factor" className="w-full md:w-14rem" />
            </div>
            <div className='flex w-full flex-wrap flex-column gap-2 mt-5'>
                <ServiceCategoryTable />
                <AdjusmentFactorTable />
                <InspectionEffectivenessTable />
                <InspectionConfidenceFactor />
            </div>
            <div className='flex w-full flex-wrap mt-5'>
                {
                    [
                        {
                            label: "Last Inspection",
                            value: ""
                        },
                        {
                            label: "T inspection",
                            value: ""
                        },
                        {
                            label: "Time prior (P prd Prior)",
                            value: ""
                        },
                        {
                            label: "Prior Probability of Leakage",
                            value: ""
                        },
                        {
                            label: "Prior Probability of Passing",
                            value: ""
                        },
                        {
                            label: "Conditional Probability of Leakage",
                            value: ""
                        },
                        {
                            label: "Weighted Probability of Leakage",
                            value: ""
                        },
                        {
                            label: "MAWP",
                            value: ""
                        },
                        {
                            label: "Probability of Leakage",
                            value: ""
                        },
                        {
                            label: "Probability of Leakage needs",
                            value: ""
                        },
                    ].map(({label, value} : any, key) => <InputValueOnly label={label} value={value} key={label + key}/>)
                }
            </div>

        </section>
    )
}

export default POFRBIDatePRD;
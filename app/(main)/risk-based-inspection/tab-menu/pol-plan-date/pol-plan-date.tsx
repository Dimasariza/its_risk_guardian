import InputValueOnly from "@/fragments/inputValueOnly";
import { useState } from "react";
import ServiceCategoryTable from "./serviceCategoryTable";
import { Dropdown } from "primereact/dropdown";
import AdjusmentFactorTable from "./adjusmetnFactor";
import InspectionEffectivenessTable from "./inspectionEffectivenessTable";
import InspectionConfidenceFactor from "./inspectionConfidenceTable";

const POLPlanDate = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'Conventional valves', value: 0.75 },
        { name: 'All other cases', code: 1 },
    ];

    return (
        <section className="p-3">
            <div style={{width: "405px"}} className="flex justify-content-between">
                <span>Adjusment Factor</span>
                <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
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
                            label: "Fluid Service",
                            value: ""
                        },
                        {
                            label: "Design Type",
                            value: ""
                        },
                        {
                            label: "Discharge Location",
                            value: "d"
                        },
                        {
                            label: "𝜂_𝑚𝑜𝑑",
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
                            label: "𝜂_𝑢𝑝𝑑",
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
                    ].map(({label, value} : any) => <InputValueOnly label={label} value={value} />)
                }
            </div>

        </section>
    )
}

export default POLPlanDate;
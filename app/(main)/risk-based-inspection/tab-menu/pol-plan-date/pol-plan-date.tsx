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
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    return (
        <section className="p-3">
                {/* <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                    placeholder="Select a City" className="w-full md:w-14rem" /> */}
            <div className='flex flex-wrap lg:column-gap-5 mt-4'>
                inputs
            </div>
            <div className='flex w-full flex-wrap flex-column gap-2 mt-5'>
                <ServiceCategoryTable />
                <AdjusmentFactorTable />
                <InspectionEffectivenessTable />
                <InspectionConfidenceFactor />
            </div>
            <div>
                <InputValueOnly label={"T inspection"} value={"4"} /> 
                <InputValueOnly label={"Fluid Service"} value={"Hydro Carbon"} /> 
                <InputValueOnly label={"Design Type"} value={"Conventional"} /> 
                <InputValueOnly label={"Discharge Location"} value={"Discharge to flare with flare recovery system"} /> 
                <InputValueOnly label={"𝜂_𝑚𝑜𝑑"} value={"Discharge to flare with flare recovery system"} /> 
            </div>

        </section>
    )
}

export default POLPlanDate;
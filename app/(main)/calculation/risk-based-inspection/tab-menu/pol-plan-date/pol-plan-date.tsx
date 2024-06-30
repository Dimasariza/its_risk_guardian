import InputValueOnly from "@/fragments/inputValueOnly";
import { useState } from "react";
import ServiceCategoryTable from "./serviceCategoryTable";

const POLPlanDate = () => {
    const [visible, setVisible] = useState<any>({
        severity: false
    });
    return (
        <section className="p-3">
            <h5>Service Severity</h5>
            <div>
                <InputValueOnly label={"T inspection"} value={"4"} /> 
                <InputValueOnly label={"Fluid Service"} value={"Hydro Carbon"} /> 
                <InputValueOnly label={"Design Type"} value={"Conventional"} /> 
                <InputValueOnly label={"Discharge Location"} value={"Discharge to flare with flare recovery system"} /> 
            </div>

            <div>Service Severity Categories</div>
            <ServiceCategoryTable visible={visible.severity} setVisible={setVisible} />
        </section>
    )
}

export default POLPlanDate;
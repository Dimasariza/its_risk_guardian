import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Row } from "primereact/row";
import { useState } from "react";

function FluidServiceSeverity() {
    const [visible, setVisible] = useState<boolean>(false);
    const footerContent = (
        <div className="flex gap-2 justify-content-end">
            <Button label="Cancel" icon="pi pi-check" 
            onClick={() => setVisible(false)} 
            severity="danger" />
        </div>
    );

    const serviceSeverity = [
        {
            id: "severity001",
            service: "Mild",
            mttf: "Failure is characterized by a long (25 years) MTTF",
            failure: "None",
            stream: "None",
            typical: "None",
            examples: "None",
        },
        {
            id: "severity002",
            service: "Moderate",
            mttf: "Failure occurs at an average (15 years) MTTF.",
            failure: "Medium",
            stream: "Medium",
            typical: "Medium",
            examples: "None",
        },
        {
            id: "severity003",
            service: "Severe",
            mttf: "Failure is characterized as a relatively short (7 years) MTTF.",
            failure: "High",
            stream: "High",
            typical: "High",
            examples: "None",
        },
    ]

    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">PRD Service Severity</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Categories of PRD Service Severity (Fail Case Only)" visible={visible} style={{ width: '80%' }} maximizable
                modal onHide={() => {if (!visible) return; setVisible(false); }}  
                footer={footerContent}
                >
                <div>
                <DataTable 
                    value={serviceSeverity.map((i: any, no: number) => ({...i, no: no + 1 + "."}))} 
                    scrollable 
                    tableStyle={{ minWidth:  '50rem' }} 
                >
                    <Column field="" header="Service Severity"></Column>
                    <Column field="" header="Characteristic MTTF"></Column>
                    <Column field="service" header="Characteristic of Failure"></Column>
                    <Column field="mttf" header="Expected Stream Characterization"></Column>
                    <Column field="failure" header="Typical Temperature"></Column>
                    <Column field="failure" header="Typical Temperature"></Column>
                    <Column field="failure" header="Examples of Service"></Column>
                    <Column field="failure" header="Examples of Service"></Column>
                </DataTable>
                </div>
            </Dialog>
        </>
    )
}

export default FluidServiceSeverity;
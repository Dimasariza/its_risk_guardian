import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Row } from "primereact/row";
import { useState } from "react";

function InspectionEffectivenessTable() {
    const [visible, setVisible] = useState(false);

    const severity = [
        {
            id: 'genericFailure1001',
            inspection: 'Hightly Effective A',
            type: "Pressure Relief Device",
            desc: "A bench test has been performed on the PRD in the as-received condition from the unit and the initial leak pressure, opening pressure and the reseat pressure has been documented on the test form. The inlet and outlet piping has been examined for signs of excessive plugging or fouling."
        },    
        {
            id: 'genericFailure1002',
            inspection: 'Hightly Effective A',
            type: "Rupture Disk",
            desc: "No inspection methods are available to meet the requirements for an A level inspection."
        },  
        {
            id: 'genericFailure1003',
            inspection: 'Usually Effective B',
            type: "Pressure Relief Device",
            desc: "A bench test has been performed, however, the PRD was cleaned or steamed out prior to the bench test Adcfitionally, a visual inspection has been performed where detailed doamentation of the condition of the PRD intemal components was made. An in-situ test has been performed using the actual process fluid to pressurize the system."
        },
        {
            id: 'genericFailure1004',
            inspection: 'Usually Effective B',
            type: "Rupture Disk",
            desc: "The rupture disk is removed and visually inspected for damage deformations."
        },         
        {
            id: 'genericFailure1005',
            inspection: 'Fairly Effective C',
            type: "Pressure Relief Device",
            desc: "A visual inspection has been performed without a pop test, where detailed documentation of the condition of the PRD internal components was made. A trevitest or in-situ test has been performed where the actual process fluid was not used to pressurize the system."
        },         
        {
            id: 'genericFailure1006',
            inspection: 'Fairly Effective C',
            type: "Rupture Disk",
            desc: "The space between the disk and the PRD is monitored for leakage in accordance with the ASME Code and API RP 520 Part 2."
        }, 
        {
            id: 'genericFailure1007',
            inspection: 'Inefective D',
            type: "Pressure Relief Device",
            desc: "Valve overhaul performed ; no pop test conducted/documented"
        },   
        {
            id: 'genericFailure1008',
            inspection: 'Inefective D',
            type: "Rupture Disk",
            desc: "No details of the internal component were documented"
        },      
    ]

    const handleSubmit = () => {
        return <></>
    }

    const footerContent = (
        <div>
          <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible(false)} severity="danger" />
          <Button label="Save" icon="pi pi-check" onClick={handleSubmit} severity="success" />
        </div>
    );


    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Inspection Effectiveness</label>
                <Button label="Show Table" onClick={() => { setVisible(true) }} />
            </div>

            <Dialog header="Inspection Effectiveness" visible={visible} style={{ width: '90%' }} maximizable
            modal onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
                <DataTable 
                    value={severity} 
                    selectionMode={"single"}
                    rowGroupMode="rowspan" 
                    groupRowsBy="inspection"
                >
                    <Column selectionMode="single"></Column>
                    <Column field="inspection" header="Inspection Effectiveness" ></Column>
                    <Column field="type" header="Component Type" ></Column>
                    <Column field="desc" header="Description of Inspection" ></Column>
                </DataTable>
            </Dialog>
        </>
    )
}

export default InspectionEffectivenessTable;
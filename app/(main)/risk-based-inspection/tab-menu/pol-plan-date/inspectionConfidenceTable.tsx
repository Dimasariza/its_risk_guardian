import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Row } from "primereact/row";
import { useState } from "react";

function InspectionConfidenceFactor() {
    const [visible, setVisible] = useState(false);

    const headerGroup = (
        <ColumnGroup>
            <Row>
              <Column header="" rowSpan={2} />
              <Column header="Inspection Result" rowSpan={2} />
              <Column header="Confidence Factor That Inspection Result Determines the True Damage State, CF" colSpan={4} />
            </Row>
            <Row>
              <Column header="Ineffective"/>
              <Column header="Fairly Effective"/>
              <Column header="Usually Effective"/>
              <Column header="Highly Effective"/>
            </Row>
        </ColumnGroup>
    );

    const inspection = [
        {
            id: 'inspection1001',
            result: "Pass",
            ineffective: "No Credit",
            fairly: 0.5,
            usually: 0.7,
            highly: 0.9
        },    
        {
            id: 'inspection1002',
            result: "Fail",
            ineffective: "No Credit",
            fairly: 0.7,
            usually: 0.95,
            highly: 0.95
        },   
        {
            id: 'inspection1003',
            result: "No Leak",
            ineffective: "No Credit",
            fairly: 0.5,
            usually: 0.7,
            highly: 0.9
        },     
        {
            id: 'inspection1004',
            result: "Leak",
            ineffective: "No Credit",
            fairly: 0.7,
            usually: 0.95,
            highly: 0.95
        },   
    ]

    const handleSubmit = () => {
        return <></>
    }

    const footerContent = (
        <div>
          <Button label="Cancel" icon="pi pi-check" onClick={() => setVisible(false)} severity="danger" />
          <Button label="Save" icon="pi pi-times" onClick={handleSubmit} severity="success" />
        </div>
    );


    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Service Severity</label>
                <Button label="Show Table" onClick={() => { setVisible(true) }} />
            </div>

            <Dialog header="Service Severity Categories" visible={visible} style={{ width: '90%' }} maximizable
            modal onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
                <DataTable 
                    value={inspection} 
                    headerColumnGroup={headerGroup} 
                    selectionMode={"single"}
                >
                    <Column selectionMode="single"></Column>
                    <Column field="result"></Column>
                    <Column field="ineffective"></Column>
                    <Column field="fairly"></Column>
                    <Column field="usually"></Column>
                    <Column field="highly"></Column>
                </DataTable>
            </Dialog>
        </>
    )
}

export default InspectionConfidenceFactor;
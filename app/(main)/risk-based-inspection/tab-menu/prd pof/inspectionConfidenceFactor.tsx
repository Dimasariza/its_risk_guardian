import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Row } from "primereact/row";
import { useState } from "react";

function InspectionConfidenceFactor() {
    const [visible, setVisible] = useState<boolean>(false);
    const footerContent = (
        <div className="flex gap-2 justify-content-end">
            <Button label="Cancel" icon="pi pi-check" 
            onClick={() => setVisible(false)} 
            severity="danger" />
        </div>
    );

    const suscepbility = [
        {
            id: "ph001",
            result: "Pass",
            ineffective: "None",
            fairly: "None",
            usually: "None",
            highly: "None",
        },
        {
            id: "ph002",
            result: "Fail",
            ineffective: "None",
            fairly: "Low",
            usually: "Medium",
            highly: "Medium",
        },
        {
            id: "ph003",
            result: "No Leak",
            ineffective: "None",
            fairly: "Low",
            usually: "High",
            highly: "High",
        },
        {
            id: "ph004",
            result: "Leak",
            ineffective: "None",
            fairly: "High",
            usually: "High",
            highly: "High",
        },
    ]

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

    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Inspection Confidence Factor</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Inspection Confidence Factor" visible={visible} style={{ width: '80%' }} maximizable
                modal onHide={() => {if (!visible) return; setVisible(false); }}  
                footer={footerContent}
                >
                <div>
                <DataTable 
                    value={suscepbility.map((i: any, no: number) => ({...i, no: no + 1 + "."}))} 
                    scrollable 
                    tableStyle={{ minWidth:  '50rem' }} 
                    headerColumnGroup={headerGroup}
                    selectionMode={"single"} 
                    // onSelectionChange={(e: any) => setValue((prev: any) => ({...prev, damage: e.value}))} 
                >
                    <Column selectionMode="single"></Column>
                    <Column field="result"></Column>
                    <Column field="ineffective"></Column>
                    <Column field="fairly"></Column>
                    <Column field="usually"></Column>
                    <Column field="highly"></Column>
                </DataTable>
                </div>
            </Dialog>
        </>
    )
}

export default InspectionConfidenceFactor;
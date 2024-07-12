import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Row } from "primereact/row";
import { useState } from "react";
import { conditional, prior } from "./probabilityTable";

function InspectionEffectivenessTable() {
    const [visible, setVisible] = useState<boolean>(false);
    const footerContent = (
        <div className="flex gap-2 justify-content-end">
            <Button label="Cancel" icon="pi pi-check" 
            onClick={() => setVisible(false)} 
            severity="danger" />
        </div>
    );

    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Inspection Effectiveness</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Inspection Effectiveness" visible={visible} style={{ width: '70%' }} maximizable
                modal onHide={() => {if (!visible) return; setVisible(false); }}  
                footer={footerContent}
                >
                <div>
                    <h5>Prior probablility for thinning corrosion rate</h5>
                    <DataTable 
                        value={prior.map((i: any, no: number) => ({...i, no: no + 1 + "."}))} 
                        scrollable 
                        tableStyle={{ minWidth:  '50rem' }} 
                    >
                        <Column field="no" header="No"></Column>
                        <Column field="state" header="Damage State" ></Column>
                        <Column field="low" header="Low Confidence Data"></Column>
                        <Column field="medium" header="Medium Confidence Data"></Column>
                        <Column field="high" header="High Conf. Data"></Column>
                    </DataTable>

                    <h5>Conditional  probability for inspection effectiveness</h5>
                    <DataTable 
                        value={conditional.map((i: any, no: number) => ({...i, no: no + 1 + "."}))} 
                        scrollable 
                        tableStyle={{ minWidth:  '50rem' }} 
                    >
                        <Column field="no" header="No"></Column>
                        <Column field="state" header="Conditional Prob. of Inspection" ></Column>
                        <Column field="e" header="E-None or Ineffective"></Column>
                        <Column field="d" header="D-Poorly Effective"></Column>
                        <Column field="c" header="C-Fairly Effective"></Column>
                        <Column field="b" header="B-Usually Effective"></Column>
                        <Column field="a" header="A-Highly Effective"></Column>
                    </DataTable>
                </div>
            </Dialog>
        </>
    )
}

export default InspectionEffectivenessTable;
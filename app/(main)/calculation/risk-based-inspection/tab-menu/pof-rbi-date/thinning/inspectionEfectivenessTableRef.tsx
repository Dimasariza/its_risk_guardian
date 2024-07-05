import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Row } from "primereact/row";
import { useState } from "react";

function InspectionEffectivenessTable() {
    const [visible, setVisible] = useState<boolean>(false);
    const footerContent = (
        <div className="flex gap-2 justify-content-end">
            <Button label="Cancel" icon="pi pi-check" 
            onClick={() => setVisible(false)} 
            severity="danger" />
        </div>
    );

    const prior = [
        {
            state: "P1",
            low: 0.5,
            medium: 0.7,
            high: 0.8
        },
        {
            state: "P2",
            low: 0.3,
            medium: 0.2,
            high: 0.15
        },
        {
            state: "P3",
            low: 0.2,
            medium: 0.1,
            high: 0.05
        }
    ]
    
    const conditional = [
        {
            state: "P1",
            e: 0.33,
            d: 0.4,
            c: 0.5,
            b: 0.7,
            a: 0.9
        },
        {
            state: "P2",
            e: 0.33,
            d: 0.33,
            c: 0.3,
            b: 0.2,
            a: 0.09
        },
        {
            state: "P3",
            e: 0.33,
            d: 0.27,
            c: 0.2,
            b: 0.1,
            a: 0.01
        }
    ]

    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Inspection Effectiveness</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Screening Question" visible={visible} style={{ width: '50%' }} maximizable
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
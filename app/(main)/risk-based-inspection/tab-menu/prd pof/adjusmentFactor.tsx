import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Row } from "primereact/row";
import { useState } from "react";

function AdjusmentFactorDialog() {
    const [visible, setVisible] = useState(false);

    const environtment = [
        {
            id: 'environtment001',
            env: 'Operating Temperatur 200<T<500⁰F',
            pofod: 1,
            pol: 0.8
        },    
        {
            id: 'environtment002',
            env: 'Operating Temperatur >500⁰F',
            pofod: 1,
            pol: 0.6
        },   
        {
            id: 'environtment003',
            env: 'Operating Ratio >90% for spring-loaded PRVs or >95% for pilot-operated PRVs',
            pofod: 1,
            pol: 0.5
        },   
        {
            id: 'environtment004',
            env: 'Installed Piping Vibration',
            pofod: 1,
            pol: 0.8
        }, 
        {
            id: 'environtment005',
            env: 'Pulsating or Cyclical service, such as Downstream of Positive Displacement Rotating Equipment',
            pofod: 1,
            pol: 0.8
        }, 
        {
            id: 'environtment006',
            env: 'History of Excessive Actuation in Service (greater than 5 times per year)',
            pofod: 0.5,
            pol: 0.5 ** 2
        }, 
        {
            id: 'environtment007',
            env: 'History of Chatter',
            pofod: 0.5,
            pol: 0.5
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

    const [selectedCell, setSelectedCell] = useState(null);

    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Environment adjustment Factors</label>
                <Button label="Show Table" onClick={() => { setVisible(true) }} />
            </div>

            <Dialog header="Environment adjustment Factors" visible={visible} style={{ width: '90%' }} maximizable
            modal onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
                <DataTable 
                    value={environtment} 
                    selectionMode="single" 
                    selection={selectedCell}
                    onSelectionChange={(e: any) => setSelectedCell(e.value)}
                >
                    <Column selectionMode="single"></Column>
                    <Column field="env" header="Environment Modifier" className="" ></Column>
                    <Column field="pofod" header="Adjustment to POFOD η parameter"></Column>
                    <Column field="pol" header="Adjustment to POL η parameter"></Column>
                </DataTable>
            </Dialog>
        </>
    )
}

export default AdjusmentFactorDialog;
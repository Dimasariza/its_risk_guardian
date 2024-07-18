import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Row } from "primereact/row";
import { useState } from "react";

function ClassProtectedDialogs  () {
    const [visible, setVisible] = useState<boolean>(false);
    const footerContent = (
        <div className="flex gap-2 justify-content-end">
            <Button label="Cancel" icon="pi pi-check" 
            onClick={() => setVisible(false)} 
            severity="danger" />
          <Button label="Save" icon="pi pi-times" severity="success" />
        </div>
    );

    const suscepbility = [
        {
            id: "protected001",
            class: "None",
            df: 1,
            description: "New vessel or inspection shows little if any damage",
        },
        {
            id: "protected002",
            class: "Minimal",
            df: 20,
            description: "Equipment has been in service for a reasonable amount of time and inspection shows evidence of minor damage . Damage mechanism have been identified and inspecton data is available.",
        },
        {
            id: "protected003",
            class: "Minor",
            df: 200,
            description: "One or more damage mechanisms have been identified, limited inspection data available and fairly moderate evidence of damage. Single damage mechanism identified, recent inspection indicates moderate evidence of damage.",
        },
        {
            id: "protected004",
            class: "Moderate",
            df: 750,
            description: "Moderate damage found during recent inspection. Low susceptible to one or more damage mechanisms, and limited inspection exists.",
        },
        {
            id: "protected005",
            class: "Severe",
            df: 2000,
            description: "One or more active damage mechanisms present without any recent inspection history. Limited inspection indicating high damage susceptibility",
        },
    ]
    
    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Classe For Protected Equipment</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Classe For Protected Equipment" visible={visible} style={{ width: '80%' }} maximizable
                modal onHide={() => {if (!visible) return; setVisible(false); }}  
                footer={footerContent}
                
                >
                <div>
                <DataTable 
                    value={suscepbility.map((i: any, no: number) => ({...i, no: no + 1 + "."}))} 
                    scrollable 
                    tableStyle={{ minWidth:  '50rem' }} 
                    selectionMode="single" 
                >
                    <Column selectionMode="single"></Column>
                    <Column field="class" header="DF Class"></Column>
                    <Column field="df" header="DF"></Column>
                    <Column field="description" header="Description"></Column>
                </DataTable>
                </div>
            </Dialog>
        </>
    )
}

export default ClassProtectedDialogs    ;
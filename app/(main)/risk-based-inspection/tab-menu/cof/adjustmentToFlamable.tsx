import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";
import { useState } from "react";

function AdjusmentToFlamable({mitigation, setMitigation, cofValue}: any) {
    const [visible, setVisible] = useState<boolean>(false)

    const footerContent = (
        <div>
          <Button label="Cancel" icon="pi pi-check" 
          onClick={() => setVisible(false)} 
          severity="danger" />
          <Button label="Save" icon="pi pi-times" 
          onClick={() => setVisible(false)} 
          severity="success" />
        </div>
    );

    return (
        <>
        
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Adjusment To Flamable</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible((prev: any) => ({...prev, phase: true}))} />
            </div>
            <Dialog header="Adjusment To Flamable" 
                visible={visible} 
                style={{ width: '90%' }}
                onHide={() => {if (!visible) return; setVisible(false); }}
                footer={footerContent}
            >
                <DataTable value={liquidPhase} selectionMode={"single"} selection={mitigation} 
                onSelectionChange={(e: any) => setMitigation(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="mitigation" header="Mitigation System"></Column>
                    <Column field="adjusment" header="Consequence Area Adjustemnet"></Column>
                    <Column field="factorLimit" header="Consequence Area Reduction Factor, factor mit"></Column>
                </DataTable>
            </Dialog>
        </>
    )
}

export default AdjusmentToFlamable;

const liquidPhase = [
    {
        id: 'mitigation1001',
        mitigation: 'Inventory blowdown , couple with isolation system classification B or higher',
        adjusment: 'Reduce consequence area  by 25 %',
        factorLimit: 0.25,
    },
    {
        id: 'mitigation1002',
        mitigation: 'Fire water deluge system and monitors',
        adjusment: 'Reduce consequence area by 20%',
        factorLimit: 0.2,
    },
    {
        id: 'mitigation1003',
        mitigation: 'Fire water monitor only',
        adjusment: 'Reduce consequence area by 5%',
        factorLimit: 0.05,
    },
    {
        id: 'mitigation1004',
        mitigation: 'Foam spray system',
        adjusment: 'Reduce consequence area by 15%',
        factorLimit: 0.15,
    },
]

export {liquidPhase}
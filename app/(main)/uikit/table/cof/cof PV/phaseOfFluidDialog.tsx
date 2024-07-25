import { CofService } from "@/service/calculation/cofService";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { useSelector } from "react-redux";


function PhaseOfFluid({value, setValue, setSubmit = () => {}}: any) {
    const [visible, setVisible] = useState<boolean>(false)
    const { edit } = useSelector((state: any) => state.EditReducer);
    
    const footerContent = (
        <div>
          <Button label="Cancel" icon="pi pi-times" 
          onClick={() => setVisible(false)} 
          severity="danger" />
          <Button label="Save" icon="pi pi-check" 
          onClick={() => {
            setVisible(false)
            setSubmit((prev: boolean) => !prev)
          }} 
          severity="success" />
        </div>
    );

    return (
        <>
        
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Phase of Fluid</label>
                <Button label="Show Table" size="small" className="mx-3" disabled={edit} onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Phase of Fluid" 
                visible={visible} 
                style={{ width: '90%' }}
                onHide={() => {if (!visible) return; setVisible(false); }}
                footer={footerContent}
            >
                <DataTable value={liquidPhase} selectionMode={"single"} selection={value?.phase} 
                onSelectionChange={(e: any) => setValue((prev: any) => ({
                            ...prev, 
                            phase: e.value,
                            cof_phaseOfFluid: e.value?.id
                        })
                    )} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="normal" header="Normal Operating (Storage) Conditions"></Column>
                    <Column field="ambient" header="Phase of Fluid at Ambient (After relase) Conditions"></Column>
                    <Column field="final" header="Determination of Final Phase of Consequence Calculation"></Column>
                </DataTable>
            </Dialog>
        </>
    )
}

export default PhaseOfFluid;

export const liquidPhase = [
    {
        id: 'phase1001',
        normal: 'Gas',
        ambient: 'Gas',
        final: 'Model as Gas',
    },
    {
        id: 'phase1002',
        normal: 'Gas',
        ambient: 'Liquid',
        final: 'Model as Gas',
    },
    {
        id: 'phase1003',
        normal: 'Liquid',
        ambient: 'Gas',
        final: 'Model as Gas unless the fluid boiling point at ambient conditions is greater than 80°F, then model as a liquid',
    },
    {
        id: 'phase1004',
        normal: 'Liquid',
        ambient: 'Liquid',
        final: 'Model as Liquid',
    },
]
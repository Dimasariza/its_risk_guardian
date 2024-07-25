import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { useSelector } from "react-redux";

export const adjFactorEnvirontment = [
    {
        id: 'adjEnvirontment001',
        env: 'Operating Temperatur 200<T<500⁰F',
        pofod: 1,
        pol: 0.8
    },    
    {
        id: 'adjEnvirontment002',
        env: 'Operating Temperatur >500⁰F',
        pofod: 1,
        pol: 0.6
    },   
    {
        id: 'adjEnvirontment003',
        env: 'Operating Ratio >90% for spring-loaded PRVs or >95% for pilot-operated PRVs',
        pofod: 1,
        pol: 0.5
    },   
    {
        id: 'adjEnvirontment004',
        env: 'Installed Piping Vibration',
        pofod: 1,
        pol: 0.8
    }, 
    {
        id: 'adjEnvirontment005',
        env: 'Pulsating or Cyclical service, such as Downstream of Positive Displacement Rotating Equipment',
        pofod: 1,
        pol: 0.8
    }, 
    {
        id: 'adjEnvirontment006',
        env: 'History of Excessive Actuation in Service (greater than 5 times per year)',
        pofod: 0.5,
        pol: 0.5 ** 2
    }, 
    {
        id: 'adjEnvirontment007',
        env: 'History of Chatter',
        pofod: 0.5,
        pol: 0.5
    },    
]

function AdjusmentFactorDialog({value, setValue, setOnSubmit}: any) {
    const [visible, setVisible] = useState(false);
    const { edit } = useSelector((state: any) => state.EditReducer);

    const footerContent = (
        <div>
          <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible(false)} severity="danger" />
          <Button label="Save" icon="pi pi-check" onClick={() => {
                setOnSubmit((prev: boolean) => !prev)
                setVisible(false)
            }} severity="success" />
        </div>
    );

    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Environment adjustment Factors</label>
                <Button label="Show Table" size="small" className="mx-3" disabled={edit} onClick={() => setVisible(true)} />
            </div>

            <Dialog header="Environment adjustment Factors" visible={visible} style={{ width: '90%' }} maximizable
            modal onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
                <DataTable 
                    value={adjFactorEnvirontment} 
                    selectionMode="single" 
                    selection={value.weibullParameter}
                    onSelectionChange={(e: any) => {
                        setValue((prev: any) => ({
                            ...prev, 
                            weibullParameter: e?.value,
                            plan_envAdjusmentFactor: e?.value?.id
                        }))
                    }}
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
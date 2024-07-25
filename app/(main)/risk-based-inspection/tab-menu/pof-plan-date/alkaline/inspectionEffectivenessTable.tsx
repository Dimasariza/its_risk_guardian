/* eslint-disable */
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { useSelector } from "react-redux";

export const inspection: any = [
    {
        id: "inspection001",
        inspection: "A",
        eff: "Highly Effective",
        intrusive: [
            <span>For the total weld area:</span>, <br />,
            <span>100% WFMT/ACFM with UT follow-up of relevant indications.</span>
        ],
        nonIntrusive: [
            <span>For the total weld area:</span>, <br />,
            <span>100% automated or manual ultrasonic scanning.</span>
        ],
    },
    {
        id: "inspection002",
        inspection: "B",
        eff: "Usually Effective",
        intrusive: [
            <span>For selected welds / weld area:</span>, <br />,
            <span>&gt;75% WFMT/ACFM with UT follow-up of all relevant indications.</span> 
        ],
        nonIntrusive: [
            <span>For selected welds / weld area:</span>, <br />,
            <span>&gt;75% WFMT/ACFM with UT follow-up of all relevant indications.</span> 
        ],
    },
    {
        id: "inspection003",
        inspection: "C",
        eff: "Fairly Effective",
        intrusive: [
            <span>For selected welds / weld area:</span>, <br />,
            <span>&gt;35% WFMT/ACFM with UT follow-up of all relevant indications.</span> 
        ],
        nonIntrusive: [
            <span>For selected welds / weld area:</span>, <br />,
            <span>&gt;35% WFMT/ACFM with UT follow-up of all relevant indications.</span> 
        ],
    },
    {
        id: "inspection004",
        inspection: "D",
        eff: "Poorly Effective",
        intrusive: [
            <span>For selected welds / weld area:</span>, <br />,
            <span>&gt;10% WFMT/ACFM with UT follow-up of all relevant indications.</span> 
        ],
        nonIntrusive: [
            <span>For selected welds / weld area:</span>, <br />,
            <span>&gt;10% WFMT/ACFM with UT follow-up of all relevant indications.</span> 
        ],
    },
    {
        id: "inspection005",
        inspection: "E",
        eff: "Ineffective",
        intrusive: [
            <span>Ineffective inspection technique/plan was utilized</span>
        ],
        nonIntrusive: [
            <span>Ineffective inspection technique/plan was utilized</span>
        ],
    },
]


function InspectionEffectivenessTable({inspectionSelected, setInspectionSelected}: any) {
    const [visible, setVisible] = useState<boolean>(false);
    const { edit } = useSelector((state: any) => state.EditReducer);

    const footerContent = (
        <div className="flex gap-2 justify-content-end">
            <Button label="Cancel" icon="pi pi-times" 
            onClick={() => setVisible(false)} 
            severity="danger" />
            <Button label="Save" icon="pi pi-check" 
            onClick={
                () => {
                    setVisible(false)
                }} 
            severity="success" />
        </div>
    );

    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Inspection Effectiveness</label>
                <Button label="Show Table" size="small" className="mx-3" disabled={edit} onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Inspection Effectiveness" visible={visible} style={{ width: '80%' }} maximizable
                modal onHide={() => {if (!visible) return; setVisible(false); }}  
                footer={footerContent}
                >
                <div>
                <DataTable 
                    value={inspection} 
                    scrollable 
                    selectionMode={"single"} 
                    selection={inspectionSelected} 
                    onSelectionChange={(e: any) => setInspectionSelected(e.value)} dataKey="id"
                    tableStyle={{ minWidth:  '50rem' }} 
                >
                    <Column selectionMode="single"></Column>
                    <Column field="inspection" header="Inspeciton Category"></Column>
                    <Column field="eff" header="Inspection Eff.Category"></Column>
                    <Column field="intrusive" header="Intrusive Inspection" ></Column>
                    <Column field="nonIntrusive"  header="Non Intrusive Inspection" ></Column>
                </DataTable>
                </div>
            </Dialog>
        </>
    )
}

export default InspectionEffectivenessTable;
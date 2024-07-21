import { convertDateToString } from "@/function/common";
import { updatePOLPRDRBI } from "@/service/calculation/polPRDService";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { useSelector } from "react-redux";

export const effectivenessPofRBI = [
    {
        id: "effectiveness001",
        effectiveness: "Hightly Effective A",
        type: "Pressure Relief Device",
        description: "A bench test has been performed on the PRD in the as-received condition from the unit and the initial leak pressure, opening pressure and the reseat pressure has been documented on the test form. The inlet and outlet piping has been examined for signs of excessive plugging or fouling.",
    },
    {
        id: "effectiveness002",
        effectiveness: "Hightly Effective A",
        type: "Rupture Disk",
        description: "No inspection methods are available to meet the requirements for an A level inspection.",
    },
    {
        id: "effectiveness003",
        effectiveness: "Usually Effective B",
        type: "Pressure Relief Device",
        description: "A bench test has been performed, however, the PRD was cleaned or steamed out prior to the bench test Adcfitionally, a visual inspection has been performed where detailed doamentation of the condition of the PRD intemal components was made. An in-situ test has been performed using the actual process fluid to pressurize the system.",
    },
    {
        id: "effectiveness004",
        effectiveness: "Usually Effective B",
        type: "Rupture Disk",
        description: "A bench test has been performed, however, the PRD was cleaned or steamed out prior to the bench test Adcfitionally, a visual inspection has been performed where detailed doamentation of the condition of the PRD intemal components was made. An in-situ test has been performed using the actual process fluid to pressurize the system.",
    },
    {
        id: "effectiveness005",
        effectiveness: "Fairly Effective C",
        type: "Pressure Relief Device",
        description: "A visual inspection has been performed without a pop test, where detailed documentation of the condition of the PRD internal components was made. A trevitest or in-situ test has been performed where the actual process fluid was not used to pressurize the system.",
    },
    {
        id: "effectiveness006",
        effectiveness: "Fairly Effective C",
        type: "Rupture Disk",
        description: "The space between the disk and the PRD is monitored for leakage in accordance with the ASME Code and API RP 520 Part 2.",
    },
    {
        id: "effectiveness007",
        effectiveness: "Inefective D",
        type: "Pressure Relief Device",
        description: "Valve overhaul performed ; no pop test conducted/documented",
    },
    {
        id: "effectiveness008",
        effectiveness: "Inefective D",
        type: "Rupture Disk",
        description: "No details of the internal component were documented",
    },
]

function InspectionEffectiveness({value, setValue, setOnSubmit}: any) {
    const [visible, setVisible] = useState<boolean>(false);

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
                <label htmlFor="">Inspection Effectiveness</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Inspection Effectiveness" visible={visible} style={{ width: '80%' }} maximizable
                modal onHide={() => {if (!visible) return; setVisible(false); }}  
                footer={footerContent}
                >
                <div>
                <DataTable 
                    value={effectivenessPofRBI} 
                    selection={value.inspEffectiveness}
                    scrollable 
                    tableStyle={{ minWidth:  '50rem' }} 
                    selectionMode="single" 
                    sortMode="single"
                    onSelectionChange={(e: any) => {
                        
                        setValue((prev: any) => ({
                            ...prev, 
                            inspEffectiveness: e?.value,
                            rbi_inspEffectiveness: e?.value?.id
                        }))
                    }}
                >
                    <Column selectionMode="single"></Column>
                    <Column field="effectiveness" header="Inspection Effectiveness"></Column>
                    <Column field="type" header="Component Type"></Column>
                    <Column field="description" header="Description of Inspection"></Column>
                </DataTable>
                </div>
            </Dialog>
        </>
    )
}

export default InspectionEffectiveness;
import { convertDateToString } from "@/function/common";
import { updatePOLPRDPlan } from "@/service/calculation/polPRDService";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { useSelector } from "react-redux";

export const eventFreq = [
    {
        id: "eventfreq001",
        overPress: "Fire",
        event: "1 per 250 years",
        ef: 0.004,
        drrf: 0.1,
    },
    {
        id: "eventfreq002",
        overPress: "Loss of Cooling Water Utility",
        event: "1 per 10 years",
        ef: 0.1,
        drrf: 1,
    },
    {
        id: "eventfreq003",
        overPress: "Electrical Power Supply failure",
        event: "1 per 12.5 years",
        ef: 0.08,
        drrf: 1,
    },
    {
        id: "eventfreq004",
        overPress: "Blocked Discharge with Administrative Controls in Place (see Note 1)",
        event: "1 per 100 Years",
        ef: 0.01,
        drrf: 1,
    },
    {
        id: "eventfreq005",
        overPress: "Blocked Discharge without Administrative Controls (See Note 1)",
        event: "1 per 10 years",
        ef: 0.1,
        drrf: 1,
    },
    {
        id: "eventfreq006",
        overPress: "Control Valve Failure, Initiating event is same direction as CV normal fail position (i.e. Fail safe)",
        event: "1 per 10 years",
        ef: 0.1,
        drrf: 1,
    },
    {
        id: "eventfreq007",
        overPress: "Control Valve Failure, Initiating event is opposite direction as CV normal fail position (i.e., fail opposite)",
        event: "1 per 50 years",
        ef: 0.02,
        drrf: 1,
    },
    {
        id: "eventfreq008",
        overPress: "Runaway Chemical Reaction",
        event: "1 per year",
        ef: 1,
        drrf: 1,
    },
    {
        id: "eventfreq009",
        overPress: "Heat Exchanger Tube Rupture",
        event: "1 per 1000 years ",
        ef: 0.001,
        drrf: 1,
    },
    {
        id: "eventfreq010",
        overPress: "Tower P/A or Reflux Pump Failures",
        event: "1 per 5 years",
        ef: 0.2,
        drrf: 1,
    },
    {
        id: "eventfreq011",
        overPress: "Thermal Relief with Administrative Controls in Place (see Note 1)",
        event: "1 per 100 Years",
        ef: 0.01,
        drrf: 1,
    },
    {
        id: "eventfreq012",
        overPress: "Thermal Relief without Administrative Controls (see Note 1)",
        event: "1 per 10 Years",
        ef: 0.1,
        drrf: 1,
    },
    {
        id: "eventfreq013",
        overPress: "Liquid Overfilling with Administrative Controls in Place (see Note 1)",
        event: "1 per 100 Years",
        ef: 0.01,
        drrf: 0.1,
    },
    {
        id: "eventfreq014",
        overPress: "Liquid Overfilling without Administrative Controls (see Note 1)",
        event: "1 per 10 Years",
        ef: 0.1,
        drrf: 0.1,
    },
]

function InitiatingEventFrequencies({value, setValue, setOnSubmit, name}: any) {
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
                <label htmlFor="">Initiating Event Frequency { name?.fe == "eventFire"  ? "Fire" : "Overfilling" } </label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Initiating Event Frequency" visible={visible} style={{ width: '80%' }} maximizable
                modal onHide={() => {if (!visible) return; setVisible(false); }}  
                footer={footerContent}
                >
                <div>
                <DataTable 
                    value={eventFreq} 
                    scrollable 
                    tableStyle={{ minWidth:  '50rem' }} 
                    selectionMode={"single"} 
                    sortMode="single"
                    selection={value?.[name.fe]}
                    onSelectionChange={(e: any) => {
                        setValue((prev: any) => ({
                            ...prev, 
                            [name.fe]: e?.value,
                            [name.db]: e?.value?.id
                        }))
                    }}
                >
                    <Column selectionMode="single"></Column>
                    <Column field="overPress" header="OverPressurre Demand Case"></Column>
                    <Column field="event" header="Event Frequency"></Column>
                    <Column field="ef" header="EF"></Column>
                    <Column field="drrf" header="DRRF"></Column>
                </DataTable>
                </div>
            </Dialog>
        </>
    )
}

export default InitiatingEventFrequencies;
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Row } from "primereact/row";
import { useState } from "react";

function WeibulParameters() {
    const [visible, setVisible] = useState<boolean>(false);
    const footerContent = (
        <div className="flex gap-2 justify-content-end">
            <Button label="Cancel" icon="pi pi-check" 
            onClick={() => setVisible(false)} 
            severity="danger" />
        </div>
    );

    const headerGroup = (
        <ColumnGroup>
            <Row>
                <Column header="Fluid Severity" rowSpan={2} style={{width: "10rem"}}/>
                <Column header="Conventional and Balanced Bellows PRV" colSpan={2} />
                <Column header="Pilot-Operated PRV" colSpan={2} />
                <Column header="Rupture Disk" colSpan={2} />
            </Row>
            <Row>
                <Column header="β" />
                <Column header="ɳdef" />
                <Column header="β" />
                <Column header="ɳdef" />
                <Column header="β" />
                <Column header="ɳdef" />
            </Row>
        </ColumnGroup>
    );

    const suscepbility = [
        {
            id: "ph001",
            ph: "<7.5",
            co3All: "None",
            co3Under100: "None",
            co3Over100: "None",
        },
        {
            id: "ph002",
            ph: "≥ 7.5 to 8.0",
            co3All: "None",
            co3Under100: "Low",
            co3Over100: "Medium",
        },
        {
            id: "ph003",
            ph: "≥ 8.0 to 9.0",
            co3All: "None",
            co3Under100: "Low",
            co3Over100: "High",
        },
        {
            id: "ph004",
            ph: "≥ 9.0",
            co3All: "None",
            co3Under100: "High",
            co3Over100: "High",
        },
    ]
    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Weibull Parameter</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Default Weibull Parameters for POFOD" visible={visible} style={{ width: '80%' }} maximizable
                modal onHide={() => {if (!visible) return; setVisible(false); }}  
                footer={footerContent}
                >
                <div>
                <DataTable 
                    value={suscepbility.map((i: any, no: number) => ({...i, no: no + 1 + "."}))} 
                    scrollable 
                    tableStyle={{ minWidth:  '50rem' }} 
                >
                    <Column field="" header="Service Severity"></Column>
                    <Column field="" header="Characteristic MTTF"></Column>
                    <Column field="co3All" header="Characteristic of Failure"></Column>
                    <Column field="co3Under100" header="Expected Stream Characterization"></Column>
                    <Column field="co3Over100" header="Typical Temperature"></Column>
                    <Column field="co3Over100" header="Examples of Service"></Column>
                </DataTable>
                </div>
            </Dialog>
        </>
    )
}

export default WeibulParameters;
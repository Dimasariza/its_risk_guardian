import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Row } from "primereact/row";
import { useState } from "react";

function SuscepbilityCrackingTable() {
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
                <Column header="" rowSpan={3} style={{ width: '3rem' }}/>
                <Column header="pH of Water" rowSpan={3} style={{width: "10rem"}}/>
                <Column header="Susceptibility to Cracking as a Function of CO3 Concentration in Water" colSpan={3} />
            </Row>
            <Row>
                <Column header="PWHT, Possible Cold Working" />
                <Column header="No PWHT, Possible Cold Working"  colSpan={2}/>
            </Row>
            <Row>
                <Column header="CO3 All Concentration" />
                <Column header="CO3 < 100 ppm" />
                <Column header="CO3 ≥ 100 ppm" />
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
                <label htmlFor="">Susceptibility to Cracking-ASCC</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Susceptibility to Cracking-ASCC" visible={visible} style={{ width: '50%' }} maximizable
                modal onHide={() => {if (!visible) return; setVisible(false); }}  
                footer={footerContent}
                >
                <div>
                <DataTable 
                    value={suscepbility.map((i: any, no: number) => ({...i, no: no + 1 + "."}))} 
                    scrollable 
                    tableStyle={{ minWidth:  '50rem' }} 
                    headerColumnGroup={headerGroup}
                >
                    <Column field="no" header="No"></Column>
                    <Column field="ph" ></Column>
                    <Column field="co3All" ></Column>
                    <Column field="co3Under100" ></Column>
                    <Column field="co3Over100" ></Column>
                </DataTable>
                </div>
            </Dialog>
        </>
    )
}

export default SuscepbilityCrackingTable;
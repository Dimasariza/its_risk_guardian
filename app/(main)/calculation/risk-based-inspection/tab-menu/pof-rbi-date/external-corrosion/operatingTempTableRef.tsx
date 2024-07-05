import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Row } from "primereact/row";
import { useState } from "react";

function OperatingTempTableRef() {
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
                <Column header="" rowSpan={2} style={{ width: '3rem' }}/>
                <Column header="Operating Temperature (°C)" rowSpan={2} style={{width: "10rem"}}/>
                <Column header="Corrosion Rate as a Function of Driver (1) (mpy)" colSpan={4} />
            </Row>
            <Row>
                <Column header="Marine/Cooling" />
                <Column header="Temperate" />
                <Column header="Arid/Dry" />
                <Column header="Severe" />
            </Row>
        </ColumnGroup>
    );

    const temperature = [
        {
            operating: -2,
            marine: 0,
            temperate: 0,
            arid: 0,
            severe: 0
        },
        {
            operating: -8,
            marine: 0.025,
            temperate: 0,
            arid: 0,
            severe: 0
        },
        {
            operating: 6,
            marine: 0.127,
            temperate: 0.076,
            arid: 0.025,
            severe: 0.254
        },
        {
            operating: 32,
            marine: 0.127,
            temperate: 0.076,
            arid: 0.025,
            severe: 0.254
        },
        {
            operating: 71,
            marine: 0.127,
            temperate: 0.051,
            arid: 0.025,
            severe: 0.254
        },
        {
            operating: 107,
            marine: 0.025,
            temperate: 0,
            arid: 0,
            severe: 0.051
        },
        {
            operating: 121,
            marine: 0,
            temperate: 0,
            arid: 0,
            severe: 0
        },
    ]
    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Corrosion Rate Operatng Temperature</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Screening Question" visible={visible} style={{ width: '50%' }} maximizable
                modal onHide={() => {if (!visible) return; setVisible(false); }}  
                footer={footerContent}
                >
                <div>
                <DataTable 
                    value={temperature.map((i: any, no: number) => ({...i, no: no + 1 + "."}))} 
                    scrollable 
                    tableStyle={{ minWidth:  '50rem' }} 
                    headerColumnGroup={headerGroup}
                >
                    <Column field="no" header="No"></Column>
                    <Column field="operating" ></Column>
                    <Column field="marine" ></Column>
                    <Column field="temperate" ></Column>
                    <Column field="arid" ></Column>
                    <Column field="severe" ></Column>
                </DataTable>
                </div>
            </Dialog>
        </>
    )
}

export default OperatingTempTableRef;
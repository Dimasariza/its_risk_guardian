import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Row } from "primereact/row";
import { useState } from "react";

function InspectionEffectivenessTable() {
    const [visible, setVisible] = useState<boolean>(false);
    const footerContent = (
        <div className="flex gap-2 justify-content-end">
            <Button label="Cancel" icon="pi pi-check" 
            onClick={() => setVisible(false)} 
            severity="danger" />
        </div>
    );

    const thirdHeader: any = []
    const headerGroup = () => {
        for(let i = 1; i <= 6; i++) thirdHeader.push(...[
            { title: "D", attr: "D" + i }, 
            { title: "C", attr: "C" + i }, 
            { title: "B", attr: "B" + i }, 
            { title: "A", attr: "A" + i }, 
        ])
        return <ColumnGroup>
            <Row>
                <Column frozen header="SVI" rowSpan={3} />
                <Column  header="Inspection Effectiveness" colSpan={30} headerStyle={{ textAlign: 'right' }}/>
            </Row>
            <Row>
                <Column header="E" rowSpan={2} headerStyle={{width: "20rem"}}/>
                {
                    [1,2,3,4,5,6].map(i => <Column header={`${i} Inspection`} key={"inspection" + i} colSpan={4}/>)
                }
            </Row>
            <Row>
                {
                    thirdHeader.map(({title} : any) => <Column headerStyle={{width: "10rem"}} key={title} header={title}/>) 
                }
            </Row>
        </ColumnGroup>
    }

    const suscepbility = [
        {
            id: "svi0",
            svi: 0,
            e: 0,
            D1: 0,
            C1: 0,
            B1: 0,
            A1: 0,
            D2: 0,
            C2: 0,
            B2: 0,
            A2: 0,
            D3: 0,
            C3: 0,
            B3: 0,
            A3: 0,
            D4: 0,
            C4: 0,
            B4: 0,
            A4: 0,
            D5: 0,
            C5: 0,
            B5: 0,
            A5: 0,
            D6: 0,
            C6: 0,
            B6: 0,
            A6: 0,
        },
        {
            id: "svi1",
            svi: 1,
            e: 1,
            D1: 1,
            C1: 1,
            B1: 1,
            A1: 1,
            D2: 1,
            C2: 1,
            B2: 1,
            A2: 1,
            D3: 1,
            C3: 1,
            B3: 1,
            A3: 1,
            D4: 1,
            C4: 1,
            B4: 1,
            A4: 1,
            D5: 1,
            C5: 1,
            B5: 1,
            A5: 1,
            D6: 1,
            C6: 1,
            B6: 1,
            A6: 1,
        },
        {
            id: "svi10",
            svi: 10,
            e: 10,
            D1: 8,
            C1: 3,
            B1: 1,
            A1: 1,
            D2: 6,
            C2: 2,
            B2: 1,
            A2: 1,
            D3: 4,
            C3: 1,
            B3: 1,
            A3: 1,
            D4: 2,
            C4: 1,
            B4: 1,
            A4: 1,
            D5: 1,
            C5: 1,
            B5: 1,
            A5: 1,
            D6: 1,
            C6: 1,
            B6: 1,
            A6: 1,
        },
        {
            id: "svi100",
            svi: 100,
            e: 100,
            D1: 80,
            C1: 33,
            B1: 10,
            A1: 5,
            D2: 60,
            C2: 20,
            B2: 4,
            A2: 1,
            D3: 40,
            C3: 10,
            B3: 2,
            A3: 1,
            D4: 20,
            C4: 5,
            B4: 1,
            A4: 1,
            D5: 10,
            C5: 2,
            B5: 1,
            A5: 1,
            D6: 5,
            C6: 1,
            B6: 1,
            A6: 1,
        },
        {
            id: "svi500",
            svi: 500,
            e: 500,
            D1: 400,
            C1: 170,
            B1: 50,
            A1: 25,
            D2: 300,
            C2: 100,
            B2: 20,
            A2: 5,
            D3: 200,
            C3: 50,
            B3: 8,
            A3: 1,
            D4: 100,
            C4: 25,
            B4: 2,
            A4: 1,
            D5: 50,
            C5: 10,
            B5: 1,
            A5: 1,
            D6: 25,
            C6: 5,
            B6: 1,
            A6: 1,
        },
        {
            id: "svi1000",
            svi: 1000,
            e: 1000,
            D1:800 ,
            C1: 330,
            B1: 100,
            A1: 50,
            D2: 600,
            C2: 200,
            B2: 40,
            A2: 10,
            D3: 400,
            C3: 100,
            B3: 16,
            A3: 2,
            D4: 200,
            C4: 50,
            B4: 5,
            A4: 1,
            D5: 100,
            C5: 25,
            B5: 5,
            A5: 1,
            D6: 50,
            C6: 10,
            B6: 1,
            A6: 1,
        },
        {
            id: "svi5000",
            svi: 5000,
            e: 5000,
            D1: 4000,
            C1: 1670,
            B1: 500,
            A1: 250,
            D2: 3000,
            C2: 1000,
            B2: 250,
            A2: 50,
            D3: 2000,
            C3: 500,
            B3: 80,
            A3: 10,
            D4: 1000,
            C4: 250,
            B4: 25,
            A4: 2,
            D5: 500,
            C5: 125,
            B5: 5,
            A5: 1,
            D6: 250,
            C6: 50,
            B6: 2,
            A6: 1,
        },
        {
            id: "svi001",
            svi: 0,
            e: 0,
            D1: 0,
            C1: 0,
            B1: 0,
            A1: 0,
            D2: 0,
            C2: 0,
            B2: 0,
            A2: 0,
            D3: 0,
            C3: 0,
            B3: 0,
            A3: 0,
            D4: 0,
            C4: 0,
            B4: 0,
            A4: 0,
            D5: 0,
            C5: 0,
            B5: 0,
            A5: 0,
            D6: 0,
            C6: 0,
            B6: 0,
            A6: 0,
        },
    ]

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
                    stripedRows 
                    showGridlines 
                    scrollable 
                    // scrollHeight="400px"
                    value={suscepbility.map((i: any, no: number) => ({...i, no: no + 1 + "."}))} 
                    headerColumnGroup={headerGroup()}
                >
                    <Column field="svi" frozen ></Column>
                    <Column field="e" ></Column>
                    {
                        thirdHeader.map(({attr}: any) => <Column field={attr} key={attr}></Column>)
                    }
                </DataTable>
                </div>
            </Dialog>
        </>
    )
}

export default InspectionEffectivenessTable;
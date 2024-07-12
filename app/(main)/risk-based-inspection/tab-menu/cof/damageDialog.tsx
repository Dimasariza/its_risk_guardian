import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";
import { Row } from "primereact/row";
import { useState } from "react";
import { damage } from "./flamableAndDamageTable";

function DamageDialog() {
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    
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

    const headerGroup = (
        <ColumnGroup>
            <Row>
                <Column header="" rowSpan={4} style={{ width: '3rem' }}/>
                <Column header="Fluid" rowSpan={4} style={{width: "10rem"}}/>
                <Column header="Continuous Releases Constants" colSpan={8}/>
                <Column header="Instantaneous Releases Constants" colSpan={8}/>
            </Row>
            <Row>
                <Column header="Auto-Ignition Not Likely (CAINL)"  colSpan={4}/>
                <Column header="Auto-Ignition Likely (CAIL)"  colSpan={4}/>
                <Column header="Auto-Ignition Not Likely (IAINL)"  colSpan={4}/>
                <Column header="Auto-Ignition Likely (IAIL)"  colSpan={4}/>
            </Row>
            <Row>
                <Column header="Gas" colSpan={2}/>
                <Column header="Liquid" colSpan={2}/>
                <Column header="Gas" colSpan={2}/>
                <Column header="Liquid" colSpan={2}/>
                <Column header="Gas" colSpan={2}/>
                <Column header="Liquid" colSpan={2}/>
                <Column header="Gas" colSpan={2}/>
                <Column header="Liquid" colSpan={2}/>
            </Row>
            <Row>
                <Column header="A" />
                <Column header="B" />
                <Column header="A" />
                <Column header="B" />
                <Column header="A" />
                <Column header="B" />
                <Column header="A" />
                <Column header="B" />
                <Column header="A" />
                <Column header="B" />
                <Column header="A" />
                <Column header="B" />
                <Column header="A" />
                <Column header="B" />
                <Column header="A" />
                <Column header="B" />
            </Row>
        </ColumnGroup>
    );

    const bodyTemplate = (rowData: any, column: string) => {
        return <div className={`${rowData.data[column] !== null ? "" : "bg-gray-300"}`} style={{width: "100%", height: "1rem"}}>
            { rowData.data[column] }
        </div>
    }

    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Component Damage Consequence</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Phase of Fluid" 
                visible={visible} 
                style={{ minWidth: '50vw' }} 
                onHide={() => {if (!visible) return; setVisible(false); }}
                footer={footerContent}
            >
                <DataTable value={damage} 
                selectionMode={"single"} 
                selection={selectedProduct} 
                headerColumnGroup={headerGroup}
                onSelectionChange={(e: any) => setSelectedProduct(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>

                    <Column field="fluid"></Column>
                    <Column field="data.CAINLGA" body={(e) => bodyTemplate(e, "CAINLGA")}></Column>
                    <Column field="data.CAINLGB" body={(e) => bodyTemplate(e, "CAINLGB")}></Column>
                    <Column field="data.CAINLLA" body={(e) => bodyTemplate(e, "CAINLLA")}></Column>
                    <Column field="data.CAINLLB" body={(e) => bodyTemplate(e, "CAINLLB")}></Column>
                    <Column field="data.CAILGA" body={(e) => bodyTemplate(e, "CAILGA")}></Column>
                    <Column field="data.CAILGB" body={(e) => bodyTemplate(e, "CAILGB")}></Column>
                    <Column field="data.CAILLA" body={(e) => bodyTemplate(e, "CAILLA")}></Column>
                    <Column field="data.CAILLB" body={(e) => bodyTemplate(e, "CAILLB")}></Column>
                    <Column field="data.IAINLGA" body={(e) => bodyTemplate(e, "IAINLGA")}></Column>
                    <Column field="data.IAINLGB" body={(e) => bodyTemplate(e, "IAINLGB")}></Column>
                    <Column field="data.IAINLLA" body={(e) => bodyTemplate(e, "IAINLLA")}></Column>
                    <Column field="data.IAINLLB" body={(e) => bodyTemplate(e, "IAINLLB")}></Column>
                    <Column field="data.IAILGA" body={(e) => bodyTemplate(e, "IAILGA")}></Column>
                    <Column field="data.IAILGB" body={(e) => bodyTemplate(e, "IAILGB")}></Column>
                    <Column field="data.IAILLA" body={(e) => bodyTemplate(e, "IAILLA")}></Column>
                    <Column field="data.IAILLB" body={(e) => bodyTemplate(e, "IAILLB")}></Column>

                </DataTable>
            </Dialog>
        </>
    )
}

export default DamageDialog;
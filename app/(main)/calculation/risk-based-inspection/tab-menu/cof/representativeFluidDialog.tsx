import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import representativeFluidNodes from "./representativeFluidTable";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { useState } from "react";
import { Button } from "primereact/button";

function RepresentativeFluidDialog() {
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const headerGroup = (
        <ColumnGroup>
            <Row>
                <Column header="" rowSpan={2} style={{ width: '3rem' }}/>
                <Column header="Fluid" rowSpan={2} style={{width: "10rem"}}/>
                <Column header="MW" rowSpan={2} />
                <Column header="Luquid Density (lb/ft³)" rowSpan={2} />
                <Column header="NBP (°C)" rowSpan={2} />
                <Column header="Ambient State" rowSpan={2} />
                <Column header="" colSpan={3} />
                <Column header="CP" colSpan={4} />
                <Column header="Fluid Type" rowSpan={2} />
                <Column header="Applicable Material" rowSpan={2} />
            </Row>
            <Row>
                <Column header="Ideal Gas Specific Heat Eq." />
                <Column header="Ideal Gas Constant A" />
                <Column header="Ideal Gas Constant B" />
                <Column header="Ideal Gas Constant C" />
                <Column header="Ideal Gas Constant D" />
                <Column header="Ideal Gas Constant E" />
                <Column header="AIT (°C)" />
            </Row>
        </ColumnGroup>
    );

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

    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Representative Fluid</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Representative Fluid Table" visible={visible} style={{ width: '90%' }} maximizable
                modal onHide={() => {if (!visible) return; setVisible(false); }} 
                footer={footerContent}
                >
                <div>
                <DataTable value={representativeFluidNodes} selectionMode={"single"} selection={selectedProduct} scrollable scrollHeight="700px" headerColumnGroup={headerGroup} tableStyle={{ minWidth: '50rem' }} onSelectionChange={(e: any) => setSelectedProduct(e.value)} dataKey="id">
                    <Column selectionMode="single"></Column>
                    <Column field="fluid" body={(e) => e.fluid ? <>{e.fluid}</> : <div className="">---</div>}></Column>
                    <Column field="mw" body={(e) => e.mw ? <>{e.mw}</> : <div className="">---</div>}></Column>
                    <Column field="liquid" body={(e) => e.liquid ? <>{e.liquid}</> : <div className="">---</div>}></Column>
                    <Column field="nbp" body={(e) => e.nbp ? <>{e.nbp}</> : <div className="">---</div>}></Column>
                    <Column field="ambient" body={(e) => e.ambient ? <>{e.ambient}</> : <div className="">---</div>}></Column>
                    <Column field="heat_eq" body={(e) => e.heat_eq ? <>{e.heat_eq}</> : <div className="">---</div>}></Column>
                    <Column field="constant_a" body={(e) => e.constant_a ? <>{e.constant_a}</> : <div className="">---</div>}></Column>
                    <Column field="constant_b" body={(e) => e.constant_b ? <>{e.constant_b}</> : <div className="">---</div>}></Column>
                    <Column field="constant_c" body={(e) => e.constant_c ? <>{e.constant_c}</> : <div className="">---</div>}></Column>
                    <Column field="constant_d" body={(e) => e.constant_d ? <>{e.constant_d}</> : <div className="">---</div>}></Column>
                    <Column field="constant_e" body={(e) => e.constant_e ? <>{e.constant_e}</> : <div className="">---</div>}></Column>
                    <Column field="ait" body={(e) => e.ait ? <>{e.ait}</> : <div className="">---</div>}></Column>
                    <Column field="fluid_type" body={(e) => e.fluid_type ? <>{e.fluid_type}</> : <div className="">---</div>}></Column>
                    <Column field="applicable_materials" body={(e) => e.applicable_materials ? <>{e.applicable_materials}</> : <div className="">---</div>}></Column>
                </DataTable>
                </div>
            </Dialog>
        </>
    );
}

export default RepresentativeFluidDialog;
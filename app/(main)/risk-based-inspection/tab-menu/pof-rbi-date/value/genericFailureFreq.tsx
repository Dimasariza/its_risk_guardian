import { gffTableValue } from "@/public/tableBasedOnAPI/gffTableValue";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Row } from "primereact/row";
import { useState } from "react";

function GenericFailureFrequency({failureFrequency, setFailureFrequency}: any) {
    const [visible, setVisible] = useState<boolean>(false);

    const headerGroup = (
        <ColumnGroup>
            <Row>
              <Column header="" rowSpan={2} />
              <Column header="Equipment Name" rowSpan={2} />
              <Column header="Component Type" rowSpan={2} />
              <Column header="GFF of Hole Size (Failure / Year)" colSpan={4} headerStyle={{ paddingLeft: "15%" }} />
              <Column header="GFF Total (Failure / Year)" rowSpan={2}/>
            </Row>
            <Row>
              <Column header="Small"/>
              <Column header="Medium"/>
              <Column header="Large"/>
              <Column header="Rupture"/>
            </Row>
        </ColumnGroup>
    );

    const final = (rowData: any) => {
        return <div>{rowData.sizeRupture}</div>
    }

    const footerContent = (
        <div>
          <Button label="Cancel" icon="pi pi-times" 
          onClick={() => {
            setVisible(false)
          }} 
          severity="danger" />
          <Button label="Save" icon="pi pi-check" 
          onClick={() => setVisible(false)} 
          severity="success" />
        </div>
    );

    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Generic Failure Frequency</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Representative Fluid Table" visible={visible} style={{ width: '90%' }} maximizable
                modal onHide={() => {if (!visible) return; setVisible(false); }} 
                footer={footerContent}
                >
                <div>
                    <DataTable 
                        resizableColumns={true} 
                        value={gffTableValue} 
                        headerColumnGroup={headerGroup} 
                        rowGroupMode="rowspan" 
                        groupRowsBy="equipment" 
                        sortMode="single"
                        selectionMode={"single"}
                        selection={failureFrequency} 
                        onSelectionChange={(e: any) => setFailureFrequency(e.value)} dataKey="id"
                    >
                        
                        <Column selectionMode="single"></Column>
                        <Column field="equipment"></Column>
                        <Column field="type"></Column>
                        <Column field="sizeSmall"></Column>
                        <Column field="sizeMedium"></Column>
                        <Column field="sizeLarge"></Column>
                        <Column field="sizeRupture" style={{ maxWidth: '10rem' }} body={final}></Column>
                        <Column field="total"></Column>
                    </DataTable>
                </div>
            </Dialog>
        </>
    )
}

export default GenericFailureFrequency;
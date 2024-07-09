import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Row } from "primereact/row";
import { useState } from "react";

function GenericFailureFrequency() {
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

    const liquidPhase = [
        {
            id: 'genericFailure1001',
            equipment: 'Compressor',
            type: 'COMPC',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0',
            total: '0.00003',
        },
        {
            id: 'genericFailure1002',
            equipment: 'Compressor',
            type: 'COMPR',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0.0000006',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1003',
            equipment: 'Heat Exchanger',
            type: 'HEXSS',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0.0000006',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1004',
            equipment: 'Heat Exchanger',
            type: 'HEXTS',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0.0000006',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1005',
            equipment: 'Pipe',
            type: 'PIPE-1',
            sizeSmall: '0.000028',
            sizeMedium: '0',
            sizeLarge: '0',
            sizeRupture: '0.0000026',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1006',
            equipment: 'Pipe',
            type: 'PIPE-2',
            sizeSmall: '0.000028',
            sizeMedium: '0',
            sizeLarge: '0',
            sizeRupture: '0.0000026',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1007',
            equipment: 'Pipe',
            type: 'PIPE-4',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0',
            sizeRupture: '0.0000026',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1008',
            equipment: 'Pipe',
            type: 'PIPE-6',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0',
            sizeRupture: '0.0000026',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1009',
            equipment: 'Pipe',
            type: 'PIPE-8',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0.0000006',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1009',
            equipment: 'Pipe',
            type: 'PIPE-10',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0.0000006',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1009',
            equipment: 'Pipe',
            type: 'PIPE-12',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0.0000006',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1009',
            equipment: 'Pipe',
            type: 'PIPE-16',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0.0000006',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1009',
            equipment: 'Pipe',
            type: 'PIPEGT-16',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0.0000006',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1010',
            equipment: 'Pump',
            type: 'PUMP2S',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0.0000006',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1011',
            equipment: 'Pump',
            type: 'PUMPR',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0.0000006',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1012',
            equipment: 'Pump',
            type: 'PUMP1S',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0.0000006',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1013',
            equipment: 'Tank 650',
            type: 'TANKBOTTOM',
            sizeSmall: '0.00072',
            sizeMedium: '0',
            sizeLarge: '0',
            sizeRupture: '0.000002',
            total: '0.00072',
        },
        {
            id: 'genericFailure1014',
            equipment: 'Tank 650',
            type: 'COURSE-1-10  ',
            sizeSmall: '0.00007',
            sizeMedium: '0.000025',
            sizeLarge: '0.00005',
            sizeRupture: '0.0000001',
            total: '0.0001',
        },
        {
            id: 'genericFailure1015',
            equipment: 'Vessel / FinFan',
            type: 'KODRUM  ',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0.0000006',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1016',
            equipment: 'Vessel / FinFan',
            type: 'COLBTM',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0.0000006',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1017',
            equipment: 'Vessel / FinFan',
            type: 'FINFAN',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0.0000006',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1018',
            equipment: 'Vessel / FinFan',
            type: 'FILTER',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0.0000006',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1019',
            equipment: 'Vessel / FinFan',
            type: 'DRUM',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0.0000006',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1020',
            equipment: 'Vessel / FinFan',
            type: 'REACTOR',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0.0000006',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1021',
            equipment: 'Vessel / FinFan',
            type: 'COLTOP',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0.0000006',
            total: '0.0000306',
        },
        {
            id: 'genericFailure1022',
            equipment: 'Vessel / FinFan',
            type: 'COLMID',
            sizeSmall: '0.000008',
            sizeMedium: '0.00002',
            sizeLarge: '0.000002',
            sizeRupture: '0.0000006',
            total: '0.0000306',
        },
    ];

    const final = (rowData: any) => {
        return <div>{rowData.sizeRupture}</div>
    }

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
                        value={liquidPhase} 
                        headerColumnGroup={headerGroup} 
                        rowGroupMode="rowspan" 
                        groupRowsBy="equipment" 
                        sortMode="single"
                        selectionMode={"single"}
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
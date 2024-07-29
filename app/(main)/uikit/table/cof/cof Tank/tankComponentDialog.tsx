import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Row } from "primereact/row";
import { useState } from "react";
import { useSelector } from "react-redux";

function TankComponentDialog({value, options}: any) {
    const [visible, setVisible] = useState<boolean>(false);
    const { edit } = useSelector((state: any) => state.EditReducer);
    value = [
        {
            ...value[0],
            component: "Course 1",
            type: "COURSE-1"
        },
        {
            ...value[1],
            component: "Course 2",
            type: "COURSE-2"
        },
        {
            ...value[2],
            component: "Course 3",
            type: "COURSE-3"
        },
        {
            ...value[3],
            component: "Course 4",
            type: "COURSE-4"
        },
    ]
    
    const footerContent = (
        <div>
          <Button label="Cancel" icon="pi pi-times" 
          onClick={() => setVisible(false)} 
          severity="danger" />
        </div>
    );

    const headerGroup = (
        <ColumnGroup>
            <Row>
                <Column header="Component" rowSpan={2}/>
                <Column header="Api Component Type" rowSpan={2}/>
                <Column header={options.tableTitle} colSpan={4}/>
            </Row>
            <Row>
                <Column header="Small"/>
                <Column header="Medium"/>
                <Column header="Large"/>
                <Column header="Rupture"/>
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
            <div className="flex align-items-center justify-content-between" style={{width: "25rem"}}>
                <Button icon="pi pi-table" size="small" severity="info" className="mx-3" disabled={edit} onClick={() => setVisible(true)} />
            </div>
            <Dialog header="" 
                visible={visible} 
                style={{ width: '70%' }}
                onHide={() => {if (!visible) return; setVisible(false); }}
                footer={footerContent}
            >
                <DataTable value={value} 
                headerColumnGroup={headerGroup}
                dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                    <Column field="component"></Column>
                    <Column field="type"></Column>
                    <Column field="small"></Column>
                    <Column field="medium"></Column>
                    <Column field="large"></Column>
                    <Column field="rupture"></Column>
                </DataTable>    
            </Dialog>
        </>
    )
}

export default TankComponentDialog;
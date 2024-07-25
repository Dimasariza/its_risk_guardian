import { convertDateToString } from "@/function/common";
import { updatePOFPRDPlan } from "@/service/calculation/pofPRDService";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Row } from "primereact/row";
import { useState } from "react";
import { useSelector } from "react-redux";

export const confidenceFactors = [
    {
        id: "factor001",
        result: "Pass",
        ineffective: 0,
        fairly: 0.5,
        usually: 0.7,
        highly: 0.9,
    },
    {
        id: "factor002",
        result: "Fail",
        ineffective: 0,
        fairly: 0.7,
        usually: 0.95,
        highly: 0.95,
    },
    {
        id: "factor003",
        result: "No Leak",
        ineffective: 0,
        fairly: 0.5,
        usually: 0.7,
        highly: 0.9,
    },
    {
        id: "factor004",
        result: "Leak",
        ineffective: 0,
        fairly: 0.7,
        usually: 0.95,
        highly: 0.95,
    },
]

function InspectionConfidenceFactor({value, setValue, setOnSubmit}: any) {
    const [visible, setVisible] = useState<boolean>(false);
    const { edit } = useSelector((state: any) => state.EditReducer);

    const footerContent = (
        <div>
          <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible(false)} severity="danger" />
          <Button label="Save" icon="pi pi-check" onClick={() => {
                setOnSubmit((prev: boolean) => !prev)
                setVisible(false)
          }} severity="success" />
        </div>
    );

    const headerGroup = (
        <ColumnGroup>
            <Row>
              <Column header="" rowSpan={2} />
              <Column header="Inspection Result" rowSpan={2} />
              <Column header="Confidence Factor That Inspection Result Determines the True Damage State, CF" colSpan={4} />
            </Row>
            <Row>
              <Column header="Ineffective"/>
              <Column header="Fairly Effective"/>
              <Column header="Usually Effective"/>
              <Column header="Highly Effective"/>
            </Row>
        </ColumnGroup>
    );
    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Inspection Confidence Factor</label>
                <Button label="Show Table" size="small" className="mx-3" disabled={edit} onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Inspection Confidence Factor" visible={visible} style={{ width: '80%' }} maximizable
                modal onHide={() => {if (!visible) return; setVisible(false); }}  
                footer={footerContent}
                >
                <div>
                <DataTable 
                    value={confidenceFactors} 
                    selection={value.confidence}
                    scrollable 
                    tableStyle={{ minWidth:  '50rem' }} 
                    headerColumnGroup={headerGroup}
                    selectionMode={"single"} 
                    sortMode="single"
                    onSelectionChange={(e: any) => {
                        setValue((prev: any) => ({
                            ...prev, 
                            confidence: e?.value,
                            plan_confidenceFactor: e?.value?.id
                        }))
                    }}
                >
                    <Column selectionMode="single"></Column>
                    <Column field="result"></Column>
                    <Column field="ineffective" body={ () => "No Credit" }></Column>
                    <Column field="fairly"></Column>
                    <Column field="usually"></Column>
                    <Column field="highly"></Column>
                </DataTable>
                </div>
            </Dialog>
        </>
    )
}

export default InspectionConfidenceFactor;
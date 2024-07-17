import { CofService } from "@/service/calculation/cofService";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useState } from "react";

export const detection = [
    {
        id: 'detection1001',
        type: 'Instrumentation designed specifically to detect material losses by changes in operating conditions (i.e. loss of pressure or flow) in the system',
        classification: 'A',
    },
    {
        id: 'detection1002',
        type: 'Suitably located detectors to determine when the material is present outside the pressure-containing envelope',
        classification: 'B',
    },
    {
        id: 'detection1003',
        type: 'Visual detection, cameras, or detectors with marginal coverage',
        classification: 'C',
    },
    {
        id: 'detection1004',
        type: 'Liquid',
        classification: 'Liquid',
    },
]

export const isolation = [
    {
        id: 'isolation1001',
        type: 'Isolation or shutdown systems activated directly from process instrumentation or detectors, with no oprator intervention',
        classification: 'A',
    },
    {
        id: 'isolation1002',
        type: 'Isolation or shutdown systems activated by operators in the control room or other suitable location remote from the leak',
        classification: 'B',
    },
    {
        id: 'isolation1003',
        type: 'Isolation dependent on manually operated valves',
        classification: 'C',
    },
]

function DetectionAndIsolation({value, setValue, toast, handleSubmitDialog = () => {}}: any) {
    const [visible, setVisible] = useState<boolean>(false);

    const footerContent = (
        <div>
          <Button label="Cancel" icon="pi pi-check" 
          onClick={() => setVisible(false)} 
          severity="danger" />
          <Button label="Save" icon="pi pi-times" 
          onClick={() => {
            setVisible(false)
            handleSubmitDialog()
            CofService.editData({...value, 
                cof_detectionSystem: value?.impact?.cof_detectionSystem.id, 
                cof_isolationSystem: value?.impact?.cof_isolationSystem.id
            })
            .then(res => {
                toast.current.show({
                    severity: 'success',
                    summary: 'Data Updated',
                    detail: `You update General Data`
                });
            })
            .catch((e: any) => {
                toast.current.show({
                  severity: 'error',
                  summary: 'Data Failed to Updated',
                  detail: `Damage mechanism not updated`
                });
            })
          }} 
          severity="success" />
        </div>
    );
    
    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Detection and Isolation System</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Detection and Isolation system" 
                visible={visible} 
                footer={footerContent}
                style={{ width: '50vw' }} 
                onHide={() => {if (!visible) return; setVisible(false); }}
            >
                <DataTable value={detection} selectionMode={"single"} selection={value?.impact?.cof_detectionSystem} 
                onSelectionChange={(e: any) => setValue((prev: any) => ({
                        ...prev, 
                        impact: {
                            ...value.impact,
                            cof_detectionSystem: e.value
                        }
                    })
                )} 
                dataKey="id" 
                tableStyle={{ minWidth: '50rem' }}>
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="type" header="Type of Detection System"></Column>
                    <Column field="classification" header="Detection Classification"></Column>
                </DataTable>

                <DataTable value={isolation} selectionMode={"single"} selection={value?.impact?.cof_isolationSystem} 
                onSelectionChange={(e: any) => setValue((prev: any) => ({
                        ...prev, 
                        impact: {
                            ...value.impact,
                            cof_isolationSystem: e.value
                        }
                    })
                )} 
                dataKey="id" 
                tableStyle={{ minWidth: '50rem' }}>
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="type" header="Type of Isolation System"></Column>
                    <Column field="classification" header="Isolation     Classification"></Column>
                </DataTable>
            </Dialog>
        </>
    )
}

export default DetectionAndIsolation;
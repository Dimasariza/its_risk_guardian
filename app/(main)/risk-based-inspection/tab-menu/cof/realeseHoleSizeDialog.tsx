import { CofService } from "@/service/calculation/cofService";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export const holeSizes = [
    {
        id: 'holeSize001',
        size: 'Small',
        range: '0 - 1/4',
        release: 'd1 = 0.25',
        holeSizeValue: "cof_releaseHoleSizeD1"
    },
    {
        id: 'holeSize002',
        size: 'Medium',
        range: '>1/4 - 2',
        release: 'd2 = 1',
        holeSizeValue: "cof_releaseHoleSizeD2"
    },
    {
        id: 'holeSize003',
        size: 'Large',
        range: '2 - 6',
        release: 'd3 = 4',
        holeSizeValue: "cof_releaseHoleSizeD3"
    },
    {
        id: 'holeSize004',
        size: 'Rupture',
        range: '6',
        release: 'd4 = min[D, 16]',
        holeSizeValue: "cof_releaseHoleSizeD4"
    },
]


function ReleaseHoleSize({value, setValue, toast, handleSubmitDialog = () => {}}: any) {
    const [visible, setVisible] = useState<boolean>(false)
    const [editRelease, setEditRelease] = useState(false)
    
    const footerContent = (
        <div className="flex justify-content-between">
          <Button label="" text onClick={() => {if(!editRelease) setEditRelease(true); else setEditRelease(false)}}  severity="danger" />
            <div>
                <Button label="Cancel" icon="pi pi-times" 
                onClick={() => {
                    setVisible(false)
                    setEditRelease(false)
                }} 
                severity="danger" />
                <Button label="Save" icon="pi pi-check" 
                onClick={() => {
                    setEditRelease(false)
                    setVisible(false)
                    handleSubmitDialog()
                    CofService.editData(value)
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
        </div>
    );

    const releaseBodyTemplate = (rowData: any) => {
        if(!editRelease) {
            return rowData.release
        }
        return <InputText value={value[rowData.holeSizeValue]} onChange={(e) => { 
            setValue((prev: any) => ({...prev, [rowData.holeSizeValue]: e.target.value}))
        }} />
    }

    return (
        <>
        
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Release Hole Size</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible((prev: any) => ({...prev, phase: true}))} />
            </div>
            <Dialog header="Release Hole Size" 
                visible={visible} 
                style={{ width: '50vw' }} 
                onHide={() => {if (!visible) return; setVisible(false); }}
                footer={footerContent}
            >
                <DataTable 
                value={holeSizes.map((i: any, id: number) => ({...i, no: id + 1}))} 
                tableStyle={{ minWidth: '50rem' }}>
                    <Column field="no" header="Release Hole Number"></Column>
                    <Column field="size" header="Release Hole Size"></Column>
                    <Column field="range" header="Range of Hole Diameter (mm)"></Column>
                    <Column field="release" body={releaseBodyTemplate} header="Release Hole Diameter, dn (mm)"></Column>
                </DataTable>
            </Dialog>
        </>
    )
}

export default ReleaseHoleSize;
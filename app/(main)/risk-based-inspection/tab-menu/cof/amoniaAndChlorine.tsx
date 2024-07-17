import { CofService } from "@/service/calculation/cofService";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable, DataTableCellClickEvent } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";
import { Row } from "primereact/row";
import { useState } from "react";

function AmoniaChlorineDialog({value, setValue, toast, handleSubmitDialog = () => {}}: any) {
    const [visible, setVisible] = useState<boolean>(false)

    const headerGroup = (
        <ColumnGroup>
            <Row>
                <Column header="Continous Release Duration (minutes)" rowSpan={2} style={{width: "10rem"}}/>
                <Column header="Amonia" colSpan={2} />
                <Column header="Chlorine" colSpan={2} />
            </Row>
            <Row>
                <Column header="e" />
                <Column header="f" />
                <Column header="e" />
                <Column header="f" />
            </Row>
        </ColumnGroup>
    );

    const footerContent = (
        <div>
          <Button label="Cancel" icon="pi pi-check" 
          onClick={() => setVisible(false)} 
          severity="danger" />
          <Button label="Save" icon="pi pi-times" 
          onClick={() => {
            if(!value?.amoniaChloride) {
                return toast.current.show({
                    severity: 'error',
                    summary: 'No Item Selected',
                    detail: `Please select amoniaChloride item`
                });
            }
            setVisible(false)
            handleSubmitDialog()
            CofService.editData({...value, cof_adjToFlamable: value?.amoniaChloride.id})
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

    const handleSelectCell = (cell: DataTableCellClickEvent<any>) => {
        console.log(value)
        return ""
    }   

    return (
        <>
        
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Amonia And Chlorine</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Amonia And Chlorine" 
                visible={visible} 
                style={{ width: '90%' }}
                onHide={() => {if (!visible) return; setVisible(false); }}
                footer={footerContent}
            >
                <DataTable value={amoniaAndChlorine} 
                cellSelection onCellSelect={handleSelectCell}
                selectionMode={"multiple"} 
                selection={value?.amoniaChloride} 
                onSelectionChange={(e: any) => setValue((prev: any) => ({...prev, amoniaChloride: e.value}))} 
                headerColumnGroup={headerGroup}
                dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                    {/* <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column> */}
                    <Column field="duration" ></Column>
                    <Column field="amoniaE" ></Column>
                    <Column field="amoniaF" ></Column>
                    <Column field="chlorineE" ></Column>
                    <Column field="chlorineF" ></Column>
                </DataTable>
            </Dialog>
        </>
    )
}

export default AmoniaChlorineDialog;

export const amoniaAndChlorine = [
    {
        id: 'amoniaChlorin1001',
        duration: 5,
        amoniaE: 2690,
        amoniaF: 1.183,
        chlorineE: 15150,
        chlorineF: 1.097,
    },
    {
        id: 'amoniaChlorin1002',
        duration: 10,
        amoniaE: 3581,
        amoniaF: 1.181,
        chlorineE: 15934,
        chlorineF: 1.095,
    },
    {
        id: 'amoniaChlorin1003',
        duration: 15,
        amoniaE: 4459,
        amoniaF: 1.18,
        chlorineE: 17242,
        chlorineF: 1.092,
    },
    {
        id: 'amoniaChlorin1004',
        duration: 20,
        amoniaE: 5326,
        amoniaF: 1.178,
        chlorineE: 19074,
        chlorineF: 1.089,
    },
    {
        id: 'amoniaChlorin1005',
        duration: 25,
        amoniaE: 6180,
        amoniaF: 1.176,
        chlorineE: 21430,
        chlorineF: 1.085,
    },
]

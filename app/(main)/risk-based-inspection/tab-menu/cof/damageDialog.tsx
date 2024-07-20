import { CofService } from "@/service/calculation/cofService";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";
import { Row } from "primereact/row";
import { useState } from "react";

function DamageDialog({value, setValue, toast, handleSubmitDialog = () => {}}: any) {
    const [visible, setVisible] = useState<boolean>(false);
    
    const footerContent = (
        <div>
          <Button label="Cancel" icon="pi pi-times" 
          onClick={() => setVisible(false)} 
          severity="danger" />
          <Button label="Save" icon="pi pi-check" 
          onClick={() => {
            if(!value?.damage) {
                return toast.current.show({
                    severity: 'error',
                    summary: 'No Item Selected',
                    detail: `Please select damage item`
                });
            }
            setVisible(false)
            handleSubmitDialog()
            CofService.editData({...value, cof_damageCons: value?.damage.id})
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
                style={{ width: '90%' }}
                onHide={() => {if (!visible) return; setVisible(false); }}
                footer={footerContent}
            >
                <DataTable value={damageTable} 
                selectionMode={"single"} 
                selection={value?.damage} 
                headerColumnGroup={headerGroup}
                onSelectionChange={(e: any) => setValue((prev: any) => ({...prev, damage: e.value}))} 
                dataKey="id" tableStyle={{ minWidth: '50rem' }}>
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


const damageTable = [
    {
        id: "damage001",
        fluid: "C1-C2",
        data: {
            CAINLGA: 8.669,
            CAINLGB: 0.98,
            CAINLLA: null,
            CAINLLB: null,
            CAILGA: 55.13,
            CAILGB: 0.95,
            CAILLA: null,
            CAILLB: null,
            IAINLGA: 6.469,
            IAINLGB: 0.67,
            IAINLLA: null,
            IAINLLB: null,
            IAILGA: 163.7,
            IAILGB: 0.62,
            IAILLA: null,
            IAILLB: null,
        }
    },
    {
        id: "damage002",
        fluid: "C3-C4",
        data: {
            CAINLGA: 10.13,
            CAINLGB: 1,
            CAINLLA: null,
            CAINLLB: null,
            CAILGA: 64.23,
            CAILGB: 1,
            CAILLA: null,
            CAILLB: null,
            IAINLGA: 4.59,
            IAINLGB: 0.72,
            IAINLLA: null,
            IAINLLB: null,
            IAILGA: 79.94,
            IAILGB: 0.62,
            IAILLA: null,
            IAILLB: null,
        }
    },
    {
        id: "damage003",
        fluid: "C5",
        data: {
            CAINLGA: 5.115,
            CAINLGB: 0.99,
            CAINLLA: 100.6,
            CAINLLB: 0.89,
            CAILGA: 62.41,
            CAILGB: 1,
            CAILLA: null,
            CAILLB: null,
            IAINLGA: 2.214,
            IAINLGB: 0.73,
            IAINLLA: null,
            IAINLLB: null,
            IAILGA: 41.38,
            IAILGB: 0.61,
            IAILLA: null,
            IAILLB: null,
        }
    },
    {
        id: "damage004",
        fluid: "C6-C8",
        data: {
            CAINLGA: 5.849,
            CAINLGB: 0.98,
            CAINLLA: 34.17,
            CAINLLB: 0.89,
            CAILGA: 63.98,
            CAILGB: 1,
            CAILLA: 103.4,
            CAILLB: 0.95,
            IAINLGA: 2.188,
            IAINLGB: 0.66,
            IAINLLA: 0.794,
            IAINLLB: 0.78,
            IAILGA: 41.49,
            IAILGB: 0.61,
            IAILLA: 8.18,
            IAILLB: 0.55,
        }
    },
    {
        id: "damage005",
        fluid: "C9-C12",
        data: {
            CAINLGA: 2.419,
            CAINLGB: 0.98,
            CAINLLA: 24.6,
            CAINLLB: 90,
            CAILGA: 76.98,
            CAILGB: 0.95,
            CAILLA: 110.3,
            CAILLB: 0.95,
            IAINLGA: 1.111,
            IAINLGB: 0.66,
            IAINLLA: 0.559,
            IAINLLB: 0.76,
            IAILGA: 42.28,
            IAILGB: 0.61,
            IAILLA: 0.848,
            IAILLB: 0.53,
        }
    }, 
    {
        id: "damage006",
        fluid: "C13-C16",
        data: {
            CAINLGA: null,
            CAINLGB: null,
            CAINLLA: 12.11,
            CAINLLB: 0.9,
            CAILGA: null,
            CAILGB: null,
            CAILLA: 196.7,
            CAILLB: 0.92,
            IAINLGA: null,
            IAINLGB: null,
            IAINLLA: 0.086,
            IAINLLB: 0.88,
            IAILGA: null,
            IAILGB: null,
            IAILLA: 1.714,
            IAILLB: 0.88,
        }
    },
    {
        id: "damage007",
        fluid: "C17-C25",
        data: {
            CAINLGA: null,
            CAINLGB: null,
            CAINLLA: 3.785,
            CAINLLB: 0.9,
            CAILGA: null,
            CAILGB: null,
            CAILLA: 165.5,
            CAILLB: 0.92,
            IAINLGA: null,
            IAINLGB: null,
            IAINLLA: 0.021,
            IAINLLB: 0.006,
            IAILGA: null,
            IAILGB: null,
            IAILLA: 1.068,
            IAILLB: 0.91,
        }
    },
    {
        id: "damage008",
        fluid: "C25+",
        data: {
            CAINLGA: null,
            CAINLGB: null,
            CAINLLA: 2.098,
            CAINLLB: 0.91,
            CAILGA: null,
            CAILGB: null,
            CAILLA: 103,
            CAILLB: 0.9,
            IAINLGA: null,
            IAINLGB: null,
            IAINLLA: 0.006,
            IAINLLB: 0.99,
            IAILGA: null,
            IAILGB: null,
            IAILLA: 0.284,
            IAILLB: 0.99,
        }
    },
    {
        id: "damage009",
        fluid: "H2",
        data: {
            CAINLGA: 13.13,
            CAINLGB: 0.992,
            CAINLLA: null,
            CAINLLB: null,
            CAILGA: 86.02,
            CAILGB: 1,
            CAILLA: null,
            CAILLB: null,
            IAINLGA: 9.605,
            IAINLGB: 0.657,
            IAINLLA: null,
            IAINLLB: null,
            IAILGA: 216.5,
            IAILGB: 0.618,
            IAILLA: null,
            IAILLB: null,
        }
    },
    {
        id: "damage010",
        fluid: "H2S",
        data: {
            CAINLGA: 6.554,
            CAINLGB: 1,
            CAINLLA: null,
            CAINLLB: null,
            CAILGA: 38.11,
            CAILGB: 0.89,
            CAILLA: null,
            CAILLB: null,
            IAINLGA: 22.63,
            IAINLGB: 0.63,
            IAINLLA: null,
            IAINLLB: null,
            IAILGA: 53.72,
            IAILGB: 0.61,
            IAILLA: null,
            IAILLB: null,
        }
    },
    {
        id: "damage011",
        fluid: "HF",
        data: {
            CAINLGA: null,
            CAINLGB: null,
            CAINLLA: null,
            CAINLLB: null,
            CAILGA: null,
            CAILGB: null,
            CAILLA: null,
            CAILLB: null,
            IAINLGA: null,
            IAINLGB: null,
            IAINLLA: null,
            IAINLLB: null,
            IAILGA: null,
            IAILGB: null,
            IAILLA: null,
            IAILLB: null,
        }
    },
    {
        id: "damage012",
        fluid: "Acromatics",
        data: {
            CAINLGA: 3.952,
            CAINLGB: 1.097,
            CAINLLA: 21.1,
            CAINLLB: 1,
            CAILGA: 80.11,
            CAILGB: 1.055,
            CAILLA: null,
            CAILLB: null,
            IAINLGA: 18.04,
            IAINLGB: 0.667,
            IAINLLA: 14.36,
            IAINLLB: 1,
            IAILGA: 83.68,
            IAILGB: 0.713,
            IAILLA: 143.6,
            IAILLB: 1,
        }
    },
    {
        id: "damage013",
        fluid: "Styrene / Aromatic",
        data: {
            CAINLGA: 3.952,
            CAINLGB: 1.097,
            CAINLLA: 21.1,
            CAINLLB: 1,
            CAILGA: 80.11,
            CAILGB: 1.055,
            CAILLA: null,
            CAILLB: null,
            IAINLGA: 1.804,
            IAINLGB: 0.667,
            IAINLLA: 14.36,
            IAINLLB: 1,
            IAILGA: 83.68,
            IAILGB: 0.713,
            IAILLA: 143.6,
            IAILLB: 1,
        }
    },
    {
        id: "damage014",
        fluid: "CO",
        data: {
            CAINLGA: 0.04,
            CAINLGB: 1.752,
            CAINLLA: null,
            CAINLLB: null,
            CAILGA: null,
            CAILGB: null,
            CAILLA: null,
            CAILLB: null,
            IAINLGA: 10.97,
            IAINLGB: 0.667,
            IAINLLA: null,
            IAINLLB: null,
            IAILGA: null,
            IAILGB: null,
            IAILLA: null,
            IAILLB: null,
        }
    },
    {
        id: "damage015",
        fluid: "DEE",
        data: {
            CAINLGA: 9.072,
            CAINLGB: 1.134,
            CAINLLA: 164.2,
            CAINLLB: 1.106,
            CAILGA: 67.42,
            CAILGB: 1.033,
            CAILLA: 976,
            CAILLB: 0.649,
            IAINLGA: 24.51,
            IAINLGB: 0.667,
            IAINLLA: 0.981,
            IAINLLB: 0.919,
            IAILGA: null,
            IAILGB: null,
            IAILLA: 1.09,
            IAILLB: 0.919,
        }
    },
    {
        id: "damage016",
        fluid: "Methanol",
        data: {
            CAINLGA: 0.005,
            CAINLGB: 0.909,
            CAINLLA: 340.4,
            CAINLLB: 0.934,
            CAILGA: null,
            CAILGB: null,
            CAILLA: null,
            CAILLB: null,
            IAINLGA: 4.425,
            IAINLGB: 0.667,
            IAINLLA: 0.363,
            IAINLLB: 0.9,
            IAILGA: null,
            IAILGB: null,
            IAILLA: null,
            IAILLB: null,
        }
    },
    {
        id: "damage017",
        fluid: "EO",
        data: {
            CAINLGA: 6.712,
            CAINLGB: 1.069,
            CAINLLA: null,
            CAINLLB: null,
            CAILGA: null,
            CAILGB: null,
            CAILLA: null,
            CAILLB: null,
            IAINLGA: 21.46,
            IAINLGB: 0.667,
            IAINLLA: null,
            IAINLLB: null,
            IAILGA: null,
            IAILGB: null,
            IAILLA: null,
            IAILLB: null,
        }
    },
    {
        id: "damage018",
        fluid: "Pyroporic",
        data: {
            CAINLGA: 2.419,
            CAINLGB: 0.98,
            CAINLLA: 24.6,
            CAINLLB: 0.9,
            CAILGA: 76.98,
            CAILGB: 0.95,
            CAILLA: 110.3,
            CAILLB: 0.95,
            IAINLGA: 1.111,
            IAINLGB: 0.66,
            IAINLLA: 0.559,
            IAINLLB: 0.76,
            IAILGA: 42.28,
            IAILGB: 0.61,
            IAILLA: 0.848,
            IAILLB: 0.53,
        }
    }
]

export { damageTable }
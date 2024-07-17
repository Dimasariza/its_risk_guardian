import { CofService } from "@/service/calculation/cofService";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Row } from "primereact/row";
import { useState } from "react";

function FlamableDialog({value, setValue, toast, handleSubmitDialog = () => {}}: any) {
    const [visible, setVisible] = useState<boolean>(false);

    const footerContent = (
        <div>
          <Button label="Cancel" icon="pi pi-check" 
          onClick={() => setVisible(false)} 
          severity="danger" />
          <Button label="Save" icon="pi pi-times" 
          onClick={() => {
            if(!value?.flamable) {
                return toast.current.show({
                    severity: 'error',
                    summary: 'No Item Selected',
                    detail: `Please select flamable item`
                });
            }
            setVisible(false)
            handleSubmitDialog()
            CofService.editData({...value, cof_flamableCons: value.flamable.id})
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
                <label htmlFor="">Component Flammable Consequence</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Component Flammable Consequence" 
                visible={visible} 
                style={{ width: '90%' }}
                onHide={() => {if (!visible) return; setVisible(false); }}
                footer={footerContent}
            >
                <DataTable value={flamableTable} 
                selectionMode={"single"} 
                selection={value.flamable} 
                headerColumnGroup={headerGroup} 
                onSelectionChange={(e: any) => setValue((prev: any) => ({
                        ...prev,
                        flamable: e.value
                    }))} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
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

export default FlamableDialog;

const flamableTable = [
    {
        id: "flamable001",
        fluid: "C1-C2",
        data: {
            CAINLGA: 21.83,
            CAINLGB: 0.96,
            CAINLLA: null,
            CAINLLB: null,
            CAILGA: 143.2,
            CAILGB: 0.92,
            CAILLA: null,
            CAILLB: null,
            IAINLGA: 12.46,
            IAINLGB: 0.67,
            IAINLLA: null,
            IAINLLB: null,
            IAILGA: 473.9,
            IAILGB: 0.63,
            IAILLA: null,
            IAILLB: null,
        }
    },
    {
        id: "flamable002",
        fluid: "C3-C4",
        data: {
            CAINLGA: 25.64,
            CAINLGB: 1,
            CAINLLA: null,
            CAINLLB: null,
            CAILGA: 171.4,
            CAILGB: 1,
            CAILLA: null,
            CAILLB: null,
            IAINLGA: 9.702,
            IAINLGB: 0.75,
            IAINLLA: null,
            IAINLLB: null,
            IAILGA: 270.4,
            IAILGB: 0.63,
            IAILLA: null,
            IAILLB: null,
        }
    },
    {
        id: "flamable003",
        fluid: "C5",
        data: {
            CAINLGA: 12.71,
            CAINLGB: 1,
            CAINLLA: 290.1,
            CAINLLB: 0.89,
            CAILGA: 166.1,
            CAILGB: 1,
            CAILLA: null,
            CAILLB: null,
            IAINLGA: 4.82,
            IAINLGB: 0.76,
            IAINLLA: 0.79,
            IAINLLB: 0.85,
            IAILGA: 146.7,
            IAILGB: 0.63,
            IAILLA: null,
            IAILLB: null,
        }
    },
    {
        id: "flamable004",
        fluid: "C6-C8",
        data: {
            CAINLGA: 13.49,
            CAINLGB: 0.96,
            CAINLLA: 96.88,
            CAINLLB: 0.89,
            CAILGA: 169.7,
            CAILGB: 1,
            CAILLA: 252.8,
            CAILLB: 0.92,
            IAINLGA: 4.216,
            IAINLGB: 0.67,
            IAINLLA: 2.168,
            IAINLLB: 0.78,
            IAILGA: 147.2,
            IAILGB: 0.63,
            IAILLA: 31.89,
            IAILLB: 0.54,
        }
    },
    {
        id: "flamable005",
        fluid: "C19-C12",
        data: {
            CAINLGA: 5.755,
            CAINLGB: 0.96,
            CAINLLA: 70.03,
            CAINLLB: 0.89,
            CAILGA: 188.6,
            CAILGB: 0.92,
            CAILLA: 269.4,
            CAILLB: 0.92,
            IAINLGA: 2.035,
            IAINLGB: 0.66,
            IAINLLA: 1.609,
            IAINLLB: 0.76,
            IAILGA: 151 ,
            IAILGB: 0.63,
            IAILLA: 2.847,
            IAILLB: 0.54,
        }
    },
    {
        id: "flamable006",
        fluid: "C13-C16",
        data: {
            CAINLGA: null,
            CAINLGB: null,
            CAINLLA: 34.36,
            CAINLLB: 0.89,
            CAILGA: null,
            CAILGB: null,
            CAILLA: 539.4,
            CAILLB: 0.9,
            IAINLGA: null,
            IAINLGB: null,
            IAINLLA: 0.242,
            IAINLLB: 0.88,
            IAILGA: null,
            IAILGB: null,
            IAILLA: 4.843,
            IAILLB: 0.88,
        }
    },
    {
        id: "flamable007",
        fluid: "C17-C25",
        data: {
            CAINLGA: null,
            CAINLGB: null,
            CAINLLA: 10.7,
            CAINLLB: 0.89,
            CAILGA: null,
            CAILGB: null,
            CAILLA: 458,
            CAILLB: 0.9,
            IAINLGA: null,
            IAINLGB: null,
            IAINLLA: 0.061,
            IAINLLB: 0.91,
            IAILGA: null,
            IAILGB: null,
            IAILLA: 3.052,
            IAILLB: 0.91,
        }
    },
    {
        id: "flamable008",
        fluid: "C25+",
        data: {
            CAINLGA: null,
            CAINLGB: null,
            CAINLLA: 6.196,
            CAINLLB: 0.89,
            CAILGA: null,
            CAILGB: null,
            CAILLA: 303.6,
            CAILLB: 0.9,
            IAINLGA: null,
            IAINLGB: null,
            IAINLLA: 0.016,
            IAINLLB: 0.99,
            IAILGA: null,
            IAILGB: null,
            IAILLA: 0.833,
            IAILLB: 0.99,
        }
    },
    {
        id: "flamable009",
        fluid: "H2",
        data: {
            CAINLGA: 32.05,
            CAINLGB: 0.933,
            CAINLLA: null,
            CAINLLB: null,
            CAILGA: 228.8,
            CAILGB: 1,
            CAILLA: null,
            CAILLB: null,
            IAINLGA: 18.43,
            IAINLGB: 0.652,
            IAINLLA: null,
            IAINLLB: null,
            IAILGA: 636.5,
            IAILGB: 0.621,
            IAILLA: null,
            IAILLB: null,
        }
    },
    {
        id: "flamable010",
        fluid: "H2S",
        data: {
            CAINLGA: 10.65,
            CAINLGB: 1,
            CAINLLA: null,
            CAINLLB: null,
            CAILGA: 73.25,
            CAILGB: 0.94,
            CAILLA: null,
            CAILLB: null,
            IAINLGA: 41.43,
            IAINLGB: 0.63,
            IAINLLA: null,
            IAINLLB: null,
            IAILGA: 191.5,
            IAILGB: 0.63,
            IAILLA: null,
            IAILLB: null,
        }
    },
    {
        id: "flamable011",
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
        id: "flamable012",
        fluid: "Aromatics",
        data: {
            CAINLGA: 12.76,
            CAINLGB: 0.963,
            CAINLLA: 66.01,
            CAINLLB: 0.883,
            CAILGA: 261.9,
            CAILGB: 0.937,
            CAILLA: 56,
            CAILLB: 0.268,
            IAINLGA: 2.889,
            IAINLGB: 0.686,
            IAINLLA: 0.027,
            IAINLLB: 0.935,
            IAILGA: 83.86,
            IAILGB: 0.713,
            IAILLA: 0.273,
            IAILLB: 0.935,
        }
    },
    {
        id: "flamable013",
        fluid: "Styrene",
        data: {
            CAINLGA: 12.76,
            CAINLGB: 0.963,
            CAINLLA: 66.01,
            CAINLLB: 0.883,
            CAILGA: 261.9,
            CAILGB: 0.937,
            CAILLA: 56,
            CAILLB: 0.268,
            IAINLGA: 2.889,
            IAINLGB: 0.686,
            IAINLLA: 0.027,
            IAINLLB: 0.935,
            IAILGA: 83.86,
            IAILGB: 0.713,
            IAILLA: 0.273,
            IAILLB: 0.935,
        }
    },
    {
        id: "flamable014",
        fluid: "CO",
        data: {
            CAINLGA: 5.491,
            CAINLGB: 0.991,
            CAINLLA: null,
            CAINLLB: null,
            CAILGA: null,
            CAILGB: null,
            CAILLA: null,
            CAILLB: null,
            IAINLGA: 16.91,
            IAINLGB: 0.692,
            IAINLLA: null,
            IAINLLB: null,
            IAILGA: null,
            IAILGB: null,
            IAILLA: null,
            IAILLB: null,
        }
    },
    {
        id: "flamable015",
        fluid: "DEE",
        data: {
            CAINLGA: 26.76,
            CAINLGB: 1.025,
            CAINLLA: 236.7,
            CAINLLB: 1.219,
            CAILGA: 241.5,
            CAILGB: 0.997,
            CAILLA: 488.9,
            CAILLB: 0.864,
            IAINLGA: 31.71,
            IAINLGB: 0.682,
            IAINLLA: 8.33,
            IAINLLB: 0.814,
            IAILGA: 128.3,
            IAILGB: 0.657,
            IAILLA: 9.258,
            IAILLB: 0.814,
        }
    },
    {
        id: "flamable016",
        fluid: "Methanol",
        data: {
            CAINLGA: 0,
            CAINLGB: 1.008,
            CAINLLA: 849.9,
            CAINLLB: 0.902,
            CAILGA: null,
            CAILGB: null,
            CAILLA: null,
            CAILLB: null,
            IAINLGA: 6.035,
            IAINLGB: 0.688,
            IAINLLA: 1.157,
            IAINLLB: 0.871,
            IAILGA: null,
            IAILGB: null,
            IAILLA: null,
            IAILLB: null,
        }
    },
    {
        id: "flamable017",
        fluid: "EO",
        data: {
            CAINLGA: 11,
            CAINLGB: 1.105,
            CAINLLA: null,
            CAINLLB: null,
            CAILGA: null,
            CAILGB: null,
            CAILLA: null,
            CAILLB: null,
            IAINLGA: 3.47,
            IAINLGB: 0.665,
            IAINLLA: null,
            IAINLLB: null,
            IAILGA: null,
            IAILGB: null,
            IAILLA: null,
            IAILLB: null,
        }
    },
    {
        id: "flamable018",
        fluid: "Pyroporic",
        data: {
            CAINLGA: 5.755,
            CAINLGB: 0.96,
            CAINLLA: 70.03,
            CAINLLB: 0.89,
            CAILGA: 188.6,
            CAILGB: 0.92,
            CAILLA: 269.4,
            CAILLB: 0.32,
            IAINLGA: 2.035,
            IAINLGB: 0.66,
            IAINLLA: 1.609,
            IAINLLB: 0.76,
            IAILGA: 151,
            IAILGB: 0.63,
            IAILLA: 2.847,
            IAILLB: 0.54,
        }
    }
]

export { flamableTable }
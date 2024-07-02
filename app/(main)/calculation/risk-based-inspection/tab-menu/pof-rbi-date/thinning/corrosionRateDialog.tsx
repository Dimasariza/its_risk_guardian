import InputTypeText from "@/fragments/input-type-text";
import { Checkbox } from "primereact/checkbox";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Row } from "primereact/row";
import { useState } from "react";

function CorrosionRateDialog({visible, setVisible}: any) {
    const initiaValue = {
        "cr_HCLContain": true,
        "cr_HCLIsFreeWater": false,
        "cr_HCLphUnder7": false,
        "cr_SulfidicContainOil": false,
        "cr_SulfidicTempOver204": false,
        "cr_SulfuricContainH2SO4": false,
        "cr_H2SH2containH2s": false,
        "cr_H2SH2TempOver204": false,
        "cr_HydrifluoricContainHF": false,
        "cr_SourWaterIsFreeH2S": false,
        "cr_AmineIsEquipment": false,
        "cr_OxidationTempOver482": false,
        "cr_OxidationOxigenPresent": false,
        "cr_AcidphUnder7": false,
        "cr_AcidContainPPM": false,
        "cr_CoolingIsEquipment": false,
        "cr_SoilSideIsEquipment": false,
        "cr_SoilSideIsMaterial": false,
        "cr_CO2IsFreeWater": false,
        "cr_CO2IsMaterial": false,
        "cr_ASTIsEquipment": false,
        "notesHCLphUnder7": "phunder 7",
        "notessulfidicTempOver204": "sulfidic",
        "notesH2SH2": "h2sh2",
        "notesOxidatoin": "oxidation",
        "notesAcid": "acid",
        "notesCO2": "co2"
    }

    const [screeningValue, setScreeningValue] = useState(initiaValue);

    const screeningQuestions: any = [
        {
            id: "screening001",
            type: "Hydrochloric Acid (HCL) Corrosin",
            screening: [
                { 
                    name: "cr_HCLContain",
                    value: "Does the process contain HCL?", 
                    check: false
                },
                {
                    name: "cr_HCLIsFreeWater",
                    value: "Is free water present in the process stream (including initial condensing)",
                    check: false,
                },
                {
                    name: "cr_HCLphUnder7",
                    value: "Is the pH < 7.0?",
                    check: false,
                    notes: "notesHCLphUnder7"
                }
            ],
            check: false
        },
        {
            id: "screening002",
            type: "High Temperature Sulfidic/Naphtenic Acid Corrosion",
            screening: [
                { 
                    name: "cr_SulfidicContainOil",
                    value: "Does the process contain oil with sulfur compounds?", 
                    check: false
                },
                {
                    name: "cr_SulfidicTempOver204",
                    value: "Is the operating temperature > 204oC (400oF)?",
                    check: false,
                    notes: "notessulfidicTempOver204"
                }
            ],
            check: false
        },
        {
            id: "screening003",
            type: "Sulfuric Acid Corrosion",
            screening: [
                { 
                    name: "cr_SulfuricContainH2SO4",
                    value: "Does the process contain H2SO4", 
                    check: false
                },
            ],
            check: false
        },
        {
            id: "screening004",
            type: "High Temperature H2S/H2 Corrosion",
            screening: [
                { 
                    name: "cr_H2SH2containH2s",
                    value: "Does the process contain H2S and Hydrogen?", 
                    check: false
                },
                {
                    name: "cr_H2SH2TempOver204",
                    value: "Is the operating temperature > 204oC (400oF)?",
                    check: false,
                    notes: "notesH2SH2"
                }
            ],
            check: false
        },
        {
            id: "screening005",
            type: "Hydrifluoric Corrosion",
            screening: [
                { 
                    name: "cr_HydrifluoricContainHF",
                    value: "Does the process contain HF?", 
                    check: false
                },
            ],
            check: false
        },
        {
            id: "screening006",
            type: "Sour Water Corrsion",
            screening: [
                { 
                    name: "cr_SourWaterIsFreeH2S",
                    value: "Is free water with H2S present?", 
                    check: false
                },
            ],
            check: false
        },
        {
            id: "screening007",
            type: "Amine Corrosion",
            screening: [
                { 
                    name: "cr_AmineIsEquipment",
                    value: "Is equipment exposed to acid gas treaating amines (MEA, DEA, DIPA, or MDEA)?", 
                    check: false
                },
            ],
            check: false
        },
        {
            id: "screening008",
            type: "High Temperature Oxidation Corrosion",
            screening: [
                { 
                    name: "cr_OxidationTempOver482",
                    value: "Is the temperature ≥ 482oC (900oF)?", 
                    check: false,
                    notes: "notesOxidatoin"
                },
                {
                    name: "cr_OxidationOxigenPresent",
                    value: "Is the oxygen present?",
                    check: false,
                },
            ],
            check: false
        },
        {
            id: "screening009",
            type: "Acid Sour Water Corrosion",
            screening: [
                {
                    name: "cr_AcidphUnder7",
                    value: "Is free water with H2S present and pH < 7.0?",
                    check: false,
                    notes: "notesAcid"
                },
                {
                    name: "cr_AcidContainPPM",
                    value: "Does the proocess contain < 50 ppm chlorides?",
                    check: false,
                },
            ],
            check: false
        },
        {
            id: "screening010",
            type: "Cooling Water",
            screening: [
                { 
                    name: "cr_CoolingIsEquipment",
                    value: "Is equipment in cooling water service?", 
                    check: false
                },
            ],
            check: false
        },
        {
            id: "screening011",
            type: "Soil Side Corrosion",
            screening: [
                { 
                    name: "cr_SoilSideIsEquipment",
                    value: "Is equipment in contact with soil (buried or partially buried)?", 
                    check: false
                },
                {
                    name: "cr_SoilSideIsMaterial",
                    value: "Is the material of construction carbon steel?",
                    check: false,
                },
            ],
            check: false
        },
        {
            id: "screening012",
            type: "CO2 Corrosion",
            screening: [
                { 
                    name: "cr_CO2IsFreeWater",
                    value: "Is the free water with CO2 present (including consideration for dew point condensation)?", 
                    check: false
                },
                {
                    name: "cr_CO2IsMaterial",
                    value: "Is the material of construction carbon steel or < 13% Cr?",
                    check: false,
                    notes: "notesCO2"
                }
            ],
            check: false
        },
        {
            id: "screening013",
            type: "AST Bottom",
            screening: [
                { 
                    name: "cr_ASTIsEquipment",
                    value: "Is the equipment item an AST tank bottom?", 
                    check: false
                },
            ],
            check: false
        },
    ]

    const screeningBodyTemplate = ({screening = []}) => {
        return screening.map(({name, value, notes}, id): any => {
            return (
                <div className="grid" key={value + id}>
                    <div className="col-1">{id + 1}. </div>
                    <div className="col-9">{value}</div>
                    <div className="col-2">{useCheckBox(screeningValue[name])}</div>
                    {
                        notes && 
                        <>
                            <div className="col-1"></div>
                            <InputText className="p-inputtext-sm" value={screeningValue[notes]} />
                        </>
                    }
                </div>
            )
        })
    }

    const actionBodyTemplate = (check: any) => {
        return useCheckBox(true)
    }
    
    const useCheckBox = (check: boolean) => {
        return <Checkbox inputId="rememberme1" checked={check} onChange={(e) => {} } className="mr-2"></Checkbox>
    }

    return (
        <>
            {/* <Dialog header="Representative Fluid Table" visible={visible} style={{ width: '90%' }} maximizable
                modal onHide={() => {if (!visible) return; setVisible((prev: any) => ({...prev, representative: false})); }} > */}
                <div>
                <DataTable 
                    value={screeningQuestions.map((i: any, no: number) => ({...i, no: no + 1}))} 
                    scrollable 
                    scrollHeight="700px" 
                    tableStyle={{ minWidth: '50rem' }} 
                >
                    <Column field="no" header="No"></Column>
                    <Column field="type" header="Type of Corrosion"></Column>
                    <Column field="question" header="Screening Question" body={screeningBodyTemplate}></Column>
                    <Column field="" header="Action" body={actionBodyTemplate}></Column>
                </DataTable>
                </div>
            {/* </Dialog> */}
        </>
    )
}

export default CorrosionRateDialog;
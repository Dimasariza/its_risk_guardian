import InputTypeText from "@/fragments/input-type-text";
import { Checkbox } from "primereact/checkbox";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Row } from "primereact/row";
import { useEffect, useState } from "react";
import screeningQuestions from "./corrosionRateTable";
import { Button } from "primereact/button";

function CorrosionRateDialog() {
    const initialValue = {
        "cr_HCLContain": false,
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
        "notesHCLphUnder7": "",
        "notessulfidicTempOver204": "",
        "notesH2SH2": "",
        "notesOxidatoin": "",
        "notesAcid": "",
        "notesCO2": ""
    }

    const initActionValue: any = {
        hcl: false,
        sulfidic: false,
        sulfuric: false,
        h2sh2: false,
        hydrifluoric: false,
        sourWater: false,
        amine: false,
        oxidation: false,
        acid: false,
        coolingWater: false,
        soilSide: false,
        co2: false,
        ast: false
    }

    const [screeningValue, setScreeningValue] = useState(initialValue);
    const [actionValue, setActionValue] = useState<any>(initActionValue);
    const [visible, setVisible] = useState<boolean>(false);

    const screeningBodyTemplate = ({screening = []}) => {
        return screening.map(({name, value, notes}, id): any => {
            return (
                <div className="grid" key={value + id}>
                    <div className="col-1">{id + 1}. </div>
                    <div className="col-9">{value}</div>
                    <div className="col-2">{checkBox(name, screeningValue[name])}</div>
                    {
                        notes && 
                        <>
                            <div className="col-1"></div>
                            <InputText className="p-inputtext-sm" value={screeningValue[notes]} 
                            onChange={(e) => { setScreeningValue((prev: any) => ({...prev, [notes]: e.target.value}) )}} />
                        </>
                    }
                </div>
            )
        })
    }

    const actionBodyTemplate = ({name}: any) => {
        return checkBox(name, actionValue[name])
    }
    
    const checkBox = (name: string, check: boolean) => {
        return <Checkbox 
            inputId="rememberme1" 
            checked={check} 
            onChange={(e) => { setScreeningValue((prev: any) => ({...prev, [name]: e.target.checked})) }} 
            className="mr-2">
        </Checkbox>
    }

    const footerContent = (
        <div className="flex gap-2 justify-content-end">
            <Button label="Cancel" icon="pi pi-check" 
            onClick={() => setVisible(false)} 
            severity="danger" />
            <Button label="Save" icon="pi pi-times" 
            onClick={() => setVisible(false)} 
            severity="success" />
        </div>
    );

    useEffect(() => {
        setActionValue((prev: any) => {
            const { cr_HCLContain,
                    cr_HCLIsFreeWater,
                    cr_HCLphUnder7,
                    cr_SulfidicContainOil,
                    cr_SulfidicTempOver204,
                    cr_SulfuricContainH2SO4,
                    cr_H2SH2containH2s,
                    cr_H2SH2TempOver204,
                    cr_HydrifluoricContainHF,
                    cr_SourWaterIsFreeH2S,
                    cr_AmineIsEquipment,
                    cr_OxidationTempOver482,
                    cr_OxidationOxigenPresent,
                    cr_AcidphUnder7,
                    cr_AcidContainPPM,
                    cr_CoolingIsEquipment,
                    cr_SoilSideIsEquipment,
                    cr_SoilSideIsMaterial,
                    cr_CO2IsFreeWater,
                    cr_CO2IsMaterial,
                    cr_ASTIsEquipment,
                } = screeningValue;
            return {
                ...prev,
                hcl: cr_HCLContain && cr_HCLIsFreeWater && cr_HCLphUnder7,
                sulfidic: cr_SulfidicContainOil && cr_SulfidicTempOver204,
                sulfuric: cr_SulfuricContainH2SO4,
                h2sh2: cr_H2SH2containH2s && cr_H2SH2TempOver204,
                hydrifluoric: cr_HydrifluoricContainHF,
                sourWater: cr_SourWaterIsFreeH2S,
                amine: cr_AmineIsEquipment,
                oxidation: cr_OxidationTempOver482 && cr_OxidationOxigenPresent,
                acid: cr_AcidphUnder7 && cr_AcidContainPPM,
                coolingWater: cr_CoolingIsEquipment,
                soilSide: cr_SoilSideIsEquipment && cr_SoilSideIsMaterial,
                co2: cr_CO2IsFreeWater && cr_CO2IsMaterial,
                ast: cr_ASTIsEquipment
            }
        })
    }, [screeningValue])

    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Corrosion Rate Screening Question</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Screening Question" visible={visible} style={{ width: '90%' }} maximizable
                modal onHide={() => {if (!visible) return; setVisible(false); }} 
                footer={footerContent}
                >
                <div>
                <DataTable 
                    value={screeningQuestions.map((i: any, no: number) => ({...i, no: no + 1}))} 
                    scrollable 
                    tableStyle={{ minWidth:  '50rem' }} 
                >
                    <Column field="no" header="No"></Column>
                    <Column field="type" header="Type of Corrosion"></Column>
                    <Column field="question" header="Screening Question" body={screeningBodyTemplate}></Column>
                    <Column field="" header="Action" body={actionBodyTemplate}></Column>
                </DataTable>
                </div>
            </Dialog>
        </>
    )
}

export default CorrosionRateDialog;
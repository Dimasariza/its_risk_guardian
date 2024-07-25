import InputTypeText from "@/app/(main)/uikit/input/input-type-text";
import { Checkbox } from "primereact/checkbox";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Row } from "primereact/row";
import { useEffect, useRef, useState } from "react";
import screeningQuestions from "./corrosionRateTable";
import { Button } from "primereact/button";
import { RBIScreeningQuestionService } from "@/service/calculation/rbiScreeningQuestion";
import { useSelector } from "react-redux";
import { Toast } from "primereact/toast";

function CorrosionRateDialog() {
    const initialValue = {
        "rbiSQ_HCLContain": false,
        "rbiSQ_HCLIsFreeWater": false,
        "rbiSQ_HCLphUnder7": false,
        "rbiSQ_SulfidicContainOil": false,
        "rbiSQ_SulfidicTempOver204": false,
        "rbiSQ_SulfuricContainH2SO4": false,
        "rbiSQ_H2SH2containH2s": false,
        "rbiSQ_H2SH2TempOver204": false,
        "rbiSQ_HydrifluoricContainHF": false,
        "rbiSQ_SourWaterIsFreeH2S": false,
        "rbiSQ_AmineIsEquipment": false,
        "rbiSQ_OxidationTempOver482": false,
        "rbiSQ_OxidationOxigenPresent": false,
        "rbiSQ_AcidphUnder7": false,
        "rbiSQ_AcidContainPPM": false,
        "rbiSQ_CoolingIsEquipment": false,
        "rbiSQ_SoilSideIsEquipment": false,
        "rbiSQ_SoilSideIsMaterial": false,
        "rbiSQ_CO2IsFreeWater": false,
        "rbiSQ_CO2IsMaterial": false,
        "rbiSQ_ASTIsEquipment": false,
        "rbiSQ_notesHCLphUnder7": "",
        "rbiSQ_notessulfidicTempOver204": "",
        "rbiSQ_notesH2SH2": "",
        "rbiSQ_notesOxidatoin": "",
        "rbiSQ_notesAcid": "",
        "rbiSQ_notesCO2": ""
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
    const toast = useRef<any>(null);
    const { edit } = useSelector((state: any) => state.EditReducer);

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

    const updateScreeningQuestion = () => {
        RBIScreeningQuestionService.editData(screeningValue)
        .then(res => {
            toast.current.show({
                severity: 'success',
                summary: 'Data Updated',
                detail: `Screening Question has been updated`
            });
        })
        .catch(res => {
            toast.current.show({
                severity: 'error',
                summary: 'Data failed to Update',
                detail: `Screening Question not updated`
            });
        })
    }

    const footerContent = (
        <div className="flex gap-2 justify-content-end">
            <Button label="Cancel" icon="pi pi-times" 
            onClick={() => setVisible(false)} 
            severity="danger" />
            <Button label="Save" icon="pi pi-check" 
            onClick={() => {
                setVisible(false)
                updateScreeningQuestion()
            }} 
            severity="success" />
        </div>
    );

    useEffect(() => {
        const { rbiSQ_HCLContain,
                rbiSQ_HCLIsFreeWater,
                rbiSQ_HCLphUnder7,
                rbiSQ_SulfidicContainOil,
                rbiSQ_SulfidicTempOver204,
                rbiSQ_SulfuricContainH2SO4,
                rbiSQ_H2SH2containH2s,
                rbiSQ_H2SH2TempOver204,
                rbiSQ_HydrifluoricContainHF,
                rbiSQ_SourWaterIsFreeH2S,
                rbiSQ_AmineIsEquipment,
                rbiSQ_OxidationTempOver482,
                rbiSQ_OxidationOxigenPresent,
                rbiSQ_AcidphUnder7,
                rbiSQ_AcidContainPPM,
                rbiSQ_CoolingIsEquipment,
                rbiSQ_SoilSideIsEquipment,
                rbiSQ_SoilSideIsMaterial,
                rbiSQ_CO2IsFreeWater,
                rbiSQ_CO2IsMaterial,
                rbiSQ_ASTIsEquipment,
            } = screeningValue;
        setActionValue((prev: any) => {
            return {
                ...prev,
                hcl: rbiSQ_HCLContain && rbiSQ_HCLIsFreeWater && rbiSQ_HCLphUnder7,
                sulfidic: rbiSQ_SulfidicContainOil && rbiSQ_SulfidicTempOver204,
                sulfuric: rbiSQ_SulfuricContainH2SO4,
                h2sh2: rbiSQ_H2SH2containH2s && rbiSQ_H2SH2TempOver204,
                hydrifluoric: rbiSQ_HydrifluoricContainHF,
                sourWater: rbiSQ_SourWaterIsFreeH2S,
                amine: rbiSQ_AmineIsEquipment,
                oxidation: rbiSQ_OxidationTempOver482 && rbiSQ_OxidationOxigenPresent,
                acid: rbiSQ_AcidphUnder7 && rbiSQ_AcidContainPPM,
                coolingWater: rbiSQ_CoolingIsEquipment,
                soilSide: rbiSQ_SoilSideIsEquipment && rbiSQ_SoilSideIsMaterial,
                co2: rbiSQ_CO2IsFreeWater && rbiSQ_CO2IsMaterial,
                ast: rbiSQ_ASTIsEquipment
            }
        })
    }, [screeningValue])

    const data = useSelector((state: any) => state.Reducer);
    useEffect(() => {
        const componentId = data.menu?.comp_id;
        if(!componentId) return;
        RBIScreeningQuestionService.fetchData(componentId)
        .then(res => {
            setScreeningValue(res)
        })
    }, [])

    return (
        <>
            <Toast ref={toast}  position="bottom-right" />

            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Corrosion Rate Screening Question</label>
                <Button label="Show Table" size="small" className="mx-3" disabled={edit} onClick={() => setVisible(true)} />
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
import InputTypeText from "@/app/(main)/uikit/input-type-text";
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
import { useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { PlanScreeningQuestionService } from "@/service/calculation/planScreeningQuestion";

function CorrosionRateDialog() {
    const initialValue = {
        "planSQ_HCLContain": false,
        "planSQ_HCLIsFreeWater": false,
        "planSQ_HCLphUnder7": false,
        "planSQ_SulfidicContainOil": false,
        "planSQ_SulfidicTempOver204": false,
        "planSQ_SulfuricContainH2SO4": false,
        "planSQ_H2SH2containH2s": false,
        "planSQ_H2SH2TempOver204": false,
        "planSQ_HydrifluoricContainHF": false,
        "planSQ_SourWaterIsFreeH2S": false,
        "planSQ_AmineIsEquipment": false,
        "planSQ_OxidationTempOver482": false,
        "planSQ_OxidationOxigenPresent": false,
        "planSQ_AcidphUnder7": false,
        "planSQ_AcidContainPPM": false,
        "planSQ_CoolingIsEquipment": false,
        "planSQ_SoilSideIsEquipment": false,
        "planSQ_SoilSideIsMaterial": false,
        "planSQ_CO2IsFreeWater": false,
        "planSQ_CO2IsMaterial": false,
        "planSQ_ASTIsEquipment": false,
        "planSQ_notesHCLphUnder7": "",
        "planSQ_notessulfidicTempOver204": "",
        "planSQ_notesH2SH2": "",
        "planSQ_notesOxidatoin": "",
        "planSQ_notesAcid": "",
        "planSQ_notesCO2": ""
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
        // PlanScreeningQuestionService.editData(screeningValue)
        // .then(res => {
        //     toast.current.show({
        //         severity: 'success',
        //         summary: 'Data Updated',
        //         detail: `Screening Question has been updated`
        //     });
        // })
        // .catch(res => {
        //     toast.current.show({
        //         severity: 'error',
        //         summary: 'Data failed to Update',
        //         detail: `Screening Question not updated`
        //     });
        // })
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
        const { planSQ_HCLContain,
                planSQ_HCLIsFreeWater,
                planSQ_HCLphUnder7,
                planSQ_SulfidicContainOil,
                planSQ_SulfidicTempOver204,
                planSQ_SulfuricContainH2SO4,
                planSQ_H2SH2containH2s,
                planSQ_H2SH2TempOver204,
                planSQ_HydrifluoricContainHF,
                planSQ_SourWaterIsFreeH2S,
                planSQ_AmineIsEquipment,
                planSQ_OxidationTempOver482,
                planSQ_OxidationOxigenPresent,
                planSQ_AcidphUnder7,
                planSQ_AcidContainPPM,
                planSQ_CoolingIsEquipment,
                planSQ_SoilSideIsEquipment,
                planSQ_SoilSideIsMaterial,
                planSQ_CO2IsFreeWater,
                planSQ_CO2IsMaterial,
                planSQ_ASTIsEquipment,
            } = screeningValue;
        setActionValue((prev: any) => {
            return {
                ...prev,
                hcl: planSQ_HCLContain && planSQ_HCLIsFreeWater && planSQ_HCLphUnder7,
                sulfidic: planSQ_SulfidicContainOil && planSQ_SulfidicTempOver204,
                sulfuric: planSQ_SulfuricContainH2SO4,
                h2sh2: planSQ_H2SH2containH2s && planSQ_H2SH2TempOver204,
                hydrifluoric: planSQ_HydrifluoricContainHF,
                sourWater: planSQ_SourWaterIsFreeH2S,
                amine: planSQ_AmineIsEquipment,
                oxidation: planSQ_OxidationTempOver482 && planSQ_OxidationOxigenPresent,
                acid: planSQ_AcidphUnder7 && planSQ_AcidContainPPM,
                coolingWater: planSQ_CoolingIsEquipment,
                soilSide: planSQ_SoilSideIsEquipment && planSQ_SoilSideIsMaterial,
                co2: planSQ_CO2IsFreeWater && planSQ_CO2IsMaterial,
                ast: planSQ_ASTIsEquipment
            }
        })
    }, [screeningValue])

    const data = useSelector((state: any) => state.Reducer);
    useEffect(() => {
        const componentId = data.menu?.comp_id;
        if(!componentId) return;
        // PlanScreeningQuestionService.fetchData(componentId)
        // .then(res => {
        //     setScreeningValue(res)
        // })
    }, [])

    return (
        <>
            <Toast ref={toast}  position="bottom-right" />

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
import InputTypeText from "@/app/(main)/uikit/input-type-text";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { ListBox, ListBoxChangeEvent } from "primereact/listbox";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { classNames } from "primereact/utils";
import { useState } from "react";

export const protectedEquipment = [
    {
        id: "protected001",
        class: "None",
        df: 1,
        description: "New vessel or inspection shows little if any damage",
    },
    {
        id: "protected002",
        class: "Minimal",
        df: 20,
        description: "Equipment has been in service for a reasonable amount of time and inspection shows evidence of minor damage . Damage mechanism have been identified and inspecton data is available.",
    },
    {
        id: "protected003",
        class: "Minor",
        df: 200,
        description: "One or more damage mechanisms have been identified, limited inspection data available and fairly moderate evidence of damage. Single damage mechanism identified, recent inspection indicates moderate evidence of damage.",
    },
    {
        id: "protected004",
        class: "Moderate",
        df: 750,
        description: "Moderate damage found during recent inspection. Low susceptible to one or more damage mechanisms, and limited inspection exists.",
    },
    {
        id: "protected005",
        class: "Severe",
        df: 2000,
        description: "One or more active damage mechanisms present without any recent inspection history. Limited inspection indicating high damage susceptibility",
    },
]

function ClassProtectedDialogs({value, setValue, setOnSubmit}: any) {
    const [visible, setVisible] = useState<boolean>(false);
    const [dfActive, setDfActive] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<any>({});
    const cities: any = [
        { name: 'PV JNE MAM 106', code: 'NY' },
        { name: 'PRD XHR EXY 11', code: 'RM' },
    ];

    const footerContent = (
        <div>
          <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible(false)} severity="danger" />
          <Button label="Save" icon="pi pi-check" onClick={() => {
                setOnSubmit((prev: boolean) => !prev)
                setVisible(false)
          }} severity="success" />
        </div>
    );

    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Classe For Protected Equipment</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible(true)} />
            </div>

            <Dialog header="Classe For Protected Equipment" visible={visible} style={{ width: '80%' }} maximizable
                modal onHide={() => {if (!visible) return; setVisible(false); }}  
                footer={footerContent}
                >
                <div>
                    <div className="flex align-items-center m-3 p-3 border-bottom-2 border-primary-500">
                        <RadioButton inputId="damageFactor1" name="apiTable" value="Based On API Table" onChange={(e: RadioButtonChangeEvent) => setDfActive(e.value)} checked={dfActive === 'Based On API Table'} />
                        <label htmlFor="damageFactor1" className="ml-2">Based On API Table</label>
                    </div>
                    <DataTable 
                        value={protectedEquipment} 
                        scrollable 
                        tableStyle={{ minWidth:  '50rem' }} 
                        selectionMode="single" 
                        sortMode="single"
                        selection={value.protected}
                        onSelectionChange={(e: any) => {
                            setValue((prev: any) => ({
                                ...prev, 
                                protected: e?.value,
                                plan_protectedEquipment: e?.value?.id
                            }))
                        }}
                    >
                        <Column className={classNames("", {"p-disabled": dfActive !== 'Based On API Table'}) } selectionMode="single"></Column>
                        <Column className={classNames("", {"p-disabled": dfActive !== 'Based On API Table'}) } field="class" header="DF Class"></Column>
                        <Column className={classNames("", {"p-disabled": dfActive !== 'Based On API Table'}) } field="df" header="DF"></Column>
                        <Column className={classNames("", {"p-disabled": dfActive !== 'Based On API Table'}) } field="description" header="Description"></Column>
                    </DataTable>

                    <div className="flex align-items-center m-3 p-3 border-bottom-2 border-primary-500">
                        <RadioButton inputId="damageFactor2" name="manual" value="Manual Input" onChange={(e: RadioButtonChangeEvent) => setDfActive(e.value)} checked={dfActive === 'Manual Input'} />
                        <label htmlFor="damageFactor2" className="ml-2">Manual Input</label>
                    </div>
                    <InputTypeText  props={{
                        name: 'plan_typicalTempF',
                        type: 'text',
                        placeholder: 'Damage Factor',
                        disabled: dfActive !== 'Manual Input'
                    }} value={""} setValue={() => {}} />

                    <div className="flex align-items-center m-3 p-3 border-bottom-2 border-primary-500">
                        <RadioButton inputId="damageFactor3" name="protectedEquiment" value="Based On Protected Equipment" onChange={(e: RadioButtonChangeEvent) => setDfActive(e.value)} checked={dfActive === 'Based On Protected Equipment'} />
                        <label htmlFor="damageFactor3" className="ml-2">Based On Protected Equipment</label>
                    </div>
                    <div className="flex justify-content-center">  
                        <ListBox filter value={selectedCity} onChange={(e: ListBoxChangeEvent) => setSelectedCity(e.value)} options={cities} optionLabel="name" className="w-full md:w-14rem" disabled={dfActive !== 'Based On Protected Equipment'} />
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default ClassProtectedDialogs;
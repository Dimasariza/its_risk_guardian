import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useState } from "react";

function DFExternalCorrosion() {
    const [value, setValue] = useState<any>();
    const [errorMessage, setErrorMessage] = useState<any>(false);

    return (
        <>
            <section className="m-2">

                    <div>
                        <label htmlFor="rbiAssesment" className="col-6">
                            Year Assesment
                        </label>
                        <InputText id="rbiAssesment" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                    <div>
                        <label htmlFor="rbiInstallation" className="col-6">
                            Year Installation
                        </label>
                        <InputText id="rbiInstallation" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                    <div>
                        <label htmlFor="thicknessValue" className="col-6">
                            Thickness Value
                        </label>
                        <InputText id="thicknessValue" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                    <div>
                        <label htmlFor="baseCorrosionRate" className="col-6">
                            Base Corrosion Rate
                        </label>
                        <InputText id="baseCorrosionRate" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                    <div>
                        <label htmlFor="finalCorrosionRate" className="col-6">
                            Final Corrosion Rate
                        </label>
                        <InputText id="finalCorrosionRate" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                    <div>
                        <label htmlFor="timeInService" className="col-6">
                            Shell Time In Service
                        </label>
                        <InputText id="timeInService" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                    <div>
                        <label htmlFor="timeInService" className="col-6">
                            Head Time In Service
                        </label>
                        <InputText id="timeInService" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                    <div>
                        <label htmlFor="ageCoat" className="col-6">
                            Age Coat
                        </label>
                        <InputText id="ageCoat" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                    <div>
                        <label htmlFor="adjusmentCoat" className="col-6">
                            Adjusment Coat
                        </label>
                        <InputText id="adjusmentCoat" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                    <div>
                        <label htmlFor="age" className="col-6">
                            Age
                        </label>
                        <InputText id="age" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                    <div>
                        <label htmlFor="minReqWallThickness" className="col-6">
                            Min Required Wall Thickness
                        </label>
                        <InputText id="minReqWallThickness" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                    <div>
                        <label htmlFor="shellDFParameter" className="col-6">
                            Shell DF Parameter
                        </label>
                        <InputText id="shellDFParameter" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                    <div>
                        <label htmlFor="headDFParameter" className="col-6">
                            Head DF Parameter
                        </label>
                        <InputText id="headDFParameter" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                    <div>
                        <label htmlFor="flowStress" className="col-6">
                            Flow Stress
                        </label>
                        <InputText id="flowStress" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                    <div>
                        <label htmlFor="shellStrengthRatio" className="col-6">
                            Shell Strength Ratio
                        </label>
                        <InputText id="shellStrengthRatio" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                    <div>
                        <label htmlFor="headStrengthRatio" className="col-6">
                            Head Strength Ratio
                        </label>
                        <InputText id="headStrengthRatio" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                    <div>
                        <label htmlFor="numInspA" className="col-6">
                            Number of Inspection A
                        </label>
                        <InputText id="numInspA" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                    <div>
                        <label htmlFor="numInspB" className="col-6">
                            Number of Inspection B
                        </label>
                        <InputText id="numInspB" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                    <div>
                        <label htmlFor="numInspC" className="col-6">
                            Number of Inspection C
                        </label>
                        <InputText id="numInspC" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                    <div>
                        <label htmlFor="numInspD" className="col-6">
                            Number of Inspection D
                        </label>
                        <InputText id="numInspD" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
            </section>
        </>
    )
}

export default DFExternalCorrosion;
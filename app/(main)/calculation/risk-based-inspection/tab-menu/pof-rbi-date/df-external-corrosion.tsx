import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useState } from "react";

function DFExternalCorrosion() {
    const [value, setValue] = useState<any>();
    const [errorMessage, setErrorMessage] = useState<any>(false);

    return (
        <>
            <section className="grid m-2">
                <div className="col-6">
                    Shell Section

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
                        <label htmlFor="corrosionRate" className="col-6">
                            Corrosion Rate
                        </label>
                        <InputText id="corrosionRate" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
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
                            Time In Service
                        </label>
                        <InputText id="timeInService" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                        {errorMessage && <Message severity="error" text={errorMessage} />}
                    </div>
                </div>
                <div className="col-6">
                    Head Section
                </div>
            </section>
        </>
    )
}

export default DFExternalCorrosion;
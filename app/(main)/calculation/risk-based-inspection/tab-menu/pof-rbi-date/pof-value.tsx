import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useState } from "react";

function POFValue() {
    const [value, setValue] = useState<any>();
    const [errorMessage, setErrorMessage] = useState<any>();
    return (
        <>
            <section className="m-2">
                <h5>GFF</h5>
                <label htmlFor="gffTotal">
                    GFF Total
                </label>
                <InputText id="gffTotal" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                {errorMessage && <Message severity="error" text={errorMessage} />}

                <h5>DF Total</h5>
                <label htmlFor="gffTotal">
                    Shell Thinning
                </label>
                <InputText id="gffTotal" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                {errorMessage && <Message severity="error" text={errorMessage} />}

                <label htmlFor="gffTotal">
                    Head Thinning
                </label>
                <InputText id="gffTotal" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                {errorMessage && <Message severity="error" text={errorMessage} />}

                <label htmlFor="gffTotal">
                    Shell External
                </label>
                <InputText id="gffTotal" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                {errorMessage && <Message severity="error" text={errorMessage} />}

                <label htmlFor="gffTotal">
                    Head External
                </label>
                <InputText id="gffTotal" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                {errorMessage && <Message severity="error" text={errorMessage} />}

                <label htmlFor="gffTotal">
                    Shell Total
                </label>
                <InputText id="gffTotal" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                {errorMessage && <Message severity="error" text={errorMessage} />}

                <label htmlFor="gffTotal">
                    Head Total
                </label>
                <InputText id="gffTotal" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                {errorMessage && <Message severity="error" text={errorMessage} />}

                <h5>Management System Factor</h5>
                <h5>POF Total</h5>
                <label htmlFor="gffTotal">
                    Shell Section
                </label>
                <InputText id="gffTotal" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                {errorMessage && <Message severity="error" text={errorMessage} />}

                <label htmlFor="gffTotal">
                    Head Section
                </label>
                <InputText id="gffTotal" value={value} onChange={(e) => setValue((prev: any) => ({ ...prev, rbiAssesment: e.target.value }))} className="p-inputtext-sm" />
                {errorMessage && <Message severity="error" text={errorMessage} />}

            </section>
        </>
    )
}

export default POFValue;
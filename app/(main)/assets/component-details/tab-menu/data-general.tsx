import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { useState } from "react";


function DataGeneral() {
    const [textareaValue, setTextareaValue] = useState('');

    return (
        <>
            <div className="flex flex-column gap-2 field">
                <label htmlFor="username">Tag Number</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="BANG-T-050A"/>
                {/* <small id="username-help">
                    Enter your username to reset your password.
                </small> */}
                <label htmlFor="username">Design Pressure (Psig)</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="1"/>
                <label htmlFor="username">Design Temperature (&deg;F)</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Description</label>
                <InputTextarea value={textareaValue} onChange={(e) => setTextareaValue(e.target.value)} rows={5} cols={30} />
                <label htmlFor="username">PFD</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">P&Id</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Installation Date</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Join Efficiency</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Type of Equipment</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Yield Strength</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Tensil Strength</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Allowable Stress</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Min Design Metal Temp</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Material Construction</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Outside Diameter</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Inside Diameter</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Insulation</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
            </div>
            <div className='flex w-full justify-content-center'>
                <Button label="Save Data" raised severity="success" className='my-2'/>
            </div>
        </>
    )
}

export default DataGeneral;
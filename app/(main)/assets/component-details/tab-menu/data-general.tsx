import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { useState } from "react";
import { RadioButton } from "primereact/radiobutton";


function DataGeneral() {
    const [textareaValue, setTextareaValue] = useState('');
    const [ingredient, setIngredient] = useState('Yes');

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
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="200"/>
                {/* <label htmlFor="username">Description</label>
                <InputTextarea value={textareaValue} onChange={(e) => setTextareaValue(e.target.value)} rows={5} cols={30} /> */}
                <label htmlFor="username">Weld Joint Efficiency</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="0.85" />
                <label htmlFor="username">Type of Equipment</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="Storage Tank"/>
                <label htmlFor="username">Yield Strength (Mpa)</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="250" />
                <label htmlFor="username">Tensil Strength (Mpa)</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="400" />
                <label htmlFor="username">Allowable Stress (Mpa)</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="150" />
                <label htmlFor="username">Min. Design Metal Temp (&deg;C)</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="0"/>
                <label htmlFor="username">Materuak Construction</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="Carbon Steel"/>
                <label htmlFor="username">Furnished Thickness (mm)</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="8"/>
                <label htmlFor="username">Corrosion Allowance (mm)</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="3.175"/>
                <label htmlFor="username">Post Weld Heat Treatment</label>
                <div className="flex flex-wrap gap-3">
                    <div className="flex align-items-center">
                        <RadioButton inputId="ingredient1" name="pizza" value="Yes" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Yes'} />
                        <label htmlFor="ingredient1" className="ml-2">Yes</label>
                    </div>
                    <div className="flex align-items-center">
                        <RadioButton inputId="ingredient2" name="pizza" value="No" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'No'} />
                        <label htmlFor="ingredient2" className="ml-2">No</label>
                    </div>
                </div>

                {/* <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" /> */}
                <label htmlFor="username">Outside Diameter (mm)</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="10058"/>
                <label htmlFor="username">Inside Diameter (mm)</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="10058"/>
                <label htmlFor="username">Height (mm)</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="9144"/>
                <label htmlFor="username">Insulation</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="None"/>
                <label htmlFor="username">Joint Efficiency</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="1"/>
            </div>
            <div className='flex w-full justify-content-center'>
                <Button label="Save Data" raised severity="success" className='my-2'/>
            </div>
        </>
    )
}

export default DataGeneral;
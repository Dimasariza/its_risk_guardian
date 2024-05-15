import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';

function DataOperating() {
    return (
        <>
            <div className="flex flex-column gap-2">
                <label htmlFor="username">Operating Temperature (&deg;F)</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="108" />
                <label htmlFor="username">Operating Pressure (psig)</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="0.5"/>
                <label htmlFor="username">Fluid</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="Hydrocarbon Liquid"/>
                <label htmlFor="username">Liquid Level (%)</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="76"/>
                <label htmlFor="username">Thinning Inspection Date</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Inspection Effectiveness</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Corrosion Found</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
            </div>
            <div className='flex w-full justify-content-center'>
                <Button label="Save Data" raised severity="success" className='my-2'/>
            </div>
        </>
    )
}

export default DataOperating;
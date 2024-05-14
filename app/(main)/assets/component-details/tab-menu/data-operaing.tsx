import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';

function DataOperating() {
    return (
        <>
            <div className="flex flex-column gap-2">
                <label htmlFor="username">Operating Temperature</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Operating Pressure</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Fluid</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Liquid Phase</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Inspection History</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Flow Velocity</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Fluid Name</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Fluid Description</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                <label htmlFor="username">Operational Fluid Phase</label>
                <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
            </div>
            <div className='flex w-full justify-content-center'>
                <Button label="Save Data" raised severity="success" className='my-2'/>
            </div>
        </>
    )
}

export default DataOperating;
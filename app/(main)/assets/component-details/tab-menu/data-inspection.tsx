import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

function DataInspection() {
  return (
    <>
      <div className="flex flex-column gap-2">
        <label htmlFor="username">Last Inspection</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="01 Jan 2020" />
        <label htmlFor="username">Thickness Last Inspection (mm)</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="21" />
      </div>
      <div className="flex w-full justify-content-center">
        <Button label="Save Data" raised severity="success" className="my-2" />
      </div>
    </>
  );
}
export default DataInspection;

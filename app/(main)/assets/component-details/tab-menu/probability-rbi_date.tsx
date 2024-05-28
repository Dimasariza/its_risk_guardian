import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

function POFRBIDate() {
  return (
    <>
      <div className="flex flex-column gap-2">
        <label htmlFor="username">Furnished Thickness (mm)</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="21.15" />
        <label htmlFor="username">Age (year)</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="11" />
        <label htmlFor="username">Corrosion Rate Based Material (mm/Year)</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="0.018" />
        <label htmlFor="username">Time in Service (years)</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="8" />
        <label htmlFor="username">Minimum Required Wall Thickness (mm)</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="6.78" />
        <label htmlFor="username">Art Parameter</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="0.00694" />
        <label htmlFor="username">Flow Stress</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="266338" />
        <label htmlFor="username">strength Ratio</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="0.08555" />
        <label htmlFor="username">Number Inspection A</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="0" />
        <label htmlFor="username">Number Inspection B</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="0" />
        <label htmlFor="username">Number Inspection C</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="1" />
        <label htmlFor="username">Number Inspection D</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="0" />
        <label htmlFor="username">Inspection Effectiveness 1</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="0.35" />
        <label htmlFor="username">Inspection Effectiveness 2</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="0.06" />
        <label htmlFor="username">Inspection Effectiveness 3</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="0.02" />
        <label htmlFor="username">Posterior Probabilities 1</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="0.81" />
        <label htmlFor="username">Posterior Probabilities 2</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="0.14" />
        <label htmlFor="username">Posterior Probabilities 3</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="0.05" />
        <label htmlFor="username">Beta Thin 1</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="4.502603" />
        <label htmlFor="username">Beta Thin 2</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="4.564688" />
        <label htmlFor="username">Beta Thin 3</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="4.557057" />
        <label htmlFor="username">DF for component</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="0.02052" />
        <label htmlFor="username">DF for thinning</label>
        <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" value="0.018" />
      </div>
      <div className="flex w-full justify-content-center">
        <Button label="Save Data" raised severity="success" className="my-2" />
      </div>
    </>
  );
}

export default POFRBIDate;

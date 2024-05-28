import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useState } from 'react';

function FluidProperties() {
  const [value, setValue] = useState('');

  return (
    <>
      <h5>FLUID PROPERTIES</h5>
      <section className="grid gap-2 mx-2">
        <label htmlFor="fluidName" className="col-6">
          Fluid Name
        </label>
        <InputText id="fluidName" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="fluidType" className="col-6">
          FLuid Type
        </label>
        <InputText id="fluidType" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="fluidDescription" className="col-6">
          Fluid Description
        </label>
        <InputTextarea id="fluidDescription" value={value} onChange={(e) => setValue(e.target.value)} rows={5} className="w-full" />
        <label htmlFor="operationalFluidPhase" className="col-6">
          Operation Fluid Phase
        </label>
        <InputText id="operationalFluidPhase" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="ph" className="col-6">
          PH
        </label>
        <InputText id="ph" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
      </section>
    </>
  );
}

export default FluidProperties;

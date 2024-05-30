'use client';

import { InputText } from 'primereact/inputtext';
import { useState } from 'react';

function GeneralData() {
  const [value, setValue] = useState('');

  return (
    <>
      <section className="grid gap-2 m-2">
        <label htmlFor="equipmentName" className="col-6">
          Equipment Name
        </label>
        <InputText id="equipmentName" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="vesselType" className="col-6">
          Vessel Type
        </label>
        <InputText id="vesselType" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="serialNumber" className="col-6">
          Serial No.
        </label>
        <InputText id="serialNumber" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="size" className="col-6">
          Size
        </label>
        <InputText id="size" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="yearBuild" className="col-6">
          Year Built
        </label>
        <InputText id="yearBuild" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="designCode" className="col-6">
          Design Code
        </label>
        <InputText id="designCode" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="liquidCategory" className="col-6">
          Liquid Category
        </label>
        <InputText id="liquidCategory" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="liquidPhase" className="col-6">
          Liquid Phase
        </label>
        <InputText id="liquidPhase" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="cladding" className="col-6">
          Cladding
        </label>
        <InputText id="cladding" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="coating" className="col-6">
          Coating
        </label>
        <InputText id="coating" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="jointEfficiency" className="col-6">
          Joint Efficiency
        </label>
        <InputText id="jointEfficiency" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="materialOfShell" className="col-6">
          Material of Shell
        </label>
        <InputText id="materialOfShell" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="designPressure" className="col-6">
          Design Pressure
        </label>
        <InputText id="designPressure" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="designTemperature" className="col-6">
          Design Temperature
        </label>
        <InputText id="designTemperature" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="thickness" className="col-6">
          Thickness
        </label>
        <InputText id="thickness" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="minWallThicknessper" className="col-6">
          Minimum Wall Thicknessper Code
        </label>
        <InputText id="minWallThicknessper" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="corrosionAllowance" className="col-6">
          Corrosion Allowance
        </label>
        <InputText id="corrosionAllowance" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
      </section>
    </>
  );
}

export default GeneralData;

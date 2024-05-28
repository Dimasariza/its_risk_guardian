'use client';

import { InputText } from 'primereact/inputtext';
import { useState } from 'react';

function GeneralData() {
  const [value, setValue] = useState('');

  return (
    <>
      <section className="grid gap-2 m-2">
        <label htmlFor="idOfInstallation" className="col-6">
          Equipment Name
        </label>
        <InputText id="idOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="tagOfInstallation" className="col-6">
          Vessel Type
        </label>
        <InputText id="tagOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="nameOfInstallation" className="col-6">
          Serial No.
        </label>
        <InputText id="nameOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="categoryOfInstallation" className="col-6">
          Size
        </label>
        <InputText id="categoryOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="categoryOfInstallation" className="col-6">
          Year Built
        </label>
        <InputText id="categoryOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="categoryOfInstallation" className="col-6">
          Design Code
        </label>
        <InputText id="categoryOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="categoryOfInstallation" className="col-6">
          Liquid Category
        </label>
        <InputText id="categoryOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="categoryOfInstallation" className="col-6">
          Liquid Phase
        </label>
        <InputText id="categoryOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="categoryOfInstallation" className="col-6">
          Cladding
        </label>
        <InputText id="categoryOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="categoryOfInstallation" className="col-6">
          Coating
        </label>
        <InputText id="categoryOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="categoryOfInstallation" className="col-6">
          Joint Efficiency
        </label>
        <InputText id="categoryOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="categoryOfInstallation" className="col-6">
          Material of Shell
        </label>
        <InputText id="categoryOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="categoryOfInstallation" className="col-6">
          Design Pressure
        </label>
        <InputText id="categoryOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="categoryOfInstallation" className="col-6">
          Design Temperature
        </label>
        <InputText id="categoryOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="categoryOfInstallation" className="col-6">
          Thickness
        </label>
        <InputText id="categoryOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="categoryOfInstallation" className="col-6">
          Minimum Wall Thicknessper Code
        </label>
        <InputText id="categoryOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="categoryOfInstallation" className="col-6">
          Corrosion Allowance
        </label>
        <InputText id="categoryOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
      </section>
    </>
  );
}

export default GeneralData;

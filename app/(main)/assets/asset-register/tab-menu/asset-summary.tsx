import { InputText } from 'primereact/inputtext';
import { useState } from 'react';

function AssetSummary() {
  const [value, setValue] = useState('');
  return (
    <>
      <h5>ITEM</h5>
      <section className="grid gap-2 mx-2">
        <label htmlFor="tagOfItem" className="col-6">
          Tag of Item
        </label>
        <InputText id="tagOfItem" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="nameOfItem" className="col-6">
          Name of Item
        </label>
        <InputText id="nameOfItem" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
      </section>
      <h5>EQUIPMENT</h5>
      <section className="grid gap-2 mx-2">
        <label htmlFor="tagOfEquipment" className="col-6">
          Tag of Equipment
        </label>
        <InputText id="tagOfEquipment" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="nameOfEquipment" className="col-6">
          Name of Equipment
        </label>
        <InputText id="nameOfEquipment" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="typeOfEquipment" className="col-6">
          Type of Equipment
        </label>
        <InputText id="typeOfEquipment" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
      </section>
      <h5>COMPONENT</h5>
      <section className="grid gap-2 mx-2">
        <label htmlFor="tagOfComponent" className="col-6">
          Tag of Component
        </label>
        <InputText id="tagOfComponent" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="nameOfComponent" className="col-6">
          Name of Component
        </label>
        <InputText id="nameOfComponent" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
      </section>
    </>
  );
}

export default AssetSummary;

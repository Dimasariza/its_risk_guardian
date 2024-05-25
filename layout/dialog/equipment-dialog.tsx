"use client";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

function EquipmentDialog({visible, setVisible} : any) {
  const [value, setValue] = useState('');

  const footerContent = (
    <div>
      <Button label="Cancel" icon="pi pi-check" onClick={() => setVisible(false)} severity="danger" />
      <Button label="Save" icon="pi pi-times" onClick={() => setVisible(false)}  severity="success" />
    </div>
  );

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];

  return (
    <>
      <Dialog header="Equipment" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
        <section className="grid gap-2 m-2">
          <label htmlFor="equipment" className="col-6">Item</label>
          <Dropdown id="equipment" value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
            placeholder="Select a City" className="w-50" />
          <label htmlFor="tagOfEquipment" className="col-6">Tag of Equipment</label>
          <InputText id="tagOfEquipment" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          {/* <Message severity="error" /> */}
          <label htmlFor="nameOfEquipment" className="col-6">Name of Equipment</label>
          <InputText id="nameOfEquipment" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          {/* <Message severity="error" /> */}
        </section>
      </Dialog>
    </>
  )
}

export default EquipmentDialog;
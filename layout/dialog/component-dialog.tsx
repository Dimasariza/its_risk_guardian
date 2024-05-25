"use client";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useState } from "react";

function ComponentDialog({visible, setVisible}: any) {
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

  return(
    <>
      <Dialog header="Component" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
        <section className="grid gap-2 m-2">
          <label htmlFor="equipment" className="col-6">Equipment</label>
          <Dropdown id="equipment" value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
            placeholder="Select a City" className="w-50" />
          <label htmlFor="tagOfComponent" className="col-6">Tag of Component</label>
          <InputText id="tagOfComponent" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          {/* <Message severity="error" /> */}
          <label htmlFor="nameOfComponent" className="col-6">Name of Component</label>
          <InputText id="nameOfComponent" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          {/* <Message severity="error" /> */}
          <label htmlFor="typeOfComponent" className="col-6">Type Of Component</label>
          <InputText id="typeOfComponent" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          {/* <Message severity="error" /> */}
        </section>
      </Dialog>
    </>
  )
}

export default ComponentDialog;
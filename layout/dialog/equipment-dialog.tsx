"use client";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
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

  return (
    <>
      <Dialog header="Equipment" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
        <section className="grid gap-2 m-2">
          <label htmlFor="idOfEqupiment" className="col-6">Id of Equipment</label>
          <InputText id="idOfEqupiment" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          {/* <Message severity="error" /> */}
          <label htmlFor="tagOfEquipment" className="col-6">Tag of Equipment</label>
          <InputText id="tagOfEquipment" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          {/* <Message severity="error" /> */}
          <label htmlFor="nameOfEquipment" className="col-6">Name of Equipment</label>
          <InputText id="nameOfEquipment" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          {/* <Message severity="error" /> */}
          <label htmlFor="ownerOfEquipment" className="col-6">Owner Of Equipment</label>
          <InputText id="ownerOfEquipment" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          {/* <Message severity="error" /> */}
        </section>
      </Dialog>
    </>
  )
}

export default EquipmentDialog;
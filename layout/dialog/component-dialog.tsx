"use client";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
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

  return(
    <>
      <Dialog header="Component" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
        <section className="grid gap-2 m-2">
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
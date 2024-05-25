"use client";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

function ItemDialog({visible, setVisible}: any) {
  const [value, setValue] = useState('');

  const footerContent = (
    <div>
      <Button label="Cancel" icon="pi pi-check" onClick={() => setVisible(false)} severity="danger" />
      <Button label="Save" icon="pi pi-times" onClick={() => setVisible(false)}  severity="success" />
    </div>
  );

  return(
    <>
      <Dialog header="Item" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
        <section className="grid gap-2 m-2">
          <label htmlFor="tagOfItem" className="col-6">Tag of Item</label>
          <InputText id="tagOfItem" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          {/* <Message severity="error" /> */}
          <label htmlFor="nameOfItem" className="col-6">Name of Item</label>
          <InputText id="nameOfItem" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          {/* <Message severity="error" /> */}
        </section>
      </Dialog>
    </>
  )
}

export default ItemDialog;
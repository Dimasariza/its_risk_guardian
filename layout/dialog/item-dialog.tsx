"use client";

import { IAssetItem } from "@/types/assetItem";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useState } from "react";

function ItemDialog({visible, setVisible}: any) {
  let emptyItem: IAssetItem = {
    tagOfItem: "",
    nameOfItem: ""
  }

  const [value, setValue] = useState<IAssetItem>(emptyItem);
  const [error, setError] = useState<IAssetItem>(emptyItem);
  const [errorMsg, setErrorMsg] = useState<IAssetItem>(emptyItem);

  const footerContent = (
    <div>
      <Button label="Cancel" icon="pi pi-check" onClick={() => setVisible(false)} severity="danger" />
      <Button label="Save" icon="pi pi-times" onClick={() => setVisible(false)}  severity="success" />
    </div>
  );

  return(
    <>
      <Dialog header="Item" visible={visible} onHide={() => setVisible(false)} footer={footerContent}>
        <section className="flex flex-column gap-2">
          <label htmlFor="tagOfItem" className="col-6">Tag of Item</label>
          <InputText id="tagOfItem" name="tagOfItem" autoFocus required className="col" value={value.tagOfItem} onChange={(e) => setValue(prev => ({...prev, tagOfItem: e.target.value}))} />
          {
            error?.tagOfItem && <Message severity="error" text={errorMsg.tagOfItem} />
          }
          <label htmlFor="nameOfItem" className="col-6">Name of Item</label>
          <InputText id="nameOfItem" name="nameOfItem" className="col" required value={value.nameOfItem} onChange={(e) => setValue(prev => ({...prev, tagOfItem: e.target.value}))} />
          {
            error?.nameOfItem && <Message severity="error" text={errorMsg.nameOfItem}/>
          }
        </section>
      </Dialog>
    </>
  )
}

export default ItemDialog;
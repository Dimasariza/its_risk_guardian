"use client";

import InputTypeText from "@/fragments/input-type-text";
import { ItemService } from "@/service/ItemService";
import { IAssetItem } from "@/types/assetItem";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";

function ItemDialog({visible, setVisible}: any) {
  const emptyItem: IAssetItem = {
    tagOfItem: "",
    nameOfItem: ""
  }

  const toast = useRef<any>(null);
  const [value, setValue] = useState<IAssetItem>(emptyItem);
  const [error, setError] = useState<IAssetItem>(emptyItem);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const inputs = [
    { 
      name: "tagOfItem",
      type: "text",
      placeholder: "Tag of Item",
      label: "Tag of Item",
      required: true,
      autoFocus: true,
      className: "col",
    },
    { 
      name: "nameOfItem",
      type: "text",
      placeholder: "Name Of Item",
      label: "Name of Item",
      required: true,
      autoFocus: false,
      className: "col",
    }
  ];

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setError(validate(value));
    setIsSubmit(true);
  }

  const validate = (formValue: any) => {
    const errors: IAssetItem | any = {};
    if(!formValue.nameOfItem) {
      errors.nameOfItem = "Name of Item is required!";
    } else if (formValue.nameOfItem.length < 4) {
      errors.nameOfItem = "Name of Item must be more than 4 characters";
    }

    if(!formValue.tagOfItem) {
      errors.tagOfItem = "Tag of Item is required!";
    } else if (formValue.tagOfItem.length < 4) {
      errors.tagOfItem = "Tag of Item must be more than 4 characters";
    }

    return errors;
  }
  
  const footerContent = (
    <div>
      <Button label="Cancel" icon="pi pi-check" onClick={() => setVisible(false)} severity="danger" />
      <Button label="Save" icon="pi pi-times" onClick={handleSubmit}  severity="success" />
    </div>
  );
  
  useEffect(() => {
    if(Object.keys(error).length === 0 && isSubmit) {
      ItemService.postItem(value)
      .then(res => {
        toast.current.show({ 
          severity: 'success', 
          summary: 'Data has been added', 
          detail: `You add item ${res.nameOfItem}`
        });
      })
      .catch(err => console.log(err))
      setValue(emptyItem);
      setVisible(false);
    }
  }, [error]);

  return(
    <>
      <Toast ref={toast} />
      <Dialog header="Item" visible={visible} onHide={() => setVisible(false)} footer={footerContent}>
        <section className="flex flex-column gap-2">
          {
            inputs.map((props: any, key:number) => (
              <InputTypeText 
                props={props} 
                key={key} 
                value={value} 
                setValue={setValue} 
                errorMessage={error[props.name]} 
              />
            ))
          }
        </section>
      </Dialog>
    </>
  )
}

export default ItemDialog;
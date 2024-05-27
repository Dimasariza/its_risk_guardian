"use client";

import InputTypeText from "@/fragments/input-type-text";
import { ItemService } from "@/service/ItemService";
import { IAssetEquipment } from "@/types/assetEquipment";
import { IAssetItem } from "@/types/assetItem";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";

function EquipmentDialog({visible, setVisible} : any) {
  const emptyEquipment: IAssetEquipment = {
    tagOfEquipment: "",
    nameOfEquipment: ""
  }

  const toast = useRef<any>(null);
  const [value, setValue] = useState<IAssetEquipment>(emptyEquipment);
  const [error, setError] = useState<IAssetEquipment>(emptyEquipment);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const inputs = [
    { 
      name: "tagOfEquipment",
      type: "text",
      placeholder: "Tag of Equipment",
      label: "Tag of Equipment",
      required: true,
      autoFocus: true,
      className: "col",
    },
    { 
      name: "nameOfEquipment",
      type: "text",
      placeholder: "Name Of Equipment",
      label: "Name of Equipment",
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

  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState<IAssetItem | any>([]);

  useEffect(() => {
    ItemService.getItem()
    .then(res => {
      setItems(res);
    })
    .catch(err => console.log(err))
  }, []);

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
      setValue(emptyEquipment);
      setVisible(false);
    }
  }, [error]);

  return (
    <>
      <Dialog header="Equipment" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
        <section className="grid gap-2 m-2">
          <label htmlFor="equipment" className="col-6">Item</label>
          <Dropdown id="equipment" value={selectedItem} onChange={(e) => setSelectedItem(e.value)} options={items} optionLabel="nameOfItem" placeholder="Select an Item" className="w-50" />

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

export default EquipmentDialog;
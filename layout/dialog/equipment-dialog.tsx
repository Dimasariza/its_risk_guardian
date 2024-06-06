'use client';

import InputTypeText from '@/fragments/input-type-text';
import { AssetEquipmentService } from '@/service/assets/AssetEquipmentService';
import { AssetItemService } from '@/service/assets/AssetItemService';
import { IAssetEquipment } from '@/types/assetEquipment';
import { IAssetItem } from '@/types/assetItem';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';

function EquipmentDialog({ visible, setVisible }: any) {
  const emptyEquipment: IAssetEquipment = {
    tagOfEquipment: '',
    nameOfEquipment: ''
  };

  const toast = useRef<any>(null);
  const [value, setValue] = useState<IAssetEquipment>(emptyEquipment);
  const [error, setError] = useState<IAssetEquipment>(emptyEquipment);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const inputs = [
    {
      name: 'tagOfEquipment',
      type: 'text',
      placeholder: 'Tag of Equipment',
      label: 'Tag of Equipment',
      required: true,
      autoFocus: true,
      className: 'col'
    },
    {
      name: 'nameOfEquipment',
      type: 'text',
      placeholder: 'Name Of Equipment',
      label: 'Name of Equipment',
      required: true,
      autoFocus: false,
      className: 'col'
    }
  ];

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setError(validate(value));
    setIsSubmit(true);
  };

  const validate = (formValue: any) => {
    const errors: IAssetItem | any = {};
    if (!formValue.nameOfEquipment) {
      errors.nameOfEquipment = 'Name of Equipment is required!';
    } else if (formValue.nameOfEquipment.length < 4) {
      errors.nameOfEquipment = 'Name of Equipment must be more than 4 characters';
    }

    if (!formValue.tagOfEquipment) {
      errors.tagOfEquipment = 'Tag of Equipment is required!';
    } else if (formValue.tagOfEquipment.length < 4) {
      errors.tagOfEquipment = 'Tag of Equipment must be more than 4 characters';
    }

    return errors;
  };

  const footerContent = (
    <div>
      <Button label="Cancel" icon="pi pi-check" onClick={() => setVisible((prev: any) => ({ ...prev, equipment: false }))} severity="danger" />
      <Button label="Save" icon="pi pi-times" onClick={handleSubmit} severity="success" />
    </div>
  );

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedEquipmentType, setselectedEquipmentType] = useState(null);
  const [items, setItems] = useState<IAssetItem | any>([]);
  const equipmentType = [
    {name: "FWKO Separator"}
  ]

  const handleSelectItem = (e: any) => {
    setValue((prev) => ({ ...prev, itemId: e.value.id }));
    setSelectedItem(e.value);
  };

  const handleSelectEquipmentType = (e: any) => {
    setValue((prev) => ({ ...prev, equipmentType: e.value }));
    setselectedEquipmentType(e.value)
  }

  useEffect(() => {
    AssetItemService.getItem()
      .then((res) => setItems(res))
      .catch((err) => console.log(err));
  }, [visible]);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      AssetEquipmentService.postItem(value)
        .then((res) => {
          toast.current.show({
            severity: 'success',
            summary: 'Data has been added',
            detail: `You add Equipment ${res.nameOfItem}`
          });
        })
        .catch((err) => console.log(err));
      setValue(emptyEquipment);
      setVisible((prev: any) => ({ ...prev, equipment: false }));
    }
  }, [error]);

  return (
    <>
      <Toast ref={toast} />
      <Dialog header="Equipment" visible={visible} style={{ minWidth: '30vw' }} onHide={() => setVisible((prev: any) => ({ ...prev, equipment: false }))} footer={footerContent}>
        <section className="flex flex-column gap-2">

          <div className='flex flex-column col p-1'>
            <label htmlFor="equipment" className='m-1'>Item</label>
            <div className='px-1'>
              <Dropdown id="equipment" value={selectedItem} onChange={handleSelectItem} options={items} optionLabel="nameOfItem" placeholder="Select an Item" />
              {error.equipment && <Message severity="error" text={error.equipment} />}
            </div>
          </div>

          <div className='flex flex-column col p-1'>
            <label htmlFor="equipmentType" className='m-1'>Equipment Type</label>
            <div className='px-1'>
              <Dropdown id="equipmentType" value={selectedEquipmentType} onChange={handleSelectEquipmentType} options={equipmentType} optionLabel="name" placeholder="Select Equipment Type" />
              {error.equipment && <Message severity="error" text={error.equipment} />}
            </div>
          </div>

          {inputs.map((props: any, key: number) => (
            <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
          ))}
        </section>
      </Dialog>
    </>
  );
}

export default EquipmentDialog;

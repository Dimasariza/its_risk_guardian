'use client';

import InputTypeText from '@/fragments/input-type-text';
import { RerenderMenu } from '@/redux/action/action';
import { AssetComponentService } from '@/service/assets/AssetComponentService';
import { AssetEquipmentService } from '@/service/assets/AssetEquipmentService';
import { IAssetComponent } from '@/types/assetComponent';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

function ComponentDialog({ visible, setVisible }: any) {
  const emptyComponent: IAssetComponent = {
    tagOfComponent: '',
    nameOfComponent: ''
  };

  const toast = useRef<any>(null);
  const [value, setValue] = useState<IAssetComponent>(emptyComponent);
  const [error, setError] = useState<IAssetComponent>(emptyComponent);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const inputs = [
    {
      name: 'tagOfComponent',
      type: 'text',
      placeholder: 'Tag of Component',
      label: 'Tag of Component',
      required: true,
      autoFocus: true,
      className: ''
    },
    {
      name: 'nameOfComponent',
      type: 'text',
      placeholder: 'Name Of Component',
      label: 'Name of Component',
      required: true,
      autoFocus: false,
      className: ''
    }
  ];

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setError(validate(value));
    setIsSubmit(true);
  };

  const validate = (formValue: any) => {
    const errors: IAssetComponent | any = {};
    if (!formValue.nameOfComponent) {
      errors.nameOfComponent = 'Name of Component is required!';
    } else if (formValue.nameOfComponent.length < 4) {
      errors.nameOfComponent = 'Name of Component must be more than 4 characters';
    }

    if (!formValue.tagOfComponent) {
      errors.tagOfComponent = 'Tag of Component is required!';
    } else if (formValue.tagOfComponent.length < 4) {
      errors.tagOfComponent = 'Tag of Component must be more than 4 characters';
    }

    return errors;
  };

  const footerContent = (
    <div>
      <Button label="Cancel" icon="pi pi-check" onClick={() => setVisible((prev: any) => ({ ...prev, component: false }))} severity="danger" />
      <Button label="Save" icon="pi pi-times" onClick={handleSubmit} severity="success" />
    </div>
  );

  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState<IAssetComponent | any>([]);
  const [selectedComponentType, setselectedComponentType] = useState(null);
  const componentType = [
    {name: "Filter"}
  ];

  const handleSelectItem = (e: any) => {
    setValue((prev) => ({ ...prev, equipmentId: e.value.id }));
    setSelectedItem(e.value);
  };

  const handleSelectComponentType = (e: any) => {
    setValue((prev) => ({ ...prev, componentType: e.value }));
    setselectedComponentType(e.value)
  }

  const dispatch = useDispatch();

  useEffect(() => {
    AssetEquipmentService.getItem()
      .then((res) => {
        setItems(res)
        dispatch(RerenderMenu());
      })
      .catch((err) => {
        toast.current.show({
          severity: 'danger',
          summary: 'Error',
          detail: `Failed to get Data.`
        });
      });
  }, [visible]);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      AssetComponentService.postItem(value)
        .then((res) => {
          toast.current.show({
            severity: 'success',
            summary: 'Data has been added',
            detail: `You add Component ${res.nameOfItem}`
          });
        })
        .catch((err) => console.log(err));
      setValue(emptyComponent);
      setVisible((prev: any) => ({ ...prev, component: false }));
    }
  }, [error]);

  return (
    <>
      <Toast ref={toast} />
      <Dialog header="Component" visible={visible} style={{ minWidth: '30vw' }} onHide={() => setVisible((prev: any) => ({ ...prev, component: false }))} footer={footerContent}>
        <section className="flex flex-column gap-2">

          <div className='flex flex-column col p-1'>
            <label htmlFor="equipment" className='m-1'>Equipment</label>
            <div className='px-1'>
              <Dropdown id="equipment" value={selectedItem} onChange={handleSelectItem} options={items} optionLabel="nameOfEquipment" placeholder="Select an Equipment" />
              {error.equipment && <Message severity="error" text={error.equipment} />}
            </div>
          </div>

          <div className='flex flex-column col p-1'>
            <label htmlFor="equipmentType" className='m-1'>Component Type</label>
            <div className='px-1'>
              <Dropdown id="equipmentType" value={selectedComponentType} onChange={handleSelectComponentType} options={componentType} optionLabel="name" placeholder="Select Component Type" />
              {error.equipment && <Message severity="error" text={error.equipment} />}
            </div>
          </div>

          {inputs.map((props: any, key: number) => (
            <InputTypeText 
              props={props} 
              key={key} 
              value={value} 
              setValue={setValue} 
              errorMessage={error[props.name]} 
            />
          ))}

        </section>
      </Dialog>
    </>
  );
}

export default ComponentDialog;

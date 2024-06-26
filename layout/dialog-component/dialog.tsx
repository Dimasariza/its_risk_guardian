'use client';

import InputTypeText from '@/fragments/input-type-text';
import { RerenderMenu } from '@/redux/action/action';
import { AssetComponentService } from '@/service/assets/component-service';
import { AssetEquipmentService } from '@/service/assets/equipment-service';
import { IAssetComponent } from '@/types/assetComponent';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import inputs from './inputs';
import validate from './validation';
import InputDropDown from '@/fragments/input-drop-down';
import InputCalendar from '@/fragments/input-calendar';

function ComponentDialog({ visible, setVisible }: any) {
  const emptyComponent: IAssetComponent = {
    comp_tagOfComponent: '',
    comp_nameOfComponent: '',
    comp_componentType: '',
    comp_equipmentId: ''
  };

  const toast = useRef<any>(null);
  const [value, setValue] = useState<IAssetComponent>(emptyComponent);
  const [error, setError] = useState<IAssetComponent>(emptyComponent);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setError(validate(value));
    setIsSubmit(true);
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
  const componentType = [{ name: 'Filter' }];

  const handleSelectItem = (e: any) => {
    setValue((prev) => ({ ...prev, comp_equipmentId: e.value.eq_id }));
    setSelectedItem(e.value);
  };

  const handleSelectComponentType = (e: any) => {
    setValue((prev) => ({ ...prev, comp_componentType: e.value.name }));
    setselectedComponentType(e.value);
  };

  useEffect(() => {
    AssetEquipmentService.fetchData()
      .then((res) => {
        setItems(res.data);
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

  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.AuthReducer);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      AssetComponentService.postData({...value, comp_userId: data.user.user_id})
        .then((res) => {
          dispatch(RerenderMenu());

          toast.current.show({
            severity: 'success',
            summary: 'Data has been added',
            detail: `You add Component ${value.comp_nameOfComponent}`
          });
        })
        .catch((err) => console.log(err));
      setValue(emptyComponent);
      setVisible((prev: any) => ({ ...prev, component: false }));
    }
  }, [error]);

  return (
    <>
      <Toast ref={toast} position="bottom-right"/>
      <Dialog header="Component" visible={visible} style={{ minWidth: '30vw' }} onHide={() => setVisible((prev: any) => ({ ...prev, component: false }))} footer={footerContent}>
        <section className="flex flex-column gap-2">
          <div className="flex flex-column col p-1">
            <label htmlFor="equipment" className="m-1">
              Equipment
            </label>
            <div className="px-1">
              <Dropdown id="equipment" value={selectedItem} onChange={handleSelectItem} options={items} optionLabel="eq_nameOfEquipment" placeholder="Select an Equipment" />
              {error.equipment && <Message severity="error" text={error.equipment} />}
            </div>
          </div>

          <div className="flex flex-column col p-1">
            <label htmlFor="equipmentType" className="m-1">
              Component Type
            </label>
            <div className="px-1">
              <Dropdown id="equipmentType" value={selectedComponentType} onChange={handleSelectComponentType} options={componentType} optionLabel="name" placeholder="Select Component Type" />
              {error.equipment && <Message severity="error" text={error.equipment} />}
            </div>
          </div>

          {inputs.map((props: any, key: number) => (
            <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
          ))}

          {/* {inputs.map((props: any, key: number) => {
              if(props.type == "text") {
                  return <InputTypeText 
                      props={props} 
                      key={key} 
                      value={value} 
                      setValue={setValue} 
                      errorMessage={error[props.name]} 
                  />
              } else if (props.type == "calendar") {
                  return <InputCalendar 
                      props={props} 
                      key={key} 
                      value={value} 
                      setValue={setValue} 
                      errorMessage={error[props.name]} 
                  />
              } else if (props.type == "drop-down") {
                  return <InputDropDown
                      props={props} 
                      key={key} 
                      value={value} 
                      setValue={setValue} 
                      errorMessage={error[props.name]} 
                  />
              }
          })} */}
        </section>
      </Dialog>
    </>
  );
}

export default ComponentDialog;

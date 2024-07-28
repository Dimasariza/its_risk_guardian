'use client';

import InputTypeText from '@/app/(main)/uikit/input/input-type-text';
import { AssetEquipmentService } from '@/service/assets/equipment-service';
import { AssetItemService } from '@/service/assets/item-service';
import { IAssetEquipment } from '@/types/assetEquipment';
import { IAssetItem } from '@/types/assetItem';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import inputs from './inputs';
import validate from './validation';
import { useDispatch, useSelector } from 'react-redux';
import { RerenderMenu } from '@/redux/action/action';

function SystemDialog({nodes, editNodes, setEditNodes, visible, setVisible} : any) {
  const emptyEquipment: IAssetEquipment = {
    eq_tagOfEquipment: '',
    eq_nameOfEquipment: ''
  };

  const toast = useRef<any>(null);
  const [value, setValue] = useState<IAssetEquipment>(emptyEquipment);
  const [error, setError] = useState<IAssetEquipment>(emptyEquipment);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setError(validate(value));
    setIsSubmit(true);
  };

  const footerContent = (
    <div>
      <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible((prev: any) => ({...prev, system: false}))} severity="danger" />
      <Button label="Save" icon="pi pi-check" onClick={handleSubmit} severity="success" />
    </div>
  );

  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState<IAssetItem | any>([]);

  const handleSelectItem = (e: any) => {
    setValue((prev) => ({ ...prev, eq_itemId: e.value.item_id }));
    setSelectedItem(e.value);
  };

  useEffect(() => {
    const allSystem = nodes.map((i: any) => i.data)
    const system = allSystem.find((i: any) => i.item_id == editNodes.eq_itemId)
    setItems(allSystem)
    setValue(editNodes)
    setSelectedItem(system)
  }, [visible]);

  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.AuthReducer);

  useEffect(() => {
    if (Object.keys(error).length !== 0 && !isSubmit) return

    if(!Object.keys(editNodes).length) {
      AssetEquipmentService.postData({...value, eq_userId: data.user.user_id})
      .then((res) => {
        dispatch(RerenderMenu());
        toast.current.show({
          severity: 'success',
          summary: 'Data has been added',
          detail: `You add Equipment ${value.nameOfItem}`
        });
      })
      .catch((err) => {
        toast.current.show({
          severity: 'danger',
          summary: 'Data failed to added.',
          detail: `Add equipment failed`
        });
      });
    }

    else if(Object.keys(editNodes).length) {
      AssetEquipmentService.updateData(value)
      .then((res) => {
        dispatch(RerenderMenu());
        toast.current.show({
          severity: 'success',
          summary: 'Data has been added',
          detail: `You add System ${value.nameOfItem}`
        });
      })
      .catch((err) => {
        toast.current.show({
          severity: 'danger',
          summary: 'Data failed to updated.',
          detail: `Add System failed`
        });
      });
    }

    setValue(emptyEquipment);
    setVisible((prev: any) => ({...prev, system: false}));
      
  }, [error]);

  const openDialog = () => {
    setEditNodes({})
    setVisible((prev: any) => ({...prev, system: true})); 
  }

  return (
    <>
      <Toast ref={toast} position="bottom-right"/>
      <Button label="Add System" onClick={openDialog} />
      <Dialog header="System" visible={visible} style={{ minWidth: '20%' }} onHide={() => setVisible((prev: any) => ({...prev, system: false}))} footer={footerContent}>
        <section className="flex flex-column gap-2">
          <div className="flex flex-column col p-1">
            <label htmlFor="equipment" className="m-1">
              Plan
            </label>
            <div className="px-1">
              <Dropdown id="equipment" value={selectedItem} onChange={handleSelectItem} options={items} optionLabel="item_nameOfItem" placeholder="Select a Plan" />
              {error.equipment && <Message severity="error" text={error.equipment} />}
            </div>
          </div>

          <div className="flex flex-column col p-1">
            <label htmlFor="equipmentType" className="m-1">
              System Type
            </label>
            <div className="px-1">
            </div>
          </div>

          {
            inputs.map((props: any, key: number) => (
              <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
            ))
          }
        </section>
      </Dialog>
    </>
  );
}

export default SystemDialog;

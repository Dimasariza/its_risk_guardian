'use client';

import InputTypeText from '@/app/(main)/uikit/input/input-type-text';
import { RerenderMenu } from '@/redux/action/action';
import { AssetItemService } from '@/service/assets/item-service';
import { IAssetItem } from '@/types/assetItem';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import inputs from './inputs';
import validate from './validation';

function PlantDialog({editNodes, setEditNodes, visible, setVisible} : any) {
  const emptyItem: IAssetItem = {
    item_tagOfItem: '',
    item_nameOfItem: ''
  };

  const toast = useRef<any>(null);
  const [value, setValue] = useState<IAssetItem | any>(emptyItem);
  const [error, setError] = useState<IAssetItem>(emptyItem);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setError(validate(value));
    setIsSubmit(true);
  };

  const footerContent = (
    <div>
      <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible((prev: any) => ({...prev, plant: false}))} severity="danger" />
      <Button label="Save" icon="pi pi-check" onClick={handleSubmit} severity="success" />
    </div>
  );

  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.AuthReducer);

  useEffect(() => {
    setValue(editNodes)
  }, [visible])

  useEffect(() => {
    if (Object.keys(error).length !== 0 && !isSubmit) return

    if( !Object.keys(editNodes).length ) {
      AssetItemService.postData({...value, item_userId: data.user.user_id})
      .then((res) => {
        dispatch(RerenderMenu());
        toast.current.show({
          severity: 'success',
          summary: 'Data has been added',
          detail: `You add item ${value.item_nameOfItem}`
        });
      })
      .catch((err) => {
        toast.current.show({
          severity: 'error',
          summary: 'Failed',
          detail: `Plant failed to added`
        });
      });
    }
    else if( Object.keys(editNodes).length ) {
      AssetItemService.updateData(value)
      .then((res) => {
        dispatch(RerenderMenu());
        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: `Plant ${value.item_nameOfItem} has been added`
        });
      })
      .catch((err) => {
        toast.current.show({
          severity: 'error',
          summary: 'Failed',
          detail: `Plant failed to updated`
        });
      });
    }
    setValue(emptyItem);
    setVisible((prev: any) => ({...prev, plant: false}))

  }, [error]);

  const openDialog = () => {
    setEditNodes({})
    setVisible((prev: any) => ({...prev, plant: true})); 
  }

  return (
    <>
      <Toast ref={toast} position="bottom-right"/>
      <Button label="Add Plant" onClick={openDialog} />
      <Dialog header="Plant" visible={visible} style={{ minWidth: '20%' }} onHide={() => setVisible((prev: any) => ({...prev, plant: false}))} footer={footerContent}>
        <section className="">
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

export default PlantDialog;

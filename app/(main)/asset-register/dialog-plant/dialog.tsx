'use client';

import InputTypeText from '@/app/(main)/uikit/input-type-text';
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

function ItemDialog() {
  const emptyItem: IAssetItem = {
    item_tagOfItem: '',
    item_nameOfItem: ''
  };

  const toast = useRef<any>(null);
  const [value, setValue] = useState<IAssetItem>(emptyItem);
  const [error, setError] = useState<IAssetItem>(emptyItem);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [visible, setVisible] = useState(false)

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setError(validate(value));
    setIsSubmit(true);
  };

  const footerContent = (
    <div>
      <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible(false)} severity="danger" />
      <Button label="Save" icon="pi pi-check" onClick={handleSubmit} severity="success" />
    </div>
  );

  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.AuthReducer);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      AssetItemService.postData({...value, item_userId: data.user.user_id})
        .then((res) => {
          dispatch(RerenderMenu());

          toast.current.show({
            severity: 'success',
            summary: 'Data has been added',
            detail: `You add item ${value.item_nameOfItem}`
          });
        })
        .catch((err) => console.log(err));
      setValue(emptyItem);
      setVisible(false);
    }
  }, [error]);

  return (
    <>
      <Toast ref={toast} position="bottom-right"/>
      <Button label="Add Plant" onClick={() => { setVisible(true) }} />
      <Dialog header="Plant" visible={visible} style={{ minWidth: '30vw' }} onHide={() => setVisible(false)} footer={footerContent}>
        <section className="flex flex-wrap flex-column">
          {inputs.map((props: any, key: number) => (
            <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
          ))}
        </section>
      </Dialog>
    </>
  );
}

export default ItemDialog;

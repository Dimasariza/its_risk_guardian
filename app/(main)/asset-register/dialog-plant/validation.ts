import { IAssetItem } from '@/types/assetItem';

const validate = (formValue: any) => {
  const errors: IAssetItem | any = {};
  if (!formValue.item_nameOfItem) {
    errors.item_nameOfItem = 'Name of Item is required!';
  } else if (formValue.item_nameOfItem.length < 4) {
    errors.item_nameOfItem = 'Name of Item must be more than 4 characters';
  }

  if (!formValue.item_tagOfItem) {
    errors.item_tagOfItem = 'Tag of Item is required!';
  } else if (formValue.item_tagOfItem.length < 4) {
    errors.item_tagOfItem = 'Tag of Item must be more than 4 characters';
  }

  return errors;
};

export default validate;

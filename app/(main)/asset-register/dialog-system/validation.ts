import { IAssetItem } from '@/types/assetItem';

const validate = (formValue: any) => {
  const errors: IAssetItem | any = {};
  if (!formValue.eq_nameOfEquipment) {
    errors.eq_nameOfEquipment = 'Name of Equipment is required!';
  } else if (formValue.eq_nameOfEquipment.length < 4) {
    errors.eq_nameOfEquipment = 'Name of Equipment must be more than 4 characters';
  }

  if (!formValue.eq_tagOfEquipment) {
    errors.eq_tagOfEquipment = 'Tag of Equipment is required!';
  } else if (formValue.eq_tagOfEquipment.length < 4) {
    errors.eq_tagOfEquipment = 'Tag of Equipment must be more than 4 characters';
  }

  return errors;
};

export default validate;

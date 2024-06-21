import { IAssetItem } from "@/types/assetItem";

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

export default validate;
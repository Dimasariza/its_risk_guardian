import { IAssetComponent } from "@/types/assetComponent";

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

export default validate;
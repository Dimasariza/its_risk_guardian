import { IAssetComponent } from "@/types/assetComponent";

const validate = (formValue: any) => {
    const errors: IAssetComponent | any = {};
    if (!formValue.comp_nameOfComponent) {
      errors.comp_nameOfComponent = 'Name of Component is required!';
    } else if (formValue.comp_nameOfComponent.length < 4) {
      errors.comp_nameOfComponent = 'Name of Component must be more than 4 characters';
    }

    if (!formValue.comp_tagOfComponent) {
      errors.comp_tagOfComponent = 'Tag of Component is required!';
    } else if (formValue.comp_tagOfComponent.length < 4) {
      errors.comp_tagOfComponent = 'Tag of Component must be more than 4 characters';
    }

    return errors;
};

export default validate;
const validate = (formValue: any) => {
  const {
    gData_setPressurePsig
  } = formValue

  const errors: any = {};
  const regex = new RegExp(/^-?\d+(\.\d{1,10})?$/)

  const numberOrFloatMsg = 'Value must be a number or decimal type. Use dot (.) to separate number.'

  if (gData_setPressurePsig && !regex.test(gData_setPressurePsig)) {
    errors.gData_setPressurePsig = numberOrFloatMsg;
  } 

  return errors;
};

export default validate;
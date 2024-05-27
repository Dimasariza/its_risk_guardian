import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { Fragment } from "react";

function InputTypeText({props, value, setValue, errorMessage} : any) {
  const { name, label } = props;

  return(
    <Fragment>
      <label htmlFor={name} className="col-6">{ label }</label>
      <InputText id={name} {...props} value={value[name]} onChange={(e) => setValue((prev: any) => ({...prev, [name]: e.target.value}))} />
      { errorMessage && <Message severity="error" text={errorMessage} /> }
    </Fragment>
  ) 
}

export default InputTypeText;
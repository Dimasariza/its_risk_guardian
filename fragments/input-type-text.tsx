import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

function InputTypeText({ props, value, setValue, errorMessage, handleOnChange = ()=>{} }: any) {
  const { name, placeholder } = props;

  return (
    <div className="p-2" style={{width: 235}}>
      <label htmlFor={name} className="m-1"> {placeholder} </label>
      <br></br>
      <InputText id={name} {...props} value={value[name] ?? ''} onChange={(e) => { 
        handleOnChange(name, e)
        setValue((prev: any) => ({ ...prev, [name]: e.target.value })) 
      }} />
      {errorMessage && <Message severity="error" text={errorMessage} />}
    </div>
  );
}

export default InputTypeText;

import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Fragment } from 'react';

function InputTypeText({ props, value, setValue, errorMessage }: any) {
  const { name, placeholder } = props;

  return (
    <div className='flex flex-column col p-1'>
      <label htmlFor={name} className="m-1">{placeholder}</label>
      <div className='px-1'>
        <InputText id={name} {...props} value={value[name] ?? ""} onChange={(e) => setValue((prev: any) => ({ ...prev, [name]: e.target.value }))} />
        {errorMessage && <Message severity="error" text={errorMessage} />}
      </div>
    </div>
  );
}

export default InputTypeText;

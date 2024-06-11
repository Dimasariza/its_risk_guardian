import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

function InputTypeText({ props, value, setValue, errorMessage }: any) {
  const { name, placeholder } = props;

  return (
    <div className='p-2 lg:col-4 md:col-6 sm:col-12'>
      <label htmlFor={name} className="m-1">{placeholder}</label>
      <div className='p-1'>
        <InputText id={name} {...props} value={value[name] ?? ""} onChange={(e) => setValue((prev: any) => ({ ...prev, [name]: e.target.value }))} />
        {errorMessage && <Message severity="error" text={errorMessage} />}
      </div>
    </div>
  );
}

export default InputTypeText;

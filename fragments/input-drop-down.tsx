import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';

function InputDropDown({ props, value, setValue, errorMessage }: any) {
  const { name, placeholder, options } = props;

  return (
    <div className="p-2" style={{width: 235}}>
      <label htmlFor={name} className="m-1"> {placeholder} </label>
      <br />
      <Dropdown id={name} {...props} value={value[name] ?? ''} onChange={(e) => setValue((prev: any) => ({ ...prev, [name]: e.target.value }))} options={options} optionLabel={name} placeholder={placeholder} />
      {errorMessage && <Message severity="error" text={errorMessage} />}
    </div>
  );
}

export default InputDropDown;

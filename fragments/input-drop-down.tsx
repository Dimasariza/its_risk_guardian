import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';

function InputDropDown({ props, value, setValue, errorMessage }: any) {
  const { name, placeholder, options } = props;

  return (
    <div className='flex flex-column p-1 flex-auto'>
      <label htmlFor={name} className="m-1">{placeholder}</label>
      <div className='px-1'>
        <div className='w-full bg-primary'>
        <Dropdown 
          {...props}
          id={name} 
          value={value[name] ?? ""} 
          onChange={(e) => setValue((prev: any) => ({ ...prev, [name]: e.target.value }))}
          options={options} 
          optionLabel={name} 
          placeholder={placeholder} 
        />
        </div>
        {errorMessage && <Message severity="error" text={errorMessage} />}
      </div>
    </div>
  );
}

export default InputDropDown;

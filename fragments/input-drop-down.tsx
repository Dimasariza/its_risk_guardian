import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';

function InputDropDown({ props, value, setValue, errorMessage }: any) {
  const { name, placeholder, options } = props;

  return (
    <div className='p-2 flex flex-column lg:col-4 md:col-6 sm:col-12'>
      <label htmlFor={name} className="m-1">{placeholder}</label>
      {/* <div className='px-1'> */}
        <Dropdown 
          {...props}
          id={name} 
          value={value[name] ?? ""} 
          onChange={(e) => setValue((prev: any) => ({ ...prev, [name]: e.target.value }))}
          options={options} 
          optionLabel={name} 
          placeholder={placeholder} 
        />
        {errorMessage && <Message severity="error" text={errorMessage} />}
      {/* </div> */}
    </div>
  );
}

export default InputDropDown;

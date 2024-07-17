import { Calendar } from 'primereact/calendar';
import { Message } from 'primereact/message';

function InputCalendar({ props, value, setValue, errorMessage, handleOnChange = (e: any) => {} }: any) {
  const { name, placeholder } = props;

  return (
    <div className="p-2" style={{width: 305}}>
      <label htmlFor={name} className="m-1"> {placeholder} </label>
      <br />
      <div className="px-1">
        <Calendar id={name} {...props} value={value[name] ?? ''} onChange={(e) => {
          
          setValue((prev: any) => ({ ...prev, [name]: e.target.value }))
          handleOnChange(name, e)
        }} />
        {errorMessage && <Message severity="error" text={errorMessage} />}
      </div>
    </div>
  );
}

export default InputCalendar;

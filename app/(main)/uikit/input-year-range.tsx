import { Calendar } from 'primereact/calendar';
import { Message } from 'primereact/message';

function InputYearRange({ props, value, setValue, errorMessage }: any) {
  const { name, placeholder } = props;

  return (
    <div className="p-2" style={{width: 235}}>
      <label htmlFor={name} className="m-1">
        {placeholder}
      </label>
      <div className="px-1">
        <Calendar id={name} {...props} value={value[name] ?? ''} onChange={(e) => setValue((prev: any) => ({ ...prev, [name]: e.target.value }))} view="year" dateFormat="yy" selectionMode="range" readOnlyInput hideOnRangeSelection />
        {errorMessage && <Message severity="error" text={errorMessage} />}
      </div>
    </div>
  );
}

export default InputYearRange;

import InputCalendar from '@/fragments/input-calendar';
import InputDropDown from '@/fragments/input-drop-down';
import InputTypeText from '@/fragments/input-type-text';
import { getThinning } from '@/service/calculation/pofRBIDate-service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { inputs } from './inputs';

function DFThinning() {
  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any>({});

  const data = useSelector((state: any) => state.Reducer);

  useEffect(() => {
    if (data.menu.comp_id) {
      getThinning(data.menu.comp_id).then((res) => {
        setValue(res);
      });
    }
  }, [data]);

  return (
    <>
      <section className="flex flex-wrap lg:column-gap-5">
        {inputs.map((props: any, key: number) => {
          if (props.type == 'text') {
            return <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />;
          } else if (props.type == 'calendar') {
            return <InputCalendar props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />;
          } else if (props.type == 'drop-down') {
            return <InputDropDown props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />;
          }
        })}
      </section>
    </>
  );
}

export default DFThinning;

import InputCalendarYear from '@/fragments/input-year-range';
import InputTypeText from '@/fragments/input-type-text';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InputYearRange from '@/fragments/input-year-range';
import { getExternalCorrosion } from '@/service/calculation/pofRBIDate-service';
import { inputs } from './inputs';

function DFExternalCorrosion() {
  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any>({});

  const data = useSelector((state: any) => state.Reducer);
  const edit = useSelector((state: any) => state.EditReducer);

  useEffect(() => {
    if (data.menu?.comp_id) {
      getExternalCorrosion(data.menu.id).then((res: any) => {
        setValue(res);
      });
    }
  }, [data]);

  return (
    <>
      <section className="grid m-2">
        {inputs.map((props: any, key: number) => {
          if (props.type == 'text') {
            return <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />;
          } else if (props.type == 'year-range') {
            return <InputYearRange props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />;
          }
        })}
      </section>
    </>
  );
}

export default DFExternalCorrosion;

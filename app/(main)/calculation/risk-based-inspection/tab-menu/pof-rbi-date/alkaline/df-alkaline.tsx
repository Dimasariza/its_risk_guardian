import InputTypeText from '@/fragments/input-type-text';
import { getAlkaline } from '@/service/calculation/pofRBIDate-service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { inputs } from './inputs';

function DFAlkalineCorrosion() {
  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any>({});

  const data = useSelector((state: any) => state.Reducer);

  useEffect(() => {
    if (data.menu?.comp_id) {
      getAlkaline(data.menu.id).then((res: any) => {
        setValue(res);
      });
    }
  }, [data]);

  return (
    <>
      <section className="grid m-2">
        {inputs.map((props: any, key: number) => (
          <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
        ))}
      </section>
    </>
  );
}

export default DFAlkalineCorrosion;

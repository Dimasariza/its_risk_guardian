import InputTypeText from '@/fragments/input-type-text';
import { getValue } from '@/service/calculation/pofRBIDate-service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { inputDFTotal, inputHeadSection, inputsGFF } from './inputs';

function POFValue() {
  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any>({});

  const data = useSelector((state: any) => state.Reducer);

  useEffect(() => {
    if (data.menu.comp_id) {
      getValue(data.menu.id).then((res: any) => {
        setValue(res);
      });
    }
  }, [data]);

  return (
    <>
      <section className="m-2">
        <h5>GFF</h5>
        <div className="grid m-2">
          {inputsGFF.map((props: any, key: number) => (
            <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
          ))}
        </div>

        <h5>DF Total</h5>
        <div className="grid m-2">
          {inputDFTotal.map((props: any, key: number) => (
            <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
          ))}
        </div>

        <h5>Management System Factor</h5>

        <h5>POF Total</h5>
        <div className="grid m-2">
          {inputHeadSection.map((props: any, key: number) => (
            <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
          ))}
        </div>
      </section>
    </>
  );
}

export default POFValue;

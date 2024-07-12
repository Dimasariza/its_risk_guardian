import InputTypeText from '@/fragments/input-type-text';
import { getValue } from '@/service/calculation/pofRBIDate-service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { inputDFTotal, inputHeadSection, inputsGFF } from './inputs';
import GenericFailureFrequency from './genericFailureFreq';
import InputValueOnly from '@/fragments/inputValueOnly';

function POFValue() {
  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any>({});

  const [generalData, setGeneralData] = useState()
  const [exCor, setExCor] = useState()
  const [alkaline, setAlkaline] = useState()

  const data = useSelector((state: any) => state.Reducer);

  useEffect(() => {
    if (data.menu?.comp_id) {
      getValue(data.menu.id).then((res: any) => {
        setValue(res);
      });
    }
  }, [data]);

  return (
    <>
      <section className="p-3">
        <div className='mt-5'>
          <GenericFailureFrequency />
        </div>
        <div className='flex w-full flex-wrap mt-5'>
          {
            [
              {
                label: "Shell Section DF Total Value",
                value: null
              },
              {
                label: "Head Section DF Total Value",
                value: null
              },
              {
                label: "Management System Factor",
                value: null
              },
              {
                label: "Shell Section Probability of Failure",
                value: null
              },
              {
                label: "Head Section Probability of Failure",
                value: null
              },
            ].map(({label, value} : any) => <InputValueOnly label={label} value={!(value == null || Number.isNaN(value)) ? value : "-"} key={label} />)
          }
        </div>

      </section>
    </>
  );
}

export default POFValue;

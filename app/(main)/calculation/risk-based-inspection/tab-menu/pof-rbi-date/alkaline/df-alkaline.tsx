import InputTypeText from '@/fragments/input-type-text';
import { getAlkaline } from '@/service/calculation/pofRBIDate-service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { inputs } from './inputs';
import SuscepbilityCrackingTable from './suscepbilityCrackingTable';
import InputValueOnly from '@/fragments/inputValueOnly';
import InspectionEffectivenessTable from './inspectionEffectivenessTable';

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
        <div className='flex flex-wrap lg:column-gap-5 mt-5'>
          {inputs.map((props: any, key: number) => (
            <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
          ))}
        </div>
        <div className='flex w-full flex-wrap flex-column gap-2 mt-5'>
          <SuscepbilityCrackingTable />
          <InspectionEffectivenessTable />
        </div>
        <div className='flex w-full flex-wrap mt-5'>
          <InputValueOnly label="Age" value="test"/>
          <InputValueOnly label="Shell DF ACSCC" value="test"/>
          <InputValueOnly label="Head DF ACSCC" value="test"/>
        </div>
      </section>
    </>
  );
}

export default DFAlkalineCorrosion;

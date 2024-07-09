import InputTypeText from '@/fragments/input-type-text';
import { getAlkaline } from '@/service/calculation/pofRBIDate-service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { inputs } from './inputs';
import SuscepbilityCrackingTable from './suscepbilityCrackingTable';
import InputValueOnly from '@/fragments/inputValueOnly';
import InspectionEffectivenessTable from './inspectionEffectivenessTable';
import { Checkbox } from '@mui/material';

function DFAlkalineCorrosion() {
  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any>({});
  const [checked, setChecked] = useState<any>({})

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
          {
            inputs.map((props: any, key: number) => (
              <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
            ))
          }
        </div>
        <div className='flex w-full flex-wrap flex-column gap-2 mt-5'>
          <SuscepbilityCrackingTable />
          <InspectionEffectivenessTable />
        </div>
        <div className='mt-3'>
          <span>Shell subjects to PWHT</span>
          <Checkbox style={{width: 235}} onChange={(e: any) => setChecked(e.checked)} checked={checked}></Checkbox>
        </div>
        <div className='mt-3'>
          <span>Head subjects to PWHT</span>
          <Checkbox style={{width: 235}} onChange={(e: any) => setChecked(e.checked)} checked={checked}></Checkbox>
        </div>
        <div className='flex w-full flex-wrap mt-5'>
          {
            [
              {
                label: "Age",
                value: null
              },
              {
                label: "Shell DF ACSCC",
                value: null
              },
              {
                label: "Head DF ACSCC",
                value: null
              }
            ].map(({value, label}: any) => <InputValueOnly label={label} value={value || "-"} key={label} />)
          }
        </div>
      </section>
    </>
  );
}

export default DFAlkalineCorrosion;

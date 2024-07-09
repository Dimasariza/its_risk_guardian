import InputTypeText from '@/fragments/input-type-text';
import { getAlkaline, getExternalCorrosion, getThinning } from '@/service/calculation/pofRBIDate-service';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { inputs } from './inputs';
import SuscepbilityCrackingTable from './suscepbilityCrackingTable';
import InputValueOnly from '@/fragments/inputValueOnly';
import InspectionEffectivenessTable from './inspectionEffectivenessTable';
import { Checkbox } from '@mui/material';
import { GeneralDataService } from '@/service/calculation/generalData-service';

function DFAlkalineCorrosion() {
  const [value, setValue] = useState<any>({});
  const [checked, setChecked] = useState<any>({})
  const [error, setError] = useState<any>({});
  const [generalData, setGeneralData] = useState<any>({})
  const [thinning, setThinning] = useState<any>()
  const [exCor, setExCor] = useState<any>()

  const data = useSelector((state: any) => state.Reducer);

  useEffect(() => {
    const componentId = data.menu?.comp_id
    if (componentId) {
      getAlkaline(componentId).then((res: any) => {
        setValue(res);
        console.log(res)
      });
      GeneralDataService.fetchData(componentId)
      .then((res: any) => {
        setGeneralData(res)
      })
      getThinning(componentId)
      .then((res: any) => {
        setThinning(res)
      })
      getExternalCorrosion(componentId)
      .then((res: any) => {
        setExCor(res)
      })
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
        
        <div className='flex w-full flex-wrap mt-5 gap-5'>
          <div className='flex gap-2 flex-column'>
            <SuscepbilityCrackingTable />
            <InspectionEffectivenessTable />
          </div>
          <div>
            <div>
              <span>Shell subjects to PWHT</span>
              <Checkbox name='rbiAlkaline_shellPwht' onChange={(e: any) => setChecked((prev: any) => ({...prev, rbiAlkaline_shellPwht: e.checked}))} checked={checked.rbiAlkaline_shellPwht}></Checkbox>
            </div>
            <div>
              <span>Head subjects to PWHT</span>
              <Checkbox name='rbiAlkaline_headPwht' onChange={(e: any) => setChecked((prev: any) => ({...prev, rbiAlkaline_headPwht: e.checked}))} checked={checked.rbiAlkaline_headPwht}></Checkbox>
            </div>
          </div>
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

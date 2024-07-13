/* eslint-disable */

import InputTypeText from '@/fragments/input-type-text';
import { getAlkaline, getExternalCorrosion, getThinning } from '@/service/calculation/pofRBIDate-service';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { inputs } from './inputs';
import SuscepbilityCrackingTable from './suscepbilityCrackingTable';
import InputValueOnly from '@/fragments/inputValueOnly';
import { GeneralDataService } from '@/service/calculation/generalData-service';
import { Checkbox } from 'primereact/checkbox';
import BaseDamageFactorTable from './baseDamageFactor';
import InspectionEffectivenessTable from './inspectionEffectivenessTable';
import { calculateThinning } from '@/function/calcRBIThinningValue';
import IGeneralData from '@/types/IGeneralData';
import IRBIThinning from '@/types/IRBIThinning';
import { calculateAlkaline } from '@/function/calcRBIAlkalineValue';

function DFAlkalineCorrosion() {
  const [value, setValue] = useState<any>({});
  const [checked, setChecked] = useState<any>({})
  const [error, setError] = useState<any>({});
  const [generalData, setGeneralData] = useState<any>({})
  const [thinning, setThinning] = useState<any>({})
  const [exCor, setExCor] = useState<any>({})

  const { edit } = useSelector((state: any) => state.EditReducer);
  const data = useSelector((state: any) => state.Reducer);

  useEffect(() => {
    const componentId = data.menu?.comp_id
    if (!componentId) return 

    getAlkaline(componentId).then((res: any) => {
      setValue(res);
      setChecked((prev: any) => ({
        ...prev, 
        rbiAlkaline_headPwht: res.rbiAlkaline_headPwht,
        rbiAlkaline_shellPwht: res.rbiAlkaline_shellPwht
      }))
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
  }, [data]);

  const {
    age,
    shellPWHT,
    headPWHT
  } = calculateAlkaline({
    generalData,
    thinning,
    alkaline: value
  })

  return (
    <>
      <section className="grid m-2">
        <div className='flex flex-wrap lg:column-gap-5 mt-5'>
          {
            inputs.map((props: any, key: number) => (
              <InputTypeText props={{...props, disabled: !edit}} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
            ))
          }
        </div>
        
        <div className='flex w-full flex-wrap mt-5 gap-5'>
          <div className='flex gap-2 flex-column'>
            <SuscepbilityCrackingTable />
            <BaseDamageFactorTable />
            <InspectionEffectivenessTable />
          </div>
          <div className='gap-5 flex flex-column'>
            <div style={{width: "20rem"}} className='flex justify-content-between'>
              <span>Shell subjects to PWHT</span>
              <Checkbox name='rbiAlkaline_shellPwht' disabled={!edit} onChange={(e: any) => setChecked((prev: any) => ({...prev, rbiAlkaline_shellPwht: e.checked}))} checked={checked.rbiAlkaline_shellPwht}></Checkbox>
            </div>
            <div style={{width: "20rem"}} className='flex justify-content-between'>
              <span>Head subjects to PWHT</span>
              <Checkbox name='rbiAlkaline_headPwht' disabled={!edit} onChange={(e: any) => setChecked((prev: any) => ({...prev, rbiAlkaline_headPwht: e.checked}))} checked={checked.rbiAlkaline_headPwht}></Checkbox>
            </div>
          </div>
        </div>
        <div className='flex w-full flex-wrap mt-5'>
          {
            [
              {
                label: "Age",
                value: age
              },
              {
                label: "Shell DF ACSCC",
                value: shellPWHT.toFixed(4)
              },
              {
                label: "Head DF ACSCC",
                value: headPWHT.toFixed(4)
              }
            ].map(({value, label}: any) => <InputValueOnly label={label} value={value || "-"} key={label} />)
          }
        </div>
      </section>
    </>
  );
}

export default DFAlkalineCorrosion;

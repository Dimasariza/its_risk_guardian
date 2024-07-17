/* eslint-disable */

import InputTypeText from '@/fragments/input-type-text';
import { getAlkaline, getExternalCorrosion, getThinning, updateAlkaline } from '@/service/calculation/pofPlanDate-service';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { inputs } from './inputs';
import SuscepbilityCrackingTable from './suscepbilityCrackingTable';
import InputValueOnly from '@/fragments/inputValueOnly';
import { GeneralDataService } from '@/service/calculation/generalData-service';
import { Checkbox } from 'primereact/checkbox';
import BaseDamageFactorTable from './baseDamageFactor';
import InspectionEffectivenessTable, { inspection } from './inspectionEffectivenessTable';
import { calculateThinning } from '@/function/calcPlanThinningValue';
import IGeneralData from '@/types/IGeneralData';
import IPlanThinning from '@/types/IPlanThinning';
import { calculateAlkaline } from '@/function/calcPlanAlkalineValue';
import { Toast } from 'primereact/toast';

function DFAlkalineCorrosion() {
  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any>({});
  const [generalData, setGeneralData] = useState<any>({})
  const [thinning, setThinning] = useState<any>({})
  const [inspectionSelected, setInspectionSelected] = useState()
  const [exCor, setExCor] = useState<any>({})

  const data = useSelector((state: any) => state.Reducer);
  const toast = useRef<any>(null);
  let {edit, undoEdit} = useSelector((state: any) => state.EditReducer);

  const componentId = data.menu?.comp_id
  useEffect(() => {
    edit = true

    if (!componentId) return 
    getAlkaline(componentId).then((res: any) => {
      setValue(res);
      setInspectionSelected(inspection.find((i: any) => i.id == res.planAlkaline_inspection))
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

  useEffect(() => {
    if(!edit && !undoEdit) {
      updateAlkaline({
        ...value
        // inspection: inspectionSelected
      }, componentId)
      .then((res) => {
        toast.current.show({
          severity: 'success',
          summary: 'Data Updated',
          detail: `Your general data has been updated`
        });
      })
      .catch((err: any) => {
        toast.current.show({
          severity: 'error',
          summary: 'Data Failed to Update',
          detail: `Failed to updated your data`
        });
      })
    } 
  }, [edit])

  const {
    age,
    shellPWHT,
    headPWHT
  } = calculateAlkaline({
    generalData,
    thinning,
    alkaline: value
  })

  const componentType = data.menu?.comp_componentType

  return (
    <>
      <Toast ref={toast}  position="bottom-right" />

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
            <InspectionEffectivenessTable inspectionSelected={inspectionSelected} setInspectionSelected={setInspectionSelected} />
          </div>
          <div className='gap-5 flex flex-column'>
            {
              <div style={{width: "20rem"}} className='flex justify-content-between'>
                <span>{`${["Pipe"].includes(componentType) ? "" : "Shell"} DF ACSCC`} subjects to PWHT</span>
                <Checkbox name='planAlkaline_shellPwht' disabled={!edit} onChange={(e: any) => setValue((prev: any) => ({...prev, planAlkaline_shellPwht: e.checked}))} checked={value.planAlkaline_shellPwht}></Checkbox>
              </div>
            }
            {
              !["Pipe"].includes(componentType) &&
              <div style={{width: "20rem"}} className='flex justify-content-between'>
                <span>Head subjects to PWHT</span>
                <Checkbox name='planAlkaline_headPwht' disabled={!edit} onChange={(e: any) => setValue((prev: any) => ({...prev, planAlkaline_headPwht: e.checked}))} checked={value.planAlkaline_headPwht}></Checkbox>
              </div>
            }
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
                label: `${["Pipe"].includes(componentType) ? "" : "Shell"} DF ACSCC`,
                value: Number(shellPWHT)?.toFixed(4)
              },
              {
                label: "Head DF ACSCC",
                value: Number(headPWHT)?.toFixed(4),
                notView: ["Pipe"]
              }
            ].map(({label, value, notView} : any) => {
              if(!notView?.includes(componentType)) {
                return <InputValueOnly 
                  label={label} 
                  value={!(value == null || Number.isNaN(value)) ? value : "-"} 
                  key={label} 
                />
              }
            })
          }
        </div>
      </section>
    </>
  );
}

export default DFAlkalineCorrosion;

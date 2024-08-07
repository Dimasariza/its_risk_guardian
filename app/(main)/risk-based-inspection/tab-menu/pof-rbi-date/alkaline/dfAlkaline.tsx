/* eslint-disable */

import InputTypeText from '@/app/(main)/uikit/input/input-type-text';
import { getAlkaline, getExternalCorrosion, getThinning, updateAlkaline } from '@/service/calculation/pofRBIDate-service';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { inputs } from './inputs';
import SuscepbilityCrackingTable from './suscepbilityCrackingTable';
import InputValueOnly from '@/app/(main)/uikit/input/inputValueOnly';
import { GeneralDataService } from '@/service/calculation/generalData-service';
import { Checkbox } from 'primereact/checkbox';
import BaseDamageFactorTable from './baseDamageFactor';
import InspectionEffectivenessTable, { inspection } from './inspectionEffectivenessTable';
import { calculateThinning } from '@/function/calcRBIThinningValue';
import IGeneralData from '@/types/IGeneralData';
import IRBIThinning from '@/types/IRBIThinning';
import { calculateAlkaline } from '@/function/calcRBIAlkalineValue';
import { Toast } from 'primereact/toast';

function DFAlkalineCorrosion() {
  const [value, setValue] = useState<any>({});
  const [submit, setSubmit] = useState<any>({})
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
    Promise.all([
      GeneralDataService.fetchData(componentId),
      getAlkaline(componentId),
      getThinning(componentId),
      getExternalCorrosion(componentId)
    ])
    .then(([
      generalData,
      alkaline,
      thinning,
      exCor
    ]) => {
      setGeneralData(generalData)
      setValue(alkaline);
      setInspectionSelected(inspection.find((i: any) => i.id == alkaline.rbiAlkaline_inspection))
      setThinning(thinning)
      setExCor(exCor)
    })
  }, [data]);

  useEffect(() => {
    if(Object.keys(error).length === 0 && !edit && !undoEdit) {
      updateAlkaline(value, componentId)
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
  }, [edit, submit])

  const componentType = data.menu?.comp_componentType

  const {
    ageTimeInServiceTk,
    shellPWHT,
    headPWHT
  } = calculateAlkaline({
    generalData,
    thinning,
    alkaline: value,
    componentType
  })


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
            <InspectionEffectivenessTable inspectionSelected={inspectionSelected} setInspectionSelected={setInspectionSelected} setSubmit={setSubmit} />
          </div>
          <div className='gap-5 flex flex-column'>
            {
              <div style={{width: "20rem"}} className='flex justify-content-between'>
                <span>{`${["Pipe", "Tank"].includes(componentType) ? "" : "Shell"} DF ACSCC`} subjects to PWHT</span>
                <Checkbox name='rbiAlkaline_shellPwht' disabled={!edit} onChange={(e: any) => setValue((prev: any) => ({...prev, rbiAlkaline_shellPwht: e.checked}))} checked={value.rbiAlkaline_shellPwht}></Checkbox>
              </div>
            }
            {
            !["Pipe", "Tank"].includes(componentType) &&
            <div style={{width: "20rem"}} className='flex justify-content-between'>
              <span>Head subjects to PWHT</span>
              <Checkbox name='rbiAlkaline_headPwht' disabled={!edit} onChange={(e: any) => setValue((prev: any) => ({...prev, rbiAlkaline_headPwht: e.checked}))} checked={value.rbiAlkaline_headPwht}></Checkbox>
            </div>
            }
          </div>
        </div>
        <div className='flex w-full flex-wrap mt-5'>
          {
            [
              {
                label: "Age",
                value: Number(ageTimeInServiceTk).toFixed(4)
              },
              {
                label: `${["Pipe", "Tank"].includes(componentType) ? "" : "Shell"} DF ACSCC`,
                value: Number(shellPWHT).toFixed(4)
              },
              {
                label: "Head DF ACSCC",
                value: Number(headPWHT).toFixed(4),
                viewonly: ["Pipe", "Tank"]
              }
            ].map(({label, value, viewonly} : any) => {
              if(!viewonly?.includes(componentType)) {
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

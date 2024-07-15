import InputTypeText from '@/fragments/input-type-text';
import { getAlkaline, getExternalCorrosion, getThinning, getValue, updateValue } from '@/service/calculation/pofRBIDate-service';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import GenericFailureFrequency from './genericFailureFreq';
import InputValueOnly from '@/fragments/inputValueOnly';
import { calculateAlkaline } from '@/function/calcRBIAlkalineValue';
import { GeneralDataService } from '@/service/calculation/generalData-service';
import { gffTableValue } from './gffTableValue';
import { Toast } from 'primereact/toast';

function POFValue() {
  const [failureFrequency, setFailureFrequency] = useState<any>()
  const [value, setValue] = useState<any>({})
  const [error, setError] = useState<any>({});
  const [generalData, setGeneralData] = useState({})
  const [thinning, setThinning] = useState({})
  const [exCor, setExCor] = useState()
  const [alkaline, setAlkaline] = useState({})

  const data = useSelector((state: any) => state.Reducer);
  const toast = useRef<any>(null);
  let {edit, undoEdit} = useSelector((state: any) => state.EditReducer);

  const componentId = data.menu?.comp_id

  useEffect(() => {
    edit = true

    if (!componentId) return 

    GeneralDataService.fetchData(componentId)
    .then((res: any) => {
      setGeneralData(res)
    })

    getAlkaline(componentId).then((res: any) => {
      setAlkaline(res);
    });

    getThinning(componentId)
    .then((res: any) => {
      setThinning(res)
    })

    getExternalCorrosion(componentId)
    .then((res: any) => {
      setExCor(res)
    })

    getValue(componentId)
    .then((res) => {
      setValue(res)
      const failureFreq = gffTableValue.find(i => i.id == res.rbiValue_failureFrequency)
      setFailureFrequency(failureFreq)
    })
  }, [data]);

  
  useEffect(() => {
    if(Object.keys(error).length === 0 && !edit && !undoEdit) {
      updateValue(value, componentId)
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
  }, [edit, failureFrequency])

  const {
    shellBaseDF,
    headBaseDF,
    age,
    rbiShellSection,
    rbiHeadSection,
    shellPWHT,
    headPWHT
  } = calculateAlkaline({
    generalData,
    thinning,
    exCor,
    alkaline
  })

  const shellTotal = Math.max(shellBaseDF!, rbiShellSection!) + shellPWHT
  const headTotal = Math.max(headBaseDF!, rbiHeadSection!) + headPWHT

  return (
    <>
      <Toast ref={toast}  position="bottom-right" />

      <section className="p-3">
        <div className='flex flex-wrap lg:column-gap-3 mt-4'>
          <InputTypeText props={{
            name: 'rbiValue_FMS',
            type: 'text',
            placeholder: 'Management System Factor',
            label: 'Management System Factor',
            autoFocus: true,
            disabled: !edit
          }} value={value} setValue={setValue} />
        </div>
        <div className='mt-5'>
          <GenericFailureFrequency failureFrequency={failureFrequency} setFailureFrequency={setFailureFrequency} />
        </div>
        <div className='flex w-full flex-wrap mt-5'>
          {
            [
              {
                label: "Generic Failure Frequency",
                value: failureFrequency?.total
              },
              {
                label: "Shell Governing thinning damage factor",
                value: shellBaseDF?.toFixed(4)
              },
              {
                label: "Head Governing thinning damage factor",
                value: headBaseDF?.toFixed(4)
              },
              {
                label: "Shell Governing External damage factor",
                value: rbiShellSection?.toFixed(4)
              },
              {
                label: "Head Governing External damage factor",
                value: rbiHeadSection?.toFixed(4)
              },
              {
                label: "Shell Total Value damage factor",
                value: shellTotal.toFixed(4)
              },
              {
                label: "Head Total Value damage factor",
                value: headTotal.toFixed(4)
              },
              {
                label: "Shell Section Probability of Failure",
                value: (failureFrequency?.total * shellTotal * value.rbiValue_FMS).toFixed(6)
              },
              {
                label: "Head Section Probability of Failure",
                value: (failureFrequency?.total * headTotal * value.rbiValue_FMS).toFixed(6)
              },
            ].map(({label, value} : any) => <InputValueOnly label={label} value={!(value == null || Number.isNaN(value)) ? value : "-"} key={label} />)
          }
        </div>

      </section>
    </>
  );
}

export default POFValue;

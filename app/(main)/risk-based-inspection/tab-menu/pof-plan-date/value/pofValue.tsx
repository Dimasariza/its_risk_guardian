import InputTypeText from '@/app/(main)/uikit/input/input-type-text';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import GenericFailureFrequency from './genericFailureFreq';
import InputValueOnly from '@/app/(main)/uikit/input/inputValueOnly';
import { GeneralDataService } from '@/service/calculation/generalData-service';
import { Toast } from 'primereact/toast';
import { calculateAlkaline } from '@/function/calcPlanAlkalineValue';
import { getAlkaline, getExternalCorrosion, getThinning, getValue, updateValue } from '@/service/calculation/pofPlanDate-service';
import { gffTableValue } from '@/public/tableBasedOnAPI/gffTableValue';

function POFValue() {
  const [failureFrequency, setFailureFrequency] = useState<any>()
  const [value, setValue] = useState<any>({})
  const [error, setError] = useState<any>({});
  const [onSubmit, setOnSubmit] = useState<boolean>(false);
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
    Promise.all([
      GeneralDataService.fetchData(componentId),
      getAlkaline(componentId),
      getThinning(componentId),
      getExternalCorrosion(componentId),
      getValue(componentId),
    ])
    .then(([
      generalData,
      alkaline,
      thinning,
      exCor,
      pofValue
    ]) => {
      setGeneralData(generalData)
      setAlkaline(alkaline)
      setThinning(thinning)
      setExCor(exCor)
      setValue(pofValue)
      const failureFreq = gffTableValue.find(i => i.id == pofValue.planValue_failureFrequency)
      setFailureFrequency(failureFreq)
    })
  }, [data]);

  useEffect(() => {
    if(Object.keys(error).length === 0 && !edit && !undoEdit) {
      updateValue({
        ...value,
        planValue_failureFrequency: failureFrequency?.id
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
  }, [edit, onSubmit])
  
  const componentType = data.menu?.comp_componentType

  const {
    shellBaseDF,
    headBaseDF,
    planShellSection,
    planHeadSection,
    shellTotal,
    headTotal
  } = calculateAlkaline({
    generalData,
    thinning,
    exCor,
    alkaline,
    componentType
  })

  return (
    <>
      <Toast ref={toast}  position="bottom-right" />

      <section className="p-3">
        <div className='flex flex-wrap lg:column-gap-3 mt-4'>
          <InputTypeText props={{
            name: 'planValue_FMS',
            type: 'text',
            placeholder: 'Management System Factor',
            label: 'Management System Factor',
            autoFocus: true,
            disabled: !edit
          }} value={value} setValue={setValue} />
        </div>
        <div className='mt-5'>
          <GenericFailureFrequency failureFrequency={failureFrequency} setFailureFrequency={setFailureFrequency} setOnSubmit={setOnSubmit} />
        </div>
        <div className='flex w-full flex-wrap mt-5'>
          {
            [
              {
                label: "Generic Failure Frequency",
                value: failureFrequency?.total
              },
              {
                label: `${["Pipe", "Tank"].includes(componentType) ? "" : "Shell"} Governing thinning damage factor`,
                value: Number(shellBaseDF)?.toFixed(4)
              },
              {
                label: "Head Governing thinning damage factor",
                value: Number(headBaseDF)?.toFixed(4),
                viewonly: ["Pipe", "Tank"]
              },
              {
                label: `${["Pipe", "Tank"].includes(componentType) ? "" : "Shell"} Governing External damage factor`,
                value: Number(planShellSection)?.toFixed(4)
              },
              {
                label: "Head Governing External damage factor",
                value: Number(planHeadSection)?.toFixed(4),
                viewonly: ["Pipe", "Tank"]
              },
              {
                label: `${["Pipe", "Tank"].includes(componentType) ? "" : "Shell"} Total Value damage factor`,
                value: shellTotal.toFixed(4)
              },
              {
                label: "Head Total Value damage factor",
                value: headTotal.toFixed(4),
                viewonly: ["Pipe", "Tank"]
              },
              {
                label: `${["Pipe", "Tank"].includes(componentType) ? "" : "Shell"} Section Probability of Failure`,
                value: (failureFrequency?.total * shellTotal * value.planValue_FMS).toFixed(6)
              },
              {
                label: "Head Section Probability of Failure",
                value: (failureFrequency?.total * headTotal * value.planValue_FMS).toFixed(6),
                viewonly: ["Pipe", "Tank"]
              },
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

export default POFValue;

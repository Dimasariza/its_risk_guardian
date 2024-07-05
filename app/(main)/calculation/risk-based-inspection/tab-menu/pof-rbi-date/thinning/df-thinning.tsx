import InputCalendar from '@/fragments/input-calendar';
import InputDropDown from '@/fragments/input-drop-down';
import InputTypeText from '@/fragments/input-type-text';
import { getThinning } from '@/service/calculation/pofRBIDate-service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { inputs } from './inputs';
import CorrosionRateDialog from './corrosionRateDialog';
import InputValueOnly from '@/fragments/inputValueOnly';
import InspectionEffectivenessTable from './inspectionEfectivenessTableRef';

function DFThinning() {
  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any>({});

  const data = useSelector((state: any) => state.Reducer);

  useEffect(() => {
    if (data.menu?.comp_id) {
      getThinning(data.menu?.comp_id).then((res) => {
        setValue(res);
      });
    }
  }, [data]);

  return (
    <>
      <section className=" p-3">
        <div className='flex flex-wrap lg:column-gap-5 mt-4'>
          {inputs.map((props: any, key: number) => {
            if (props.type == 'text') {
              return <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />;
            } else if (props.type == 'calendar') {
              return <InputCalendar props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />;
            } else if (props.type == 'drop-down') {
              return <InputDropDown props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />;
            } 
          })}
        </div>
        <div className='flex w-full flex-wrap flex-column gap-2 mt-5'>
          <CorrosionRateDialog />
          <InspectionEffectivenessTable />
        </div>
        <div className='flex w-full flex-wrap mt-5'>
          <InputValueOnly label="Last Inspection" value="test"/>
          <InputValueOnly label="Age" value="test"/>
          <InputValueOnly label="Shell Art" value="test"/>
          <InputValueOnly label="Head Art" value="test"/>
          <InputValueOnly label="Flow Stress" value="test"/>
          <InputValueOnly label="Shell Strength Ratio" value="test"/>
          <InputValueOnly label="Head Strength Ratio" value="test"/>
          <InputValueOnly label="Inspection Effectiveness 1" value="test"/>
          <InputValueOnly label="Inspection Effectiveness 2" value="test"/>
          <InputValueOnly label="Inspection Effectiveness 3" value="test"/>
          <InputValueOnly label="Posterior Probability 1" value="test"/>
          <InputValueOnly label="Posterior Probability 2" value="test"/>
          <InputValueOnly label="Posterior Probability 3" value="test"/>
          <InputValueOnly label="Shell Section β1" value="test"/>
          <InputValueOnly label="Shell Section β2" value="test"/>
          <InputValueOnly label="Shell Section β3" value="test"/>
          <InputValueOnly label="Head Section β1" value="test"/>
          <InputValueOnly label="Head Section β2" value="test"/>
          <InputValueOnly label="Head Section β3" value="test"/>
          <InputValueOnly label="Shell Section Base DF" value="test"/>
          <InputValueOnly label="Head Section Base DF" value="test"/>
        </div>
      </section>
    </>
  );
}

export default DFThinning;

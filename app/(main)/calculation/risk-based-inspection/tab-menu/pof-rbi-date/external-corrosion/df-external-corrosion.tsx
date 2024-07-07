import InputCalendarYear from '@/fragments/input-year-range';
import InputTypeText from '@/fragments/input-type-text';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InputYearRange from '@/fragments/input-year-range';
import { getExternalCorrosion } from '@/service/calculation/pofRBIDate-service';
import { inputs } from './inputs';
import InputValueOnly from '@/fragments/inputValueOnly';
import OperatingTempTableRef from './operatingTempTableRef';
import InspectionEffectivenessTable from '../thinning/inspectionEfectivenessTableRef';

function DFExternalCorrosion() {
  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any>({});

  const data = useSelector((state: any) => state.Reducer);
  const edit = useSelector((state: any) => state.EditReducer);

  useEffect(() => {
    if (data.menu?.comp_id) {
      getExternalCorrosion(data.menu.id).then((res: any) => {
        setValue(res);
      });
    }
  }, [data]);

  return (
    <>
      <section className="grid m-2">

        <div className='flex flex-wrap lg:column-gap-5 mt-4'>
          {inputs.map((props: any, key: number) => {
            if (props.type == 'number' || props.type == 'text') {
              return <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />;
            } else if (props.type == 'year-range') {
              return <InputYearRange props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />;
            }
          })}
        </div>
        <div className='flex w-full flex-wrap flex-column gap-2 mt-5'>
          <OperatingTempTableRef />
        </div>
        <div className='flex w-full flex-wrap mt-5'>
          {
            [
              {
                label: "Age",
                value: null
              },
              {
                label: "Thickness (mm)",
                value: null
              },
              {
                label: "Thickness (Inch)",
                value: null
              },
              {
                label: "Base Corrosion Rate",
                value: null
              },              
              {
                label: "Final Corrosion Rate",
                value: null
              },
              {
                label: "Time in Service Age (Tk)",
                value: null
              },
              {
                label: "Time in Service Age (Coat)",
                value: null
              },
              {
                label: "Time in Service Age",
                value: null
              },
              {
                label: "Adjusment coat",
                value: null
              },
              {
                label: "Shell Art RBI Date",
                value: null
              },
              {
                label: "Head Art RBI Date",
                value: null
              },
              {
                label: "Flow Stress",
                value: null
              },
              {
                label: "Shell Strength Ratio",
                value: null
              },
              {
                label: "Head Strength Ratio",
                value: null
              },
              {
                label: "Inspection Effectiveness Factor (I1)",
                value: null
              },
              {
                label: "Inspection Effectiveness Factor (I2)",
                value: null
              },
              {
                label: "Inspection Effectiveness Factor (I3)",
                value: null
              },
              {
                label: "Posterior Probability (P1)",
                value: null
              },
              {
                label: "Posterior Probability (P2)",
                value: null
              },
              {
                label: "Posterior Probability (P3)",
                value: null
              },
              {
                label: "Shell RBI Date β1",
                value: null
              },
              {
                label: "Shell RBI Date β2",
                value: null
              },
              {
                label: "Shell RBI Date β3",
                value: null
              },
              {
                label: "Head RBI Date β1",
                value: null
              },
              {
                label: "Head RBI Date β2",
                value: null
              },
              {
                label: "Head RBI Date β3",
                value: null
              },
              {
                label: "Shell Base Damage Factor",
                value: null
              },
              {
                label: "Head Base Damage Factor",
                value: null
              },
            ].map(({label, value}: any) => <InputValueOnly label={label} value={value || "-"} key={label}/>)
          }
        </div>
      </section>
    </>
  );
}

export default DFExternalCorrosion;

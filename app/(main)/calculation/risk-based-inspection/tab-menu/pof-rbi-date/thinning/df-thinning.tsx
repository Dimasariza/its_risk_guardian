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
import { GeneralDataService } from '@/service/calculation/generalData-service';
import calculateThinning from '@/function/calculateThinningValue';
import IGeneralData from '@/types/IGeneralData';
import IRBIThinning from '@/types/IRBIThinning';

function DFThinning() {
  const [thinning, setThinning] = useState<IRBIThinning | any>({});
  const [generalData, setGeneralData] = useState<IGeneralData | any>({});
  const [error, setError] = useState<any>({});

  const data = useSelector((state: any) => state.Reducer);

  useEffect(() => {
    const componentId = data.menu?.comp_id;
    console.log(componentId)
    if(!componentId) return;
    getThinning(componentId).then((res) => {
      setThinning(res);
    });
    GeneralDataService.fetchData(componentId)
    .then(res => {
      setGeneralData(res)
      console.log(res)
    })
  }, [data])

  const {
    lastInspection,
    age,
    tMinInch,
    tMinMM,
    shellArt,
    headArt,
    flowStress,
    shellStrengthRatio,
    headStrengthRatio
  } = calculateThinning(generalData as IGeneralData, thinning as IRBIThinning)

  return (
    <section className=" p-3">
      <div className='flex flex-wrap lg:column-gap-5 mt-4'>
        {inputs.map((props: any, key: number) => {
          if (props.type == 'text') {
            return <InputTypeText props={props} key={key} value={thinning} setValue={setThinning} errorMessage={error[props.name]} />;
          } else if (props.type == 'calendar') {
            return <InputCalendar props={props} key={key} value={thinning} setValue={setThinning} errorMessage={error[props.name]} />;
          } else if (props.type == 'drop-down') {
            return <InputDropDown props={props} key={key} value={thinning} setValue={setThinning} errorMessage={error[props.name]} />;
          } 
        })}
      </div>
      <div className='flex w-full flex-wrap flex-column gap-2 mt-5'>
        <CorrosionRateDialog />
        <InspectionEffectivenessTable />
      </div>
      <div className='flex w-full flex-wrap mt-5'>
        {
          [
            {
              label: "Last Inspection",
              value: lastInspection
            },
            {
              label: "Age",
              value: age
            },
            {
              label: "T min (Inch)",
              value: tMinInch
            },
            {
              label: "T min (mm)",
              value: tMinMM
            },
            {
              label: "Shell Art",
              value: shellArt
            },
            {
              label: "Head Art",
              value: headArt
            },
            {
              label: "Flow Stress",
              value: flowStress
            },
            {
              label: "Shell Strength Ratio",
              value: shellStrengthRatio
            },
            {
              label: "Head Strength Ratio",
              value: headStrengthRatio
            },
            {
              label: "Inspection Effectiveness 1",
              value: "test"
            },
            {
              label: "Inspection Effectiveness 2",
              value: "test"
            },
            {
              label: "Inspection Effectiveness 3",
              value: "test"
            },
            {
              label: "Posterior Probability 1",
              value: "test"
            },
            {
              label: "Posterior Probability 2",
              value: "test"
            },
            {
              label: "Posterior Probability 3",
              value: "test"
            },
            {
              label: "Shell Section β1",
              value: "test"
            },
            {
              label: "Shell Section β2",
              value: "test"
            },
            {
              label: "Shell Section β3",
              value: "test"
            },
            {
              label: "Head Section β1",
              value: "test"
            },
            {
              label: "Head Section β2",
              value: "test"
            },
            {
              label: "Head Section β3",
              value: "test"
            },
            {
              label: "Shell Section Base DF",
              value: "test"
            },
            {
              label: "Head Section Base DF",
              value: "test"
            },
          ].map(({label, value} : any) => <InputValueOnly label={label} value={value} key={label} />)
        }
      </div>
    </section>
  );
}

export default DFThinning;

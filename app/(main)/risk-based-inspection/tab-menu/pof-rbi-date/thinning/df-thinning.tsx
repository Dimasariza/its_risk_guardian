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
import { calculateThinning } from '@/function/calcRBIThinningValue';
import IGeneralData from '@/types/IGeneralData';
import IRBIThinning from '@/types/IRBIThinning';

function DFThinning() {
  const [thinning, setThinning] = useState<IRBIThinning | any>({});
  const [generalData, setGeneralData] = useState<IGeneralData | any>({});
  const [error, setError] = useState<any>({});

  const data = useSelector((state: any) => state.Reducer);

  useEffect(() => {
    const componentId = data.menu?.comp_id;
    if(!componentId) return;
    getThinning(componentId).then((res) => {
      setThinning({...res, rbiThinning_rbiDate: new Date(res.rbiThinning_rbiDate)});
    });
    GeneralDataService.fetchData(componentId)
    .then(res => {
      setGeneralData(res)
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
    headStrengthRatio,
    inspEffectiveness1,
    inspEffectiveness2,
    inspEffectiveness3,
    postProbability1,
    postProbability2,
    postProbability3,
    shellSectionB1,
    shellSectionB2,
    shellSectionB3,
    headSectionB1,
    headSectionB2,
    headSectionB3,
    shellBaseDF,
    headBaseDF
  } = calculateThinning(generalData as IGeneralData, thinning as IRBIThinning)

  return (
    <section className=" p-3">
      <div className='flex flex-wrap lg:column-gap-3 mt-4'>
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
              value: inspEffectiveness1
            },
            {
              label: "Inspection Effectiveness 2",
              value: inspEffectiveness2
            },
            {
              label: "Inspection Effectiveness 3",
              value: inspEffectiveness3
            },
            {
              label: "Posterior Probability 1",
              value: postProbability1
            },
            {
              label: "Posterior Probability 2",
              value: postProbability2
            },
            {
              label: "Posterior Probability 3",
              value: postProbability3
            },
            {
              label: "Shell Section β1",
              value: shellSectionB1
            },
            {
              label: "Shell Section β2",
              value: shellSectionB2
            },
            {
              label: "Shell Section β3",
              value: shellSectionB3
            },
            {
              label: "Head Section β1",
              value: headSectionB1
            },
            {
              label: "Head Section β2",
              value: headSectionB2
            },
            {
              label: "Head Section β3",
              value: headSectionB3
            },
            {
              label: "Shell Section Base DF",
              value: shellBaseDF
            },
            {
              label: "Head Section Base DF",
              value: headBaseDF
            },
          ].map(({label, value} : any) => <InputValueOnly label={label} value={!(value == null || Number.isNaN(value)) ? value : "-"} key={label} />)
        }
      </div>
    </section>
  );
}

export default DFThinning;

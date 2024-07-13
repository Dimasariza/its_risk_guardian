import InputCalendarYear from '@/fragments/input-year-range';
import InputTypeText from '@/fragments/input-type-text';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InputYearRange from '@/fragments/input-year-range';
import { getExternalCorrosion, getThinning } from '@/service/calculation/pofRBIDate-service';
import { inputs } from './inputs';
import InputValueOnly from '@/fragments/inputValueOnly';
import OperatingTempTableRef from './operatingTempTableRef';
import { calculateExCor } from '@/function/calcRBIExCorValue';
import IGeneralData from '@/types/IGeneralData';
import { GeneralDataService } from '@/service/calculation/generalData-service';
import IRBIThinning from '@/types/IRBIThinning';

function DFExternalCorrosion() {
  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any>({});
  const [generalData, setGeneralData] = useState<IGeneralData | any>({});
  const [thinning, setThinning] = useState<IRBIThinning | any>({});

  const data = useSelector((state: any) => state.Reducer);
  const edit = useSelector((state: any) => state.EditReducer);

  useEffect(() => {
    const componentId = data.menu.comp_id;
    if (componentId) {
      getExternalCorrosion(componentId).then((res: any) => {
        setValue(res);
      });
      GeneralDataService.fetchData(componentId).then(res => setGeneralData(res))
      getThinning(componentId).then((res) => {
        setThinning({...res, rbiThinning_rbiDate: new Date(res.rbiThinning_rbiDate)});
      });
    }
  }, [data]);

  const {
    thicknessInch,
    thicknessMM,
    age,
    baseCRb,
    finalCR,
    ageCoat,
    adjCoat,
    timeInService,
    shellArt,
    headArt,
    flowStress,
    shellStrengthRatio,
    headStrengthRatio,
    inspectionI1,
    inspectionI2,
    inspectionI3,
    posteriorP1,
    posteriorP2,
    posteriorP3,
    shellRBIBeta1,
    shellRBIBeta2,
    shellRBIBeta3,
    headRBIBeta1,
    headRBIBeta2,
    headRBIBeta3,
    rbiShellSection,
    rbiHeadSection
  } = calculateExCor(generalData, thinning, value);

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
                value: age
              },
              {
                label: "Thickness (mm)",
                value: thicknessMM?.toFixed(4)
              },
              {
                label: "Thickness (Inch)",
                value: thicknessInch?.toFixed(4)
              },
              {
                label: "Corrosion Rate (CRb)",
                value: baseCRb?.toFixed(4)
              },             
              {
                label: "Final Corrosion Rate (Cr)",
                value: finalCR?.toFixed(4)
              },
              {
                label: "Time in Service Age (Tk)",
                value: age?.toFixed(4)
              },
              {
                label: "Time in Service Age (Coat)",
                value: ageCoat?.toFixed(4)
              },
              {
                label: "Time in Service Age",
                value: timeInService?.toFixed(4)
              },
              {
                label: "Adjusment coat",
                value: adjCoat?.toFixed(4)
              },
              {
                label: "Shell Art RBI Date",
                value: shellArt?.toFixed(4)
              },
              {
                label: "Head Art RBI Date",
                value: headArt?.toFixed(4)
              },
              {
                label: "Flow Stress",
                value: flowStress?.toFixed(4)
              },
              {
                label: "Shell Strength Ratio",
                value: shellStrengthRatio?.toFixed(4)
              },
              {
                label: "Head Strength Ratio",
                value: headStrengthRatio?.toFixed(4)
              },
              {
                label: "Inspection Effectiveness Factor (I1)",
                value: inspectionI1?.toFixed(4)
              },
              {
                label: "Inspection Effectiveness Factor (I2)",
                value: inspectionI2?.toFixed(4)
              },
              {
                label: "Inspection Effectiveness Factor (I3)",
                value: inspectionI3?.toFixed(4)
              },
              {
                label: "Posterior Probability (P1)",
                value: posteriorP1?.toFixed(4)
              },
              {
                label: "Posterior Probability (P2)",
                value: posteriorP2?.toFixed(4)
              },
              {
                label: "Posterior Probability (P3)",
                value: posteriorP3?.toFixed(4)
              },
              {
                label: "Shell RBI Date β1",
                value: shellRBIBeta1?.toFixed(4)
              },
              {
                label: "Shell RBI Date β2",
                value: shellRBIBeta2?.toFixed(4)
              },
              {
                label: "Shell RBI Date β3",
                value: shellRBIBeta3?.toFixed(4)
              },
              {
                label: "Head RBI Date β1",
                value: headRBIBeta1?.toFixed(4)
              },
              {
                label: "Head RBI Date β2",
                value: headRBIBeta2?.toFixed(4)
              },
              {
                label: "Head RBI Date β3",
                value: headRBIBeta3?.toFixed(4)
              },
              {
                label: "Shell Base Damage Factor",
                value: rbiShellSection?.toFixed(4)
              },
              {
                label: "Head Base Damage Factor",
                value: rbiHeadSection?.toFixed(4)
              },
            ].map(({label, value}: any) => <InputValueOnly label={label} value={!(value == null || Number.isNaN(value)) ? value : "-"} key={label}/>)
          }
        </div>
      </section>
    </>
  );
}

export default DFExternalCorrosion;

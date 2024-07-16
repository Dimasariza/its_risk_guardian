import InputCalendarYear from '@/fragments/input-year-range';
import InputTypeText from '@/fragments/input-type-text';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import InputYearRange from '@/fragments/input-year-range';
import { inputs } from './inputs';
import InputValueOnly from '@/fragments/inputValueOnly';
import OperatingTempTableRef from './operatingTempTableRef';
import IGeneralData from '@/types/IGeneralData';
import { GeneralDataService } from '@/service/calculation/generalData-service';
import IPlanThinning from '@/types/IPlanThinning';
import { Toast } from 'primereact/toast';
import { getExternalCorrosion, getThinning, updateExCor } from '@/service/calculation/pofPlanDate-service';
import { calculateExCor } from '@/function/calcPlanExCorValue';

function DFExternalCorrosion() {
  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any>({});
  const [generalData, setGeneralData] = useState<IGeneralData | any>({});
  const [thinning, setThinning] = useState<IPlanThinning | any>({});

  const data = useSelector((state: any) => state.Reducer);
  const toast = useRef<any>(null);
  let {edit, undoEdit} = useSelector((state: any) => state.EditReducer);

  const handleOnChange = (name: string, e: any) => {
    switch(name) {
      case "planExCor_tMinMM":
        setValue((prev: any) => ({...prev, planExCor_tMinInch: (e.target.value * 0.03937).toFixed(4)}))
        break;
      case "planExCor_tMinInch":
        setValue((prev: any) => ({...prev, planExCor_tMinMM: (e.target.value / 0.03937).toFixed(4)}))
        break;
    }
  }

  useEffect(() => {
    edit = true

    const componentId = data.menu.comp_id;
    if (componentId) {
      getExternalCorrosion(componentId).then((res: any) => {
        setValue(res);
      });
      GeneralDataService.fetchData(componentId).then(res => setGeneralData(res))
      getThinning(componentId).then((res) => {
        setThinning({...res, planThinning_planDate: new Date(res.planThinning_planDate)});
      });
    }
  }, [data]);

  const componentId = data.menu?.comp_id;
  useEffect(() => {
    if(Object.keys(error).length === 0 && !edit && !undoEdit) {
      updateExCor(value, componentId)
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
    shellPlanBeta1,
    shellPlanBeta2,
    shellPlanBeta3,
    headPlanBeta1,
    headPlanBeta2,
    headPlanBeta3,
    planShellSection,
    planHeadSection
  } = calculateExCor(generalData, thinning, value);

  return (
    <>
      <Toast ref={toast}  position="bottom-right" />

      <section className="grid m-2">

        <div className='flex flex-wrap lg:column-gap-5 mt-4'>
          {inputs.map((props: any, key: number) => {
            if (props.type == 'number' || props.type == 'text') {
              return <InputTypeText 
                props={{...props, disabled: !edit}} 
                key={key} 
                value={value} 
                setValue={setValue} 
                errorMessage={error[props.name]} 
                handleOnChange={handleOnChange}
              />;
            } else if (props.type == 'year-range') {
              return <InputYearRange props={{...props, disabled: !edit}} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />;
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
                label: "Shell Art Plan Date",
                value: shellArt?.toFixed(4)
              },
              {
                label: "Head Art Plan Date",
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
                label: "Shell Plan Date β1",
                value: shellPlanBeta1?.toFixed(4)
              },
              {
                label: "Shell Plan Date β2",
                value: shellPlanBeta2?.toFixed(4)
              },
              {
                label: "Shell Plan Date β3",
                value: shellPlanBeta3?.toFixed(4)
              },
              {
                label: "Head Plan Date β1",
                value: headPlanBeta1?.toFixed(4)
              },
              {
                label: "Head Plan Date β2",
                value: headPlanBeta2?.toFixed(4)
              },
              {
                label: "Head Plan Date β3",
                value: headPlanBeta3?.toFixed(4)
              },
              {
                label: "Shell Base Damage Factor",
                value: planShellSection?.toFixed(4)
              },
              {
                label: "Head Base Damage Factor",
                value: planHeadSection?.toFixed(4)
              },
            ].map(({label, value}: any) => <InputValueOnly label={label} value={!(value == null || Number.isNaN(value)) ? value : "-"} key={label}/>)
          }
        </div>
      </section>
    </>
  );
}

export default DFExternalCorrosion;

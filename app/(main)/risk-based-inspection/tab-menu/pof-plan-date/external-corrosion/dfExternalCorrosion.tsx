import InputCalendarYear from '@/app/(main)/uikit/input/input-year-range';
import InputTypeText from '@/app/(main)/uikit/input/input-type-text';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import InputYearRange from '@/app/(main)/uikit/input/input-year-range';
import { inputs } from './inputs';
import InputValueOnly from '@/app/(main)/uikit/input/inputValueOnly';
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

  const componentType = data.menu?.comp_componentType

  const {
    thicknessInch,
    thicknessMM,
    age,
    baseCRb,
    finalCR,
    ageCoat,
    adjCoat,
    ageTimeInServiceTk,
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
  } = calculateExCor(generalData, thinning, value, componentType);

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
          <OperatingTempTableRef componentType={componentType}/>
        </div>
        <div className='flex w-full flex-wrap mt-5'>
        {
            [
              {
                label: "Age",
                value: Number(age).toFixed(4)
              },
              {
                label: "Thickness (mm)",
                value: Number(thicknessMM)?.toFixed(4)
              },
              {
                label: "Thickness (Inch)",
                value: Number(thicknessInch)?.toFixed(4)
              },
              {
                label: "Corrosion Rate (CRb)",
                value: Number(baseCRb)?.toFixed(4)
              },             
              {
                label: "Final Corrosion Rate (Cr)",
                value: Number(finalCR)?.toFixed(4)
              },
              {
                label: "Time in Service Age (Tk)",
                value: Number(ageTimeInServiceTk)?.toFixed(4)
              },
              {
                label: "Time in Service Age (Coat)",
                value: Number(ageCoat)?.toFixed(4)
              },
              {
                label: "Time in Service Age",
                value: Number(ageTimeInServiceTk)?.toFixed(4)
              },
              {
                label: "Adjusment coat",
                value: Number(adjCoat)?.toFixed(4)
              },
              {
                label: `${["Pipe", "Tank"].includes(componentType) ? "" : "Shell"} Art Plan Date`,
                value: Number(shellArt)?.toFixed(4)
              },
              {
                label: "Head Art Plan Date",
                value: Number(headArt)?.toFixed(4),
                viewonly: ["Pipe", "Tank"]
              },
              {
                label: "Flow Stress",
                value: Number(flowStress)?.toFixed(4)
              },
              {
                label: `${["Pipe", "Tank"].includes(componentType) ? "" : "Shell"} Strength Ratio`,
                value: Number(shellStrengthRatio)?.toFixed(4)
              },
              {
                label: "Head Strength Ratio",
                value: Number(headStrengthRatio)?.toFixed(4),
                viewonly: ["Pipe", "Tank"]
              },
              {
                label: "Inspection Effectiveness Factor (I1)",
                value: Number(inspectionI1)?.toFixed(4)
              },
              {
                label: "Inspection Effectiveness Factor (I2)",
                value: Number(inspectionI2)?.toFixed(4)
              },
              {
                label: "Inspection Effectiveness Factor (I3)",
                value: Number(inspectionI3)?.toFixed(4)
              },
              {
                label: "Posterior Probability (P1)",
                value: Number(posteriorP1)?.toFixed(4)
              },
              {
                label: "Posterior Probability (P2)",
                value: Number(posteriorP2)?.toFixed(4)
              },
              {
                label: "Posterior Probability (P3)",
                value: Number(posteriorP3)?.toFixed(4)
              },
              {
                label: `${["Pipe", "Tank"].includes(componentType) ? "" : "Shell"} Plan Date β1`,
                value: Number(shellPlanBeta1)?.toFixed(4)
              },
              {
                label: `${["Pipe", "Tank"].includes(componentType) ? "" : "Shell"} Plan Date β2`,
                value: Number(shellPlanBeta2)?.toFixed(4)
              },
              {
                label: `${["Pipe", "Tank"].includes(componentType) ? "" : "Shell"} Plan Date β3`,
                value: Number(shellPlanBeta3)?.toFixed(4)
              },
              {
                label: "Head Plan Date β1",
                value: Number(headPlanBeta1)?.toFixed(4),
                viewonly: ["Pipe", "Tank"]
              },
              {
                label: "Head Plan Date β2",
                value: Number(headPlanBeta2)?.toFixed(4),
                viewonly: ["Pipe", "Tank"]
              },
              {
                label: "Head Plan Date β3",
                value: Number(headPlanBeta3)?.toFixed(4),
                viewonly: ["Pipe", "Tank"]
              },
              {
                label: `${["Pipe", "Tank"].includes(componentType) ? "" : "Shell"} Damage Factor`,
                value: Number(planShellSection)?.toFixed(4),
              },
              {
                label: "Head Damage Factor",
                value: Number(planHeadSection)?.toFixed(4),
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

export default DFExternalCorrosion;

/* eslint-disable */

import InputCalendar from '@/fragments/input-calendar';
import InputDropDown from '@/fragments/input-drop-down';
import InputTypeText from '@/fragments/input-type-text';
import { getThinning, updateThinning } from '@/service/calculation/pofRBIDate-service';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { inputs } from './inputs';
import CorrosionRateDialog from './corrosionRateDialog';
import InputValueOnly from '@/fragments/inputValueOnly';
import InspectionEffectivenessTable from './inspectionEfectivenessTableRef';
import { GeneralDataService } from '@/service/calculation/generalData-service';
import { calculateThinning } from '@/function/calcRBIThinningValue';
import IGeneralData from '@/types/IGeneralData';
import IRBIThinning from '@/types/IRBIThinning';
import { Toast } from 'primereact/toast';
import * as moment from 'moment';
import { convertDateToString } from '@/function/common';

function DFThinning() {
  const [thinning, setThinning] = useState<IRBIThinning | any>({});
  const [generalData, setGeneralData] = useState<IGeneralData | any>({});
  const [error, setError] = useState<any>({});

  const data = useSelector((state: any) => state.Reducer);
  const toast = useRef<any>(null);
  let { edit, undoEdit } = useSelector((state: any) => state.EditReducer);

  const componentId = data.menu?.comp_id;
  useEffect(() => {
    edit = true
    if(!componentId) return

    getThinning(componentId).then((res) => {
      setThinning({...res, rbiThinning_rbiDate: new Date(res.rbiThinning_rbiDate)});
    });

    GeneralDataService.fetchData(componentId)
    .then(res => {
      setGeneralData(res)
    })

  }, [data])

  useEffect(() => {
    if(Object.keys(error).length === 0 && !edit && !undoEdit) {
      updateThinning({...thinning, 
        rbiThinning_rbiDate: convertDateToString(thinning.rbiThinning_rbiDate) 
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
  }, [edit])

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
      <Toast ref={toast}  position="bottom-right" />

      <div className='flex flex-wrap lg:column-gap-3 mt-4'>
        {inputs.map((props: any, key: number) => {
          if (props.type == 'text') {
            return <InputTypeText props={{...props, disabled: !edit}} key={key} value={thinning} setValue={setThinning} errorMessage={error[props.name]} />;
          } else if (props.type == 'calendar') {
            return <InputCalendar props={{...props, disabled: !edit}} key={key} value={thinning} setValue={setThinning} errorMessage={error[props.name]} />;
          } else if (props.type == 'drop-down') {
            return <InputDropDown props={{...props, disabled: !edit}} key={key} value={thinning} setValue={setThinning} errorMessage={error[props.name]} />;
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
              value: Number(shellArt)?.toFixed(4)
            },
            {
              label: "Head Art",
              value: Number(headArt)?.toFixed(4)
            },
            {
              label: "Flow Stress",
              value: Number(flowStress)?.toFixed(4)
            },
            {
              label: "Shell Strength Ratio",
              value: Number(shellStrengthRatio)?.toFixed(4)
            },
            {
              label: "Head Strength Ratio",
              value: Number(headStrengthRatio)?.toFixed(4)
            },
            {
              label: "Inspection Effectiveness 1",
              value: Number(inspEffectiveness1)?.toFixed(4)
            },
            {
              label: "Inspection Effectiveness 2",
              value: Number(inspEffectiveness2)?.toFixed(4)
            },
            {
              label: "Inspection Effectiveness 3",
              value: Number(inspEffectiveness3)?.toFixed(4)
            },
            {
              label: "Posterior Probability 1",
              value: Number(postProbability1)?.toFixed(4)
            },
            {
              label: "Posterior Probability 2",
              value: Number(postProbability2)?.toFixed(4)
            },
            {
              label: "Posterior Probability 3",
              value: Number(postProbability3)?.toFixed(4)
            },
            {
              label: "Shell Section β1",
              value: Number(shellSectionB1)?.toFixed(4)
            },
            {
              label: "Shell Section β2",
              value: Number(shellSectionB2)?.toFixed(4)
            },
            {
              label: "Shell Section β3",
              value: Number(shellSectionB3)?.toFixed(4)
            },
            {
              label: "Head Section β1",
              value: Number(headSectionB1)?.toFixed(4)
            },
            {
              label: "Head Section β2",
              value: Number(headSectionB2)?.toFixed(4)
            },
            {
              label: "Head Section β3",
              value: Number(headSectionB3)?.toFixed(4)
            },
            {
              label: "Shell Section Base DF",
              value: Number(shellBaseDF)?.toFixed(4)
            },
            {
              label: "Head Section Base DF",
              value: Number(headBaseDF)?.toFixed(4)
            },
          ].map(({label, value} : any) => <InputValueOnly label={label} value={!(value == null || Number.isNaN(value)) ? value : "-"} key={label} />)
        }
      </div>
    </section>
  );
}

export default DFThinning;

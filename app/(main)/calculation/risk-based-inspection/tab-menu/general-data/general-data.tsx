'use client';

import InputTypeText from '@/fragments/input-type-text';
import { GeneralDataService } from '@/service/calculation/generalData-service';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inputsGeneralSpec, inputsHeadCalc, inputsShellCalc } from './inputs';
import validate from './validate';
import { EditData } from '@/redux/action/action';
import InputCalendar from '@/fragments/input-calendar';
import InputDropDown from '@/fragments/input-drop-down';
import { Toast } from 'primereact/toast';

function GeneralData() {
  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any | null>({});
  const [disabled, setDisabled] = useState(true);

  const data = useSelector((state: any) => state.Reducer);
  const toast = useRef<any>(null);
  const dispatchEdit = useDispatch();
  let edit = useSelector((state: any) => state.EditReducer);

  const handleOnChange = (name: string, e: any) => {
    switch(name) {
      case "gData_vesselVolumeLB":
        setValue((prev: any) => ({...prev, gData_vesselVolumeKG: (e.target.value * 16.018).toFixed(4)}))
        break;
      case "gData_vesselVolumeKG":
        setValue((prev: any) => ({...prev, gData_vesselVolumeLB: (e.target.value / 16.018).toFixed(4)}))
        break;
      case "gData_corrosionAllowanceMM":
        setValue((prev: any) => ({...prev, gData_corrosionAllowanceInch: (e.target.value * 0.03937).toFixed(4)}))
        break;
      case "gData_corrosionAllowanceInch":
        setValue((prev: any) => ({...prev, gData_corrosionAllowanceMM: (e.target.value / 0.03937).toFixed(4)}))
        break;
      case "gData_outerDiameterMM":
        setValue((prev: any) => ({...prev, gData_outerDiameterInch: (e.target.value * 0.03937).toFixed(4)}))
        break;
      case "gData_outerDiameterInch":
        setValue((prev: any) => ({...prev, gData_outerDiameterMM: (e.target.value / 0.03937).toFixed(4)}))
        break;
      case "gData_allowableStressPsig":
        setValue((prev: any) => ({...prev, gData_allowableStressBar: (e.target.value * 0.0689476).toFixed(4)}))
        setValue((prev: any) => ({...prev, gData_allowableStressKpa: (e.target.value * 6.89476).toFixed(4)}))
        break;
      case "gData_allowableStressBar":
        setValue((prev: any) => ({...prev, gData_allowableStressPsig: (e.target.value / 0.0689476).toFixed(4)}))
        setValue((prev: any) => ({...prev, gData_allowableStressKpa: (e.target.value / 0.0689476 * 6.89476).toFixed(4)}))
        break;
      case "gData_allowableStressKpa":
        setValue((prev: any) => ({...prev, gData_allowableStressPsig: (e.target.value / 6.89476).toFixed(4)}))
        setValue((prev: any) => ({...prev, gData_allowableStressBar: (e.target.value / 6.89476 * 0.0689476).toFixed(4)}))
        break;
      case "gData_shellMinimumThicknessMM":
        setValue((prev: any) => ({...prev, gData_shellMinimumThicknessInch: (e.target.value * 0.03937).toFixed(4)}))
        break;
      case "gData_shellMinimumThicknessInch":
        setValue((prev: any) => ({...prev, gData_shellMinimumThicknessMM: (e.target.value / 0.03937).toFixed(4)}))
        break;
      case "gData_shellCorrosionRateMM":
        setValue((prev: any) => ({...prev, gData_shellCorrosionRateInch: (e.target.value * 0.03937).toFixed(4)}))
        break;
      case "gData_shellCorrosionRateInch":
        setValue((prev: any) => ({...prev, gData_shellCorrosionRateMM: (e.target.value / 0.03937).toFixed(4)}))
        break;
      case "gData_headMinimumThicknessMM":
        setValue((prev: any) => ({...prev, gData_headMinimumThicknessInch: (e.target.value * 0.03937).toFixed(4)}))
        break;
      case "gData_headMinimumThicknessInch":
        setValue((prev: any) => ({...prev, gData_headMinimumThicknessMM: (e.target.value / 0.03937).toFixed(4)}))
        break;
      case "gData_headCorrosionRateMM":
        setValue((prev: any) => ({...prev, gData_headCorrosionRateInch: (e.target.value * 0.03937).toFixed(4)}))
        break;
      case "gData_headCorrosionRateInch":
        setValue((prev: any) => ({...prev, gData_headCorrosionRateMM: (e.target.value / 0.03937).toFixed(4)}))
        break;
    }
  }

  useEffect(() => {
    edit = true; // to disabled edit useeffect in first call
    if (data.menu.comp_id) {
      setDisabled(false);
      GeneralDataService.fetchData(data.menu.comp_id)
      .then((res) => {
        setValue(res);
      });
    } else {
      setDisabled(true);
      setValue({});
    }
  }, [data]);
  
  useEffect(() => {
    if(!edit) {
      setError(validate(value));
    }
  }, [edit])

  useEffect(() => {
    if(Object.keys(error).length === 0 && !edit) {
      GeneralDataService.editData(value)
      .then((res) => {
        toast.current.show({
          severity: 'success',
          summary: 'Data Updated',
          detail: `Your general data has been updated`
        });
      })
      .catch((err: any) => {
        toast.current.show({
          severity: 'danger',
          summary: 'Data Failed to Update',
          detail: `Failed to updated your data`
        });
      })
    } else if(!edit) {
      dispatchEdit(EditData());
    }
  }, [error])

  return (
    <>
      <section className="p-4">
        <Toast ref={toast}  position="bottom-right" />

        <h5>GENERAL SPECIFICATION OF PRESSURE VESSEL</h5>
        <div className="flex flex-wrap column-gap-5 lg:column-gap-6">
          {inputsGeneralSpec.map((props: any, key: number) => {
            if (props.type == 'text' || props.type == 'number') {
              return <InputTypeText props={props} key={key} value={value} setValue={setValue} handleOnChange={handleOnChange} errorMessage={error[props.name]} />;
            } else if (props.type == 'calendar') {
              return <InputCalendar props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />;
            } else if (props.type == 'drop-down') {
              return <InputDropDown props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />;
            }
          })}
        </div>

        <h5>SHELL CALCULATION</h5>
        <div className="flex flex-wrap lg:column-gap-6">
          {inputsShellCalc.map((props: any, key: number) => (
            <InputTypeText props={{...props, disabled}} key={key} value={value} setValue={setValue} handleOnChange={handleOnChange} errorMessage={error?.[props.name]} />
          ))}
        </div>

        <h5>HEAD CALCULATION</h5>
        <div className="flex flex-wrap lg:column-gap-6">
          {inputsHeadCalc.map((props: any, key: number) => (
            <InputTypeText props={{...props, disabled}} key={key} value={value} setValue={setValue} handleOnChange={handleOnChange} errorMessage={error?.[props.name]} />
          ))}
        </div>
      </section>
    </>
  );
}

export default GeneralData;

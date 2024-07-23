'use client';

import { GeneralDataService } from '@/service/calculation/generalData-service';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inputsGeneralSpec, inputsHeadCalc, inputsShellCalc } from './inputs';
import { Toast } from 'primereact/toast';
import { convertDateToString } from '@/function/common';
import { calcGeneralData } from '@/function/calcGeneralData';
import { EditData } from '@/redux/action/action';
import InputTypeText from '@/app/(main)/uikit/input/input-type-text';
import validate from './validate';
import InputCalendar from '@/app/(main)/uikit/input/input-calendar';

function GeneralData() {
  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any | null>({});
 
  const data = useSelector((state: any) => state.Reducer);
  const toast = useRef<any>(null);
  let { edit, undoEdit } = useSelector((state: any) => state.EditReducer);
  const dispatch = useDispatch();

  const handleOnChange = (name: string, e: any) => {
    const inputValue = Number(e.target.value)
    calcGeneralData(name, inputValue, setValue)
  }

  const componentId = data.menu?.comp_id
  useEffect(() => {
    edit = true; // to disabled edit useeffect in first call
    if (!componentId) return 
    GeneralDataService.fetchData(componentId)
    .then((res) => {
      setValue({
        ...res, 
        gData_lastInspection: new Date(res.gData_lastInspection),
        gData_startingDate: new Date(res.gData_startingDate),
      });
    });
  }, [data]);
  
  useEffect(() => {
    if(!edit) setError(validate(value));
  }, [edit])

  useEffect(() => {
    if(Object.keys(error).length) {
      dispatch(EditData())
    }
    if(Object.keys(error).length === 0 && !edit && !undoEdit) {
      GeneralDataService.editData({
        ...value, 
        gData_lastInspection: convertDateToString(value.gData_lastInspection),
        gData_startingDate: convertDateToString(value.gData_startingDate), 
      })
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
  }, [error])

  const componentType = data.menu?.comp_componentType

  return (
    <>
      <section className="p-4">
        <Toast ref={toast}  position="bottom-right" />
 
        <div className="flex flex-wrap column-gap-5 lg:column-gap-6">
          {
            inputsGeneralSpec.map((props: any, key: number) => {
              if(props?.viewonly?.includes(componentType)) return

              if (props.type == 'text' || props.type == 'number' && props.viewonly != componentType) {
                return <InputTypeText props={{...props, disabled: !edit }} key={key} value={value} setValue={setValue} handleOnChange={handleOnChange} errorMessage={error[props.name]} />;
              } else if (props.type == 'calendar' && props.viewonly != componentType) {
                return <InputCalendar props={{...props, disabled: !edit }} key={key} value={value} setValue={setValue} handleOnChange={handleOnChange} errorMessage={error[props.name]} />;
              } 
            })
          }
        </div>

        {
          componentType == "Pressure Vessel" &&
          <div>
            <h5>SHELL CALCULATION</h5>
            <div className="flex flex-wrap lg:column-gap-6">
              { 
                inputsShellCalc.map((props: any, key: number) => (
                  <InputTypeText props={{...props, disabled: !edit }} key={key} value={value} setValue={setValue} handleOnChange={handleOnChange} errorMessage={error?.[props.name]} />
                ))
              }
            </div>
          </div>
        }

        {
          componentType == "Pressure Vessel" &&
          <div>
            <h5>HEAD CALCULATION</h5>
            <div className="flex flex-wrap lg:column-gap-6">
              {
                inputsHeadCalc.map((props: any, key: number) => (
                  <InputTypeText props={{...props, disabled: !edit }} key={key} value={value} setValue={setValue} handleOnChange={handleOnChange} errorMessage={error?.[props.name]} />
                ))
              }
            </div>
          </div>
        }
      </section>
    </>
  );
}

export default GeneralData;

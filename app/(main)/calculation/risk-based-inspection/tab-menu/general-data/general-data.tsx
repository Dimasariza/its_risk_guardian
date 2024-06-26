'use client';

import InputTypeText from '@/fragments/input-type-text';
import { GeneralDataService } from '@/service/calculation/generalData-service';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inputsGeneralSpec, inputsHeadCalc, inputsShellCalc } from './inputs';
import validate from './validate';
import { EditData } from '@/redux/action/action';

function GeneralData() {
  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any | null>({});

  const data = useSelector((state: any) => state.Reducer);
  const dispatchEdit = useDispatch();
  let edit = useSelector((state: any) => state.EditReducer);

  useEffect(() => {
    edit = true; // to disabled edit useeffect in first call
    if (data.menu.comp_id) {
      GeneralDataService.fetchData(data.menu.comp_id)
      .then((res) => {
        setValue(res);
      });
    } else {
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
      console.log("save data")
    } else {
      dispatchEdit(EditData());
    }
  }, [error])

  return (
    <>
      <section className="p-4">
        <h5>GENERAL SPECIFICATION OF PRESSURE VESSEL</h5>
        <div className="flex flex-wrap column-gap-5 lg:column-gap-6">
          {inputsGeneralSpec.map((props: any, key: number) => (
            <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error?.[props.name]} />
          ))}
        </div>

        <h5>SHELL CALCULATION</h5>
        <div className="flex flex-wrap lg:column-gap-6">
          {inputsShellCalc.map((props: any, key: number) => (
            <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error?.[props.name]} />
          ))}
        </div>

        <h5>HEAD CALCULATION</h5>
        <div className="flex flex-wrap lg:column-gap-6">
          {inputsHeadCalc.map((props: any, key: number) => (
            <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error?.[props.name]} />
          ))}
        </div>
      </section>
    </>
  );
}

export default GeneralData;

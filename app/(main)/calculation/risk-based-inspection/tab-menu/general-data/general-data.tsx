'use client';

import InputTypeText from '@/fragments/input-type-text';
import { GeneralDataService } from '@/service/calculation/generalData-service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { inputsGeneralSpec, inputsHeadCalc, inputsShellCalc } from './inputs';

function GeneralData() {
  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any>({});

  const data = useSelector((state: any) => state.Reducer);
  const edit = useSelector((state: any) => state.EditReducer);

  useEffect(() => {
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
      GeneralDataService.editData(value)
      .then((res) => console.log(res))
    }
  }, [edit])

  return (
    <>
      <section className="p-4">
        <h5>GENERAL SPECIFICATION OF PRESSURE VESSEL</h5>
        <div className="flex flex-wrap column-gap-5 lg:column-gap-6">
          {inputsGeneralSpec.map((props: any, key: number) => (
            <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
          ))}
        </div>

        <h5>SHELL CALCULATION</h5>
        <div className="flex flex-wrap lg:column-gap-6">
          {inputsShellCalc.map((props: any, key: number) => (
            <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
          ))}
        </div>

        <h5>HEAD CALCULATION</h5>
        <div className="flex flex-wrap lg:column-gap-6">
          {inputsHeadCalc.map((props: any, key: number) => (
            <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
          ))}
        </div>
      </section>
    </>
  );
}

export default GeneralData;

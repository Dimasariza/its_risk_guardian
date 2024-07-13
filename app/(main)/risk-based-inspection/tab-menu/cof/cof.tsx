/* eslint-disable */

'use client';

import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import RepresentativeFluidDialog from "./representativeFluidDialog";
import InputValueOnly from "@/fragments/inputValueOnly";
import { GeneralDataService } from "@/service/calculation/generalData-service";
import { useSelector } from "react-redux";
import PhaseOfFluid from "./phaseOfFluid";
import LiquidInventories from "./liquidInventories";
import DetectionAndIsolation from "./DetectionAndIsolationTable";
import FlamableDialog from "./flamableDialog";
import DamageDialog from "./damageDialog";
import ReleaseHoleSize from "./realeseHoleSize";
import { inputs } from "./inputs";
import InputTypeText from "@/fragments/input-type-text";
import { calculateCOF } from "@/function/calcCOFValue";
import IGeneralData from "@/types/IGeneralData";

function COF() {
  const [fluidSelected, setFluidSelected] = useState<any>({});
  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any>({});
  const [generalData, setGeneralData] = useState<any>({});
  const data = useSelector((state: any) => state.Reducer);
  const { edit } = useSelector((state: any) => state.EditReducer);

  useEffect(() => {
    const componentId = data.menu?.comp_id
    if(componentId)
    GeneralDataService.fetchData(componentId)
    .then((res: any) => {
      setGeneralData(res)
    })
  }, [data]);

  const {
    getIdealGasHeatRatio
  } = calculateCOF(generalData as IGeneralData, fluidSelected )

  return (
    <section className="grid m-2">
      <div className="flex flex-wrap w-full lg:gap-8 md:gap-3 sm:gap-2">
        <div className='flex flex-wrap flex-column lg:mr-5 mt-5'>
          {inputs.map((props: any, key: number) => (
            <InputTypeText props={{...props, disabled: !edit}} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
          ))}
        </div>
        <div className="flex flex-wrap flex-column gap-2 mt-5">
          <RepresentativeFluidDialog fluidSelected={fluidSelected} setFluidSelected={setFluidSelected} />
          <PhaseOfFluid />
          <ReleaseHoleSize />
          <LiquidInventories />
          <DetectionAndIsolation />
          <FlamableDialog />
          <DamageDialog />
        </div>
      </div>

      <div className="flex w-full flex-wrap mt-5">
        {
          [
            {
              label: "AIT (°C)",
              value: fluidSelected.ait || "-"
            },
            {
              label: "AIT (°F)",
              value: (fluidSelected.ait * 1.8 + 32).toFixed(3) || "-"
            },
            {
              label: "AIT (K)",
              value: fluidSelected.ait + 273 || "-"
            },
            {
              label: "AIT (°R)",
              value: fluidSelected.ait * 4 / 5 || "-"
            },
            {
              label: "Ideal Gas Spesific Heat Ratio",
              value:  getIdealGasHeatRatio
            },
            {
              label: "Final consequence area (m²)",
              value:  ""
            },
            {
              label: "Final consequence area (ft²)",
              value:  ""
            },
          ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
        }
      </div>

      <h5>Release hole size area based on dn</h5>
      <div className="flex flex-wrap">
        {
          [
            {
              label: "Small Release Hole Size",
              value: ""
            },
            {
              label: "Medium Release Hole Size",
              value: ""
            },
            {
              label: "Large Release Hole Size",
              value: ""
            },
            {
              label: "Rupture Release Hole Size",
              value: ""
            },
          ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
        }
      </div>      
      
      <h5>Release rate (Wn)</h5>
      <div className="flex flex-wrap">
        {
          [
            {
              label: "Small Release Hole Size",
              value: ""
            },
            {
              label: "Medium Release Hole Size",
              value: ""
            },
            {
              label: "Large Release Hole Size",
              value: ""
            },
            {
              label: "Rupture Release Hole Size",
              value: ""
            },
          ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
        }
      </div>      
      
      <h5>Added fluid mass</h5>
      <div className="flex flex-wrap">
        {
          [
            {
              label: "Small Release Hole Size",
              value: ""
            },
            {
              label: "Medium Release Hole Size",
              value: ""
            },
            {
              label: "Large Release Hole Size",
              value: ""
            },
            {
              label: "Rupture Release Hole Size",
              value: ""
            },
          ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
        }
      </div>      
      
      <h5>Available mass</h5>
      <div className="flex flex-wrap">
        {
          [
            {
              label: "Small Release Hole Size",
              value: ""
            },
            {
              label: "Medium Release Hole Size",
              value: ""
            },
            {
              label: "Large Release Hole Size",
              value: ""
            },
            {
              label: "Rupture Release Hole Size",
              value: ""
            },
          ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
        }
      </div>      
      
      <h5>Time required to release</h5>
      <div className="flex flex-wrap">
        {
          [
            {
              label: "Small Release Hole Size",
              value: ""
            },
            {
              label: "Medium Release Hole Size",
              value: ""
            },
            {
              label: "Large Release Hole Size",
              value: ""
            },
            {
              label: "Rupture Release Hole Size",
              value: ""
            },
          ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
        }
      </div>      
      
      <h5>Release type</h5>
      <div className="flex flex-wrap">
        {
          [
            {
              label: "Small Release Hole Size",
              value: ""
            },
            {
              label: "Medium Release Hole Size",
              value: ""
            },
            {
              label: "Large Release Hole Size",
              value: ""
            },
            {
              label: "Rupture Release Hole Size",
              value: ""
            },
          ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
        }
      </div>      
      
      <h5>Total leak durations</h5>
      <div className="flex flex-wrap">
        {
          [
            {
              label: "Small Release Hole Size",
              value: ""
            },
            {
              label: "Medium Release Hole Size",
              value: ""
            },
            {
              label: "Large Release Hole Size",
              value: ""
            },
            {
              label: "Rupture Release Hole Size",
              value: ""
            },
          ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
        }
      </div>      
      
      <h5>Adjusted release rate</h5>
      <div className="flex flex-wrap">
        {
          [
            {
              label: "Small Release Hole Size",
              value: ""
            },
            {
              label: "Medium Release Hole Size",
              value: ""
            },
            {
              label: "Large Release Hole Size",
              value: ""
            },
            {
              label: "Rupture Release Hole Size",
              value: ""
            },
          ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
        }
      </div>      
      
      <h5>Leak duration</h5>
      <div className="flex flex-wrap">
        {
          [
            {
              label: "Small Release Hole Size",
              value: ""
            },
            {
              label: "Medium Release Hole Size",
              value: ""
            },
            {
              label: "Large Release Hole Size",
              value: ""
            },
            {
              label: "Rupture Release Hole Size",
              value: ""
            },
          ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
        }
      </div>
      
      <h5>Release mass</h5>
      <div className="flex flex-wrap">
        {
          [
            {
              label: "Small Release Hole Size",
              value: ""
            },
            {
              label: "Medium Release Hole Size",
              value: ""
            },
            {
              label: "Large Release Hole Size",
              value: ""
            },
            {
              label: "Rupture Release Hole Size",
              value: ""
            },
          ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
        }
      </div>      
      
      <h5>Energy efficiency</h5>
      <div className="flex flex-wrap">
        {
          [
            {
              label: "Small Release Hole Size",
              value: ""
            },
            {
              label: "Medium Release Hole Size",
              value: ""
            },
            {
              label: "Large Release Hole Size",
              value: ""
            },
            {
              label: "Rupture Release Hole Size",
              value: ""
            },
          ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
        }
      </div>      
      
      <h5>Component damage consequence areas for Auto-Ignition Not Likely (Continous Release)</h5>
      <div className="flex flex-wrap">
        {
          [
            {
              label: "Small Release Hole Size",
              value: ""
            },
            {
              label: "Medium Release Hole Size",
              value: ""
            },
            {
              label: "Large Release Hole Size",
              value: ""
            },
            {
              label: "Rupture Release Hole Size",
              value: ""
            },
          ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
        }
      </div>

      <h5>Component damage consequence areas for Auto-Ignition Likely (Continous Release)</h5>
      <div className="flex flex-wrap">
        {
          [
            {
              label: "Small Release Hole Size",
              value: ""
            },
            {
              label: "Medium Release Hole Size",
              value: ""
            },
            {
              label: "Large Release Hole Size",
              value: ""
            },
            {
              label: "Rupture Release Hole Size",
              value: ""
            },
          ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
        }
      </div>      
      
      <h5>Component damage consequence areas for Auto-ignition Not Likely (Instaneous Release)</h5>
      <div className="flex flex-wrap">
        {
          [
            {
              label: "Small Release Hole Size",
              value: ""
            },
            {
              label: "Medium Release Hole Size",
              value: ""
            },
            {
              label: "Large Release Hole Size",
              value: ""
            },
            {
              label: "Rupture Release Hole Size",
              value: ""
            },
          ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
        }
      </div>

      <h5>Component damage consequence areas for Auto-ignition Not Likely (Instaneous Release)</h5>
      <div className="flex flex-wrap">
        {
          [
            {
              label: "Small Release Hole Size",
              value: ""
            },
            {
              label: "Medium Release Hole Size",
              value: ""
            },
            {
              label: "Large Release Hole Size",
              value: ""
            },
            {
              label: "Rupture Release Hole Size",
              value: ""
            },
          ].map(({label, value}: any, key) => <InputValueOnly label={label} value={value || "-"} key={key}/>)
        }
      </div>

    </section>
  );
}

export default COF;

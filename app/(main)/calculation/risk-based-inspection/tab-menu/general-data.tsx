'use client';

import InputTypeText from '@/fragments/input-type-text';
import { GeneralDataService } from '@/service/calculation/generalDataService';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function GeneralData() {
  const inputsGeneralSpec = [
    {
      name: 'tagNumber',
      type: 'text',
      placeholder: 'Tag Number',
      label: 'Tag Number',
      required: true,
      autoFocus: true,
      className: ''
    },
    {
      name: 'service',
      type: 'text',
      placeholder: 'Service',
      label: 'Service',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'manufacturedBy',
      type: 'text',
      placeholder: 'Manufactured By',
      label: 'Manufactured By',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'typeOfPressureVessel',
      type: 'text',
      placeholder: 'Type of Pressure Vessel',
      label: 'Type of Pressure Vessel',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'geometryData',
      type: 'text',
      placeholder: 'Geometry Data',
      label: 'Geometry Data',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'code',
      type: 'text',
      placeholder: 'Code',
      label: 'Code',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'designPressure',
      type: 'text',
      placeholder: 'Design Pressure',
      label: 'Design Pressure',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'operatingPressure',
      type: 'text',
      placeholder: 'Operating Pressure',
      label: 'Operating Pressure',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'operatingTemperature',
      type: 'text',
      placeholder: 'Operating Temperature',
      label: 'Operating Temperature',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'dimmension',
      type: 'text',
      placeholder: 'Dimension',
      label: 'Dimension',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'vesselVolume',
      type: 'text',
      placeholder: 'Vessel Volume',
      label: 'Vessel Volume',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'support',
      type: 'text',
      placeholder: 'Support',
      label: 'Support',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'jointEfficiency',
      type: 'text',
      placeholder: 'Joint Efficiency',
      label: 'Joint Efficiency (Head/Sheel)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'corrosionAllowance',
      type: 'text',
      placeholder: 'Corrosion Allowance',
      label: 'Corrosion Allowance',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'yearBuilt',
      type: 'text',
      placeholder: 'Year Built',
      label: 'Year Built',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'material',
      type: 'text',
      placeholder: 'Material',
      label: 'Material',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'lastInspection',
      type: 'text',
      placeholder: 'Last Inspection',
      label: 'Last Inspection',
      required: true,
      autoFocus: false,
      className: ''
    },
  ];

  const inputsShellCalc = [
    {
      name: 'shellTagNumber',
      type: 'text',
      placeholder: 'Tag Number',
      label: 'Tag Number',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'shellService',
      type: 'text',
      placeholder: 'Service',
      label: 'Service',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'shellCode',
      type: 'text',
      placeholder: 'Code',
      label: 'Code',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'shellDesignPressure',
      type: 'text',
      placeholder: 'Design Pressure',
      label: 'Design Pressure',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'shellOuterDiameter',
      type: 'text',
      placeholder: 'Outer Diameter',
      label: 'Outer Diameter',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'shellMaterial',
      type: 'text',
      placeholder: 'Material',
      label: 'Material',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'shellAllowableStress',
      type: 'text',
      placeholder: 'Allowable Stress',
      label: 'Allowable Stress',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'shellEfficiency',
      type: 'text',
      placeholder: 'Efficiency',
      label: 'Efficiency',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'shellCorrosionAllowance',
      type: 'text',
      placeholder: 'Corrosion Allowance',
      label: 'Corrosion Allowance',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'shellMinimumThickness',
      type: 'text',
      placeholder: 'Minimum Thickness',
      label: 'Minimum Thickness',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'shellCorrosionRate',
      type: 'text',
      placeholder: 'Corrosion Rate',
      label: 'Corrosion Rate',
      required: true,
      autoFocus: false,
      className: ''
    },
  ];
  
  const inputsHeadCalc = [
    {
      name: 'headTagNumber',
      type: 'text',
      placeholder: 'Tag Number',
      label: 'Tag Number',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'headService',
      type: 'text',
      placeholder: 'Service',
      label: 'Service',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'headCode',
      type: 'text',
      placeholder: 'Code',
      label: 'Code',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'headDesignPressure',
      type: 'text',
      placeholder: 'Head Design Pressure',
      label: 'Head Design Pressure (P)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'headDesignTemperature',
      type: 'text',
      placeholder: 'Head Design Temperature',
      label: 'Head Design Temperature (T)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'headOuterDiameter',
      type: 'text',
      placeholder: 'Outer Diameter',
      label: 'Outer Diameter',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'headMaterial',
      type: 'text',
      placeholder: 'Material',
      label: 'Material',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'headAllowableStress',
      type: 'text',
      placeholder: 'Allowable Stress',
      label: 'Allowable Stress',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'headEfficiency',
      type: 'text',
      placeholder: 'Efficiency',
      label: 'Efficiency',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'headCorrosionAllowance',
      type: 'text',
      placeholder: 'Corrosion Allowance',
      label: 'Corrosion Allowance',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'headMinimumThickness',
      type: 'text',
      placeholder: 'Minimum Thickness',
      label: 'Minimum Thickness',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'headCorrosionRate',
      type: 'text',
      placeholder: 'Corrosion Rate',
      label: 'Corrosion Rate',
      required: true,
      autoFocus: false,
      className: ''
    },
  ];

  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any>({});

  const data = useSelector((state: any) => state.Reducer);

  useEffect(() => {
    GeneralDataService.getItem(data.menu.id)
    .then(res => {
      setValue(res)
    })
  }, [data])

  return (
    <>
      <section className="p-4">
        <h5>GENERAL SPECIFICATION OF PRESSURE VESSEL</h5>
        <div className="grid m-2">
          {inputsGeneralSpec.map((props: any, key: number) => (
            <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
          ))}
        </div>

        <h5>SHELL CALCULATION</h5>
        <div className="grid m-2">
          {inputsShellCalc.map((props: any, key: number) => (
            <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
          ))}
        </div>

        <h5>HEAD CALCULATION</h5>
        <div className="grid m-2">
          {inputsHeadCalc.map((props: any, key: number) => (
            <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
          ))}
        </div>
      </section>
    </>
  );
}

export default GeneralData;

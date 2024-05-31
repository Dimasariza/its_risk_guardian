'use client';

import InputTypeText from '@/fragments/input-type-text';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';

function GeneralData() {
  const inputs = [
    {
      name: 'tagNumber',
      type: 'text',
      placeholder: 'Tag Number',
      label: 'Tag Number',
      required: true,
      autoFocus: true,
      className: 'col'
    },
    {
      name: 'service',
      type: 'text',
      placeholder: 'Service',
      label: 'Service',
      required: true,
      autoFocus: false,
      className: 'col'
    },
    {
      name: 'manufacturedBy',
      type: 'text',
      placeholder: 'Manufactured By',
      label: 'Manufactured By',
      required: true,
      autoFocus: false,
      className: 'col'
    },
    {
      name: 'typeOfPressureVessel',
      type: 'text',
      placeholder: 'Type of Pressure Vessel',
      label: 'Type of Pressure Vessel',
      required: true,
      autoFocus: false,
      className: 'col'
    },
    {
      name: 'geometryData',
      type: 'text',
      placeholder: 'Geometry Data',
      label: 'Geometry Data',
      required: true,
      autoFocus: false,
      className: 'col'
    },
    {
      name: 'code',
      type: 'text',
      placeholder: 'Code',
      label: 'Code',
      required: true,
      autoFocus: false,
      className: 'col'
    },
  ]

  const [value, setValue] = useState('');
  const [error, setError] = useState<any>({});

  useEffect(() => {

  }, [])

  return (
    <>
      <section className="p-4">
        <h5>GENERAL SPECIFICATION OF PRESSURE VESSEL</h5>
        <div className="grid gap-2 m-2">
          
          {inputs.map((props: any, key: number) => (
            <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
          ))}

          <label htmlFor="code" className="col-6">
            Code
          </label>
          <InputText id="code" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="designPressure" className="col-6">
            Design Pressure
          </label>
          <InputText id="designPressure" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="operatingPressure" className="col-6">
            Operating Pressure
          </label>
          <InputText id="operatingPressure" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="dimension" className="col-6">
            Dimension
          </label>
          <InputText id="dimension" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="vesselVolume" className="col-6">
            Vessel Volume
          </label>
          <InputText id="vesselVolume" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="support" className="col-6">
            Support
          </label>
          <InputText id="support" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="jointEfficiency" className="col-6">
            Joint Efficiency
          </label>
          <InputText id="jointEfficiency" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="corrosionAllowance" className="col-6">
            Corrosion Allowance
          </label>
          <InputText id="corrosionAllowance" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="yearBuilt" className="col-6">
            Year Built
          </label>
          <InputText id="yearBuilt" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="material" className="col-6">
            Material
          </label>
          <InputText id="material" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="lastInspection" className="col-6">
            Last Inspection
          </label>
          <InputText id="lastInspection" className="col" value={value} onChange={(e) => setValue(e.target.value)} />

        </div>

        <h5>SHELL CALCULATION</h5>
        <div className="grid gap-2 m-2">
          <label htmlFor="shellTagNumber" className="col-6">
            Tag Number
          </label>
          <InputText id="shellTagNumber" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="shellService" className="col-6">
            Service
          </label>
          <InputText id="shellService" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="shellCode" className="col-6">
            Code
          </label>
          <InputText id="shellCode" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="shellDesignPressure" className="col-6">
            Shell Design Pressure
          </label>
          <InputText id="shellDesignPressure" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="shellDesignTemperature" className="col-6">
            Shell Design Temperature
          </label>
          <InputText id="shellDesignTemperature" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="shellOuterDiameter" className="col-6">
            Outer Diameter
          </label>
          <InputText id="shellOuterDiameter" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="shellMaterial" className="col-6">
            Material
          </label>
          <InputText id="shellMaterial" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="shellAllowableStress" className="col-6">
            Allowable Stress
          </label>
          <InputText id="shellAllowableStress" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="shellEfficiency" className="col-6">
            Efficiency
          </label>
          <InputText id="shellEfficiency" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="shellCorrosionAllowance" className="col-6">
            Corrosion Allowance
          </label>
          <InputText id="shellCorrosionAllowance" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="shellMinimumThickness" className="col-6">
            Minimum Thickness
          </label>
          <InputText id="shellMinimumThickness" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="shellCorrosionRate" className="col-6">
            Corrosion Rate
          </label>
          <InputText id="shellCorrosionRate" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>

        <h5>HEAD CALCULATION</h5>
        <div className="grid gap-2 m-2">
          <label htmlFor="headTagNumber" className="col-6">
            Tag Number
          </label>
          <InputText id="headTagNumber" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="headService" className="col-6">
            Service
          </label>
          <InputText id="headService" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="headCode" className="col-6">
            Code
          </label>
          <InputText id="headCode" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="headDesignPressure" className="col-6">
            Head Design Pressure (P)
          </label>
          <InputText id="headDesignPressure" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="headDesignTemperature" className="col-6">
            Head Design Temperature (T)
          </label>
          <InputText id="headDesignTemperature" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="headOuterDiameter" className="col-6">
            Outer Diameter
          </label>
          <InputText id="headOuterDiameter" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="headMaterial" className="col-6">
            Material
          </label>
          <InputText id="headMaterial" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="headAllowableStress" className="col-6">
            Allowable Stress
          </label>
          <InputText id="headAllowableStress" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="headEfficiency" className="col-6">
            Efficiency
          </label>
          <InputText id="headEfficiency" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="headCorrosionAllowance" className="col-6">
            Corrosion Allowance
          </label>
          <InputText id="headCorrosionAllowance" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="headMinimumThickness" className="col-6">
            Minimum Thickness
          </label>
          <InputText id="headMinimumThickness" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
          <label htmlFor="headCorrosionRate" className="col-6">
            Corrosion Rate
          </label>
          <InputText id="headCorrosionRate" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
      </section>
    </>
  );
}

export default GeneralData;

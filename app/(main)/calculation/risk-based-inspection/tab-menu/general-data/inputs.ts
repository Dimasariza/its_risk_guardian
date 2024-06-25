const inputsGeneralSpec = [
    {
      name: 'gData_tagNumber',
      type: 'text',
      placeholder: 'Tag Number',
      label: 'Tag Number',
      required: true,
      autoFocus: true,
      className: ''
    },
    {
      name: 'gData_service',
      type: 'text',
      placeholder: 'Service',
      label: 'Service',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_manufacturedBy',
      type: 'text',
      placeholder: 'Manufactured By',
      label: 'Manufactured By',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_typeOfPressureVessel',
      type: 'text',
      placeholder: 'Type of Pressure Vessel',
      label: 'Type of Pressure Vessel',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_geometryData',
      type: 'text',
      placeholder: 'Geometry Data',
      label: 'Geometry Data',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_code',
      type: 'text',
      placeholder: 'Code',
      label: 'Code',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_designPressure',
      type: 'text',
      placeholder: 'Design Pressure',
      label: 'Design Pressure',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_operatingPressure',
      type: 'text',
      placeholder: 'Operating Pressure',
      label: 'Operating Pressure',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_operatingTemperature',
      type: 'text',
      placeholder: 'Operating Temperature',
      label: 'Operating Temperature',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_dimmension',
      type: 'text',
      placeholder: 'Dimension',
      label: 'Dimension',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_vesselVolume',
      type: 'text',
      placeholder: 'Vessel Volume',
      label: 'Vessel Volume',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_support',
      type: 'text',
      placeholder: 'Support',
      label: 'Support',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_jointEfficiency',
      type: 'text',
      placeholder: 'Joint Efficiency',
      label: 'Joint Efficiency (Head/Sheel)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_corrosionAllowance',
      type: 'text',
      placeholder: 'Corrosion Allowance',
      label: 'Corrosion Allowance',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_yearBuilt',
      type: 'text',
      placeholder: 'Year Built',
      label: 'Year Built',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_material',
      type: 'text',
      placeholder: 'Material',
      label: 'Material',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_lastInspection',
      type: 'text',
      placeholder: 'Last Inspection',
      label: 'Last Inspection',
      required: true,
      autoFocus: false,
      className: ''
    }
  ];

  const inputsShellCalc = [
    {
      name: 'gData_shellTagNumber',
      type: 'text',
      placeholder: 'Tag Number',
      label: 'Tag Number',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_shellService',
      type: 'text',
      placeholder: 'Service',
      label: 'Service',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_shellCode',
      type: 'text',
      placeholder: 'Code',
      label: 'Code',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_shellDesignPressure',
      type: 'text',
      placeholder: 'Design Pressure',
      label: 'Design Pressure',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_shellDesignTemperature',
      type: 'text',
      placeholder: 'Design Temperature',
      label: 'Design Temperature',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_shellOuterDiameter',
      type: 'text',
      placeholder: 'Outer Diameter',
      label: 'Outer Diameter',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_shellMaterial',
      type: 'text',
      placeholder: 'Material',
      label: 'Material',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_shellAllowableStress',
      type: 'text',
      placeholder: 'Allowable Stress',
      label: 'Allowable Stress',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_shellEfficiency',
      type: 'text',
      placeholder: 'Efficiency',
      label: 'Efficiency',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_shellCorrosionAllowance',
      type: 'text',
      placeholder: 'Corrosion Allowance',
      label: 'Corrosion Allowance',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_shellMinimumThickness',
      type: 'text',
      placeholder: 'Minimum Thickness',
      label: 'Minimum Thickness',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_shellCorrosionRate',
      type: 'text',
      placeholder: 'Corrosion Rate',
      label: 'Corrosion Rate',
      required: true,
      autoFocus: false,
      className: ''
    }
  ];

  const inputsHeadCalc = [
    {
      name: 'gData_headTagNumber',
      type: 'text',
      placeholder: 'Tag Number',
      label: 'Tag Number',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_headService',
      type: 'text',
      placeholder: 'Service',
      label: 'Service',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_headCode',
      type: 'text',
      placeholder: 'Code',
      label: 'Code',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_headDesignPressure',
      type: 'text',
      placeholder: 'Head Design Pressure',
      label: 'Head Design Pressure (P)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_headDesignTemperature',
      type: 'text',
      placeholder: 'Head Design Temperature',
      label: 'Head Design Temperature (T)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_headOuterDiameter',
      type: 'text',
      placeholder: 'Outer Diameter',
      label: 'Outer Diameter',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_headMaterial',
      type: 'text',
      placeholder: 'Material',
      label: 'Material',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_headAllowableStress',
      type: 'text',
      placeholder: 'Allowable Stress',
      label: 'Allowable Stress',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_headEfficiency',
      type: 'text',
      placeholder: 'Efficiency',
      label: 'Efficiency',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_headCorrosionAllowance',
      type: 'text',
      placeholder: 'Corrosion Allowance',
      label: 'Corrosion Allowance',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_headMinimumThickness',
      type: 'text',
      placeholder: 'Minimum Thickness',
      label: 'Minimum Thickness',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_headCorrosionRate',
      type: 'text',
      placeholder: 'Corrosion Rate',
      label: 'Corrosion Rate',
      required: true,
      autoFocus: false,
      className: ''
    }
];

export { inputsGeneralSpec, inputsShellCalc, inputsHeadCalc }
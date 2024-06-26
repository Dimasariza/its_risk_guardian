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
      name: 'gData_positionType',
      type: 'text',
      placeholder: 'Position ',
      label: 'Position Type',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_shapeType',
      type: 'text',
      placeholder: 'Shape Type',
      label: 'Shape Type',
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
      name: 'gData_designTemperature',
      type: 'text',
      placeholder: 'Design Temperature',
      label: 'Design Temperature',
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
      name: 'gData_dimensionLength',
      type: 'number',
      placeholder: 'Dimension (Length)',
      label: 'Length',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_dimensionWidth',
      type: 'number',
      placeholder: 'Dimension (Width)',
      label: 'Width',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_vesselVolumeLB',
      type: 'text',
      placeholder: 'Vessel Volume (lb/ft3)',
      label: 'Vessel Volume (lb/ft3)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_vesselVolumeKG',
      type: 'text',
      placeholder: 'Vessel Volume (kg/m3)',
      label: 'Vessel Volume (lb/ft3)',
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
      name: 'gData_corrosionAllowanceMM',
      type: 'text',
      placeholder: 'Corrosion Allowance (mm)',
      label: 'Corrosion Allowance (mm)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_corrosionAllowanceInch',
      type: 'text',
      placeholder: 'Corrosion Allowance (inch)',
      label: 'Corrosion Allowance (inch)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_yearBuilt',
      type: 'number',
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
      type: 'calendar',
      placeholder: 'Last Inspection',
      label: 'Last Inspection',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_outerDiameterMM',
      type: 'text',
      placeholder: 'Outer Diameter (mm)',
      label: 'Outer Diameter',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_outerDiameterInch',
      type: 'text',
      placeholder: 'Outer Diameter (inch)',
      label: 'Outer Diameter',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_allowableStressPsig',
      type: 'text',
      placeholder: 'Allowable Stress (psig)',
      label: 'Allowable Stress (psig)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_allowableStressBar',
      type: 'text',
      placeholder: 'Allowable Stress (bar)',
      label: 'Allowable Stress (bar)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_allowableStressKpa',
      type: 'text',
      placeholder: 'Allowable Stress (kPa)',
      label: 'Allowable Stress (kPa)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_efficiency',
      type: 'text',
      placeholder: 'Efficiency',
      label: 'Efficiency',
      required: true,
      autoFocus: false,
      className: ''
    },
  ];

  const inputsShellCalc = [
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
      name: 'gData_shellMinimumThicknessMM',
      type: 'text',
      placeholder: 'Minimum Thickness (mm)',
      label: 'Minimum Thickness (mm)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_shellMinimumThicknessInch',
      type: 'text',
      placeholder: 'Minimum Thickness (inch)',
      label: 'Minimum Thickness (inch)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_shellCorrosionRateMM',
      type: 'text',
      placeholder: 'Corrosion Rate (mm/years)',
      label: 'Corrosion Rate (mm/years)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_shellCorrosionRateInch',
      type: 'text',
      placeholder: 'Corrosion Rate (inch/years)',
      label: 'Corrosion Rate (inch/years)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_shellTreq',
      type: 'text',
      placeholder: 'T Requirement',
      label: 'T Requirement',
      readonly: true,
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_shellMAWP',
      type: 'text',
      placeholder: 'MAWP',
      label: 'MAWP',
      readonly: true,
      required: true,
      autoFocus: false,
      className: ''
    }
  ];

  const inputsHeadCalc = [
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
      name: 'gData_headMinimumThicknessMM',
      type: 'text',
      placeholder: 'Minimum Thickness (mm)',
      label: 'Minimum Thickness (mm)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_headMinimumThicknessInch',
      type: 'text',
      placeholder: 'Minimum Thickness (inch)',
      label: 'Minimum Thickness (inch)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_headCorrosionRateMM',
      type: 'text',
      placeholder: 'Corrosion Rate (mm/years)',
      label: 'Corrosion Rate (mm/years)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_headCorrosionRateInch',
      type: 'text',
      placeholder: 'Corrosion Rate (inch/years)',
      label: 'Corrosion Rate (inch/years)',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_headTreq',
      type: 'text',
      placeholder: 'T Requirement',
      label: 'T Requirement',
      readonly: true,
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'gData_headMAWP',
      type: 'text',
      placeholder: 'MAWP',
      label: 'MAWP',
      readonly: true,
      required: true,
      autoFocus: false,
      className: ''
    }
];

export { inputsGeneralSpec, inputsShellCalc, inputsHeadCalc }
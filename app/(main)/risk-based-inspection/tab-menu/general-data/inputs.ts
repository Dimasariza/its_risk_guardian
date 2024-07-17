const inputsGeneralSpec = [
    {
      name: 'gData_tagNumber',
      type: 'text',
      placeholder: 'Tag Number',
      label: 'Tag Number',
      autoFocus: true,
    },
    {
      name: 'gData_startingDate',
      type: 'calendar',
      placeholder: 'Starting Date / Built (*)', 
      label: 'Starting Date / Built (*)',
    },
    {
      name: 'gData_service',
      type: 'text',
      placeholder: 'Service',
      label: 'Service',
    },
    {
      name: 'gData_manufacturedBy',
      type: 'text',
      placeholder: 'Manufactured By',
      label: 'Manufactured By',
    },
    {
      name: 'gData_positionType',
      type: 'text',
      placeholder: 'Position ',
      label: 'Position Type',
    },
    {
      name: 'gData_shapeType',
      type: 'text',
      placeholder: 'Shape Type',
      label: 'Shape Type',
    },
    {
      name: 'gData_geometryData',
      type: 'text',
      placeholder: 'Geometry Data',
      label: 'Geometry Data',
    },
    {
      name: 'gData_code',
      type: 'text',
      placeholder: 'Code',
      label: 'Code',
    },
    {
      name: 'gData_setPressurePsig',
      type: 'text',
      placeholder: 'Set Pressure (Psig)',
      label: 'Set Pressure (Psig)',
    },
    {
      name: 'gData_reliefingTemperatureF',
      type: 'text',
      placeholder: 'Reliefing Temperature (°F)',
      label: 'Reliefing Temperature (°F)',
    },
    {
      name: 'gData_allowableOverPress',
      type: 'text',
      placeholder: 'Allowable Over Pressure (%)',
      label: 'Allowable Over Pressure (%)',
    },
    {
      name: 'gData_designPressureBar',
      type: 'text',
      placeholder: 'Design Pressure (Bar)',
      label: 'Design Pressure (Bar)',
    },
    {
      name: 'gData_designPressurePsi',
      type: 'text',
      placeholder: 'Design Pressure (Psi)',
      label: 'Design Pressure (Psi)',
    },
    {
      name: 'gData_designTemperatureC',
      type: 'text',
      placeholder: 'Design Temperature (°C)',
      label: 'Design Temperature (°C)',
    },
    {
      name: 'gData_designTemperatureR',
      type: 'text',
      placeholder: 'Design Temperature (°R)',
      label: 'Design Temperature (°R)',
    },
    {
      name: 'gData_designTemperatureF',
      type: 'text',
      placeholder: 'Design Temperature (°F)',
      label: 'Design Temperature (°F)',
    },
    {
      name: 'gData_designTemperatureK',
      type: 'text',
      placeholder: 'Design Temperature K',
      label: 'Design Temperature K',
    },
    {
      name: 'gData_operatingPressureBar',
      type: 'text',
      placeholder: 'Operating Pressure (Bar)',
      label: 'Operating Pressure (Bar)',
    },
    {
      name: 'gData_operatingPressurePsi',
      type: 'text',
      placeholder: 'Operating Pressure (Psi)',
      label: 'Operating Pressure (Psi)',
    },
    {
      name: 'gData_operatingTemperatureC',
      type: 'text',
      placeholder: 'Operating Temperature (°C)',
      label: 'Operating Temperature (°C)',
    },
    {
      name: 'gData_operatingTemperatureR',
      type: 'text',
      placeholder: 'Operating Temperature (°R)',
      label: 'Operating Temperature (°R)',
    },
    {
      name: 'gData_operatingTemperatureF',
      type: 'text',
      placeholder: 'Operating Temperature (°F)',
      label: 'Operating Temperature (°F)',
    },
    {
      name: 'gData_operatingTemperatureK',
      type: 'text',
      placeholder: 'Operating Temperature (K)',
      label: 'Operating Temperature (K)',
    },
    {
      name: 'gData_dimensionLength',
      type: 'number',
      placeholder: 'Dimension Length (m)',
      label: 'Length',
    },
    {
      name: 'gData_dimensionWidth',
      type: 'number',
      placeholder: 'Dimension Width (m)',
      label: 'Width',
    },
    {
      name: 'gData_vesselVolumeLB',
      type: 'text',
      placeholder: 'Vessel Volume (lb/ft3)',
      label: 'Vessel Volume (lb/ft3)',
    },
    {
      name: 'gData_vesselVolumeKG',
      type: 'text',
      placeholder: 'Vessel Volume (kg/m3)',
      label: 'Vessel Volume (lb/ft3)',
    },
    {
      name: 'gData_support',
      type: 'text',
      placeholder: 'Support',
      label: 'Support',
    },
    {
      name: 'gData_jointEfficiency',
      type: 'text',
      placeholder: 'Joint Efficiency (*)',
      label: 'Joint Efficiency (Head/Sheel *)',
    },
    {
      name: 'gData_yieldStrength',
      type: 'text',
      placeholder: 'Yield Strength (Kpa *)',
      label: 'Yield Strength (Kpa *)',
    },
    {
      name: 'gData_tensileStrength',
      type: 'text',
      placeholder: 'Tensile Strength (Kpa *)',
      label: 'Tensile Strength (Kpa *)',
    },
    {
      name: 'gData_corrosionAllowanceMM',
      type: 'text',
      placeholder: 'Corrosion Allowance (mm)',
      label: 'Corrosion Allowance (mm)',
    },
    {
      name: 'gData_corrosionAllowanceInch',
      type: 'text',
      placeholder: 'Corrosion Allowance (inch)',
      label: 'Corrosion Allowance (inch)',
    },
    {
      name: 'gData_material',
      type: 'text',
      placeholder: 'Material',
      label: 'Material',
    },
    {
      name: 'gData_lastInspection',
      type: 'calendar',
      placeholder: 'Last Inspection (*)',
      label: 'Last Inspection (*)',
    },
    {
      name: 'gData_nominalThicknessMM',
      type: 'text',
      placeholder: 'Nominal Thickness (mm)',
      label: 'Nominal Thickness (mm)',
    },
    {
      name: 'gData_thickAfterInspMM',
      type: 'text',
      placeholder: 'Thickness After Inspection (mm)',
      label: 'Thickness After Inspection (mm)',
    },
    {
      name: 'gData_outerDiameterMM',
      type: 'text',
      placeholder: 'Outer Diameter (mm)',
      label: 'Outer Diameter',
    },
    {
      name: 'gData_outerDiameterInch',
      type: 'text',
      placeholder: 'Outer Diameter (inch)',
      label: 'Outer Diameter',
    },
    {
      name: 'gData_allowableStressPsig',
      type: 'text',
      placeholder: 'Allowable Stress (psig *)',
      label: 'Allowable Stress (psig *)',
    },
    {
      name: 'gData_allowableStressBar',
      type: 'text',
      placeholder: 'Allowable Stress (bar *)',
      label: 'Allowable Stress (bar *)',
    },
    {
      name: 'gData_allowableStressKpa',
      type: 'text',
      placeholder: 'Allowable Stress (kPa)',
      label: 'Allowable Stress (kPa)',
    },
    {
      name: 'gData_efficiency',
      type: 'text',
      placeholder: 'Efficiency',
      label: 'Efficiency',
    },
    {
      name: 'gData_shellMinimumThicknessMM',
      type: 'text',
      placeholder: 'Minimum Thickness (mm *)',
      label: 'Minimum Thickness (mm *)',
      notView: ["Pressure Vessel"]
    },
    {
      name: 'gData_shellMinimumThicknessInch',
      type: 'text',
      placeholder: 'Minimum Thickness (inch *)',
      label: 'Minimum Thickness (inch *)',
      notView: ["Pressure Vessel"]
    },
    {
      name: 'gData_shellTreqInch',
      type: 'text',
      placeholder: 'T Requirement (inch *)',
      label: 'T Requirement (Inch *)',
      notView: ["Pressure Vessel"]
    },
    {
      name: 'gData_shellTreqMM',
      type: 'text',
      placeholder: 'T Requirement (mm *)',
      label: 'T Requirement (mm *)',
      notView: ["Pressure Vessel"]
    },
  ];

  const inputsShellCalc = [
    {
      name: 'gData_shellCode',
      type: 'text',
      placeholder: 'Code',
      label: 'Code',
    },
    {
      name: 'gData_shellMinimumThicknessMM',
      type: 'text',
      placeholder: 'Minimum Thickness (mm *)',
      label: 'Minimum Thickness (mm *)',
    },
    {
      name: 'gData_shellMinimumThicknessInch',
      type: 'text',
      placeholder: 'Minimum Thickness (inch *)',
      label: 'Minimum Thickness (inch *)',
    },
    {
      name: 'gData_shellCorrosionRateMM',
      type: 'text',
      placeholder: 'Corrosion Rate (mm/years)',
      label: 'Corrosion Rate (mm/years)',
    },
    {
      name: 'gData_shellCorrosionRateInch',
      type: 'text',
      placeholder: 'Corrosion Rate (inch/years)',
      label: 'Corrosion Rate (inch/years)',
    },
    {
      name: 'gData_shellTreqInch',
      type: 'text',
      placeholder: 'T Requirement (inch *)',
      label: 'T Requirement (Inch *)',
    },
    {
      name: 'gData_shellTreqMM',
      type: 'text',
      placeholder: 'T Requirement (mm *)',
      label: 'T Requirement (mm *)',
    },
    {
      name: 'gData_shellMAWP',
      type: 'text',
      placeholder: 'MAWP',
      label: 'MAWP',
    }
  ];

  const inputsHeadCalc = [
    {
      name: 'gData_headCode',
      type: 'text',
      placeholder: 'Code',
      label: 'Code',
    },
    {
      name: 'gData_headMinimumThicknessMM',
      type: 'text',
      placeholder: 'Minimum Thickness (mm)',
      label: 'Minimum Thickness (mm)',
    },
    {
      name: 'gData_headMinimumThicknessInch',
      type: 'text',
      placeholder: 'Minimum Thickness (inch)',
      label: 'Minimum Thickness (inch)',
    },
    {
      name: 'gData_headCorrosionRateMM',
      type: 'text',
      placeholder: 'Corrosion Rate (mm/years)',
      label: 'Corrosion Rate (mm/years)',
    },
    {
      name: 'gData_headCorrosionRateInch',
      type: 'text',
      placeholder: 'Corrosion Rate (inch/years)',
      label: 'Corrosion Rate (inch/years)',
    },
    {
      name: 'gData_headTreqInch',
      type: 'text',
      placeholder: 'T Requirement (inch *)',
      label: 'T Requirement (Inch *)',
    },
    {
      name: 'gData_headTreqMM',
      type: 'text',
      placeholder: 'T Requirement (mm *)',
      label: 'T Requirement (mm *)',
    },
    {
      name: 'gData_headMAWP',
      type: 'text',
      placeholder: 'MAWP',
      label: 'MAWP',
    }
];

export { inputsGeneralSpec, inputsShellCalc, inputsHeadCalc }
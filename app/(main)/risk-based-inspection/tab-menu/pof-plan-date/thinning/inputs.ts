const inputs = [
    {
      name: 'planThinning_corrosionRate',
      type: 'text',
      placeholder: 'Corrosion Rate',
      label: 'Corrosion Rate',
    },
    {
      name: 'planThinning_planDate',
      type: 'calendar',
      placeholder: 'Plan Date',
      label: 'Plan Date',
    },
    {
      name: 'planThinning_tMinInch',
      type: 'text',
      placeholder: 'T min (Inch)',
      label: 'T min (inch)',
      autoFocus: false,
      className: ''
    },
    {
      name: 'planThinning_tMinMM',
      type: 'text',
      placeholder: 'T min (mm)',
      label: 'T min (mm)',
      autoFocus: false,
      className: ''
    },
    {
      name: 'planThinning_nInspA',
      type: 'text',
      placeholder: 'Number of Inspection A',
      laAel: 'Number of Inspection B',
    },
    {
      name: 'planThinning_nInspB',
      type: 'text',
      placeholder: 'Number of Inspection B',
      label: 'Number of Inspection B',
    },
    {
      name: 'planThinning_nInspC',
      type: 'text',
      placeholder: 'Number of Inspection C',
      label: 'Number of Inspection C',
    },
    {
      name: 'planThinning_nInspD',
      type: 'text',
      placeholder: 'Number of Inspection D',
      label: 'Number of Inspection D',
    },
    {
      name: 'planThinning_injectionPoints',
      type: 'text',
      placeholder: 'DF adj for injection points',
      label: 'DF adj for injection points',
    },
    {
      name: 'planThinning_deadLegs',
      type: 'text',
      placeholder: 'DF adj for dead legs',
      label: 'DF adj for dead legs',
    },
    {
      name: 'planThinning_weldingConstruction',
      type: 'text',
      placeholder: 'DF adj for welding construction',
      label: 'DF adj for welding construction',
    },
    {
      name: 'planThinning_astMaintenance',
      type: 'text',
      placeholder: 'DF adjustment for AST maintenance per API STD 653',
      label: 'DF adjustment for AST maintenance per API STD 653',
    },
    {
      name: 'planThinning_settlement',
      type: 'text',
      placeholder: 'DF adjustment for settlement',
      label: 'DF adjustment for settlement',
    },
    {
      name: 'planThinning_onlineMonitoring',
      type: 'text',
      placeholder: 'DF adjustment for online monitoring',
      label: 'DF adjustment for online monitoring',
    },
  ];

  export {inputs}
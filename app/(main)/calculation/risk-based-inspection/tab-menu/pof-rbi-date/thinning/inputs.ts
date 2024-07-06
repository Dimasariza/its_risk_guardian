const inputs = [
    {
      name: 'rbiThinning_corrosionRate',
      type: 'text',
      placeholder: 'Corrosion Rate',
      label: 'Corrosion Rate',
      required: true,
      readOnly: false,
      autoFocus: false,
      className: ''
    },
    {
      name: 'rbiThinning_rbiDate',
      type: 'calendar',
      placeholder: 'RBI Date',
      label: 'RBI Date',
      required: true,
      readOnly: false,
      autoFocus: true,
      className: ''
    },
    {
      name: 'rbiThinning_tMinInch',
      type: 'text',
      placeholder: 'T min (Inch)',
      label: 'T min (inch)',
      required: true,
      readOnly: false,
      autoFocus: false,
      className: ''
    },
    {
      name: 'rbiThinning_tMinMM',
      type: 'text',
      placeholder: 'T min (mm)',
      label: 'T min (mm)',
      required: true,
      autoFocus: false,
      readOnly: true,
      className: ''
    },
    {
      name: 'rbiThinning_injectionPoints',
      type: 'text',
      placeholder: 'DF adj for injection points',
      label: 'DF adj for injection points',
      required: true,
      autoFocus: false,
      readOnly: true,
      className: ''
    },
    {
      name: 'rbiThinning_deadLegs',
      type: 'text',
      placeholder: 'DF adj for dead legs',
      label: 'DF adj for dead legs',
      required: true,
      autoFocus: false,
      readOnly: true,
      className: ''
    },
    {
      name: 'rbiThinning_weldingConstruction',
      type: 'text',
      placeholder: 'DF adj for welding construction',
      label: 'DF adj for welding construction',
      required: true,
      readOnly: false,
      autoFocus: false,
      className: ''
    },
    {
      name: 'rbiThinning_astMaintenance',
      type: 'text',
      placeholder: 'DF adjustment for AST maintenance per API STD 653',
      label: 'DF adjustment for AST maintenance per API STD 653',
      required: true,
      autoFocus: false,
      readOnly: true,
      className: ''
    },
    {
      name: 'rbiThinning_settlement',
      type: 'text',
      placeholder: 'DF adjustment for settlement',
      label: 'DF adjustment for settlement',
      required: true,
      autoFocus: false,
      readOnly: true,
      className: ''
    },
    {
      name: 'rbiThinning_onlineMonitoring',
      type: 'text',
      placeholder: 'DF adjustment for online monitoring',
      label: 'DF adjustment for online monitoring',
      required: true,
      readOnly: true,
      autoFocus: false,
      className: ''
    },
  ];

  export {inputs}
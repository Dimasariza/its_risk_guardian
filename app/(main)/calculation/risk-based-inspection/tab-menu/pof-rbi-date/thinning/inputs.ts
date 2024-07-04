const inputs = [
    {
      name: 'corrosionRate',
      type: 'text',
      placeholder: 'Corrosion Rate',
      label: 'Corrosion Rate',
      required: true,
      readOnly: false,
      autoFocus: false,
      className: ''
    },
    {
      name: 'rbiDate',
      type: 'text',
      placeholder: 'RBI Date',
      label: 'RBI Date',
      required: true,
      readOnly: false,
      autoFocus: true,
      className: ''
    },
    {
      name: 'tMinInch',
      type: 'text',
      placeholder: 'T min',
      label: 'T min (inch)',
      required: true,
      readOnly: false,
      autoFocus: false,
      className: ''
    },
    {
      name: 'tMinMM',
      type: 'text',
      placeholder: 'T min',
      label: 'T min (mm)',
      required: true,
      autoFocus: false,
      readOnly: true,
      className: ''
    },
    {
      name: 'injectionPoints',
      type: 'text',
      placeholder: 'DF adj for injection points',
      label: 'DF adj for injection points',
      required: true,
      autoFocus: false,
      readOnly: true,
      className: ''
    },
    {
      name: 'deadLegs',
      type: 'text',
      placeholder: 'DF adj for dead legs',
      label: 'DF adj for dead legs',
      required: true,
      autoFocus: false,
      readOnly: true,
      className: ''
    },
    {
      name: 'weldingConstruction',
      type: 'text',
      placeholder: 'DF adj for welding construction',
      label: 'DF adj for welding construction',
      required: true,
      readOnly: false,
      autoFocus: false,
      className: ''
    },
    {
      name: 'astMaintenance',
      type: 'text',
      placeholder: 'DF adjustment for AST maintenance per API STD 653',
      label: 'DF adjustment for AST maintenance per API STD 653',
      required: true,
      autoFocus: false,
      readOnly: true,
      className: ''
    },
    {
      name: 'settlement',
      type: 'text',
      placeholder: 'DF adjustment for settlement',
      label: 'DF adjustment for settlement',
      required: true,
      autoFocus: false,
      readOnly: true,
      className: ''
    },
    {
      name: 'onlineMonitoring',
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
const inputsGFF: any = [
    {
      name: 'rbi_gffTotal',
      type: 'text',
      placeholder: 'GFF Total',
      required: true,
      autoFocus: true,
      readOnly: true,
      className: ''
    }
  ];

  const inputDFTotal: any = [
    {
      name: 'rbi_shellThinning',
      type: 'text',
      placeholder: 'Shell Thinning',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'rbi_headThinning',
      type: 'text',
      placeholder: 'Head Thinning',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'rbi_shellExternal',
      type: 'text',
      placeholder: 'Shell External',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'rbi_headExternal',
      type: 'text',
      placeholder: 'Head External',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'rbi_shellTotal',
      type: 'text',
      placeholder: 'Shell Total',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'rbi_headTotal',
      type: 'text',
      placeholder: 'Head Total',
      required: true,
      autoFocus: false,
      className: ''
    }
  ];

  const inputHeadSection: any = [
    {
      name: 'shellSection',
      type: 'text',
      placeholder: 'Shell Section',
      required: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'headSection',
      type: 'text',
      placeholder: 'Head Section',
      required: true,
      autoFocus: false,
      className: ''
    }
  ];

  export {inputsGFF, inputDFTotal, inputHeadSection}
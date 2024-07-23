
const inputs: any = [
    {
      name: 'cof_massComponent',
      type: 'text',
      placeholder: 'Mass Component',
      label: 'Mass Component',
      autoFocus: true,
    },
    {
      name: 'cof_massInventory',
      type: 'text',
      placeholder: 'Mass Inventory',
      label: 'Mass Inventory',
    },    
    {
      name: 'cof_C1mfracTox',
      type: 'text',
      placeholder: 'C1 mfrac Toxic',
      label: 'C1 mfrac Toxic',
    },
    {
      name: 'cof_ps',
      type: 'text',
      placeholder: 'PS',
      label: 'PS',
      notview: ["Pressure Vessel"]
    },
];

export {inputs};
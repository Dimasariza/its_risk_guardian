
const representativeFluidList = {
    name: 'fluid',
    type: 'drop-down',
    placeholder: 'Representative Fluid',
    label: 'Representative Fluid',
    required: true,
    autoFocus: false,
    className: 'w-max'
}

const inputs: any = [
    {
      name: 'cof_massComponent',
      type: 'text',
      placeholder: 'Mass Component',
      label: 'Mass Component',
      autoFocus: true,
      className: 'w-max'
    },
    {
      name: 'cof_massInventory',
      type: 'text',
      placeholder: 'Mass Inventory',
      label: 'Mass Inventory',
      className: 'w-max'
    },    
    {
      name: 'C1mfracTox',
      type: 'text',
      placeholder: 'C1 mfrac Toxic',
      label: 'C1 mfrac Toxic',
      className: 'w-max'
    },
    {
      name: 'cof_ps',
      type: 'text',
      placeholder: 'PS',
      label: 'PS',
      className: 'w-max'
    },
];

export {inputs, representativeFluidList};
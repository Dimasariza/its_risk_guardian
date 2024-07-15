
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
      name: 'massComponent',
      type: 'text',
      placeholder: 'Mass Component',
      label: 'Mass Component',
      autoFocus: true,
      className: 'w-max'
    },
    {
      name: 'massInventory',
      type: 'text',
      placeholder: 'Mass Inventory',
      label: 'Mass Inventory',
      className: 'w-max'
    },
];

export {inputs, representativeFluidList};
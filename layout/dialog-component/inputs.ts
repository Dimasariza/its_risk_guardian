const inputs = [
  // {
  //     name: 'heatTracing',
  //     type: 'drop-down',
  //     placeholder: 'Heat Tracing',
  //     label: 'Heat Tracing',
  //     required: true,
  //     disabled: true,
  //     autoFocus: false,
  //     options: [{ heatTracing: "Yes" }, { heatTracing: "No" }],
  //     className: 'w-max'
  // },
  {
    name: 'comp_tagOfComponent',
    type: 'text',
    placeholder: 'Tag of Component',
    label: 'Tag of Component',
    required: true,
    autoFocus: true,
    className: ''
  },
  {
    name: 'comp_nameOfComponent',
    type: 'text',
    placeholder: 'Name Of Component',
    label: 'Name of Component',
    required: true,
    autoFocus: false,
    className: ''
  }
];

export default inputs;

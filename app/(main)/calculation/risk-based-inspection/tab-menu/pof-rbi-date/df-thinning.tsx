import InputCalendar from '@/fragments/input-calendar';
import InputDropDown from '@/fragments/input-drop-down';
import InputTypeText from '@/fragments/input-type-text';
import { getThinning } from '@/service/calculation/pofRBIDate-service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function DFThinning() {
  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any>({});
  const inputs = [
    {
      name: 'startDate',
      type: 'calendar',
      placeholder: 'Start Date',
      label: 'Start Date',
      required: true,
      readOnly: false,
      autoFocus: false,
      className: ''
    },
    {
      name: 'thickness',
      type: 'text',
      placeholder: 'Thickness',
      label: 'Thickness',
      required: true,
      readOnly: false,
      autoFocus: true,
      className: ''
    },
    {
      name: 'corrosionAllowance',
      type: 'text',
      placeholder: 'Corrosion Allowance',
      label: 'Corrosion Allowance',
      required: true,
      readOnly: false,
      autoFocus: false,
      className: ''
    },
    {
      name: 'designTemperature',
      type: 'text',
      placeholder: 'Design Temperature',
      label: 'Design Temperature',
      required: true,
      autoFocus: false,
      readOnly: true,
      className: ''
    },
    {
      name: 'designPressure',
      type: 'text',
      placeholder: 'Design Pressure',
      label: 'Design Pressure',
      required: true,
      autoFocus: false,
      readOnly: true,
      className: ''
    },
    {
      name: 'operatingTemperature',
      type: 'text',
      placeholder: 'Operating Temperature',
      label: 'Operating Temperature',
      required: true,
      autoFocus: false,
      readOnly: true,
      className: ''
    },
    {
      name: 'operatingPressure',
      type: 'text',
      placeholder: 'Operating Pressure',
      label: 'Operating Pressure',
      required: true,
      readOnly: false,
      autoFocus: false,
      className: ''
    },
    {
      name: 'designCode',
      type: 'text',
      placeholder: 'Design Code',
      label: 'Design Code',
      required: true,
      autoFocus: false,
      readOnly: true,
      className: ''
    },
    {
      name: 'equipmentType',
      type: 'drop-down',
      placeholder: 'Equipment Type',
      label: 'Equipment Type',
      disabled: true,
      autoFocus: false,
      readOnly: true,
      options: [{ equipmentType: 'FWKO Separator' }],
      className: 'w-max'
    },
    {
      name: 'componentType',
      type: 'drop-down',
      placeholder: 'Component Type',
      label: 'Component Type',
      disabled: false,
      required: true,
      autoFocus: false,
      options: [{ componentType: 'Filter' }],
      className: 'w-max'
    },
    {
      name: 'geometryData',
      type: 'drop-down',
      placeholder: 'Geometry Data',
      label: 'Geometry Data',
      required: true,
      autoFocus: false,
      disabled: true,
      options: [{ geometryData: '2:1 Ellipsoidal' }],
      className: 'w-max'
    },
    {
      name: 'materialSpecification',
      type: 'text',
      placeholder: 'Material Specification',
      label: 'Material Specification',
      required: true,
      autoFocus: false,
      readOnly: true,
      className: ''
    },
    {
      name: 'yieldStrength',
      type: 'text',
      placeholder: 'Yield Strength',
      label: 'Yield Strength',
      required: true,
      readOnly: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'tensileStrength',
      type: 'text',
      placeholder: 'Tensile Strength',
      label: 'Tensile Strength',
      required: true,
      readOnly: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'weldJointEfficiency',
      type: 'text',
      placeholder: 'Weld Joint Efficiency',
      label: 'Weld Joint Efficiency',
      required: true,
      readOnly: true,
      autoFocus: false,
      className: ''
    },
    {
      name: 'heatTracing',
      type: 'drop-down',
      placeholder: 'Heat Tracing',
      label: 'Heat Tracing',
      required: true,
      disabled: true,
      autoFocus: false,
      options: [{ heatTracing: 'Yes' }, { heatTracing: 'No' }],
      className: 'w-max'
    }
  ];

  const data = useSelector((state: any) => state.Reducer);

  useEffect(() => {
    if (data.menu.comp_id) {
      getThinning(data.menu.comp_id).then((res) => {
        setValue(res);
      });
    }
  }, [data]);

  return (
    <>
      <section className="flex flex-wrap lg:column-gap-5">
        {inputs.map((props: any, key: number) => {
          if (props.type == 'text') {
            return <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />;
          } else if (props.type == 'calendar') {
            return <InputCalendar props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />;
          } else if (props.type == 'drop-down') {
            return <InputDropDown props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />;
          }
        })}
      </section>
    </>
  );
}

export default DFThinning;

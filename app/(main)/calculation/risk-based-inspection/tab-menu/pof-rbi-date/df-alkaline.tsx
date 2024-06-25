import InputTypeText from '@/fragments/input-type-text';
import { getAlkaline } from '@/service/calculation/pofRBIDate-service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function DFAlkalineCorrosion() {
  const [value, setValue] = useState<any>({});
  const [error, setError] = useState<any>({});

  const inputs = [
    {
      name: 'shellSusceptibility',
      type: 'text',
      placeholder: 'Shell Susceptibility',
      label: 'Shell Susceptibility',
      required: true,
      autoFocus: true,
      className: 'col'
    },
    {
      name: 'headSusceptibility',
      type: 'text',
      placeholder: 'Head Susceptibility',
      label: 'Head Susceptibility',
      required: true,
      autoFocus: false,
      className: 'col'
    },
    {
      name: 'shellSeverityId',
      type: 'text',
      placeholder: 'Shell Severity Index',
      label: 'Shell Severity Index',
      required: true,
      autoFocus: false,
      className: 'col'
    },
    {
      name: 'headSeverityId',
      type: 'text',
      placeholder: 'Head Severity Index',
      label: 'Head Severity Index',
      required: true,
      autoFocus: false,
      className: 'col'
    },
    {
      name: 'ageTimeInService',
      type: 'text',
      placeholder: 'Age Time in Service',
      label: 'Age Time in Service',
      required: true,
      autoFocus: false,
      className: 'col'
    },
    {
      name: 'sheelSection',
      type: 'text',
      placeholder: 'Shell Section',
      label: 'Shell Section',
      required: true,
      autoFocus: false,
      className: 'col'
    },
    {
      name: 'headSection',
      type: 'text',
      placeholder: 'Head Section',
      label: 'Head Section',
      required: true,
      autoFocus: false,
      className: 'col'
    }
  ];

  const data = useSelector((state: any) => state.Reducer);

  useEffect(() => {
    if (data.menu.comp_id) {
      getAlkaline(data.menu.id).then((res: any) => {
        setValue(res);
      });
    }
  }, [data]);

  return (
    <>
      <section className="grid m-2">
        {inputs.map((props: any, key: number) => (
          <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
        ))}
      </section>
    </>
  );
}

export default DFAlkalineCorrosion;

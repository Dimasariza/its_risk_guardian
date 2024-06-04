import InputTypeText from "@/fragments/input-type-text";
import { useState } from "react";

function DFAlkalineCorrosion() {
    const [value, setValue] = useState<any>({});
    const [error, setError] = useState<any>({});

    const inputs = [
        {
            name: 'startDate',
            type: 'text',
            placeholder: 'Shell Susceptibility',
            label: 'Shell Susceptibility',
            required: true,
            autoFocus: true,
            className: 'col'
        },
        {
            name: 'startDate',
            type: 'text',
            placeholder: 'Head Susceptibility',
            label: 'Head Susceptibility',
            required: true,
            autoFocus: true,
            className: 'col'
        },
        {
            name: 'startDate',
            type: 'text',
            placeholder: 'Shell Severity Index',
            label: 'Shell Severity Index',
            required: true,
            autoFocus: true,
            className: 'col'
        },
        {
            name: 'startDate',
            type: 'text',
            placeholder: 'Head Severity Index',
            label: 'Head Severity Index',
            required: true,
            autoFocus: true,
            className: 'col'
        },
        {
            name: 'startDate',
            type: 'text',
            placeholder: 'Age Time in Service',
            label: 'Age Time in Service',
            required: true,
            autoFocus: true,
            className: 'col'
        },
        {
            name: 'startDate',
            type: 'text',
            placeholder: 'Shell Section',
            label: 'Shell Section',
            required: true,
            autoFocus: true,
            className: 'col'
        },
        {
            name: 'startDate',
            type: 'text',
            placeholder: 'Head Section',
            label: 'Head Section',
            required: true,
            autoFocus: true,
            className: 'col'
        },
    ]
    return (
        <>
            <section className="grid m-2">
                {inputs.map((props: any, key: number) => (
                    <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
                ))}
            </section>
        </>
    )
}

export default DFAlkalineCorrosion;
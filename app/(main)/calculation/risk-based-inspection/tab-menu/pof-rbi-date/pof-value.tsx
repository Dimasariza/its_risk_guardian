import InputTypeText from "@/fragments/input-type-text";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useState } from "react";

function POFValue() {
    const [value, setValue] = useState<any>({});
    const [error, setError] = useState<any>({});

    const inputsGFF: any = [
        {
            name: 'gffTotal',
            type: 'text',
            placeholder: 'GFF Total',
            required: true,
            autoFocus: false,
            className: ''
        }
    ];

    const inputDFTotal: any = [
        {
            name: 'shellThinning',
            type: 'text',
            placeholder: 'Shell Thinning',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'headThinning',
            type: 'text',
            placeholder: 'Head Thinning',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'shellExternal',
            type: 'text',
            placeholder: 'Shell External',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'headExternal',
            type: 'text',
            placeholder: 'Head External',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'shellTotal',
            type: 'text',
            placeholder: 'Shell Total',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'headTotal',
            type: 'text',
            placeholder: 'Head Total',
            required: true,
            autoFocus: false,
            className: ''
        },
    ];

    const headSection: any = [
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
        },
    ];
    
    return (
        <>
            <section className="m-2">
                <h5>GFF</h5>
                <div className="grid m-2">
                    {inputsGFF.map((props: any, key: number) => (
                        <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
                    ))}
                </div>


                <h5>DF Total</h5>
                <div className="grid m-2">
                    {inputDFTotal.map((props: any, key: number) => (
                        <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
                    ))}
                </div>

                <h5>Management System Factor</h5>
                <h5>POF Total</h5>
                <div className="grid m-2">
                    {headSection.map((props: any, key: number) => (
                        <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
                    ))}
                </div>

            </section>
        </>
    )
}

export default POFValue;
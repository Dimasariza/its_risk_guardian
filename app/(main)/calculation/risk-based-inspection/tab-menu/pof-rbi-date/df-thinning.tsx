import InputTypeText from "@/fragments/input-type-text";
import { useState } from "react";

function DFThinning() {
    const [value, setValue] = useState<any>({});
    const [error, setError] = useState<any>({});
    const inputs = [
        {
            name: 'startDate',
            type: 'text',
            placeholder: 'Start Date',
            label: 'Start Date',
            required: true,
            autoFocus: true,
            className: 'col'
        },
        {
            name: 'thickness',
            type: 'text',
            placeholder: 'Thickness',
            label: 'Thickness',
            required: true,
            autoFocus: false,
            className: 'col'
        },
        {
            name: 'corrosionAllowance',
            type: 'text',
            placeholder: 'Corrosion Allowance',
            label: 'Corrosion Allowance',
            required: true,
            autoFocus: false,
            className: 'col'
        },
        {
            name: 'designTemperature',
            type: 'text',
            placeholder: 'Design Temperature',
            label: 'Design Temperature',
            required: true,
            autoFocus: false,
            className: 'col'
        },
        {
            name: 'designPressure',
            type: 'text',
            placeholder: 'Design Pressure',
            label: 'Design Pressure',
            required: true,
            autoFocus: false,
            className: 'col'
        },
        {
            name: 'operatingTemperature',
            type: 'text',
            placeholder: 'Operating Temperature',
            label: 'Operating Temperature',
            required: true,
            autoFocus: false,
            className: 'col'
        },
        {
            name: 'operatingPressure',
            type: 'text',
            placeholder: 'Operating Pressure',
            label: 'Operating Pressure',
            required: true,
            autoFocus: false,
            className: 'col'
        },
        {
            name: 'designCode',
            type: 'text',
            placeholder: 'Design Code',
            label: 'Design Code',
            required: true,
            autoFocus: false,
            className: 'col'
        },
        {
            name: 'equipmentType',
            type: 'text',
            placeholder: 'Equipment Type',
            label: 'Equipment Type',
            required: true,
            autoFocus: false,
            className: 'col'
        },
        {
            name: 'componentType',
            type: 'text',
            placeholder: 'Component Type',
            label: 'Component Type',
            required: true,
            autoFocus: false,
            className: 'col'
        },
        {
            name: 'geometryData',
            type: 'text',
            placeholder: 'Geometry Data',
            label: 'Geometry Data',
            required: true,
            autoFocus: false,
            className: 'col'
        },
        {
            name: 'materialSpecification',
            type: 'text',
            placeholder: 'Material Specification',
            label: 'Material Specification',
            required: true,
            autoFocus: false,
            className: 'col'
        },
        {
            name: 'yieldStrength',
            type: 'text',
            placeholder: 'Yield Strength',
            label: 'Yield Strength',
            required: true,
            autoFocus: false,
            className: 'col'
        },
        {
            name: 'tensileStrength',
            type: 'text',
            placeholder: 'Tensile Strength',
            label: 'Tensile Strength',
            required: true,
            autoFocus: false,
            className: 'col'
        },
        {
            name: 'weldJointEfficiency',
            type: 'text',
            placeholder: 'Weld Joint Efficiency',
            label: 'Weld Joint Efficiency',
            required: true,
            autoFocus: false,
            className: 'col'
        },
        {
            name: 'heatTracing',
            type: 'text',
            placeholder: 'Heat Tracing',
            label: 'Heat Tracing',
            required: true,
            autoFocus: false,
            className: 'col'
        },
    ];

    return(
        <>
            <section className="grid gap-2 m-2">
                {inputs.map((props: any, key: number) => (
                    <InputTypeText props={props} key={key} value={value} setValue={setValue} errorMessage={error[props.name]} />
                ))}
            </section>
        </>
    )
}

export default DFThinning;
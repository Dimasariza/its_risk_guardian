import InputCalendarYear from "@/fragments/input-year-range";
import InputTypeText from "@/fragments/input-type-text";
import { getExternalCorrosion } from "@/service/calculation/pofRBIDateService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InputYearRange from "@/fragments/input-year-range";

function DFExternalCorrosion() {
    const [value, setValue] = useState<any>({});
    const [error, setError] = useState<any>({});

    const inputs: any = [
        {
            name: 'yearAssesment',
            type: 'year-range',
            placeholder: 'Year Assesment',
            required: true,
            autoFocus: true,
            className: ''
        },
        // {
        //     name: 'yearInstallation',
        //     type: 'year',
        //     placeholder: 'Year Installation',
        //     required: true,
        //     autoFocus: false,
        //     className: ''
        // },
        {
            name: 'thicknessValue',
            type: 'text',
            placeholder: 'Thickness Value',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'baseCorrosionRate',
            type: 'text',
            placeholder: 'Base Corrosion Rate',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'finalCorrosionRate',
            type: 'text',
            placeholder: 'Final Corrosion Rate',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'shellTimeInService',
            type: 'text',
            placeholder: 'Shell Time in Service',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'headTimeInService',
            type: 'text',
            placeholder: 'Head Time in Service',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'ageCoat',
            type: 'text',
            placeholder: 'Age Coat',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'adjusmentCoat',
            type: 'text',
            placeholder: 'Adjusment Coat',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'age',
            type: 'text',
            placeholder: 'Age',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'minReqWallThickness',
            type: 'text',
            placeholder: 'Min Required Wall Thickness',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'shellDFParameter',
            type: 'text',
            placeholder: 'Shell DF Parameter',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'headDFParameter',
            type: 'text',
            placeholder: 'Head DF Parameter',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'flowStress',
            type: 'text',
            placeholder: 'Flow Stress',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'shellStrengthRatio',
            type: 'text',
            placeholder: 'Shell Strength Ratio',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'headStrengthRatio',
            type: 'text',
            placeholder: 'Head Strength Ratio',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'numInspA',
            type: 'text',
            placeholder: 'Number of Inspection A',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'numInspB',
            type: 'text',
            placeholder: 'Number of Inspection B',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'numInspC',
            type: 'text',
            placeholder: 'Number of Inspection C',
            required: true,
            autoFocus: false,
            className: ''
        },
        {
            name: 'numInspD',
            type: 'text',
            placeholder: 'Number of Inspection D',
            required: true,
            autoFocus: false,
            className: ''
        },
    ];

    const data = useSelector((state: any) => state.Reducer);

    useEffect(() => {
    getExternalCorrosion(data.menu.id)
      .then((res: any) => {
        setValue(res)
      })
    }, [data])

    return (
        <>
            <section className="grid m-2">
                {inputs.map((props: any, key: number) => {
                    if(props.type == "text") {
                        return <InputTypeText 
                            props={props} 
                            key={key} 
                            value={value} 
                            setValue={setValue} 
                            errorMessage={error[props.name]} 
                        />
                    } else if(props.type == "year-range") {
                        return <InputYearRange 
                            props={props} 
                            key={key} 
                            value={value} 
                            setValue={setValue} 
                            errorMessage={error[props.name]} 
                        />
                    }
                })}
            </section>
        </>
    )
}

export default DFExternalCorrosion;
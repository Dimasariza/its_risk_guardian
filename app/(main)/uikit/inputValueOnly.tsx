function InputValueOnly({label, value}: any) {
    return (
        <div className="flex">
            <div className="p-2" style={{width: 235}}>{label}</div>
            <div className="p-2" style={{width: 235}}>{value}</div>
        </div>
    )
}

export default InputValueOnly;
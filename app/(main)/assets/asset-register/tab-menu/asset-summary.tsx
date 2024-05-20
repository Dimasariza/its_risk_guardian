import { InputText } from "primereact/inputtext";
import { useState } from "react";

function AssetSummary() {
    const [value, setValue] = useState('');
    return(
        <>
            <h5>INSTALLATION</h5>
            <section className="grid gap-2 mx-2">
                <label htmlFor="idOfInstallation" className="col-6">Id of installation</label>
                <InputText id="idOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="tagOfInstallation" className="col-6">Tag of installation</label>
                <InputText id="tagOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="nameOfInstallation" className="col-6">Name of installation</label>
                <InputText id="nameOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="categoryOfInstallation" className="col-6">Category of installation</label>
                <InputText id="categoryOfInstallation" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
            </section>
            <h5>PLANT</h5>
            <section className="grid gap-2 mx-2">
                <label htmlFor="idOfPlant" className="col-6">Id of Plant</label>
                <InputText id="idOfPlant" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="tagOfPlant" className="col-6">Tag of Plant</label>
                <InputText id="tagOfPlant" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="nameOfPlant" className="col-6">Name of Plant</label>
                <InputText id="nameOfPlant" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="categoryOfPlant" className="col-6">Owner of Plant</label>
                <InputText id="categoryOfPlant" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
            </section>
            <h5>SYSTEM</h5>
            <section className="grid gap-2 mx-2">
                <label htmlFor="idOfSystem" className="col-6">Id of System</label>
                <InputText id="idOfSystem" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="tagOfSystem" className="col-6">Tag of System</label>
                <InputText id="tagOfSystem" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="nameOfSystem" className="col-6">Name of System</label>
                <InputText id="nameOfSystem" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
            </section>
            <h5>EQUIPMENT</h5>
            <section className="grid gap-2 mx-2">
                <label htmlFor="idOfEqupiment" className="col-6">Id of Equipment</label>
                <InputText id="idOfEqupiment" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="tagOfEquipment" className="col-6">Tag of Equipment</label>
                <InputText id="tagOfEquipment" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="nameOfEquipment" className="col-6">Name of Equipment</label>
                <InputText id="nameOfEquipment" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="pAndId" className="col-6">P and ID</label>
                <InputText id="pAndId" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="rbmType" className="col-6">RBM Type</label>
                <InputText id="rbmType" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
            </section>
        </>
    )
}

export default AssetSummary;
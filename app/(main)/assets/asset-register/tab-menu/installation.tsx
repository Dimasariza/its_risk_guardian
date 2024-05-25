import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";

function Installation() {
  const [value, setValue] = useState('');

  return(
    <>
      <h5>DESIGN / INSTALLATION</h5>
      <section className="grid gap-2 mx-2">
        <label htmlFor="quipment" className="col-6">Equipment</label>
        <InputText id="quipment" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="equipmentType" className="col-6">Equipment Type</label>
        <InputText id="equipmentType" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="componentShape" className="col-6">Component Shape</label>
        <InputText id="componentShape" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="notes" className="col-6">Notes</label>
        <InputTextarea id="notes" value={value} onChange={(e) => setValue(e.target.value)} rows={5} className="w-full" />
        <label htmlFor="material" className="col-6">Material</label>
        <InputText id="material" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="designPressure" className="col-6">Design Pressure (bar)</label>
        <InputText id="designPressure" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="diameter" className="col-6">Diameter</label>
        <InputText id="diameter" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
      </section>
    </>
  )
}

export default Installation;
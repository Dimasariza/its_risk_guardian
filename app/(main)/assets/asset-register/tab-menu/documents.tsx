import { InputText } from "primereact/inputtext";
import { useState } from "react";

function Documents() {
  const [value, setValue] = useState('');

  return(
    <>
      <h5>Documents</h5>
      <section className="grid gap-2 mx-2">
        <label htmlFor="pfd" className="col-6">PFD</label>
        <InputText id="pfd" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="p&id" className="col-6">P & ID</label>
        <InputText id="p&id" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="otherDrawings" className="col-6">Other Drawings</label>
        <InputText id="otherDrawings" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
      </section>
    </>
  )
}

export default Documents;
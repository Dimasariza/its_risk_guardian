import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { useState } from "react";
import { Button } from "primereact/button";
import { CofService } from "@/service/calculation/cofService";

function RepresentativeFluidDialog({value, setValue, toast}: any) {
    const [visible, setVisible] = useState<boolean>(false);

    const headerGroup = (
        <ColumnGroup>
            <Row>
                <Column header="" rowSpan={2} style={{ width: '3rem' }}/>
                <Column header="Fluid" rowSpan={2} style={{width: "10rem"}}/>
                <Column header="MW" rowSpan={2} />
                <Column header="Luquid Density (lb/ft³)" rowSpan={2} />
                <Column header="NBP (°C)" rowSpan={2} />
                <Column header="Ambient State" rowSpan={2} />
                <Column header="" colSpan={3} />
                <Column header="CP" colSpan={4} />
                <Column header="Fluid Type" rowSpan={2} />
                <Column header="Applicable Material" rowSpan={2} />
            </Row>
            <Row>
                <Column header="Ideal Gas Specific Heat Eq." />
                <Column header="Ideal Gas Constant A" />
                <Column header="Ideal Gas Constant B" />
                <Column header="Ideal Gas Constant C" />
                <Column header="Ideal Gas Constant D" />
                <Column header="Ideal Gas Constant E" />
                <Column header="AIT (°C)" />
            </Row>
        </ColumnGroup>
    );

    const footerContent = (
        <div>
          <Button label="Cancel" icon="pi pi-check" 
          onClick={() => setVisible(false)} 
          severity="danger" />
          <Button label="Save" icon="pi pi-times" 
          onClick={() => {
            setVisible(false)
            CofService.editData({...value, cof_representativeFluid: value.fluidSelected.id})
            .then(res => {
                toast.current.show({
                    severity: 'success',
                    summary: 'Data Updated',
                    detail: `You update General Data`
                });
            })
            .catch((e: any) => {
                toast.current.show({
                  severity: 'error',
                  summary: 'Data Failed to Updated',
                  detail: `Damage mechanism not updated`
                });
            })
          }} 
          severity="success" />
        </div>
    );

    return (
        <>
            <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
                <label htmlFor="">Representative Fluid</label>
                <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible(true)} />
            </div>
            <Dialog header="Representative Fluid Table" visible={visible} style={{ width: '90%' }} maximizable
                modal onHide={() => {if (!visible) return; setVisible(false); }} 
                footer={footerContent}
                >
                <div>
                <DataTable 
                        value={representativeFluidNodes} 
                        selectionMode={"single"} 
                        selection={value?.fluidSelected} 
                        scrollable 
                        scrollHeight="700px" 
                        headerColumnGroup={headerGroup} 
                        tableStyle={{ minWidth: '50rem' }} 
                        onSelectionChange={(e: any) => setValue((prev: any) => ({...prev, fluidSelected: e.value}))} dataKey="id"
                    >
                    <Column selectionMode="single"></Column>
                    <Column field="fluid" body={(e) => e.fluid ? <>{e.fluid}</> : <div className="">---</div>}></Column>
                    <Column field="mw" body={(e) => e.mw ? <>{e.mw}</> : <div className="">---</div>}></Column>
                    <Column field="liquid" body={(e) => e.liquid ? <>{e.liquid}</> : <div className="">---</div>}></Column>
                    <Column field="nbp" body={(e) => e.nbp ? <>{e.nbp}</> : <div className="">---</div>}></Column>
                    <Column field="ambient" body={(e) => e.ambient ? <>{e.ambient}</> : <div className="">---</div>}></Column>
                    <Column field="heat_eq" body={(e) => e.heat_eq ? <>{e.heat_eq}</> : <div className="">---</div>}></Column>
                    <Column field="constant_a" body={(e) => e.constant_a ? <>{e.constant_a}</> : <div className="">---</div>}></Column>
                    <Column field="constant_b" body={(e) => e.constant_b ? <>{e.constant_b}</> : <div className="">---</div>}></Column>
                    <Column field="constant_c" body={(e) => e.constant_c ? <>{e.constant_c}</> : <div className="">---</div>}></Column>
                    <Column field="constant_d" body={(e) => e.constant_d ? <>{e.constant_d}</> : <div className="">---</div>}></Column>
                    <Column field="constant_e" body={(e) => e.constant_e ? <>{e.constant_e}</> : <div className="">---</div>}></Column>
                    <Column field="ait" body={(e) => e.ait ? <>{e.ait}</> : <div className="">---</div>}></Column>
                    <Column field="fluid_type" body={(e) => e.fluid_type ? <>{e.fluid_type}</> : <div className="">---</div>}></Column>
                    <Column field="applicable_materials" body={(e) => e.applicable_materials ? <>{e.applicable_materials}</> : <div className="">---</div>}></Column>
                </DataTable>
                </div>
            </Dialog>
        </>
    );
}

export default RepresentativeFluidDialog;


export const representativeFluidNodes: any = [
    {
        id: "representativeFluid1",
        fluid_type: "Type 0",
        applicable_materials: "Methane, ethane, ethylene, LNG, fuel gas",
        fluid: "C1-C2",
        mw: 23,
        liquid: 250.512,
        nbp: -125,
        ambient: "Gas",
        heat_eq: "Note 1",
        constant_a: 12.3,
        constant_b: 0.115,
        constant_c: -0.0000287,
        constant_d: -0.0000000013,
        constant_e: "N/A",
        ait: 558
    },
    {
        id: "representativeFluid2",
        fluid_type: "Type 0",
        applicable_materials: "Propane, butane, isobutane, LPG",
        fluid: "C3-C4",
        mw: 51,
        liquid: 538.379,
        nbp: -21,
        ambient: "Gas",
        heat_eq: "Note 1",
        constant_a: 2.632,
        constant_b: 0.3188,
        constant_c: -0.000135,
        constant_d: 0.0000000147,
        constant_e: "N/A",
        ait: 369
    },
    {
        id: "representativeFluid3",
        fluid_type: "Type 0",
        applicable_materials: "Pentane",
        fluid: "C5",
        mw: 75,
        liquid: 625.199,
        nbp: 36,
        ambient: "Liquid",
        heat_eq: "Note 1",
        constant_a: -3.626,
        constant_b: 0.4873,
        constant_c: -0.00026,
        constant_d: 0.000000053,
        constant_e: "N/A",
        ait: 284
    },
    {
        id: "representativeFluid4",
        fluid_type: "Type 0",
        applicable_materials: "Gasoline, naptha, light straight run, heptane.",
        fluid: "C6-8",
        mw: 100,
        liquid: 684.018,
        nbp: 99,
        ambient: "Liquid",
        heat_eq: "Note 1",
        constant_a: -5.146,
        constant_b: 0.676,
        constant_c: -0.000365,
        constant_d: 0.0000000766,
        constant_e: "N/A",
        ait: 223
    },
    {
        id: "representativeFluid5",
        fluid_type: "Type 0",
        applicable_materials: "Diesel, kerosene",
        fluid: "C9-C12",
        mw: 149,
        liquid: 734.012,
        nbp: 184,
        ambient: "Liquid",
        heat_eq: "Note 1",
        constant_a: -8.5,
        constant_b: 1.01,
        constant_c: -0.000556,
        constant_d: 0.000000118,
        constant_e: "N/A",
        ait: 208
    },
    {
        id: "representativeFluid6",
        fluid_type: "Type 0",
        applicable_materials: "Jet fuel, kerosene, atmospheric gas oil",
        fluid: "C13-C16",
        mw: 205,
        liquid: 764.527,
        nbp: 261,
        ambient: "Liquid",
        heat_eq: "Note 1",
        constant_a: -11.7,
        constant_b: 1.39,
        constant_c: -0.000772,
        constant_d: 0.000000167,
        constant_e: "N/A",
        ait: 202
    },
    {
        id: "representativeFluid7",
        fluid_type: "Type 0",
        applicable_materials: "Gas oil, typical crude",
        fluid: "C17-C25",
        mw: 280,
        liquid: 775.019,
        nbp: 344,
        ambient: "Liquid",
        heat_eq: "Note 1",
        constant_a: -22.4,
        constant_b: 1.94,
        constant_c: -0.00112,
        constant_d: -0.000000253,
        constant_e: "N/A",
        ait: 202
    },
    {
        id: "representativeFluid8",
        fluid_type: "Type 0",
        applicable_materials: "Residuum, heavy crude, lube oil, seal oil",
        fluid: "C25+",
        mw: 422,
        liquid: 900.026,
        nbp: 527,
        ambient: "Liquid",
        heat_eq: "Note 1",
        constant_a: -22.4,
        constant_b: 1.94,
        constant_c: -0.00112,
        constant_d: -0.000000253,
        constant_e: "N/A",
        ait: 202
    },
    {
        id: "representativeFluid9",
        fluid_type: "",
        applicable_materials: "",
        fluid: "Water",
        mw: 18,
        liquid: 997.947,
        nbp: 100,
        ambient: "Liquid",
        heat_eq: "Note 3",
        constant_a: 276000,
        constant_b: -2090,
        constant_c: "8.125",
        constant_d: -0.0141,
        constant_e: "0.00000937",
        ait: "N/A"
    },
    {
        id: "representativeFluid10",
        fluid_type: "",
        applicable_materials: "",
        fluid: "Steam",
        mw: 18,
        liquid: 997.947,
        nbp: 100,
        ambient: "Gas",
        heat_eq: "Note 3",
        constant_a: 33400,
        constant_b: 26800,
        constant_c: "2610",
        constant_d: 8900,
        constant_e: "1170",
        ait: "N/A"
    },
    {
        id: "representativeFluid11",
        fluid_type: "Type 0",
        applicable_materials: "Acid, caustic",
        fluid: "Acid",
        mw: 18,
        liquid: 997.947,
        nbp: 100,
        ambient: "Liquid",
        heat_eq: "Note 3",
        constant_a: 276000,
        constant_b: -2090,
        constant_c: "8.125",
        constant_d: -0.0141,
        constant_e: "0.00000937",
        ait: "N/A"
    },
    {
        id: "representativeFluid12",
        fluid_type: "Type 0",
        applicable_materials: "Hydrogen only",
        fluid: "H2",
        mw: 2,
        liquid: 71.01,
        nbp: -253,
        ambient: "Gas",
        heat_eq: "Note 1",
        constant_a: 27.1,
        constant_b: 0.00927,
        constant_c: -0.0000138,
        constant_d: 0.00000000765,
        constant_e: "N/A",
        ait: 400
    },
    {
        id: "representativeFluid13",
        fluid_type: "Type 0",
        applicable_materials: "Hydrogen sulfide only",
        fluid: "H2S",
        mw: 34,
        liquid: 993.029,
        nbp: -59,
        ambient: "Gas",
        heat_eq: "Note 1",
        constant_a: 31.9,
        constant_b: 0.00144,
        constant_c: "0.0000243",
        constant_d: -0.0000000118,
        constant_e: "N/A",
        ait: 260
    },
    {
        id: "representativeFluid14",
        fluid_type: "Type 0",
        applicable_materials: "Hydrogen fluoride",
        fluid: "HF",
        mw: 20,
        liquid: 967.031,
        nbp: 20,
        ambient: "Gas",
        heat_eq: "Note 1",
        constant_a: 29.1,
        constant_b: 0.000661,
        constant_c: -0.00000203,
        constant_d: 0.0000000025,
        constant_e: "N/A",
        ait: 17760
    },
    {
        id: "representativeFluid15",
        fluid_type: "Type 1",
        applicable_materials: "Carbon Monoxide",
        fluid: "CO",
        mw: 28,
        liquid: 800.92,
        nbp: -191,
        ambient: "Gas",
        heat_eq: "Note 2",
        constant_a: 29100,
        constant_b: 8770,
        constant_c: "3090",
        constant_d: 8460,
        constant_e: "1540",
        ait: 609
    },
    {
        id: "representativeFluid16",
        fluid_type: "Type 1 (Note 2)",
        applicable_materials: "Diethyl Ether",
        fluid: "DEE",
        mw: 74,
        liquid: 720.828,
        nbp: 35,
        ambient: "Liquid ",
        heat_eq: "Note 2",
        constant_a: 86200,
        constant_b: 255000,
        constant_c: "1540",
        constant_d: 144000,
        constant_e: "-689",
        ait: 160
    },
    {
        id: "representativeFluid17",
        fluid_type: "Type 0 (Note 1)",
        applicable_materials: "Hydrogen Chloride",
        fluid: "HCL",
        mw: 36,
        liquid: 1185.362,
        nbp: -85,
        ambient: "Gas",
        heat_eq: "",
        constant_a: null,
        constant_b: null,
        constant_c: null,
        constant_d: null,
        constant_e: null,
        ait: "N/A"
    },
    {
        id: "representativeFluid18",
        fluid_type: "Type 0 (Note 1)",
        applicable_materials: "Nitric Acid",
        fluid: "Nitric Acid",
        mw: 63,
        liquid: 1521.749,
        nbp: 121,
        ambient: "Liquid ",
        heat_eq: "",
        constant_a: null,
        constant_b: null,
        constant_c: null,
        constant_d: null,
        constant_e: null,
        ait: "N/A"
    },
    {
        id: "representativeFluid19",
        fluid_type: "Type 0",
        applicable_materials: "Benzene, Toluene, Xylene, Cumene",
        fluid: "ALCL3",
        mw: 133.5,
        liquid: 2434.798,
        nbp: 194,
        ambient: "Powder",
        heat_eq: "Note 1",
        constant_a: 43400,
        constant_b: 39700,
        constant_c: "417",
        constant_d: 24000,
        constant_e: "N/A",
        ait: 558
    },
    {
        id: "representativeFluid20",
        fluid_type: "Type 0 (Note 1)",
        applicable_materials: "Nitrogen Dioxide",
        fluid: "NO2",
        mw: 90,
        liquid: 929.068,
        nbp: 135,
        ambient: "Liquid ",
        heat_eq: "",
        constant_a: null,
        constant_b: null,
        constant_c: null,
        constant_d: null,
        constant_e: null,
        ait: "N/A"
    },
    {
        id: "representativeFluid21",
        fluid_type: "Type 0",
        applicable_materials: "Phosgene",
        fluid: "Phosgene",
        mw: 99,
        liquid: 1377.583,
        nbp: 83,
        ambient: "Liquid ",
        heat_eq: "",
        constant_a: null,
        constant_b: null,
        constant_c: null,
        constant_d: null,
        constant_e: null,
        ait: "N/A"
    },
    {
        id: "representativeFluid22",
        fluid_type: "Type 0 (Note 1)",
        applicable_materials: "Toluene Diisocyanate",
        fluid: "TDI",
        mw: 174,
        liquid: 1217.399,
        nbp: 251,
        ambient: "Liquid ",
        heat_eq: "",
        constant_a: null,
        constant_b: null,
        constant_c: null,
        constant_d: null,
        constant_e: null,
        ait: 620
    },
    {
        id: "representativeFluid23",
        fluid_type: "",
        applicable_materials: "",
        fluid: "Methanol",
        mw: 32,
        liquid: 800.92,
        nbp: 65,
        ambient: "Liquid ",
        heat_eq: "Note 2",
        constant_a: 39300,
        constant_b: 87900,
        constant_c: "1920",
        constant_d: 53700,
        constant_e: "897",
        ait: 464
    },
    {
        id: "representativeFluid24",
        fluid_type: "Type 1",
        applicable_materials: "Propylene Oxide",
        fluid: "PO",
        mw: 58,
        liquid: 832.957,
        nbp: 34,
        ambient: "Liquid ",
        heat_eq: "Note 2",
        constant_a: 49500,
        constant_b: 174000,
        constant_c: "1560",
        constant_d: 115000,
        constant_e: "702",
        ait: 449
    },
    {
        id: "representativeFluid25",
        fluid_type: "Type 1",
        applicable_materials: "Benzene, Toluene, Xylene, Cumene",
        fluid: "Styrene / Aromatic",
        mw: 104,
        liquid: 683.986,
        nbp: 145,
        ambient: "Liquid ",
        heat_eq: "Note 2",
        constant_a: 89300,
        constant_b: 215000,
        constant_c: "772",
        constant_d: 99900,
        constant_e: "2440",
        ait: 490
    },
    {
        id: "representativeFluid26",
        fluid_type: "Type 1",
        applicable_materials: "Ethylene Glycol Monoethyl Ether Acetate",
        fluid: "EEA",
        mw: 132,
        liquid: 977.123,
        nbp: 156,
        ambient: "Liquid ",
        heat_eq: "Note 2",
        constant_a: 106000,
        constant_b: 240000,
        constant_c: "659",
        constant_d: 150000,
        constant_e: "1970",
        ait: 379
    },
    {
        id: "representativeFluid27",
        fluid_type: "Type 1",
        applicable_materials: "Ethylene Glycol Monoethyl Ether",
        fluid: "EE",
        mw: 90,
        liquid: 929.068,
        nbp: 135,
        ambient: "Liquid ",
        heat_eq: "Note 2",
        constant_a: 32500,
        constant_b: 300000,
        constant_c: "1170",
        constant_d: 208000,
        constant_e: "473",
        ait: 235
    },
    {
        id: "representativeFluid28",
        fluid_type: "Type 1",
        applicable_materials: "Ethylene Glycol",
        fluid: "EG",
        mw: 62,
        liquid: 1105.27,
        nbp: 197,
        ambient: "Liquid ",
        heat_eq: "Note 2",
        constant_a: 63000,
        constant_b: 146000,
        constant_c: "1670",
        constant_d: 97300,
        constant_e: "774",
        ait: 396
    },
    {
        id: "representativeFluid29",
        fluid_type: "Type 1",
        applicable_materials: "Ethylene Oxide",
        fluid: "EO",
        mw: 44,
        liquid: 881.013,
        nbp: 11,
        ambient: "Gas",
        heat_eq: "Note 2",
        constant_a: 33500,
        constant_b: 121000,
        constant_c: "1610",
        constant_d: 82400,
        constant_e: "737",
        ait: 429
    },
    {
        id: "representativeFluid30",
        fluid_type: "Type 1",
        applicable_materials: "Pyrophoric Materials",
        fluid: "Pyroporic",
        mw: 149,
        liquid: 734.012,
        nbp: 184,
        ambient: "Liquid ",
        heat_eq: "Note 1",
        constant_a: -8.5,
        constant_b: 1.01,
        constant_c: -0.000556,
        constant_d: 0.000000118,
        constant_e: "N/A ",
        ait: "Note 3"
    },
]

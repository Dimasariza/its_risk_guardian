/* eslint-disable */

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useState } from "react";

function LiquidInventories({visible, setVisible}: any) {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const liquidPhase = [
        {
            id: 'inventories1001',
            description: [
                <div>Process Columns (may be treated as two or three items)</div>,
                <div>-top half</div>, 
                <div>-middle section</div>, 
                <div>-bottom half</div>, 
            ],
            types: [
                <div>COLTOP</div>,
                <div>COLMID</div>,
                <div>COLBTM</div>
            ],
            examples: 'Distillation Columns, FCC Main Fractionator, Splitter Tower, Debutanizer, Packed Columns (see note 1), Liquid/Liquid Columns (see Note 2),',
            percent: [
                <div>25%</div>,
                <div>25%</div>,
                <div>37%</div>,
                <div>These default values are typical of trayed distillation columns and consider liquid holdup at the bottom of the vessel as well as the presence of chimney trays in the upper sections</div>,
            ],
        },
        {
            id: 'inventories1002',
            description: 'Accumulators and Drums',
            types: 'DRUM',
            examples: 'OH Accumulators, Feed Drums, HP/LP Separators, Nitrogen Storage drums, Steam Condensate Drums, 3- Phase Separators (see note 3)',
            percent: [
                <div>50% liquid Typically, 2-phase drums are liquid level controlled at 50%</div>, 
                <div>- top half</div>,
                <div>- middle section</div>,
                <div>- bottom half</div>,
            ],
        },
        {
            id: 'inventories1003',
            description: 'Knock-out Pots and Dryers',
            types: 'KODRUM ',
            examples: 'Compressor Knock-outs, Fuel Gas KO Drums (see note 4), Flare Drums, Air Dryers (see note 4)',
            percent: "10% liquid Much less liquid inventory expected in knock-out drums",
        },
        {
            id: 'inventories1004',
            description: 'Compressors',
            types: [
                <div>COMPC</div>,
                <div>COMPR</div>
            ],
            examples: 'Centrifugal and Reciprocating Compressors',
            percent: "Negligible, 0% ",
        },
        {
            id: 'inventories1005',
            description: 'Pumps',
            types: [
                <div>PUMP1S</div>,
                <div>PUMP2S</div>,
                <div>PUMPR</div>
            ],
            examples: 'Pumps',
            percent: "100% liquid",
        },
        {
            id: 'inventories1006',
            description: 'Heat Exchangers',
            types: [
                <div>Knock-out Pots and</div>,
            ],
            examples: 'Shell and Tube exchangers ',
            percent: "50% shell-side, 25% tube-side ",
        },
        {
            id: 'inventories1007',
            description: 'Fin Fan Air Coolers ',
            types: [
                <div>FINFAN</div>,
            ],
            examples: 'Total Condensers, Partial Condensers, Vapor Coolers and Liquid Coolers (see note 5)',
            percent: "25% liquid",
        },
        {
            id: 'inventories1008',
            description: 'Filters',
            types: [
                <div>FILTER</div>,
            ],
            examples: 'Knock-out Pots and Dryers',
            percent: "100% full",
        },
        {
            id: 'inventories1008',
            description: 'Piping ',
            types: [
                <div>PIPE-xx</div>,
            ],
            examples: 'Knock-out Pots and Dryers',
            percent: "100% full, calculated for Level 2 methodology",
        },
        {
            id: 'inventories1008',
            description: 'Reactors',
            types: [
                <div>REACTOR</div>,
            ],
            examples: 'Fluid Reactors (see note 6), Fixed-Bed Reactors (see note 7), mole-sieves',
            percent: "15% liquid",
        },
    ]

    const footerContent = (
        <div>
          <Button label="Cancel" icon="pi pi-check" 
          onClick={() => setVisible((prev: any) => ({ ...prev, detection: false }))} 
          severity="danger" />
          <Button label="Save" icon="pi pi-times" 
          onClick={() => setVisible((prev: any) => ({ ...prev, detection: false }))} 
          severity="success" />
        </div>
    );

    return (
        <>
            <Dialog header="Liquid Inventories" 
                visible={visible} 
                style={{ width: '50vw' }} 
                onHide={() => {if (!visible) return; setVisible((prev: any) => ({...prev, inventories: false})); }}
                footer={footerContent}
            >
                <DataTable value={liquidPhase} 
                    selectionMode={"single"} 
                    selection={selectedProduct} 
                    onSelectionChange={(e: any) => setSelectedProduct(e.value)} 
                    dataKey="id" 
                    tableStyle={{ minWidth: '50rem' }}>
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="description" header="Equipment Descripiton"></Column>
                    <Column field="types" header="Component Type"></Column>
                    <Column field="examples" header="Examples"></Column>
                    <Column field="percent" header="Default Liquid Volume Precent"></Column>
                </DataTable>
            </Dialog>
        </>
    )
}

export default LiquidInventories;
'use client';

import InputTypeText from "@/fragments/input-type-text";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { TreeTable } from "primereact/treetable";
import { useEffect, useState } from "react";



function COF() {
  const values: any = {
    f: 1036,
    k: 830.92,
    r: 446.22
  }

  const inputs = [
    {
      name: 'fluid',
      type: 'drop-down',
      placeholder: 'Representative Fluid',
      label: 'Representative Fluid',
      required: true,
      disabled: true,
      autoFocus: false,
      className: 'w-max'
    },
    {
      name: 'f',
      type: 'text',
      placeholder: 'AIT (°F)',
      label: 'AIT (°F)',
      required: true,
      disabled: true,
      autoFocus: false,
      className: 'w-max'
    },
    {
      name: 'k',
      type: 'text',
      placeholder: 'AIT (K)',
      label: 'AIT (K)',
      required: true,
      disabled: true,
      autoFocus: false,
      className: 'w-max'
    },
    {
      name: 'r',
      type: 'text',
      placeholder: 'AIT (°R)',
      label: 'AIT (°R)',
      required: true,
      disabled: true,
      autoFocus: false,
      className: 'w-max'
    },
  ];

  const [selectedItem, setSelectedItem] = useState(null);
  const [value, setValue] = useState(null);
  const [error, setError] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const items: any = [
    {name: "C1-C2"},
    {name: "C3-C4"},
    {name: "C5"},
    {name: "C6-C8"},
    {name: "C9-C12"},
    {name: "C13-C16"},
    {name: "C17-C25"},
    {name: "C25+"},
    {name: "H2"},
    {name: "H2S"},
    {name: "HF"},
  ]

  const nodes: any = {
    "data": [
      {
        "key": "0",
        "data": {
          "fluid":"C1-C2",
          "mw":"23",
          "liquid":"250.512",
          "nbp":"-125",
          "ambient":"Gas",
          "gasSpec":"Note 1",
        }
      },
      {
        "key": "1",
        "data": {
          "fluid":"C3-C4",
          "mw":"51",
          "liquid":"538.379",
          "nbp":"-21",
          "ambient":"Gas",
          "gasSpec":"Note 1",
        }
      },
    ]
  }

  return (
    <section className="p-4">
      <Button label="Show Table" size="small" className="mx-4" onClick={() => setVisible(true)} />

      <Dialog header="Representative Fluid Table" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
        <div>
          <TreeTable value={nodes.data} tableStyle={{ minWidth: '50rem' }}>
            <Column field="fluid" header="Fluid" expander></Column>
            <Column field="mw" header="MW"></Column>
            <Column field="liquid" header="Luquid Density (lb/ft3)"></Column>
            <Column field="nbp" header="NBP (C)"></Column>
            <Column field="ambient" header="Ambient State"></Column>
            <Column field="gasSpec" header="Ideal gas Spec"></Column>
          </TreeTable>
        </div>
      </Dialog>
        
      {
        inputs.map((props: any, key: number) => {
          const {type } = props;
          if(type == "drop-down") {
            return <Dropdown 
              key={key}
              id="equipment" 
              value={selectedItem} 
              onChange={() => {}} 
              options={items} 
              optionLabel="name"
              placeholder="List Representative fulid" />
          } else if (type == "text") {
            return <InputTypeText 
              props={props} 
              key={key} 
              value={values} 
              setValue={setValue} 
              errorMessage={error?.[props.name]} 
            />
          }
        })
      }


    </section>
  );
}

export default COF;

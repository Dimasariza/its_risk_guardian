'use client';

import InputCalendar from "@/fragments/input-calendar";
import { Column } from "primereact/column";
// import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { TreeTable } from "primereact/treetable";
import { useEffect, useState } from "react";
import recomendationTable from "./tableRecomendation";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { DataTable } from "primereact/datatable";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

function Recomendation() {
  const [value, setValue] = useState<any>();
  const [nodes, setNodes] = useState<any>([]);
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState<any>(0);

  useEffect(() => {
    const nodesArr: any = []
    recomendationTable.forEach((item: any, keyOne: number) => {
      if(item?.level) {
        item?.level.map((e: any, keyTwo: number) => {
          const tableNodes = {
            key: `${keyOne}${keyTwo}`,
            data: {
              dm: item.damageFactor,
              level: e.name,
              inspOfEfectivess: e.category,
              activities: e.category[keyTwo].nonIntrusive
            }
          }
          nodesArr.push(tableNodes) 
        })
      }
    })
    setNodes(nodesArr)
  }, [])

  const headerGroup = (
    <ColumnGroup>
        <Row>
            <Column header="Damage Factor" headerStyle={{ width: '5rem' }} rowSpan={2} />
            <Column header="Level of Inspection" rowSpan={2} />
            <Column header="Inspection Effectiveness" rowSpan={2} />
            <Column header="Inspection Activities" rowSpan={2}/>
            <Column header="Inspection Date" colSpan={2}/>
        </Row>
        <Row>
            <Column header="Shell" />
            <Column header="Head"/>
        </Row>
    </ColumnGroup>
  );

  const representativeBodyTemplate = (rowData: any) => {
    return (
        <div className="flex align-items-center gap-2">
            <span className="font-bold">{rowData.data.dm}</span>
        </div>
    );
  };

  const levelOfInsp = ({data}: any) => {
    return <div className="flex align-items-center">
      <Checkbox onChange={(e: any) => setChecked(e.checked)} checked={checked} className="mr-2" ></Checkbox>
      <span>{ data.level }</span> 
    </div>
  }

  const inspOfEfectivess = ({data}: any) => {
    const item = data.inspOfEfectivess.map((i: any) => ({...i, name: `(${i.value}) ${i.effectiveness}`}))
    return <Dropdown 
      id="inspOfEfectivess" 
      onChange={() => {}} 
      value={item[selected].value}
      options={item} 
      optionLabel="name"
      placeholder="Effectiveness" 
      disabled={true}
    />
  }

  const inspActivities = (rowData: any) => {
    return (
      <div>
        { rowData.data.activities }
      </div>
    ) 
  }

  const shellBody = () => {
    return <>Shell</>
  }

  const headBody = () => {
    return <>Head</>
  }

  return (
    <>
      <section className="p-4">
        <DataTable resizableColumns={true} value={nodes} headerColumnGroup={headerGroup} rowGroupMode="rowspan" groupRowsBy="dm">
          <Column field="dm" style={{ minWidth: '5rem' }} body={representativeBodyTemplate} ></Column>
          <Column field="level" body={levelOfInsp} ></Column>
          <Column body={inspOfEfectivess}></Column>
          <Column field="activities" body={inspActivities}></Column>
          <Column field="shell" body={shellBody}></Column>
          <Column field="head" body={headBody}></Column>
        </DataTable>
        <div className="flex flex-column my-3">
          <label htmlFor="">Notes</label>
          <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} />
        </div>
      </section>
    </>
  );
}

export default Recomendation;

/* eslint-disable */

'use client';

import { Column } from "primereact/column";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useState } from "react";
import { recomendationPV, recomendationTank } from "./tableRecomendation";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { DataTable } from "primereact/datatable";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Calendar } from "primereact/calendar";
import { useSelector } from "react-redux";

function Recomendation() {
  const [value, setValue] = useState<any>();
  const [nodes, setNodes] = useState<any>([]);

  const data = useSelector((state: any) => state.Reducer);
  const componentType = data.menu?.comp_componentType

  useEffect(() => { 
    const nodesArr: any = []
    const recomendation = componentType == "Tank" ? recomendationTank : recomendationPV
    console.log(recomendation)

    recomendation?.forEach((item: any, keyOne: number) => {
      if(!item?.level) return
      item?.level.map((e: any, keyTwo: number) => {
        const tableNodes = {
          id: `${keyOne}${keyTwo}`,
          dm: item.damageFactor,
          level: e.name,
          inspOfEfectivess: e.category,
          activities: e.category[keyTwo].nonIntrusive,
          disabled: keyTwo != 0,
          activitiesSelected: 0
        }
        nodesArr.push(tableNodes) 
      })
    })
    setNodes(nodesArr)    
  }, [])

  const headerGroup = (
    <ColumnGroup>
        <Row>
          <Column header="Damage Factor" headerStyle={{ width: '5rem' }} rowSpan={2} />
          <Column header="Level of Inspection" rowSpan={2} />
          <Column header="Inspection Category" rowSpan={2} />
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
        <div className="flex align-items-center gap-2" key={rowData.dm}>
            <span className="font-bold">{rowData.dm}</span>
        </div>
    );
  };

  const levelOfInsp = (rowData: any) => {
    const {level, disabled, id} = rowData;
    return <div className="flex align-items-center" key={id}>
      <Checkbox onChange={(e: any) => { 
          setNodes((prev: any) => {
            return prev.map((i: any) => i.id == id ? {...i, disabled: !e.checked} : i)
          })
        }} 
        checked={!disabled} 
        className="mr-2" 
      >
      </Checkbox>
      <span>{ level }</span> 
    </div>
  }

  const inspOfEfectivess = ({inspOfEfectivess, disabled, activitiesSelected, id}: any) => {
    const item = inspOfEfectivess.map((i: any) => ({...i, name: `(${i.value}) ${i.effectiveness}`}));
    return <Dropdown 
      key={id}
      id="inspOfEfectivess" 
      onChange={(e) => {
        const selectedIndex = item.findIndex((x:any) => x.value == e.value);
        setNodes((prev: any) => { 
          return prev.map((i: any) => i.id == id ? {...i, 
            activitiesSelected: selectedIndex,
            activities: inspOfEfectivess[selectedIndex].nonIntrusive
          } : i)
        })
      }} 
      value={item[activitiesSelected].value}
      options={item} 
      optionLabel="name"
      placeholder="Effectiveness" 
      disabled={disabled}
    />
  }

  const shellBody = () => {
    return <Calendar id="shell" style={{width: 235}} />
    
  }

  const headBody = () => {
    return <Calendar id="head" style={{width: 235}} />
  }

  return (
    <>
      <section className="p-4">
        {
          ["Pressure Vessel", "Tank"].includes(componentType) &&
          <DataTable 
            resizableColumns={true} 
            value={nodes} 
            headerColumnGroup={headerGroup} 
            rowGroupMode="rowspan" 
            groupRowsBy="dm" 
            sortMode="single" 
            tableStyle={{ minWidth: '20rem' }}
          >
            <Column field="dm" style={{ minWidth: '5rem' }} body={representativeBodyTemplate} ></Column>
            <Column field="level" body={levelOfInsp} ></Column>
            <Column body={inspOfEfectivess}></Column>
            <Column field="activities"></Column>
            <Column field="shell" body={shellBody}></Column>
            <Column field="head" body={headBody}></Column>
          </DataTable>
        }
        
        <div className="flex flex-column my-3">
          <label htmlFor="">Notes</label>
          <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} />
        </div>
      </section>
    </>
  );
}

export default Recomendation;

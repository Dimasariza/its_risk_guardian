'use client';

import InputCalendar from "@/fragments/input-calendar";
import { Column } from "primereact/column";
import { InputTextarea } from "primereact/inputtextarea";
import { act, useEffect, useState } from "react";
// import recomendationTable from "./tableRecomendation";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { DataTable } from "primereact/datatable";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

function Recomendation() {
  const [value, setValue] = useState<any>();
  const [nodes, setNodes] = useState<any>([]);
  const [selected, setSelected] = useState<any>(0);

  useEffect(() => {
    const nodesArr: any = []
    // recomendationTable.forEach((item: any, keyOne: number) => {
    //   if(item?.level) {
    //     item?.level.map((e: any, keyTwo: number) => {
    //       const tableNodes = {
    //         id: `${keyOne}${keyTwo}`,
    //         dm: item.damageFactor,
    //         level: e.name,
    //         inspOfEfectivess: e.category,
    //         activities: e.category[keyTwo].nonIntrusive,
    //         disabled: keyTwo != 0,
    //         activitiesSelected: 0
    //       }
    //       nodesArr.push(tableNodes) 
    //     })
    //   }
    // })
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

  const inspActivities = ({activities, id}: any) => {
    return (
      <>
        { activities }
      </>
    ) 
  }

  const shellBody = () => {
    return <>
      {/* <InputCalendar /> */}
    </>
  }

  const headBody = () => {
    return <>Head</>
  }

  return (
    <>
      <section className="p-4">
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
          {/* <Column field="activities"></Column> */}
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


// interface Country {
//   name: string;
//   code: string;
// }

// interface Representative {
//   name: string;
//   code: string;
// }

// interface Customer {
//   id: number;
//   name: string;
//   country: Country;
//   company: string;
//   date: string;
//   status: string;
//   verified: boolean;
//   activity: number;
//   representative: Representative;
//   balance: number;
// }


export default Recomendation;

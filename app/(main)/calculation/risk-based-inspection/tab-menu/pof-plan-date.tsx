"use client";

import { TabMenu } from "primereact/tabmenu";
import { useState } from "react";

function POFPlanDate() {
    const [tabActive, setTabActive] = useState<string>("gff");

  const items = [
    { 
      label: 'GFF', 
      command: () => {
          setTabActive("gff");
      }
    },
    { 
      label: 'DF Thinning', 
      command: () => {
          setTabActive("df_thinning");
      }
    },
    { 
      label: 'DF External Corrosion', 
      command: () => {
          setTabActive("df_ex_corrosion");
      }
    },
    { 
      label: 'DF A', 
      command: () => {
          setTabActive("df_a");
      }
    },
    { 
      label: 'Total DF', 
      command: () => {
          setTabActive("total_df");
      }
    },
    { 
      label: 'POF Value', 
      command: () => {
          setTabActive("pof_value");
      }
    },
  ];
  
  const tabMenuView = () => {
    switch(tabActive) {
      case "gff":
        return <div>GFF Works!!!</div>
      case "df_thinning":
        return <div>DF Thinning Works!!!</div>
      case "df_ex_corrosion":
        return <div>DF EX Corrosion Works!!!</div>
      case "df_a":
        return <div>DF A Works!!!</div>
      case "total_df":
        return <div>Total DF Works!!!</div>
      case "pof_value":
        return <div>POF Value Works!!!</div>
      default:
        return <div></div>
    }
  }

    return(
        <>
            <TabMenu model={items} />
            {tabMenuView()}
        </>
    )
}

export default POFPlanDate;
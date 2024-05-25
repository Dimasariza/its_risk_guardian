"use client";

import { Card } from "primereact/card";
import { TabMenu } from "primereact/tabmenu";
import { useState } from "react";
import AssetSummary from "../../assets/asset-register/tab-menu/asset-summary";
import DamageMechanism from "./tab-menu/damage-mechanism";
import ScreeningFactor from "./tab-menu/screaning-factor";
import POF from "./tab-menu/pof";
import COF from "./tab-menu/cof";
import RiskAnalysis from "./tab-menu/risk-analysis";
import InspectionPlanning from "./tab-menu/inspection-planning";
import Summary from "./tab-menu/summary";
import GeneralData from "./tab-menu/general-data";

function RiskBasedInspection() {
  const [tabActive, setTabActive] = useState<string>("general_data");

  const items = [
    { 
      label: 'General Data', 
      command: () => {
          setTabActive("general_data");
      }
    },
    { 
      label: 'Damage Mechanism', 
      command: () => {
          setTabActive("damage_mechanism");
      }
    },
    { 
      label: 'Screening Factor', 
      command: () => {
          setTabActive("screening_factor");
      }
    },
    { 
      label: 'POF', 
      command: () => {
          setTabActive("pof");
      }
    },
    { 
      label: 'COF', 
      command: () => {
          setTabActive("cof");
      }
    },
    { 
      label: 'Risk Analysis', 
      command: () => {
          setTabActive("risk_analysis");
      }
    },
    { 
      label: 'Inspection Planning', 
      command: () => {
          setTabActive("inspection_planning");
      }
    },
    { 
      label: 'Summary', 
      command: () => {
          setTabActive("summary");
      }
    },
  ];

  const tabMenuView = () => {
    switch(tabActive) {
      case "general_data":
      return <GeneralData />
      case "damage_mechanism":
      return <DamageMechanism />
      case "screening_factor":
      return <ScreeningFactor />
      case "pof":
      return <POF />
      case "cof":
      return <COF />
      case "risk_analysis":
      return <RiskAnalysis />
      case "inspection_planning":
      return <InspectionPlanning />
      case "summary":
      return <Summary />
    }
  }
    
  return (
    <>
      <Card>
      <TabMenu model={items} />
        {tabMenuView()}
      </Card>
    </>
  )
}

export default RiskBasedInspection;
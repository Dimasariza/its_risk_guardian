"use client";

import { Card } from "primereact/card";
import { TabMenu } from "primereact/tabmenu";
import { useState } from "react";
import AssetSummary from "./tab-menu/asset-summary";
import Installation from "./tab-menu/installation";
import FluidProperties from "./tab-menu/fluid-properties";
import Documents from "./tab-menu/documents";

function AssetRegister() {
  const [tabActive, setTabActive] = useState<string>("asset_summary");

  const items = [
    { 
      label: 'Asset Summary', 
      command: () => {
          setTabActive("asset_summary");
      }
    },
    { 
      label: 'Installation', 
      command: () => {
          setTabActive("installation");
      }
    },
    { 
      label: 'Fluid Properties', 
      command: () => {
          setTabActive("fluid_properties");
      }
    },
    { 
      label: 'Documents', 
      command: () => {
          setTabActive("documents");
      }
    }
  ];

  const tabMenuView = () => {
    switch(tabActive) {
      case "asset_summary":
      return <AssetSummary />
      case "installation":
      return <Installation />
      case "fluid_properties":
      return <FluidProperties />
      case "documents":
      return <Documents />
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

export default AssetRegister;
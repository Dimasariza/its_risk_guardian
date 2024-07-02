'use client';

import { Card } from 'primereact/card';
import { TabMenu } from 'primereact/tabmenu';
import { useState } from 'react';
import COF from './tab-menu/cof/cof';
import RiskAnalysis from './tab-menu/risk-analysis';
import InspectionPlanning from './tab-menu/recomendation/recomendation';
import Summary from './tab-menu/summary';
import GeneralData from './tab-menu/general-data/general-data';
import DamageMechanism from './tab-menu/damage-mechanism/damage-mechanism';
import POFPlanDate from './tab-menu/pof-plan-date';
import POFRBIDate from './tab-menu/pof-rbi-date';
import { useSelector } from 'react-redux';
import Recomendation from './tab-menu/recomendation/recomendation';
import POLPlanDate from './tab-menu/pol-plan-date/pol-plan-date';
import POLRBIDate from './tab-menu/pol-rbi-date/pol-rbi-date';

function RiskBasedInspection() {
  const [tabActive, setTabActive] = useState<string>('general_data');

  const data = useSelector((state: any) => state.Reducer);
  console.log(data)
  const items = [
    {
      label: 'General Data',
      command: () => {
        setTabActive('general_data');
      }
    },
    {
      label: 'Damage Mechanism',
      command: () => {
        setTabActive('damage_mechanism');
      }
    },
    {
      label: 'POF RBI Date',
      command: () => {
        setTabActive('pof_rbi_date');
      }
    },
    {
      label: 'POF Plan Date',
      command: () => {
        setTabActive('pof_plan_date');
      }
    },
    {
      label: 'POL RBI Date',
      disabled: data.menu?.comp_componentType != "Pressure Relief Device",
      command: () => {
        setTabActive('pol_rbi_date');
      }
    },
    {
      label: 'POL Plan Date',
      disabled: data.menu?.comp_componentType != "Pressure Relief Device",
      command: () => {
        setTabActive('pol_plan_date');
      }
    },
    {
      label: 'COF',
      command: () => {
        setTabActive('cof');
      }
    },
    {
      label: 'Risk Analysis',
      command: () => {
        setTabActive('risk_analysis');
      }
    },
    {
      label: 'Recomendation',
      command: () => {
        setTabActive('recomendation');
      }
    },
    {
      label: 'Summary',
      command: () => {
        setTabActive('summary');
      }
    }
  ];

  const tabMenuView = () => {
    switch (tabActive) {
      case 'general_data':
        return <GeneralData />;
      case 'damage_mechanism':
        return <DamageMechanism />;
      case 'pof_rbi_date':
        return <POFRBIDate />;
      case 'pof_plan_date':
        return <POFPlanDate />;
      case 'pol_rbi_date':
        return <POLRBIDate />;
      case 'pol_plan_date':
        return <POLPlanDate />;
      case 'cof':
        return <COF />;
      case 'risk_analysis':
        return <RiskAnalysis />;
      case 'inspection_planning':
        return <InspectionPlanning />;
      case 'recomendation':
        return <Recomendation />
      case 'summary':
        return <Summary />;
      default:
        return <GeneralData />;
    }
  };


  return (
    <>
      <Card title={data.menu?.label ?? "No Selected Data"}>
        <TabMenu model={items} />
        {tabMenuView()}
      </Card>
    </>
  );
}

export default RiskBasedInspection;

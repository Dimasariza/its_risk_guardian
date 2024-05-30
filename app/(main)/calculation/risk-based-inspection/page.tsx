'use client';

import { Card } from 'primereact/card';
import { TabMenu } from 'primereact/tabmenu';
import { useState } from 'react';
import COF from './tab-menu/cof';
import RiskAnalysis from './tab-menu/risk-analysis';
import InspectionPlanning from './tab-menu/inspection-planning';
import Summary from './tab-menu/summary';
import GeneralData from './tab-menu/general-data';
import DamageMechanism from './tab-menu/damage-mechanism';
import POFPlanDate from './tab-menu/pof-plan-date';
import POFRBIDate from './tab-menu/pof-rbi-date';
import { useSelector } from 'react-redux';

function RiskBasedInspection() {
  const [tabActive, setTabActive] = useState<string>('general_data');

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
      label: 'Inspection Planning',
      command: () => {
        setTabActive('inspection_planning');
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
      case 'cof':
        return <COF />;
      case 'risk_analysis':
        return <RiskAnalysis />;
      case 'inspection_planning':
        return <InspectionPlanning />;
      case 'summary':
        return <Summary />;
      default:
        return <GeneralData />;
    }
  };

  const data = useSelector((state: any) => state.Reducer);

  return (
    <>
      <Card title={data.menu.label}>
        <TabMenu model={items} />
        {tabMenuView()}
      </Card>
    </>
  );
}

export default RiskBasedInspection;

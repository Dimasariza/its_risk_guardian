'use client';

import { Card } from 'primereact/card';
import { TabMenu } from 'primereact/tabmenu';
import { useRef, useState } from 'react';
import COF from './tab-menu/cof/cof';
import RiskAnalysis from './tab-menu/risk-analysis';
import InspectionPlanning from './tab-menu/recomendation/recomendation';
import Summary from './tab-menu/summary';
import GeneralData from './tab-menu/general-data/generalData';
import DamageMechanism from './tab-menu/damage-mechanism/damageMechanism';
import POFPlanDate from './tab-menu/pof-plan-date';
import POFRBIDate from './tab-menu/pof-rbi-date';
import { useDispatch, useSelector } from 'react-redux';
import Recomendation from './tab-menu/recomendation/recomendation';
import POLPlanDate from './tab-menu/pol-plan-date/pol-plan-date';
import POLRBIDate from './tab-menu/pol-rbi-date/pol-rbi-date';
import { EditData, EditDone } from '@/redux/action/action';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import POFRBIDatePRD from './tab-menu/prd pof/pofRBIDatePRD';

function RiskBasedInspection() {
  const [tabActive, setTabActive] = useState<string>('general_data');
  const data = useSelector((state: any) => state.Reducer);
  const dispatch = useDispatch();
  const { edit } = useSelector((state: any) => state.EditReducer);
  const toastRef = useRef<Toast>(null);

  const items = [
    {
      label: 'General Data',
      disabled: edit,
      command: () => {
        setTabActive('general_data');
      }
    },
    {
      label: 'Damage Mechanism',
      disabled: edit,
      command: () => {
        setTabActive('damage_mechanism');
      }
    },
    {
      label: 'POF RBI Date',
      disabled: edit,
      command: () => {
        setTabActive('pof_rbi_date');
      }
    },
    {
      label: 'POF Plan Date',
      disabled: edit,
      command: () => {
        setTabActive('pof_plan_date');
      }
    },
    {
      label: 'POL RBI Date',
      disabled: edit || data.menu?.comp_componentType != "Pressure Relief Device",
      command: () => {
        setTabActive('pol_rbi_date');
      }
    },
    {
      label: 'POL Plan Date',
      disabled: edit || data.menu?.comp_componentType != "Pressure Relief Device",
      command: () => {
        setTabActive('pol_plan_date');
      }
    },
    {
      label: 'COF',
      disabled: edit,
      command: () => {
        setTabActive('cof');
      }
    },
    {
      label: 'Risk Analysis',
      disabled: edit,
      command: () => {
        setTabActive('risk_analysis');
      }
    },
    {
      label: 'Recomendation',
      disabled: edit,
      command: () => {
        setTabActive('recomendation');
      }
    },
    {
      label: 'Summary',
      disabled: edit,
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
        return <POFRBIDatePRD />;
      case 'pol_plan_date':
        return <POFRBIDatePRD />;
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

  const headMenu = () => {
    const button: any = [
      {
        icon: 'pi pi-save',
        severity: 'success',
        disabled: !edit,
        tooltip: 'Save',
        command: () => {
          console.log()
          dispatch(EditDone());
        }
      },
      {
        icon: 'pi pi-file-edit',
        severity: 'info',
        // disabled: edit,
        tooltip: 'Edit',
        command: () => {
          dispatch(edit ? EditDone(true) : EditData());
        }
      },
      {
        icon: 'pi pi-trash',
        severity: 'danger',
        tooltip: 'Delete',
        command: () => {
          // setDialogVisible(true);
        }
      }
    ];
    return <div className='flex justify-content-between'>
      <h3 className='m-3'>{data.menu?.label ?? "No Selected Data"}</h3>
      <div className="mx-3">
        {button.map(({ icon, severity, tooltip, disabled, command }: any, key: number) => (
          <Button 
            key={key} 
            icon={icon} 
            rounded 
            text 
            severity={severity} 
            disabled={disabled} 
            tooltip={tooltip} 
            tooltipOptions={{ position: 'bottom' }} 
            onClick={command} />
        ))}
      </div>
    </div>
  }

  return (
    <>
      <Toast ref={toastRef} position="bottom-right" />
      <Card title={headMenu()} >
        <TabMenu model={items}/>
        {tabMenuView()}
      </Card>
    </>
  );
}

export default RiskBasedInspection;

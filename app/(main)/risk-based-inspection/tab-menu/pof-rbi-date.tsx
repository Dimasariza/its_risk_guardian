'use client';

import { TabMenu } from 'primereact/tabmenu';
import { useState } from 'react';
import POFValue from './pof-rbi-date/value/pofValue';
import DFThinning from './pof-rbi-date/thinning/df-thinning';
import DFExternalCorrosion from './pof-rbi-date/external-corrosion/dfExternalCorrosion';
import DFAlkalineCorrosion from './pof-rbi-date/alkaline/dfAlkaline';
import { useSelector } from 'react-redux';
import POFRBIDatePRD from './pof prd/rbi/pofRBIDatePRD';

function POFRBIDate() {
  const [tabActive, setTabActive] = useState<string>('df_thinning');
  let { edit } = useSelector((state: any) => state.EditReducer);
  const data = useSelector((state: any) => state.Reducer);
  const componentType = data.menu?.comp_componentType

  const items = [
    {
      label: 'DF Thinning',
      disabled: edit,
      command: () => {
        setTabActive('df_thinning');
      }
    },
    {
      label: 'DF External Corrosion',
      disabled: edit,
      command: () => {
        setTabActive('df_ex_corrosion');
      }
    },
    {
      label: 'DF Alkaline',
      disabled: edit || componentType == "Tank",
      command: () => {
        setTabActive('df_alkaline');
      }
    },
    {
      label: 'POF Value',
      disabled: edit,
      command: () => {
        setTabActive('pof_value');
      }
    }
  ];

  const tabMenuView = () => {
    switch (tabActive) {
      case 'df_thinning':
        return <DFThinning />;
      case 'df_ex_corrosion':
        return <DFExternalCorrosion />;
      case 'df_alkaline':
        return <DFAlkalineCorrosion />;
      case 'pof_value':
        return <POFValue />;
      default:
        return <DFThinning />;
    }
  };



  return (
    <>
      {
        componentType == "Pressure Relief Device" 
        ? <POFRBIDatePRD/>
        : <div>
          <TabMenu model={items} />
          {tabMenuView()}
        </div>
      }
    </>
  );
}

export default POFRBIDate;

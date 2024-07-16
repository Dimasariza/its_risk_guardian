'use client';

import { TabMenu } from 'primereact/tabmenu';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import POLPlanDate from './pol-plan-date/pol-plan-date';
import DFThinning from './pof-plan-date/thinning/df-thinning';
import DFExternalCorrosion from './pof-plan-date/external-corrosion/dfExternalCorrosion';
import DFAlkalineCorrosion from './pof-plan-date/alkaline/dfAlkaline';
import POFValue from './pof-plan-date/value/pofValue';

function POFPlanDate() {
  const [tabActive, setTabActive] = useState<string>('df_thinning');
  const { edit } = useSelector((state: any) => state.EditReducer);

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
      disabled: edit,
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

  const data = useSelector((state: any) => state.Reducer);
  return (
    <>
      {
        data.menu.comp_componentType == "Pressure Relief Device" 
        ? <POLPlanDate/>
        : <div>
          <TabMenu model={items} />
          {tabMenuView()}
        </div>
      }
      {/* <TabMenu model={items} />
      {tabMenuView()} */}
    </>
  );
}

export default POFPlanDate;

'use client';

import { TabMenu } from 'primereact/tabmenu';
import { useState } from 'react';
import DFThinning from './pof-rbi-date/thinning/df-thinning';
import DFExternalCorrosion from './pof-rbi-date/external-corrosion/df-external-corrosion';
import DFAlkalineCorrosion from './pof-rbi-date/alkaline/df-alkaline';
import POFValue from './pof-rbi-date/value/pof-value';
import { useSelector } from 'react-redux';

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

  return (
    <>
      <TabMenu model={items} />
      {tabMenuView()}
    </>
  );
}

export default POFPlanDate;

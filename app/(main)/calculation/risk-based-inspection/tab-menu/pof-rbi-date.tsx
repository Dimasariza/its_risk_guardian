'use client';

import { TabMenu } from 'primereact/tabmenu';
import { useState } from 'react';
import POFValue from './pof-rbi-date/value/pof-value';
import DFThinning from './pof-rbi-date/thinning/df-thinning';
import DFExternalCorrosion from './pof-rbi-date/external-corrosion/df-external-corrosion';
import DFAlkalineCorrosion from './pof-rbi-date/alkaline/df-alkaline';

function POFRBIDate() {
  const [tabActive, setTabActive] = useState<string>('df_thinning');

  const items = [
    {
      label: 'DF Thinning',
      command: () => {
        setTabActive('df_thinning');
      }
    },
    {
      label: 'DF External Corrosion',
      command: () => {
        setTabActive('df_ex_corrosion');
      }
    },
    {
      label: 'DF Alkaline',
      command: () => {
        setTabActive('df_alkaline');
      }
    },
    {
      label: 'POF Value',
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

export default POFRBIDate;

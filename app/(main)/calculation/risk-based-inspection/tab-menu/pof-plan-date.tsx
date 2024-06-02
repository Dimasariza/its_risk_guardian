'use client';

import { TabMenu } from 'primereact/tabmenu';
import { useState } from 'react';
import DFThinning from './pof-rbi-date/df-thinning';
import DFExternalCorrosion from './pof-rbi-date/df-external-corrosion';
import DFAlkalineCorrosion from './pof-rbi-date/df-alkaline';

function POFPlanDate() {
  const [tabActive, setTabActive] = useState<string>('df_thinning');

  const items = [
    // {
    //   label: 'GFF',
    //   command: () => {
    //     setTabActive('gff');
    //   }
    // },
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
    // {
    //   label: 'Total DF',
    //   command: () => {
    //     setTabActive('total_df');
    //   }
    // },
    {
      label: 'POF Value',
      command: () => {
        setTabActive('pof_value');
      }
    }
  ];

  const tabMenuView = () => {
    switch (tabActive) {
      // case 'gff':
      //   return <div>GFF Works!!!</div>;
      case 'df_thinning':
        return <DFThinning />;
      case 'df_ex_corrosion':
        return <DFExternalCorrosion />;
      case 'df_alkaline':
        return <DFAlkalineCorrosion />;
      case 'total_df':
        return <div>Total DF Works!!!</div>;
      case 'pof_value':
        return <div>POF Value Works!!!</div>;
      default:
        return <div></div>;
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

'use client';

import { TabMenu } from 'primereact/tabmenu';
import { useEffect, useRef, useState } from 'react';
import POFValue from './pof-rbi-date/value/pofValue';
import DFThinning from './pof-rbi-date/thinning/df-thinning';
import DFExternalCorrosion from './pof-rbi-date/external-corrosion/dfExternalCorrosion';
import DFAlkalineCorrosion from './pof-rbi-date/alkaline/dfAlkaline';
import InputTypeText from '@/fragments/input-type-text';
import InputCalendar from '@/fragments/input-calendar';
import { useSelector } from 'react-redux';
import AdjusmentFactor from './prd pof/adjusmentFactor';
import InputValueOnly from '@/fragments/inputValueOnly';
import InspectionConfidenceFactor from './prd pof/inspectionConfidenceFactor';
import InitiatingEventFrequencies from './prd pof/initiatingEventFrequencies';
import ClassProtectedEquipment from './prd pof/inspectionEffectiveness';
import COFPV from './cof/cofPV';
import POLPlanDate from './pol-plan-date/pol-plan-date';
import POFRBIDatePRD from './prd pof/pofRBIDatePRD';

const inputs = [
  {
    name: 'pofRBI_tInsp',
    type: 'text',
    placeholder: 'Tag Number',
    label: 'Tag Number',
    autoFocus: true,
    className: ''
  },
  {
    name: 'pofRBI_fluidService',
    type: 'text',
    placeholder: 'Tag Number',
    label: 'Tag Number',
    autoFocus: true,
    className: ''
  },
  {
    name: 'pofRBI_typicalTemp',
    type: 'text',
    placeholder: 'Tag Number',
    label: 'Tag Number',
    autoFocus: true,
    className: ''
  },
  {
    name: 'pofRBI_designType',
    type: 'text',
    placeholder: 'Tag Number',
    label: 'Tag Number',
    autoFocus: true,
    className: ''
  },
  {
    name: 'pofRBI_dischargeLocation',
    type: 'text',
    placeholder: 'Tag Number',
    label: 'Tag Number',
    autoFocus: true,
    className: ''
  },
]

function POFRBIDate() {
  const [tabActive, setTabActive] = useState<string>('df_thinning');
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState<any>({});

  let { edit } = useSelector((state: any) => state.EditReducer);

  useEffect(() => {
    // edit = true; // to disabled edit useeffect in first call

  }, [])

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

  const toast = useRef<any>(null);

  const data = useSelector((state: any) => state.Reducer);

  return (
    <>
      {/* <div className='flex flex-wrap lg:column-gap-5 mt-5'>
        {
          inputs.map((props: any, key: number) => {
            if (props.type == 'text' || props.type == 'number') {
              return <InputTypeText props={{...props, disabled: disabled || !edit }} key={key} value={value} setValue={setValue} handleOnChange={() => {}} />;
            } else if (props.type == 'calendar') {
              return <InputCalendar props={{...props, disabled: disabled || !edit }} key={key} value={value} setValue={setValue} />;
            } 
          })
        }
      </div>

      <div className='flex w-full flex-wrap flex-column gap-2 mt-5'>
        <FluidServiceSeverity />
        <WeibulParameters />
        <AdjusmentFactor />
        <InspectionConfidenceFactor />
        <InitiatingEventFrequencies />
        <ClassProtectedEquipment />
      </div>

      <InputValueOnly label="" value={null} /> */}
      {
        data.menu.comp_componentType == "Pressure Relief Device" 
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

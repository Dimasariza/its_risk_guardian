'use client';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import { IDamageMechanism } from '@/types/damageMechanism';
import { Checkbox } from 'primereact/checkbox';
import damageFactor from './damage-factor';
import { useSelector } from 'react-redux';

function DamageMechanism() {
  const uncheckedAll = {
    dm_thinning: false,
    dm_comp_linning: false,
    dm_scc_caustic: false,
    dm_scc_amine: false,
    dm_scc_sulfide: false,
    dm_scc_hic_h2s: false,
    dm_scc_alkaline: false,
    dm_scc_polythionic: false,
    dm_scc_chloride: false,
    dm_scc_chloride_A: false,
    dm_scc_chloride_B: false,
    dm_scc_chloride_C: false,
    dm_scc_hydrogen: false,
    dm_scc_hic_hf: false,
    dm_exCor: false,
    dm_exCor_A: false,
    dm_exCor_B: false,
    dm_exCor_C: false,
    dm_exCor_D: false,
    dm_exCor_E: false,
    dm_exCor_F: false,
    dm_exCor_G: false,
    dm_exCor_H: false,
    dm_exCor_I: false,
    dm_cor_under_ins: false,
    dm_exChloride: false,
    dm_exChloride_A: false,
    dm_exChloride_B: false,
    dm_exChloride_C: false,
    dm_exChloride_D: false,
    dm_highTemp: false,
    dm_highTemp_A: false,
    dm_highTemp_B: false,
    dm_highTemp_C: false,
    dm_brittleFracture: false,
    dm_brittleFracture_A: false,
    dm_brittleFracture_B: false,
    dm_low_alloy_steel: false,
    dm_low_alloy_steel_A: false,
    dm_low_alloy_steel_B: false,
    dm_embrittlement: false,
    dm_embrittlement_A: false,
    dm_embrittlement_B: false,
    dm_sigma_phase: false,
    dm_sigma_phase_A: false,
    dm_sigma_phase_B: false,
    dm_piping_mechanical: false,
    dm_piping_mechanical_A: false,
    dm_piping_mechanical_B: false,
  }
  const [checked, setChecked] = useState<any>(uncheckedAll);
  const edit = useSelector((state: any) => state.EditReducer);

  useEffect(() => {
    
  }, [])

  const damageFactorStatus = (value: any) => {
    const {screeningCriteria, checkedValue} = value;
    return (
      <div className="flex justify-content-center">
        <Checkbox 
          readOnly={typeof screeningCriteria == 'object'} 
          onChange={(e) => setChecked((prev: any) => ({...prev, [checkedValue]: e.checked}))} 
          checked={checked[checkedValue]}
          disabled={!edit}
          >
        </Checkbox>
      </div>
    );
  };

  const screeningCriteria = (item: any[] | string) => {
    return (
      <>
        {typeof item == 'string'
          ? item
          : item.map(({text, checkedValue}, key: number) => (
              <div key={key} className="mb-1 grid">
                <span className="col-10">{text}</span>
                {key !== 0 && 
                <Checkbox 
                  className="col-2 justify-content-end flex  p-0 align-self-center" 
                  onChange={(e) => setChecked((prev: any) => ({...prev, [checkedValue]: e.checked}))} 
                  checked={checked[checkedValue]}
                  disabled={!edit}
                  >
                </Checkbox>}
              </div>
            ))}
      </>
    );
  };

  return (
    <section className="p-4">
      <DataTable value={damageFactor} stripedRows tableStyle={{ minWidth: '50rem' }}>
        <Column field="number" header="No" style={{ width: '50px' }}></Column>
        <Column field="damageFactor" header="Damage Factor"></Column>
        <Column field="screeningCriteria" header="Screening Criteria" body={(e) => screeningCriteria(e.screeningCriteria)}></Column>
        <Column field="status" header="Yes/No" body={(e) => damageFactorStatus(e)} style={{ width: '70px' }} className="p-0 align-self-center"></Column>
      </DataTable>
    </section>
  );
}

export default DamageMechanism;

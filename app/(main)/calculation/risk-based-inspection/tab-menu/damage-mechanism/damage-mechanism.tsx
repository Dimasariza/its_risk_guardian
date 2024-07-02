'use client';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useRef, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import damageFactor from './damage-factor';
import { useDispatch, useSelector } from 'react-redux';
import validate from './validate';
import { EditData } from '@/redux/action/action';
import { damageMechanismService } from '@/service/calculation/damageMechanism-service';
import { Toast } from 'primereact/toast';

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
    dm_scc_chloride: false, // parent
    dm_scc_chloride_A: false,
    dm_scc_chloride_B: false,
    dm_scc_chloride_C: false,
    dm_scc_hydrogen: false,
    dm_scc_hic_hf: false,
    dm_exCor: false, // parent
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
    dm_exChloride: false, // parent
    dm_exChloride_A: false,
    dm_exChloride_B: false,
    dm_exChloride_C: false,
    dm_exChloride_D: false,
    dm_highTemp: false, // parent
    dm_highTemp_A: false,
    dm_highTemp_B: false,
    dm_highTemp_C: false,
    dm_brittleFracture: false, // parent
    dm_brittleFracture_A: false,
    dm_brittleFracture_B: false,
    dm_low_alloy_steel: false, // parent
    dm_low_alloy_steel_A: false,
    dm_low_alloy_steel_B: false,
    dm_embrittlement: false, // parent
    dm_embrittlement_A: false,
    dm_embrittlement_B: false,
    dm_sigma_phase: false, // parent
    dm_sigma_phase_A: false,
    dm_sigma_phase_B: false,
    dm_piping_mechanical: false, // parent
    dm_piping_mechanical_A: false,
    dm_piping_mechanical_B: false
  };

  const toast = useRef<any>(null);
  const [checked, setChecked] = useState<any>(uncheckedAll);
  const [error, setError] = useState<any | null>({});
  const [disabled, setDisabled] = useState(true);
  const data = useSelector((state: any) => state.Reducer);
  const dispatchEdit = useDispatch();
  let edit = useSelector((state: any) => state.EditReducer);

  const handleChecked = (e: any, checkedValue: any) => {
    setChecked((prev: any) => ({ ...prev, [checkedValue]: e.checked }))
  }

  useEffect(() => {
    setChecked((prev: any) => ({ 
      ...prev, 
      dm_scc_chloride:  
      checked.dm_scc_chloride_A &&
      checked.dm_scc_chloride_B &&
      checked.dm_scc_chloride_C,
      dm_exCor:
      checked.dm_exCor_A &&
      checked.dm_exCor_B &&
      checked.dm_exCor_C &&
      checked.dm_exCor_D &&
      checked.dm_exCor_E &&
      checked.dm_exCor_F &&
      checked.dm_exCor_G &&
      checked.dm_exCor_H &&
      checked.dm_exCor_I,
      dm_exChloride:
      checked.dm_exChloride_A &&
      checked.dm_exChloride_B &&
      checked.dm_exChloride_C &&
      checked.dm_exChloride_D,
      dm_highTemp:
      checked.dm_highTemp_A &&
      checked.dm_highTemp_B &&
      checked.dm_highTemp_C,
      dm_brittleFracture:
      checked.dm_brittleFracture_A &&
      checked.dm_brittleFracture_B,
      dm_low_alloy_steel:
      checked.dm_low_alloy_steel_A &&
      checked.dm_low_alloy_steel_B,
      dm_embrittlement:
      checked.dm_embrittlement_A &&
      checked.dm_embrittlement_B,
      dm_sigma_phase:
      checked.dm_sigma_phase_A &&
      checked.dm_sigma_phase_B,
      dm_piping_mechanical: 
      checked.dm_piping_mechanical_A && 
      checked.dm_piping_mechanical_B,
    }))
  }, [
    checked.dm_scc_chloride_A,
    checked.dm_scc_chloride_B,
    checked.dm_scc_chloride_C,
    checked.dm_exCor_A,
    checked.dm_exCor_B,
    checked.dm_exCor_C,
    checked.dm_exCor_D,
    checked.dm_exCor_E,
    checked.dm_exCor_F,
    checked.dm_exCor_G,
    checked.dm_exCor_H,
    checked.dm_exCor_I,
    checked.dm_exChloride_A,
    checked.dm_exChloride_B,
    checked.dm_exChloride_C,
    checked.dm_exChloride_D,
    checked.dm_highTemp_A,
    checked.dm_highTemp_B,
    checked.dm_highTemp_C,
    checked.dm_brittleFracture_A,
    checked.dm_brittleFracture_B,
    checked.dm_low_alloy_steel_A,
    checked.dm_low_alloy_steel_B,
    checked.dm_embrittlement_A,
    checked.dm_embrittlement_B,
    checked.dm_sigma_phase_A,
    checked.dm_sigma_phase_B,  
    checked.dm_piping_mechanical_A, 
    checked.dm_piping_mechanical_B,
  ])


  useEffect(() => {
    edit = true; // to disabled edit useeffect in first call
    if (data.menu?.comp_id) {
      setDisabled(false);
      damageMechanismService.getData(data.menu?.comp_id)
      .then((res) => {
        setChecked((prev: any) => ({...prev, ...res.data}));
      });
    } else {
      setDisabled(true);
      setChecked(uncheckedAll);
    }
  }, [data]);

  useEffect(() => {
    if(!edit) {
      setError(validate(checked));
    }
  }, [edit])

  useEffect(() => {
    if(Object.keys(error).length === 0 && !edit) {
      damageMechanismService.editData(checked)
      .then(res => {
        toast.current.show({
          severity: 'success',
          summary: 'Data Updated',
          detail: `You update General Data`
        });
      })
      .catch((e: any) => {
        toast.current.show({
          severity: 'error',
          summary: 'Data Failed to Updated',
          detail: `Damage mechanism not updated`
        });
      })
    } else if(!edit) {
      dispatchEdit(EditData());
    }
  }, [error])

  const damageFactorStatus = (value: any) => {
    const { screeningCriteria, checkedValue } = value;
    return (
      <div className="flex justify-content-center">
        <Checkbox 
          name={checkedValue}
          readOnly={typeof screeningCriteria == 'object'} 
          onChange={(e) => handleChecked(e, checkedValue)} 
          checked={checked[checkedValue]} 
          disabled={disabled || !edit}
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
          : item.map(({ text, checkedValue }, key: number) => (
              <div key={key} className="mb-1 grid">
                <span className="col-10">{text}</span>
                {key !== 0 && (
                  <Checkbox 
                    name={checkedValue}
                    className="col-2 justify-content-end flex  p-0 align-self-center" 
                    onChange={(e) => handleChecked(e, checkedValue) } 
                    checked={checked[checkedValue]} 
                    disabled={disabled || !edit}
                    >
                  </Checkbox>
                )}
              </div>
            ))}
      </>
    );
  };

  return (
    <section className="p-4">
      <Toast ref={toast}  position="bottom-right" />

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

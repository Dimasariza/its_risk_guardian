'use client';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useState } from 'react';
import { IDamageMechanism } from '@/types/damageMechanism';
import { Checkbox } from 'primereact/checkbox';

function DamageMechanism() {
  const [checked, setChecked] = useState<any>(false);

  const damageFactor = [
    {
      damageFactor: 'Thining',
      screeningCriteria: 'All component should be checked for thining',
      status: false
    },
    {
      damageFactor: 'Component Lining',
      screeningCriteria: 'If the component has organic or inorganic lining, then the component should be evaluated for lining damage.',
      status: false
    },
    {
      damageFactor: 'SCC Damage Factor-Caustic Cracking',
      screeningCriteria: "If the component's material of construction is carbon or low alloy steel and the process environment contains caustic in any concentration, then the component should be evaluated for susceptibility to caustic cracking.",
      status: false
    },
    {
      damageFactor: 'SCC Damage Factor-Amine Cracking',
      screeningCriteria:
        "If the component's material of construction is carbon or low alloy steel and process environment contains acid gas treating amines (MEA, DEA, DIPA, MDEA, etc.) in any concentration, then the component should be evaluated for susceptibility to amine cracking.",
      status: false
    },
    {
      damageFactor: 'SCC Damage Factor-Sulfide Stress Cracking',
      screeningCriteria:
        "If the component's material of construction contains is carbon or low alloy steel and the process environment contains water and H2S in any concentration, then the component should be evaluated to Sulfide Ctress Cracking (SCC).",
      status: false
    },
    {
      damageFactor: 'SCC Damage Factor HIC/SOHIC-H2S',
      screeningCriteria: "If the component's material of construction contains is carbon or low alloy steel and the process environment contains water and H2S in any concentration, then the component should be evaluated to HIC/SOHIC-H2S cracking.",
      status: false
    },
    {
      damageFactor: 'SCC Damage Factor-Alkaline Carbonate Stress Corrosion Cracking',
      screeningCriteria: "If the component's material of construction is carbon or low alloy steel and the process environment contains alkaline water at pH>7.5 in any concentration, the the component should be evaluated to ACSCC.Based in the Heat Material Balance (HMB) Data, the fluid stream flows inside the Production Separator contains caustic content which is Bicarbonate (HCO3) with the concentration of 500 mg/L but with pH 7.35. Another trigger would be changes in FCCU feed sulfurr and nitrogen contents particularly when feed changes have reduced sulfur (low sulfur feeds or hydroprocessed feeds) or increased nitrogen.",
      status: false
    },
    {
      damageFactor: 'SCC Damage Factor-Polythionic Acid Stress Corrosion Cracking',
      screeningCriteria:
        "If the component's material of construction is an austenitic stainless steel or nickel based alloys and the components is wxposed to sulfur bearing compunds, then the component should be evaluated for susceptibility to PASCC",
      status: false
    },
    {
      damageFactor: 'SCC Damage Factor-Chloride Stress Corrosion Cracking',
      screeningCriteria: [
        'If ALL of the following are true, then the component should evaluated for suscepibility to CLSCC cracking:',
        "a. The component's material of construction is an austenitic stainless steel.",
        'b. The component is exposed or potentially exposed to chlorides and water also considering upsets and hydrotest water remaining in component, and cooling tower drift (consider both under insulation and process conditions).',
        'c. The operating temperature is above 38°C (100°F)'
      ],
      status: false
    },
    {
      damageFactor: 'SCC Damage Factor-Hydrogen Stress Cracking-HF',
      screeningCriteria: "If the component's material of construction is ccarbon or low alloy steel and the component is exposed too hydrofluoric acid in any concentration, then the component should be evaluated for susceptibility to HSC-HF.",
      status: false
    },
    {
      damageFactor: 'SCC Damage Factor HIC/SOHIC-HF',
      screeningCriteria: "If the component's material of construction is ccarbon or low alloy steel and the component is exposed too hydrofluoric acid in any concentration, then the component should be evaluated for susceptibility to HIC/SOHIC-HF.",
      status: false
    },
    {
      damageFactor: 'External Corrosion Damage Factor',
      screeningCriteria: [
        'If the component is un-insulated and subject to any of the following , then the component should be evaluated for external damage from corrosion.',
        'a. Areas exposed to mist overspray from cooling towers.',
        'b. Areas exposed to steam vents',
        'c. Areas exposed to deluge system',
        'd. Areas subject to process spills, ingress of moisture, or acid vapors.',
        'e. Carbon steel system, operatinng between -12°C and 177°C (10°F and 350°F). External corrosion is particulartly aggressive where operating temperatures cause frequent or continuous condensation and re-evaporation of atmospheric moisture.',
        'f. Systems that do not operating in normally temperature between -12°C and 177°C (10°F and 350°F) but cool or heat into this range intermitterntly or are subjected to frequent outages.',
        'g. Systems with deteoriated coating and/or wrappings',
        'h. Cold service equipment consistently operating below the atmospheric dew point.',
        'i. Un-insulated nozzles or other prostrusions components of insulated equipment in cold service conditions.'
      ],
      status: false
    },
    {
      damageFactor: 'Corrosion Under Insulation Damage Factor-Ferritic Commponent',
      screeningCriteria: 'The criteria can be seen at the API 581 Part 2 of POF Section 16.3',
      status: false
    },
    {
      damageFactor: 'External Chloride Stress Corrosion Cracking Damage Factor-Austenitic Component',
      screeningCriteria: [
        'If ALL of the following are true, then the component should evaluated for suscepibility to CLSCC:',
        "a. The component's material of construction is an austenitic stainless steel.",
        'b. The component external surface is exposed to chloride containing fluids, mists, or solids.',
        'c. The operating temperature is between 50°C and 150°C (120°F and 300°F) , or the system heats or cools into this range intermittently.'
      ],
      status: false
    },
    {
      damageFactor: 'External Chloride Stress Corrosion Cracking Damage Factor-Austenitic Component',
      screeningCriteria: [
        'If ALL of the following are true, then the component should evaluated for suscepibility to CLSCC:',
        "a. The component's material of construction is an austenitic stainless steel.",
        "b. The component is insulated",
        'c. The component external surface is exposed to chloride containing fluids, mists, or solids.',
        'd. The operating temp. is between 50°C and 150°C (120°F and 300°F), or the system heats or cools into this range intermittently.'
      ],
      status: false
    },
    {
      damageFactor: 'High Temperature Hydrogen Attack Damage Factor',
      screeningCriteria: [
        "If ALL of the following are true, then the component should be evaluated for susceptibiity to HTHA:",
        "a. The material is carbon steel, C-1/2Mo, or a CrMo low alloy steel (such as 1/2Cr-1/2Mo, 1Cr-1/2Mo, 11/4Cr-1/2Mo, 21/4Cr-1Mo, 3Cr-1Mo, 5Cr-1Mo, 7Cr-1Mo, 9Cr-1Mo).",
        "b. The operating temperature is greater than 177°C (350°F).",
        "c. The operating hydrogen partial presssure is greater than 0.345 Mpa (50 psia)."
      ],
      status: false
    },
    {
      damageFactor: 'Brittle Fracture Damage Factor',
      screeningCriteria: [
        "If BOTH of the following are true, then the component should be evaluated for susceptibiity to brittle fracture:",
        "a. The material is carbon steel or low alloy steel (see Table 20.1).",
        "b. If Minimum Design Metal Temperature (MDMT), TMDMT, or Minimum Allowable Metal Temperature (MAT), TMAT, is unknown, or the component is known to operate at below MDMT or MAT under normal or upset conditions.",
      ],
      status: false
    },
    {
      damageFactor: 'Low Alloy Steel Embrittlement Damage Factor',
      screeningCriteria: [
        'If ALL of the following are true, then the component should be evaluated for susceptibiity to low alloy steel embrittlement:',
        "a. The material is 1Cr--0.5Mo, 1.25Cr-0.5Mo, or 3Cr-1Mo low alloy steel.",
        'b. The operating temperature is between 343°C and 577°C (650°F and 1070°F).',
      ],
      status: false
    },
    {
      damageFactor: '885°F Embrittlement Damage Factor',
      screeningCriteria: [
        'If BOTH of the following are true, then the component should be evaluated for susceptibiity to 885°F embrittlemet:',
        "a. The material is high chromium (>12% Cr) ferritic steel",
        'b. The operating temperature is between 371°C and 566°C (700°F and 1050°F).',
      ],
      status: false
    },
    {
      damageFactor: 'Sigma Phase Embrittlement Damage Factor',
      screeningCriteria: [
        "If BOTH of the following are true, then the component should be evaluated for susceptibiity to sigma phase embrittlemet:",
        "a. The component's material of construction is an austenitic stainless steel.",
        "b. The operating temperature is between 593°C and 927°C (1100°F and 1700°F).",
      ],
      status: false
    },
    {
      damageFactor: 'Piping Mechanical Fatigue Damage Factor',
      screeningCriteria: [
        'If BOTH of the following are true, then the component should be evaluated for susceptibiity to mechanical fatigue:',
        "a. The component is pipe",
        'b. There have been past fatigue failure in this piping system or there is visible/audibble shaking in this piping system or there is a source of cyclic vibration within approximately 15.24 meters (50 feet) and connected to the piping (directly or indirectly via structure). Shaking and source of shaking can be continuous or intermittent.Transient conditions often cause intermittent virbration.',
      ],
      status: false
    },
  ].map((item: IDamageMechanism, id: number) => ({ ...item, number: id + 1 }));

  const damageFactorStatus = (text: any[] | string) => {
    return (
      <div className="flex justify-content-center">
        <Checkbox readOnly={typeof text == 'object'} onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
      </div>
    );
  };

  const screeningCriteria = (text: any[] | string) => {
    return (
      <>
        {typeof text == 'string'
          ? text
          : text.map((d: string, key: number) => (
              <div key={key} className="mb-1 grid">
                <span className="col-10">{d}</span>
                {key !== 0 && <Checkbox className="col-2 justify-content-end flex  p-0 align-self-center" onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>}
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
        <Column field="status" header="Yes/No" body={(e) => damageFactorStatus(e.screeningCriteria)} style={{ width: '70px' }} className="p-0 align-self-center"></Column>
      </DataTable>
    </section>
  );
}

export default DamageMechanism;

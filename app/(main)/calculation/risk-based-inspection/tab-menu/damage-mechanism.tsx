"use client";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { IDamageMechanism } from "@/types/damageMechanism";
import { Checkbox } from "primereact/checkbox";

function DamageMechanism() {
    const [checked, setChecked] = useState<any>(false);

    const damageFactor = [  
        {
            damageFactor: "Thining",
            screeningCriteria: "All component should be checked for thining",
            "status": false,  
        },      
        {
            damageFactor: "Component Lining",
            screeningCriteria: "If the component has organic or inorganic lining, then the component should be evaluated for lining damage.",
            "status": false,      
        },
        {
            damageFactor: "SCC Damage Factor-Caustic Cracking",
            screeningCriteria: "If the component's material of construction is carbon or low alloy steel and the process environment contains caustic in any concentration, then the component should be evaluated for susceptibility to caustic cracking.",
            status: false,
        },
        {
            damageFactor: "SCC Damage Factor-Amine Cracking",
            screeningCriteria: "If the component's material of construction is carbon or low alloy steel and process environment contains acid gas treating amines (MEA, DEA, DIPA, MDEA, etc.) in any concentration, then the component should be evaluated for susceptibility to amine cracking.",
            status: false,
        },
        {
            damageFactor: "SCC Damage Factor-Sulfide Stress Cracking",
            screeningCriteria: "If the component's material of construction contains is carbon or low alloy steel and the process environment contains water and H2S in any concentration, then the component should be evaluated to Sulfide Ctress Cracking (SCC).",
            status: false,
        },
        {
            damageFactor: "SCC Damage Factor HIC/SOHIC-H2S",
            screeningCriteria: "If the component's material of construction contains is carbon or low alloy steel and the process environment contains water and H2S in any concentration, then the component should be evaluated to HIC/SOHIC-H2S cracking.",
            status: false,
        },
        {
            damageFactor: "SCC Damage Factor-Alkaline Carbonate Stress Corrosion Cracking",
            screeningCriteria: "If the component's material of construction is carbon or low alloy steel and the process environment contains alkaline water at pH>7.5 in any concentration, the the component should be evaluated to ACSCC.",
            status: false,
        },
        {
            damageFactor: "SCC Damage Factor-Polythionic Acid Stress Corrosion Cracking",
            screeningCriteria: "If the component's material of construction is an austenitic stainless steel or nickel based alloys and the components is wxposed to sulfur bearing compunds, then the component should be evaluated for susceptibility to PASCC",
            status: false,
        },
        {
            damageFactor: "SCC Damage Factor-Chloride Stress Corrosion Cracking",
            screeningCriteria: [
                "If ALL of the following are true, then the component should evaluated for suscepibility to CLSCC cracking:", 
                "a. The component's material of construction is an austenitic stainless steel.",
                "b. The component is exposed or potentially exposed to chlorides and water also considering upsets and hydrotest water remaining in component, and cooling tower drift (consider both under insulation and process conditions).",
                "c. The operating temperature is above 38oC (100oF)"
            ],
            status: false,
        },
        {
            damageFactor: "SCC Damage Factor-Hydrogen Stress Cracking-HF",
            screeningCriteria: "If the component's material of construction is ccarbon or low alloy steel and the component is exposed too hydrofluoric acid in any concentration, then the component should be evaluated for susceptibility to HSC-HF.",
            status: false,
        },
        {
            damageFactor: "SCC Damage Factor HIC/SOHIC-HF",
            screeningCriteria: "If the component's material of construction is ccarbon or low alloy steel and the component is exposed too hydrofluoric acid in any concentration, then the component should be evaluated for susceptibility to HIC/SOHIC-HF.",
            status: false,
        },
        {
            damageFactor: "External Corrosion Damage Factor",
            screeningCriteria: [
                "If the component is un-insulated and subject to any of the following , then the component should be evaluated for external damage from corrosion.",
                "a. Areas exposed to mist overspray from cooling towers.",
                "b. Areas exposed to steam vents",
                "c. Areas exposed to deluge system",
                "d. Areas subject to process spills, ingress of moisture, or acid vapors.",
                "e. Carbon steel system, operatinng between -12oC and 177oC (10oF and 350oF). External corrosion is particulartly aggressive where operating temperatures cause frequent or continuous condensation and re-evaporation of atmospheric moisture.",
                "f. Systems that do not operating in normally temperature between -12oC and 177oC (10oF and 350oF) but cool or heat into this range intermitterntly or are subjected to frequent outages.",
                "g. Systems with deteoriated coating and/or wrappings",
                "h. Cold service equipment consistently operating below the atmospheric dew point.",
                "i. Un-insulated nozzles or other prostrusions components of insulated equipment in cold service conditions."
            ],
            status: false,
        },
        {
            damageFactor: "Corrosion Under Insulation Damage Factor-Ferritic Commponent",
            screeningCriteria: "The criteria can be seen at the API 581 Part 2 of POF Section 16.3",
            status: false,
        },
        {
            damageFactor: "External Chloride Stress Corrosion Cracking Damage Factor-Austenitic Component",
            screeningCriteria: [
                "If ALL of the following are true, then the component should evaluated for suscepibility to CLSCC:",
                "a. The component's material of construction is an austenitic stainless steel.",
                "b. The component external surface is exposed to chloride containing fluids, mists, or solids.",
                "c. The operating temp. is between 50 C and 150 C , or the system heats or cools into this range intermittently."
            ],
            status: false,
        },
        {
            damageFactor: "External Chloride Stress Corrosion Cracking Damage Factor-Austenitic Component",
            screeningCriteria: [
                "If ALL of the following are true, then the component should evaluated for suscepibility to CLSCC:",
                "a. The component's material of construction is an austenitic stainless steel.",
                "b. The component external surface is exposed to chloride containing fluids, mists, or solids.",
                "c. The operating temp. is between 50 C and 150 C , or the system heats or cools into this range intermittently."
            ],
            status: false,
        },
    ].map((item: IDamageMechanism, id: number) => ({...item, number: id + 1}));

    const damageFactorStatus = () => {
        return (
            <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
        )
    }

    const screeningCriteria = (text: any) => {
        return (
            <>
                {
                    typeof(text) == "string" 
                    ? text 
                    : text.map((d: string, key: number) => (<div key={key} className="mb-1">{d}</div>))
                }
            </>
        )
    }

    return (
        <div className="card">
            <DataTable value={damageFactor} stripedRows tableStyle={{ minWidth: '50rem' }}>
                <Column field="number" header="No" style={{width : "50px"}}></Column>
                <Column field="damageFactor" header="Damage Factor"></Column>
                <Column field="screeningCriteria" header="Screening Criteria" body={(e)=> screeningCriteria(e.screeningCriteria)}></Column>
                <Column field="status" header="Yes/No" body={damageFactorStatus} style={{width : "100px"}}></Column>
            </DataTable>
        </div>
    );
}

export default DamageMechanism;
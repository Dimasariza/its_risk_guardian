import { IDamageMechanism } from '@/types/damageMechanism';

const damageFactor = [
  {
    damageFactor: 'Thining',
    screeningCriteria: 'All component should be checked for thining',
    checkedValue: 'dm_thinning'
  },
  {
    damageFactor: 'Component Lining',
    screeningCriteria: 'If the component has organic or inorganic lining, then the component should be evaluated for lining damage.',
    checkedValue: 'dm_comp_linning'
  },
  {
    damageFactor: 'SCC Damage Factor-Caustic Cracking',
    screeningCriteria: "If the component's material of construction is carbon or low alloy steel and the process environment contains caustic in any concentration, then the component should be evaluated for susceptibility to caustic cracking.",
    checkedValue: 'dm_scc_caustic'
  },
  {
    damageFactor: 'SCC Damage Factor-Amine Cracking',
    screeningCriteria:
      "If the component's material of construction is carbon or low alloy steel and process environment contains acid gas treating amines (MEA, DEA, DIPA, MDEA, etc.) in any concentration, then the component should be evaluated for susceptibility to amine cracking.",
    checkedValue: 'dm_scc_amine'
  },
  {
    damageFactor: 'SCC Damage Factor-Sulfide Stress Cracking',
    screeningCriteria:
      "If the component's material of construction contains is carbon or low alloy steel and the process environment contains water and H2S in any concentration, then the component should be evaluated to Sulfide Ctress Cracking (SCC).",
    checkedValue: 'dm_scc_sulfide'
  },
  {
    damageFactor: 'SCC Damage Factor HIC/SOHIC-H2S',
    screeningCriteria: "If the component's material of construction contains is carbon or low alloy steel and the process environment contains water and H2S in any concentration, then the component should be evaluated to HIC/SOHIC-H2S cracking.",
    checkedValue: 'dm_scc_hic_h2s'
  },
  {
    damageFactor: 'SCC Damage Factor-Alkaline Carbonate Stress Corrosion Cracking',
    screeningCriteria:
      "If the component's material of construction is carbon or low alloy steel and the process environment contains alkaline water at pH>7.5 in any concentration, the the component should be evaluated to ACSCC.Based in the Heat Material Balance (HMB) Data, the fluid stream flows inside the Production Separator contains caustic content which is Bicarbonate (HCO3) with the concentration of 500 mg/L but with pH 7.35. Another trigger would be changes in FCCU feed sulfurr and nitrogen contents particularly when feed changes have reduced sulfur (low sulfur feeds or hydroprocessed feeds) or increased nitrogen.",
    checkedValue: 'dm_scc_alkaline'
  },
  {
    damageFactor: 'SCC Damage Factor-Polythionic Acid Stress Corrosion Cracking',
    screeningCriteria: "If the component's material of construction is an austenitic stainless steel or nickel based alloys and the components is wxposed to sulfur bearing compunds, then the component should be evaluated for susceptibility to PASCC",
    checkedValue: 'dm_scc_polythionic'
  },
  {
    damageFactor: 'SCC Damage Factor-Chloride Stress Corrosion Cracking',
    screeningCriteria: [
      {
        text: 'If ALL of the following are true, then the component should evaluated for suscepibility to CLSCC cracking:'
      },
      {
        text: "a. The component's material of construction is an austenitic stainless steel.",
        checkedValue: 'dm_scc_chloride_A'
      },
      {
        text: 'b. The component is exposed or potentially exposed to chlorides and water also considering upsets and hydrotest water remaining in component, and cooling tower drift (consider both under insulation and process conditions).',
        checkedValue: 'dm_scc_chloride_B'
      },
      {
        text: 'c. The operating temperature is above 38°C (100°F)',
        checkedValue: 'dm_scc_chloride_C'
      }
    ],
    checkedValue: 'dm_scc_chloride'
  },
  {
    damageFactor: 'SCC Damage Factor-Hydrogen Stress Cracking-HF',
    screeningCriteria: "If the component's material of construction is ccarbon or low alloy steel and the component is exposed too hydrofluoric acid in any concentration, then the component should be evaluated for susceptibility to HSC-HF.",
    checkedValue: 'dm_scc_hydrogen'
  },
  {
    damageFactor: 'SCC Damage Factor HIC/SOHIC-HF',
    screeningCriteria: "If the component's material of construction is ccarbon or low alloy steel and the component is exposed too hydrofluoric acid in any concentration, then the component should be evaluated for susceptibility to HIC/SOHIC-HF.",
    checkedValue: 'dm_scc_hic_hf'
  },
  {
    damageFactor: 'External Corrosion Damage Factor',
    screeningCriteria: [
      {
        text: 'If the component is un-insulated and subject to any of the following , then the component should be evaluated for external damage from corrosion.'
      },
      {
        text: 'a. Areas exposed to mist overspray from cooling towers.',
        checkedValue: 'dm_exCor_A'
      },
      {
        text: 'b. Areas exposed to steam vents',
        checkedValue: 'dm_exCor_B'
      },
      {
        text: 'c. Areas exposed to deluge system',
        checkedValue: 'dm_exCor_C'
      },
      {
        text: 'd. Areas subject to process spills, ingress of moisture, or acid vapors.',
        checkedValue: 'dm_exCor_D'
      },
      {
        text: 'e. Carbon steel system, operatinng between -12°C and 177°C (10°F and 350°F). External corrosion is particulartly aggressive where operating temperatures cause frequent or continuous condensation and re-evaporation of atmospheric moisture.',
        checkedValue: 'dm_exCor_E'
      },
      {
        text: 'f. Systems that do not operating in normally temperature between -12°C and 177°C (10°F and 350°F) but cool or heat into this range intermitterntly or are subjected to frequent outages.',
        checkedValue: 'dm_exCor_F'
      },
      {
        text: 'g. Systems with deteoriated coating and/or wrappings',
        checkedValue: 'dm_exCor_G'
      },
      {
        text: 'h. Cold service equipment consistently operating below the atmospheric dew point.',
        checkedValue: 'dm_exCor_H'
      },
      {
        text: 'i. Un-insulated nozzles or other prostrusions components of insulated equipment in cold service conditions.',
        checkedValue: 'dm_exCor_I'
      }
    ],
    checkedValue: 'dm_exCor'
  },
  {
    damageFactor: 'Corrosion Under Insulation Damage Factor-Ferritic Commponent',
    screeningCriteria: 'The criteria can be seen at the API 581 Part 2 of POF Section 16.3',
    checkedValue: 'dm_cor_under_ins'
  },
  // {
  //   damageFactor: 'External Chloride Stress Corrosion Cracking Damage Factor-Austenitic Component',
  //   screeningCriteria: [
  //     'If ALL of the following are true, then the component should evaluated for suscepibility to CLSCC:',
  //     "a. The component's material of construction is an austenitic stainless steel.",
  //     'b. The component external surface is exposed to chloride containing fluids, mists, or solids.',
  //     'c. The operating temperature is between 50°C and 150°C (120°F and 300°F) , or the system heats or cools into this range intermittently.'
  //   ],
  //   checkedValue: false
  // },
  {
    damageFactor: 'External Chloride Stress Corrosion Cracking Damage Factor-Austenitic Component',
    screeningCriteria: [
      {
        text: 'If ALL of the following are true, then the component should evaluated for suscepibility to CLSCC:'
      },
      {
        text: "a. The component's material of construction is an austenitic stainless steel.",
        checkedValue: 'dm_exChloride_A'
      },
      {
        text: 'b. The component is insulated',
        checkedValue: 'dm_exChloride_B'
      },
      {
        text: 'c. The component external surface is exposed to chloride containing fluids, mists, or solids.',
        checkedValue: 'dm_exChloride_C'
      },
      {
        text: 'd. The operating temp. is between 50°C and 150°C (120°F and 300°F), or the system heats or cools into this range intermittently.',
        checkedValue: 'dm_exChloride_D'
      }
    ],
    checkedValue: 'dm_exChloride'
  },
  {
    damageFactor: 'High Temperature Hydrogen Attack Damage Factor',
    screeningCriteria: [
      {
        text: 'If ALL of the following are true, then the component should be evaluated for susceptibiity to HTHA:'
      },
      {
        text: 'a. The material is carbon steel, C-1/2Mo, or a CrMo low alloy steel (such as 1/2Cr-1/2Mo, 1Cr-1/2Mo, 11/4Cr-1/2Mo, 21/4Cr-1Mo, 3Cr-1Mo, 5Cr-1Mo, 7Cr-1Mo, 9Cr-1Mo).',
        checkedValue: 'dm_highTemp_A'
      },
      {
        text: 'b. The operating temperature is greater than 177°C (350°F).',
        checkedValue: 'dm_highTemp_B'
      },
      {
        text: 'c. The operating hydrogen partial presssure is greater than 0.345 Mpa (50 psia).',
        checkedValue: 'dm_highTemp_C'
      }
    ],
    checkedValue: 'dm_highTemp'
  },
  {
    damageFactor: 'Brittle Fracture Damage Factor',
    screeningCriteria: [
      {
        text: 'If BOTH of the following are true, then the component should be evaluated for susceptibiity to brittle fracture:'
      },
      {
        text: 'a. The material is carbon steel or low alloy steel (see Table 20.1).',
        checkedValue: 'dm_brittleFracture_A'
      },
      {
        text: 'b. If Minimum Design Metal Temperature (MDMT), TMDMT, or Minimum Allowable Metal Temperature (MAT), TMAT, is unknown, or the component is known to operate at below MDMT or MAT under normal or upset conditions.',
        checkedValue: 'dm_brittleFracture_B'
      }
    ],
    checkedValue: 'dm_brittleFracture'
  },
  {
    damageFactor: 'Low Alloy Steel Embrittlement Damage Factor',
    screeningCriteria: [
      {
        text: 'If ALL of the following are true, then the component should be evaluated for susceptibiity to low alloy steel embrittlement:'
      },
      {
        text: 'a. The material is 1Cr--0.5Mo, 1.25Cr-0.5Mo, or 3Cr-1Mo low alloy steel.',
        checkedValue: 'dm_low_alloy_steel_A'
      },
      {
        text: 'b. The operating temperature is between 343°C and 577°C (650°F and 1070°F).',
        checkedValue: 'dm_low_alloy_steel_B'
      }
    ],
    checkedValue: 'dm_low_alloy_steel'
  },
  {
    damageFactor: '885°F Embrittlement Damage Factor',
    screeningCriteria: [
      {
        text: 'If BOTH of the following are true, then the component should be evaluated for susceptibiity to 885°F embrittlemet:'
      },
      {
        text: 'a. The material is high chromium (>12% Cr) ferritic steel',
        checkedValue: 'dm_embrittlement_A'
      },
      {
        text: 'b. The operating temperature is between 371°C and 566°C (700°F and 1050°F).',
        checkedValue: 'dm_embrittlement_B'
      }
    ],
    checkedValue: 'dm_embrittlement'
  },
  {
    damageFactor: 'Sigma Phase Embrittlement Damage Factor',
    screeningCriteria: [
      {
        text: 'If BOTH of the following are true, then the component should be evaluated for susceptibiity to sigma phase embrittlemet:'
      },
      {
        text: "a. The component's material of construction is an austenitic stainless steel.",
        checkedValue: 'dm_sigma_phase_A'
      },
      {
        text: 'b. The operating temperature is between 593°C and 927°C (1100°F and 1700°F).',
        checkedValue: 'dm_sigma_phase_B'
      }
    ],
    checkedValue: 'dm_sigma_phase'
  },
  {
    damageFactor: 'Piping Mechanical Fatigue Damage Factor',
    screeningCriteria: [
      {
        text: 'If BOTH of the following are true, then the component should be evaluated for susceptibiity to mechanical fatigue:'
      },
      {
        text: 'a. The component is pipe',
        checkedValue: 'dm_piping_mechanical_A'
      },
      {
        text: 'b. There have been past fatigue failure in this piping system or there is visible/audibble shaking in this piping system or there is a source of cyclic vibration within approximately 15.24 meters (50 feet) and connected to the piping (directly or indirectly via structure). Shaking and source of shaking can be continuous or intermittent.Transient conditions often cause intermittent virbration.',
        checkedValue: 'dm_piping_mechanical_B'
      }
    ],
    checkedValue: 'dm_piping_mechanical'
  }
].map((item: IDamageMechanism, id: number) => ({ ...item, number: id + 1 }));

export default damageFactor;

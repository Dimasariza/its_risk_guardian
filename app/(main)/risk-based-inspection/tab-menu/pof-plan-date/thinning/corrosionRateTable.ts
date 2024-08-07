
const screeningQuestions: any = [
    {
        id: "screening001",
        type: "Hydrochloric Acid (HCL) Corrosin",
        name: "hcl",
        screening: [
            { 
                name: "planSQ_HCLContain",
                value: "Does the process contain HCL?", 
            },
            {
                name: "planSQ_HCLIsFreeWater",
                value: "Is free water present in the process stream (including initial condensing)",
            },
            {
                name: "planSQ_HCLphUnder7",
                value: "Is the pH < 7.0?",
                notes: "planSQ_notesHCLphUnder7"
            }
        ],
    },
    {
        id: "screening002",
        type: "High Temperature Sulfidic/Naphtenic Acid Corrosion",
        name: "sulfidic",
        screening: [
            { 
                name: "planSQ_SulfidicContainOil",
                value: "Does the process contain oil with sulfur compounds?", 
            },
            {
                name: "planSQ_SulfidicTempOver204",
                value: "Is the operating temperature > 204oC (400oF)?",
                notes: "planSQ_notessulfidicTempOver204"
            }
        ],
    },
    {
        id: "screening003",
        name: "sulfuric",
        type: "Sulfuric Acid Corrosion",
        screening: [
            { 
                name: "planSQ_SulfuricContainH2SO4",
                value: "Does the process contain H2SO4", 
            },
        ],
    },
    {
        id: "screening004",
        type: "High Temperature H2S/H2 Corrosion",
        name: "h2sh2",
        screening: [
            { 
                name: "planSQ_H2SH2containH2s",
                value: "Does the process contain H2S and Hydrogen?", 
            },
            {
                name: "planSQ_H2SH2TempOver204",
                value: "Is the operating temperature > 204oC (400oF)?",
                notes: "planSQ_notesH2SH2"
            }
        ],
    },
    {
        id: "screening005",
        type: "Hydrifluoric Corrosion",
        name: "hydrifluoric",
        screening: [
            { 
                name: "planSQ_HydrifluoricContainHF",
                value: "Does the process contain HF?", 
            },
        ],
    },
    {
        id: "screening006",
        type: "Sour Water Corrsion",
        name: "sourWater",
        screening: [
            { 
                name: "planSQ_SourWaterIsFreeH2S",
                value: "Is free water with H2S present?", 
            },
        ],
    },
    {
        id: "screening007",
        type: "Amine Corrosion",
        name: "amine",
        screening: [
            { 
                name: "planSQ_AmineIsEquipment",
                value: "Is equipment exposed to acid gas treaating amines (MEA, DEA, DIPA, or MDEA)?", 
            },
        ],
    },
    {
        id: "screening008",
        type: "High Temperature Oxidation Corrosion",
        name: "oxidation",
        screening: [
            { 
                name: "planSQ_OxidationTempOver482",
                value: "Is the temperature ≥ 482oC (900oF)?", 
                notes: "planSQ_notesOxidatoin"
            },
            {
                name: "planSQ_OxidationOxigenPresent",
                value: "Is the oxygen present?",
            },
        ],
    },
    {
        id: "screening009",
        type: "Acid Sour Water Corrosion",
        name: "acid",
        screening: [
            {
                name: "planSQ_AcidphUnder7",
                value: "Is free water with H2S present and pH < 7.0?",
                notes: "planSQ_notesAcid"
            },
            {
                name: "planSQ_AcidContainPPM",
                value: "Does the proocess contain < 50 ppm chlorides?",
            },
        ],
    },
    {
        id: "screening010",
        type: "Cooling Water",
        name: "coolingWater",
        screening: [
            { 
                name: "planSQ_CoolingIsEquipment",
                value: "Is equipment in cooling water service?", 
            },
        ],
    },
    {
        id: "screening011",
        type: "Soil Side Corrosion",
        name: "soilSide",
        screening: [
            { 
                name: "planSQ_SoilSideIsEquipment",
                value: "Is equipment in contact with soil (buried or partially buried)?", 
            },
            {
                name: "planSQ_SoilSideIsMaterial",
                value: "Is the material of construction carbon steel?",
            },
        ],
    },
    {
        id: "screening012",
        type: "CO2 Corrosion",
        name: "co2",
        screening: [
            { 
                name: "planSQ_CO2IsFreeWater",
                value: "Is the free water with CO2 present (including consideration for dew point condensation)?", 
            },
            {
                name: "planSQ_CO2IsMaterial",
                value: "Is the material of construction carbon steel or < 13% Cr?",
                notes: "planSQ_notesCO2"
            }
        ],
    },
    {
        id: "screening013",
        type: "AST Bottom",
        name: "ast",
        screening: [
            { 
                name: "planSQ_ASTIsEquipment",
                value: "Is the equipment item an AST tank bottom?", 
            },
        ],
    },
]

export default screeningQuestions;
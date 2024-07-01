const representativeFluidNodes: any = [
    {
        id: 1,
        fluid_type: "Type 0",
        applicable_materials: "Methane, ethane, ethylene, LNG, fuel gas",
        fluid: "C1-C2",
        mw: 23,
        liquid: 250.512,
        nbp: -125,
        ambient: "Gas",
        heat_eq: "Note 1",
        constant_a: 12.3,
        constant_b: 0.115,
        constant_c: -0.0000287,
        constant_d: -0.0000000013,
        constant_e: "N/A",
        ait: 558
    },
    {
        id: 2,
        fluid_type: "Type 0",
        applicable_materials: "Propane, butane, isobutane, LPG",
        fluid: "C3-C4",
        mw: 51,
        liquid: 538.379,
        nbp: -21,
        ambient: "Gas",
        heat_eq: "Note 1",
        constant_a: 2.632,
        constant_b: 0.3188,
        constant_c: -0.000135,
        constant_d: 0.0000000147,
        constant_e: "N/A",
        ait: 369
    },
    {
        id: 3,
        fluid_type: "Type 0",
        applicable_materials: "Pentane",
        fluid: "C5",
        mw: 75,
        liquid: 625.199,
        nbp: 36,
        ambient: "Liquid",
        heat_eq: "Note 1",
        constant_a: -3.626,
        constant_b: 0.4873,
        constant_c: -0.00026,
        constant_d: 0.000000053,
        constant_e: "N/A",
        ait: 284
    },
    {
        id: 4,
        fluid_type: "Type 0",
        applicable_materials: "Gasoline, naptha, light straight run, heptane.",
        fluid: "C6-8",
        mw: 100,
        liquid: 684.018,
        nbp: 99,
        ambient: "Liquid",
        heat_eq: "Note 1",
        constant_a: -5.146,
        constant_b: 0.676,
        constant_c: -0.000365,
        constant_d: 0.0000000766,
        constant_e: "N/A",
        ait: 223
    },
    {
        id: 5,
        fluid_type: "Type 0",
        applicable_materials: "Diesel, kerosene",
        fluid: "C9-C12",
        mw: 149,
        liquid: 734.012,
        nbp: 184,
        ambient: "Liquid",
        heat_eq: "Note 1",
        constant_a: -8.5,
        constant_b: 1.01,
        constant_c: -0.000556,
        constant_d: 0.000000118,
        constant_e: "N/A",
        ait: 208
    },
    {
        id: 6,
        fluid_type: "Type 0",
        applicable_materials: "Jet fuel, kerosene, atmospheric gas oil",
        fluid: "C13-C16",
        mw: 205,
        liquid: 764.527,
        nbp: 261,
        ambient: "Liquid",
        heat_eq: "Note 1",
        constant_a: -11.7,
        constant_b: 1.39,
        constant_c: -0.000772,
        constant_d: 0.000000167,
        constant_e: "N/A",
        ait: 202
    },
    {
        id: 7,
        fluid_type: "Type 0",
        applicable_materials: "Gas oil, typical crude",
        fluid: "C17-C25",
        mw: 280,
        liquid: 775.019,
        nbp: 344,
        ambient: "Liquid",
        heat_eq: "Note 1",
        constant_a: -22.4,
        constant_b: 1.94,
        constant_c: -0.00112,
        constant_d: -0.000000253,
        constant_e: "N/A",
        ait: 202
    },
    {
        id: 8,
        fluid_type: "Type 0",
        applicable_materials: "Residuum, heavy crude, lube oil, seal oil",
        fluid: "C25+",
        mw: 422,
        liquid: 900.026,
        nbp: 527,
        ambient: "Liquid",
        heat_eq: "Note 1",
        constant_a: -22.4,
        constant_b: 1.94,
        constant_c: -0.00112,
        constant_d: -0.000000253,
        constant_e: "N/A",
        ait: 202
    },
    {
        id: 9,
        fluid_type: "",
        applicable_materials: "",
        fluid: "Water",
        mw: 18,
        liquid: 997.947,
        nbp: 100,
        ambient: "Liquid",
        heat_eq: "Note 3",
        constant_a: 276000,
        constant_b: -2090,
        constant_c: "8.125",
        constant_d: -0.0141,
        constant_e: "0.00000937",
        ait: "N/A"
    },
    {
        id: 10,
        fluid_type: "",
        applicable_materials: "",
        fluid: "Steam",
        mw: 18,
        liquid: 997.947,
        nbp: 100,
        ambient: "Gas",
        heat_eq: "Note 3",
        constant_a: 33400,
        constant_b: 26800,
        constant_c: "2610",
        constant_d: 8900,
        constant_e: "1170",
        ait: "N/A"
    },
    {
        id: 11,
        fluid_type: "Type 0",
        applicable_materials: "Acid, caustic",
        fluid: "Acid",
        mw: 18,
        liquid: 997.947,
        nbp: 100,
        ambient: "Liquid",
        heat_eq: "Note 3",
        constant_a: 276000,
        constant_b: -2090,
        constant_c: "8.125",
        constant_d: -0.0141,
        constant_e: "0.00000937",
        ait: "N/A"
    },
    {
        id: 12,
        fluid_type: "Type 0",
        applicable_materials: "Hydrogen only",
        fluid: "H2",
        mw: 2,
        liquid: 71.01,
        nbp: -253,
        ambient: "Gas",
        heat_eq: "Note 1",
        constant_a: 27.1,
        constant_b: 0.00927,
        constant_c: -0.0000138,
        constant_d: 0.00000000765,
        constant_e: "N/A",
        ait: 400
    },
    {
        id: 13,
        fluid_type: "Type 0",
        applicable_materials: "Hydrogen sulfide only",
        fluid: "H2S",
        mw: 34,
        liquid: 993.029,
        nbp: -59,
        ambient: "Gas",
        heat_eq: "Note 1",
        constant_a: 31.9,
        constant_b: 0.00144,
        constant_c: "0.0000243",
        constant_d: -0.0000000118,
        constant_e: "N/A",
        ait: 260
    },
    {
        id: 14,
        fluid_type: "Type 0",
        applicable_materials: "Hydrogen fluoride",
        fluid: "HF",
        mw: 20,
        liquid: 967.031,
        nbp: 20,
        ambient: "Gas",
        heat_eq: "Note 1",
        constant_a: 29.1,
        constant_b: 0.000661,
        constant_c: -0.00000203,
        constant_d: 0.0000000025,
        constant_e: "N/A",
        ait: 17760
    },
    {
        id: 15,
        fluid_type: "Type 1",
        applicable_materials: "Carbon Monoxide",
        fluid: "CO",
        mw: 28,
        liquid: 800.92,
        nbp: -191,
        ambient: "Gas",
        heat_eq: "Note 2",
        constant_a: 29100,
        constant_b: 8770,
        constant_c: "3090",
        constant_d: 8460,
        constant_e: "1540",
        ait: 609
    },
    {
        id: 16,
        fluid_type: "Type 1 (Note 2)",
        applicable_materials: "Diethyl Ether",
        fluid: "DEE",
        mw: 74,
        liquid: 720.828,
        nbp: 35,
        ambient: "Liquid ",
        heat_eq: "Note 2",
        constant_a: 86200,
        constant_b: 255000,
        constant_c: "1540",
        constant_d: 144000,
        constant_e: "-689",
        ait: 160
    },
    {
        id: 17,
        fluid_type: "Type 0 (Note 1)",
        applicable_materials: "Hydrogen Chloride",
        fluid: "HCL",
        mw: 36,
        liquid: 1185.362,
        nbp: -85,
        ambient: "Gas",
        heat_eq: "",
        constant_a: null,
        constant_b: null,
        constant_c: null,
        constant_d: null,
        constant_e: null,
        ait: "N/A"
    },
    {
        id: 18,
        fluid_type: "Type 0 (Note 1)",
        applicable_materials: "Nitric Acid",
        fluid: "Nitric Acid",
        mw: 63,
        liquid: 1521.749,
        nbp: 121,
        ambient: "Liquid ",
        heat_eq: "",
        constant_a: null,
        constant_b: null,
        constant_c: null,
        constant_d: null,
        constant_e: null,
        ait: "N/A"
    },
    {
        id: 19,
        fluid_type: "Type 0",
        applicable_materials: "Benzene, Toluene, Xylene, Cumene",
        fluid: "ALCL3",
        mw: 133.5,
        liquid: 2434.798,
        nbp: 194,
        ambient: "Powder",
        heat_eq: "Note 1",
        constant_a: 43400,
        constant_b: 39700,
        constant_c: "417",
        constant_d: 24000,
        constant_e: "N/A",
        ait: 558
    },
    {
        id: 20,
        fluid_type: "Type 0 (Note 1)",
        applicable_materials: "Nitrogen Dioxide",
        fluid: "NO2",
        mw: 90,
        liquid: 929.068,
        nbp: 135,
        ambient: "Liquid ",
        heat_eq: "",
        constant_a: null,
        constant_b: null,
        constant_c: null,
        constant_d: null,
        constant_e: null,
        ait: "N/A"
    },
    {
        id: 21,
        fluid_type: "Type 0",
        applicable_materials: "Phosgene",
        fluid: "Phosgene",
        mw: 99,
        liquid: 1377.583,
        nbp: 83,
        ambient: "Liquid ",
        heat_eq: "",
        constant_a: null,
        constant_b: null,
        constant_c: null,
        constant_d: null,
        constant_e: null,
        ait: "N/A"
    },
    {
        id: 22,
        fluid_type: "Type 0 (Note 1)",
        applicable_materials: "Toluene Diisocyanate",
        fluid: "TDI",
        mw: 174,
        liquid: 1217.399,
        nbp: 251,
        ambient: "Liquid ",
        heat_eq: "",
        constant_a: null,
        constant_b: null,
        constant_c: null,
        constant_d: null,
        constant_e: null,
        ait: 620
    },
    {
        id: 23,
        fluid_type: "",
        applicable_materials: "",
        fluid: "Methanol",
        mw: 32,
        liquid: 800.92,
        nbp: 65,
        ambient: "Liquid ",
        heat_eq: "Note 2",
        constant_a: 39300,
        constant_b: 87900,
        constant_c: "1920",
        constant_d: 53700,
        constant_e: "897",
        ait: 464
    },
    {
        id: 24,
        fluid_type: "Type 1",
        applicable_materials: "Propylene Oxide",
        fluid: "PO",
        mw: 58,
        liquid: 832.957,
        nbp: 34,
        ambient: "Liquid ",
        heat_eq: "Note 2",
        constant_a: 49500,
        constant_b: 174000,
        constant_c: "1560",
        constant_d: 115000,
        constant_e: "702",
        ait: 449
    },
    {
        id: 25,
        fluid_type: "Type 1",
        applicable_materials: "Benzene, Toluene, Xylene, Cumene",
        fluid: "Styrene / Aromatic",
        mw: 104,
        liquid: 683.986,
        nbp: 145,
        ambient: "Liquid ",
        heat_eq: "Note 2",
        constant_a: 89300,
        constant_b: 215000,
        constant_c: "772",
        constant_d: 99900,
        constant_e: "2440",
        ait: 490
    },
    {
        id: 26,
        fluid_type: "Type 1",
        applicable_materials: "Ethylene Glycol Monoethyl Ether Acetate",
        fluid: "EEA",
        mw: 132,
        liquid: 977.123,
        nbp: 156,
        ambient: "Liquid ",
        heat_eq: "Note 2",
        constant_a: 106000,
        constant_b: 240000,
        constant_c: "659",
        constant_d: 150000,
        constant_e: "1970",
        ait: 379
    },
    {
        id: 27,
        fluid_type: "Type 1",
        applicable_materials: "Ethylene Glycol Monoethyl Ether",
        fluid: "EE",
        mw: 90,
        liquid: 929.068,
        nbp: 135,
        ambient: "Liquid ",
        heat_eq: "Note 2",
        constant_a: 32500,
        constant_b: 300000,
        constant_c: "1170",
        constant_d: 208000,
        constant_e: "473",
        ait: 235
    },
    {
        id: 28,
        fluid_type: "Type 1",
        applicable_materials: "Ethylene Glycol",
        fluid: "EG",
        mw: 62,
        liquid: 1105.27,
        nbp: 197,
        ambient: "Liquid ",
        heat_eq: "Note 2",
        constant_a: 63000,
        constant_b: 146000,
        constant_c: "1670",
        constant_d: 97300,
        constant_e: "774",
        ait: 396
    },
    {
        id: 29,
        fluid_type: "Type 1",
        applicable_materials: "Ethylene Oxide",
        fluid: "EO",
        mw: 44,
        liquid: 881.013,
        nbp: 11,
        ambient: "Gas",
        heat_eq: "Note 2",
        constant_a: 33500,
        constant_b: 121000,
        constant_c: "1610",
        constant_d: 82400,
        constant_e: "737",
        ait: 429
    },
    {
        id: 30,
        fluid_type: "Type 1",
        applicable_materials: "Pyrophoric Materials",
        fluid: "Pyroporic",
        mw: 149,
        liquid: 734.012,
        nbp: 184,
        ambient: "Liquid ",
        heat_eq: "Note 1",
        constant_a: -8.5,
        constant_b: 1.01,
        constant_c: -0.000556,
        constant_d: 0.000000118,
        constant_e: "N/A ",
        ait: "Note 3"
    },
]

export default representativeFluidNodes;
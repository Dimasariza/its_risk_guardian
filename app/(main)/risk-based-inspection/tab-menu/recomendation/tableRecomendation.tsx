/* eslint-disable */

const recomendationPV: any = [
    {
        id: 1,
        damageFactor: "Thinning",
        level: [
            {
                name: "General Thinning",
                category: [
                    { 
                        value: "A",
                        effectiveness: "Highly Effective", 
                        nonIntrusive: [
                            <div> For the total surface area: <br /> </div>,
                            <div className="ml-3"> 100% UT/RT of CML's </div>,
                            <b>OR</b>,
                            <div> For the selected areas: <br /> </div>,
                            <div className="ml-3"> 10% UT scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> 10% profile radiography </div>,
                        ]
                    },
                    { 
                        value: "B",
                        effectiveness: "Usually Effective", 
                        nonIntrusive: [
                            <div> For the total surface area: <br /> </div>,
                            <div className="ml-3"> &gt;75% spot UT </div>,
                            <b>OR</b>,
                            <div className="ml-3"> &gt;5% UT scanning, automated or manual </div>,
                            <b>OR</b>,
                            <div className="ml-3"> &gt;5% profile radiography of the selected area(s) </div>,
                        ]
                    },
                    { 
                        value: "C",
                        effectiveness: "Fairly Effective", 
                        nonIntrusive: [
                            <div> For the total surface area: <br /> </div>,
                            <div className="ml-3"> &gt;50% spot UT or random UT scans (automated or manual) </div>,
                            <b>OR</b>,
                            <div className="ml-3"> random profile radiography of the selected area(s) </div>,
                        ]
                    },
                    { 
                        value: "D",
                        effectiveness: "Poorly Effective", 
                        nonIntrusive: [
                            <div> For the total surface area: <br /> </div>,
                            <div className="ml-3"> &gt;25% spot UT </div>,
                        ]
                    },
                    { 
                        value: "E",
                        effectiveness: "Ineffective", 
                        nonIntrusive: [
                            <div> Ineffective inspection technique/plan was utilized </div>,
                        ]
                    },
                ]
            },
            {
                name: "Local Thinning",
                category: [
                    { 
                        value: "A",
                        effectiveness: "Highly Effective", 
                        nonIntrusive: [
                            <div> For the total surface area: <br /> </div>,
                            <div className="ml-3"> 100% coverage of the CML’s using ultrasonic scanning or profile radiography </div>,
                        ]
                    },
                    { 
                        value: "B",
                        effectiveness: "Usually Effective", 
                        nonIntrusive: [
                            <div> For the total surface area: <br /> </div>,
                            <div className="ml-3"> &gt;75% coverage of the CML’s using ultrasonic scanning or profile radiography </div>,
                        ]
                    },
                    { 
                        value: "C",
                        effectiveness: "Fairly Effective", 
                        nonIntrusive: [
                            <div> For the total surface area: <br /> </div>,
                            <div className="ml-3"> &gt;50% coverage of the CML’s using ultrasonic scanning or profile radiography </div>,
                        ]
                    },
                    { 
                        value: "D",
                        effectiveness: "Poorly Effective", 
                        nonIntrusive: [
                            <div> For the total surface area: <br /> </div>,
                            <div className="ml-3"> &gt;20% coverage of the CML’s using ultrasonic scanning or profile radiography </div>,
                        ]
                    },
                    { 
                        value: "E",
                        effectiveness: "Ineffective", 
                        nonIntrusive: [
                            <div> Ineffective inspection technique/plan was utilized </div>,
                        ]
                    },
                ]
            },
        ]
    },
    {
        id: 2,
        damageFactor: "Component Lining",
        level: [
            {
                name: "No Recomendation from API 581",
                category: [
                    { 
                        value: "0",
                        effectiveness: "No recomendation", 
                        nonIntrusive: [
                            <div> No Recomendation from API 581 </div>,
                        ]   
                    },
                ]
            }
        ]
    },
    {
        id: 3,
        damageFactor: "SCC Damage Factor-Caustic Cracking",
        level: [
            {
                name: "Caustic Cracking",
                category: [
                    { 
                        value: "A",
                        effectiveness: "Highly Effective", 
                        nonIntrusive: [
                            <div> For the total weld area: <br /> </div>,
                            <div className="ml-3"> 100% automated or manual ultrasonic scanning. </div>,
                        ]   
                    },
                    { 
                        value: "B",
                        effectiveness: "Usually Effective", 
                        nonIntrusive: [
                            <div> For selected welds / weld area: <br /> </div>,
                            <div className="ml-3"> &gt;75% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> AE testing with 100% follow-up of relevant indications. </div>,
                        ]
                    },
                    { 
                        value: "C",
                        effectiveness: "Fairly Effective", 
                        nonIntrusive: [
                            <div> For selected welds / weld area: <br /> </div>,
                            <div className="ml-3"> &gt;35% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> &gt;35% radiographic testing. </div>,
                        ]
                    },
                    { 
                        value: "D",
                        effectiveness: "Poorly Effective", 
                        nonIntrusive: [
                            <div> For selected welds / weld area: <br /> </div>,
                            <div className="ml-3"> &gt;10% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> &gt;10% radiographic testing. </div>,
                        ]
                    },
                    { 
                        value: "E",
                        effectiveness: "Ineffective", 
                        nonIntrusive: [
                            <div> Ineffective inspection technique/plan was utilized <br /></div>,
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        damageFactor: "SCC Damage Factor-Amine Cracking",
        level: [
            {
                name: "Amine Cracking",
                category: [
                    { 
                        value: "A",
                        effectiveness: "Highly Effective", 
                        nonIntrusive: [
                            <div> For the total weld area: <br /> </div>,
                            <div className="ml-3"> 100% automated or manual ultrasonic scanning. </div>,
                        ]
                    },
                    { 
                        value: "B",
                        effectiveness: "Usually Effective", 
                        nonIntrusive: [
                            <div> For selected welds / weld area: <br /> </div>,
                            <div className="ml-3"> &gt;75% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> AE testing with 100% follow-up of relevant indications. </div>,
                        ]
                    },
                    { 
                        value: "C",
                        effectiveness: "Fairly Effective", 
                        nonIntrusive: [
                            <div> For selected welds / weld area: <br /> </div>,
                            <div className="ml-3"> &gt;35% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> &gt;35% radiographic testing. </div>,
                        ]
                    },
                    { 
                        value: "D",
                        effectiveness: "Poorly Effective", 
                        nonIntrusive: [
                            <div> For selected welds / weld area: <br /> </div>,
                            <div className="ml-3"> &gt;10% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> &gt;10% radiographic testing. </div>,
                        ]
                    },
                    { 
                        value: "E",
                        effectiveness: "Ineffective", 
                        nonIntrusive: [
                            <div> Ineffective inspection technique/plan was utilized </div>,
                        ]
                    },
                ]
            },
        ]
    },
    {
        id: 5,
        damageFactor: "SCC Damage Factor-Sulfide Stress Cracking",
        level: [
            {
                name: "Sulfide",
                category: [
                    { 
                        value: "A",
                        effectiveness: "Highly Effective", 
                        nonIntrusive: [
                            <div> For the total weld area: <br /> </div>,
                            <div className="ml-3"> 100% automated or manual ultrasonic scanning. </div>,
                        ]
                    },
                    { 
                        value: "B",
                        effectiveness: "Usually Effective", 
                        nonIntrusive: [
                            <div> For selected welds / weld area: <br /> </div>,
                            <div className="ml-3"> &gt;75% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> AE testing with 100% follow-up of relevant indications. </div>,
                        ]
                    },
                    { 
                        value: "C",
                        effectiveness: "Fairly Effective", 
                        nonIntrusive: [
                            <div> For selected welds / weld area: <br /> </div>,
                            <div className="ml-3"> &gt;35% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> &gt;35% radiographic testing. </div>,
                        ]
                    },
                    { 
                        value: "D",
                        effectiveness: "Poorly Effective", 
                        nonIntrusive: [
                            <div> For selected welds / weld area: <br /> </div>,
                            <div className="ml-3"> &gt;10% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> &gt;10% radiographic testing. </div>,
                        ]
                    },
                    { 
                        value: "E",
                        effectiveness: "Ineffective", 
                        nonIntrusive: [
                            <div> Ineffective inspection technique/plan was utilized </div>,
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 6,
        damageFactor: "SCC Damage Factor HIC/SOHIC-H2S",
        level: [
            {
                name: "HIC/SOHIC-H2S",
                category: [
                    { 
                        value: "A",
                        effectiveness: "Highly Effective", 
                        nonIntrusive: [
                            <div> For the total surface area: <br /> </div>,
                            <ul className="ml-3">
                                <li><b>SOHIC :</b></li>
                                <li>&gt; 90% C scan of the base metal using advanced UT </li>
                                <li>&gt; For the weld and HAZ - 100% Shear Wave and TOFD </li>
                            </ul>,
                            <b>AND</b>,
                            <ul className="ml-3">
                                <li><b>HIC:</b></li>
                                <li>Two 0.5-ft2 areas, C scan of the base metal using advanced UT on each plate and the heads.</li>
                            </ul>
                        ]
                    },
                    { 
                        value: "B",
                        effectiveness: "Usually Effective", 
                        nonIntrusive: [
                            <div> For the total surface area: <br /> </div>,
                            <div className="ml-3"> &gt;65% C scan of the base metal using advanced UT </div>,
                            <b>AND</b>,
                            <ul className="ml-3"> 
                                <li><b>HIC:</b></li> 
                                <li>Two 0.5-ft2 areas, C scan of the base metal using advanced UT on each plate and the heads.</li>   
                            </ul>,
                        ]
                    },
                    { 
                        value: "C",
                        effectiveness: "Fairly Effective", 
                        nonIntrusive: [
                            <div> For the total surface area: <br /> </div>,
                            <div className="ml-3"> &gt;35% C scan of the base metal using advanced UT </div>,
                            <b>AND</b>,
                            <ul className="ml-3"> 
                                <li><b>HIC:</b></li> 
                                <li>One 1-ft2 area, C scan of the base metal using advanced UT on each plate and the heads.</li>   
                            </ul>,
                        ]
                    },
                    { 
                        value: "D",
                        effectiveness: "Poorly Effective", 
                        nonIntrusive: [
                            <div> For the total surface area: <br /> </div>,
                            <div className="ml-3"> &gt;5% C scan of the base metal using advanced UT </div>,
                            <b>AND</b>,
                            <ul className="ml-3"> 
                                <li><b>HIC:</b></li> 
                                <li>One 0.5-ft2 area, C scan of the base metal using advanced UT on each plate and the heads.</li>   
                            </ul>,
                        ]
                    },
                    { 
                        value: "E",
                        effectiveness: "Ineffective", 
                        nonIntrusive: [
                            <div> Ineffective inspection technique/plan was utilized </div>,
                        ]
                    },
                ]
            }
        ]
    },
    {
        id: 7,
        damageFactor: "SCC Damage Factor-Alkaline Carbonate Stress Corrosion Cracking",
        level: [
            {
                name: "Alkaline Carbonate",
                category: [
                    { 
                        value: "A",
                        effectiveness: "Highly Effective", 
                        nonIntrusive: [
                            <div> For the total weld area: <br /> </div>,
                            <div className="ml-3"> 100% automated or manual ultrasonic scanning. </div>,
                        ]
                    },
                    { 
                        value: "B",
                        effectiveness: "Usually Effective", 
                        nonIntrusive: [
                            <div> For the total weld area: <br /> </div>,
                            <div className="ml-3"> &gt;75% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> AE testing with 100% follow-up of relevant indications. </div>,
                        ]
                    },
                    { 
                        value: "C",
                        effectiveness: "Fairly Effective", 
                        nonIntrusive: [
                            <div> For the total weld area: <br /> </div>,
                            <div className="ml-3"> &gt;35% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> &gt;35% radiographic testing. </div>,
                        ]
                    },
                    { 
                        value: "D",
                        effectiveness: "Poorly Effective", 
                        nonIntrusive: [
                            <div> For the total weld area: <br /> </div>,
                            <div className="ml-3"> &gt;10% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> &gt;10% radiographic testing. </div>,
                        ]
                    },
                    { 
                        value: "E",
                        effectiveness: "Ineffective", 
                        nonIntrusive: [
                            <div> Ineffective inspection technique/plan was utilized <br /></div>,
                        ]
                    },
                ]
            }
        ]
    },
    {
        id: 8,
        damageFactor: "SCC Damage Factor-Polythionic Acid Stress Corrosion Cracking",
        level: [
            {
                name: "Polythionic Acid",
                category: [
                    { 
                        value: "A",
                        effectiveness: "Highly Effective", 
                        nonIntrusive: [
                            <div> No inspection techniques are yet available  to meet the requirements for an 'A' level inspection. </div>,
                        ]
                    },
                    { 
                        value: "B",
                        effectiveness: "Usually Effective", 
                        nonIntrusive: [
                            <div> For selected areas: <br /> </div>,
                            <div className="ml-3"> 100% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> AE testing with 100% follow-up of relevant indications. </div>,
                        ]
                    },
                    { 
                        value: "C",
                        effectiveness: "Fairly Effective", 
                        nonIntrusive: [
                            <div> For selected areas: <br />  </div>,
                            <div className="ml-3"> &gt;65% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> &gt;65% radiographic testing. </div>,
                        ]
                    },
                    { 
                        value: "D",
                        effectiveness: "Poorly Effective", 
                        nonIntrusive: [
                            <div> For selected areas: <br /></div>,
                            <div className="ml-3"> &gt;35% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> &gt;35% radiographic testing. </div>,
                        ]
                    },
                    { 
                        value: "E",
                        effectiveness: "Ineffective", 
                        nonIntrusive: [
                            <div> Ineffective inspection technique/plan was utilized </div>,
                        ]
                    },
                ]
            }
        ]
    },
    {
        id: 9,
        damageFactor: "SCC Damage Factor-Chloride Stress Corrosion Cracking",
        level: [
            {
                name: "Austenitic Component",
                category: [
                    { 
                        value: "A",
                        effectiveness: "Highly Effective", 
                        nonIntrusive: [
                            <div> No inspection techniques are yet available to meet the requirements for an 'A' level inspection. </div>,
                        ]
                    },
                    { 
                        value: "B",
                        effectiveness: "Usually Effective", 
                        nonIntrusive: [
                            <div> For selected areas: <br /></div>,
                            <div className="ml-3"> 100% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> AE testing with 100% follow-up of relevant indications. </div>,
                        ]
                    },
                    { 
                        value: "C",
                        effectiveness: "Fairly Effective", 
                        nonIntrusive: [
                            <div> For selected areas: <br /></div>,
                            <div className="ml-3"> &gt;65% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> &gt;65% radiographic testing. </div>,
                        ]
                    },
                    { 
                        value: "D",
                        effectiveness: "Poorly Effective", 
                        nonIntrusive: [
                            <div> For selected areas: <br /></div>,
                            <div className="ml-3"> &gt;35% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> &gt;35% radiographic testing. </div>,
                        ]
                    },
                    { 
                        value: "E",
                        effectiveness: "Ineffective", 
                        nonIntrusive: [
                            <div> Ineffective inspection technique/plan was utilized </div>,
                        ]
                    },
                ]
            }
        ]
    },
    {
        id: 10,
        damageFactor: "SCC Damage Factor-Hydrogen Stress Cracking-HF",
        level: [
            {
                name: "Hydrogen - HF",
                category: [
                    { 
                        value: "A",
                        effectiveness: "Highly Effective", 
                        nonIntrusive: [
                            <div> For the total weld area: <br /> </div>,
                            <div className="ml-3"> 100% automated or manual ultrasonic scanning. </div>,
                        ]
                    },
                    { 
                        value: "B",
                        effectiveness: "Usually Effective", 
                        nonIntrusive: [
                            <div> For selected welds / weld area: <br /> </div>,
                            <div className="ml-3"> &gt;75% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> AE testing with 100% follow-up of relevant indications. </div>,
                        ]
                    },
                    { 
                        value: "C",
                        effectiveness: "Fairly Effective", 
                        nonIntrusive: [
                            <div> For selected welds / weld area: <br /> </div>,
                            <div className="ml-3"> &gt;35% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> &gt;65% radiographic testing. </div>,
                        ]
                    },
                    { 
                        value: "D",
                        effectiveness: "Poorly Effective", 
                        nonIntrusive: [
                            <div> For selected welds / weld area: <br /> </div>,
                            <div className="ml-3"> &gt;10% automated or manual ultrasonic scanning </div>,
                            <b>OR</b>,
                            <div className="ml-3"> &gt;65% radiographic testing. </div>,
                        ]
                    },
                    { 
                        value: "E",
                        effectiveness: "Ineffective", 
                        nonIntrusive: [
                            <div> Ineffective inspection technique/plan was utilized </div>,
                        ]
                    },
                ]
            }
        ]
    },
    {
        id: 11,
        damageFactor: "SCC Damage Factor HIC/SOHIC-HF",
        level: [
            {
                name: "HIC/SOHIC-HF",
                category: [
                    { 
                        value: "A",
                        effectiveness: "Highly Effective", 
                        nonIntrusive: [
                            <div> For the total weld area: <br /> </div>,
                            <ul className="ml-3">
                                <li><b>SOHIC:</b></li>
                                <li>&gt;90% C scan of the base metal using advanced UT</li>
                                <li>For the weld and HAZ - 100% Shear Wave and TOFD</li>
                            </ul>,
                            <b>AND</b>,
                            <ul className="ml-3">
                                <li><b>HIC:</b></li>
                                <li>Two 1-ft2 areas, C scan of the base metal using advanced UT on each plate and the heads.</li>
                            </ul>
                        ]
                    },
                    { 
                        value: "B",
                        effectiveness: "Usually Effective", 
                        nonIntrusive: [
                            <div> For the total surface area: <br /> </div>,
                            <div className="ml-3"> &gt;65% C scan of the base metal using advanced UT</div>,
                            <b>AND</b>,
                            <ul className="ml-3">
                                <li><b>HIC:</b></li>
                                <li>Two 0.5-ft2 areas, C scan of the base metal using advanced UT on each plate and the heads.</li>
                            </ul>
                        ]
                    },
                    { 
                        value: "C",
                        effectiveness: "Fairly Effective", 
                        nonIntrusive: [
                            <div> For the total surface area: <br /> </div>,
                            <div className="ml-3"> &gt;35% C scan of the base metal using advanced UT</div>,
                            <b>AND</b>,
                            <ul className="ml-3">
                                <li><b>HIC:</b></li>
                                <li>One 1-ft2 area, C scan of the base metal using advanced UT on each plate and the heads.</li>
                            </ul>
                        ]
                    },
                    { 
                        value: "D",
                        effectiveness: "Poorly Effective", 
                        nonIntrusive: [
                            <div> For the total surface area: <br /> </div>,
                            <div className="ml-3"> &gt;5% C scan of the base metal using advanced UT</div>,
                            <b>AND</b>,
                            <ul className="ml-3">
                                <li><b>HIC:</b></li>
                                <li>One 0.5-ft2 area, C scan of the base metal using advanced UT on each plate and the heads.</li>
                            </ul>
                        ]
                    },
                    { 
                        value: "E",
                        effectiveness: "Ineffective", 
                        nonIntrusive: [
                            <div> Ineffective inspection technique/plan was utilized </div>,
                        ]
                    },
                ]
            }
        ]
    },
    {
        id: 12,
        damageFactor: "External Corrosion Damage Factor",
        level: [
            {
                name: "External Corrosion",
                category: [
                    { 
                        value: "A",
                        effectiveness: "Highly Effective", 
                        nonIntrusive: [
                            <div> Visual inspection of &gt;95% of the exposed surface area with follow-up by UT, RT or pit gauge as required. </div>,
                        ]
                    },
                    { 
                        value: "B",
                        effectiveness: "Usually Effective", 
                        nonIntrusive: [
                            <div> Visual inspection of &gt;60% of the exposed surface area with follow-up by UT, RT or pit gauge as required. </div>,
                        ]
                    },
                    { 
                        value: "C",
                        effectiveness: "Fairly Effective", 
                        nonIntrusive: [
                            <div> Visual inspection of &gt;30% of the exposed surface area with follow-up by UT, RT or pit gauge as required. </div>,
                        ]
                    },
                    { 
                        value: "D",
                        effectiveness: "Poorly Effective", 
                        nonIntrusive: [
                            <div> Visual inspection of &gt;5% of the exposed surface area with follow-up by UT, RT or pit gauge as required. </div>,
                        ]
                    },
                    { 
                        value: "E",
                        effectiveness: "Ineffective", 
                        nonIntrusive: [
                            <div> Ineffective inspection technique/plan was utilized </div>,
                        ]
                    },
                ]
            },
        ]
    },
    {
        id: 13,
        damageFactor: "Corrosion Under Insulation Damage Factor-Ferritic Commponent"
    },
    {
        id: 14,
        damageFactor: "External Chloride Stress Corrosion Cracking Damage Factor-Austenitic Component",
        level: [
            {
                name: "Factor-Austenitic",
                category: [
                    { 
                        value: "A",
                        effectiveness: "Highly Effective", 
                        nonIntrusive: [
                            <div> For the suspected surface area: <br /> </div>,
                            <div className="ml-3">
                                100% dye penetrant or eddy current test with UT followup of relevant indications.
                            </div>,
                        ]
                    },
                    { 
                        value: "B",
                        effectiveness: "Usually Effective", 
                        nonIntrusive: [
                            <div> For the suspected surface area: <br /> </div>,
                            <div className="ml-3">
                                60% dye penetrant or eddy current test with UT followup of relevant indications.
                            </div>,
                        ]
                    },
                    { 
                        value: "C",
                        effectiveness: "Fairly Effective", 
                        nonIntrusive: [
                            <div> For the suspected surface area: <br /> </div>,
                            <div className="ml-3">
                                30% dye penetrant or eddy current test with UT followup of relevant indications.
                            </div>,
                        ]
                    },
                    { 
                        value: "D",
                        effectiveness: "Fairly Effective", 
                        nonIntrusive: [
                            <div> For the suspected surface area: <br /> </div>,
                            <div className="ml-3">
                                5% dye penetrant or eddy current test with UT followup of relevant indications.
                            </div>,
                        ]
                    },
                    { 
                        value: "E",
                        effectiveness: "Ineffective", 
                        nonIntrusive: [
                            <div> Ineffective inspection technique/plan was utilized </div>,
                        ]
                    },
                ]
            }
        ]
    },
    {
        id: 15,
        damageFactor: "High Temperature Hydrogen Attack Damage Factor",
        level: [
            {
                name: "No Recomendation from API 581",
                category: [
                    { 
                        value: "0",
                        effectiveness: "No recomendation", 
                        nonIntrusive: [
                            <div> No Recomendation from API 581 </div>,
                        ]   
                    },
                ]
            }
        ]
    },
    {
        id: 16,
        damageFactor: "Brittle Fracture Damage Factor",
        level: [
            {
                name: "No Recomendation from API 581",
                category: [
                    { 
                        value: "0",
                        effectiveness: "No recomendation", 
                        nonIntrusive: [
                            <div> No Recomendation from API 581 </div>,
                        ]   
                    },
                ]
            }
        ]
    },
    {
        id: 17,
        damageFactor: "Low Alloy Steel Embrittlement Damage Factor",
        level: [
            {
                name: "No Recomendation from API 581",
                category: [
                    { 
                        value: "0",
                        effectiveness: "No recomendation", 
                        nonIntrusive: [
                            <div> No Recomendation from API 581 </div>,
                        ]   
                    },
                ]
            }
        ]
    },
    {
        id: 18,
        damageFactor: "885°F Embrittlement Damage Factor",
        level: [
            {
                name: "No Recomendation from API 581",
                category: [
                    { 
                        value: "0",
                        effectiveness: "No recomendation", 
                        nonIntrusive: [
                            <div> No Recomendation from API 581 </div>,
                        ]   
                    },
                ]
            }
        ]
    },
    {
        id: 19,
        damageFactor: "Sigma Phase Embrittlement Damage Factor",
        level: [
            {
                name: "No Recomendation from API 581",
                category: [
                    { 
                        value: "0",
                        effectiveness: "No recomendation", 
                        nonIntrusive: [
                            <div> No Recomendation from API 581 </div>,
                        ]   
                    },
                ]
            }
        ]
    },
    {
        id: 20,
        damageFactor: "Piping Mechanical Fatigue Damage Factor",
        level: [
            {
                name: "No Recomendation from API 581",
                category: [
                    { 
                        value: "0",
                        effectiveness: "No recomendation", 
                        nonIntrusive: [
                            <div> No Recomendation from API 581 </div>,
                        ]   
                    },
                ]
            }
        ]
    },
]

const recomendationTank = [
    {
        id: "recomendationTank001",
        damageFactor: "AST Shell Course Internal Corrosion",
        level: [
            {
                name: "Table 2.C.5.1",
                category: [
                    { 
                        value: "A",
                        effectiveness: "Highly Effective", 
                        nonIntrusive: [
                            <div> Both Inspections Shall be done: </div>,
                            <ul>
                                <li>Intrusive inpsection - good visual inspection with pit depth gage measurements at suspect locations.</li>
                                <li>UT scanning follow up on suspcet location and as general confirmation of wall thickness</li>
                            </ul>
                        ]   
                    },
                    { 
                        value: "B",
                        effectiveness: "Usually Effective", 
                        nonIntrusive: [
                            <div> Both Inspections Shall be done: </div>,
                            <ul>
                                <li>External spot UT scanning based on visual information from previous internal inspection of this AST or similar service ASTs</li>
                                <li>Internal video survery with external UT follow-up</li>
                            </ul>
                        ]   
                    },
                    { 
                        value: "C",
                        effectiveness: "Fairly Effective", 
                        nonIntrusive: [
                            <div>External sopt UT scanning based at suspect locations without benefit of any internal inspection information on AST  type or service</div>,
                        ]   
                    },
                    { 
                        value: "D",
                        effectiveness: "Poorly Effective", 
                        nonIntrusive: [
                            <div>External sopt UT based at suspect locations without benefit of any internal inspection information on AST  type or service</div>,
                        ]   
                    },
                    { 
                        value: "E",
                        effectiveness: "Ineffective", 
                        nonIntrusive: [
                            <div>Ineffective inspection techniques/plan was utilized.</div>,
                        ]   
                    },
                ]
            },
            {
                name: "Table 2.C.5.2",
                category: [
                    { 
                        value: "A",
                        effectiveness: "Highly Effective", 
                        nonIntrusive: [
                            <div> Insulated Tank Inspection Example </div>,
                            <ul>
                                <li>&gt; 95% external visual inspection prior to removal of insulation</li>
                                <li>Remove &gt; 90% of insulation at suspect locations,</li>
                                <b>OR</b>
                                <br />
                                <span>&gt; 90% of pulse eddy current inspection.</span>
                                <li>Visual inspection of the exposed surface area with follow-up by UT or pit gauge as required</li>
                            </ul>,
                            <div> Non-Insulated Tank Inspection Example </div>,
                            <ul>
                                <li>&gt; 95% visual inspection of the exposed surfave area</li>
                                <b>AND</b>
                                <br />
                                <li>Follow up by UT or pit gauge as required.</li>
                            </ul>,
                        ]   
                    },
                    { 
                        value: "B",
                        effectiveness: "Usually Effective", 
                        nonIntrusive: [
                            <div> Insulated Tank Inspection Example </div>,
                            <ul>
                                <li>&gt; 95% external visual inspection prior to removal of insulation</li>
                                <li>Remove &gt; 50% of insulation at suspect locations,</li>
                                <b>OR</b>
                                <br />
                                <span>&gt; 50% of pulse eddy current inspection.</span>
                                <li>Visual inspection of the exposed surface area with follow-up by UT or pit gauge as required</li>
                            </ul>,
                            <div> Non-Insulated Tank Inspection Example </div>,
                            <ul>
                                <li>&gt; 50% visual inspection of the exposed surfave area</li>
                                <b>AND</b>
                                <br />
                                <li>Follow up by UT or pit gauge as required.</li>
                            </ul>,
                        ]   
                    },
                    { 
                        value: "C",
                        effectiveness: "Fairly Effective", 
                        nonIntrusive: [
                            <div> Insulated Tank Inspection Example </div>,
                            <ul>
                                <li>&gt; 95% external visual inspection prior to removal of insulation</li>
                                <li>Remove &gt; 30% of insulation at suspect locations,</li>
                                <b>OR</b>
                                <br />
                                <span>&gt; 30% of pulse eddy current inspection.</span>
                                <li>Visual inspection of the exposed surface area with follow-up by UT or pit gauge as required</li>
                            </ul>,
                            <div> Non-Insulated Tank Inspection Example </div>,
                            <ul>
                                <li>&gt; 25% visual inspection of the exposed surfave area</li>
                                <b>AND</b>
                                <br />
                                <li>Follow up by UT or pit gauge as required.</li>
                            </ul>,
                        ]   
                    },
                    { 
                        value: "D",
                        effectiveness: "Poorly Effective", 
                        nonIntrusive: [
                            <div> Insulated Tank Inspection Example </div>,
                            <ul>
                                <li>&gt; 95% external visual inspection prior to removal of insulation</li>
                                <li>Remove &gt; 10% of insulation at suspect locations,</li>
                                <b>OR</b>
                                <br />
                                <span>&gt; 10% of pulse eddy current inspection.</span>
                                <li>Visual inspection of the exposed surface area with follow-up by UT or pit gauge as required</li>
                            </ul>,
                            <div> Non-Insulated Tank Inspection Example </div>,
                            <ul>
                                <li>&gt; 10% visual inspection of the exposed surfave area</li>
                                <b>AND</b>
                                <br />
                                <li>Follow up by UT or pit gauge as required.</li>
                            </ul>,
                        ]  
                    },
                    { 
                        value: "E",
                        effectiveness: "Ineffective", 
                        nonIntrusive: [
                            <div> Insulated Tank Inspection Example </div>,
                            <br />,
                            <div>Ineffective inspection techniques/plan was utilized.</div>,
                            <div> Non-Insulated Tank Inspection Example </div>,
                            <br />,
                            <div>Ineffective inspection techniques/plan was utilized.</div>,
                        ]   
                    },
                ]
            },
            {
                name: "Table 2.C.5.3",
                category: [
                    { 
                        value: "A",
                        effectiveness: "Highly Effective", 
                        nonIntrusive: [
                            <div> Soil Side </div>,
                            <ul>
                                <span>Floor scan &gt; 90%</span>
                                <br />
                                <b>AND</b>
                                <br />
                                <span>UT follow-up</span>
                                <br />
                                <span><u>Note</u></span>
                                <li>Include welds if warranted from the results on the plate scanning</li>
                                <li>Hand scan of the critical zone</li>
                            </ul>,
                            <div> Product side </div>,
                            <br />,
                            <div> Bare Plate: </div>,
                            <ul>
                                <li>Commercial blast</li>
                                <li>Effective supplementary light</li>
                                <li>Visual 100% (API 653)</li>
                                <li>Pit depth gauge</li>
                                <li>100% vacuum box testing of suspect welded joints</li>
                            </ul>,
                            <br />,
                            <div> Coating or Liner: </div>,
                            <ul>
                                <li>Sponge test 100%</li>
                                <li>Adhesion test</li>
                                <li>Scrape test</li>
                            </ul>,
                        ]   
                    },
                    { 
                        value: "B",
                        effectiveness: "Usually Effective", 
                        nonIntrusive: [
                            <div> Soil Side </div>,
                            <ul>
                                <span>Floor scan &gt; 50%</span>
                                <br />
                                <b>AND</b>
                                <br />
                                <span>UT follow-up</span>
                                <br />
                                <b>OR</b>
                                <span>EVA or other statistical method with Floor scan follow-up (if warranted by the result)</span>
                            </ul>,
                            <div> Product side </div>,
                            <br />,
                            <div> Bare Plate: </div>,
                            <ul>
                                <li>Brush blast</li>
                                <li>Effective supplementary light</li>
                                <li>Visual 100% (API 653)</li>
                                <li>Pit depth gauge</li>
                            </ul>,
                            <br />,
                            <div> Coating or Liner: </div>,
                            <ul>
                                <li>Sponge test &gt;75%</li>
                                <li>Adhesion test</li>
                                <li>Scrape test</li>
                            </ul>,
                        ]   
                    },
                    { 
                        value: "C",
                        effectiveness: "Fairly Effective", 
                        nonIntrusive: [
                            <div> Soil Side </div>,
                            <ul>
                                <span>Floor scan 5-10+ % plates</span>
                                <br />
                                <b>AND</b>
                                <br />
                                <span>Supplement with scanning near shell</span>
                                <b>AND</b>
                                <br />
                                <span>UT follow-up</span>
                                <br />
                                <b>OR</b>
                                <span>Use a 'Scan circle-and-X' pattern (progressively increase if damage found during sacnning)</span>
                                <br />
                                <span>Other Testing:</span>
                                <ul>
                                    <li>Helium/Argon test</li>
                                    <li>Hammer Test</li>
                                    <li>Cut Coupons</li>
                                </ul>
                            </ul>,
                            <div> Product side </div>,
                            <br />,
                            <div> Bare Plate: </div>,
                            <ul>
                                <li>Broom swept</li>
                                <li>Effective supplementary light</li>
                                <li>Visual 100%</li>
                                <li>Pit depth gauge</li>
                            </ul>,
                            <br />,
                            <div> Coating or Liner: </div>,
                            <ul>
                                <li>Sponge test 50 - 75%</li>
                                <li>Adhesion test</li>
                                <li>Scrape test</li>
                            </ul>,
                        ]    
                    },
                    { 
                        value: "D",
                        effectiveness: "Poorly Effective", 
                        nonIntrusive: [
                            <div> Soil Side </div>,
                            <span>Possible Testing:</span>,
                            <ul>
                                <li>Spot UT</li>
                                <li>Flood Test</li>
                            </ul>,
                            <div> Product side </div>,
                            <br />,
                            <div> Bare Plate: </div>,
                            <ul>
                                <li>Broom swept</li>
                                <li>No Effective supplementary light</li>
                                <li>Visual &gt;50%</li>
                            </ul>,
                            <br />,
                            <div> Coating or Liner: </div>,
                            <ul>
                                <li>Sponge test &lt;50%</li>
                            </ul>,
                        ]   
                    },
                    { 
                        value: "E",
                        effectiveness: "Ineffective", 
                        nonIntrusive: [
                            <div> Soil Side </div>,
                            <br />,
                            <div>Ineffective inspection techniques/plan was utilized.</div>,
                            <div> Product Side </div>,
                            <br />,
                            <div>Ineffective inspection techniques/plan was utilized.</div>,
                        ]   
                    },
                ]
            },
        ]
    },
]

export { recomendationPV, recomendationTank };
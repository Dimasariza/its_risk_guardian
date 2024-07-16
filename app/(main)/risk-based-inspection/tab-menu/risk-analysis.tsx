/* eslint-disable */
'use client';

import { GeneralDataService } from "@/service/calculation/generalData-service";
import { 
  getAlkaline as getRBIAlkaline, 
  getExternalCorrosion as getRBIExternalCorrosion, 
  getThinning as getRBIThinning, 
  getValue as getRBIValue 
} from "@/service/calculation/pofRBIDate-service";
import { 
  getAlkaline as getPlanAlkaline, 
  getExternalCorrosion as getPlanExternalCorrosion, 
  getThinning as getPlanThinning, 
  getValue as getPlanValue 
} from "@/service/calculation/pofPlanDate-service";
import { axisClasses, LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { gffTableValue } from "./pof-rbi-date/value/gffTableValue";
import { calculateAlkaline as RBIcalculateAlkaline } from "@/function/calcRBIAlkalineValue";
import { calculateAlkaline as PlancalculateAlkaline } from "@/function/calcPlanAlkalineValue";
import { calculateCOF } from "@/function/calcCOFValue";
import IGeneralData from "@/types/IGeneralData";
import { CofService } from "@/service/calculation/cofService";
import { representativeFluidNodes } from "./cof/representativeFluidDialog";
import { detection, isolation } from "./cof/detectionAndIsolation";
import { flamableTable } from "./cof/flamableDialog";
import { damageTable } from "./cof/damageDialog";
import { liquidPhase } from "./cof/phaseOfFluidDialog";
import { liquidInventories } from "./cof/liquidInventoriesDialog";
import { adjMitigation } from "./cof/adjustmentToFlamable";

const riskMatrix: any = [
  {
    title: 'Shell Section',
    data: [
      [
        { row:5, column: "0", value: 5, noBorder: true },
        { row:5, column: "A", value: "", color: 'bg-yellow-500' },
        { row:5, column: "B", value: "", color: 'bg-orange-500' },
        { row:5, column: "C", value: "", color: 'bg-orange-500' },
        { row:5, column: "D", value: "", color: 'bg-red-600' },
        { row:5, column: "E", value: "", color: 'bg-red-600' },
      ],
      [
        { row:4, column: "0", value: 4, noBorder: true },
        { row:4, column: "A", value: "", color: 'bg-yellow-500' },
        { row:4, column: "B", value: "", color: 'bg-yellow-500' },
        { row:4, column: "C", value: "", color: 'bg-orange-500' },
        { row:4, column: "D", value: "", color: 'bg-orange-500' },
        { row:4, column: "E", value: "", color: 'bg-red-600' },
      ],
      [
        { row:3, column: "0", value: 3, noBorder: true },
        { row:3, column: "A", value: "", color: 'bg-green-400' },
        { row:3, column: "B", value: "", color: 'bg-yellow-500' },
        { row:3, column: "C", value: "", color: 'bg-yellow-500' },
        { row:3, column: "D", value: "", color: 'bg-orange-500' },
        { row:3, column: "E", value: "", color: 'bg-orange-500' },
      ],
      [
        { row:2, column: "0", value: 2, noBorder: true },
        { row:2, column: "A", value: "", color: 'bg-green-400' },
        { row:2, column: "B", value: "", color: 'bg-green-400' },
        { row:2, column: "C", value: "", color: 'bg-yellow-500' },
        { row:2, column: "D", value: "", color: 'bg-yellow-500' },
        { row:2, column: "E", value: "", color: 'bg-orange-500' },
      ],
      [
        { row:1, column: "0", value: 1, noBorder: true },
        { row:1, column: "A", value: "", color: 'bg-green-400' },
        { row:1, column: "B", value: "", color: 'bg-green-400' },
        { row:1, column: "C", value: "", color: 'bg-green-400' },
        { row:1, column: "D", value: "", color: 'bg-yellow-500' },
        { row:1, column: "E", value: "", color: 'bg-yellow-500' },
      ],
      [
        { value: "", noBorder: true },
        { value: "A", noBorder: true },
        { value: "B", noBorder: true },
        { value: "C", noBorder: true },
        { value: "D", noBorder: true },
        { value: "E", noBorder: true },
      ]
    ]
  },
  {
    title: 'Head Section',
    data: [
      [
        { row:5, column: "0", value: 5, noBorder: true },
        { row:5, column: "A", value: "", color: 'bg-yellow-500' },
        { row:5, column: "B", value: "", color: 'bg-orange-500' },
        { row:5, column: "C", value: "", color: 'bg-orange-500' },
        { row:5, column: "D", value: "", color: 'bg-red-600' },
        { row:5, column: "E", value: "", color: 'bg-red-600' },
      ],
      [
        { row:4, column: "0", value: 4, noBorder: true },
        { row:4, column: "A", value: "", color: 'bg-yellow-500' },
        { row:4, column: "B", value: "", color: 'bg-yellow-500' },
        { row:4, column: "C", value: "", color: 'bg-orange-500' },
        { row:4, column: "D", value: "", color: 'bg-orange-500' },
        { row:4, column: "E", value: "", color: 'bg-red-600' },
      ],
      [
        { row:3, column: "0", value: 3, noBorder: true },
        { row:3, column: "A", value: "", color: 'bg-green-400' },
        { row:3, column: "B", value: "", color: 'bg-yellow-500' },
        { row:3, column: "C", value: "", color: 'bg-yellow-500' },
        { row:3, column: "D", value: "", color: 'bg-orange-500' },
        { row:3, column: "E", value: "", color: 'bg-orange-500' },
      ],
      [
        { row:2, column: "0", value: 2, noBorder: true },
        { row:2, column: "A", value: "", color: 'bg-green-400' },
        { row:2, column: "B", value: "", color: 'bg-green-400' },
        { row:2, column: "C", value: "", color: 'bg-yellow-500' },
        { row:2, column: "D", value: "", color: 'bg-yellow-500' },
        { row:2, column: "E", value: "", color: 'bg-orange-500' },
      ],
      [
        { row:1, column: "0", value: 1, noBorder: true },
        { row:1, column: "A", value: "", color: 'bg-green-400' },
        { row:1, column: "B", value: "", color: 'bg-green-400' },
        { row:1, column: "C", value: "", color: 'bg-green-400' },
        { row:1, column: "D", value: "", color: 'bg-yellow-500' },
        { row:1, column: "E", value: "", color: 'bg-yellow-500' },
      ],
      [
        { value: "", noBorder: true },
        { value: "A", noBorder: true },
        { value: "B", noBorder: true },
        { value: "C", noBorder: true },
        { value: "D", noBorder: true },
        { value: "E", noBorder: true },
      ]
    ]
  }
];

const chartProps: any = {
  slotProps: {
    legend: {
      labelStyle: {
        fontSize: 14,
        fill: 'blue',
      },
      markGap: 5,
      itemGap: 10,
    },
    mark: {
      display: 'none',
      shape: "square",
    }
  },
  grid: { 
    horizontal: true 
  },
  bottomAxis: {
    label: "Years",
    labelStyle: {
      fill: 'white'
    }
  },
  leftAxis: {
    label: "Risk (ft²/year)",
    labelStyle: {
      fill: "white"
    }
  },
  width: 600,
  height: 400,
  yAxis: [{ data: [0, 2, 4, 6, 8, 10] }],
  sx: () => ({
    [`.${axisClasses.root}`]: {
      [`.${axisClasses.tick}, .${axisClasses.line}`]: {
        stroke: '#006BD6',
        opacity: 0.5,
        strokeWidth: 2,
      },
      [`.${axisClasses.tickLabel}`]: {
        fill: '#006BD6',
      },
    },
    [`.MuiMarkElement-series-PlanDate:nth-of-type(1)`]: {
      stroke: "blue",
      strokeOpacity: 0.5,
      fill: 'cyan',
      display: 'block'
    },
    [`.MuiMarkElement-series-PlanDate:nth-of-type(2)`]: {
      stroke: "green",
      strokeOpacity: 0.9,
      fill: 'yellowgreen',
      display: 'block'
    },
    [".MuiChartsAxisHighlight-root"]: {
      // stroke: "white"
    },
    [".MuiChartsGrid-root"]: {
      // stroke: "white"
    },
  })
}

{/* <i className="pi pi-star-fill" style={{ color: 'slateblue', fontSize: "2rem" }}></i> */}
 

function RiskAnalysis() {



  const riskPlotting = (probabilityRange: number, consequenceRange: number) => {
    const probability = [
      {
        category: 1,
        range: probabilityRange <= 1,
      },
      {
        category: 2,
        range: probabilityRange > 1 && probabilityRange <= 10,
      },
      {
        category: 3,
        range: probabilityRange > 10 && probabilityRange <= 100,
      },
      {
        category: 4,
        range: probabilityRange > 100 && probabilityRange <= 1000,
      },
      {
        category: 5,
        range: probabilityRange >= 1000,
      },
    ].find(({range}: any) => range)

    const consequence = [
      {
        category: "A",
        range: consequenceRange <= 9.29,
      },
      {
        category: "B",
        range: consequenceRange > 9.29 && consequenceRange <= 92.9,
      },
      {
        category: "C",
        range: consequenceRange > 92.9 && consequenceRange <= 929,
      },
      {
        category: "D",
        range: consequenceRange > 929 && consequenceRange <= 9290,
      },
      {
        category: "E",
        range: consequenceRange >= 9290,
      },
    ].find(({range}: any) => range)

    return { probability, consequence }
  }

  const [generalData, setGeneralData] = useState<IGeneralData | any>({})
  const [rbiThinning, setRBIThinning] = useState({})
  const [rbiExCor, setRBIExCor] = useState({})
  const [rbiAlkaline, setRBIAlkaline] = useState({})
  const [cofValue, setCofValue] = useState<any>({})
  const [planThinning, setPlanThinning] = useState({})
  const [planExCor, setPlanExCor] = useState({})
  const [planAlkaline, setPlanAlkaline] = useState({})
  const data = useSelector((state: any) => state.Reducer);
  const componentId = data.menu?.comp_id

  
  useEffect(() => {
    GeneralDataService.fetchData(componentId)
    .then((res: any) => {
      setGeneralData(res)
    })

    getRBIThinning(componentId)
    .then((res: any) => {
      setRBIThinning(res)
    })

    getRBIExternalCorrosion(componentId)
    .then((res: any) => {
      setRBIExCor(res)
    })

    getRBIAlkaline(componentId).then((res: any) => {
      setRBIAlkaline(res);
    });

    getPlanThinning(componentId)
    .then((res: any) => {
      setPlanThinning(res)
    })

    getPlanExternalCorrosion(componentId)
    .then((res: any) => {
      setPlanExCor(res)
    })

    getPlanAlkaline(componentId).then((res: any) => {
      setPlanAlkaline(res);
    });

    CofService.fetchData(componentId)
    .then(res => {
        setCofValue({
            ...res,
            fluidSelected: representativeFluidNodes.find((i: any) => i.id == res.cof_representativeFluid),
            impact: {
                cof_detectionSystem: detection.find((i: any) => i.id == res.cof_detectionSystem),
                cof_isolationSystem: isolation.find((i: any) => i.id == res.cof_isolationSystem),
            },
            flamable: flamableTable.find((i: any) => i.id == res.cof_flamableCons),
            damage: damageTable.find((i: any) => i.id == res.cof_damageCons),
            phase: liquidPhase.find((i: any) => i.id == res.cof_phaseOfFluid),
            inventories: liquidInventories.find((i: any) => i.id == res.cof_liquidInventories),
            mitigation: adjMitigation.find((i: any) => i.id == res.cof_adjToFlamable),
            amoniaChloride: {}
        })  
        getRBIValue(componentId)
        .then((res) => {
          const failureFreq = gffTableValue.find(i => i.id == res.rbiValue_failureFrequency)
          setCofValue((prev: any) => ({...prev, failureFreq}))
        })

    })

  }, []);

  const {
    shellBaseDF: RBIshellBaseDF,
    headBaseDF: RBIheadBaseDF,
    rbiShellSection,
    rbiHeadSection,
    shellPWHT: RBIshellPWHT,
    headPWHT: RBIheadPWHT
  } = RBIcalculateAlkaline({
    generalData,
    thinning: rbiThinning,
    exCor: rbiExCor,
    alkaline: rbiAlkaline
  })

  const {
    shellBaseDF: PlanshellBaseDF,
    headBaseDF: PlanheadBaseDF,
    planShellSection,
    planHeadSection,
    shellPWHT: PlanshellPWHT,
    headPWHT: PlanheadPWHT
  } = PlancalculateAlkaline({
    generalData,
    thinning: rbiThinning,
    exCor: rbiExCor,
    alkaline: rbiAlkaline
  })

  const RBIshellTotal = Math.max(RBIshellBaseDF!, rbiShellSection!) + RBIshellPWHT
  const RBIheadTotal = Math.max(RBIheadBaseDF!, rbiHeadSection!) + RBIheadPWHT
  const PlanshellTotal = Math.max(PlanshellBaseDF!, planShellSection!) + PlanshellPWHT
  const PlanheadTotal = Math.max(PlanheadBaseDF!, planHeadSection!) + PlanheadPWHT

  const {
    finalConsequenceM
  } = calculateCOF({
      generalData, 
      fluidSelected: cofValue?.fluidSelected,
      cofValue: cofValue,
      impact: cofValue?.impact
  })

  const rbiHeadPlotting =  riskPlotting(RBIheadTotal, finalConsequenceM!)
  const rbiShellPlotting =  riskPlotting(RBIshellTotal, finalConsequenceM!)
  const planHeadPlotting =  riskPlotting(PlanheadTotal, finalConsequenceM!)
  const planShellPlotting =  riskPlotting(PlanshellTotal, finalConsequenceM!)

  const iconPlotting = (row: number, column: string, title: string, value: string) => {
    if( 
      rbiHeadPlotting.consequence?.category == column 
      && rbiHeadPlotting.probability?.category == row
      && title == "Head Section")
    return [value, <i className="pi pi-circle-fill" style={{ color: 'slateblue', fontSize: "1.4rem" }}></i>]
    else if(
      rbiShellPlotting.consequence?.category == column 
      && rbiShellPlotting.probability?.category == row
      && title == "Shell Section"
    )
    return [value, <i className="pi pi-circle-fill" style={{ color: 'slateblue', fontSize: "1.4rem" }}></i>]
    else if(
      planHeadPlotting.consequence?.category == column 
      && planHeadPlotting.probability?.category == row
      && title == "Head Section"
    )
    return [value, <i className="pi pi-star-fill" style={{ color: 'slateblue', fontSize: "1.4rem" }}></i>]
    else if(
      planShellPlotting.consequence?.category == column 
      && planShellPlotting.probability?.category == row
      && title == "Shell Section"
    )
    return [value, <i className="pi pi-star-fill" style={{ color: 'slateblue', fontSize: "1.4rem" }}></i>]
    return value
  }

  const [value, setValue] = useState<any>({
    shellRangeDate: [3, 7],
    headRangeDate: [2, 5],
    shellRiskTarget: 5.71,
    headRiskTarget: 4.71,
    shellXAxis: [3, 12],
    headXAxis: [2, 16]
  });

  const shellRangeDate = [null, ...value?.shellRangeDate];
  const headRangeDate = [null, ...value?.headRangeDate];
  const shellXAxis = [0, ...value?.shellXAxis, 25];
  const headXAxis = [0, ...value?.headXAxis, 25];
  const shellRiskTarget = shellXAxis.map(_ => value?.shellRiskTarget); 		
  const headRiskTarget = headXAxis.map(_ => value?.headRiskTarget); 		

  return (
    <section className="p-4">
      <div className="grid">
        {
          riskMatrix.map(({ title, data }: any, matrixKey: number) => (
            <div className="col-6 sm:col-12 md:col-12 lg:col-12 xl:col-6" key={matrixKey}>
              <div className="card mb-0">
                <div className="flex justify-content-center mb-3 mr-8">
                  <div style={{transform: "rotate(-90deg)", height: "1rem", position: "relative", top: "15rem", left: "2rem"}}>Probability</div>
                  <div>
                    <span className="flex text-500 font-medium mb-3 w-full justify-content-center ml-5">{title}</span>
                    {
                      data.map((item: any, id_1: number) => (
                        <div className="flex justify-content-center" key={id_1}>
                          {
                            item.map(({ value, color, noBorder, row, column }: any, id_2: number) => (
                              <div key={id_2} 
                                className={`flex align-items-center justify-content-center w-5rem h-5rem font-bold border-500 ${noBorder ? "border-0" : "border-1"} ${color}`} 
                                style={{ fontSize: `${noBorder ? "1.4rem" : "3rem"}` }}
                              >
                                { 
                                  iconPlotting(row, column, title, value)
                                }
                              </div>
                            ))
                          }
                        </div>
                      ))
                    }
                    <div className="flex justify-content-center ml-8">Consequence</div>
                  </div>
                  <div className="flex flex-column justify-content-center p-5">
                    <div className="p-1">
                      <div style={{width: "20px", height: "1rem"}} className="bg-red-600"></div>
                      <span>High</span>
                    </div>
                    <div className="p-1">
                      <div style={{width: "20px", height: "1rem"}} className="bg-orange-500"></div>
                      <span>Medium High</span>
                    </div>
                    <div className="p-1">
                      <div style={{width: "20px", height: "1rem"}} className="bg-yellow-500"></div>
                      <span>Medium</span>
                    </div>
                    <div className="p-1">
                      <div style={{width: "20px", height: "1rem"}} className="bg-green-400"></div>
                      <span>Medium Low</span>
                    </div>
                    <div className="p-1">
                      <div style={{fontSize: "2rem"}} ><i className="pi pi-circle-fill" style={{ color: 'slateblue', fontSize: "1.4rem" }}></i></div>
                      <span>RBI Date</span>
                    </div>
                    <div className="p-1">
                      <div style={{fontSize: "2rem"}} ><i className="pi pi-star-fill" style={{ color: 'slateblue', fontSize: "1.4rem" }}></i></div>
                      <span>Plan Date</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }

        <div className="col-6 sm:col-12 md:col-12 lg:col-12 xl:col-6">
          <div className="card mb-0">
            <div className="flex flex-column w-full justify-content-center align-items-center">
              <div>Shell Curva RBI date VS Plan date</div>

              <LineChart
                {...chartProps}
                series={[
                  { data: shellRiskTarget, label: 'Risk Target', curve: "linear", color: "#ff7f0e", id: "RiskTarget" },
                  { data: shellRangeDate, label: 'Range Date', curve: "linear", color: "yellow", id: "PlanDate" },
                  { data: [], label: 'RBI date', color: "green", id: "RbiDate" },
                  { data: [10], label: 'PlanDate', color: "blue", id: "RiskTarget2" },
                ]}
                xAxis={[{ data: shellXAxis, tickMinStep: 5 }]}
              />
            </div>
          </div>
        </div>

        <div className="col-6 sm:col-12 md:col-12 lg:col-12 xl:col-6">
          <div className="card mb-0">
            <div className="flex flex-column w-full justify-content-center align-items-center">
              <div>Head Curva RBI date VS Plan date</div>

              <LineChart
                {...chartProps}
                series={[
                  { data: headRiskTarget, label: 'Risk Target', curve: "linear", color: "#ff7f0e", id: "RiskTarget" },
                  { data: headRangeDate, label: 'Range Date', curve: "linear", color: "yellow", id: "PlanDate" },
                  { data: [], label: 'RBI date', color: "green", id: "RbiDate" },
                  { data: [10], label: 'PlanDate', color: "blue", id: "RiskTarget2" },
                ]}
                xAxis={[{ data: headXAxis, tickMinStep: 5 }]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RiskAnalysis;

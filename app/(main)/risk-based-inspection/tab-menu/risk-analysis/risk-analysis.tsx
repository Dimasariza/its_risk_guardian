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
import { calculateAlkaline as RBIcalculateAlkaline } from "@/function/calcRBIAlkalineValue";
import { calculateAlkaline as PlancalculateAlkaline } from "@/function/calcPlanAlkalineValue";
import { calculateCOF } from "@/function/calcCOFValue";
import IGeneralData from "@/types/IGeneralData";
import { CofService } from "@/service/calculation/cofService";
import { representativeFluidNodes } from "../../../uikit/table/cof/cof PV/representativeFluidDialog";
import { detection, isolation } from "../../../uikit/table/cof/cof PV/detectionAndIsolation";
import { flamableTable } from "../../../uikit/table/cof/cof PV/flamableDialog";
import { damageTable } from "../../../uikit/table/cof/cof PV/damageDialog";
import { liquidPhase } from "../../../uikit/table/cof/cof PV/phaseOfFluidDialog";
import { liquidInventories } from "../../../uikit/table/cof/cof PV/liquidInventoriesDialog";
import { adjMitigation } from "../../../uikit/table/cof/cof PV/adjustmentToFlamable";
import { gffTableValue } from "@/public/tableBasedOnAPI/gffTableValue";
import { riskMatrix } from "./riskMatrix";
import { getValue } from "@/service/calculation/pofRBIDate-service";
import { getPOFPRDPlan, getPOFPRDRBI } from "@/service/calculation/pofPRDService";
import { calcPRDPOFPlan } from "@/function/calcPRDPOFPlan";
import { getPOLPRDPlan, getPOLPRDRBI } from "@/service/calculation/polPRDService";
import { calcPRDPOFRBI } from "@/function/calcPRDPOFRBI";
import { severity } from "../pof prd/rbi/dialog/serviceSeverity";
import { adjFactorEnvirontment } from "../pof prd/rbi/dialog/adjusmentFactor";
import { effectivenessPofRBI } from "../pof prd/rbi/dialog/inspectionEffectiveness";
import { confidenceFactors } from "../pof prd/rbi/dialog/inspectionConfidenceFactor";
import { eventFreq } from "../pof prd/rbi/dialog/initiatingEventFrequencies";
import { protectedEquipment } from "../pof prd/rbi/dialog/classProtected";
import { effectivenessPofPlan } from "../pof prd/plan/dialog/inspectionEffectiveness";
import { adjusmentFactor as adjFactorPOLRBI } from "../pol prd/rbi/polRBIDatePRD";
import { adjusmentFactor as adjFactorPOLPLan} from "../pol prd/plan/polPlanDatePRD";
import { adjusmentFactor as adjFactorPOFRBI} from "../pof prd/plan/pofPlanDatePRD";
import { adjusmentFactor as adjFactorPOFPLan} from "../pof prd/plan/pofPlanDatePRD";
import { motion } from "framer-motion";
import { calcCOFTank } from "@/function/calcCOFTank";

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

function RiskAnalysis() {
  const riskPlotting = (probabilityRange: number, consequenceRange: number, df = true /* if false calculate based on probabilty catogery*/) => {
    const probability = [
      {
        category: 1,
        range: probabilityRange <= (df ? 1 : 3.06E-05),
      },
      {
        category: 2,
        range: (df ? 1 : 3.06E-05) < probabilityRange && probabilityRange <= (df ? 10 : 3.06E-04),
      },
      {
        category: 3,
        range: (df ? 10 : 3.06E-04) < probabilityRange && probabilityRange <= (df ? 100 : 3.06E-03),
      },
      {
        category: 4,
        range: (df ? 100 : 3.06E-03) < probabilityRange && probabilityRange <= (df ? 1000 : 3.06E-02),
      },
      {
        category: 5,
        range: probabilityRange > (df ? 1000 : 3.06E-05),
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
  const [pofRBIPRD, setPofRBIPRD] = useState({})
  const [pofPlanPRD, setPofPlanPRD] = useState({})
  const [polRBIPRD, setPolRBIPRD] = useState({})
  const [polPlanPRD, setPolPlanPRD] = useState({})
  const data = useSelector((state: any) => state.Reducer);
  const componentId = data.menu?.comp_id

  useEffect(() => {
    if(!componentId) return;

    if(["Pressure Vessel", "Tank"].includes(componentType))
    Promise.all([
      GeneralDataService.fetchData(componentId),
      getRBIThinning(componentId),
      getRBIExternalCorrosion(componentId),
      getRBIAlkaline(componentId),
      getPlanThinning(componentId),
      getPlanExternalCorrosion(componentId),
      getPlanAlkaline(componentId),
      CofService.fetchData(componentId),
      getValue(componentId),
    ])
    .then(([
      generalData,
      rbiThinning,
      rbiExCor,
      rbiAlkaline,
      planThinning,
      planExCor,
      planAlkaline,
      cofValue,
      pofValue
    ]) => {
      setGeneralData(generalData)
      setRBIThinning(rbiThinning)
      setRBIExCor(rbiExCor)
      setRBIAlkaline(rbiAlkaline);
      setPlanThinning(planThinning)
      setPlanExCor(planExCor)
      setPlanAlkaline(planAlkaline);

      setCofValue({
          ...cofValue,
          fluidSelected: representativeFluidNodes.find((i: any) => i.id == cofValue.cof_representativeFluid),
          detectionSystem: detection.find((i: any) => i.id == cofValue.cof_detectionSystem),
          isolationSystem: isolation.find((i: any) => i.id == cofValue.cof_isolationSystem),
          flamable: flamableTable.find((i: any) => i.id == cofValue.cof_flamableCons),
          damage: damageTable.find((i: any) => i.id == cofValue.cof_damageCons),
          phase: liquidPhase.find((i: any) => i.id == cofValue.cof_phaseOfFluid),
          inventories: liquidInventories.find((i: any) => i.id == cofValue.cof_liquidInventories),
          mitigation: adjMitigation.find((i: any) => i.id == cofValue.cof_adjToFlamable),
          amoniaChloride: {}
      })  
      
      const failureData = pofValue.rbiValue_failureFrequency
      const failureFreq = gffTableValue.find(i => i.id == failureData)
      setCofValue((prev: any) => ({...pofValue ,...prev, failureFreq}))
    })

    else if (["Pressure Relief Device"].includes(componentType))
    Promise.all([
      GeneralDataService.fetchData(componentId),
      getPOFPRDRBI(componentId),
      getPOFPRDPlan(componentId),
      getPOLPRDRBI(componentId),
      getPOLPRDPlan(componentId),
      CofService.fetchData(componentId),
    ])
    .then(([
      generalData,
      PRDPofRbi,
      PRDPofPlan,
      polRBIValue,
      polPlanValue,
      cofValue
    ]) => {
      setGeneralData(generalData)

      setPofRBIPRD({
        ...PRDPofRbi,
        rbi_rbiDate: new Date(PRDPofRbi.rbi_rbiDate),
        severity: severity.find((i) => i.id == PRDPofRbi.rbi_serviceSeverity),
        adjFactor: adjFactorPOFRBI.find((i) => i.id == PRDPofRbi.rbi_adjusmentFactor),
        weibullParameter: adjFactorEnvirontment.find((i) => i.id == PRDPofRbi.rbi_envAdjusmentFactor),
        inspEffectiveness: effectivenessPofRBI.find((i) => i.id == PRDPofRbi.rbi_inspEffectiveness),
        confidence: confidenceFactors.find((i) => i.id == PRDPofRbi.rbi_confidenceFactor),
        eventFire: eventFreq.find((i) => i.id == PRDPofRbi.rbi_eventFreqFire),
        eventOverFilling: eventFreq.find((i) => i.id == PRDPofRbi.rbi_eventFreqOverFilling),
        protected: protectedEquipment.find((i) => i.id == PRDPofRbi.rbi_protectedEquipment),
      })

      setPolRBIPRD({
        ...polRBIValue,
        rbi_rbiDate: new Date(polRBIValue.rbi_rbiDate),
        severity: severity.find((i) => i.id == polRBIValue.rbi_serviceSeverity),
        adjFactor: adjFactorPOLRBI.find((i) => i.id == polRBIValue.rbi_adjusmentFactor),
        weibullParameter: adjFactorEnvirontment.find((i) => i.id == polRBIValue.rbi_envAdjusmentFactor),
        inspEffectiveness: effectivenessPofRBI.find((i) => i.id == polRBIValue.rbi_inspEffectiveness),
        confidence: confidenceFactors.find((i) => i.id == polRBIValue.rbi_confidenceFactor),
        eventFire: eventFreq.find((i) => i.id == polRBIValue.rbi_eventFreqFire),
        eventOverFilling: eventFreq.find((i) => i.id == polRBIValue.rbi_eventFreqOverFilling),
        protected: protectedEquipment.find((i) => i.id == polRBIValue.rbi_protectedEquipment),
      })

      setPofPlanPRD({
        ...PRDPofPlan,
        plan_planDate: new Date(PRDPofPlan.plan_planDate),
        severity: severity.find((i) => i.id == PRDPofPlan.plan_serviceSeverity),
        adjFactor: adjFactorPOFPLan.find((i) => i.id == PRDPofPlan.plan_adjusmentFactor),
        weibullParameter: adjFactorEnvirontment.find((i) => i.id == PRDPofPlan.plan_envAdjusmentFactor),
        inspEffectiveness: effectivenessPofPlan.find((i) => i.id == PRDPofPlan.plan_inspEffectiveness),
        confidence: confidenceFactors.find((i) => i.id == PRDPofPlan.plan_confidenceFactor),
        eventFire: eventFreq.find((i) => i.id == PRDPofPlan.plan_eventFreqFire),
        eventOverFilling: eventFreq.find((i) => i.id == PRDPofPlan.plan_eventFreqOverFilling),
        protected: protectedEquipment.find((i) => i.id == PRDPofPlan.plan_protectedEquipment),
      })

      setPolPlanPRD({
        ...polPlanValue,
        plan_planDate: new Date(polPlanValue.plan_planDate),
        severity: severity.find((i) => i.id == polPlanValue.plan_serviceSeverity),
        adjFactor: adjFactorPOLPLan.find((i) => i.id == polPlanValue.plan_adjusmentFactor),
        weibullParameter: adjFactorEnvirontment.find((i) => i.id == polPlanValue.plan_envAdjusmentFactor),
        inspEffectiveness: effectivenessPofPlan.find((i) => i.id == polPlanValue.plan_inspEffectiveness),
        confidence: confidenceFactors.find((i) => i.id == polPlanValue.plan_confidenceFactor),
        eventFire: eventFreq.find((i) => i.id == polPlanValue.plan_eventFreqFire),
        eventOverFilling: eventFreq.find((i) => i.id == polPlanValue.plan_eventFreqOverFilling),
        protected: protectedEquipment.find((i) => i.id == polPlanValue.plan_protectedEquipment),
      })

      const failureData = PRDPofRbi.rbi_failureFrequency
      const failureFreq = gffTableValue.find(i => i.id == failureData)

      setCofValue({
        ...cofValue,
        fluidSelected: representativeFluidNodes.find((i: any) => i.id == cofValue.cof_representativeFluid),
        detectionSystem: detection.find((i: any) => i.id == cofValue.cof_detectionSystem),
        isolationSystem: isolation.find((i: any) => i.id == cofValue.cof_isolationSystem),
        flamable: flamableTable.find((i: any) => i.id == cofValue.cof_flamableCons),
        damage: damageTable.find((i: any) => i.id == cofValue.cof_damageCons),
        phase: liquidPhase.find((i: any) => i.id == cofValue.cof_phaseOfFluid),
        inventories: liquidInventories.find((i: any) => i.id == cofValue.cof_liquidInventories),
        mitigation: adjMitigation.find((i: any) => i.id == cofValue.cof_adjToFlamable),
        amoniaChloride: {},
        failureFreq
      })  
    })
  }, [data]);

  const componentType = data.menu?.comp_componentType

  const {
    ageTimeInServiceTk: RBIAgeTimeInServiceTk,
    shellTotal: RBIShellTotal,
    headTotal: RBIHeadTotal
  } = RBIcalculateAlkaline({
    generalData,
    thinning: rbiThinning,
    exCor: rbiExCor,
    alkaline: rbiAlkaline,
    componentType
  })

  const {
    ageTimeInServiceTk: planAgeTimeInServiceTk,
    shellTotal: PlanShellTotal,
    headTotal: PlanHeadTotal
  } = PlancalculateAlkaline({
    generalData,
    thinning: planThinning,
    exCor: planExCor,
    alkaline: planAlkaline,
    componentType
  })

  const {
    pofFire: rbiPofFire,
    pofOverFilling: rbiPofOverFilling,
  } = calcPRDPOFRBI(generalData, pofRBIPRD)
  
  const {
    pofFire: planPofFire,
    pofOverFilling: planPofOverFilling,
    ageTimeInServiceTk: planAgeTimeInServicePRD
  } = calcPRDPOFPlan(generalData, pofPlanPRD)

  const {
    fSet: rbiFset,
    finalUpdateValue: rbiFinalUpdateValue,
  } = calcPRDPOFRBI(generalData, polRBIPRD, "pol")

  const {
    fSet: planFset,
    finalUpdateValue: planFinalUpdateValue
  } = calcPRDPOFPlan(generalData, polPlanPRD, "pol")

  const polRBIValue = rbiFset * rbiFinalUpdateValue
  const polPlanValue = planFset * planFinalUpdateValue
  
  const viewonlyForAll = ["Pressure Vessel"]

  console.log(cofValue)
  
  const RBIShellValue: any = () => {
    if(["Pressure Vessel"].includes(componentType)) return RBIShellTotal
    if(["Tank"].includes(componentType)) return cofValue.failureFreq?.total * RBIShellTotal * cofValue?.rbiValue_FMS 
    if(["Pressure Relief Device"].includes(componentType)) return rbiPofFire + rbiPofOverFilling + polRBIValue
  }  

  const PlanShellValue: any = () => {
    if(["Pressure Vessel"].includes(componentType)) return PlanShellTotal
    if(["Tank"].includes(componentType)) return cofValue.failureFreq?.total * PlanShellTotal * cofValue?.rbiValue_FMS 
    if(["Pressure Relief Device"].includes(componentType)) return planPofFire + planPofOverFilling + polPlanValue
  }  
  
  const RBIHeadValue = RBIHeadTotal
  const PlanHeadValue = PlanHeadTotal
  
  const {
    finalConsequenceM
  } = calculateCOF({
    generalData, 
    cofValue,
    componentType
  })

  const {
    finalConsequenceM: finalConsequenceMTank
  } = calcCOFTank({
    generalData,
    cofValue
  })

  const consequenceValue = componentType == "Tank" ? finalConsequenceMTank : finalConsequenceM

  const rbiHeadPlotting =  riskPlotting(RBIHeadValue, consequenceValue!, ["Pressure Vessel"].includes(componentType))
  const rbiShellPlotting =  riskPlotting(RBIShellValue(), consequenceValue!, ["Pressure Vessel"].includes(componentType))
  const planHeadPlotting =  riskPlotting(PlanHeadValue, consequenceValue!, ["Pressure Vessel"].includes(componentType))
  const planShellPlotting =  riskPlotting(PlanShellValue(), consequenceValue!, ["Pressure Vessel"].includes(componentType))

  const iconPlotting = (row: number, column: string, title: string, value: string) => {
    if(title == "Head Section Risk Diagram") {
      return [
        rbiHeadPlotting.consequence?.category == column 
        && rbiHeadPlotting.probability?.category == row
        && <i className="pi pi-circle-fill m-1" style={{ color: 'slateblue', fontSize: "1.4rem" }}></i>,
        
        planHeadPlotting.consequence?.category == column 
        && planHeadPlotting.probability?.category == row
        && <i className="pi pi-star-fill m-1" style={{ color: 'slateblue', fontSize: "1.4rem" }}></i>,

        value
      ]
    }
    else if(title == "Shell Section Risk Diagram") {
      return [
        rbiShellPlotting.consequence?.category == column 
        && rbiShellPlotting.probability?.category == row
        && <i className="pi pi-circle-fill m-1" style={{ color: 'slateblue', fontSize: "1.4rem" }}></i>,
        
        planShellPlotting.consequence?.category == column 
        && planShellPlotting.probability?.category == row
        && <i className="pi pi-star-fill m-1" style={{ color: 'slateblue', fontSize: "1.4rem" }}></i>,
        
        value
      ]
    }
  }

  const RBIShellRisk = componentType == "Tank" ? RBIShellValue() : Number(cofValue.failureFreq?.total * RBIShellValue() * cofValue.rbiValue_FMS)
  const PlanShellRisk = componentType == "Tank" ? PlanShellValue() : Number(cofValue.failureFreq?.total * PlanShellValue() * cofValue.rbiValue_FMS)

  const RBIHeadRisk = Number(cofValue.failureFreq?.total * RBIHeadValue * cofValue.rbiValue_FMS)
  const PlanHeadRisk = Number(cofValue.failureFreq?.total * PlanHeadValue * cofValue.rbiValue_FMS)

  const [value, setValue] = useState<any>({
    shellRangeDate: [0, 0], // change blue box relative to y axis in shell
    headRangeDate: [0, 0], // change green box relative to y axis in head
    shellRiskTarget: 3.71, // change orange line position in shell
    headRiskTarget: 3.71, // change orange line position in head
    shellXAxis: [10, 25], // change green box relative to x axis in shell 
    headXAxis: [10, 25] // change green box relative to x axis in head
  });

  const shellRBIY = !isNaN(Number(RBIShellRisk * consequenceValue!)) && Number(RBIShellRisk * consequenceValue!) 
  || Number(rbiFset * rbiFinalUpdateValue * consequenceValue!)
  || 0 
  const shellPlanY = !isNaN(Number(PlanShellRisk * consequenceValue!)) && Number(PlanShellRisk * consequenceValue!) 
  || Number(planFset * planFinalUpdateValue * consequenceValue!)
  || 0 

  const headRBIY = !isNaN(Number(RBIHeadRisk * consequenceValue!)) && Number(RBIHeadRisk * consequenceValue!) || 0 
  const headPlanY = !isNaN(Number(PlanHeadRisk * consequenceValue!)) && Number(PlanHeadRisk * consequenceValue!) || 0

  const shellRBIX = 0
  const shellPlanX = !isNaN(Number(planAgeTimeInServiceTk!)) && Number(planAgeTimeInServiceTk!) 
  || !isNaN(Number(planAgeTimeInServicePRD!)) && Number(planAgeTimeInServicePRD!) 
  || 0

  useEffect(()=>{
    setValue((prev: any) => ({
      ...prev,
      shellRangeDate: [shellPlanY, shellRBIY],
      headRangeDate: [headPlanY, headRBIY],
      shellXAxis: [shellPlanX, shellRBIX],
      headXAxis: [shellPlanX, shellRBIX]
    }))

  }, [cofValue])

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
          riskMatrix.map(({ title, data, viewonly }: any, matrixKey: number) => (
           (viewonly?.includes(componentType) || !viewonly) &&
            <div className="col-6 sm:col-12 md:col-12 lg:col-12 xl:col-6" key={matrixKey}>
              <div className="card mb-0">
                <div className="flex justify-content-center mb-3 mr-8">
                  <div style={{transform: "rotate(-90deg)", height: "1rem", position: "relative", top: "15rem", left: "2rem"}}>Probability</div>
                  <div>
                    <span className="flex text-500 font-medium mb-3 w-full justify-content-center ml-5">
                      { 
                        !viewonlyForAll?.includes(componentType) ? "Risk Diagram" : title
                      }
                    </span>
                    {
                      data.map((item: any, id_1: number) => (
                        <div className="flex justify-content-center" key={id_1}>
                          {
                            item.map(({ value, color, noBorder, row, column }: any, id_2: number) => (
                              <motion.div key={id_2} 
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                className={`flex align-items-center justify-content-center w-5rem h-5rem font-bold border-500 ${noBorder ? "border-0" : "border-1"} ${color}`} 
                                style={{ fontSize: `${noBorder ? "1.4rem" : "3rem"}` }}
                              >
                                { 
                                  iconPlotting(row, column, title, value)
                                }
                              </motion.div>
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
              <div> {!viewonlyForAll?.includes(componentType) ? "" : "Shell"} Curva RBI date VS Plan date</div>

              <LineChart
                {...chartProps}
                series={[
                  { data: shellRiskTarget, label: 'Risk Target', curve: "linear", color: "#ff7f0e", id: "RiskTarget" },
                  { data: shellRangeDate, label: 'Range Date', curve: "linear", color: "yellow", id: "PlanDate" },
                  { data: [], label: 'RBI date', color: "green", id: "RbiDate" },
                  { data: [10], label: 'PlanDate', color: "cyan", id: "RiskTarget2" },
                ]}
                xAxis={[{ data: shellXAxis, tickMinStep: 5 }]}
              />
            </div>
          </div>
        </div>

        {
          viewonlyForAll?.includes(componentType) &&
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
                    { data: [10], label: 'PlanDate', color: "cyan", id: "RiskTarget2" },
                  ]}
                  xAxis={[{ data: headXAxis, tickMinStep: 5 }]}
                />
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  );
}

export default RiskAnalysis;

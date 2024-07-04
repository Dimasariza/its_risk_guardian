/* eslint-disable */

'use client';

import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import RepresentativeFluidDialog from "./representativeFluidDialog";
import InputValueOnly from "@/fragments/inputValueOnly";
import { GeneralDataService } from "@/service/calculation/generalData-service";
import { useSelector } from "react-redux";
import PhaseOfFluid from "./phaseOfFluid";
import GenericFailureFrequency from "./genericFailureFreq";
import LiquidInventories from "./liquidInventories";
import DetectionAndIsolation from "./DetectionAndIsolationTable";

function COF() {
  const [fluidSelected, setFluidSelected] = useState<any>({});
  const [visible, setVisible] = useState<any>({
    representative: false,
    phase: false,
    generic: false,
    inventories: false,
    detection: false,
    flamableConsequence: false
  });
  const [generalData, setGeneralData] = useState<any>({});
  const data = useSelector((state: any) => state.Reducer);

  useEffect(() => {
    if(data.menu?.comp_id)
    GeneralDataService.fetchData(data.menu?.comp_id)
    .then((res: any) => {
      setGeneralData(res)
    })
  }, []);

  const getIdealGasHeatRatio = () => {
    if(!generalData.gData_operatingTemperature) return "-"

    const gData_operatingTempOnF = (generalData?.gData_operatingTemperature * 9 / 5) + 32
    const gData_operatingTempOnK = (gData_operatingTempOnF - 32) * 5 / 9 + 273.15

    const { constant_a = null, constant_b = null, constant_c = null , constant_d = null } = fluidSelected;
    const kRatio = constant_a + (constant_b * gData_operatingTempOnK) + ((constant_c * gData_operatingTempOnK) ** 2) + ((constant_d * gData_operatingTempOnK) ** 3) 
    
    const constantR = 8.314
    return (kRatio / (kRatio - constantR)).toFixed(4)
  }

  return (
    <section className="p-4">
      <RepresentativeFluidDialog visible={visible.representative} setVisible={setVisible} />
      <PhaseOfFluid visible={visible.phase} setVisible={setVisible} />
      <GenericFailureFrequency visible={visible.generic} setVisible={setVisible}/>
      <LiquidInventories visible={visible.inventories} setVisible={setVisible} />
      <DetectionAndIsolation visible={visible.detection} setVisible={setVisible} />

      <div className="flex">
        <div className="flex flex-column gap-2">
          <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
            <label htmlFor="">Representative Fluid</label>
            <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible((prev: any) => ({...prev, representative: true}))} />
          </div>
          <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
            <label htmlFor="">Phase of Fluid</label>
            <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible((prev: any) => ({...prev, phase: true}))} />
          </div>
          <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
            <label htmlFor="">Generic Failure Frequency</label>
            <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible((prev: any) => ({...prev, generic: true}))} />
          </div>
          <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
            <label htmlFor="">Liquid Inventories</label>
            <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible((prev: any) => ({...prev, inventories: true}))} />
          </div>
          <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
            <label htmlFor="">Detection and Isolation System</label>
            <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible((prev: any) => ({...prev, detection: true}))} />
          </div>
          <div className="flex align-items-center justify-content-between" style={{width: "30rem"}}>
            <label htmlFor="">Component Damage Flammable Consequence Equation Constants</label>
            <Button label="Show Table" size="small" className="mx-3" onClick={() => setVisible((prev: any) => ({...prev, detection: true}))} />
          </div>
        </div>

        <div className="flex flex-column">
          {
            [
              {
                label: "AIT (°C)",
                value: fluidSelected.ait || "-"
              },
              {
                label: "AIT (°F)",
                value: (fluidSelected.ait * 1.8 + 32).toFixed(3) || "-"
              },
              {
                label: "AIT (K)",
                value: fluidSelected.ait + 273 || "-"
              },
              {
                label: "AIT (°R)",
                value: fluidSelected.ait * 4 / 5 || "-"
              },
              {
                label: "Ideal Gas Spesific Heat Ratio",
                value:  getIdealGasHeatRatio()
              }
            ].map((p: any, key) => <InputValueOnly {...p} key={key}/>)
          }
        </div>
      </div>

    </section>
  );
}

export default COF;

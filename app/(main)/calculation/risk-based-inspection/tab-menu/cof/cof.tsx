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
import FlamableDialog from "./flamableDialog";
import DamageDialog from "./damageDialog";

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
      <div className="flex gap-5">
        <div className="flex flex-column gap-2">
          <RepresentativeFluidDialog />
          <PhaseOfFluid />
          <GenericFailureFrequency />
          <LiquidInventories />
          <DetectionAndIsolation />
          <FlamableDialog />
          <DamageDialog />
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

/* eslint-disable */

'use client';

import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";

import { GeneralDataService } from "@/service/calculation/generalData-service";
import { useSelector } from "react-redux";

import { calculateCOF } from "@/function/calcCOFValue";
import { Toast } from "primereact/toast";
import COFPV from "./cofPV";


function COF() {
  const toast = useRef<any>(null);
  const data = useSelector((state: any) => state.Reducer);
  
  return (
    <section className="grid m-2">
      <Toast ref={toast}  position="bottom-right" />
      {/* {
        data.menu.comp_componentType == "Pressure Vessel" && <COFPV toast={toast}/>
      } */}
      <COFPV />
    </section>
  );
}

export default COF;

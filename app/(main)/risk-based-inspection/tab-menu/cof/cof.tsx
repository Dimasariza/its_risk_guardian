/* eslint-disable */

'use client';

import { useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import COFPV from "./cofPV";
import COFTank from "./cofTank";
import { useRef } from "react";

function COF() {
  const toast = useRef<any>(null);
  const data = useSelector((state: any) => state.Reducer);
  
  return (
    <section className="grid m-2">
      <Toast ref={toast}  position="bottom-right" />
      {
        data.menu.comp_componentType != "Tank" ? <COFPV toast={toast}/> : <COFTank toast={toast} />
      }
    </section>
  );
}

export default COF;

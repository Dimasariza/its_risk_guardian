'use client';

import { axisClasses, ChartsLegend, LineChart, lineElementClasses } from "@mui/x-charts";
import { useState } from "react";

const riskMatrix: any = [
  {
    title: 'Shell Section',
    data: [
      [
        { value: 5, noBorder: true },
        { value: "", color: 'bg-yellow-500' },
        { value: "", color: 'bg-orange-500' },
        { value: "", color: 'bg-orange-500' },
        { value: "", color: 'bg-red-600' },
        { value: "", color: 'bg-red-600' },
      ],
      [
        { value: 4, noBorder: true },
        { value: "", color: 'bg-yellow-500' },
        { value: "", color: 'bg-yellow-500' },
        { value: "৹", color: 'bg-orange-500' },
        { value: "", color: 'bg-orange-500' },
        { value: "", color: 'bg-red-600' },
      ],
      [
        { value: 3, noBorder: true },
        { value: "", color: 'bg-green-400' },
        { value: "", color: 'bg-yellow-500' },
        { value: "•", color: 'bg-yellow-500' },
        { value: "", color: 'bg-orange-500' },
        { value: "", color: 'bg-orange-500' },
      ],
      [
        { value: 2, noBorder: true },
        { value: "", color: 'bg-green-400' },
        { value: "", color: 'bg-green-400' },
        { value: "", color: 'bg-yellow-500' },
        { value: "", color: 'bg-yellow-500' },
        { value: "", color: 'bg-orange-500' },
      ],
      [
        { value: 1, noBorder: true },
        { value: "", color: 'bg-green-400' },
        { value: "", color: 'bg-green-400' },
        { value: "", color: 'bg-green-400' },
        { value: "", color: 'bg-yellow-500' },
        { value: "", color: 'bg-yellow-500' },
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
        { value: 5, noBorder: true },
        { value: "•", color: 'bg-yellow-500' },
        { value: "৹", color: 'bg-orange-500' },
        { value: "", color: 'bg-orange-500' },
        { value: "", color: 'bg-red-600' },
        { value: "", color: 'bg-red-600' },
      ],
      [
        { value: 4, noBorder: true },
        { value: "", color: 'bg-yellow-500' },
        { value: "", color: 'bg-yellow-500' },
        { value: "", color: 'bg-orange-500' },
        { value: "", color: 'bg-orange-500' },
        { value: "", color: 'bg-red-600' },
      ],
      [
        { value: 3, noBorder: true },
        { value: "", color: 'bg-green-400' },
        { value: "", color: 'bg-yellow-500' },
        { value: "", color: 'bg-yellow-500' },
        { value: "", color: 'bg-orange-500' },
        { value: "", color: 'bg-orange-500' },
      ],
      [
        { value: 2, noBorder: true },
        { value: "", color: 'bg-green-400' },
        { value: "", color: 'bg-green-400' },
        { value: "", color: 'bg-yellow-500' },
        { value: "", color: 'bg-yellow-500' },
        { value: "", color: 'bg-orange-500' },
      ],
      [
        { value: 1, noBorder: true },
        { value: "", color: 'bg-green-400' },
        { value: "", color: 'bg-green-400' },
        { value: "", color: 'bg-green-400' },
        { value: "", color: 'bg-yellow-500' },
        { value: "", color: 'bg-yellow-500' },
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

function RiskAnalysis() {
  const [value, setValue] = useState<any>({
    shellRangeDate: [3, 7],
    headRangeDate: [2, 5],
    shellRiskTarget: 5.71,
    headRiskTarget: 4.71,
    shellXAxis: [3, 12],
    headXAxis: [2, 16]
  });

  const shellRangeDate = [null, ...value.shellRangeDate];
  const headRangeDate = [null, ...value.headRangeDate];
  const shellXAxis = [0, ...value.shellXAxis, 25];
  const headXAxis = [0, ...value.headXAxis, 25];
  const shellRiskTarget = shellXAxis.map(_ => value.shellRiskTarget); 		
  const headRiskTarget = headXAxis.map(_ => value.headRiskTarget); 		

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
                            item.map(({ value, color, noBorder }: any, id_2: number) => (
                              <div key={id_2} 
                                className={`flex align-items-center justify-content-center w-5rem h-5rem font-bold border-500 ${noBorder ? "border-0" : "border-1"} ${color}`} 
                                style={{ fontSize: `${noBorder ? "1.4rem" : "3rem"}` }}
                              >
                                {value}
                              </div>
                            ))
                          }
                        </div>
                      ))
                    }
                    <div className="flex justify-content-center ml-8">Consequence</div>
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

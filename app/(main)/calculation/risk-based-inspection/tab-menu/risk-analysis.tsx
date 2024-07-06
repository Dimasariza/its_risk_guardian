'use client';

import { axisClasses, LineChart } from "@mui/x-charts";

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

const planDate = [4000, 3000, 2000, 2780, 1890, 2390];
const RBIDate = [2400, 1398, 9800, 3908, 4800, 3800];
const riskTarget = [1400, 1198, 800, 908, 2800, 1800];
const xLabels = [
  '0',
  '5',
  '10',
  '15',
  '20',
  '25',
];

function RiskAnalysis() {
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
                sx={(theme) => ({
                  [`.MuiBarElement-series-l_id`]: {
                    stroke: '#006BD6',
                  },
                  [`.MuiBarElement-series-r_id`]: {
                    stroke: '#EC407A',
                  },
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
                  backgroundSize: '35px 35px',
                  backgroundPosition: '20px 20px, 20px 20px',
                })}
                width={600}
                height={400}
                series={[
                  { data: RBIDate, label: 'RBI Date', curve: "linear", color: "#1f77b4", },
                  { data: planDate, label: 'PlanDate', curve: "linear", color: "#7f7f7f", },
                  { data: riskTarget, label: 'PlanDate', curve: "linear", color: "#ff7f0e", },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
              />
            </div>
          </div>
        </div>

        <div className="col-6 sm:col-12 md:col-12 lg:col-12 xl:col-6">
          <div className="card mb-0">
            <div className="flex flex-column w-full justify-content-center align-items-center">
              <div>Shell Curva RBI date VS Plan date</div>

              <LineChart
                sx={(theme) => ({
                  [`.MuiBarElement-series-l_id`]: {
                    stroke: '#006BD6',
                  },
                  [`.MuiBarElement-series-r_id`]: {
                    stroke: '#EC407A',
                  },
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
                  backgroundSize: '35px 35px',
                  backgroundPosition: '20px 20px, 20px 20px',
                })}
                width={600}
                height={400}
                series={[
                  { data: RBIDate, label: 'RBI Date', curve: "linear", color: "#1f77b4", },
                  { data: planDate, label: 'PlanDate', curve: "linear", color: "#7f7f7f", },
                  { data: riskTarget, label: 'PlanDate', curve: "linear", color: "#ff7f0e", },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RiskAnalysis;

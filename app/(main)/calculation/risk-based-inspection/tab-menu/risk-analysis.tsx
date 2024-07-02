'use client';

const riskMatrix: any = [
  {
    title: 'Shell Section',
    data: [
      [
        { value: 5, noBorder: true },
        { value: "", color: 'yellow' },
        { value: "", color: 'orange' },
        { value: "", color: 'orange' },
        { value: "", color: 'red' },
        { value: "", color: 'red' },
      ],
      [
        { value: 4, noBorder: true },
        { value: "", color: 'yellow' },
        { value: "", color: 'yellow' },
        { value: "৹", color: 'orange' },
        { value: "", color: 'orange' },
        { value: "", color: 'red' },
      ],
      [
        { value: 3, noBorder: true },
        { value: "", color: 'yellowgreen' },
        { value: "", color: 'yellow' },
        { value: "•", color: 'yellow' },
        { value: "", color: 'orange' },
        { value: "", color: 'orange' },
      ],
      [
        { value: 2, noBorder: true },
        { value: "", color: 'yellowgreen' },
        { value: "", color: 'yellowgreen' },
        { value: "", color: 'yellow' },
        { value: "", color: 'yellow' },
        { value: "", color: 'orange' },
      ],
      [
        { value: 1, noBorder: true },
        { value: "", color: 'yellowgreen' },
        { value: "", color: 'yellowgreen' },
        { value: "", color: 'yellowgreen' },
        { value: "", color: 'yellow' },
        { value: "", color: 'yellow' },
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
        { value: "•", color: 'yellow' },
        { value: "৹", color: 'orange' },
        { value: "", color: 'orange' },
        { value: "", color: 'red' },
        { value: "", color: 'red' },
      ],
      [
        { value: 4, noBorder: true },
        { value: "", color: 'yellow' },
        { value: "", color: 'yellow' },
        { value: "", color: 'orange' },
        { value: "", color: 'orange' },
        { value: "", color: 'red' },
      ],
      [
        { value: 3, noBorder: true },
        { value: "", color: 'yellowgreen' },
        { value: "", color: 'yellow' },
        { value: "", color: 'yellow' },
        { value: "", color: 'orange' },
        { value: "", color: 'orange' },
      ],
      [
        { value: 2, noBorder: true },
        { value: "", color: 'yellowgreen' },
        { value: "", color: 'yellowgreen' },
        { value: "", color: 'yellow' },
        { value: "", color: 'yellow' },
        { value: "", color: 'orange' },
      ],
      [
        { value: 1, noBorder: true },
        { value: "", color: 'yellowgreen' },
        { value: "", color: 'yellowgreen' },
        { value: "", color: 'yellowgreen' },
        { value: "", color: 'yellow' },
        { value: "", color: 'yellow' },
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

function RiskAnalysis() {
  return (
    <>
      <section className="p-4">
      <div className="grid">
        {riskMatrix.map(({ title, data }: any, matrixKey: number) => (
          <div className="col-6 sm:col-12 lg:col-12 xl:col-6" key={matrixKey}>
            <div className="card mb-0">
              <div className="flex justify-content-center mb-3 mr-8">
                <div style={{transform: "rotate(-90deg)", height: "1rem", position: "relative", top: "15rem", left: "2rem"}}>Probability</div>
                <div>
                  <span className="flex text-500 font-medium mb-3 w-full justify-content-center ml-5">{title}</span>
                  {
                  data.map((item: any, id_1: number) => (
                    <div className="flex justify-content-center" key={id_1}>
                      {item.map(({ value, color, noBorder }: any, id_2: number) => (
                        <div key={id_2} 
                          className={`flex align-items-center justify-content-center w-5rem h-5rem font-bold border-500 ${noBorder ? "border-0" : "border-1"}`} 
                          style={{ background: color, fontSize: `${noBorder ? "1.4rem" : "3rem"}` }}
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  ))
                  }
                  <div className="flex justify-content-center ml-8">Consequence</div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </section>
    </>
  );
}

export default RiskAnalysis;

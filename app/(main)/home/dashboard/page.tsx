/* eslint-disable @next/next/no-img-element */
'use client';

import { Column } from 'primereact/column';
import React, { useEffect, useState } from 'react';
import { TreeTable, TreeTableSelectionKeysType } from 'primereact/treetable';
import { TreeNode } from 'primereact/treenode';

const companiesData = 
[  
    {
        "key": "0",
        "data":{  
            "name":"Company A",
            "size":"Pressure Relieve Device",
            "risk":"High"
        },
    },
    {  
        "key": "1",
        "data":{  
            "name":"Company B",
            "size":"Tank",
            "risk":"Medium"
        },
    },
    {  
        "key": "2",
        "data": {  
            "name":"Company C",
            "size":"Pipe",
            "risk":"Low"
        },
    },
    {  
        "key": "3",
        "data":{  
            "name":"Company D",
            "size":"Pressure Vessel",
            "risk":"Low"
        },
    },
    {  
        "key": "4",
        "data": {  
            "name":"Company E",
            "size":"Pipe",
            "risk":"High"
        },
    },
]

const riskMatrix: any = 
[
    { 
        title: "Component Before Inspection Risk Matrix",
        data: 
        [
            [
                { value: 1, color: 'orange' },
                { value: 2, color: 'orange' },
                { value: 3, color: 'orange' },
                { value: 4, color: 'red' },
                { value: 5, color: 'red' },
            ],
            [
                { value: 6, color: 'yellow' },
                { value: 7, color: 'yellow' },
                { value: 8, color: 'orange' },
                { value: 9, color: 'orange' },
                { value: 10, color: 'red' },
            ],
            [
                { value: 11, color: 'yellowgreen' },
                { value: 12, color: 'yellowgreen' },
                { value: 13, color: 'yellow' },
                { value: 14, color: 'orange' },
                { value: 15, color: 'red' },
            ],
            [
                { value: 16, color: 'yellowgreen' },
                { value: 17, color: 'yellowgreen' },
                { value: 18, color: 'yellow' },
                { value: 19, color: 'yellow' },
                { value: 20, color: 'orange' },
            ],
            [
                { value: 21, color: 'yellowgreen' },
                { value: 22, color: 'yellowgreen' },
                { value: 23, color: 'yellow' },
                { value: 24, color: 'yellow' },
                { value: 25, color: 'orange' },
            ],
        ]
    },
    { 
        title: "Component After Inspection Risk Matrix",
        data: 
        [
            [
                { value: 1, color: 'orange' },
                { value: 2, color: 'orange' },
                { value: 3, color: 'orange' },
                { value: 4, color: 'red' },
                { value: 5, color: 'red' },
            ],
            [
                { value: 6, color: 'yellow' },
                { value: 7, color: 'yellow' },
                { value: 8, color: 'orange' },
                { value: 9, color: 'orange' },
                { value: 10, color: 'red' },
            ],
            [
                { value: 11, color: 'yellowgreen' },
                { value: 12, color: 'yellowgreen' },
                { value: 13, color: 'yellow' },
                { value: 14, color: 'orange' },
                { value: 15, color: 'red' },
            ],
            [
                { value: 16, color: 'yellowgreen' },
                { value: 17, color: 'yellowgreen' },
                { value: 18, color: 'yellow' },
                { value: 19, color: 'yellow' },
                { value: 20, color: 'orange' },
            ],
            [
                { value: 21, color: 'yellowgreen' },
                { value: 22, color: 'yellowgreen' },
                { value: 23, color: 'yellow' },
                { value: 24, color: 'yellow' },
                { value: 25, color: 'orange' },
            ],
        ]
    }
]

const cardInformation = [
    { title: "companies", value: 152, icon: <i className="pi pi-shopping-cart text-blue-500 text-xl" />},
    { title: "Units", value: 2100, icon: <i className="pi pi-map-marker text-orange-500 text-xl" />},
    { title: "Systems", value: 28411, icon: <i className="pi pi-inbox text-cyan-500 text-xl" />},
    { title: "Equipment", value: 152, icon: <i className="pi pi-comment text-purple-500 text-xl" />},
    { title: "Component", value: 15, icon: <i className="pi pi-comment text-purple-500 text-xl" />},
]

const Dashboard = () => {
    const [files2, setFiles2] = useState<TreeNode[]>([]);
    const [selectedFileKeys2, setSelectedFileKeys2] = useState<TreeTableSelectionKeysType | null>(null);
    
    useEffect(() => {
        setFiles2(companiesData)
    }, []);

    return (
        <>
        <div className="grid">
            {
                cardInformation.map(({title, value, icon}: any, cardKey:number) => (
                    <div className="col-12 lg:col-6 xl:col-3" key={cardKey}>
                        <div className="card mb-0">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">{title}</span>
                                    <div className="text-900 font-medium text-xl">{value}</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    {icon}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>

        <div className="grid">
            {
                riskMatrix.map(({title, data} :any, matrixKey: number) => (
                    <div className="col-6 sm:col-12 lg:col-12 xl:col-6" key={matrixKey}>
                        <div className="card mb-0">
                            <div className="flex justify-content-between mb-3">
                                <div className="w-full">
                                    <span className="flex text-500 font-medium mb-3 w-full justify-content-center">{title}</span>
                                    {   
                                        data.map((item:any, id_1:number) => (
                                            <div className="flex justify-content-center" key={id_1}>
                                                {
                                                    item.map(({value, color}: any, id_2:number) => (
                                                        <div key={id_2} className="flex align-items-center justify-content-center w-5rem h-5rem font-bold border-1 border-600" style={{ background : color }}>{value}</div>
                                                    ))
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>

        <div className="col-12">
            <div className="card">
                <h5>Summary</h5>

                {/* <TreeTable value={files2} selectionMode="checkbox" selectionKeys={selectedFileKeys2} onSelectionChange={(e) => setSelectedFileKeys2(e.value)}>
                    <Column field="name" header="Number" expander />
                    <Column field="size" header="Components" />
                    <Column field="risk" header="Risk" />
                </TreeTable> */}
            </div>
        </div>
    </>
    );
};

export default Dashboard;

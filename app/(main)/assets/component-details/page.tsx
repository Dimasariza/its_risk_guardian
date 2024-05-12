'use client';
import React, { useRef, useState } from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import { Card } from 'primereact/card';
import { TabMenu } from 'primereact/tabmenu';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from 'primereact/button';


const ComponentDetails = () => {
    const items = [     
        {
            label: 'Pertamina Jakarta',
            items: [
                {
                    label: 'MV Nusantara 01',
                    items: [
                        {
                            label: 'Electric',
                            items: [
                                {
                                    label: 'MSB',
                                },
                                {
                                    label: 'Local Panel',
                                }
                            ]
                        },
                        {
                            label: 'Machinery',
                            items: [
                                {
                                    label: 'Pressure Relieve Device',
                                },
                                {
                                    label: 'Pressure Vessel',
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'MV Nusantara 02',
                    items: [
                        {
                            label: 'Logos',
                        }
                    ]
                }
            ]
        },
        {
            label: 'SPIL Surabaya',
            items: [
                {
                    label: 'Unit 01',
                },
                {
                    label: 'Unit 02',
                },
                {
                    label: 'Unit 03',
                }
            ]
        },
        {
            label: 'Meratus Surabaya',
            items: [
                {
                    label: 'Meratus Kelimutu',
                },
                {
                    label: 'Meratus Borneo',
                },
                {
                    label: 'Meratus Line',
                }
            ]
        }
    ];

    const toast = useRef<any>(null);
    const tabItems = [
        {
            label: 'Design / Installation',
            command: () => {
                setTabMenu("design")
                // toast.current.show({ severity: 'success', summary: 'Selected', detail: 'Dashboard', life: 3000 });
            }
        },
        {
            label: 'Operating & Proccess',
            command: () => {
                setTabMenu("operating")
                // toast.current.show({ severity: 'success', summary: 'Selected', detail: 'Transactions', life: 3000 });
            }
        },
        {
            label: 'Inspection',
            command: () => {
                setTabMenu("inspection")
                // toast.current.show({ severity: 'success', summary: 'Selected', detail: 'Products', life: 3000 });
            }
        },
    ];

    const [textareaValue, setTextareaValue] = useState('');

    const [tabMenu, setTabMenu] = useState('design')
    const tabMenuTemplate = () => {
        if(tabMenu == "design")
        return (
            <>
                <div className="flex flex-column gap-2">
                    <label htmlFor="username">Tag Number</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    {/* <small id="username-help">
                        Enter your username to reset your password.
                    </small> */}
                    <label htmlFor="username">Design Pressure</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Design Temperature</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Description</label>
                    <InputTextarea value={textareaValue} onChange={(e) => setTextareaValue(e.target.value)} rows={5} cols={30} />
                    <label htmlFor="username">PFD</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">P&Id</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Installation Date</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Join Efficiency</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Type of Equipment</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Yield Strength</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Tensil Strength</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Allowable Stress</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Min Design Metal Temp</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Material Construction</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Outside Diameter</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Inside Diameter</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Insulation</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                </div>
                <div className='flex w-full justify-content-center'>
                    <Button label="Save Data" raised severity="success" className='my-2'/>
                </div>
            </>
        )
        else if(tabMenu == "operating")
        return (
            <>
                <div className="flex flex-column gap-2">
                    <label htmlFor="username">Operating Temperature</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Operating Pressure</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Fluid</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Liquid Phase</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Inspection History</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Flow Velocity</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Fluid Name</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Fluid Description</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Operational Fluid Phase</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                </div>
                <div className='flex w-full justify-content-center'>
                    <Button label="Save Data" raised severity="success" className='my-2'/>
                </div>
            </>
        )
        else if(tabMenu == "inspection")
        return (
            <>
                <div className="flex flex-column gap-2">
                    <label htmlFor="username">No Inspection</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                    <label htmlFor="username">Inspection History</label>
                    <InputText id="username" aria-describedby="username-help" className="p-inputtext-sm" />
                </div>
                <div className='flex w-full justify-content-center'>
                    <Button label="Save Data" raised severity="success" className='my-2'/>
                </div>
            </>
        )
    }

    return (
        <div className="grid gap-4 min-h-screen py-2">
            <Card title="Component Navigation" className="col-4 min-h-full shadow-1">
                <PanelMenu model={items} className="w-full md:w-20rem" />
            </Card>
            <Card title="Data" className="col shadow-1">
                {/* <Toast ref={toast} /> */}
                <TabMenu model={tabItems} />
                <div className="p-3">
                    {tabMenuTemplate()}
                </div>
            </Card>

        </div>
    );
};

export default ComponentDetails;

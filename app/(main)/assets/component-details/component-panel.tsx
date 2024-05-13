'use client';
import React from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import { Card } from 'primereact/card';

const ComponentPanel = () => {
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

    return (
        <Card subTitle="Component Navigation" className="border-round-xl min-h-full shadow-1">
            <PanelMenu model={items} className="w-full md:w-20rem" />
        </Card>
    );
};

export default ComponentPanel;

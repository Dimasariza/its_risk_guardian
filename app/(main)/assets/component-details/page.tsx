'use client';
import React from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import { Card } from 'primereact/card';
        

const ComponentDetails = () => {
    const items = [     
        {
            label: 'Files',
            items: [
                {
                    label: 'Documents',
                    items: [
                        {
                            label: 'Invoices',
                            items: [
                                {
                                    label: 'Pending',
                                },
                                {
                                    label: 'Paid',
                                }
                            ]
                        },
                        {
                            label: 'Clients',
                        }
                    ]
                },
                {
                    label: 'Images',
                    items: [
                        {
                            label: 'Logos',
                        }
                    ]
                }
            ]
        },
        {
            label: 'Cloud',
            items: [
                {
                    label: 'Upload',
                },
                {
                    label: 'Download',
                },
                {
                    label: 'Sync',
                }
            ]
        },
        {
            label: 'Devices',
            items: [
                {
                    label: 'Phone',
                },
                {
                    label: 'Desktop',
                },
                {
                    label: 'Tablet',
                }
            ]
        }
    ];

    return (
        <div className="grid gap-4 min-h-screen py-2">
            <Card title="Component Legend" className="col-4 min-h-full shadow-1">
                <PanelMenu model={items} className="w-full md:w-20rem" />
            </Card>
            <Card title="Data" className="col shadow-1">

            </Card>

        </div>
    );
};

export default ComponentDetails;

"use client"

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import ComponentDialog from "./dialog-equipment/dialog";
import EquipmentDialog from "./dialog-system/dialog";
import ItemDialog from "./dialog-plant/dialog";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
const nodes = [
    {
        key: '0',
        data: {
            name: 'MV Maratha',
            location: 'Jakarta',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01'
        },
        children: [
            {
                key: '0-0',
                data: {
                    name: 'Work',
                    location: 'Work Folder',
                    createdAt: '2024-01-01',
                    updatedAt: '2024-01-01'
                },
                children: [
                    { 
                        key: '0-0-0', 
                        data: {
                            name: 'Expenses.doc', 
                            location: 'Expenses Document',
                            createdAt: '2024-01-01', 
                            updatedAt: '2024-01-01'
                        }
                    },
                    { 
                        key: '0-0-1', 
                        data: {
                            name: 'Resume.doc', 
                            location: 'Resume Document', 
                            createdAt: '2024-01-01', 
                            updatedAt: '2024-01-01'
                        }
                    }
                ]
            },
            {
                key: '0-1',
                data: {
                    name: 'Home',
                    location: 'Home Folder',
                    createdAt: '2024-01-01',
                    updatedAt: '2024-01-01'
                },
                children: [
                    { 
                        key: '0-1-0', 
                        data: {
                            name: 'Invoices.txt', 
                            location: 'Invoices for this month', 
                            createdAt: '2024-01-01', 
                            updatedAt: '2024-01-01'
                        }
                    }
                ]
            }
        ]
    },
    {
        data: {
            name: 'MV Bung Tomo',
            location: 'Surabaya',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01'
        },
    }
]
function AssetRegister() {

    const dateTemplate = (date: Date) => {
        const dateObj = new Date(date)
        return dateObj.toDateString();
    }

    const actionTemplate = (data: any) => {
        return (
            <>
                <div className="flex w-full gap-2">
                    <Button icon="pi pi-chart-bar" severity="success" aria-label="Cancel" size="small" />
                    <Button icon="pi pi-pencil" severity="info" aria-label="Cancel" size="small" />
                    <Button icon="pi pi-trash" severity="danger" aria-label="Cancel" size="small" />
                </div>
            </>
        )
    }

    return (
        <>
            <Card title="Asset Register">
                <div className="w-4 flex justify-content-between">
                    <ItemDialog />
                    <EquipmentDialog />
                    <ComponentDialog />
                </div>

                <TreeTable value={nodes} tableStyle={{ minWidth: '50rem', marginTop: "2rem" }}>
                    <Column field="name" header="Name" expander sortable></Column>
                    <Column field="location" header="Location" sortable></Column>
                    <Column field="createdAt" header="Created" body={({data}) => dateTemplate(data.createdAt)} sortable></Column>
                    <Column field="updatedAt" header="Last Updated" body={({data}) => dateTemplate(data.createdAt)} sortable></Column>
                    <Column field="updatedAt" header="Action" body={({data}) => actionTemplate(data)}></Column>
                </TreeTable>
                {/* <TabMenu model={items} />
                {tabMenuView()} */}
            </Card>
        </>
    )
}

export default AssetRegister;
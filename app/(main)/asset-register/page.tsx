/* eslint-disable */
"use client"

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import ComponentDialog from "./dialog-equipment/dialog";
import EquipmentDialog from "./dialog-system/dialog";
import ItemDialog from "./dialog-plant/dialog";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Children, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AssetItemService } from "@/service/assets/item-service";

const treenodes = [
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
            updatedAt: '2024-01-01',
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

function AssetRegister() {
    const rerenderMenu = useSelector((state: any) => state.RerenderMenu);
    const [nodes, setNodes] = useState<any[]>([]);
 
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

    useEffect(() => {
        AssetItemService.fetchData()
        .then((res: any) => {
                const reconstructData = res?.data?.map((data: any, key: number) => {

                    return {
                        key: data?.item_nameOfItem + key,
                        data: {
                            ...data,
                            name: data?.item_nameOfItem,
                        },
                        children: data?.system.map((system: any, key: number) => {
                            return {
                                key: system?.eq_nameOfEquipment + key,
                                data: {
                                    ...system,
                                    name: system?.eq_nameOfEquipment
                                },
                                children: system?.equipment?.map((eq: any, key: number) => {
                                    return {
                                        key: eq?.comp_nameOfComponent + key,
                                        data: {
                                            ...eq,
                                            name: eq?.comp_nameOfComponent
                                        }
                                    }
                                })
                            }
                        })
                    }
                })

                setNodes(reconstructData)
            } 
        
        )
    }, [rerenderMenu])

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
                    <Column field="createdAt" header="Created" body={({data}) => dateTemplate(data?.createdAt)}  sortable></Column>
                    <Column field="updatedAt" header="Last Updated" body={({data}) => dateTemplate(data?.createdAt)} sortable></Column>
                    <Column field="updatedAt" header="Action" body={({data}) => actionTemplate(data)}></Column>
                </TreeTable>
                {/* <TabMenu model={items} />
                {tabMenuView()} */}
            </Card>
        </>
    )
}

export default AssetRegister;
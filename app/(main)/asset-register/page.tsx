/* eslint-disable */
"use client"

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import ComponentDialog from "./dialog-equipment/dialog";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AssetItemService } from "@/service/assets/item-service";
import PlantDialog from "./dialog-plant/dialog";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { RerenderMenu } from "@/redux/action/action";
import SystemDialog from "./dialog-system/dialog";
import { AssetEquipmentService } from "@/service/assets/equipment-service";
import { AssetComponentService } from "@/service/assets/component-service";
import { MenuItemService } from "@/service/MenuItemService";

function AssetRegister() {
    const rerenderMenu = useSelector((state: any) => state.RerenderMenu);
    const [nodes, setNodes] = useState<any[]>([]);
    const [editNodes, setEditNodes] = useState<any>({});
    const [visible, setVisible] = useState<any>({});
    const toast = useRef<any>(null);
    const dispatch = useDispatch();
 
    const dateTemplate = (date: Date) => {
        const dateObj = new Date(date)
        return dateObj.toDateString();
    }

    const actionTemplate = (data: any) => {
        return (
            <div className="flex w-full gap-2">
                {
                    data?.comp_id && 
                    <Button icon="pi pi-list" severity="success" tooltip="Add to Calculation" tooltipOptions={{ position: 'top' }} size="small" 
                    onClick={() => addToCalculation(data)} disabled={data.comp_addToCalculation} />
                }
                <Button icon="pi pi-pencil" severity="info" tooltip="Edit" tooltipOptions={{ position: 'top' }} size="small" onClick={() => handleEdit(data)} />
                <Button icon="pi pi-trash" severity="danger" tooltip="Delete" tooltipOptions={{ position: 'top' }} size="small" onClick={(e) => confirm(e, data)} />
            </div>
        )
    }

    const addToCalculation = (data: any) => {
        AssetComponentService.updateData({...data, comp_addToCalculation: true})
        .then((res) => {
          dispatch(RerenderMenu());
          toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: `You add Equipment ${data.comp_nameOfComponent} add to calculation`
          });
        })
        .catch((err) => {
          toast.current.show({
            severity: 'danger',
            summary: 'Failed',
            detail: `Update equipment failed`
          });
        })
    }
 
    const handleEdit = (data: any) => {
        setEditNodes(data)
        if(data?.item_id) {
            setVisible((prev: any) => ({...prev, plant: true}))
        } else if(data?.eq_id) {
            setVisible((prev: any) => ({...prev, system: true}))
        } else if(data?.comp_id) {
            setVisible((prev: any) => ({...prev, equipment: true}))
        }
    }

    const accept = (data: any) => {
        if(data.item_id) {
            AssetItemService.deleteData(data.item_id)
            .then(res => {
                dispatch(RerenderMenu());
                toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            })
            .catch(err => {
                toast.current.show({ severity: 'error', summary: 'Failed', detail: 'Failed to delete plant', life: 3000 });
            })
        } else if(data.eq_id) {
            AssetEquipmentService.deleteData(data.eq_id)
            .then(res => {
                dispatch(RerenderMenu());
                toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            })
            .catch(err => {
                toast.current.show({ severity: 'error', summary: 'Failed', detail: 'Failed to delete Equipment', life: 3000 });
            })
        } else if(data.comp_id) {
            AssetComponentService.deleteData(data.comp_id)
            .then(res => {
                dispatch(RerenderMenu());
                toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            })
            .catch(err => {
                toast.current.show({ severity: 'error', summary: 'Failed', detail: 'Failed to delete Component', life: 3000 });
            })
        }
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };
    
    const confirm = (event: any, data: any) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => accept(data),
            reject
        });
    };

    const { data } = useSelector((state: any) => state.AuthReducer);
    const user = data.user.user_id

    useEffect(() => {
        MenuItemService.getRegisteredAssets({
            "user_id": user,
            "registered": "all"
        })
        .then((res: any) => {
                const reconstructData = res?.data?.map((data: any, key: number) => {
                    return {
                        key: data?.item_nameOfItem + key,
                        data: {
                            ...data,
                            name: data?.item_nameOfItem,
                            location: data?.item_tagOfItem
                        },
                        children: data?.system.map((system: any, key: number) => {
                            return {
                                key: system?.eq_nameOfEquipment + key,
                                data: {
                                    ...system,
                                    name: system?.eq_nameOfEquipment,
                                    location: system?.eq_tagOfEquipment
                                },
                                children: system?.equipment_by_user?.map((eq: any, key: number) => {
                                    return {
                                        key: eq?.comp_nameOfComponent + key,
                                        data: {
                                            ...eq,
                                            name: eq?.comp_nameOfComponent,
                                            location: eq?.comp_tagOfComponent
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
            <Toast ref={toast} position="bottom-right" />
            <ConfirmPopup />

            <Card title="Asset Register">
                <div className="w-5 flex justify-content-between">
                    <PlantDialog editNodes={editNodes} setEditNodes={setEditNodes} visible={visible.plant} setVisible={setVisible} /> 
                    <SystemDialog nodes={nodes} editNodes={editNodes} setEditNodes={setEditNodes} visible={visible.system} setVisible={setVisible}/>
                    <ComponentDialog nodes={nodes} editNodes={editNodes} setEditNodes={setEditNodes} visible={visible.equipment} setVisible={setVisible}/>
                </div>

                <TreeTable value={nodes} tableStyle={{ minWidth: '50rem', marginTop: "2rem" }}>
                    <Column field="name" header="Name" expander sortable></Column>
                    <Column field="location" header="Location" sortable></Column>
                    <Column field="createdAt" header="Created" body={({data}) => dateTemplate(data?.created_at)}  sortable></Column>
                    <Column field="updatedAt" header="Last Updated" body={({data}) => dateTemplate(data?.updated_at)} sortable></Column>
                    <Column field="" header="Action" body={({data}) => actionTemplate(data)}></Column>
                </TreeTable>
            </Card>
        </>
    )
}

export default AssetRegister;
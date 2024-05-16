'use client';
import React, { useState, useEffect, useRef, Children } from 'react';
import { TreeTable, TreeTableSelectionKeysType } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { TreeNode } from 'primereact/treenode';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Demo } from '@/types';
import { Dropdown } from 'primereact/dropdown';
import { UnitsService } from '@/service/UnitsService';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { CompanyService } from '@/service/CompanyService';

interface ICompanies {
    company: string,
    name: string,
    location: string,
    type?: any,
    [key: string]: any
}

const UnitsTree = () => {
    let emptyProduct: any = {
        id: '',
        name: '',
        image: '',
        description: '',
        category: '',
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK',
        company: "",
    };
    
    const [units, setUnits] = useState<TreeNode[]>([]);
    const [selectedFileKeys, setSelectedFileKeys] = useState<TreeTableSelectionKeysType | null>(null);
    const [unitDialog, setUnitDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [unit, setUnit] = useState<ICompanies>(emptyProduct);

    useEffect(() => {
        UnitsService.getUnits().then((unitFiles: any) => setUnits(unitFiles));
    }, []);

    const openNew = () => {
        setUnitDialog(true);
    }

    const openEdit = (value: any) => {
        setUnit(value.data);
        setUnitDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setUnitDialog(false);
    };

    const producunitFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text />
        </>
    );

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...unit };
        _product[`${name}`] = val;

        setUnit(_product);
    };

    const [selectedCompanyType, setSelectedCompanyType] = useState(null);
    const companyType = [
        { name: 'Company A', code: 'NY' },
        { name: 'Company B', code: 'RM' },
        { name: 'Company C', code: 'LDN' },
        { name: 'Company D', code: 'IST' },
        { name: 'Company E', code: 'PRS' },
    ];

    const [selectedUnitsType, setSelectedUnitsType] = useState(null);
    const unitsType = [
        { name: 'Offshore Drilling', code: 'NY' },
        { name: 'Offshore Process', code: 'RM' },
        { name: 'Offshore Utility', code: 'LDN' },
        { name: 'Amine Treating', code: 'IST' },
        { name: 'Catalitic Reforming - CCR', code: 'PRS' },
    ];

    const [description, setDescription] = useState('');

    const toast = useRef<any>(null);
    
    const acceptDelete = (value: any)  => {
        setUnits(prev => prev.filter(item => item.data.id != value.id));
        toast.current.show({ 
            severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 
        });
    };

    const rejectDelete = () => {
        toast.current.show({ 
            severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 
        });
    };

    const confirmDelete = ({data}: any) => {
        confirmDialog({
            message: `Do you want to delete ${data.name}?`,
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => acceptDelete(data),
            reject: rejectDelete
        });
    };

    const actionTemplate = (data : any) => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button type="button" text  icon="pi pi-trash" severity='danger' onClick={() => confirmDelete(data)}></Button>
                <Button type="button" text  icon="pi pi-pencil" severity="info" onClick={() => openEdit(data)}></Button>
            </div>
        );
    };

    return (
        <div className="grid">
            <Toast ref={toast} />
            <ConfirmDialog />
            <Dialog visible={unitDialog} style={{ width: '450px' }} header="Add Units" modal className="p-fluid" footer={producunitFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Facility</label>
                    <Dropdown value={selectedCompanyType} onChange={(e) => setSelectedCompanyType(e.value)} options={companyType} optionLabel="name" 
                    placeholder="Select Facility" className="w-full md:w-14rem" />

                    <label className="mb-3">Name</label>
                    <Dropdown value={selectedUnitsType} onChange={(e) => setSelectedUnitsType(e.value)} options={unitsType} optionLabel="name" 
                    placeholder="Select Type" className="w-full md:w-14rem" />

                    <label className="mb-3">Description</label>
                    <InputTextarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} />
                </div>
            </Dialog>
                        
            <div className="col-12">
                <div className="card">
                    <h5>Units</h5>
                    <Button label="Add Units" raised severity="success" className='my-2'onClick={openNew}/>

                    <TreeTable value={units} selectionMode="checkbox" selectionKeys={selectedFileKeys} onSelectionChange={(e) => setSelectedFileKeys(e.value)}>
                        <Column field="name" header="Facility" expander />
                        <Column field="company" header="Units" />
                        <Column field="location" header="Description" />
                        <Column body={actionTemplate} headerClassName="w-10rem" />

                    </TreeTable>
                </div>
            </div>
        </div>
    );
};

export default UnitsTree;

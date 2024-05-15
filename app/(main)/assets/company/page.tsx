'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TreeTable, TreeTableSelectionKeysType } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { TreeNode } from 'primereact/treenode';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { CompanyService } from '@/service/CompanyService';
// import CompaniesData from './data';

interface ICompanies {
    company: string,
    name: string,
    location: string,
    type?: any,
    [key: string]: any
}

const CompanyPage = () => {
    const toast = useRef<any>(null);

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
    
    const [selectedFileKeys, setSelectedFileKeys] = useState<TreeTableSelectionKeysType | null>(null);
    const [files, setFiles] = useState<TreeNode[]>([]);
    const [companyDialog, setCompanyDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [company, setCompany] = useState<ICompanies>(emptyProduct);

    const acceptDelete = (value: any)  => {
        setFiles(prev => prev.filter(item => item.data.id != value.id));
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

    useEffect(() => {
        CompanyService.getCompanies().then((companiesFile) => setFiles(companiesFile))
    }, []);

    const companyType: any = [
        { name: 'Oil and gas productiocn' },
        { name: 'Oil and gas processing and transportation ' },
        { name: 'Refineries' },
        { name: 'Petrochemical and chemical plants' },
        { name: 'Pipeline' },
        { name: 'Pipeline stations' },
        { name: 'Liquefied natural gas plants' },
    ];

    const openNew = () => {
        setCompany({
            company: "",
            name: "",
            location: "",
            type: "",
        });
        setCompanyDialog(true);
    };

    const openEdit = (value: any) => {
        setCompany(value.data);
        setCompanyDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setCompanyDialog(false);
    };

    const saveDialog = () => {
        setFiles(prev => ([
            ...prev,
            { key: files.length, data: company}
        ]))
        setCompanyDialog(false);
    };

    const companyFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveDialog} />
        </>
    );

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _product: ICompanies = { ...company };
        _product[`${name}`] = val;

        setCompany(_product);
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
            <Dialog visible={companyDialog} style={{ width: '450px' }} header="Add Company" modal className="p-fluid" footer={companyFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Company</label>
                    <InputText
                        id="company"
                        value={company.company}
                        onChange={(e) => onInputChange(e, 'company')}
                        required
                        autoFocus
                        className={classNames({
                            'p-invalid': submitted && !company.company
                        })}
                    />

                    <label className="mb-3">Name</label>
                    <InputText
                        id="name"
                        value={company.name}
                        onChange={(e) => onInputChange(e, 'name')}
                        required
                        className={classNames({
                            'p-invalid': submitted && !company.name
                        })}
                    />

                    <label className="mb-3">Location</label>
                    <InputText
                        id="location"
                        value={company.location}
                        onChange={(e) => onInputChange(e, 'location')}
                        required
                        className={classNames({
                            'p-invalid': submitted && !company.location
                        })}
                    />

                    <label className="mb-3">Type</label>
                    <Dropdown value={company.type} onChange={(e) => setCompany(value => ({
                        ...value, type: e.value
                    }))} options={companyType} optionLabel="name" 
                    placeholder="Select Type" className="w-full md:w-14rem" />
                </div>
            </Dialog>
                        
            <div className="col-12">
                <div className="card">
                    <h5>Company</h5>
                    <Button label="Add Company" raised severity="success" className='my-2'onClick={openNew}/>

                    <TreeTable value={files} selectionMode="checkbox" selectionKeys={selectedFileKeys} onSelectionChange={(e) => setSelectedFileKeys(e.value)}>
                        <Column field="name" header="Name" expander />
                        <Column field="company" header="Company" />
                        <Column field="location" header="Location" />
                        <Column body={actionTemplate} headerClassName="w-10rem" />
                    </TreeTable>
                </div>
            </div>
        </div>
    );
};

export default CompanyPage;

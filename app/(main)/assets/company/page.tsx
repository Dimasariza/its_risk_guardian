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
// import CompaniesData from './data';

let CompaniesData: any[] = 
[  
    {
        "key": 0,
        "data":{  
            "name":"Pertamina Surabaya",
            "company":"Pertamina",
            "location":"Surabaya",
            "type": {
                "name": "Oil and gas production"
            },
            "id": 1
        },
    },
    {  
        "key": 1,
        "data":{  
            "name":"Meratus Jakarta",
            "company":"Meratus",
            "location":"Jakarta",
            "type": {
                "name": 'Oil and gas processing and transportation '
            },
            "id": 2
        },
    },
    {  
        "key": 2,
        "data": {  
            "name":"SPIL Surabaya",
            "company":"SPIL",
            "location":"Surabaya",
            "type": {
                name: 'Refineries'
            },
            "id": 3
        },
    },
    {  
        "key": 3,
        "data":{  
            "name":"Dok Pantai Lamongan",
            "company":"DPL",
            "location":"Lamongan",
            "type": {
                name: 'Petrochemical and chemical plants'
            },
            "id": 4
        },
    },
    {  
        "key": 4,
        "data": {  
            "name":"DKB Jakarta",
            "company":"DKB",
            "location":"Jakarta",
            "type": {
                name: 'Pipeline'
            },
            "id": 5
        },
    },
]


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
    
    const [files2, setFiles2] = useState<TreeNode[]>([]);
    const [selectedFileKeys2, setSelectedFileKeys2] = useState<TreeTableSelectionKeysType | null>(null);
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [product, setProduct] = useState<ICompanies>(emptyProduct);

    const acceptDelete = (value: any)  => {
        const deletionData = CompaniesData.filter(item => item.data.id != value.id);

        setFiles2(deletionData);
        CompaniesData = deletionData;

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
        setFiles2(CompaniesData);
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
        setProduct({
            company: "",
            name: "",
            location: "",
            type: "",
        });
        setProductDialog(true);
    };

    const openEdit = (value: any) => {
        setProduct(value.data)
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const saveDialog = () => {
        CompaniesData.push({
            key: CompaniesData.length,
            data: product
        })
        setProductDialog(false);
    };

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveDialog} />
        </>
    );

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _product: ICompanies = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
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
            <Dialog visible={productDialog} style={{ width: '450px' }} header="Add Company" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Company</label>
                    <InputText
                        id="company"
                        value={product.company}
                        onChange={(e) => onInputChange(e, 'company')}
                        required
                        autoFocus
                        className={classNames({
                            'p-invalid': submitted && !product.company
                        })}
                    />

                    <label className="mb-3">Name</label>
                    <InputText
                        id="name"
                        value={product.name}
                        onChange={(e) => onInputChange(e, 'name')}
                        required
                        className={classNames({
                            'p-invalid': submitted && !product.name
                        })}
                    />

                    <label className="mb-3">Location</label>
                    <InputText
                        id="location"
                        value={product.location}
                        onChange={(e) => onInputChange(e, 'location')}
                        required
                        className={classNames({
                            'p-invalid': submitted && !product.location
                        })}
                    />

                    <label className="mb-3">Type</label>
                    <Dropdown value={product.type} onChange={(e) => setProduct(value => ({
                        ...value, type: e.value
                    }))} options={companyType} optionLabel="name" 
                    placeholder="Select Type" className="w-full md:w-14rem" />
                </div>
            </Dialog>
                        
            <div className="col-12">
                <div className="card">
                    <h5>Company</h5>
                    <Button label="Add Company" raised severity="success" className='my-2'onClick={openNew}/>

                    <TreeTable value={files2} selectionMode="checkbox" selectionKeys={selectedFileKeys2} onSelectionChange={(e) => setSelectedFileKeys2(e.value)}>
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

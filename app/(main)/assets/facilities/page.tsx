'use client';
import React, { useState, useEffect, useRef } from 'react';
import { TreeCheckboxSelectionKeys, TreeMultipleSelectionKeys } from 'primereact/tree';
import { TreeTable, TreeTableSelectionKeysType } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { NodeService } from '../../../../demo/service/NodeService';
import { TreeNode } from 'primereact/treenode';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import { Demo } from '@/types';
import { Dropdown } from 'primereact/dropdown';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const facilitiesData = 
    [  
        {
            "key": "0",
            "data":{  
                "name":"Company A",
                "size":"100kb",
                "type":"Folder"
            },
        },
        {  
            "key": "1",
            "data":{  
                "name":"Company B",
                "size":"20kb",
                "type":"Folder"
            },
        },
        {  
            "key": "2",
            "data": {  
                "name":"Company C",
                "size":"150kb",
                "type":"Folder"
            },
        },
        {  
            "key": "3",
            "data":{  
                "name":"Company D",
                "size":"75kb",
                "type":"Folder"
            },
        },
        {  
            "key": "4",
            "data": {  
                "name":"Company E",
                "size":"25kb",
                "type":"Folder"
            },
        },
    ]

const FacilitiesTree = () => {
    const toast = useRef(null);

    let emptyProduct: Demo.Product = {
        id: '',
        name: '',
        image: '',
        description: '',
        category: '',
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };
    
    const [files, setFiles] = useState<TreeNode[]>([]);
    const [files2, setFiles2] = useState<TreeNode[]>([]);
    const [selectedFileKeys, setSelectedFileKeys] = useState<string | TreeMultipleSelectionKeys | TreeCheckboxSelectionKeys | null>(null);
    const [selectedFileKeys2, setSelectedFileKeys2] = useState<TreeTableSelectionKeysType | null>(null);
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [product, setProduct] = useState<Demo.Product>(emptyProduct);

    const accept = () => {
        // toast.current?.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        // toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const confirmDelete = () => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            // defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

    useEffect(() => {
        NodeService.getFiles().then((files) => setFiles(files));
        // NodeService.getFilesystem().then((files) => setFiles2(files));
        setFiles2(facilitiesData)
    }, []);

    const openNew = () => {
        console.log("open new")
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text />
        </>
    );

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const [selectedCompanyType, setSelectedCompanyType] = useState(null);
    const companyType = [
        { name: 'Chemical', code: 'NY' },
        { name: 'LNG', code: 'RM' },
        { name: 'LPG', code: 'LDN' },
        { name: 'Petrochemical', code: 'IST' },
        { name: 'Pipeline', code: 'PRS' },
        { name: 'Platform', code: 'PRS' },
        { name: 'Power', code: 'PRS' },
    ];

    const actionTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button type="button" text  icon="pi pi-trash" severity='danger' onClick={confirmDelete}></Button>
                <Button type="button" text  icon="pi pi-pencil" severity="info" onClick={openNew}></Button>
            </div>
        );
    };

    return (
        <div className="grid">
            <Toast ref={toast} />
            <ConfirmDialog />
            <Dialog visible={productDialog} style={{ width: '450px' }} header="Add Facilities" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Company</label>
                    <InputText
                        id="name"
                        value={product.name}
                        onChange={(e) => onInputChange(e, 'name')}
                        required
                        autoFocus
                        className={classNames({
                            'p-invalid': submitted && !product.name
                        })}
                    />

                    <label className="mb-3">Name</label>
                    <InputText
                        id="name"
                        value={product.name}
                        onChange={(e) => onInputChange(e, 'name')}
                        required
                        autoFocus
                        className={classNames({
                            'p-invalid': submitted && !product.name
                        })}
                    />

                    <label className="mb-3">Location</label>
                    <InputText
                        id="name"
                        value={product.name}
                        onChange={(e) => onInputChange(e, 'name')}
                        required
                        autoFocus
                        className={classNames({
                            'p-invalid': submitted && !product.name
                        })}
                    />

                    <label className="mb-3">Type</label>
                    <Dropdown value={selectedCompanyType} onChange={(e) => setSelectedCompanyType(e.value)} options={companyType} optionLabel="name" 
                    placeholder="Select Type" className="w-full md:w-14rem" />
                </div>
            </Dialog>
                        
            <div className="col-12">
                <div className="card">
                    <h5>Facilities</h5>
                    <Button label="Add Facilities" raised severity="success" className='my-2'onClick={openNew}/>

                    <TreeTable value={files2} selectionMode="checkbox" selectionKeys={selectedFileKeys2} onSelectionChange={(e) => setSelectedFileKeys2(e.value)}>
                        <Column field="name" header="Name" expander />
                        <Column field="size" header="Size" />
                        <Column field="type" header="Type" />
                        <Column body={actionTemplate} headerClassName="w-10rem" />
                    </TreeTable>
                </div>
            </div>
        </div>
    );
};

export default FacilitiesTree;

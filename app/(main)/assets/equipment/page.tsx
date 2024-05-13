'use client';
import React, { useState, useEffect } from 'react';
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

const equpimentData = 
    [  
        {
            "key": "0",
            "data":{  
                "name":"Equipment 01",
                "size":"Amine Treating",
                "type":"Lorem ipsum is placeholder text commonly used in the graphic",
            },
            "children" : [
                {
                    "key": "0",
                    "data":{  
                        "name":"Equipments A",
                        "size":"Pipe",
                        "type":"Lorem ipsum is placeholder text commonly used in the graphic",
                    },
                },
            ]
        },
        {  
            "key": "1",
            "data":{  
                "name":"Equipment 02",
                "size":"Crude",
                "type":"Lorem ipsum is placeholder text commonly used in the graphic"
            },
            "children" : [
                {
                    "key": "0",
                    "data":{  
                        "name":"Equipments A",
                        "size":"Pipe",
                        "type":"Lorem ipsum is placeholder text commonly used in the graphic",
                    },
                },
            ]
        },
        {  
            "key": "2",
            "data": {  
                "name":"Equipment 03",
                "size":"Vacum Equipments",
                "type":"Lorem ipsum is placeholder text commonly used in the graphic"
            },
            "children" : [
                {
                    "key": "0",
                    "data":{  
                        "name":"Equipments A",
                        "size":"Pipe",
                        "type":"Lorem ipsum is placeholder text commonly used in the graphic",
                    },
                },
            ]
        },
        {  
            "key": "3",
            "data":{  
                "name":"Equipment 04",
                "size":"Crude",
                "type":"Lorem ipsum is placeholder text commonly used in the graphic"
            },
            "children" : [
                {
                    "key": "0",
                    "data":{  
                        "name":"Equipments A",
                        "size":"Pipe",
                        "type":"Lorem ipsum is placeholder text commonly used in the graphic",
                    },
                },
            ]
        },
        {  
            "key": "4",
            "data": {  
                "name":"Equipment 05",
                "size":"Vacum Equipments",
                "type":"Lorem ipsum is placeholder text commonly used in the graphic"
            },
            "children" : [
                {
                    "key": "0",
                    "data":{  
                        "name":"Equipments A",
                        "size":"Pipe",
                        "type":"Lorem ipsum is placeholder text commonly used in the graphic",
                    },
                },
            ]
        },
    ]

const EquipmentData = () => {
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


    useEffect(() => {
        NodeService.getFiles().then((files) => setFiles(files));
        // NodeService.getFilesystem().then((files) => setFiles2(files));
        setFiles2(equpimentData)
    }, []);

    const openNew = () => {
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

    return (
        <div className="grid">
            <Dialog visible={productDialog} style={{ width: '450px' }} header="Add Equipment" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
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
                    <h5>Equipment</h5>
                    <Button label="Add Equipment" raised severity="success" className='my-2'onClick={openNew}/>

                    <TreeTable value={files2} selectionMode="checkbox" selectionKeys={selectedFileKeys2} onSelectionChange={(e) => setSelectedFileKeys2(e.value)}>
                        <Column field="name" header="Name" expander />
                        <Column field="size" header="Size" />
                        <Column field="type" header="Type" />
                    </TreeTable>
                </div>
            </div>
        </div>
    );
};

export default EquipmentData;

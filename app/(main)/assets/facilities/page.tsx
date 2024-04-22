'use client';
import React, { useState, useEffect } from 'react';
import { Tree, TreeCheckboxSelectionKeys, TreeMultipleSelectionKeys } from 'primereact/tree';
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
        setFiles2(facilitiesData)
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

    return (
        <div className="grid">
            <Dialog visible={productDialog} style={{ width: '450px' }} header="Add Facilities" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {/* {product.image && <img src={`/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />} */}
                <div className="field">
                    <label htmlFor="name">Name</label>
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
                    {/* {submitted && !product.name && <small className="p-invalid">Name is required.</small>} */}
                </div>
                {/* <div className="field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div> */}

                <div className="field">
                    <label className="mb-3">Category</label>
                    <div className="formgrid grid">
                        {/* <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div> */}
                    </div>
                </div>

                <div className="formgrid grid">
                    {/* <div className="field col">
                        <label htmlFor="price">Price</label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity">Quantity</label>
                        <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} />
                    </div> */}
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
                    </TreeTable>
                </div>
            </div>
        </div>
    );
};

export default FacilitiesTree;

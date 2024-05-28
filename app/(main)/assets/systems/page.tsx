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

const systemsData = [
  {
    key: '0',
    data: {
      name: 'Company A',
      size: 'Amine Treating',
      type: 'Lorem ipsum is placeholder text commonly used in the graphic'
    },
    children: [
      {
        key: '0',
        data: {
          name: 'Units A',
          size: 'Pipe',
          type: 'Lorem ipsum is placeholder text commonly used in the graphic'
        }
      }
    ]
  },
  {
    key: '1',
    data: {
      name: 'Company B',
      size: 'Crude',
      type: 'Lorem ipsum is placeholder text commonly used in the graphic'
    },
    children: [
      {
        key: '0',
        data: {
          name: 'Units A',
          size: 'Pipe',
          type: 'Lorem ipsum is placeholder text commonly used in the graphic'
        }
      }
    ]
  },
  {
    key: '2',
    data: {
      name: 'Company C',
      size: 'Vacum Units',
      type: 'Lorem ipsum is placeholder text commonly used in the graphic'
    },
    children: [
      {
        key: '0',
        data: {
          name: 'Units A',
          size: 'Pipe',
          type: 'Lorem ipsum is placeholder text commonly used in the graphic'
        }
      }
    ]
  },
  {
    key: '3',
    data: {
      name: 'Company D',
      size: 'Crude',
      type: 'Lorem ipsum is placeholder text commonly used in the graphic'
    },
    children: [
      {
        key: '0',
        data: {
          name: 'Units A',
          size: 'Pipe',
          type: 'Lorem ipsum is placeholder text commonly used in the graphic'
        }
      }
    ]
  },
  {
    key: '4',
    data: {
      name: 'Company E',
      size: 'Vacum Units',
      type: 'Lorem ipsum is placeholder text commonly used in the graphic'
    },
    children: [
      {
        key: '0',
        data: {
          name: 'Units A',
          size: 'Pipe',
          type: 'Lorem ipsum is placeholder text commonly used in the graphic'
        }
      }
    ]
  }
];

const SystemsTree = () => {
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
    setFiles2(systemsData);
  }, []);

  const openNew = () => {
    setProductDialog(true);
  };

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
    { name: 'Company A', code: 'NY' },
    { name: 'Company B', code: 'RM' },
    { name: 'Company C', code: 'LDN' },
    { name: 'Company D', code: 'IST' },
    { name: 'Company E', code: 'PRS' }
  ];

  const [selectedUnitsType, setSelectedUnitsType] = useState(null);
  const unitsType = [
    { name: 'Offshore Drilling', code: 'NY' },
    { name: 'Offshore Process', code: 'RM' },
    { name: 'Offshore Utility', code: 'LDN' },
    { name: 'Amine Treating', code: 'IST' },
    { name: 'Catalitic Reforming - CCR', code: 'PRS' }
  ];

  const [description, setDescription] = useState('');

  return (
    <div className="grid">
      <Dialog visible={productDialog} style={{ width: '450px' }} header="Add Systems" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="name">Facility</label>
          <Dropdown value={selectedCompanyType} onChange={(e) => setSelectedCompanyType(e.value)} options={companyType} optionLabel="name" placeholder="Select Facility" className="w-full md:w-14rem" />

          <label className="mb-3">Name</label>
          <Dropdown value={selectedUnitsType} onChange={(e) => setSelectedUnitsType(e.value)} options={unitsType} optionLabel="name" placeholder="Select Type" className="w-full md:w-14rem" />

          <label className="mb-3">Description</label>
          <InputTextarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} />
        </div>
      </Dialog>

      <div className="col-12">
        <div className="card">
          <h5>Systems</h5>
          <Button label="Add Systems" raised severity="success" className="my-2" onClick={openNew} />

          <TreeTable value={files2} selectionMode="checkbox" selectionKeys={selectedFileKeys2} onSelectionChange={(e) => setSelectedFileKeys2(e.value)}>
            <Column field="name" header="Facility" expander />
            <Column field="size" header="System" />
            <Column field="type" header="Description" />
          </TreeTable>
        </div>
      </div>
    </div>
  );
};

export default SystemsTree;

'use client';

import InputTypeText from '@/app/(main)/uikit/input/input-type-text';
import { CorrosionLoopGroupService } from '@/service/corrosionLoopGroupService';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { PickList } from 'primereact/picklist';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CorrosionLoopDialog({assetDetails, corrosionLoop} : any) {
    const toast = useRef<any>(null);
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState<any>({});
    const [source, setSource] = useState<any>();
    const [target, setTarget] = useState<any>([]);

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        const data = target.map((i: any) => ({
            clGroup_componentId: i.comp_id,
            clGroup_name: value.clGroup_name,
            clGroup_clId: corrosionLoop.cl_id
        }))

        CorrosionLoopGroupService.postData(data)
        .then(res => {
            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: `Add new corrosion group success`
            });
        })
        .catch(err => {
            toast.current.show({
                severity: 'error',
                summary: 'Failed',
                detail: `Failed to create new corrosion Group`
            });
        })
        
        setVisible(false)
        setSource([])
        setTarget([])
    };

    const footerContent = (
        <div>
        <Button label="Cancel" icon="pi pi-times" onClick={() => {
                setVisible(false)
                setSource([])
                setTarget([])
            }} severity="danger" />
        <Button label="Save" icon="pi pi-check" onClick={handleSubmit} severity="success" />
        </div>
    );

    useEffect(() => {
        setSource(assetDetails)
    }, [visible]);

    const dispatch = useDispatch();
    const { data } = useSelector((state: any) => state.AuthReducer);

    const onChange = (event: any) => {
        setSource(event.source);
        setTarget(event.target);
    };

    const itemTemplate = (item: any) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <div className="flex-1 flex flex-column gap-2">
                    <span className="font-bold">{item.comp_nameOfComponent}</span>
                    <div className="flex align-items-center gap-2">
                        <span>{item.comp_tagOfComponent}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
        <Toast ref={toast} position="bottom-right"/>
        <Button label="Add Corrosion Loop" className='my-3' onClick={() => { setVisible(true)} }/>
        <Dialog header="Corrosion Loop" visible={visible} style={{ minWidth: '80%' }} 
            onHide={() => {
                    setVisible(false); 
                    setTarget([])
                    setSource([])
                }} footer={footerContent}>
            <section className="flex flex-column gap-2">
                <div className='flex justify-content-center'>
                    <InputTypeText props={{
                            name: 'clGroup_name', 
                            placeholder: "Corrosion Loop Name",
                        }}   
                        type="text" 
                        value={value}
                        setValue={setValue} 
                    />
                </div>
                <PickList dataKey="comp_id" source={source} target={target} onChange={onChange} itemTemplate={itemTemplate} breakpoint="1280px"
                    sourceHeader="Available" targetHeader="Selected" sourceStyle={{ height: '24rem' }} targetStyle={{ height: '24rem' }} 
                    sourceFilterPlaceholder="Search by name" targetFilterPlaceholder="Search by name" filter filterBy="comp_nameOfComponent"
                    />
            </section>
        </Dialog>
        </>
    );
}

export default CorrosionLoopDialog;

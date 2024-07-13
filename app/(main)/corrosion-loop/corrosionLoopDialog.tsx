'use client';

import InputTypeText from '@/fragments/input-type-text';
import { RerenderMenu } from '@/redux/action/action';
import { AssetComponentService } from '@/service/assets/component-service';
import { AssetEquipmentService } from '@/service/assets/equipment-service';
import { IAssetComponent } from '@/types/assetComponent';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';
import { PickList } from 'primereact/picklist';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CorrosionLoopDialog({assetDetails} : any) {
    const toast = useRef<any>(null);
    const [value, setValue] = useState<any>({});
    const [error, setError] = useState<any>({});
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [visible, setVisible] = useState(false);
    const [source, setSource] = useState<any>(assetDetails);
    const [target, setTarget] = useState<any>([]);

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSubmit(true);
    };

    const footerContent = (
        <div>
        <Button label="Cancel" icon="pi pi-check" onClick={() => setVisible(false)} severity="danger" />
        <Button label="Save" icon="pi pi-times" onClick={handleSubmit} severity="success" />
        </div>
    );

    useEffect(() => {
        AssetEquipmentService.fetchData()
        .then((res) => {
            dispatch(RerenderMenu());
        })
        .catch((err) => {
            toast.current.show({
            severity: 'danger',
            summary: 'Error',
            detail: `Failed to get Data.`
            });
        });
    }, [visible]);

    const dispatch = useDispatch();
    const { data } = useSelector((state: any) => state.AuthReducer);

    useEffect(() => {
        if (Object.keys(error).length === 0 && isSubmit) {
        AssetComponentService.postData({...value, comp_userId: data.user.user_id})
            .then((res) => {
            dispatch(RerenderMenu());

            toast.current.show({
                severity: 'success',
                summary: 'Data has been added',
                detail: `You add Component ${value.comp_nameOfComponent}`
            });
            })
            .catch((err) => console.log(err));
        setVisible(false);
        }
    }, [error]);

    const onChange = (event: any) => {
        setSource(event.source);
        setTarget(event.target);
    };

    const itemTemplate = (item: any) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                {/* <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${item.image}`} alt={item.name} /> */}
                <div className="flex-1 flex flex-column gap-2">
                    <span className="font-bold">{item.comp_nameOfComponent}</span>
                    <div className="flex align-items-center gap-2">
                        <span>{item.comp_tagOfComponent}</span>
                    </div>
                </div>
            </div>
        );
    };

    console.log(assetDetails)

    return (
        <>
        <Toast ref={toast} position="bottom-right"/>
        <Button label="Add Corrosion Loop" className='my-3' onClick={() => { setVisible(true)} }/>
        <Dialog header="Corrosion Loop" visible={visible} style={{ minWidth: '80%' }} 
            onHide={() => setVisible(false)} footer={footerContent}>
            <section className="flex flex-column gap-2">
                <InputTypeText props={{name: 'clGroup_name', placeholder: "Corrosion Loop Name"}}  type="text" value="test" setValue={() => {}} />
                <PickList dataKey="id" source={source} target={target} onChange={onChange} itemTemplate={itemTemplate} breakpoint="1280px"
                    sourceHeader="Available" targetHeader="Selected" sourceStyle={{ height: '24rem' }} targetStyle={{ height: '24rem' }} 
                    sourceFilterPlaceholder="Search by name" targetFilterPlaceholder="Search by name" filter filterBy="comp_nameOfComponent"
                    />
            </section>
        </Dialog>
        </>
    );
}

export default CorrosionLoopDialog;

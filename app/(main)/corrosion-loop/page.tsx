"use client"

import InputFileUpload from "@/app/(main)/uikit/input/input-file";
import { AssetComponentService } from "@/service/assets/component-service";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Image } from "primereact/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FileUploadUploadEvent } from "primereact/fileupload";
import CorrosionLoopDialog from "./corrosionLoopDialog";
import { CorrosionLoopService } from "@/service/corrosionLoopService";
import UpdateImageDialog from "./updateImage";

function CorrosionLoop() {
    const [assetDetails, setAssetDetails] = useState<any>();
    const [corrosionLoop, setCorrosionLoop] = useState<any>()
    const [reload, setReload] = useState<boolean>(false)

    const { data } = useSelector((state: any) => state.AuthReducer);
    const user = data.user.user_id

    useEffect(() => {
        Promise.all([
            AssetComponentService.fetchDataByUser(user),
            CorrosionLoopService.getByUser(user)
        ])
        .then(([component, corrosionLoop]) => {
            setAssetDetails(component.data)
            setCorrosionLoop(corrosionLoop.data)
        })
    }, [reload])

    const dateTemplate = (date: Date) => {
        return new Date(date).toDateString();
    }

    const onDoneUpload = (e: FileUploadUploadEvent | null = null) => {
        let data;
        if(e) {
            ({ data } = JSON.parse(e?.xhr?.response)) 
        }

        CorrosionLoopService.editData({
            ...corrosionLoop,
            cl_fileId: data?.file_id
        }, user)
        .then(res => {
            setReload((prev) => !prev)
        })
    }

    return (
        <>
            <Card title="Asset Detail">
                <CorrosionLoopDialog assetDetails={assetDetails} />
                {
                    corrosionLoop?.cl_fileId 
                    ?   <div className="flex justify-content-center">
                            <div className="w-5">
                                <Image src={process.env.DB_URL + '/file/' + corrosionLoop.cl_fileId} alt="Image" width="100%" preview />
                                <UpdateImageDialog onDoneUpload={onDoneUpload}/>
                            </div>
                        </div>
                    :   <InputFileUpload path_folder="file" icon="pi-file" fileType="File" doneUpload={onDoneUpload}/>
                }
                <DataTable value={assetDetails} tableStyle={{ minWidth: '50rem', marginTop: "2rem" }}>
                    <Column field="comp_tagOfComponent" header="Tag"></Column>
                    <Column field="comp_nameOfComponent" header="Name"></Column>
                    <Column field="created_at" header="Created At" body={(e) => dateTemplate(e.created_at)}></Column>
                    <Column field="updated_at" header="Last Updated" body={(e) => dateTemplate(e.created_at)}></Column>
                </DataTable>
            </Card>
        </>
    )
}

export default CorrosionLoop;
"use client"

import InputFileUpload from "@/fragments/input-file";
import { AssetComponentService } from "@/service/assets/component-service";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Image } from "primereact/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CorrosionGroup from "./corrosionGroup";
import { FileUploadUploadEvent } from "primereact/fileupload";

function CorrosionLoop() {
    const [assetDetails, setAssetDetails] = useState<any>();
    const [uploadedFile, setUploadedFile] = useState<FileUploadUploadEvent>()

    const { data } = useSelector((state: any) => state.AuthReducer);

    useEffect(() => {
        AssetComponentService.fetchDataByUser(data.user.user_id)
        .then(res => {
            setAssetDetails(res.data)
        })
    }, [uploadedFile])

    const dateTemplate = (date: Date) => {
        const dateObj = new Date(date)
        return dateObj.toDateString();
    }

    return (
        <>
            <Card title="Asset Detail">
                {/* <CorrosionGroup /> */}
                <Button label="Add Corrosion Loop" className="my-3" />
                {
                    assetDetails!?.cl_fileId 
                    ? <div className="flex justify-content-center">
                        <Image src="https://primefaces.org/cdn/primereact/images/galleria/galleria10.jpg" alt="Image" width="100%" preview />
                    </div>
                    : <InputFileUpload path_folder="file" icon="pi-file" fileType="File" doneUpload={(e: FileUploadUploadEvent) => {
                        setUploadedFile(e)
                    }}/>
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
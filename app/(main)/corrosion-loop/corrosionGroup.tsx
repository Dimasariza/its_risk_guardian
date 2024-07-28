import { CorrosionLoopGroupService } from "@/service/corrosionLoopGroupService";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";

function CorrosionLoopGroup({corrosionLoop} :any) {
    const [data, setData] = useState<any>({});

    const dateTemplate = (date: Date) => {
        return new Date(date).toDateString();
    }

    useEffect(() => {
        CorrosionLoopGroupService.showData(corrosionLoop?.cl_id)
        .then(res => {
            setData(res)
        })
    }, [corrosionLoop])
    
    return (
        <>
            <h5 className="m-5">Corrosion Loop Group</h5>
            <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                <Column field="clGroup_name" header="Group name"></Column>
                <Column field="created_at" header="Created At" body={(e) => dateTemplate(e.created_at)}></Column>
                <Column field="updated_at" header="Last Updated" body={(e) => dateTemplate(e.updated_at)}></Column>
            </DataTable>
        </>
    )
}

export default CorrosionLoopGroup;
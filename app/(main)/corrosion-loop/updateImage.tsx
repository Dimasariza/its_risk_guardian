import InputFileUpload from "@/app/(main)/uikit/input-file";
import { Button } from "primereact/button";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

function UpdateImageDialog({onDoneUpload}: any) {
    const [visible, setVisible] = useState<boolean>(false);

    const footerContent = (
        <div>
          <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible(false)} severity="danger" />
        </div>
    );

    const toast = useRef<Toast>(null);

    const accept = () => {
        onDoneUpload(false)
        toast.current!.show({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    };

    const reject = () => {
        toast.current!.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };

    const confirm = (event: any) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

    return (
        <>
            <div className="flex justify-content-center gap-3">
                <Button size="small" icon="pi pi-pencil" onClick={() => setVisible(true)} />
                <Button size="small" icon="pi pi-trash" onClick={confirm} severity="danger" />
            </div>

            <Dialog header="Update Corrosion Loop File" visible={visible} style={{ width: '50%' }}
            modal onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
                <InputFileUpload path_folder="file" icon="pi-file" fileType="File" doneUpload={onDoneUpload}/>
            </Dialog>

            <Toast ref={toast} position="bottom-right" />
            <ConfirmPopup />
        </>
    )
}

export default UpdateImageDialog;
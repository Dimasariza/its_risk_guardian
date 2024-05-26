import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import { useRef, useState } from "react";

function Documents() {
  const [value, setValue] = useState('');

  const toast = useRef<any>(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<any>(null);
    
    const onTemplateSelect = (e: any) => {
      let _totalSize = totalSize;
      let files = e.files;

      Object.keys(files).forEach((key) => {
          _totalSize += files[key].size || 0;
      });

      setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e: any) => {
      let _totalSize = 0;

      e.files.forEach((file: any) => {
        _totalSize += file.size || 0;
      });

      setTotalSize(_totalSize);
      toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file: any, callback: any) => {
      setTotalSize(totalSize - file.size);
      callback();
    };

    const onTemplateClear = () => {
      setTotalSize(0);
    };

    const headerTemplate = (options: any) => {
      const { className, chooseButton, uploadButton, cancelButton } = options;
      const value = totalSize / 10000;
      const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

      return (
        <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
          {chooseButton}
          {uploadButton}
          {cancelButton}
          <div className="flex align-items-center gap-3 ml-auto">
            <span>{formatedValue} / 1 MB</span>
            <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
          </div>
        </div>
      );
    };

    const itemTemplate = (file: any, props: any) => {
      return (
        <div className="flex align-items-center flex-wrap">
          <div className="flex align-items-center" style={{ width: '40%' }}>
            <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
            <span className="flex flex-column text-left ml-3">
              {file.name}
              <small>{new Date().toLocaleDateString()}</small>
            </span>
          </div>
          <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
          <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
        </div>
      );
    };

    const emptyTemplate = () => {
      return (
        <div className="flex align-items-center flex-column">
          <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
          <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
              Drag and Drop Image Here
          </span>
        </div>
      );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };


  return(
    <>
      <h5>Documents</h5>
      {/* <section className="grid gap-2 mx-2">
        <label htmlFor="pfd" className="col-6">PFD</label>
        <InputText id="pfd" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="p&id" className="col-6">P & ID</label>
        <InputText id="p&id" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
        <label htmlFor="otherDrawings" className="col-6">Other Drawings</label>
        <InputText id="otherDrawings" className="col" value={value} onChange={(e) => setValue(e.target.value)} />
      </section> */}
      <label htmlFor="pfd" className="col-6">PFD</label>
      
      <Toast ref={toast}></Toast>

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
        onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
        headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
    </>
  )
}

export default Documents;
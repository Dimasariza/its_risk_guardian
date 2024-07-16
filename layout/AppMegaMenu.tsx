import { useRouter } from 'next/navigation';
import { MegaMenu } from 'primereact/megamenu';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

function AppMegaMenu() {
  const router = useRouter();


  const items: any = [
    {
      label: 'Asset Register',
      command: () => {
        router.push('/asset-register', { scroll: false });
      },
    },
    {
      label: 'Asset Detail',
      command: () => {
        router.push('/corrosion-loop', { scroll: false });
      },
    },
  ];

  const [dialogVisible, setDialogVisible] = useState(false);

  const footerContent = (
    <div>
      <Button label="No" icon="pi pi-times" onClick={() => setDialogVisible(false)} className="p-button-text" />
      <Button label="Yes" icon="pi pi-check" severity='danger' onClick={() => setDialogVisible(false)} autoFocus />
    </div>
  );

  return (
    <>
      <MegaMenu model={items} breakpoint="768px"  />

      <Dialog
        header="Delete"
        visible={dialogVisible}
        position="top"
        style={{ width: '50vw' }}
        onHide={() => {
          if (!dialogVisible) return;
          setDialogVisible(false);
        }}
        footer={footerContent}
        draggable={false}
        resizable={false}
      >
        <span>Are you sure to delete this item?</span>
      </Dialog>
    </>
  );
}

export default AppMegaMenu;

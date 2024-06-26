import { useRouter } from 'next/navigation';
import { MegaMenu } from 'primereact/megamenu';
import { useEffect, useState } from 'react';
import ItemDialog from './dialog-item/dialog';
import EquipmentDialog from './dialog-equipment/dialog';
import ComponentDialog from './dialog-component/dialog';
import { LiaCutSolid } from 'react-icons/lia';
import { GrDocumentPdf } from 'react-icons/gr';
import { SiMicrosoftexcel } from 'react-icons/si';
import { MdOutlineQrCode2 } from 'react-icons/md';
import { SiWebcomponentsdotorg } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { EditData, EditDone } from '@/redux/action/action';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

function AppMegaMenu() {
  const router = useRouter();
  const [visible, setVisible] = useState({
    item: false,
    equipment: false,
    component: false
  });

  const dispatch = useDispatch();
  const edit = useSelector((state: any) => state.EditReducer);

  const items: any = [
    {
      label: 'File',
      items: [
        [
          {
            label: 'Export',
            items: [
              {
                label: 'PDF',
                icon: (options: any) => <GrDocumentPdf {...options.iconProps} />
              },
              {
                label: 'Excel',
                icon: (options: any) => <SiMicrosoftexcel {...options.iconProps} />
              },
              {
                label: 'QR Code',
                icon: (options: any) => <MdOutlineQrCode2 {...options.iconProps} />
              }
            ]
          },
          {
            label: 'Import',
            items: [
              {
                label: 'Excel',
                icon: (options: any) => <SiMicrosoftexcel {...options.iconProps} />
              }
            ]
          }
        ]
      ]
    },
    {
      label: 'Home',
      items: [
        [
          {
            label: 'View',
            items: [
              {
                label: 'Asset Register',
                icon: 'pi pi-book',
                command: () => {
                  // Callback to run
                  router.push('/assets/asset-register', { scroll: false });
                }
              },
              {
                label: 'Risk Based Inspection',
                icon: 'pi pi-cog',
                command: () => {
                  // Callback to run
                  router.push('/calculation/risk-based-inspection', { scroll: false });
                }
              }
            ]
          },
          {
            label: 'Clipboard',
            items: [
              {
                label: 'Copy',
                icon: 'pi pi-copy',
                command: () => {}
              },
              {
                label: 'Paste',
                icon: 'pi pi-clone',
                command: () => {}
              },
              {
                label: 'Cut',
                icon: (options: any) => <LiaCutSolid {...options.iconProps} />,
                command: () => {}
              }
            ]
          }
        ]
      ]
    },
    {
      label: 'Create',
      items: [
        [
          {
            label: 'Assets',
            items: [
              {
                label: 'Item',
                icon: 'pi pi-box',
                command: () => {
                  setVisible((prev) => ({ ...prev, item: true }));
                }
              },
              {
                label: 'Equipment',
                icon: 'pi pi-wrench',
                command: () => {
                  setVisible((prev) => ({ ...prev, equipment: true }));
                }
              },
              {
                label: 'Component',
                icon: (options: any) => <SiWebcomponentsdotorg {...options.iconProps} />,
                command: () => {
                  setVisible((prev) => ({ ...prev, component: true }));
                }
              }
            ]
          }
        ]
      ]
    },
    {
      label: 'Tools',
      items: [
        [
          {
            label: 'Filter',
            items: [
              {
                label: 'Advanced Filter',
                icon: 'pi pi-filter'
              }
            ]
          }
        ]
      ]
    }
  ];

  // const end = <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />;
  const end = () => {
    const button: any = [
      {
        icon: 'pi pi-save',
        severity: 'success',
        disabled: !edit,
        tooltip: 'Save',
        command: () => {
          dispatch(EditDone());
        }
      },
      {
        icon: 'pi pi-file-edit',
        severity: 'info',
        disabled: edit,
        tooltip: 'Edit',
        command: () => {
          dispatch(EditData());
        }
      },
      {
        icon: 'pi pi-trash',
        severity: 'danger',
        tooltip: 'Delete',
        command: () => {
          setDialogVisible(true);
        }
      }
    ];
    return (
      <div className="mx-3">
        {button.map(({ icon, severity, tooltip, disabled, command }: any, key: number) => (
          <Button key={key} icon={icon} rounded text severity={severity} disabled={disabled} tooltip={tooltip} tooltipOptions={{ position: 'bottom' }} onClick={command} />
        ))}
      </div>
    );
  };

  const [dialogVisible, setDialogVisible] = useState(false);

  const footerContent = (
    <div>
      <Button label="No" icon="pi pi-times" onClick={() => setDialogVisible(false)} className="p-button-text" />
      <Button label="Yes" icon="pi pi-check" severity='danger' onClick={() => setDialogVisible(false)} autoFocus />
    </div>
  );

  return (
    <>
      <ItemDialog visible={visible.item} setVisible={setVisible} />
      <EquipmentDialog visible={visible.equipment} setVisible={setVisible} />
      <ComponentDialog visible={visible.component} setVisible={setVisible} />
      <MegaMenu model={items} breakpoint="768px" end={end} />

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

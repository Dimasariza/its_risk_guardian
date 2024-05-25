import { useRouter } from "next/navigation";
import { MegaMenu } from "primereact/megamenu";
import { useState } from "react";
import ItemDialog from "./dialog/item-dialog";
import EquipmentDialog from "./dialog/equipment-dialog";
import ComponentDialog from "./dialog/component-dialog";
import { LiaCutSolid } from "react-icons/lia";
import { GrDocumentPdf } from "react-icons/gr";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdOutlineQrCode2 } from "react-icons/md";
import { SiWebcomponentsdotorg } from "react-icons/si";

function AppMegaMenu() {
  const router = useRouter();
  const [visibleItem, setVisibleItem] = useState(false);
  const [visibleEquipment, setVisibleEquipment] = useState(false);
  const [visibleComponent, setVisibleComponent] = useState(false);
    
  const items = [
    {
      label: "",
      icon: "pi pi-save",
      className: "mr-8  ",
    },
    {
      label: 'File',
      items: [
          [
            {
              label: 'Export',
              items: [
                { 
                  label: 'PDF', 
                  icon: (options: any) => <GrDocumentPdf {...options.iconProps} />,
                }, 
                { 
                  label: 'Excel', 
                  icon: (options: any) => <SiMicrosoftexcel {...options.iconProps} />,
                }, 
                { 
                  label: 'QR Code',
                  icon: (options: any) => <MdOutlineQrCode2 {...options.iconProps} />,
                }, 
              ]
            },
            {
              label: 'Import',
              items: [
                { 
                  label: 'Excel',
                  icon: (options: any) => <SiMicrosoftexcel {...options.iconProps} />,
                }, 
              ]
            }
          ],
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
                icon: "pi pi-book",
                command: () => {
                  // Callback to run
                  router.push('/assets/asset-register', { scroll: false })
                }
              }, 
              { 
                label: 'Risk Based Inspection',
                icon: "pi pi-cog",
                command: () => {
                  // Callback to run
                  router.push('/calculation/risk-based-inspection', { scroll: false })
                }
              }, 
            ]
          },
          {
            label: 'Clipboard',
            items: [
              { 
                label: 'Copy',
                icon: 'pi pi-copy',
                command: () => {
                }
              }, 
              { 
                label: 'Paste',
                icon: 'pi pi-clone',
                command: () => {
                }
              }, 
              { 
                label: 'Cut',
                icon: (options: any) => <LiaCutSolid {...options.iconProps} />,
                command: () => {
                }
              }, 
            ]
          }
        ],
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
                  setVisibleItem(true)
                }
              }, 
              { 
                label: 'Equipment', 
                icon: 'pi pi-wrench',
                command: () => {
                  setVisibleEquipment(true)
                }
              }, 
              { 
                label: 'Component', 
                icon: (options: any) => <SiWebcomponentsdotorg {...options.iconProps} />,
                command: () => {
                  setVisibleComponent(true);
                }
              },
            ]
          }
        ],
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
              }, 
            ]
          }
        ],
      ]
    }
  ];
    
  return (
    <>
    
      <ItemDialog visible={visibleItem} setVisible={setVisibleItem} />
      <EquipmentDialog visible={visibleEquipment} setVisible={setVisibleEquipment} />
      <ComponentDialog visible={visibleComponent} setVisible={setVisibleComponent} />
      <MegaMenu model={items} breakpoint="960px" />
    </>
  )
}

export default AppMegaMenu;
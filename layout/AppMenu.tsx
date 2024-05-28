/* eslint-disable @next/next/no-img-element */

import React, { useContext, useEffect, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';
import { MenuItemService } from '@/service/MenuItemService';
import { useDispatch, useSelector } from 'react-redux';

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext);
  const [menuItems, setMenuItems] = useState<AppMenuItem[]>([]);

  useEffect(() => {
    // MenuItemService.getAllAssets().then((res) => console.log(res));
  }, []);

  const model: AppMenuItem[] = [
    {
      label: 'PT Sanngar Sarana Baja',
      items: [
        {
          label: 'Horizontal Vessel',
          icon: 'pi pi-fw pi-home',
          to: '/home/dashboard',
          items: [
            {
              label: 'LP FROD Separator',
              icon: 'pi pi-fw pi-home',
              to: '/home/dashboard',
              items: [
                {
                  label: 'JNE MBD 105',
                  icon: 'pi pi-fw pi-home',
                  to: '/home/dashboard'
                }
              ]
            }
          ]
        },
        {
          label: 'Vertical Vessel',
          icon: 'pi pi-fw pi-home',
          to: '/home/dashboard',
          items: [
            {
              label: 'LP Gas Scrubber',
              icon: 'pi pi-fw pi-home',
              to: '/home/dashboard',
              items: [
                {
                  label: 'JNE MBF 110',
                  icon: 'pi pi-fw pi-home',
                  to: '/home/dashboard'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      label: 'PT Gunanusa Utama Fabrication',
      items: [
        {
          label: 'Horizontal Vessel',
          icon: 'pi pi-fw pi-home',
          to: '/home/dashboard',
          items: [
            {
              label: 'JNE MBD 101',
              icon: 'pi pi-fw pi-home',
              to: '/home/dashboard'
            },
            {
              label: 'JNE MAM 107',
              icon: 'pi pi-fw pi-home',
              to: '/home/dashboard'
            },
            {
              label: 'JNE NEK 109',
              icon: 'pi pi-fw pi-home',
              to: '/home/dashboard'
            }
          ]
        }
      ]
    },
    {
      label: 'PT Kokoh Semesta',
      items: [
        {
          label: 'Vertical Vessel',
          icon: 'pi pi-fw pi-id-card',
          to: '/assets/company',
          items: [
            {
              label: 'LP Sucction Scrubber',
              icon: 'pi pi-fw pi-id-card',
              to: '/assets/company',
              items: [
                {
                  label: 'JNE MBF 142',
                  icon: 'pi pi-fw pi-id-card',
                  to: '/assets/company'
                }
              ]
            },
            {
              label: 'HP Discharge Scrubber',
              icon: 'pi pi-fw pi-id-card',
              to: '/assets/company',
              items: [
                {
                  label: 'JNE MBF 143',
                  icon: 'pi pi-fw pi-id-card',
                  to: '/assets/company'
                }
              ]
            }
          ]
        }
        // { label: 'Units', icon: 'pi pi-fw pi-check-square', to: '/assets/units' },
        // { label: 'Systems', icon: 'pi pi-fw pi-bookmark', to: '/assets/systems' },
        // { label: 'Equipment', icon: 'pi pi-fw pi-exclamation-circle', to: '/assets/equipment' },
        // { label: 'Component', icon: 'pi pi-fw pi-mobile', to: '/assets/component', class: 'rotated-icon' },
        // { label: 'PFD', icon: 'pi pi-fw pi-mobile', to: '/assets/pfd', class: 'document-icon' },
        // { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
        // { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
        // { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
        // { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
        // { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
        // { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
        // { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
        // { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
        // { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
        // { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
        // { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
      ]
    }
    // {
    //     label: 'Report',
    //     items: [{ label: 'Risk Analysis', icon: 'pi pi-fw pi-book', to: '/' }]
    // },
    // {
    //     label: 'Prime Blocks',
    //     items: [
    //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
    //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://blocks.primereact.org', target: '_blank' }
    //     ]
    // },
    // {
    //     label: 'Utilities',
    //     items: [
    //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },
    //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://primeflex.org/', target: '_blank' }
    //     ]
    // },
    // {
    //     label: 'Pages',
    //     icon: 'pi pi-fw pi-briefcase',
    //     to: '/pages',
    //     items: [
    //         {
    //             label: 'Landing',
    //             icon: 'pi pi-fw pi-globe',
    //             to: '/landing'
    //         },
    //         {
    //             label: 'Auth',
    //             icon: 'pi pi-fw pi-user',
    //             items: [
    //                 {
    //                     label: 'Login',
    //                     icon: 'pi pi-fw pi-sign-in',
    //                     to: '/auth/login',
    //                     items: [
    //                         {
    //                             label: 'Login',
    //                             icon: 'pi pi-fw pi-sign-in',
    //                             to: '/auth/login'
    //                         },
    //                     ]
    //                 },
    //                 {
    //                     label: 'Error',
    //                     icon: 'pi pi-fw pi-times-circle',
    //                     to: '/auth/error'
    //                 },
    //                 {
    //                     label: 'Access Denied',
    //                     icon: 'pi pi-fw pi-lock',
    //                     to: '/auth/access'
    //                 }
    //             ]
    //         },
    //         {
    //             label: 'Crud',
    //             icon: 'pi pi-fw pi-pencil',
    //             to: '/pages/crud'
    //         },
    //         {
    //             label: 'Timeline',
    //             icon: 'pi pi-fw pi-calendar',
    //             to: '/pages/timeline'
    //         },
    //         {
    //             label: 'Not Found',
    //             icon: 'pi pi-fw pi-exclamation-circle',
    //             to: '/pages/notfound'
    //         },
    //         {
    //             label: 'Empty',
    //             icon: 'pi pi-fw pi-circle-off',
    //             to: '/pages/empty'
    //         }
    //     ]
    // },
    // {
    //     label: 'Hierarchy',
    //     items: [
    //         {
    //             label: 'Submenu 1',
    //             icon: 'pi pi-fw pi-bookmark',
    //             items: [
    //                 {
    //                     label: 'Submenu 1.1',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [
    //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
    //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
    //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
    //                     ]
    //                 },
    //                 {
    //                     label: 'Submenu 1.2',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
    //                 }
    //             ]
    //         },
    //         {
    //             label: 'Submenu 2',
    //             icon: 'pi pi-fw pi-bookmark',
    //             items: [
    //                 {
    //                     label: 'Submenu 2.1',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [
    //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
    //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
    //                     ]
    //                 },
    //                 {
    //                     label: 'Submenu 2.2',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     label: 'Get Started',
    //     items: [
    //         {
    //             label: 'Documentation',
    //             icon: 'pi pi-fw pi-question',
    //             to: '/documentation'
    //         },
    //         {
    //             label: 'Figma',
    //             url: 'https://www.dropbox.com/scl/fi/bhfwymnk8wu0g5530ceas/sakai-2023.fig?rlkey=u0c8n6xgn44db9t4zkd1brr3l&dl=0',
    //             icon: 'pi pi-fw pi-pencil',
    //             target: '_blank'
    //         },
    //         {
    //             label: 'View Source',
    //             icon: 'pi pi-fw pi-search',
    //             url: 'https://github.com/primefaces/sakai-react',
    //             target: '_blank'
    //         }
    //     ]
    // }
  ];

  return (
    <MenuProvider>
      <h5 className="m-3">Assets Register</h5>
      {/* <ul className="layout-menu"> */}
      {model.map((item, i) => {
        return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
      })}
      {/* </ul> */}
    </MenuProvider>
  );
};

export default AppMenu;

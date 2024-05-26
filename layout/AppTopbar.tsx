/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
  const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current
  }));

  const menuRight = useRef<any>(null);
  const items = [
    {
      label: 'User',
      items: [
        {
          label: 'My Profile',
          icon: 'pi pi-user',
          url: '/unstyled'
        },
        {
          label: 'Log Out',
          icon: 'pi pi-sign-out',
          command: () => {
              // router.push('/installation');
          }
        }
      ]
    }
  ];

  return (
    <div className="layout-topbar">
      <Link href="/" className="layout-topbar-logo">
        <img src={`${process.env.PUBLIC_URL}/layout/images/ITS Risk Guardian - ${layoutConfig.colorScheme === 'light' ? 'light' : 'dark'}.svg`} width="97.22px" height={'85px'} alt="logo" />
        <span>ITS Risk Guardian</span>
      </Link>

      <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
        <i className="pi pi-bars" />
      </button>

      <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
        <i className="pi pi-ellipsis-v" />
      </button>

      <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
        <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
        <Button label="Ahmad Akbar Rivai" text className="mr-2" onClick={(event) => menuRight.current.toggle(event)} aria-controls="popup_menu_right" aria-haspopup>
            <Avatar  image="/team/image/AAR.png" size="large" style={{ backgroundColor: '#9c27b0', color: '#ffffff' }} shape="circle" className='ml-2'/>
        </Button >    
      </div>
    </div>
  );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;

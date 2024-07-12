'use client';
import React, { useEffect, useContext, useState, ReactElement } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MenuContext } from './context/menucontext';
import { AppMenuItemProps } from '@/types';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { TreeProps } from 'react-animated-tree';
import Tree from 'react-animated-tree';
import './style.css';
import { useDispatch } from 'react-redux';
import { MenuItem } from '@/redux/action/action';
import { LayoutContext } from './context/layoutcontext';

const AppMenuitem = (props: AppMenuItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { activeMenu, setActiveMenu } = useContext(MenuContext);
  const { layoutConfig } = useContext(LayoutContext);
  const item = props.item;
  const key = props.parentKey ? props.parentKey + '-' + props.index : String(props.index);
  const isActiveRoute = item!.to && pathname === item!.to;
  const active = activeMenu === key || activeMenu.startsWith(key + '-');
  const onRouteChange = (url: string) => {
    if (item!.to && item!.to === url) {
      setActiveMenu(key);
    }
  };

  const [treeStyles, setTreeStyles] = useState<any>({
    fill: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
  }) 

  useEffect(() => {
    // onRouteChange(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  useEffect(() => {
    const theme = layoutConfig.colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
    setTreeStyles((prev: any) => ({...prev, fill: theme}));
    const allMenu = document.querySelectorAll(".treeview > div") as NodeListOf<HTMLElement>
    allMenu.forEach(menu => {
      menu.style.borderLeft = "1px dashed " + theme
    })
  }, [layoutConfig])

  const itemClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    //avoid processing disabled items
    if (item!.disabled) {
      event.preventDefault();
      return;
    }

    //execute command
    if (item!.command) {
      item!.command({ originalEvent: event, item: item });
    }

    // toggle active state
    if (item!.items) setActiveMenu(active ? (props.parentKey as string) : key);
    else setActiveMenu(key);
  };

  const generateRandomString = () => {
    return Math.floor(Math.random() * Date.now()).toString(36);
  };

  const subMenu = item!.items?.length && item!.visible !== false && (
    <CSSTransition timeout={{ enter: 1000, exit: 450 }} classNames="layout-submenu" in={props.root ? true : active} key={item!.label}>
      {/* <ul> */}
      <>
        {item!.items.map((child, i) => {
          return <AppMenuitem 
            item={child} 
            index={i} 
            className={child.badgeClass} 
            parentKey={key} 
            key={child.label + generateRandomString()} 
          />;
        })}
      </>
      {/* </ul> */}
    </CSSTransition>
  );

  const dispatch = useDispatch();
  
  const text = (value: any) => {
    return (
      <span style={{ cursor: 'pointer' }} onClick={(e) => {
          dispatch(MenuItem(value))
          router.push('/risk-based-inspection', { scroll: false });
        }}>
        {value.label}
      </span>
    );
  };

  const TreeMenu: any = (props: TreeProps) => {
    return <Tree {...props}></Tree>;
  };

  return (
    <TreeMenu content={item?.items?.length ? item!.label : text(item)} key={item?.label} style={treeStyles} >
      {subMenu}
    </TreeMenu>

    // <li className={classNames({'layout-root-menuitem': props.root, 'active-menuitem': active })}>
    //      {/* {props.root && item!.visible !== false && <div className="layout-menuitem-root-text">{item!.label}</div>} */}
    //      {(!item!.to || item!.items) && item!.visible !== false ? (
    //         <a href={item!.url} onClick={(e) => itemClick(e)}  className={classNames(item!.class, 'p-ripple')} target={item!.target} tabIndex={0}>
    //             <i  className={classNames('layout-menuitem-icon', item!.icon)}></i>
    //             <span className="layout-menuitem-text">{item!.label}</span>
    //             {item!.items && <i  className="pi pi-fw pi-angle-down"></i>}
    //             <Ripple />
    //         </a>
    //     ) : null}

    //     {item!.to && !item!.items && item!.visible !== false ? (
    //         <Link href={item!.to}  replace={item!.replaceUrl} target={item!.target} className={classNames(item!.class, 'p-ripple', { 'active-route': isActiveRoute })} tabIndex={0}>
    //             <i className={classNames('layout-menuitem-icon', item!.icon)}></i>
    //             <span className="layout-menuitem-text w-full">{item!.label}</span>
    //             {item!.items && <i className="pi pi-fw pi-angle-down"></i>}
    //             <Ripple />
    //         </Link>
    //     ) : null}

    //     {subMenu}
    // </li>
  );
};

export default AppMenuitem;

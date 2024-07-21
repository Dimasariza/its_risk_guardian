/* eslint-disable @next/next/no-img-element */

import React, { useContext, useEffect, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';
import { MenuItemService } from '@/service/MenuItemService';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem } from '@/redux/action/action';
import { usePathname } from 'next/navigation';
import { AssetComponentService } from '@/service/assets/component-service';

const AppMenu = () => {
  const pathname = usePathname();
  const [menuItems, setMenuItems] = useState<AppMenuItem[]>([]);
  const rerenderMenu = useSelector((state: any) => state.RerenderMenu);
  const { data } = useSelector((state: any) => state.AuthReducer);
  const dispatch = useDispatch();
  const user = data.user.user_id

  useEffect(() => {
    console.log(pathname)
    if(pathname == "/risk-based-inspection/") {
      MenuItemService.getAllAssets(user).then((res) => {
        setMenuItems(res);
      });
    }

    if(pathname == "/corrosion-loop/") {
      AssetComponentService.fetchDataByUser(user)
      .then(res => {
        const menu = res?.data.map((item: any) => ({label: "", items: [{...item, label: item.comp_nameOfComponent}]}))
        setMenuItems(menu)
      })
    }
  }, [rerenderMenu, pathname]);

  
  const titleMenu = (path: string) => {
    switch(path) {
      case "/risk-based-inspection/":
        return "RBI Calculation";
      case "/asset-register/":
        return "RBI Calculation"
      case "/corrosion-loop/":
        return "Corrosion Loop"
      default:
        return "RBI Calculation"
    }
  }

  return (
    <MenuProvider>
      <h5 className="m-3">{titleMenu(pathname)}</h5>
      <ul className="layout-menu">
        {menuItems.map((item, i) => {
          return !item?.seperator ? <AppMenuitem 
            item={item} 
            root={true} 
            index={i} 
            key={item.label} /> 
            : <li className="menu-separator"></li>;
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;

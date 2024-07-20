import axios from "axios";

const url = process.env.DB_URL;

export const MenuItemService = {
  async getAllAssets(userId: string) {
    const requests = [url + '/itemByUser', url + '/equipmentByUser', url + '/componentByUser'].map((url) => axios.post(url, {"user_id": userId}));
    const [{ data: items }, { data: equipment }, { data: component }] = await axios.all(requests).then((res) => res);

    const random = (Math.random() + 1).toString(36).substring(7)

    const standAloneComp: any[] = [];
    const menuItem = items.data?.map((item: any) => {
      const eqFilter = equipment.data
        .map((e: any) => {
          const compFilter = component.data
            .map((c: any) => {
              if (!c?.comp_equipmentId && !standAloneComp.includes(c)) {
                standAloneComp.push(c);
              }
              return {
                ...c,
                label: c.comp_nameOfComponent
              };
            })
            .filter((c: any) => c.comp_equipmentId == e.eq_id);
          return {
            ...e,
            label: e.eq_nameOfEquipment,
            items: compFilter
          };
        })
        .filter((e: any) => e.eq_itemId == item.item_id);
      return {
        ...item,
        label: item.item_nameOfItem,
        items: eqFilter
      };
    });

    return menuItem 
    ? [ 
        {
          label: "",
          items: [
            ...menuItem, ...standAloneComp.map((c) => ({ ...c, label: c.comp_nameOfComponent }))
          ]
        }
      ]
    : []
  }
};

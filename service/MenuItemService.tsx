const url = process.env.DB_URL;

export const MenuItemService = {
  async getAllAssets() {
    const [fetchItem, fetchEquipment, fetchComponent] = await Promise.all([fetch(url + '/items'), fetch(url + '/equipments'), fetch(url + '/components')]);

    const [{ data: items }, { data: equipment }, { data: component }] = await Promise.all([
      // const [items, equipment, component] = await Promise.all([
      fetchItem.json(),
      fetchEquipment.json(),
      fetchComponent.json()
    ]);

    const standAloneComp: any[] = [];
    const menuItem = items.map((item: any) => {
      const eqFilter = equipment
        .map((e: any) => {
          const compFilter = component
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

    return [...menuItem, ...standAloneComp.map((c) => ({ ...c, label: c.comp_nameOfComponent }))];
  }
};

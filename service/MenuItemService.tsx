const url = process.env.DB_URL;

export const MenuItemService = {
  async getAllAssets() {
    const [fetchItem, fetchEquipment, fetchComponent] = await Promise.all([
      fetch(url + '/items'), 
      fetch(url + '/equipments'), 
      fetch(url + '/components')
    ]);

    const [{data: items}, {data: equipment}, {data: component}] = await Promise.all([
    // const [items, equipment, component] = await Promise.all([
      fetchItem.json(), 
      fetchEquipment.json(), 
      fetchComponent.json()
    ]);

    const standAloneComp: any[] = [];
    const menuItem = items.map((item: any) => {
      const equipt = equipment.map((e: any) => {
        const comp = component.map((c: any) => {
          if(!c?.equipmentId && !standAloneComp.includes(c)) {
            standAloneComp.push(c);
          }
          return {
            ...c, 
            label: c.comp_nameOfComponent
          }
        })
        .filter((c: any) => c.equipmentId == e.id)
        return {
          ...e,
          label: e.eq_nameOfEquipment,
          items: comp
        }
      })
      .filter((e: any) => e.itemId == item.id)
      return {
        ...item,
        label: item.item_nameOfItem,
        items: equipt
      }
    })

    return [...menuItem, ...standAloneComp.map(c => ({...c, label: c.comp_nameOfComponent}))];
  }
};

const url = process.env.DB_URL || 'http://localhost:3030';

export const MenuItemService = {
  async getAllAssets() {
    const [fetchItem, fetchEquipment, fetchComponent] = await Promise.all([
      fetch(url + '/items'), 
      fetch(url + '/equipments'), 
      fetch(url + '/components')
    ]);

    const [items, equipment, component] = await Promise.all([
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
            label: c.nameOfComponent
          }
        })
        .filter((c: any) => c.equipmentId == e.id)
        return {
          ...e,
          label: e.nameOfEquipment,
          items: comp
        }
      })
      .filter((e: any) => e.itemId == item.id)
      return {
        ...item,
        label: item.nameOfItem,
        items: equipt
      }
    })

    return [...menuItem, ...standAloneComp.map(c => ({...c, label: c.nameOfComponent}))];
    // {
      // items: items.map((c: any, key: number) => ({ ...c, key })),
      // items: menuItem,
      // equipment: equipment.map((c: any, key: number) => ({ ...c, key })),
      // component: component.map((c: any, key: number) => ({ ...c, key }))
    // };
  }
};

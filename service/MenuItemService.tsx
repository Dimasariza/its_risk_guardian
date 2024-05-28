const url = process.env.DB_URL || 'http://localhost:3030';

export const MenuItemService = {
  async getAllAssets() {
    const [fetchItem, fetchEquipment, fetchComponent] = await Promise.all([fetch(url + '/items'), fetch(url + '/equipments'), fetch(url + '/components')]);

    const [items, equipment, component] = await Promise.all([fetchItem.json(), fetchEquipment.json(), fetchComponent.json()]);

    return {
      items: items.map((c: any, key: number) => ({ ...c, key })),
      equipment: equipment.map((c: any, key: number) => ({ ...c, key })),
      component: component.map((c: any, key: number) => ({ ...c, key }))
    };
  }
};

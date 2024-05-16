export const AssetsService = {
    async getAllAssets() {
        const companyUrl = '/demo/data/companies.json';
        const unitUrl = '/demo/data/units.json';
        const equipmentUrl = '/demo/data/equipment.json';
        const componentUrl = '/demo/data/component.json';
        const [fetchCompanies, fetchUnits, fetchEquipment, fetchComponent] = await Promise.all([
          fetch(process.env.PUBLIC_URL + companyUrl), 
          fetch(process.env.PUBLIC_URL + unitUrl),
          fetch(process.env.PUBLIC_URL + equipmentUrl),
          fetch(process.env.PUBLIC_URL + componentUrl),
        ]);
    
        const [{data: companies}, {data: units}, {data: equipment}, {data: component}] = await Promise.all([
          fetchCompanies.json(), 
          fetchUnits.json(),
          fetchEquipment.json(),
          fetchComponent.json(),
        ]);

        return { 
          companies: companies.map((c: any, key: number) => ({...c, key})),
          units: units.map((c: any, key: number) => ({...c, key})), 
          equipment: equipment.map((c: any, key: number) => ({...c, key})), 
          component: component.map((c: any, key: number) => ({...c, key})), 
        };
    },
}
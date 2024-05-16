import { reconstructData } from "@/function/common";
import { AssetsService } from "./AssetData";

export const ComponentService = {
    async getComponent() {
        const componentUrl = '/demo/data/component.json';
        const res = await fetch(componentUrl);

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch Equipment data')
        }
        
        const { data: component} = await res.json();
        const { companies, units, equipment } = await AssetsService.getAllAssets();

        const filterEquipment = reconstructData(equipment, component, "equipment_id", "lkjf");
        const filterUnit = reconstructData(units, filterEquipment, "unit_id", "sdf"); 
        const filterCompanies = reconstructData(companies, filterUnit, "company_id", "kjf"); 

        return filterCompanies;
    }
}
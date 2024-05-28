import { reconstructData } from '@/function/common';
import { AssetsService } from './AssetData';

export const EquipmentService = {
  async getEquipment() {
    const equipmentUrl = '/demo/data/equipment.json';
    const res = await fetch(equipmentUrl);

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch Equipment data');
    }

    const { data: equipment } = await res.json();
    const { companies, units } = await AssetsService.getAllAssets();

    const filterUnit = reconstructData(units, equipment, 'unit_id', 'afs');
    const filterCompanies = reconstructData(companies, filterUnit, 'company_id', 'cus');

    return filterCompanies;
  }
};

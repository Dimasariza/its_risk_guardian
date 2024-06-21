import { IAssetEquipment } from '@/types/assetEquipment';

const url = process.env.DB_URL + '/equipments' || 'http://localhost:3030/equipments';
export const AssetEquipmentService = {
  async postItem(value: any, token: string) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        "Authorization": `Bearer ${token}`  
      },
      body: JSON.stringify(value)
    });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch Companies data');
    }

    return (await res.json()) as IAssetEquipment;
  },
  async getItem() {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch Companies data');
    }

    return (await res.json()) as IAssetEquipment;
  }
};

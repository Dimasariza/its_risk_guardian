import { IAssetItem } from '@/types/assetItem';

const url = process.env.DB_URL + '/items';
// const token = useSelector((state: any) => state.AuthReducer);
export const AssetItemService = {
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

    return (await res.json()) as IAssetItem;
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

    return (await res.json()) as IAssetItem;
  }
};

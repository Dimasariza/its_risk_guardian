import { IAssetItem } from "@/types/assetItem";

const itemUrl = process.env.DB_URL || "http://localhost:3030/items";
export const ItemService = {
  async postItem(value: any) {
    const res = await fetch(itemUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch Companies data')
    }
    
    return await res.json() as IAssetItem;
  },
  async getItem() {
    const res = await fetch(itemUrl, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch Companies data')
    }
    
    return await res.json() as IAssetItem;
  }
}
import { IAssetItem } from '@/types/assetItem';
import axios from 'axios';

const url = process.env.DB_URL + '/items';
export const AssetItemService = {
  async postData(value: any) {
    const res = await axios.post(url, value);
    return await res;
  },
  async fetchData() {
    const res = await axios.get(url);
    return (await res.data) as IAssetItem;
  },
  async updateData(value: any) {
    const res = await axios.put(url + "/" + value.item_id, value)
    return await res.data
  },
  async deleteData(id: string) {
    const res = await axios.delete(url + "/" + id)
    return await res.data 
  }
};

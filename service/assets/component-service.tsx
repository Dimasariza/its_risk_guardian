import { IAssetComponent } from '@/types/assetComponent';
import axios from 'axios';

const url = process.env.DB_URL || 'http://localhost:3030';
export const AssetComponentService = {
  async postData(value: any) {
    const res = await axios.post(url + '/components', value);
    return await res;
  },
  async fetchData() {
    const res = await axios.get(url + '/components');
    return await res.data;
  },
  async fetchDataByUser(user_id: any) {
    const res = await axios.post(url + "/componentByUser", {user_id});
    return await res.data;
  }
};

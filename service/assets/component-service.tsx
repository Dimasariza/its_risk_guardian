import { IAssetComponent } from '@/types/assetComponent';
import axios from 'axios';

const url = process.env.DB_URL + '/components' || 'http://localhost:3030/components';
export const AssetComponentService = {
  async postData(value: any) {
    const res = await axios.post(url, value);
    return await res;
  },
  async fetchData() {
    const res = await axios.get(url);
    return await res.data;
  }
};

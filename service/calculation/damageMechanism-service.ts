import axios from "axios";

const url = process.env.DB_URL + '/damage_mechanism';
export const damageMechanismService = {
  async postData(value: any) {
    const res = await axios.post(url, value);
    return await res;
  },
  async getData(id: string) {
    const res = await axios.get(url + '/' + id);
    return await res.data;
  },
  async editData(data: any) {
    const res = await axios.put(url + '/' + data.dm_componentId, data);
    return await res;
  }
};

import axios from 'axios';

const url = process.env.DB_URL + '/equipments' || 'http://localhost:3030/equipments';
export const AssetEquipmentService = {
  async postData(value: any) {
    const res = await axios.post(url, value);
    return res;
  },
  async fetchData() {
    const res = await axios.get(url);
    return await res.data;
  },
  async updateData(value: any) {
    const res = await axios.put(url + "/" + value.eq_id, value) 
    return res
  },
  async deleteData(id: string) {
    const res = await axios.delete(url + "/" + id)
    return await res.data 
  }
};

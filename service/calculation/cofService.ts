import axios from "axios";

const url = process.env.DB_URL + '/cof';
export const CofService = {
  async postData(value: any) {
    const res = await axios.post(url, value);
    return await res;
  },
  async fetchData(id: string) {
    const res = await axios.get(url + '/' + id);
    const { data } = await res;
    return data.data ?? {};
  },
  async editData(data: any) {
    const res = await axios.put(url + '/' + data.cof_componentId, data);
    return await res;
  }
};
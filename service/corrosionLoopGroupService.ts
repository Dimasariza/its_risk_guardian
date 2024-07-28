import axios from "axios";

const url = process.env.DB_URL + '/corrosion_loop_group';
export const CorrosionLoopGroupService = {
  async postData(value: any) {
    const res = await axios.post(url, value);
    return await res;
  },
  async showData(id: string) {
    const res = await axios.get(url + '/' + id);

    const { data } = await res;
    return data.data ?? [];
  },
  async editData(data: any, id: string) {
    const res = await axios.put(url + '/' + id, data);
    return await res;
  },
  async getByUser(id: string) {
    const res = await axios.get(url + '/' + id);
    return await res.data;
  }
};

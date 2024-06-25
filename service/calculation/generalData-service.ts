import axios from "axios";

const url = process.env.DB_URL + '/general_data';
export const GeneralDataService = {
  async postData(value: any) {
    const res = await axios.post(url, value);

    return await res;
  },
  async fetchData(id: string) {
    const res = await fetch(url + '/' + id);

    const { data } = await res.json();
    return data ?? {};
  },
  async editData(data: any) {
    const res = await fetch(url + '/' + data.gData_id, data);

    return res;
  }
};

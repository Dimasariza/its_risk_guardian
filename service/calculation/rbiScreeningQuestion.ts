import axios from "axios";

const url = process.env.DB_URL + '/pof_rbi/screeningQuestion';
export const RBIScreeningQuestionService = {
  async postData(value: any) {
    const res = await axios.post(url + "/" + value.rbiSQ_componentId, value);
    return await res;
  },
  async fetchData(id: string) {
    const res = await axios.get(url + '/' + id);

    const { data } = await res;
    return data.data ?? {};
  },
  async editData(data: any) {
    const res = await axios.put(url + '/' + data.rbiSQ_componentId, data);
    return await res;
  }
};

import axios from "axios";

const url = process.env.DB_URL + '/' || 'http://localhost:3030/pofRBIDate';

const POLPRD = {
  async postItem(value: any) {
    const res = await axios.post(url, value);
    return await res.data;
  },
  async getItem(id: string, param: string) {
    const res = await axios.get(url + param + "/" + id);
    const { data } = await res.data;
    return data ?? {};
  },
  async updateItem(value: string, id: string, param: string) {
    const res = await axios.put(url + param + "/" + id, value);
    const { data } = await res.data;
    return data ?? {};
  }
};

export async function getPOLPRDRBI(id: string) {
  return await POLPRD.getItem(id, "pol_rbi")
}

export async function updatePOLPRDRBI(value: any, id: string) {
  return await POLPRD.updateItem(value, id, 'pol_rbi');
}

export async function getPOLPRDPlan(id: string) {
  return await POLPRD.getItem(id, "pol_plan")
}

export async function updatePOLPRDPlan(value: any, id: string) {
  return await POLPRD.updateItem(value, id, 'pol_plan');
}
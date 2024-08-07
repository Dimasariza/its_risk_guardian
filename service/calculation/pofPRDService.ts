import axios from "axios";

const url = process.env.DB_URL + '/' || 'http://localhost:3030/pofRBIDate';

const POFPRD = {
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

export async function getPOFPRDRBI(id: string) {
  return await POFPRD.getItem(id, "pof_rbi")
}

export async function updatePOFPRDRBI(value: any, id: string) {
  return await POFPRD.updateItem(value, id, 'pof_rbi');
}

export async function getPOFPRDPlan(id: string) {
  return await POFPRD.getItem(id, "pof_plan")
}

export async function updatePOFPRDPlan(value: any, id: string) {
  return await POFPRD.updateItem(value, id, 'pof_plan');
}
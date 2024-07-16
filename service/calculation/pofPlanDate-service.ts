import axios from "axios";

const url = process.env.DB_URL + '/pof_plan/' || 'http://localhost:3030/pofRBIDate';

const POFRBIDate = {
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

export async function getThinning(id: string) {
  return await POFRBIDate.getItem(id, 'thinning');
}

export async function updateThinning(value: any, id: string) {
  return await POFRBIDate.updateItem(value, id, 'thinning');
}

export async function getExternalCorrosion(id: string) {
  return await POFRBIDate.getItem(id, 'ex_cor');
}

export async function updateExCor(value: any, id: string) {
  return await POFRBIDate.updateItem(value, id, 'ex_cor');
}

export async function getAlkaline(id: string) {
  return await POFRBIDate.getItem(id, 'alkaline');
}

export async function updateAlkaline(value: any, id: string) {
  return await POFRBIDate.updateItem(value, id, 'alkaline');
}

export async function getValue(id: string) {
  return await POFRBIDate.getItem(id, 'value');
}

export async function updateValue(value: any, id: string) {
  return await POFRBIDate.updateItem(value, id, 'value');
}

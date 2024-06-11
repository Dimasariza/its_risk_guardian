const url = process.env.DB_URL + '/general_data' || 'http://localhost:3030/general_data';
export const GeneralDataService = {
  async postItem(value: any) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch Companies data');
    }

    return (await res.json());
  },
  async getItem(id: string) {
    const res = await fetch(url + "?gData_componentId=" + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch Companies data');
    }
    const data = await res.json();
    return data[0] ?? {};
  },
  async editItem(data: any) {
    const res = await fetch(url + "?gData_componentId=" + data.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch Companies data');
    }

    return res.json();
  }
};

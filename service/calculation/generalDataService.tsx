const url = process.env.DB_URL + '/generalData' || 'http://localhost:3030/generalData';
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
    const res = await fetch(url + "?componentId=" + id, {
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
    return data[0];
  }
};

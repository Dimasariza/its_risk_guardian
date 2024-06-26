import axios from "axios";

const url: string | any = process.env.AUTH_URL;

export const AuthService = {
  async postData(value: any) {
    const res = await axios.post(url, value);
    return await res;
  }
};

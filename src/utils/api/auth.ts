import { AxiosResponse } from "axios";
import axios from "../../core/axios";
import * as api from "../../services/api";
import { BASE_URL } from "constants/api";

export default {
  registration: async (
    email: string,
    nickname: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) => {
    const data = await axios.post(`${BASE_URL}${api.getRegistrationUrl()}`, {
      email,
      nickname,
      password,
      firstName,
      lastName,
      phoneNumber,
    });
    return data as any;
  },
  auth: async (email: string, password: string) => {
    const data: AxiosResponse = await axios.post(
      `${BASE_URL}${api.getLoginUrl()}`,
      {
        email,
        password,
      }
    );
    return data;
  },
  getUser: async () => {
    const { data } = await axios.get(`${BASE_URL}${api.getUserUrl()}`);
    const user = data?.data;
    return user;
  },
};

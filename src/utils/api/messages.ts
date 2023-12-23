import { BASE_URL } from "constants/api";
import axios from "../../core/axios";
import * as api from "../../services/api";

export default {
  getAll: async () => await axios.get("/messages"),
  getAllById: async (id: string, pageSize: number, messagesOffset: number) => {
    const { data } = await axios.get(
      `${BASE_URL}${api.getMessagesUrl(id, messagesOffset, pageSize)}`
    );
    return data?.data;
  },
  createMessage: (text: string, dialogID: string) => {
    return axios.post(`${BASE_URL}${api.getCreateMessageUrl(dialogID)}`, {
      text,
    });
  },
  deleteOneMessage: async (id: string) => {
    return await axios.delete(`${BASE_URL}${api.getDeleteMessageUrl(id)}`);
  },
  updateOneMessage: async (id: string, text: string) => {
    return await axios.patch(`${BASE_URL}${api.getUpdateMessageUrl(id)}`, {
      text,
    });
  },
  forwardOneMessage: async (id: string, chatId: string) => {
    return await axios.post(
      `${BASE_URL}${api.getForwardMessageUrl(chatId, id)}`
    );
  },
};

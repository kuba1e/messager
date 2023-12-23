import { BASE_URL } from "constants/api";
import axios from "../../core/axios";
import * as api from "../../services/api";
import { ChatType, dialogsItem } from "types";

export default {
  getAll: async () => {
    const { data } = await axios.get(`${BASE_URL}${api.getAllChatsUrl()}`);

    return data?.data;
  },
  createDialog: async (
    title: string,
    type: ChatType,
    chatParticipants: string[]
  ) => {
    return await axios.post(`${BASE_URL}${api.getCreateChatUrl()}`, {
      type,
      title,
      chatParticipants,
    });
  },
  updateDialog: async (chatId: string, dialog: Partial<dialogsItem>) => {
    return await axios.post(`${BASE_URL}${api.getUpdateChat(chatId)}`, dialog);
  },
  addUserToDialogByEmail: async (chatId: string, email: string) => {
    return await axios.post(`${BASE_URL}${api.getAddUserToChatByEmailUrl()}`, {
      chatId,
      email,
    });
  },
};

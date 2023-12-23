import { BASE_URL } from "constants/api";

export const getLoginUrl = () => `/public/auth/signin`;
export const getRegistrationUrl = () => `/public/auth/signup`;
export const getUserUrl = () => `/secure/user`;
export const getAllChatsUrl = () => `/secure/chat`;
export const getCreateChatUrl = () => `/secure/chat`;
export const getUpdateChat = (chatId: string) => `/secure/chat/${chatId}`;
export const getDeleteChatUrl = (chatId: string) => `/secure/chat/${chatId}`;
export const getAddUserToChatByEmailUrl = () => `/secure/chat/add-user`;

export const getMessagesUrl = (
  chatId: string,
  offset?: number,
  pageSize?: number
) => {
  const queryParams = `offset=${offset || 0}&pageSize=${pageSize || 20}`;
  return `/secure/messages/${chatId}?${queryParams}`;
};
export const getCreateMessageUrl = (chatId: string) =>
  `/secure/messages/${chatId}`;
export const getUpdateMessageUrl = (chatId: string) =>
  `/secure/messages/${chatId}`;
export const getDeleteMessageUrl = (chatId: string) =>
  `/secure/messages/${chatId}`;
export const getForwardMessageUrl = (chatId: string, messageId: string) =>
  `/secure/messages/${chatId}/${messageId}`;

export interface dialogsItem {
  id: string;

  title: string;

  creatorId: string;

  users: Array<User>;

  status: Status;

  type: ChatType;

  createdAt: Date;

  modifiedAt: Date;

  icon: string;

  messages: messageItem[];
}

export enum Status {
  REMOVED = 0,
  ACTIVE = 1,
}

export enum ChatType {
  PUBLIC = 1,
  PRIVATE = 2,
}

export interface messageItem {
  id: string;

  text: string;

  creatorId: string;

  chatId: string;

  chat: dialogsItem;

  status: Status;

  createdAt: Date;

  modifiedAt: Date;

  readBy: Array<string>;

  referenceTo: string;

  forwardedBy: string;
}

export interface User {
  id: string;

  email: string;

  firstName: string;

  lastName: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;

  nickname: string;

  phoneNumber: string;

  avatar: string;

  chats: dialogsItem[];

  settings: Settings;
}

export type Settings = {
  id: string;

  user: string;

  chatSetting: Setting;
};

export type Setting = {
  chatInvites: AccessOptions;
  messageForward: AccessOptions;
  phoneVisibility: AccessOptions;
};

export enum AccessOptions {
  ALL = 1,
  NOBODY = 2,
  MY_CONTACTS = 3,
}

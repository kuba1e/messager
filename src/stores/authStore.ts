import { makeAutoObservable } from "mobx";

import { User } from "../types";
import auth from "../utils/api/auth";
import dialogsStore from "./dialogsStore";
import messagesStore from "./messagesStore";

class AuthStore {
  async registration(
    email: string,
    nickname: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) {
    const { data } = await auth.registration(
      email,
      nickname,
      password,
      firstName,
      lastName,
      phoneNumber
    );

    const user = data?.data;
    const accessToken = data?.accessToken;
    localStorage.setItem("token", data?.accessToken);

    return user;
  }

  auth(email: string, password: string) {}

  async login(email: string, password: string) {
    const { data } = await auth.auth(email, password);
    const user = data?.data;

    if (data.status === "error") {
    } else {
      localStorage.setItem("token", data?.accessToken);
    }
  }

  logOut() {
    dialogsStore.dialogues = [];
    dialogsStore.currentDialog = null;
    messagesStore.currentMessages = [];
    localStorage.removeItem("token");
  }
}

export default new AuthStore();

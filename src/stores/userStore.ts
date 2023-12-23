import { makeAutoObservable } from "mobx";
import authStore from "./authStore";
import auth from "utils/api/auth";

class UserStore {
  async getUser() {
    const user = await auth.getUser();
    return user;
  }
}

export default new UserStore();

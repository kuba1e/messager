import { action, makeObservable, observable } from "mobx";
import { ChatType, dialogsItem, messageItem } from "../types";
import { dialogs } from "../utils/api";

class DialogsStore {
  dialogues: dialogsItem[] = [];
  currentDialog: dialogsItem | null = null;
  dialogsIsLoaded: boolean = false;

  constructor() {
    makeObservable(this, {
      dialogues: observable,
      currentDialog: observable,
      fetchDialogs: action.bound,
      setDialogs: action,
      setCurrentDialog: action,
    });
  }

  async fetchDialogs() {
    this.dialogsIsLoaded = true;
    return await dialogs.getAll();
  }

  async createDialog(
    title: string,
    type: ChatType,
    chatParticipants: string[]
  ) {
    const newDialog = await dialogs.createDialog(title, type, chatParticipants);
    return newDialog;
  }

  async updateDialog(chatId: string, dialog: Partial<dialogsItem>) {
    const updatedDialog = await dialogs.updateDialog(chatId, dialog);
    return updatedDialog;
  }

  async addUserToDialogByEmail(chatId: string, email: string) {
    const updatedDialog = await dialogs.addUserToDialogByEmail(chatId, email);
    return updatedDialog;
  }

  setDialogs(dialogs: []) {
    this.dialogues = dialogs;
  }

  addDialog(dialog: dialogsItem) {
    this.dialogues.unshift(dialog);
  }

  setCurrentDialog(dialog: dialogsItem) {
    this.currentDialog = dialog;
  }

  updateLastMessage(dialog: dialogsItem, lastMessage?: messageItem) {
    let dialogKey = null;

    this.dialogues.forEach((el, index) => {
      if (el.id === dialog.id) {
        dialogKey = index;
      }
    });
  }
}

export default new DialogsStore();

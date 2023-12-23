import axios from "axios";
import { action, flow, makeObservable, observable } from "mobx";
import { messageItem } from "../types";
import { messages } from "../utils/api";
import authStore from "./authStore";
import dialgosStore from "./dialogsStore";

class MessagesStore {
  currentMessages: messageItem[] = [];
  isLoaded: boolean = false;

  constructor() {
    makeObservable(this, {
      currentMessages: observable,

      fetchMessages: action.bound,
      setMessages: action,
    });
  }

  fetchMessages(_id: string, pageSize: number, messagesOffset: number) {
    this.isLoaded = true;
    return messages.getAllById(_id, pageSize, messagesOffset);
  }

  sendMessage(selectedDialogId: string, message: any) {
    return messages.createMessage(message, selectedDialogId);
  }

  handleNewMessage(message: any) {
    if (dialgosStore.currentDialog?.id === message.dialog._id) {
      this.addMessage(message);
    }
  }

  setMessages(dialogs: messageItem[]) {
    this.currentMessages = dialogs;
    this.isLoaded = false;
  }

  addMessage(message: any) {
    this.currentMessages.push(message);
  }

  deleteMessage(messageId: any) {
    this.currentMessages = this.currentMessages.filter(
      (el) => el.id !== messageId
    );
  }

  updateMessage(index: number, updatedMessage: messageItem) {
    this.currentMessages[index] = updatedMessage;
  }

  updateUnreadStatus(dialogId: string) {
    // this.currentMessages.forEach((msg) => {
    //   if (msg.unread === false || msg.user._id !== authStore.user._id)
    //     msg.unread = true;
    // });
    // dialgosStore.dialogues.forEach((el) => {
    //   if (el._id === dialogId && el.lastMessage) {
    //     el.lastMessage!.unread = false;
    //   }
    // });
  }
}

export default new MessagesStore();

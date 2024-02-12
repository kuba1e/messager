import { io } from "socket.io-client";

export const socket = io("ws://localhost:3000", {
  auth: (cb) => {
    cb({ token: localStorage.getItem("token") });
  },
});

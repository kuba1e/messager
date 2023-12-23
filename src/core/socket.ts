import io from "socket.io-client";

const socket = io("AxiosRoutes.dev").close(); // configuration socket

export default socket;

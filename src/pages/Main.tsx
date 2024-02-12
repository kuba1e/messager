import React, { useContext, useEffect } from "react";
import { SideBar } from "../components/SideBar";
import { ChatBar } from "../components/ChatBar";
import styled from "styled-components";
import { ViewImage } from "../components/ViewImage";
import { ViewStateContext } from "contexts/ViewStateContext";
import userStore from "stores/userStore";
import { Outlet } from "react-router";
import { CreateChatModal } from "components/CreateChatModal";
import { AddUserToChatModal } from "components/AddUserToChatModal";
import { socket } from "../services/socket";

const MainPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  min-height: 100vh;
`;

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

export const Main = () => {
  const { viewState, updateViewState } = useContext(ViewStateContext);

  useEffect(() => {
    if (viewState.user) return;

    userStore.getUser().then((user) => {
      updateViewState((prevState) => ({ ...prevState, user }));
    });
  }, []);

  React.useEffect(() => {
    if (!socket.connected) {
      return;
    }

    socket.on("NEW_MESSAGE", (data: any) => {
      updateViewState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, data],
      }));
    });
  }, []);

  return (
    <MainPage>
      <SideBar />
      <ChatBar />
      <ViewImage />
      <CreateChatModal />
      <AddUserToChatModal />
    </MainPage>
  );
};

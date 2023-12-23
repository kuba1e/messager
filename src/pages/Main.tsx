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

const MainPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  min-height: 100vh;
`;

export const Main = () => {
  const { viewState, updateViewState } = useContext(ViewStateContext);

  useEffect(() => {
    if (viewState.user) return;

    userStore.getUser().then((user) => {
      updateViewState({ user });
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

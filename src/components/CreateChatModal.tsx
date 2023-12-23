import styled from "styled-components";
import { Input } from "./Input";
import { useCallback, useContext, useState } from "react";
import { ViewStateContext } from "contexts/ViewStateContext";
import dialogsStore from "stores/dialogsStore";
import { ChatType } from "types";

const ChatsModal = styled("div")`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  height: 50vh;
  overflow-y: auto;
  background-color: rgb(28, 29, 44);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitleWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 18px;
  padding: 10px;
`;

const SaveButton = styled("button")`
  padding: 10px;
  margin: 20px;
`;

export function CreateChatModal() {
  const { viewState, updateViewState } = useContext(ViewStateContext);

  const [chatTitle, setChatTitle] = useState("");
  const [usersToAddToChat, setUsersToAddToChat] = useState("");

  const createChat = useCallback(() => {
    const chatParticipants = usersToAddToChat
      .split(",")
      .map((user) => user.trim());

    dialogsStore
      .createDialog(chatTitle, ChatType.PRIVATE, chatParticipants)
      .finally(() => {
        dialogsStore.fetchDialogs().then((dialogs) => {
          updateViewState({ dialogs });
        });
        updateViewState({ showCreateChatModal: false });
      });
  }, [usersToAddToChat, chatTitle]);

  if (!viewState.showCreateChatModal) {
    return null;
  }

  return (
    <ChatsModal>
      <ModalTitleWrapper>
        <h4>Select chat to forward message</h4>
        <div>
          <Input
            placeholder="Chat title"
            type="text"
            value={chatTitle}
            setValue={setChatTitle}
            width={"300px"}
          />
        </div>
        <div>
          <Input
            placeholder="User email to add"
            type="text"
            value={usersToAddToChat}
            setValue={setUsersToAddToChat}
            width={"300px"}
          />
        </div>
      </ModalTitleWrapper>
      <SaveButton onClick={createChat}>Create chat</SaveButton>
    </ChatsModal>
  );
}

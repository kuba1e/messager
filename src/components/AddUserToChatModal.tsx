import styled from "styled-components";
import { Input } from "./Input";
import { useCallback, useContext, useState } from "react";
import { ViewStateContext } from "contexts/ViewStateContext";
import dialogsStore from "stores/dialogsStore";
import { ChatType } from "types";
import userStore from "stores/userStore";

const ChatsModal = styled("div")`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  height: 50vh;
  overflow-y: auto;
  background-color: rgb(28, 29, 44);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitleWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-size: 18px;
  padding: 10px;
`;

const SaveButton = styled("button")`
  width: 40%;
  padding: 10px;
  margin: 20px;
`;

export function AddUserToChatModal() {
  const { viewState, updateViewState } = useContext(ViewStateContext);

  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [usersToAddToChat, setUsersToAddToChat] = useState("");

  const createChat = useCallback(() => {
    const trimmedEmail = email.trim();
    dialogsStore
      .addUserToDialogByEmail(viewState.selectedDialogIdToAddUser, trimmedEmail)
      .finally(() => {
        dialogsStore.fetchDialogs().then((dialogs) => {
          updateViewState((prevState) => ({ ...prevState, dialogs }));
        });
        updateViewState((prevState) => ({
          ...prevState,
          showCreateChatModal: false,
        }));
      });

    // const chatParticipants = usersToAddToChat
    //   .split(",")
    //   .map((user) => user.trim());
  }, [usersToAddToChat, email, viewState]);

  const onChangeEmail = (email: string) => {
    setEmail(email);
  };

  if (!viewState.showAddUserToChatModal) {
    return null;
  }

  return (
    <ChatsModal>
      <ModalTitleWrapper>
        <h4>Add user to chat</h4>
        <div>
          <Input
            placeholder="User email"
            type="text"
            value={email}
            setValue={onChangeEmail}
            width={"300px"}
          />
        </div>
      </ModalTitleWrapper>
      <SaveButton onClick={createChat}>Add</SaveButton>
    </ChatsModal>
  );
}

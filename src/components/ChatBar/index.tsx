import React, { useCallback, useContext, useMemo } from "react";
import styled from "styled-components";
import { Message } from "./messages/Message";
import { SendMessage } from "./SendMessage";
import { ChatBarHeader } from "./ChatBarHeader";
import messagesStore from "../../stores/messagesStore";
import dialgosStore from "../../stores/dialogsStore";
import { Loader } from "../UI/Loader";
import { ViewStateContext } from "contexts/ViewStateContext";

const ChatBarStyles = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  position: relative;
  .messages-box {
    padding-top: 80px;
    padding-bottom: 80px;
  }
  .message__loader {
    position: absolute;
    left: 48%;
    transform: translateX(-50%);
    top: 200px;
  }
`;

const MessageInfo = styled.div`
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translateX(-50%);
  p {
    padding: 7px 15px 7px 15px;
    border-radius: 0.6em;
    background-color: #1c1d2c;
    text-align: center;
    color: #969696;
  }
`;

export const ChatBar = () => {
  const [searchValue, setSearchValue] = React.useState("");

  const {
    viewState: {
      selectedDialogId,
      user,
      pageSize,
      messages,
      isMessagesLoading,
      dialogs,
    },
    updateViewState,
  } = useContext(ViewStateContext);

  const selectedDialog = useMemo(() => {
    return dialogs?.find((dialog) => dialog.id === selectedDialogId);
  }, [dialogs, selectedDialogId]);

  const fetchMessages = useCallback((selectedDialogId: string) => {
    updateViewState((prevState) => ({ ...prevState, isMessagesLoading: true }));
    messagesStore
      .fetchMessages(selectedDialogId, pageSize, messages.length)
      .then((messages) => {
        updateViewState((prevState) => ({ ...prevState, messages }));
      })
      .finally(() => {
        updateViewState((prevState) => ({
          ...prevState,
          isMessagesLoading: false,
        }));
      });
  }, []);

  React.useEffect(() => {
    if (!selectedDialogId) return;
    fetchMessages(selectedDialogId);
  }, [selectedDialogId]);

  const filteredMessages =
    searchValue.length > 0
      ? messages?.filter((item) =>
          item.text?.toLowerCase().includes(searchValue.toLowerCase())
        )
      : messages;

  return (
    <ChatBarStyles>
      <ChatBarHeader
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      {isMessagesLoading ? (
        <div className="message__loader">
          <Loader top="30%" />
        </div>
      ) : (
        <div className="messages-box">
          {filteredMessages?.length > 0 ? (
            <>
              {filteredMessages?.map((el, index) => {
                return (
                  <Message
                    isMe={
                      el.creatorId.toString() !== user.id.toString()
                        ? false
                        : true
                    }
                    key={index}
                    index={index}
                    text={el.text}
                    date={el.createdAt.toString()}
                    updatedAt={el.modifiedAt.toString()}
                    user={selectedDialog?.users?.find(
                      (user) => user.id.toString() === el.creatorId.toString()
                    )}
                    message_id={el.id}
                    updated={false}
                    isReaded={false}
                  />
                );
              })}
            </>
          ) : !dialgosStore.currentDialog?.id ? (
            <MessageInfo>
              <p>Choose any dialog for contiune</p>
            </MessageInfo>
          ) : (
            <MessageInfo>
              <p>The list of messages is empty</p>
            </MessageInfo>
          )}
        </div>
      )}

      <SendMessage />
    </ChatBarStyles>
  );
};

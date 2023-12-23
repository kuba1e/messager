import React, { useCallback, useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { Message } from "./messages/Message";
import { SendMessage } from "./SendMessage";
import { ChatBarHeader } from "./ChatBarHeader";
import messagesStore from "../../stores/messagesStore";
import dialgosStore from "../../stores/dialogsStore";
import authStore from "../../stores/authStore";
import socket from "../../core/socket";
import playNotice from "../../utils/helpers/playNotice";
import { Loader } from "../UI/Loader";
import { dialogsItem, messageItem } from "../../types";
import dialogsStore from "../../stores/dialogsStore";
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

interface newMessageSocket {
  message: messageItem;
  dialog: dialogsItem;
}
interface deletedMessageSocket {
  message: any;
  lastMsg: messageItem[];
}

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
    return dialogs.find((dialog) => dialog.id === selectedDialogId);
  }, [dialogs, selectedDialogId]);

  React.useEffect(() => {
    // socket
    // 	.off('SERVER:NEW_MESSAGE')
    // 	.on('SERVER:NEW_MESSAGE', (obj: newMessageSocket) => {
    // 		dialgosStore.updateLastMessage(obj.dialog, obj.message);
    // 		if (obj.message.user._id !== authStore.user._id) {
    // 			messagesStore.handleNewMessage(obj.message);
    // 			const dialogues = dialgosStore.dialogues;
    // 			let isNewMsg = false;
    // 			dialogues.forEach(dialog => {
    // 				if (
    // 					dialog._id === obj.message.dialog._id &&
    // 					obj.message.dialog._id !==
    // 						dialgosStore.currentDialog?._id
    // 				)
    // 					isNewMsg = true;
    // 			});
    // 			if (
    // 				isNewMsg &&
    // 				obj.message.user._id !== authStore.user._id
    // 			) {
    // 				playNotice();
    // 			}
    // 		}
    // 	});
    // socket
    // 	.off('SERVER:DELETE_MESSAGE')
    // 	.on('SERVER:DELETE_MESSAGE', (obj: deletedMessageSocket) => {
    // 		if (obj.lastMsg)
    // 			dialgosStore.updateLastMessage(
    // 				obj.lastMsg[0].dialog,
    // 				obj.lastMsg[0],
    // 			);
    // 		else dialgosStore.updateLastMessage(obj.message);
    // 		if (obj.message.dialog === dialgosStore.currentDialog?._id) {
    // 			messagesStore.deleteMessage(obj.message._id);
    // 		}
    // 	});
    // socket
    // 	.off('SERVER:UPDATE_MESSAGE')
    // 	.on('SERVER:UPDATE_MESSAGE', message => {
    // 		if (message.dialog._id === dialgosStore.currentDialog?._id) {
    // 			let iterationIndex = 0;
    // 			let msgIndex = 0;
    // 			messagesStore.currentMessages.forEach(el => {
    // 				if (el._id === message._id) {
    // 					msgIndex = iterationIndex;
    // 				} else {
    // 					iterationIndex = iterationIndex + 1;
    // 				}
    // 			});
    // 			messagesStore.updateMessage(msgIndex, message);
    // 		}
    // 	});
    // socket
    // 	.off('SERVER:MESSAGES_READED')
    // 	.on('SERVER:MESSAGES_READED', msgData => {
    // 		if (
    // 			dialogsStore.currentDialog?._id === msgData.dialogId &&
    // 			authStore.user._id !== msgData.userId
    // 		) {
    // 			console.log(msgData);
    // 			messagesStore.updateUnreadStatus(msgData.dialogId);
    // 		}
    // 	});
  }, []);

  const fetchMessages = useCallback((selectedDialogId: string) => {
    updateViewState({ isMessagesLoading: true });
    messagesStore
      .fetchMessages(selectedDialogId, pageSize, messages.length)
      .then((messages) => {
        updateViewState({ messages });
      })
      .finally(() => {
        updateViewState({ isMessagesLoading: false });
      });
  }, []);

  React.useEffect(() => {
    if (!selectedDialogId) return;
    fetchMessages(selectedDialogId);
  }, [selectedDialogId]);

  const filteredMessages =
    searchValue.length > 0
      ? messages.filter((item) =>
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
          {filteredMessages.length > 0 ? (
            <>
              {filteredMessages.map((el, index) => {
                console.log(
                  selectedDialog?.users,
                  el.creatorId,
                  selectedDialog?.users?.find(
                    (user) => user.id.toString() === el.creatorId.toString()
                  )
                );
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

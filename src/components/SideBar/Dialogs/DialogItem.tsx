import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Avatar } from "../../Avatar";
import emptyAvatar from "../../../assets/img/emptyAvatar.png";
import { Time } from "../../Time";
import { format, isThisYear, isToday, parseISO } from "date-fns";
import dialgosStore from "../../../stores/dialogsStore";
import { dialogsItem, messageItem, User } from "../../../types";
import messagesStore from "../../../stores/messagesStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authStore from "../../../stores/authStore";
import { ContextMenu } from "components/UI/ContextMenu";
import { AddUserToChatModal } from "components/AddUserToChatModal";
import { ViewStateContext } from "contexts/ViewStateContext";

interface DialgosStylesProps {
  isOnline: boolean;
  _id: string;
  selectedId?: string;
}

const MessageContext = styled.div<{ xCoords: number; yCoords: number }>`
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
`;

const DialogsStyles = styled.div<DialgosStylesProps>`
  cursor: pointer;
  position: relative;

  display: flex;
  align-items: center;
  padding: 5px 8px 5px 8px;
  background-color: ${(props) =>
    props._id == props.selectedId && "#171823"} !important;

  a {
    color: #fff;
    text-decoration: none;
    text-transform: none;
    display: flex;
    align-items: center;
    width: 100%;
  }
  .dialog-avatar {
    position: relative;
    ${(props) =>
      props.isOnline
        ? `&::before {
			position: absolute;
			z-index: 1;
			content: '';
			bottom: 6px;
			right: 0;
			background-color: #5ca8eb;
			border-radius: 50%;
			border: 4px solid #1c1d2c;
			height: 9px;
			width: 9px;
		}`
        : ``}
  }
  &:hover {
    background-color: #2a2b3f;
  }
  .dialog {
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    .dialog-info {
      max-width: 330px;
      position: relative;
      .dialog-title {
        font-weight: 400;
        color: ${(props) => props._id == props.selectedId && "#fff !important"};
      }
      .dialogs-message {
        font-size: 16px;
        font-weight: 200;
        color: #d6d6d6;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    .dialog-other {
      display: flex;
      align-items: center;

      .unreaded-message {
        background-color: #404583;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        float: right;
        margin-left: 10px;
        animation: 1s pourСolor infinite alternate;
      }
      @keyframes pourСolor {
        from {
          background-color: #404583;
        }

        to {
          background-color: #7d82c4;
        }
      }
    }
  }
`;

interface DialogProps {
  setOnSelect: (dialogItem: dialogsItem) => void;
  author: User;
  _id: string;
  dialog: dialogsItem;
}

export const DialogItem: React.FC<DialogProps> = ({
  author,
  setOnSelect,
  _id,
  dialog,
}) => {
  const { updateViewState } = useContext(ViewStateContext);
  const msgContext = React.useRef<HTMLDivElement | null>(null);
  const messageEl = React.useRef<HTMLDivElement | null>(null);

  const [contextIsOpen, setContextIsOpen] = React.useState(false);
  const [contextCoords, setContextCoords] = React.useState<
    [coordsX: number, coordsY: number]
  >([230, 230]);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const openMsgContext = (e: MouseEvent) => {
    e.preventDefault();
    // if (user?.id === authorizedUser?.id) {
    setContextIsOpen(true);
    updateViewState((prevState) => ({
      ...prevState,
      selectedDialogIdToAddUser: dialog.id,
    }));
    if (messageEl.current) {
      let targetCoords = messageEl.current.getBoundingClientRect();
      let xCoord = e.clientX - targetCoords.left;
      let yCoord = e.clientY - targetCoords.top;
      setContextCoords([xCoord, yCoord]);
    }
    // }
  };

  const getMessageTime = (created_at: string) => {
    if (isToday(parseISO(created_at)))
      return format(parseISO(created_at), "HH:mm"); //Если сообщение написано сегодня
    if (isThisYear(parseISO(created_at)))
      return format(parseISO(created_at), "d cccc");
    return format(parseISO(created_at), "d.MM.Y");
  }; // TODO: refactor time func

  return (
    <DialogsStyles
      selectedId={dialgosStore.currentDialog?.id}
      _id={_id}
      isOnline={false}
      onClick={() => setOnSelect(dialog)}
      onContextMenu={(e) => {
        openMsgContext(e as any);
      }}
    >
      <Link to={_id}>
        <div className="dialog-avatar">
          <Avatar
            fullname={dialog.title}
            user_id={dialog.id}
            src={dialog.icon}
            width="50px"
            height="50px"
          />
        </div>
        <div className="dialog">
          <div className="dialog-info">
            <h4 className="dialog-title">{dialog.title}</h4>
            <p className="dialogs-message">{"Write your first message..."}</p>
          </div>
          <div className="dialog-other">
            <Time
              time={
                ""
                // 	getMessageTime(
                //     lastMessage ? lastMessage.createdAt : updatedAt
                //   )
              }
            />
            {/* {unreaded && <span className="unreaded-message" />} */}
          </div>
        </div>
      </Link>
      <MessageContext
        ref={msgContext}
        xCoords={contextCoords[0]}
        yCoords={contextCoords[1]}
      >
        <ContextMenu isOpen={contextIsOpen}>
          <li
            onClick={() => {
              updateViewState((prevState) => ({
                ...prevState,
                showAddUserToChatModal: false,
              }));
              setContextIsOpen(false);
            }}
          >
            <p>Add user</p>
          </li>
        </ContextMenu>
      </MessageContext>
    </DialogsStyles>
  );
};

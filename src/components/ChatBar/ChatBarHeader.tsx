import React from "react";
import styled from "styled-components";
import volumeMuteSvg from "../../assets/img/volume-mute.svg";
import leaveChatSvg from "../../assets/img/leaveChat.svg";
import pinSvg from "../../assets/img/pin.svg";
import blockSvg from "../../assets/img/block.svg";
import { Search } from "../Search";
import dialgosStore from "../../stores/dialogsStore";
import searchImg from "../../assets/img/search.svg";
import closeImg from "../../assets/img/x-non-v1.svg";
import { popupMounted, popupUnmunted } from "../../animation";
import { CSSTransition } from "react-transition-group";
import authStore from "../../stores/authStore";
import { Emoji } from "emoji-mart";

const ChatBarHeaderStyles = styled.div`
  z-index: 1;
  height: 70px;
  width: 75%;
  position: fixed;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #171823;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  div {
    h3 {
      display: block;
      margin: 0 auto;
      width: max-content;
      font-size: 16px;
      font-weight: 400;
    }
  }
`;

const Status = styled.span`
  text-align: left;
  color: #969696;
  font-weight: 200;
  position: relative;
  display: block;
  width: 100%;
  margin: 0 auto;
  p {
    padding-left: 15px;
  }
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: #5ca8eb;
    border-radius: 50%;
  }
`;

const ControlPanelBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: flex-end;
  .SearchContainer {
    position: relative;
  }
`;

const ControlPanel = styled.div<{ mounted?: boolean }>`
  width: 70px;
  height: 100%;
  cursor: pointer;

  &:hover {
    transition: 0.1s;
    span {
      &::before,
      ::after {
        background-color: #cccccc;
      }
      background-color: #cccccc;
    }
  }
  div {
    height: 100%;
    span {
      transition: 0.1s;
      position: absolute;
      background-color: #969696;
      width: 5px;
      height: 5px;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
      &::before,
      ::after {
        transition: 0.1s;
        content: "";
        width: 5px;
        height: 5px;
        background-color: #969696;
        border-radius: 50%;
        position: absolute;
        right: 0;
      }
      &::before {
        top: -10px;
      }
      &::after {
        bottom: -10px;
      }
    }
  }
`;

const ChatSettingsPopup = styled.div<{ isOpen: boolean }>`
  // enter to

  &.open-enter {
    opacity: 0;
    transform: scale(-1, 0);
  }
  &.open-enter-active {
    opacity: 1;
    transition: 200ms;
    transform: scale(1, 1);
  }
  &.open-exit {
    opacity: 1;
    transform: scale(1, 1);
  }
  &.open-exit-active {
    opacity: 0;
    transition: 200ms;
    transform: scale(-1, 0);
  }

  /* ${(props) =>
    props.isOpen
      ? `display: block; opacity: 1 !important; transition: 1s all;`
      : "display: none; opacity: 0;"} */
  position: absolute;
  z-index: 1;
  /* transition: 1s all; */
  right: 10px;
  top: 40px;
  width: 200px;
  max-width: 350px;
  height: auto;
  border-radius: 0.3em;
  .leave-chat,
  .block-chat {
    p {
      color: #e25c5c;
    }
  }
  li {
    background-color: #1c1d2c;
    transition: 0.1s;
    padding: 5px 0 5px 10px;
    list-style-type: none;
    font-weight: 200;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      transition: 0.1s;
      background-color: #27293d;
    }
    img {
      margin-right: 10px;
      width: 20px;
    }
  }
`;

const OpenSearch = styled.img<{ searchIsOpen: boolean }>`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 50%;
  right: 4px;
  cursor: pointer;
  transform: translateY(-50%)
    ${(props) => (props.searchIsOpen ? "scale(0)" : "scale(1)")};

  opacity: ${(props) => (props.searchIsOpen ? "0" : "1")};
  transition: 0.2s;
`;

const CloseSearch = styled.img<{ searchIsOpen: boolean }>`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 50%;
  right: 3px;
  cursor: pointer;
  transform: translateY(-50%)
    ${(props) => (!props.searchIsOpen ? "scale(0)" : "scale(1)")};

  opacity: ${(props) => (!props.searchIsOpen ? "0" : "1")};
  transition: 0.2s;
`;

interface ChatBarHeader {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
}

export const ChatBarHeader: React.FC<ChatBarHeader> = ({
  setSearchValue,
  searchValue,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchIsOpen, setSearchIsOpen] = React.useState(false);
  const chatSettingsPopup = React.useRef(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);
  }, []);

  const handleOutsideClick = (e: any) => {
    if (!isOpen) {
      setIsOpen(false);
    }
  };

  const searchMessage = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      //Search function
    }
    if (e.keyCode === 27) {
      setSearchIsOpen(false);
      searchInputRef.current?.blur();
      setSearchValue("");
    }
  };

  const author = dialgosStore.currentDialog?.users?.find(
    (user) => user.id === dialgosStore.currentDialog?.creatorId
  );

  const username = author?.firstName || "" + author?.lastName || "";

  return (
    <ChatBarHeaderStyles>
      <div>
        <h3>{username}</h3>
        <Status>
          <p>online</p>
        </Status>
      </div>

      <ControlPanelBox>
        <div className="SearchContainer">
          <Search
            value={searchValue}
            setValue={setSearchValue}
            height="40px"
            width={searchIsOpen ? "500px" : "40px"}
            focusWidth="500px"
            bgColor="#1C1D2C"
            placeholder={searchIsOpen ? "Press enter to chat search" : ""}
            onKeyDown={searchMessage}
            inputRef={searchInputRef}
          />
          <OpenSearch
            onClick={() => {
              setSearchIsOpen(true);
              searchInputRef.current?.focus();
            }}
            src={searchImg}
            alt="search"
            searchIsOpen={searchIsOpen}
          />
          <CloseSearch
            onClick={() => {
              setSearchIsOpen(false);
              searchInputRef.current?.blur();
              setSearchValue("");
            }}
            src={closeImg}
            alt="close"
            searchIsOpen={searchIsOpen}
          />
        </div>

        <ControlPanel mounted={isOpen} ref={chatSettingsPopup}>
          <div
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <span />
          </div>
          <CSSTransition
            in={isOpen}
            timeout={200}
            mountOnEnter
            unmountOnExit
            classNames="open"
          >
            <ChatSettingsPopup isOpen={isOpen}>
              <li>
                <img src={volumeMuteSvg} alt="" /> <p>Mute</p>
              </li>
              <li>
                <img src={pinSvg} alt="" /> <p>Pin</p>
              </li>
              <li className="block-chat">
                <img src={blockSvg} alt="" /> <p>Block user and leave</p>
              </li>
              <li className="leave-chat">
                <img src={leaveChatSvg} alt="" /> <p>Clear chat</p>
              </li>
            </ChatSettingsPopup>
          </CSSTransition>
        </ControlPanel>
      </ControlPanelBox>
    </ChatBarHeaderStyles>
  );
};

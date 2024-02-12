import React, { ChangeEvent, useContext, useState } from "react";
import styled from "styled-components";
import { Avatar } from "../Avatar";
import friendsImg from "../../assets/img/friends.svg";
import infoImg from "../../assets/img/info.svg";
import settingsFilter from "../../assets/img/settingParams.svg";
import addSvg from "../../assets/img/add-circle.svg";
import logOutSvg from "../../assets/img/leaveChat.svg";
import { Input } from "../Input";
import { Friend } from "../Friend";
import { SideItem } from "./SideItem";
import authStore from "../../stores/authStore";
import { User } from "../../types";
import user from "../../utils/api/user";
import { Loader } from "../UI/Loader";
import cameraIcon from "../../assets/img/camera.svg";
import axios from "../../core/axios";
import userStore from "../../stores/userStore";
import { useNavigate } from "react-router";
import { RouteNames } from "router";
import { ViewStateContext } from "contexts/ViewStateContext";

const SideMenuStyle = styled.div<{ sideIsOpen: boolean }>`
  height: 100vh;
  background-color: #1c1d2c;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  box-shadow: 5px 0px 20px 0px rgba(0, 0, 0, 0.3);
  z-index: 100;
  transition: 0.2s all ease-in-out;
  ${(props) => !props.sideIsOpen && "transform: translateX(-100%);"};
  .qwe {
    border: 2px solid red;
    top: 0;
    left: 0;
    position: absolute;
    z-index: -1;
    width: 100vw;
    height: 100%;
  }
`;

const SideMenuContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const UserBlock = styled.div<{ avatarIsHover: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  padding: 10px 0 0 10px;
  div {
    display: flex;
    align-items: center;
    p {
      margin-left: 10px;
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80%;
    height: 1px;
    background-color: #101018;
  }
  .avatar__choose {
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    background-color: #3a3a3aed;
    .avatar__choose-cameraIcon {
      opacity: ${(state) => (state.avatarIsHover ? "1" : "0")};
      transition: 0.15s;
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100%;
      height: 100%;
      padding: 11px;
      background-color: #101018b9;
      transform: translate(-50%, -50%);
      z-index: 1;
    }

    input {
      width: 50px;
      height: 80px;
      opacity: 1;
      position: absolute;
      margin-top: -20px;
      cursor: pointer;
      z-index: 1;
    }
  }
`;

const Close = styled.span`
  position: relative;
  right: 13px;
  width: 22px;
  height: 22px;
  cursor: pointer;
  transform: rotate(45deg) scale(1.1);
  &:hover {
    &::after {
      background-color: #ff8f8f;
      transition: 0.15s;
    }
    &::before {
      background-color: #ff8f8f;
      transition: 0.15s;
    }
  }
  &::after {
    transition: 0.15s;
    position: absolute;
    content: "";
    background-color: #fff;
    width: 1px;
    height: 21px;
    left: 50%;
  }
  &::before {
    transition: 0.15s;
    position: absolute;
    content: "";
    background-color: #fff;
    width: 21px;
    height: 1px;
    top: 10px;
    left: 1px;
  }
`;

const SideItemContent = styled.div`
  margin-top: 25px;
`;

interface SideMenuProps {
  sideIsOpen: boolean;
  setSideIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuBtnRef: React.RefObject<HTMLDivElement>;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  sideIsOpen,
  setSideIsOpen,
  menuBtnRef,
}) => {
  const {
    viewState: { user },
    updateViewState,
  } = useContext(ViewStateContext);
  const sideMenu = React.useRef(null);

  const navigation = useNavigate();

  const [searchValue, setSearchValue] = React.useState("");

  const [searchResult, setSearchResult] = React.useState<User[]>([]);
  const [searchLimit, setSearchLimit] = React.useState(5);
  const [filterIsOpen, setFilterIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [avatarFile, setAvatarFile] = React.useState();
  const changeAvatarFile = (e: ChangeEvent) => {};

  const [toggleAvatarHover, setToggleAvatarHover] = React.useState(false);

  React.useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, [sideIsOpen]);

  React.useEffect(() => {}, [searchValue, searchLimit]);

  const handleOutsideClick = (e: any) => {
    if (sideIsOpen && e.target != menuBtnRef.current) {
      setSideIsOpen(false);
    }
  };

  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <SideMenuStyle sideIsOpen={sideIsOpen} ref={sideMenu}>
      <SideMenuContent>
        <UserBlock avatarIsHover={toggleAvatarHover}>
          <div>
            <div
              className="avatar__choose"
              onMouseEnter={() => setToggleAvatarHover(true)}
              onMouseLeave={() => setToggleAvatarHover(false)}
            >
              <img
                className="avatar__choose-cameraIcon"
                src={cameraIcon}
                alt="Chose avatar"
              />
              <input
                accept="image/png, image/jpeg"
                type="file"
                title="Choose your avatar"
                onChange={changeAvatarFile}
              />
              <span />
              <Avatar
                width="50px"
                height="50px"
                fullname={fullName}
                user_id={user?.id}
                src={user?.avatar}
              />
            </div>

            <p>{fullName}</p>
          </div>

          <Close onClick={() => setSideIsOpen(false)} />
        </UserBlock>
        <SideItemContent>
          <SideItem
            icon={addSvg}
            title="Create chat"
            callback={() => {
              updateViewState((prevState) => ({
                ...prevState,
                showCreateChatModal: true,
              }));
            }}
          ></SideItem>
          <SideItem icon={friendsImg} title="Find friends">
            <div className="friends-search-input">
              <Input
                type="text"
                value={searchValue}
                setValue={setSearchValue}
                width="100%"
                height="40px"
                backgroundColor="#000"
                placeholder="Press enter to search for friends"
                fontSize="15px"
                list="friends"
              />
              <datalist id="friends">
                {searchResult.map((user: User) => {
                  return <option value={user.firstName} />;
                })}
              </datalist>
              <img
                src={settingsFilter}
                alt="Filter"
                onClick={() => setFilterIsOpen(!filterIsOpen)}
              />
            </div>
            {filterIsOpen && (
              <div className="filter">
                <p>City :</p>
              </div>
            )}

            {searchResult.length > 0 ? (
              <>
                {searchResult.map((user: User) => (
                  <Friend
                    setSideIsOpen={setSideIsOpen}
                    key={user.id}
                    user={user}
                  />
                ))}
              </>
            ) : (
              <>{!isLoading && <h5>No user found</h5>}</>
            )}
            {isLoading && (
              <div className="friends-search__loader">
                <Loader width="30px" />
              </div>
            )}
            {searchResult.length === searchLimit && (
              <p
                className="friends-search__viewmore"
                onClick={() => setSearchLimit(searchLimit + 5)}
              >
                View more...
              </p>
            )}
          </SideItem>
          <SideItem icon={infoImg} title="App info">
            <p>Test app</p>
          </SideItem>
          <SideItem
            color="#e25c5c"
            callback={() => {
              authStore.logOut();
              navigation(RouteNames.LOGIN);
            }}
            icon={logOutSvg}
            title="Sign out"
          />
        </SideItemContent>
      </SideMenuContent>
    </SideMenuStyle>
  );
};

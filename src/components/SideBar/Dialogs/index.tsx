import React from "react";
import styled from "styled-components";
import { DialogItem } from "./DialogItem";
import { User, dialogsItem } from "../../../types";

import { Loader } from "../../UI/Loader";

const DilagosStyles = styled.div`
  overflow-y: auto;
  height: 90%;
  padding-bottom: 5px;
  background-color: #1c1d2c;
`;

const NoMatchesFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50% auto;
  .dialog__loader {
    transform: translateX(-50%);
  }
  img {
    width: 70px;
  }
  p {
    padding: 7px 15px 7px 15px;
    border-radius: 0.6em;
    background-color: #171823;
    text-align: center;
    color: #969696;
  }
`;

interface DialogsProps {
  dialogsItems: dialogsItem[];
  isLoading: boolean;
  user: User;
  onSelectDialogue: (id: string) => void;
}

export const Dialogs: React.FC<DialogsProps> = ({
  user,
  dialogsItems,
  onSelectDialogue,
  isLoading,
}) => {
  const setOnSelect = (dialogItem: dialogsItem) => {
    onSelectDialogue(dialogItem.id);
  };

  return (
    <DilagosStyles>
      {dialogsItems?.length > 0 ? (
        <>
          {dialogsItems.map((dialog) => (
            <DialogItem
              setOnSelect={setOnSelect}
              key={dialog.id}
              _id={dialog.id}
              author={user}
              dialog={dialog}
            />
          ))}
        </>
      ) : (
        <NoMatchesFound>
          {isLoading ? (
            <div className="dialog__loader">
              <Loader />
            </div>
          ) : (
            <>
              <svg
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M45.8208 45.8208L52.4999 39.1125L59.1791 45.8208L63.3208 41.6792L56.6124 35L63.3208 28.3208L59.1791 24.1792L52.4999 30.8875L45.8208 24.1792L41.6791 28.3208L48.3583 35L41.6791 41.6792L45.8208 45.8208ZM34.9999 23.3333C35.0358 21.7914 34.7586 20.2583 34.185 18.8265C33.6114 17.3948 32.7534 16.0944 31.6628 15.0038C30.5722 13.9132 29.2717 13.0551 27.84 12.4816C26.4083 11.908 24.8752 11.6307 23.3333 11.6667C21.7913 11.6307 20.2582 11.908 18.8265 12.4816C17.3948 13.0551 16.0943 13.9132 15.0037 15.0038C13.9131 16.0944 13.0551 17.3948 12.4815 18.8265C11.9079 20.2583 11.6307 21.7914 11.6666 23.3333C11.6307 24.8752 11.9079 26.4084 12.4815 27.8401C13.0551 29.2718 13.9131 30.5723 15.0037 31.6629C16.0943 32.7535 17.3948 33.6115 18.8265 34.1851C20.2582 34.7587 21.7913 35.0359 23.3333 35C24.8752 35.0359 26.4083 34.7587 27.84 34.1851C29.2717 33.6115 30.5722 32.7535 31.6628 31.6629C32.7534 30.5723 33.6114 29.2718 34.185 27.8401C34.7586 26.4084 35.0358 24.8752 34.9999 23.3333ZM17.4999 23.3333C17.4624 22.5574 17.5876 21.7821 17.8675 21.0574C18.1474 20.3327 18.5757 19.6745 19.1251 19.1252C19.6744 18.5758 20.3326 18.1475 21.0573 17.8676C21.782 17.5877 22.5573 17.4625 23.3333 17.5C24.1092 17.4625 24.8845 17.5877 25.6092 17.8676C26.3339 18.1475 26.9921 18.5758 27.5414 19.1252C28.0908 19.6745 28.5191 20.3327 28.799 21.0574C29.0789 21.7821 29.2041 22.5574 29.1666 23.3333C29.2041 24.1093 29.0789 24.8846 28.799 25.6093C28.5191 26.334 28.0908 26.9922 27.5414 27.5415C26.9921 28.0909 26.3339 28.5192 25.6092 28.7991C24.8845 29.079 24.1092 29.2042 23.3333 29.1667C22.5573 29.2042 21.782 29.079 21.0573 28.7991C20.3326 28.5192 19.6744 28.0909 19.1251 27.5415C18.5757 26.9922 18.1474 26.334 17.8675 25.6093C17.5876 24.8846 17.4624 24.1093 17.4999 23.3333V23.3333ZM11.6666 52.5C11.6666 50.1794 12.5885 47.9538 14.2294 46.3128C15.8703 44.6719 18.0959 43.75 20.4166 43.75H26.2499C28.5706 43.75 30.7962 44.6719 32.4371 46.3128C34.078 47.9538 34.9999 50.1794 34.9999 52.5V55.4167H40.8333V52.5C40.8333 50.5849 40.456 48.6885 39.7232 46.9192C38.9903 45.1499 37.9161 43.5422 36.5619 42.188C35.2077 40.8338 33.6001 39.7596 31.8307 39.0268C30.0614 38.2939 28.165 37.9167 26.2499 37.9167H20.4166C16.5488 37.9167 12.8395 39.4531 10.1046 42.188C7.36971 44.9229 5.83325 48.6323 5.83325 52.5V55.4167H11.6666V52.5Z"
                  fill="#969696"
                />
              </svg>

              <p>No matches found</p>
            </>
          )}
        </NoMatchesFound>
      )}
    </DilagosStyles>
  );
};

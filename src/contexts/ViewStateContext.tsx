import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { User, dialogsItem, messageItem } from "types";

type Props = {
  children: React.ReactNode;
};

type ViewState = {
  user: User;
  selectedDialogId?: string;
  selectedDialogIdToAddUser?: string;
  messages: Array<messageItem>;
  isMessagesLoading?: boolean;
  dialogs: Array<dialogsItem>;
  isDialogsLoading?: boolean;
  pageSize: number;
  offset: number;
  showCreateChatModal: boolean;
  showAddUserToChatModal: boolean;
};

export type ViewStateContextValue = {
  viewState: ViewState;
  updateViewState: Dispatch<SetStateAction<ViewState>>;
};

export const ViewStateContext =
  React.createContext<ViewStateContextValue>(null);

export const ViewStateProvider = (props: Props) => {
  const [viewState, setViewState] = useState<ViewState>({
    user: null,
    messages: [],
    dialogs: [],
    pageSize: 20,
    offset: 0,
    showCreateChatModal: false,
    showAddUserToChatModal: false,
  });

  const contextValue: ViewStateContextValue = useMemo(
    () => ({
      viewState,
      updateViewState: setViewState,
    }),
    [viewState]
  );

  return <ViewStateContext.Provider value={contextValue} {...props} />;
};

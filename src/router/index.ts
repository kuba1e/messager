import { Login } from "./../pages/Login";
import { ComponentType } from "react";
import { Main } from "../pages/Main";

export interface IRoute {
  path: string;
  component: ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  LOGIN = "/login",
  REGISTRATION = "/registration",
  CHATS = "/chats",
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, exact: true, component: Login },
  { path: RouteNames.REGISTRATION, exact: true, component: Login },
];

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.CHATS,
    exact: false,
    component: Main,
  },
];

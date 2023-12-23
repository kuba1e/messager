import { Navigate, Route, Routes } from "react-router-dom";
import { RouteNames, privateRoutes, publicRoutes } from "../router";
import { useContext } from "react";
import { ViewStateContext } from "contexts/ViewStateContext";
import { Main } from "pages/Main";
import { ChatBar } from "./ChatBar";
import { ViewImage } from "./ViewImage";
import { Login } from "pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRouter = () => {
  return (
    <Routes>
      <>
        <Route element={<ProtectedRoute />}>
          <Route
            key={RouteNames.CHATS}
            element={<Main />}
            path={RouteNames.CHATS}
          />
        </Route>
        <Route
          key={RouteNames.LOGIN}
          element={<Login />}
          path={RouteNames.LOGIN}
        />
        <Route
          key={RouteNames.REGISTRATION}
          element={<Login />}
          path={RouteNames.REGISTRATION}
        />
        <Route path="*" element={<Navigate to={RouteNames.LOGIN} />} />
      </>
    </Routes>
  );
};

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../views/Login";
import Messenger from "../views/Messenger";
import { getCredentialsFromLocalStorage } from "../utils/getCredentialsFromLocalStorage";
import { ROUTES } from "./routes";

const RouteWrapper: React.FC = () => {
  const credentials = getCredentialsFromLocalStorage();

  return (
    <Routes>
      <Route
        path={ROUTES.default}
        element={
          <Navigate
            to={
              credentials.idInstance && credentials.apiTokenInstance
                ? ROUTES.chats
                : ROUTES.login
            }
          />
        }
      />
      <Route path={ROUTES.login} element={<Login />} />
      <Route
        path={ROUTES.chats}
        element={
          credentials.idInstance && credentials.apiTokenInstance ? (
            <Messenger />
          ) : (
            <Navigate to={ROUTES.login} />
          )
        }
      />
      <Route
        path={ROUTES.chat}
        element={
          credentials.idInstance && credentials.apiTokenInstance ? (
            <Messenger />
          ) : (
            <Navigate to={ROUTES.login} />
          )
        }
      />
      <Route path={ROUTES.error} element={<Navigate to={ROUTES.chats} />} />
    </Routes>
  );
};

export default RouteWrapper;

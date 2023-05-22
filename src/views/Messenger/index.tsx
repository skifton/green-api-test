import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chat from "./Chat";
import { FormattedMessage } from "react-intl";
import Button from "../../components/Form/Button";
import Contacts from "./Contacts";
import clsx from "clsx";
import { ROUTES } from "../../routes/routes";

const Messenger: React.FC = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const selectChatHandler = (chatId: string) => {
    navigate(`/chats/${chatId}`);
  };

  const logoutHandler = () => {
    localStorage.removeItem("id-instance");
    localStorage.removeItem("api-token-instance");
    navigate(ROUTES.login);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex bg-white w-full mx-0 h-screen md:h-[calc(100vh-5rem)] md:mx-14">
        <Contacts selectChat={selectChatHandler} />

        {chatId ? (
          <Chat chatId={chatId} />
        ) : (
          <div
            className={clsx(
              "flex h-full w-full justify-center items-center hidden",
              {
                "md:flex": !chatId,
              }
            )}
          >
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <img
                  className="w-32 h-32"
                  src="https://green-api.com.kz/green-api-logo_2.png"
                  alt="Green API logo"
                />
              </div>
              <h1 className="text-3xl font-medium">
                <FormattedMessage id="CHAT.TITLE" />
              </h1>
              <p className="pb-10">
                <FormattedMessage id="CHAT.DESCRIPTION" />
              </p>

              <Button onClick={logoutHandler}>
                <FormattedMessage id="LOGOUT" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messenger;

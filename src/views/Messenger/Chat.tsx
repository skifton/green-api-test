import React, { useState } from "react";
import IconButton from "../../components/IconButton";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import CustomInput from "../../components/CustomInput";
import {
  sendMessage,
  useGetContactInfo,
  useGetMessages,
} from "../../services/green-api.services";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { getCredentialsFromLocalStorage } from "../../utils/getCredentialsFromLocalStorage";
import { useIntl } from "react-intl";
import { ROUTES } from "../../routes/routes";

interface IProps {
  chatId: string;
}

const Chat: React.FC<IProps> = ({ chatId }) => {
  const [message, setMessage] = useState<string>("");
  const intl = useIntl();
  const credentials = getCredentialsFromLocalStorage();
  const { messages } = useGetMessages(credentials, chatId);
  const navigate = useNavigate();
  const { contact } = useGetContactInfo(credentials, chatId);

  const closeChatHandler = () => {
    navigate(ROUTES.chats);
  };

  const changeMessageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const sendMessageHandler = async () => {
    await sendMessage(credentials, chatId, message);
    setMessage("");
  };

  return (
    <div
      className={clsx("relative w-full", {
        "md:hidden": !chatId,
      })}
    >
      <div className="flex justify-between h-16 bg-gray-200">
        <div className="flex h-full items-center space-x-6 mx-4">
          <img
            src={contact?.data.avatar}
            className={clsx("w-12 h-12 rounded-full", {
              hidden: !contact?.data.avatar,
            })}
            alt={`${contact?.data.name} avatar`}
          />
          <p className="text-xl font-medium text-center">
            {contact?.data.name}
          </p>
        </div>
        <div className="flex items-center h-full">
          <IconButton onClick={closeChatHandler}>
            <XMarkIcon className="w-10 h-10" />
          </IconButton>
        </div>
      </div>

      <div className="relative flex h-[calc(100vh-8rem)] overflow-y-auto md:h-[calc(100vh-13rem)]">
        <div className="absolute bottom-5 w-full space-y-2 mr-5">
          {messages?.map((mes: any) => {
            return (
              <div
                className={clsx("flex mx-5", {
                  "flex justify-end": mes.type === "outgoing",
                })}
              >
                <div className="text-right p-2 bg-green-300 rounded-lg max-w-96">
                  {mes.textMessage}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 w-full">
        <div className="flex justify-between w-full bg-gray-200 p-2 space-x-3">
          <div className="w-full">
            <CustomInput
              id={intl.formatMessage({ id: "INPUT.MESSAGE" })}
              placeholder={intl.formatMessage({
                id: "INPUT.MESSAGE.PLACEHOLDER",
              })}
              srLabel={intl.formatMessage({ id: "INPUT.MESSAGE" })}
              value={message}
              onChange={changeMessageHandler}
            />
          </div>
          <IconButton onClick={sendMessageHandler}>
            <PaperAirplaneIcon className="w-10 h-10 text-gray-700" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Chat;

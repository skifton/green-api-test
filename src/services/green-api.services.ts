import axios from "axios";
import { IAccountSettings, ILoginForm } from "../models/login.model";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IContact, IMessage } from "../models/chat.model";

const login = async (credentials: ILoginForm) => {
  return axios
    .get(
      `https://api.green-api.com/waInstance${credentials.idInstance}/GetSettings/${credentials.apiTokenInstance}`
    )
    .then((res) => {
      return { res: res.data, credentials };
    });
};

const getContacts = (credentials: ILoginForm) => {
  return axios
    .get(
      `https://api.green-api.com/waInstance${credentials.idInstance}/GetContacts/${credentials.apiTokenInstance}`
    )
    .then(async (res) => {
      const listOfContact = res.data;

      const contactPromises = listOfContact.map(
        async (contact: { id: string; name: string; type: string }) => {
          return axios
            .post(
              `https://api.green-api.com/waInstance${credentials.idInstance}/getContactInfo/${credentials.apiTokenInstance}`,
              {
                chatId: contact.id,
              }
            )
            .then((res) => res);
        }
      );

      const contactResponses = await Promise.all(contactPromises);
      const contactDetails = contactResponses.map((response) => response.data);

      return contactDetails as IContact[];
    });
};

const getMessages = (credentials: ILoginForm, chatId: string) => {
  return axios
    .post(
      `https://api.green-api.com/waInstance${credentials.idInstance}/GetChatHistory/${credentials.apiTokenInstance}`,
      {
        chatId,
      }
    )
    .then((res) => res.data.reverse() as IMessage[]);
};

export const useGetMessages = (credentials: ILoginForm, chatId: string) => {
  const {
    isLoading,
    error,
    data: messages,
  } = useQuery(["messages", credentials, chatId], () =>
    getMessages(credentials, chatId)
  );

  return {
    isLoading,
    error,
    messages,
  };
};

export const sendMessage = (
  credentials: ILoginForm,
  chatId: string,
  message: string
) => {
  return axios
    .post(
      `https://api.green-api.com/waInstance${credentials.idInstance}/SendMessage/${credentials.apiTokenInstance}`,
      {
        chatId,
        message,
      }
    )
    .then((res) => res.data);
};

const getContactInfo = async (credentials: ILoginForm, chatId: string) => {
  return axios
    .post(
      `https://api.green-api.com/waInstance${credentials.idInstance}/getContactInfo/${credentials.apiTokenInstance}`,
      {
        chatId,
      }
    )
    .then((res) => res);
};

export const useGetContactInfo = (credentials: ILoginForm, chatId: string) => {
  const {
    isLoading,
    error,
    data: contact,
  } = useQuery(["contact", credentials, chatId], () =>
    getContactInfo(credentials, chatId)
  );

  return {
    isLoading,
    error,
    contact,
  };
};

export const useGetContacts = (credentials: ILoginForm) => {
  const {
    isLoading,
    error,
    data: contacts,
  } = useQuery(["contacts", credentials], () => getContacts(credentials));

  return {
    isLoading,
    error,
    contacts,
  };
};

export const useLogin = (
  onSuccess?: ({
    res,
    credentials,
  }: {
    res: IAccountSettings;
    credentials: ILoginForm;
  }) => void,
  onError?: () => void
) => {
  return useMutation(
    (credentials: ILoginForm) => {
      return login(credentials);
    },
    {
      onSuccess: ({ res, credentials }) => {
        if (onSuccess)
          onSuccess({
            res,
            credentials,
          });
      },
      onError: () => {
        if (onError) onError();
      },
    }
  );
};

import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoginForm from "./LoginForm";
import { useForm } from "react-hook-form";
import { ILoginForm } from "../../models/login.model";
import { FormattedMessage, useIntl } from "react-intl";
import { useLogin } from "../../services/green-api.services";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

const Login: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const { mutate: login } = useLogin(
    (accountSettings) => {
      enqueueSnackbar(
        intl.formatMessage({ id: "SNACKBAR.SUCCESSFULLY_AUTH" }),
        {
          variant: "success",
        }
      );
      localStorage.setItem(
        "id-instance",
        accountSettings.credentials.idInstance
      );
      localStorage.setItem(
        "api-token-instance",
        accountSettings.credentials.apiTokenInstance
      );
      navigate(ROUTES.chats);
    },
    () => {
      enqueueSnackbar(
        intl.formatMessage({ id: "SNACKBAR.INCORRECT_CREDENTIALS" }),
        { variant: "error" }
      );
    }
  );

  const LoginFormSchema = yup.object({
    idInstance: yup
      .string()
      .required(intl.formatMessage({ id: "FORM.ID_INSTANCE.REQUIRED" })),
    apiTokenInstance: yup
      .string()
      .required(intl.formatMessage({ id: "FORM.API_TOKEN_INSTANCE.REQUIRED" })),
  });

  const useFormReturn = useForm<ILoginForm>({
    resolver: yupResolver(LoginFormSchema),
  });

  const submitLoginForm = (credentials: ILoginForm) => {
    login(credentials);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white w-max mx-auto px-10 py-14 space-y-10">
        <h1 className="text-2xl font-semibold text-center text-gray-600">
          <FormattedMessage id="LOGIN_TO_GREEN_API" />
        </h1>
        <LoginForm
          useFormInstance={useFormReturn}
          submitLoginForm={submitLoginForm}
        />
      </div>
    </div>
  );
};

export default Login;

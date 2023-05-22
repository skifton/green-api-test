import React from "react";
import Button from "../../components/Form/Button";
import { Controller, UseFormReturn } from "react-hook-form";
import { ILoginForm } from "../../models/login.model";
import { FormattedMessage } from "react-intl";
import Input from "../../components/Form/Input";

interface IProps {
  useFormInstance: UseFormReturn<ILoginForm>;
  submitLoginForm: (credentials: ILoginForm) => void;
}

const LoginForm: React.FC<IProps> = ({ useFormInstance, submitLoginForm }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useFormInstance;

  return (
    <form
      className="space-y-14 text-center"
      onSubmit={handleSubmit(submitLoginForm)}
    >
      <div className="space-y-6">
        <Controller
          name="idInstance"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChange={onChange}
              maxLength={30}
              placeholder="ID Instance"
              className="w-full"
              error={Boolean(errors.idInstance?.message)}
              helperText={errors.idInstance?.message}
            />
          )}
        />
        <Controller
          name="apiTokenInstance"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChange={onChange}
              placeholder="API Token Instance"
              className="w-full"
              wrapperClassName="text-center mb-10"
              error={Boolean(errors.apiTokenInstance?.message)}
              helperText={errors.apiTokenInstance?.message}
            />
          )}
        />
      </div>
      <Button type="submit">
        <FormattedMessage id="LOGIN" />
      </Button>
    </form>
  );
};

export default LoginForm;

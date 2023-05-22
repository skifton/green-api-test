export const getCredentialsFromLocalStorage = () => {
  return {
    idInstance: localStorage.getItem("id-instance")!,
    apiTokenInstance: localStorage.getItem("api-token-instance")!,
  };
};

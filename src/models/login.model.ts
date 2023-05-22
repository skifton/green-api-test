export interface ILoginForm {
  idInstance: string;
  apiTokenInstance: string;
}

export interface IAccountSettings {
  wid: string;
  countryInstance: string;
  typeAccount: string;
  webhookUrl: string;
  webhookUrlToken: string;
  delaySendMessagesMilliseconds: number;
  markIncomingMessagesReaded: string;
  markIncomingMessagesReadedOnReply: string;
  outgoingWebhook: string;
  outgoingMessageWebhook: string;
  stateWebhook: string;
  incomingWebhook: string;
  deviceWebhook: string;
  statusInstanceWebhook: string;
  sendFromUTC: string;
  sendToUTC: string;
}

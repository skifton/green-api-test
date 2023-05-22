export interface IContact {
  avatar: string;
  category: string;
  chatId: string;
  description: string;
  email: string;
  isArchive: string;
  isDisappearing: string;
  isMute: string;
  lastSeen: string;
  messageExpiration: string;
  muteExpiration: string;
  name: string;
}

export interface IMessage {
  type: string,
  idMessage: string,
  timestamp: number,
  typeMessage: string,
  chatId: string,
  textMessage: string,
  statusMessage: string,
  sendByApi: boolean
}

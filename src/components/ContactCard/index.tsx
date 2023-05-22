import React from "react";
import { IContact } from "../../models/chat.model";

interface IProps {
  contact: IContact;
  selectChat: (chatId: string) => void;
}

const ContactCard: React.FC<IProps> = ({ contact, selectChat }) => {
  const onClickByCard = () => {
    selectChat(contact.chatId);
  };

  return (
    <div
      className="flex w-full items-center space-x-5 p-2 hover:bg-gray-100 hover:cursor-pointer"
      onClick={onClickByCard}
    >
      <img
        className="w-10 h-10 rounded-full"
        src={
          contact.avatar === ""
            ? "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
            : contact.avatar
        }
        alt={`${contact.name} avatar`}
      />
      <p className="text-lg font-normal">{contact.name}</p>
    </div>
  );
};

export default ContactCard;

import React from "react";
import ContactCard from "../../components/ContactCard";
import { IContact } from "../../models/chat.model";

interface IProps {
  contacts: IContact[];
  selectChat: (chatId: string) => void;
}

const ContactList: React.FC<IProps> = ({ contacts, selectChat }) => {
  return (
    <div className="w-full">
      <ul className="overflow-y-auto scrollbar-hide h-screen md:h-[calc(100vh-10rem)]">
        {contacts?.map((contact) => (
          <li key={contact.chatId}>
            <ContactCard selectChat={selectChat} contact={contact} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;

import { IContact } from "../models/chat.model";

export const getFilteredContacts = (
  contacts: IContact[],
  debouncedSearchValue: string
) => {
  const filteredContacts = contacts?.filter((contact) =>
    contact.name.toLowerCase().includes(debouncedSearchValue.toLowerCase())
  );

  return filteredContacts;
};

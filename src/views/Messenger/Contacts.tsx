import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Loading from "../../components/Loading";
import { useGetContacts } from "../../services/green-api.services";
import { getCredentialsFromLocalStorage } from "../../utils/getCredentialsFromLocalStorage";
import useDebounce from "../../hooks/useDebounce";
import { getFilteredContacts } from "../../utils/getFilteredContacts";
import ContactList from "../../components/ContactList";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import clsx from "clsx";

interface IProps {
  selectChat: (chatId: string) => void;
}

const Contacts: React.FC<IProps> = ({ selectChat }) => {
  const [filter, setFilter] = useState<string>("");
  const { chatId } = useParams();
  const intl = useIntl();
  const { isLoading, contacts } = useGetContacts(
    getCredentialsFromLocalStorage()
  );

  const debouncedSearchValue = useDebounce(filter, 500);

  const filteredContacts = getFilteredContacts(contacts!, debouncedSearchValue);

  const changeFilterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div
      className={clsx(
        `${
          chatId ? "hidden" : "relative"
        } w-full border-r-2 border-gray-300 md:w-96`,
        {
          "md:block": chatId,
        }
      )}
    >
      <CustomInput
        id={intl.formatMessage({ id: "INPUT.SEARCH_CONTACT" })}
        wrapperClassName="p-2 bg-gray-200"
        placeholder={intl.formatMessage({
          id: "INPUT.SEARCH_CONTACT.PLACEHOLDER",
        })}
        srLabel={intl.formatMessage({ id: "INPUT.SEARCH_CONTACT" })}
        onChange={changeFilterHandler}
        value={filter}
        RightIcon={MagnifyingGlassIcon}
      />
      {!isLoading ? (
        <ContactList selectChat={selectChat} contacts={filteredContacts!} />
      ) : (
        <div className="flex h-screen justify-center items-center md:h-[calc(100vh-10rem)]">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Contacts;

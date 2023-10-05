import { createContext, useContext, useEffect, useMemo, useState } from "react";
import apiItems from "../api/items";
import { MessageContext } from "./Message";

export const SearchContext = createContext({
  results: [],
  setResults: () => {},
  limit: 48,
  setLimit: () => {},
  order_by: "id",
  setOrder_by: () => {},
  order: "desc",
  setOrder: () => {},
  offset: 0,
  setOffset: () => {},
  search: "items",
  setSearch: () => {},
  lastRequest: 0,
  searchIA: true,
  setSearchIA: () => {},
  hideSensitiveContent: true,
  setHideSensitiveContent: () => {},
});

export function SearchProvider({ children }) {
  const [results, setResults] = useState([]);

  const { message } = useContext(MessageContext);

  const [limit, setLimit] = useState(48);
  const [order_by, setOrder_by] = useState("id");
  const [order, setOrder] = useState("desc");
  const [offset, setOffset] = useState(0);

  const [searchIA, setSearchIA] = useState(true);
  const [hideSensitiveContent, setHideSensitiveContent] = useState(true);

  const [search, setSearch] = useState("items");

  const [lastRequest, setLastRequest] = useState(0);

  const getItems = async () => {
    try {
      const res = await apiItems.get(offset, limit, order_by, order);
      console.log(res.data);
      setResults(res.data.items);
    } catch (err) {
      message.catch(err, "Get items");
    }
  };

  const getItemsOrCollections = () => {
    setLastRequest(Date.now());
    if (search === "items") {
      getItems();
    } else {
      console.log("collections");
    }
  };

  useEffect(() => {
    getItemsOrCollections();
  }, [search]);

  return (
    <SearchContext.Provider
      value={{
        results,
        setResults,
        limit,
        setLimit,
        order_by,
        setOrder_by,
        order,
        setOrder,
        offset,
        setOffset,
        search,
        setSearch,
        lastRequest,
        searchIA,
        setSearchIA,
        hideSensitiveContent,
        setHideSensitiveContent,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

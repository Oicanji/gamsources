import { Typography, Space } from "antd";
import { useContext } from "react";
import { SearchContext } from "../../context/Search";

import "./search-results.styles.scss";
import { ItemsCards } from "../items-cards/ItemsCards";
import { SearchBar } from "../search-bar/SearchBar";

export function SearchResults() {
  const { results, search } = useContext(SearchContext);

  return (
    <>
      <SearchBar />
      <div className="container-show-results">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div className="item-result" key={index + "_result_col"}>
              {search == "items" ? (
                <ItemsCards data={result} />
              ) : (
                <Space direction="vertical">
                  <p>not implement</p>
                </Space>
              )}
            </div>
          ))): (
            <Typography.Paragraph
              style={{
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              No results found
            </Typography.Paragraph>
          )
          }
      </div>
    </>
  );
}

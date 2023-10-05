import { Col, Layout, Pagination, Row, Space } from "antd";
import { useContext } from "react";
import { SearchContext } from "../../context/Search";

import "./search-results.styles.scss";
import { ItemsCards } from "../items-cards/ItemsCards";
import { SearchBar } from "../search-bar/SearchBar";
export function SearchResults() {
  const { results, search } = useContext(SearchContext);

  return (
    <Layout className="container-results">
      <SearchBar />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ margin: "0" }}>
        {/* <Col className="gutter-row" span={6}>
          <div>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>col-6</div>
        </Col> */}
        {results.length > 0 &&
          results.map((result, index) => (
            <Col className="gutter-row" span={6} key={index + "_result_col"}>
              {search == "items" ? (
                <ItemsCards data={result} />
              ) : (
                <Space direction="vertical">
                  <p>not implement</p>
                </Space>
              )}
            </Col>
          ))}
      </Row>
      <Pagination
        defaultCurrent={1}
        total={50}
        style={{
          margin: "20px 20px",
        }}
      />
    </Layout>
  );
}

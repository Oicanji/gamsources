import React, { useContext, useEffect } from "react";
import { Button, Divider, Form, Select, Switch, Tooltip } from "antd";
import { SearchContext } from "../../context/Search";
import { ThemeContext } from "../../context/Theme";
import "./search-bar.styles.scss";

export function SearchBar() {
  const {
    order_by,
    setOrder_by,
    order,
    setOrder,
    searchIA,
    setSearchIA,
    hideSensitiveContent,
    setHideSensitiveContent,
  } = useContext(SearchContext);

  const { thisTheme } = useContext(ThemeContext);

  return (
    <div
      style={{
        marginTop: "20px",
        marginBottom: "20px",
        borderBottom: `1px solid ${thisTheme.token.colorPrimary}`,
      }}
    >
      <Form layout="horizontal" className="form-search">
        <Form.Item
          label="Order by"
          initialValue={order_by}
          name="order_by"
          style={{ paddingRight: "20px" }}
        >
          <Select onChange={(value) => setOrder_by(value)}>
            <Select.Option value="id">id</Select.Option>
            <Select.Option value="name">name</Select.Option>
            <Select.Option value="created_at">date created</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Order"
          initialValue={order}
          name="order"
          style={{ paddingRight: "20px" }}
        >
          <Select onChange={(value) => setOrder(value)}>
            <Select.Option value="desc">desc</Select.Option>
            <Select.Option value="asc">asc</Select.Option>
          </Select>
        </Form.Item>
        <Tooltip
          color={thisTheme.token.colorPrimary}
          title="AI creations are creations made by artificial intelligence."
        >
          <Form.Item
            label="AI creations"
            onChange={(value) => setSearchIA(value)}
            initialValue={searchIA}
            name="searchIA"
            style={{ paddingRight: "40px" }}
          >
            <Switch />
          </Form.Item>
        </Tooltip>
        <Tooltip
          color={thisTheme.token.colorPrimary}
          title="Sensitive content is any explicit content that is not suitable for all audiences. Examples violence, gore, sexual themes etc..."
        >
          <Form.Item
            label="Sensitive content"
            name="sensitiveContent"
            valuePropName="checked"
            initialValue={!hideSensitiveContent}
            style={{ paddingRight: "40px" }}
            onChange={(value) => setHideSensitiveContent(!value)}
          >
            <Switch />
          </Form.Item>
        </Tooltip>
        <Button
          ghost
          type="primary"
          htmlType="submit"
          onClick={() => window.location.reload()}
        >
          Search results...
        </Button>
      </Form>
    </div>
  );
}

import React, { useContext } from "react";
import {
  Checkbox,
  Col,
  Divider,
  Form,
  Row,
  Select,
  Tooltip,
  Typography,
} from "antd";
import { SearchContext } from "../../context/Search";
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

  return (
    <>
      <Divider />
      <Form layout="horizontal">
        <Row justify="center">
          <Col span={4}>
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
          </Col>
          <Col span={4}>
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
          </Col>
          <Col span={4}>
            <Form.Item
              label="IA creations"
              initialValue={searchIA}
              name="searchIA"
              style={{ paddingRight: "40px" }}
            >
              <Checkbox onChange={(value) => setSearchIA(value)}>
                Show?
              </Checkbox>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Tooltip title="Sensitive content is any explicit content that is not suitable for all audiences. Examples violence, gore, sexual themes etc...">
              <Form.Item
                label="Sensitive content"
                initialValue={!hideSensitiveContent}
                name="sensitiveContent"
              >
                <Checkbox
                  onChange={(hideSensitiveContent) =>
                    setHideSensitiveContent(!hideSensitiveContent)
                  }
                >
                  Show?
                </Checkbox>
              </Form.Item>
            </Tooltip>
          </Col>
        </Row>
      </Form>
    </>
  );
}

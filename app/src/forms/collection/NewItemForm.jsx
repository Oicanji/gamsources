import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/Theme";
import {
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Skeleton,
  Switch,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFileAudio,
  faFileCircleXmark,
  faFileText,
  faGear,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { attrNames, extraNames, typesFiles } from "../../types/items";
import { useParams } from "react-router";
import { ScriptFile } from "../../components/script-file/ScriptFile";

export function NewItemForm({ item, key, rewriteNewItem }) {
  const { thisTheme } = useContext(ThemeContext);
  const [itemForm] = Form.useForm();
  const { id } = useParams();

  const [type, setType] = useState(item.fileType.split("/")[0]);
  const [subtype, setSubtype] = useState(
    typesFiles[item.fileType.split("/")[0]][0]
  );

  const changeItem = () => {
    const values = itemForm.getFieldsValue();

    rewriteNewItem(item.id, {
      ...item,
      name: values.name ? values.name : null,
      sensitive_content: values.sensitive ? values.sensitive : false,
      is_ia: values.ia ? values.ia : false,
      type: values.type ? values.type : subtype,
      collection_id: id,
      source: null,
      ref: null,
      attr: values.attr && attrNames[subtype] ? values.attr : null,
      extra: values.extra && attrNames[subtype] ? values.extra : null,
    });
  };

  useEffect(() => {
    changeItem();
  }, [type, subtype]);

  return (
    <div
      key={key + "-card-new-item"}
      className="card-new-item"
      style={{
        backgroundColor: thisTheme.token.colorBgBase,
      }}
    >
      <span
        className="status-item"
        style={{ color: thisTheme.token.colorPrimary }}
      >
        + new item
      </span>

      <Row>
        <Col span={8}>
          <Divider
            orientation="left"
            style={{ color: thisTheme.token.colorPrimary }}
          >
            <FontAwesomeIcon icon={faFile} /> Item {item.fileParams.name}
          </Divider>
          {type == "image" ? (
            !item.noOpen ? (
              <img
                height="200px"
                alt="preview"
                src={item.file}
                className="image-preview"
              />
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faImage}
                  style={{
                    fontSize: "100px",
                    margin: "20px",
                  }}
                />
                <br />
                <span>
                  This file is not supported to preview, but the user can
                  download it
                </span>
                <br />
              </>
            )
          ) : type == "audio" ? (
            !item.noOpen ? (
              <audio controls style={{ marginTop: "60px" }}>
                <source src={item.file} type={item.fileParams.type} />
              </audio>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faFileAudio}
                  style={{
                    fontSize: "100px",
                    margin: "20px",
                  }}
                />
                <br />
                <span>
                  This file is not supported to preview, but the user can
                  download it
                </span>
                <br />
              </>
            )
          ) : type == "text" ? (
            !item.noOpen ? (
              subtype == "code" ? (
                <ScriptFile data={item.file} />
              ) : (
                <iframe
                  src={item.file}
                  style={{ width: "100%", height: "200px" }}
                ></iframe>
              )
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faFileText}
                  style={{
                    fontSize: "100px",
                    margin: "20px",
                  }}
                />
                <br />
                <span>
                  This file is not supported to preview, but the user can
                  download it
                </span>
                <br />
              </>
            )
          ) : (
            <span>
              <FontAwesomeIcon
                icon={faFileCircleXmark}
                style={{
                  fontSize: "100px",
                  margin: "20px",
                }}
              />
            </span>
          )}
          <br />
          {type.toUpperCase().slice(0, 1) + type.slice(1)} file preview
        </Col>
        <Col
          span={16}
          style={{
            padding: "0 20px",
          }}
        >
          <Divider
            orientation="left"
            style={{ color: thisTheme.token.colorPrimary }}
          >
            <FontAwesomeIcon icon={faGear} /> Item Params
          </Divider>
          <Form
            form={itemForm}
            onValuesChange={changeItem}
            style={{ width: "100%" }}
          >
            <Row>
              <Col span={12}>
                <Form.Item label="Name" name="name">
                  <Input />
                </Form.Item>
                <Row
                  justify={"space-between"}
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                  }}
                >
                  <Col>
                    <Form.Item
                      label="Is sensitive content"
                      name="sensitive"
                      style={{ textAlign: "left" }}
                      defaultValue={false}
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label="Created by Artificial Intelligence"
                      name="ia"
                      style={{ textAlign: "left" }}
                      defaultValue={false}
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label="Credit" name="credit" initialValue={0}>
                  <Select>
                    <Select.Option value={0} key={0}>
                      Created by &#123;name&#125;, under the rights license CC
                      BY 4.0, all rights reserved
                    </Select.Option>
                    <Select.Option value={1} key={1}>
                      All rights reserved to &#123;source&#125;
                    </Select.Option>
                  </Select>
                </Form.Item>

                {type != "" && (
                  <Form.Item
                    label="Type"
                    name="type"
                    initialValue={typesFiles[type][0]}
                    onChange={(e) => {
                      setSubtype(e.target.value);
                    }}
                  >
                    {type == "image" && (
                      <Radio.Group>
                        {typesFiles.image.map((type, index) => (
                          <Radio key={index + "-radio-type"} value={type}>
                            {type}
                          </Radio>
                        ))}
                      </Radio.Group>
                    )}
                    {type == "audio" && (
                      <Radio.Group>
                        {typesFiles.audio.map((type, index) => (
                          <Radio key={index + "-radio-type"} value={type}>
                            {type}
                          </Radio>
                        ))}
                      </Radio.Group>
                    )}
                    {type == "text" && (
                      <Radio.Group>
                        {typesFiles.text.map((type, index) => (
                          <Radio key={index + "-radio-type"} value={type}>
                            {type}
                          </Radio>
                        ))}
                      </Radio.Group>
                    )}
                  </Form.Item>
                )}
              </Col>
              <Col
                span={12}
                style={{
                  paddingLeft: "40px",
                }}
              >
                {attrNames[subtype] ? (
                  <>
                    <Form.Item
                      label={attrNames[subtype].name}
                      name="attr"
                      style={{
                        textAlign: "left",
                      }}
                    >
                      {attrNames[subtype].input == "turnOnOff" ? (
                        <Switch />
                      ) : (
                        <Input />
                      )}
                    </Form.Item>
                    {extraNames[subtype] && (
                      <Form.Item
                        label={extraNames[subtype].name}
                        name="extra"
                        style={{
                          textAlign: "left",
                        }}
                        rules={[
                          {
                            pattern: new RegExp(
                              extraNames[subtype].type === "grid"
                                ? /^\d+x\d+$/
                                : ".*"
                            ),
                            message: "The format is not valid",
                          },
                        ]}
                      >
                        {extraNames[subtype].input == "grid" ? (
                          <Input />
                        ) : (
                          <Input />
                        )}
                      </Form.Item>
                    )}
                  </>
                ) : (
                  <Skeleton title={false} paragraph={{ rows: 6 }} />
                )}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

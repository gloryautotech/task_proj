import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Divider, Button, Select, Input } from "antd";

function DynamicField() {
  return (
    <Form.List name="fields">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Divider>Field {index + 1}</Divider>
                <Form.Item
                  name={[index]}
                  label="Option"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter your Option" />
                </Form.Item>

                {fields.length > 1 ? (
                  <Button
                    type="danger"
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                    icon={<MinusCircleOutlined />}
                  >
                    Remove Above Option
                  </Button>
                ) : null}
              </div>
            ))}
            <Divider />
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "60%" }}
              >
                <PlusOutlined /> Add Option
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
}

export default DynamicField;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, message } from "antd";
import {
  createAuthorRequest,
  updateAuthorRequest,
} from "../../redux/slices/authorsSlice";
import { RootState } from "../../redux/store";
import { Author } from "../../types";

interface AuthorFormProps {
  onSuccess: () => void;
  formFor?: Author;
  updateMode?: boolean;
}

const AuthorForm: React.FC<AuthorFormProps> = ({
  onSuccess,
  formFor,
  updateMode = false,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { loading } = useSelector((state: RootState) => state.authors);

  useEffect(() => {
    form.setFieldsValue(formFor);
  }, [form, formFor]);

  const onFinish = (values: any) => {
    updateMode
      ? dispatch(updateAuthorRequest({ ...formFor, ...values }))
      : dispatch(createAuthorRequest(values));
    message.success(
      `Author ${updateMode ? "updated" : "created"} successfully`
    );
    onSuccess();
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter author name" }]}
      >
        <Input placeholder="Enter author name" />
      </Form.Item>

      <Form.Item label="Bio" name="bio">
        <Input.TextArea placeholder="Enter author bio" rows={4} />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading} block>
        {updateMode ? "Update Author" : "Create Author"}
      </Button>
    </Form>
  );
};

export default AuthorForm;

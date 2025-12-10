import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, message } from "antd";
import { createUserRequest } from "../../redux/slices/usersSlice";
import { RootState } from "../../redux/store";

interface UserFormProps {
  onSuccess: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { loading } = useSelector((state: RootState) => state.users);

  const onFinish = (values: any) => {
    dispatch(createUserRequest(values) as any);
    message.success("User created successfully");
    form.resetFields();
    onSuccess();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter user name" }]}
      >
        <Input placeholder="Enter user name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input placeholder="Enter email" />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading} block>
        Create User
      </Button>
    </Form>
  );
};

export default UserForm;

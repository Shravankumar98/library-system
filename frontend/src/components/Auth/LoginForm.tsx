import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Card, message } from "antd";
import { loginRequest } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";
import styles from "./LoginForm.module.css";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [form] = Form.useForm();

  const onFinish = (values: LoginFormValues) => {
    dispatch(loginRequest(values) as any);
  };

  React.useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  return (
    <div className={styles.container}>
      <Card className={styles.card} title="Library Management System - Login">
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
          >
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;

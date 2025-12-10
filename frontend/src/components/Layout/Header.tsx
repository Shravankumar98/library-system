import React from "react";
import { Layout, Space, Dropdown, Avatar } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";
import styles from "./Header.module.css";
import { MenuItemType } from "antd/es/menu/interface";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const userMenuItems: MenuItemType[] = [
    {
      key: "profile",
      label: `${user?.name} (${user?.email})`,
      disabled: true,
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Header className={styles.header}>
      <div className={styles.logo}>
        <h1 className={styles.title}>📚 Library Management</h1>
      </div>
      <Space>
        {user && (
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Avatar
              style={{ backgroundColor: "#018790", cursor: "pointer" }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        )}
      </Space>
    </Header>
  );
};

export default AppHeader;

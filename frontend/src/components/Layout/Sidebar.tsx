import React from "react";
import { Layout, Menu } from "antd";
import {
  BookOutlined,
  UserOutlined,
  TeamOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import styles from "./Sidebar.module.css";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  currentPage: string;
  onMenuClick: (key: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  currentPage,
  onMenuClick,
}) => {
  const menuItems = [
    {
      key: "books",
      icon: <BookOutlined />,
      label: "Books",
    },
    {
      key: "authors",
      icon: <TeamOutlined />,
      label: "Authors",
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: "Users",
    },
    {
      key: "borrowed",
      icon: <SwapOutlined />,
      label: "My Borrowed Books",
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className={styles.sider}
      theme="light"
      width={200}
    >
      <Menu
        mode="inline"
        selectedKeys={[currentPage]}
        onClick={(e) => onMenuClick(e.key)}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;

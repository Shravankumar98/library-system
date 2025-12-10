import React, { useState } from "react";
import { Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import AppHeader from "./Header";
import Sidebar from "./Sidebar";
import styles from "./MainLayout.module.css";

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onMenuClick: (key: string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  currentPage,
  onMenuClick,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className={styles.layout}>
      <AppHeader />
      <Layout className={styles.bodyLayout}>
        <Sidebar
          collapsed={collapsed}
          currentPage={currentPage}
          onMenuClick={onMenuClick}
        />
        <Layout>
          <Content className={styles.content}>
            <div className={styles.toggleButton} onClick={toggleCollapsed}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

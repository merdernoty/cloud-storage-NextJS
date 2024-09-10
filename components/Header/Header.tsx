"use client";
import { Avatar, Button, Layout, Menu, Popover } from "antd";
import React from "react";
import styles from "@/styles/Header.module.scss";
import { CloudOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import * as Api from "@/api";

export const Header: React.FC = () => {
  const router = useRouter();
  const [currentPath, setCurrentPath] = React.useState<string>("");

  React.useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  if (currentPath === "/dashboard/auth") {
    return null;
  }

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      Api.auth.logout();
      location.href = "/";
    }
  };

  return (
    <Layout.Header className={styles.root}>
      <div className={styles.headerInner}>
        <div className={styles.headerLeft}>
          <h2>
            <CloudOutlined />
            Cloud Storage
          </h2>
          <Menu
            className={styles.topMenu}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[currentPath]}
            onSelect={({ key }) => router.push(key)}
            items={[
              { key: "/dashboard", label: "Главная" },
              { key: "/dashboard/profile", label: "Профиль" },
            ]}
          ></Menu>
        </div>
        <div className={styles.headerRight}>
          <Popover
            trigger={"click"}
            content={
              <Button onClick={onClickLogout} type="primary">
                Выйти
              </Button>
            }
          >
            <Avatar>A</Avatar>
          </Popover>
        </div>
      </div>
    </Layout.Header>
  );
};

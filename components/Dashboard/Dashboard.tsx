"use client";
import React from "react";
import styles from "@/styles/Home.module.scss";
import { Menu, notification } from "antd";
import { useRouter } from "next/navigation";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileOutlined,
} from "@ant-design/icons";
import UploadButton from "../UploadButton/UploadButton";
import nookies from "nookies";
import axios from "@/core/axios";
import * as Api from "@/api";
import { FileItem } from "@/api/dto/files.dto";
import { FileType } from "@/api/files";

import Files from "@/modules/Files";

interface DashboardProps {
  type: FileType;
}

const Dashboard: React.FC<DashboardProps> = ({ type }) => {
  const router = useRouter();
  const [currentPath, setCurrentPath] = React.useState<string>("");
  const [items, setItems] = React.useState<FileItem[]>([]);
  React.useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  React.useEffect(() => {
    const fetchFiles = async () => {
      try {
        const cookies = nookies.get(null);
        const token = cookies._token;

        if (token) {
          axios.defaults.headers.Authorization = `Bearer ${token}`;
          const items = await Api.files.getAll(type);
          setItems(items);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        notification.error({
          message: "Ошибка",
          description: "Не получилось получить файлы",
          duration: 2,
        });
      }
    };

    fetchFiles();
  }, []);

  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <UploadButton></UploadButton>
        <Menu
          className={styles.menu}
          mode="inline"
          defaultSelectedKeys={[currentPath]}
          onSelect={({ key }) => router.push(key)}
          items={[
            { key: "/dashboard", label: "Файлы", icon: <FileOutlined /> },
            {
              key: "/dashboard/photos",
              label: "Фото",
              icon: <FileImageOutlined />,
            },
            {
              key: "/dashboard/trash",
              icon: <DeleteOutlined />,
              label: "Корзина",
            },
          ]}
        />
      </div>
      <div className="container">
        <Files items={items} withActions={type !== "trash"} />
      </div>
    </main>
  );
};

export default Dashboard;

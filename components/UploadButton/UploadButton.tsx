import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, notification, Upload, UploadFile } from "antd";
import React from "react";
import styles from "@/styles/Home.module.scss";
import nookies from "nookies";
import axios from "@/core/axios";
import * as Api from "@/api";

const UploadButton: React.FC = () => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const onUploadSuccess = async (options: any) => {
    try {
      const cookies = nookies.get(null);
      const token = cookies._token;
      if (token) {
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        const file = await Api.files.uploadFile(options);
        setFileList([])
        window.location.reload()
      }
    } catch (error) {
      notification.error({
        message: "Ошибка!",
        description: "Не удалось загрузить файл",
        duration: 2,
      });
    }
  };

  return (
    <Upload
      customRequest={onUploadSuccess}
      fileList={fileList}
      onChange={({ fileList }) => setFileList(fileList)}
      className={styles.upload}
    >
      <Button type="primary" icon={<CloudUploadOutlined />} size="large">
        Загрузить Файл
      </Button>
    </Upload>
  );
};

export default UploadButton;

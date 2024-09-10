import React from "react";
import styles from "@/styles/FileActions.module.scss";
import { Button, Popconfirm } from "antd";
interface FileActionsProps {
  onClickRemove: VoidFunction;
  onClickShare: VoidFunction;
  isActive: boolean;
}

export const FileActions: React.FC<FileActionsProps> = ({
  onClickRemove,
  onClickShare,
  isActive,
}) => {
  return (
    <div className={styles.root}>
      <Button onClick={onClickShare}>Поделиться</Button>
      <Popconfirm
        title="Удалить файл(ы)?"
        description="Вск файлы будут перемещены в корзину"
        okText="Да"
        cancelText="Нет"
        disabled={!isActive}
        onConfirm={onClickRemove}
      >
        <Button type="primary" disabled={!isActive} danger>
          Удалить
        </Button>
      </Popconfirm>
    </div>
  );
};

export default FileActions;

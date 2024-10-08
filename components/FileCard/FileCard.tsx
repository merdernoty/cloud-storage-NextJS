import React from "react";
import styles from "@/styles/FileCard.module.scss";
import { getExtensionFromFileName } from "@/utils/getExtensionFromFileName";
import { isImage } from "@/utils/isImage";
import { getColorByExtension } from "@/utils/getColorByExtension";
import { FileTextOutlined } from "@ant-design/icons";

interface FileCardProps {
  filename: string;
  originalName: string;
}

const FileCard: React.FC<FileCardProps> = ({ originalName, filename }) => {
  const ext = getExtensionFromFileName(filename);
  const imageUrl =
    ext && isImage(ext) ? `http://localhost:5000/uploads/` + filename : "";
  const color = getColorByExtension(ext);
  const classColor = styles[color];
  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <i className={classColor}>{ext}</i>
        {isImage(ext) ? (
          <img className={styles.image} src={imageUrl} alt="File"></img>
        ) : (
          <FileTextOutlined></FileTextOutlined>
        )}
      </div>
      <span>{originalName}</span>
    </div>
  );
};

export default FileCard;

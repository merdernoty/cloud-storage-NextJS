import { FileItem } from "@/api/dto/files.dto";
import FileActions from "@/components/FileActions/FileActions";
import { FileSelectType, FileList } from "@/components/FileList/FileList";
import { Empty } from "antd";
import React from "react";
import * as Api from "@/api";

interface FilesProps {
  items: FileItem[];
  withActions?: boolean;
}

const Files: React.FC<FilesProps> = ({ items, withActions }) => {
  const [files, setFiles] = React.useState<FileItem[]>([]);
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);

  React.useEffect(() => {
    setFiles(items);
  }, [items]);

  const onFileSelect = (id: number, type: FileSelectType) => {
    if (type === "select") {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((_id) => _id !== id));
    }
  };

  const onClickRemove = () => {
    setSelectedIds([]);
    setFiles((prev) => prev.filter((file) => !selectedIds.includes(file.id)));
    Api.files.remove(selectedIds);
  };

  const onClickShare = () => {
    alert("Вы поделились");
  };

  return (
    <div>
      {files.length ? (
        <>
          {withActions && (
            <FileActions
              onClickRemove={onClickRemove}
              onClickShare={onClickShare}
              isActive={selectedIds.length > 0}
            />
          )}
          <FileList items={files} onFileSelect={onFileSelect} />
        </>
      ) : (
        <Empty className="empty-block" description="Список файлов пуст" />
      )}
    </div>
  );
};

export default Files;

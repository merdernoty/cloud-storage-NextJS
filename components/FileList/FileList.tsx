import React, { useRef } from "react";
import styles from "@/styles/FileList.module.scss";
import { FileItem } from "@/api/dto/files.dto";
import FileCard from "@/components/FileCard/FileCard";
import Selecto from "react-selecto";

export type FileSelectType = "select" | "unselect";

interface FileListProps {
  items: FileItem[];
  onFileSelect: (id: number, type: FileSelectType) => void;
}

export const FileList: React.FC<FileListProps> = ({ items, onFileSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div className={styles.root}>
      {items.map((item) => (
        <div
          ref={containerRef}
          data-id={item.id}
          key={item.id}
          className="file"
        >
          <FileCard filename={item.filename} originalName={item.originalName} />
        </div>
      ))}

      <Selecto
        container={containerRef.current}
        selectableTargets={[".file"]}
        selectByClick
        hitRate={10}
        selectFromInside
        toggleContinueSelect={["shift"]}
        continueSelect={false}
        onSelect={(e) => {
          e.added.forEach((el) => {
            el.classList.add("active");
            onFileSelect(Number(el.dataset["id"]), "select");
          });
          e.removed.forEach((el) => {
            el.classList.remove("active");
            onFileSelect(Number(el.dataset["id"]), "unselect");
          });
        }}
      />
    </div>
  );
};

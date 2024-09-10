import Dashboard from "@/components/Dashboard/Dashboard";
import React from "react";
import styles from "@/styles/Auth.module.scss";
const Page = () => {
  return (
    <div className={styles.formBlock}>
      <Dashboard type="photos" />
    </div>
  );
};

export default Page;

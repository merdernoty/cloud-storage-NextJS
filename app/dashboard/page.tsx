import React from "react";
import Dashboard from "@/components/Dashboard/Dashboard";
import styles from "@/styles/Auth.module.scss";
export const page = async () => {
  return (
    <div className={styles.formBlock}>
      <Dashboard type="all"></Dashboard>
    </div>
  );
};

export default page;

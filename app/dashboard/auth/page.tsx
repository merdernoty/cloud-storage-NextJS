import { LoginForm } from "@/components/auth/LoginForm";
import RegisterFrom from "@/components/auth/RegisterFrom";
import { Tabs } from "antd";
import Head from "next/head";
import React from "react";

function page() {
  return (
    <>
      <Head>
        <title>Dashboard / Auth</title>
      </Head>
      <main style={{ width: 400, margin: "50px auto" }}>
        <Tabs
          items={[
            {
              label: "Войти",
              key: "1",
              children: <LoginForm />,
            },
            {
              label: "Регистрация",
              key: "2",
              children: <RegisterFrom />,
            },
          ]}
        ></Tabs>
      </main>
    </>
  );
}

export default page;

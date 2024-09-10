"use client";
import React from "react";
import { setCookie } from "nookies";
import styles from "@/styles/Auth.module.scss";
import { Button, Form, Input, notification } from "antd";
import { LoginFormDTO } from "@/api/dto/auth.dto";

import * as Api from "@/api";

export const LoginForm: React.FC = ({}) => {
  const onSubmit = async (values: LoginFormDTO) => {
    try {
      const { token } = await Api.auth.login(values);
      notification.success({
        message: "Успешный вход",
        description: "Переходим в админ панель",
        duration: 2,
      });

      setCookie(null, "_token", token, {
        path: "/",
        maxAge: 3600 * 24, // 1 day
      });
      location.href = "/dashboard";
    } catch (error) {
      console.warn("LoginForm", error);
      notification.error({
        message: "Ошибка",
        description: "Неверный Логин или Пароль",
        duration: 2,
      });
    }
  };

  return (
    <div className={styles.formBlock}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              required: true,
              message: "Укажите почту",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Укажите пароль",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

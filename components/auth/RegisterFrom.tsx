"use client";
import React from "react";
import styles from "@/styles/Auth.module.scss";
import { Button, Form, Input, notification } from "antd";

import * as Api from "@/api";
import { RegisterFromDTO } from "@/api/dto/auth.dto";
import { setCookie } from "nookies";

const RegisterFrom = () => {
  const onSubmit = async (values: RegisterFromDTO) => {
    try {
      const { token } = await Api.auth.register(values);
      notification.success({
        message: "Вы успешно зарегистрировались",
        description: "Переходим в админ панель",
        duration: 2,
      });
      setCookie(null, "_token", token, {
        path: "/",
        maxAge: 3600 * 24, // 1 day
      });
      location.href = "/dashboard";
    } catch (error) {
      console.warn(error);
      notification.success({
        message: "Ошибка",
        description: "Ошибка регистрации",
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
          label="Fullname"
          name="fullname"
          rules={[
            {
              required: true,
              message: "Укажите имя пользывателя",
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
            Регистрация
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterFrom;

"use client";
import React from "react";
import profile from "@/styles/Profile.module.scss";
import styles from "@/styles/Auth.module.scss";
import { User } from "@/api/dto/auth.dto";
import { Button, notification } from "antd";
import nookies from "nookies";
import * as Api from "@/api";
import axios from "@/core/axios";
export const Profile = () => {
  const [user, setUser] = React.useState<User | null>(null);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      Api.auth.logout();
      location.href = "/";
    }
  }

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const cookies = nookies.get(null);
        const token = cookies._token;

        if (token) {
          axios.defaults.headers.Authorization = `Bearer ${token}`;
          const userData = await Api.auth.getMe();
          setUser(userData);
        } else {
          throw new Error("Токен не найден");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        notification.error({
          message: "Ошибка",
          description: "Не удалось получить данные о пользователе",
          duration: 2,
        });
      }
    };

    fetchUser();
  }, []);
  return (
    <main>
      <div className={styles.formBlock}>
        <div className={profile.root}>
          <h1>Мой профиль</h1>
          <br />
          {user ? (
            <>
              {" "}
              <p>
                ID: <b>{user.id}</b>
              </p>
              <p>
                Полное имя: <b>{user.fullname}</b>
              </p>
              <p>
                E-mail: <b>{user.fullname}</b>
              </p>
              <br />
              <Button onClick={onClickLogout} type="primary" danger>
                Выйти
              </Button>
            </>
          ) : (
            <p>Загрузка данных...</p>
          )}
        </div>
      </div>
    </main>
  );
};

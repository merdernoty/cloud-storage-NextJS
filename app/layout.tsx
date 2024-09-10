import type { Metadata } from "next";
import "./globals.css";
import styles from "@/styles/Home.module.scss";
import { Header } from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Cloud-storage",
  description: "Store your data here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <Header />
          <main className={styles.main}>{children}</main>
        </div>
      </body>
    </html>
  );
}

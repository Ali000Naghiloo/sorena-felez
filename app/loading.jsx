import Image from "next/image";
import React from "react";
import logo from "@/public/assets/logo.png";
import styles from "@/app/loading.module.css";

export default function Loading() {
  return (
    <>
      <div className="w-full h-[80vh] bg-white flex justify-center items-center flex-col">
        <Image
          src={logo}
          alt="logo"
          width={400}
          height={100}
          className="w-[400px]"
        />

        <div className={styles.loader}></div>
      </div>
    </>
  );
}

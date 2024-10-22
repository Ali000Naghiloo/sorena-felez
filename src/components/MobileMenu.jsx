"use client";
import { Button, Drawer, Menu } from "antd";
import React, { useState, useEffect } from "react";
import useWindowSize from "../hooks/useClientWidth";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import background from "@/public/assets/menu-background.svg";
import { FaPhoneVolume } from "react-icons/fa6";

export default function MobileMenu({ categories }) {
  // menu open toggle
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowSize();

  const handleSideMenu = async () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {}, []);

  if (width && width < 1000) {
    return (
      <>
        <div className="w-screen flex justify-center items-center fixed left-0 bottom-0 z-50 text-white h-[55px]">
          <div className="w-full flex z-10">
            <Button
              onClick={handleSideMenu}
              type="text"
              className="!text-white !text-lg flex"
            >
              <RxHamburgerMenu />
              <span>منوی اصلی</span>
            </Button>
          </div>

          {/* tel */}
          <a
            href={`tel:0211111`}
            target="_blank"
            className="absolute top-[-10px] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          >
            <Button
              className="animate-pulse !w-[60px] !h-[60px] flex items-center justify-center !rounded-full !bg-green-500 p-0 "
              type="primary"
            >
              <FaPhoneVolume style={{ width: "60px", height: "60px" }} />
            </Button>
          </a>

          <div className="w-full h-full absolute bottom-0 left-0 z-0">
            <Image
              src={background}
              alt=""
              width={600}
              height={50}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <Drawer
          open={isOpen}
          onClose={handleSideMenu}
          title={
            <h2 className="w-full text-left text-2xl">گروه صنعتی سپنتا</h2>
          }
        >
          <Menu items={categories} mode="inline" />
        </Drawer>
      </>
    );
  }
}

"use client";
import React from "react";
import logo from "@/src/assets/logo.png";
import Image from "next/image";
import { FaAngleLeft, FaPhone } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      <div className="w-full flex flex-col gap-10 max-w-[1600px]">
        <div className="w-full flex flex-wrap justify-between gap-5 border-t pt-20 mt-20 px-10">
          {/* descriptions */}
          <div className="flex flex-col w-full lg:w-[30%]">
            {/* logo */}
            <div className="w-auto max-w-[150px] h-[55px]">
              <Image src={logo} alt="logo" className="w-fit h-fit" />
            </div>

            <span className="w-full text-justify">
              آهن پرایس برای تسهیل معاملات و مبادلات بازار آهن آلات ایران و به
              عنوان مرجعی برای اطلاع رسانی قیمت آهن و... در صنعت اهن راه اندازی
              شده است. قیمت آهن و همچنین تحلیل و بررسی اخبار بازار آهن و فولاد
              کشور به صورت روزانه و فروش آهن آلات ساختمانی و صنعتی با تضمین قیمت
              و کیفیت از جمله فعالیت های مجموعه آهن پرایس می باشد. با توجه به
              سابقه دراز مدت و نمایندگی های رسمی اخذ شده و تیم های حرفه ای، در
              آهن پرایس بر این تلاشیم تا رضایت حداکثری مشتریان را کسب کنیم.
            </span>
          </div>

          {/*  */}
          <div className="flex flex-col gap-5">
            <span className="text-3xl">دسترسی سریع</span>

            <div className="">
              <div className="flex gap-3">
                <FaAngleLeft /> قیمت روز تیرآهن
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <span className="text-3xl">اطلاعات تماس</span>

            <div className="flex flex-col">
              <div className="flex items-center gap-5">
                <FaPhone className="text-accent rotate-[270deg] text-2xl" />

                <div className="flex flex-col">
                  <span className="text-lg">تلفن</span>
                  <span>02154103</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* tag */}
        <div className="w-full p-5 text-center border-t">
          تمامی حقوق این سایت متعلق به{" "}
          <span className="font-bold">شرکت حامی آلیاژ آسیا</span> می باشد
        </div>
      </div>
    </>
  );
}

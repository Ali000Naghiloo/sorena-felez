import React from "react";
import logo from "@/public/assets/logo.png";
import Image from "next/image";
import {
  FaAngleLeft,
  FaLinkedin,
  FaLocationArrow,
  FaPhone,
  FaTelegram,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
  const links = [
    { name: "تلگرام", logo: <FaTelegram size={"1.2em"} /> },
    { name: "اینستاگرام", logo: <AiFillInstagram size={"1.2em"} /> },
    { name: "لینکدین", logo: <FaLinkedin size={"1.2em"} /> },
    { name: "X", logo: <BsTwitterX size={"1.2em"} /> },
  ];

  const details = [
    {
      title: "تلفن",
      value: "02166676666",
      logo: <FaPhone className="text-accent rotate-[270deg] text-2xl" />,
    },
    {
      title: "کانال تلگرام:",
      value: "t.me/SEPANTA_TEHRAN",
      logo: <FaTelegram className="text-accent text-2xl" />,
    },
    {
      title: "ایمیل:",
      value: "info@SEPANTA-TEHRAN.com",
      logo: <MdEmail className="text-accent text-2xl" />,
    },
    {
      title: "ادرس:",
      value: "تهران، بازار آهن شادآباد بلوار مدائن ساختمان آهن 2",
      logo: <FaLocationArrow className="text-accent text-2xl" />,
    },
  ];

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center gap-10 mx-auto bg-white text-black">
        <div className="w-full flex flex-wrap justify-between gap-5 border-t pt-20 px-10 max-w-[1300px]">
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

            {/* links */}
            <div className="w-full flex gap-5 my-5">
              {links.map((li) => (
                <div className="hover:text-accent text-gray-400" key={li.name}>
                  {li.logo}
                </div>
              ))}
            </div>
          </div>

          {/* quick access */}
          <div className="flex flex-col gap-5">
            <span className="text-3xl">دسترسی سریع</span>

            <div className="">
              <div className="flex gap-3 hover:text-accent cursor-pointer">
                <FaAngleLeft /> قیمت روز تیرآهن
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <span className="text-3xl">اطلاعات تماس</span>

            <div className="flex flex-col gap-2">
              {details.map((d) => (
                <div key={d.title} className="flex items-center gap-5">
                  {d.logo}

                  <div className="flex flex-col">
                    <span className="text-lg">{d.title}</span>
                    <span>{d.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* tag */}
        <div className="w-full p-5 text-center border-t max-w-[1600px]">
          تمامی حقوق این سایت متعلق به{" "}
          <span className="font-bold">شرکت حامی آلیاژ آسیا</span> می باشد
        </div>
      </div>
    </>
  );
}

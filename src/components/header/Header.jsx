"use client";
import { FaAngleDown, FaPhoneVolume } from "react-icons/fa6";
import logo from "@/public/assets/logo.png";
import Image from "next/image";
import { Menu, Skeleton } from "antd";
import useHttp from "@/src/hooks/useHttps";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const loadings = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

export default function Header() {
  const { httpService } = useHttp();
  const [loading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useState(null);
  const router = useRouter();

  const tabs = [
    { block: false, name: "صفحه نخست" },
    { block: false, name: "❤️ علاقمندی شما" },
    { block: false, name: "جدول وزن" },
    { block: false, name: "هزینه حمل" },
    { block: false, name: "تحلیل بازار" },
    { block: true, name: "دانشنامه" },
    { block: false, name: "درباره ما" },
    { block: false, name: "تماس با ما" },
    { block: false, name: "همکاری با ما" },
    { block: false, name: "سایر خدمات" },
    { block: false, name: "درگاه پرداخت" },
  ];

  const handleGetCategories = async () => {
    setLoading(true);
    const transformData = (data) => {
      return data.map((item) => {
        // Create the transformed object for each item
        const transformedItem = {
          key: item.id, // id becomes key
          label: (
            <div
              onClick={() => router.push(`/${item?.slug}`)}
              className="!min-w-fit flex text-2xl"
            >
              {item.name}
            </div>
          ), // name becomes label
          data: item,
        };

        // If there are children, recursively transform them as well
        if (item.children && item.children.length > 0) {
          transformedItem.children = transformData(item.children);
        }

        return transformedItem;
      });
    };

    await httpService
      .get("getMenus")
      .then((res) => {
        if (res?.data) {
          setMenuItems(transformData(res.data));
        }
      })
      .catch();

    setLoading(false);
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-2 justify-between bg-white pt-5 shadow-md">
        {/* quick access */}
        <div className="w-full max-w-[1600px] flex items-center mx-auto border-b">
          {/* pages */}
          <div className="w-full lg:flex py-3 text-gray-400 hidden">
            {tabs.map((t, index) => {
              if (index + 1 !== tabs.length) {
                return (
                  <section
                    key={t.name}
                    className={`${
                      t.block ? "ml-auto" : ""
                    } w-fit h-fit flex items-center justify-center border-x px-3 hover:text-blue-400 cursor-pointer`}
                  >
                    {t.name}
                  </section>
                );
              } else {
                return (
                  <section
                    key={t}
                    className="w-fit h-fit flex items-center justify-center border-r px-3 hover:text-blue-400 cursor-pointer"
                  >
                    {t.name}
                  </section>
                );
              }
            })}
          </div>

          {/* phone number */}
          <div className="w-fit flex items-center px-5 py-3 border-r">
            <div className="w-fit flex flex-col">
              <div className="text-green-400">
                <span className="text-lg">021</span>
                <span className="text-2xl">11111</span>
              </div>

              <span className="text-gray-300 text-xs">
                قبل از خرید با ما تماس بگیرید
              </span>
            </div>

            <div className="w-[50px]">
              <FaPhoneVolume className="w-full h-full text-green-500 animate-bounce" />
            </div>
          </div>
        </div>

        {/* categories */}
        <div className="w-full flex items-end gap-5 max-w-[1600px] mx-auto p">
          {/* logo */}
          <div className="w-auto max-w-[200px] h-[85px]">
            <Image
              src={logo}
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="w-full h-full">
            {!loading ? (
              <Menu selectedKeys={null} items={menuItems} mode="horizontal" />
            ) : (
              <div className="w-full flex gap-3 p-3">
                {loadings.map((l, index) => (
                  <Skeleton.Button
                    size="large"
                    className="w-[200px]"
                    key={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

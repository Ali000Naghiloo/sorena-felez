"use client";
import { FaAngleDown, FaPhoneVolume } from "react-icons/fa6";
import logo from "@/public/assets/logo.png";
import Image from "next/image";
import { Menu, Skeleton } from "antd";
import useHttp from "@/src/hooks/useHttps";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWindowSize } from "@uidotdev/usehooks";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { setCategories } from "@/src/store/reducers/category";

const loadings = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

export default function Header() {
  const { httpService } = useHttp();
  const [loading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useState(null);
  const router = useRouter();
  const size = useWindowSize();
  const dispatch = useAppDispatch();

  const tabs = [
    { block: false, name: "صفحه نخست", link: "/" },
    { block: false, name: "❤️ علاقمندی شما", link: "/" },
    { block: false, name: "جدول وزن", link: "/" },
    { block: false, name: "هزینه حمل", link: "/" },
    { block: false, name: "تحلیل بازار", link: "/" },
    { block: true, name: "دانشنامه", link: "/" },
    // { block: false, name: "درباره ما", link: "/" },
    // { block: false, name: "تماس با ما", link: "/" },
    // { block: false, name: "همکاری با ما", link: "/" },
    // { block: false, name: "سایر خدمات", link: "/" },
    // { block: false, name: "درگاه پرداخت", link: "/" },
  ];

  const handleGetMenu = async () => {
    setLoading(true);
    const transformData = (data) => {
      return data.map((item, index) => {
        // Create the transformed object for each item
        const transformedItem = {
          key: Math.random() * 100000, // id becomes key
          label: (
            <div
              onClick={(e) => {
                router.push(`/filters?type=${item?.type}&slug=${item?.slug}`);
              }}
              className="w-full !min-w-full flex text-lg font-medium"
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

  const handleGetCategories = async () => {
    setLoading(true);

    await httpService
      .get("getCategories")
      .then((res) => {
        if (res?.data) {
          dispatch(setCategories(res.data));
        }
      })
      .catch();

    setLoading(false);
  };

  useEffect(() => {
    handleGetMenu();
    handleGetCategories();
  }, []);

  if (size && size.width > 1000) {
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
                        t.block ? "ml-auto border-l-0" : ""
                      } w-fit h-fit flex items-center justify-center border-x px-3 hover:text-blue-400 cursor-pointer`}
                      onClick={() => {
                        router.push(t.link);
                      }}
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
          <div className="w-full flex justify-start items-center gap-5 max-w-[1600px] mx-auto p">
            {/* logo */}
            <div
              className="w-[200px] h-[85px] flex items-center pr-3"
              onClick={() => {
                router.push("/");
              }}
            >
              <Image src={logo} alt="logo" className="w-full object-cover" />
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
  } else {
    return (
      <>
        <div className="w-full flex justify-between items-center mx-auto border-b">
          {/* logo */}
          <div
            className="w-[150px] h-[85px] flex items-center pr-3"
            onClick={() => {
              router.push("/");
            }}
          >
            <Image src={logo} alt="logo" className="w-full object-cover" />
          </div>

          {/* phone number */}
          <div className="w-fit flex items-center px-5 py-3">
            <div className="w-fit flex flex-col">
              <div className="text-green-400">
                <span className="text-lg">021</span>
                <span className="text-2xl">11111</span>
              </div>

              <span className="text-gray-300 text-xs">
                قبل از خرید با ما تماس بگیرید
              </span>
            </div>

            <div className="w-[30px]">
              <FaPhoneVolume className="w-full h-full text-green-500 animate-bounce" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

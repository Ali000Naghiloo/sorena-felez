import { baseURL } from "@/src/hooks/useHttps";
import { Input } from "antd";
import axios from "axios";
import Link from "next/link";

const { Search } = Input;
export default function WeblogFilters({ weblogCategories }) {
  //   const weblogCategories = async () => {
  //     const datas = await axios
  //       .get(`${baseURL}getweblogCategories`)
  //       .then((res) => {
  //         console.log(res.data);
  //         return res.data;
  //       })
  //       .catch(() => {
  //         return [];
  //       });

  //     return datas;
  //   };

  return (
    <>
      <div className="flex flex-col gap-5 min-w-[350px]">
        <span className="text-2xl">جستجو مطالب</span>
        <Search size="large" placeholder="عبارت مورد نظر خود را بنویسید" />

        <div className="flex flex-col gap-3">
          <span className="text-2xl mb-5">دسته بندی</span>
          {weblogCategories &&
            weblogCategories?.length !== 0 &&
            weblogCategories.map((wf, index) => (
              <Link
                href={`/weblogs?slug=${wf?.slug}`}
                key={index}
                className={`${index == 0 ? "border-t" : ""} border-b p-4`}
              >
                {wf.name}
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}

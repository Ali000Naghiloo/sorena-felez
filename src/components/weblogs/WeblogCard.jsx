import { imageUrl } from "@/src/hooks/useHttps";
import moment from "jalali-moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaEye, FaRegCalendar } from "react-icons/fa6";
import formatHelper from "../helper/formatHelper";

export default function WeblogCard({
  image,
  title,
  date,
  views,
  description,
  slug,
}) {
  return (
    <>
      <Link
        href={`/weblogs/weblog?slug=${slug}`}
        className="w-full max-w-[300px] h-[500px] flex flex-col gap-2 bg-white rounded-md shadow-lg overflow-hidden"
      >
        {/* image */}
        <div className="w-full h-[35%] shadow-md">
          <Image
            src={imageUrl + image}
            className="w-full h-full object-cover"
            alt={title}
            width={300}
            height={300}
          />
        </div>

        <div className="w-full h-full p-3 flex flex-col gap-2">
          {/* title */}
          <div className="w-full">
            <span className="text-xl font-bold">{title}</span>
          </div>

          {/* description */}
          <div
            className="w-full text-justify mt-5"
            dangerouslySetInnerHTML={{
              __html: formatHelper.cutString(description, 0, 50),
            }}
          ></div>

          {/* details */}
          <div className="w-full flex justify-between mt-auto bg-accent text-white rounded-lg p-2">
            <div className="flex gap-1 items-center">
              <FaRegCalendar />
              {date
                ? moment.utc(date).locale("fa").format("YYYY/MM/DD - HH:mm")
                : null}
            </div>

            <div className="flex gap-1 items-center">
              <FaEye />
              {views}
            </div>
          </div>

          {/* view button */}
          <div className="w-full flex text-xl text-blue-500">
            <Link
              className="flex gap-1 items-center"
              href={`/weblogs/weblog?slug=${slug}`}
            >
              <span>ادامه مطلب </span> <FaAngleLeft />
            </Link>
          </div>
        </div>
      </Link>
    </>
  );
}

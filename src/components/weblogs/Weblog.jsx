"use client";
import useHttp, { imageUrl } from "@/src/hooks/useHttps";
import { Breadcrumb, Skeleton } from "antd";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import WeblogFilters from "./WeblogFilters";
import Image from "next/image";
import moment from "jalali-moment";

export default function Weblog({ weblogCategories }) {
  const { httpService } = useHttp();
  const params = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState();
  const slug = params.get("slug");

  const routes = [{ title: "خانه" }];

  const handleGetWeblogData = async () => {
    setLoading(true);
    const formData = {
      slug: slug,
    };

    await httpService
      .get("getSinglePost", { params: formData })
      .then((res) => {
        if (res?.data) setPageData(res.data);
      })
      .catch(() => {});

    setLoading(false);
  };

  useEffect(() => {
    handleGetWeblogData();
  }, [slug]);

  return (
    <>
      <div className="w-full bg-[#f7f7f7] px-5">
        <div className="w-full max-w-[1300px] mx-auto flex flex-col">
          {/* page title */}
          <div className="w-full flex justify-between py-10">
            {pageData?.title ? (
              <>
                <h1 className="text-3xl font-bold">{pageData?.title}</h1>
                <Breadcrumb items={routes} />
              </>
            ) : (
              <>
                <Skeleton.Input />

                <Skeleton.Input />
              </>
            )}
          </div>

          {/* datas */}
          <div className="w-full flex gap-5 flex-col lg:flex-row pb-10">
            {/* weblog content */}
            <div className="w-full flex flex-col gap-5 lg:w-[80%] bg-white rounded-lg px-4 py-5">
              {pageData ? (
                <>
                  {/* title & image */}
                  <div className="w-full flex flex-col items-center lg:flex-row gap-10">
                    <div className="w-full lg:w-[40%]">
                      <Image
                        src={imageUrl + pageData?.image}
                        className="w-full h-full object-cover"
                        alt={pageData?.title}
                        width={300}
                        height={300}
                      />
                    </div>

                    <div className="w-full flex flex-col">
                      <div className="w-full flex gap-2 border-b border-dotted p-3">
                        <div>
                          <span>نویسنده : </span>
                          <span>-</span>
                        </div>
                        <div>
                          {pageData?.created_at
                            ? moment
                                .utc(pageData?.created_at)
                                .locale("fa")
                                .format("YYYY/MM/DD - HH:mm")
                            : null}
                        </div>
                      </div>

                      <div classNames=""></div>
                    </div>
                  </div>

                  <div
                    className="w-full border-y py-5"
                    dangerouslySetInnerHTML={{
                      __html: pageData?.content,
                    }}
                  ></div>
                </>
              ) : (
                <Skeleton />
              )}

              <div className=""></div>
            </div>

            {/* other data */}
            <WeblogFilters weblogCategories={weblogCategories} />
          </div>
        </div>
      </div>
    </>
  );
}

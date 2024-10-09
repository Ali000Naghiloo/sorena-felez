"use client";
import useHttp from "@/src/hooks/useHttps";
import { Breadcrumb, Skeleton } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import WeblogCard from "./WeblogCard";

const loadings = ["", "", "", "", "", "", "", ""];

export default function Weblogs({}) {
  const { httpService } = useHttp();
  const params = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState(null);
  const slug = params.get("slug");
  const routes = [{ title: "خانه" }, { title: "وبلاگ ها" }];

  const handleGetWeblogs = async () => {
    setLoading(true);

    await httpService
      .get(`getPosts`)
      .then((res) => {
        if (res.status === 200)
          setPageData({ title: "دانشنامه", list: res.data });
      })
      .catch(() => {});

    setLoading(false);
  };

  const handleGetWeblogByCategory = async () => {
    setLoading(true);
    const formData = {
      slug: slug,
    };

    await httpService
      .get(`getPostsByCategory`, { params: formData })
      .then((res) => {
        if (res.status === 200)
          setPageData({ title: "دانشنامه", list: res.data?.posts });
      })
      .catch(() => {});

    setLoading(false);
  };

  useEffect(() => {
    if (slug) {
      handleGetWeblogByCategory();
    } else {
      handleGetWeblogs();
    }
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

          {/* weblog list */}
          <div className="flex flex-wrap pb-10">
            {pageData?.list ? (
              <>
                {pageData.list?.map((weblog, index) => (
                  <WeblogCard
                    key={index}
                    image={weblog.image}
                    title={weblog.title}
                    date={weblog.created_at}
                    description={weblog.content}
                    views={weblog.views}
                    slug={weblog.slug}
                  />
                ))}
              </>
            ) : (
              <>
                <div className="w-full flex flex-wrap">
                  {loadings.map(() => (
                    <Skeleton.Node
                      style={{
                        width: "300px",
                        height: "500px",
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

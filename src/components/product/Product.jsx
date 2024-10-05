"use client";
import useHttp, { imageUrl } from "@/src/hooks/useHttps";
import { Skeleton, Tabs, Tag } from "antd";
import moment from "jalali-moment";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import formatHelper from "../helper/formatHelper";
import Image from "next/image";

export default function Product() {
  const { httpService } = useHttp();
  const [productData, setProductData] = useState(null);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useSearchParams();
  const router = useRouter();
  const slug = params.get("slug");

  const [data, setData] = useState([
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 300, pv: 600, amt: 2000 },
    { name: "Page C", uv: 300, pv: 600, amt: 2000 },
    { name: "Page D", uv: 300, pv: 600, amt: 2000 },
    { name: "Page E", uv: 300, pv: 600, amt: 2000 },
    { name: "Page F", uv: 300, pv: 600, amt: 2000 },
    { name: "Page G", uv: 300, pv: 600, amt: 2000 },
  ]);

  const CustomizedAxisTick = ({ x, y, stroke, payload }) => {
    return (
      <g transform={`translate(${x - 50},${y + 50})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 border rounded-lg bg-white">
          <p className="label">{`قیمت : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  const handleGetProductData = async () => {
    setLoading(true);
    const formData = {
      slug: slug,
    };

    await httpService
      .get("getSingleProduct", { params: formData })
      .then((res) => {
        if (res.data) {
          setProductData(res.data);
          setData(res.data?.prices);
        }
      })
      .catch((err) => {});

    setLoading(false);
  };

  const handleGetPosts = async () => {
    setLoading(true);

    await httpService
      .get("getPosts")
      .then((res) => {
        if (res?.data) setPosts(res.data);
      })
      .catch();
  };

  const handleNavigate = (slg, type) => {
    router.push(`/filters?type=${type}&slug=${slg}`);
  };

  useEffect(() => {
    handleGetProductData();
    handleGetPosts();
  }, [slug]);

  return (
    <>
      <div className="w-full max-w-[1600px] mx-auto py-10 px-5">
        {!loading ? (
          <>
            {/* page titles */}
            <div className="w-full flex gap-2 items-center">
              <h1 className="text-4xl">{productData?.name}</h1>

              {/* categories */}
              {productData?.categories?.length !== 0
                ? productData?.categories?.map((cat) => (
                    <Tag
                      color="cyan-inverse"
                      className="cursor-pointer !h-fit"
                      onClick={() => handleNavigate(cat?.slug, cat?.type)}
                    >
                      <span>{cat.name}</span>
                    </Tag>
                  ))
                : null}

              {/* cities */}
              {productData?.cities?.length !== 0
                ? productData?.cities?.map((ci) => (
                    <Tag
                      color="geekblue"
                      className="cursor-pointer !h-fit"
                      onClick={() => handleNavigate(ci?.slug, ci?.type)}
                    >
                      <span>{ci.name}</span>
                    </Tag>
                  ))
                : null}
            </div>

            {/* parameters */}
            <div className="w-full flex flex-col gap-5">
              {productData?.parameters
                ? productData?.parameters?.map((pr) => (
                    <div key={pr.id} className="">
                      <span className="text-lg text-gray-400">
                        {pr?.name} :{" "}
                      </span>
                      <span className="text-lg font-bold">{pr?.value}</span>
                    </div>
                  ))
                : null}
            </div>

            {/* descriptions */}
            <div className="w-full my-14 flex flex-col">
              <span className="text-gray-400">توضیحات : </span>
              <p
                className="text-lg"
                dangerouslySetInnerHTML={{ __html: productData?.description }}
              ></p>
            </div>

            {/* datas */}
            <div className="w-full flex justify-between bg-pagesBackground p-20 rounded-xs">
              <div className="w-fit h-full flex flex-col bg-white rounded-lg">
                <Tabs
                  items={[
                    { key: "weekly", title: "نمودار هفتگی" },
                    { key: "monthly", title: "نمودار ماهانه" },
                  ]}
                />
                {/* <ResponsiveContainer width={"100%"} height={"100%"}> */}
                <LineChart
                  width={600}
                  height={400}
                  data={data}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <Line type="monotone" dataKey="price" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis
                    dataKey="date"
                    height={80}
                    tick={<CustomizedAxisTick />}
                  />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                </LineChart>
                {/* </ResponsiveContainer> */}
              </div>

              <div className="w-full lg:w-[30%] flex flex-col">
                <div className="w-full border-b border-b-gray-400 p-6">
                  <span className="text-2xl">مطالب مرتبط</span>
                </div>

                {posts && posts?.length !== 0
                  ? posts.map((p, index) => {
                      if (index < 3) {
                        return (
                          <div key={index} className="flex gap-5 border-y py-3">
                            <div className="h-[100px] py-5">
                              <Image
                                width={100}
                                height={50}
                                src={imageUrl + p?.image}
                                alt=""
                                className="w-full h-full rounded-lg object-cover"
                              />
                            </div>

                            <div className="flex flex-col">
                              <span>{formatHelper.cutString(p?.title)}</span>
                              <span>
                                {p?.created_at
                                  ? formatHelper.toPersianString(
                                      moment(p?.created_at)
                                        .locale("fa")
                                        .format("HH:mm")
                                    )
                                  : null}{" "}
                                -
                                {p?.created_at
                                  ? formatHelper.toPersianString(
                                      moment(p?.created_at)
                                        .locale("fa")
                                        .format("YYYY/MM/DD")
                                    )
                                  : null}{" "}
                              </span>
                            </div>
                          </div>
                        );
                      }
                    })
                  : null}
              </div>
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col gap-5 justify-start items-center">
            <Skeleton style={{ width: "100%" }} active />
            <Skeleton style={{ width: "100%" }} active />
            <Skeleton style={{ width: "100%" }} active />
            <Skeleton style={{ width: "100%" }} active />
            <Skeleton style={{ width: "100%" }} active />
          </div>
        )}
      </div>
    </>
  );
}

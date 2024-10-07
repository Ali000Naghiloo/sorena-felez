"use client";
import useHttp, { imageUrl } from "@/src/hooks/useHttps";
import { Button, Checkbox, Select, Table } from "antd";
import moment from "jalali-moment";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineFundView } from "react-icons/ai";

export default function Filters() {
  const { httpService } = useHttp();
  const router = useRouter();
  const params = useSearchParams();
  const [pageData, setPageData] = useState({ title: "", image: null });
  const [filterdList, setFilterdList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    categories: [],
    cities: [],
    companies: [],
    parameters: [],
  });
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    cities: [],
    companies: [],
    parameters: [],
  });

  const slug = params.get("slug");
  const type = params.get("type");

  const columns = [
    { title: "ردیف", dataIndex: "index", key: "index" },
    {
      title: "نام محصول",
      dataIndex: "name",
      render: (value) => <h2 className="text-2xl font-bolder">{value}</h2>,
      key: "name",
    },
    {
      title: "تاریخ",
      dataIndex: "created_at",
      render: (date) => (
        <div className="text-blue-500 font-bold">
          {date ? moment(date).format("YYYY/MM/DD") : "-"}
        </div>
      ),
      key: "created_at",
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      render: (value) => (
        <div className="text" dangerouslySetInnerHTML={{ __html: value }}></div>
      ),
      key: "description",
    },
    {
      title: "",
      dataIndex: "",
      render: (datas) => (
        <div className="">
          <Button
            onClick={() => router.push(`/product?slug=${datas?.slug}`)}
            className="!p-1"
            type="primary"
          >
            <AiOutlineFundView size={"2em"} />
          </Button>
        </div>
      ),
      key: "actions",
    },
  ];

  const handleGetListByCategory = async () => {
    setLoading(true);
    const formData = {
      slug: slug,
    };
    let datas = [];

    httpService
      .get("getProductsByCategory", { params: formData })
      .then((res) => {
        if (res?.data) {
          res.data?.products?.map((d, index) => {
            datas.push({ ...d, index: index + 1, key: index });
          });
          setFilterdList(datas);
          setPageData({ title: res.data?.name, image: res.data?.image });
        }
      })
      .catch(() => {});

    setLoading(false);
  };

  const handleGetFilterdList = async () => {
    setLoading(true);
    const formData = {
      categories: [selectedFilters.categories],
      cities: [selectedFilters.cities],
      companies: [selectedFilters.companies],
      parameters: [selectedFilters.parameters],
    };

    await httpService
      .get("filters", { params: formData })
      .then((res) => {
        setFilterdList(res.data);
      })
      .catch(() => {});

    setLoading(false);
  };

  const handleGetFilterLists = async () => {
    if (filters.categories.length === 0) {
      let categoris = [];
      let cities = [];
      let companies = [];
      let parameters = [];

      await httpService
        .get("getCategories")
        .then((res) => {
          categoris = res.data;
        })
        .catch(() => {});

      await httpService
        .get("getCities")
        .then((res) => {
          cities = res.data;
        })
        .catch(() => {});

      await httpService
        .get("getCompanies")
        .then((res) => {
          companies = res.data;
        })
        .catch(() => {});

      await httpService
        .get("getParameters")
        .then((res) => {
          parameters = res.data;
        })
        .catch(() => {});

      setFilters({
        categories: categoris,
        companies: companies,
        cities: cities,
        parameters: parameters,
      });
    }

    if (type === "category") {
      setSelectedFilters({ ...selectedFilters, categories: slug });
    }
    if (type === "city") {
      setSelectedFilters({ ...selectedFilters, cities: slug });
    }
    if (type === "companies") {
      setSelectedFilters({ ...selectedFilters, companies: slug });
    }

    if (filterdList.length === 0) {
      handleGetFilterdList();
    }
  };

  useEffect(() => {
    // console.log(slug);
    if (type === "category") {
      handleGetListByCategory();
    }
    handleGetFilterLists();
  }, [slug]);

  return (
    <>
      <div className="w-full max-w-[1600px] mx-auto flex flex-col items-center p-3 lg:p-10">
        {/* page titles */}
        <div className="w-full py-6 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <h1 className="text-4xl">{pageData.title}</h1>

            {pageData.image ? (
              <Image
                src={imageUrl + pageData.image}
                alt=""
                width={100}
                height={100}
                className="object-cover"
              />
            ) : null}
          </div>

          <div className="w-full "></div>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-2">
          {/* filters */}
          <div className="w-full lg:w-[20%] flex flex-col gap-5 bg-slate-200 rounded-lg p-3 !scrollbar">
            <div className="flex flex-col">
              <h3 className="text-2xl">فیلتر ها</h3>
              <span className="text-sm text-gray-400">
                فیلتر های مد نظر خود را انتخاب کنید.
              </span>
            </div>

            {/* categories */}
            <div className="flex flex-col w-full">
              <span>دسته بندی محصولات</span>
              <Select
                allowClear
                mode="multiple"
                optionFilterProp="label"
                fieldNames={{ label: "name", value: "slug" }}
                options={filters.categories}
                value={selectedFilters.categories}
                onChange={(e, data) => {
                  setSelectedFilters({ ...selectedFilters, categories: e });
                  setPageData({ title: data[0]?.name, image: data[0]?.image });
                }}
                placeholder="دسته بندی های خود را انتخاب کنید"
              />
            </div>

            {/* cities */}
            <div className="flex flex-col w-full">
              <span>شهر ها</span>
              <Select
                allowClear
                mode="multiple"
                optionFilterProp="label"
                fieldNames={{ label: "name", value: "slug" }}
                options={filters.cities}
                value={selectedFilters.cities}
                onChange={(e) => {
                  setSelectedFilters({ ...selectedFilters, cities: e });
                }}
                placeholder="دسته بندی های خود را انتخاب کنید"
              />
            </div>

            {/* companies */}
            <div className="flex flex-col w-full">
              <span>شرکت ها</span>
              <Select
                allowClear
                mode="multiple"
                optionFilterProp="label"
                fieldNames={{ label: "name", value: "slug" }}
                options={filters.companies}
                value={selectedFilters.companies}
                onChange={(e) => {
                  setSelectedFilters({ ...selectedFilters, companies: e });
                }}
                placeholder="دسته بندی های خود را انتخاب کنید"
              />
            </div>

            {/* parameters */}
            <div className="flex flex-col w-full scrollbar">
              <span>پارامتر ها</span>
              <div className="w-full h-[200px] bg-white overflow-y-auto rounded-lg flex flex-col p-2">
                {filters.parameters && filters?.parameters?.length
                  ? filters.parameters?.map((pr) => (
                      <div className="w-full flex justify-between items-center text-sm">
                        <span>{pr?.name}</span>
                        <div className="flex gap-1">
                          <span>{pr?.value}</span>
                          <Checkbox
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  parameters: [
                                    ...selectedFilters.parameters,
                                    pr.slug,
                                  ],
                                });
                              } else {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  parameters:
                                    selectedFilters.parameters?.filter(
                                      (value) => value !== pr?.slug
                                    ),
                                });
                              }
                            }}
                          />
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>

            {/* submit */}
            <div className="w-full flex justify-center">
              <Button type="primary" onClick={handleGetFilterdList}>
                اعمال فیلتر ها
              </Button>
            </div>
          </div>

          {/* filterd data */}
          <div className="w-full overflow-auto">
            <Table
              columns={columns}
              dataSource={filterdList}
              loading={loading}
              rowKey="id"
            />
          </div>
        </div>
      </div>
    </>
  );
}

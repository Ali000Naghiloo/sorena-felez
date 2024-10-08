"use client";
import { imageUrl } from "@/src/hooks/useHttps";
import { Tabs } from "antd";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaPhone } from "react-icons/fa6";
import { Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

export default function EmployeesPreview({ employeesGroups, allEmployees }) {
  const [showingEmployees, setShowingEmployees] = useState();
  const [selectedTab, setSelectedTab] = useState(null);
  const tabs = employeesGroups
    ? employeesGroups.map((emg) => {
        return {
          key: emg?.slug,
          label: <span className="text-xl">{emg.name}</span>,
        };
      })
    : null;

  const handleSetEmployeesToDefault = () => {
    let datas = [];

    allEmployees?.map((all) => {
      all?.teams?.length !== 0
        ? all?.teams?.map((member) => {
            datas.push(member);
          })
        : null;
    });

    setShowingEmployees(datas);
  };

  const handleFilterEmployeesList = (e) => {
    console.log(selectedTab, e);
    if (e !== selectedTab) {
      allEmployees?.map((all) => {
        if (all?.slug === e) {
          setShowingEmployees(all?.teams);
        }
      });
      setSelectedTab(e);
    } else {
      handleSetEmployeesToDefault();
      setSelectedTab(null);
    }
  };

  useEffect(() => {
    handleSetEmployeesToDefault();
  }, [allEmployees]);

  return (
    <>
      <div className="w-full">
        <Tabs
          onTabClick={(e, data) => {
            console.log(e);
            handleFilterEmployeesList(e);
          }}
          items={tabs}
          activeKey={selectedTab}
          className="!border-0"
        />

        <div className="w-full py-5">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={"50"}
            modules={[Pagination]}
            className="cursor-pointer"
          >
            {showingEmployees
              ? showingEmployees.map((em, index) => (
                  <SwiperSlide
                    className="!w-[300px] flex justify-center items-center mx-5"
                    key={index}
                  >
                    <div className="flex w-full justify-center items-center">
                      {/* profile */}
                      <div className="w-[120px]">
                        <Image
                          src={imageUrl + em.image}
                          alt={em.name}
                          className="w-full h-full object-cover rounded-lg"
                          width={100}
                          height={100}
                        />
                      </div>

                      <div className="flex flex-col h-full py-3">
                        <div className="flex flex-col px-3">
                          <div className="flex flex-col">
                            <span className="text-xl">{em.name}</span>
                            <span className="text-gray-500">{em.role}</span>
                          </div>
                        </div>

                        <div className="flex flex-col bg-accent text-white p-3 pl-6 pr-0 rounded-l-lg h-[50%]">
                          <div className="flex relative p-2 pl-4 bg-gray-600 rounded-l-lg">
                            {em.mobile}

                            <div className="bg-white text-gray-600 p-1 rounded-sm absolute left-[0] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                              <FaPhone className="rotate-[270deg]" />
                            </div>
                          </div>

                          <span className="mr-auto">{em.phone}</span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              : null}
          </Swiper>
        </div>
      </div>
    </>
  );
}

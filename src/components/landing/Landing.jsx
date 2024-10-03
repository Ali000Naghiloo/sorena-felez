"use client";
import Image from "next/image";
// import gif from "";
import banner from "@/public/assets/landing/banner.jpg";
import employee from "@/public/assets/landing/employee.webp";
import employees from "@/public/assets/landing/employees.webp";
import { Button, Input, Table, Tabs } from "antd";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaPhone } from "react-icons/fa6";
import { MdCheckCircleOutline } from "react-icons/md";
import useHttp, { imageUrl } from "@/src/hooks/useHttps";
import { useEffect, useState } from "react";
import formatHelper from "../helper/formatHelper";
import moment from "jalali-moment";

const { Search } = Input;
export default function Landing() {
  const { httpService } = useHttp();
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState({
    posts: null,
    category: null,
    products: null,
  });
  const dataTableTabs = [
    {
      key: "migerd",
      label: <div className="text-2xl">میلگرد</div>,
      children: <></>,
    },
    {
      key: "tir-ahan",
      label: <div className="text-2xl">تیرآهن</div>,
      children: <></>,
    },
    {
      key: "profil",
      label: <div className="text-2xl">پروفیل</div>,
      children: <></>,
    },
    {
      key: "nabshi",
      label: <div className="text-2xl">نبشی</div>,
      children: <></>,
    },
    {
      key: "manisman",
      label: <div className="text-2xl">لوله مانیسمان</div>,
      children: <></>,
    },
    {
      key: "varagh",
      label: <div className="text-2xl">ورق</div>,
      children: <></>,
    },
  ];

  const employeesCategory = [
    {
      key: "tab-1",
      label: <span className="text-xl">گروه یک فروش</span>,
      children: <></>,
    },
    {
      key: "tab-2",
      label: <div className="text-xl">گروه دو فروش</div>,
      children: <></>,
    },
    {
      key: "tab-3",
      label: <div className="text-xl">گروه سه فروش</div>,
      children: <></>,
    },
    {
      key: "tab-4",
      label: <div className="text-xl">گروه سرپرستی فروش</div>,
      children: <></>,
    },
  ];

  const employeesList = [
    {
      name: "سمیه فتاحی",
      role: "کارشناس",
      image: employee,
      phone: "021-54103",
      mobile: "09912057728",
    },
    {
      name: "سمیه فتاحی",
      role: "کارشناس",
      image: employee,
      phone: "021-54103",
      mobile: "09912057728",
    },
    {
      name: "سمیه فتاحی",
      role: "کارشناس",
      image: employee,
      phone: "021-54103",
      mobile: "09912057728",
    },
    {
      name: "سمیه فتاحی",
      role: "کارشناس",
      image: employee,
      phone: "021-54103",
      mobile: "09912057728",
    },
    {
      name: "سمیه فتاحی",
      role: "کارشناس",
      image: employee,
      phone: "021-54103",
      mobile: "09912057728",
    },
  ];

  const features = [
    {
      title: "خرید اعتباری آهن آلات",
      description:
        "امکان خرید آهن آلات به صورت اعتباری و مدت دار، خدمت دیگری است از آهن پرایس در راستای جلب حداکثری رضایت مشتریان. شما مشتریان عزیز میتوانید انواع محصولات آهنی و مقاطع فولادی را با روش های مختلف : قسطی، چکی، ال سی و... با قیمت روز اهن الات از آهن پرایس خریداری نمایید.",
      logo: (
        <MdCheckCircleOutline
          className="text-accent hover:rotate-[360deg] transition-transform"
          size="8em"
        />
      ),
    },
    {
      title: "تضمین قیمت آهن آلات",
      description:
        " تلاش ما در آهن پرایس همواره بر این بوده تا با ارائه ضمانتنامه کتبی کمترین قیمت آهن آلات، آسودگی و راحتی در خرید محصولات آهنی را برای شما فراهم کنیم. آهن پرایس با ارائه ضمانتنامه کتبی بهترین قیمت اهن آلات و تضمین کیفیت، به دنبال لبخند رضایت شما بعد از خرید اهن آلات است.",
      logo: (
        <MdCheckCircleOutline
          className="text-accent hover:rotate-[360deg] transition-transform"
          size="8em"
        />
      ),
    },
    {
      title: "تضمین کیفیت آهن",
      description:
        "در تمامی پیش فاکتور های صادره شده از آهن پرایس به صورت کتبی کیفیت و قیمت آهن آلات تضمین شده که ارائه ضمانت نامه کتبی از طرف آهن پرایس به شما در زمان خرید آهن آلات تلاشی است در راستای عمل به تحقق شعارخود مبنی بر تجربه خرید مطمئن آهن آلات ساختمانی و صنعتی.",
      logo: (
        <MdCheckCircleOutline
          className="text-accent hover:rotate-[360deg] transition-transform"
          size="8em"
        />
      ),
    },
    {
      title: "هزینه حمل بار",
      description:
        "آهن پرایس به منظور خدمت رسانی و آگاه سازی شما مشتریان گرامی، هزینه حمل بار اهن الات از نقاط مختلف کشور به شهر مورد نظر شما را گردآوری کرده است. شما می توانید برای کسب اطلاعات بیشتر در مورد هزینه و تعرفه های باربری از قسمت هزینه حمل بار استفاده نمایید.",
      logo: (
        <MdCheckCircleOutline
          className="text-accent hover:rotate-[360deg] transition-transform"
          size="8em"
        />
      ),
    },
    {
      title: "لیست علاقمندی ها",
      description:
        "در این بخش می توانید محصولات مورد نظر خود را به لیست محبوب خود اضافه نمایید و در مواردی که به دلیل نوسانات قیمت آهن نیاز به بررسی و رصد روزانه باشد، در بازدید های روزانه خود بدون فوت وقت، فقط قیمت ها و نوسانات لیست مورد نظر خود را بررسی کنید.",
      logo: (
        <MdCheckCircleOutline
          className="text-accent hover:rotate-[360deg] transition-transform"
          size="8em"
        />
      ),
    },
    {
      title: "جدول وزن آهن آلات",
      description:
        "در قسمت محاسبه وزن اهن الات شما میتوانید اطلاعات دقیقی از وزن و قیمت آهن آلات داشته باشید و آنها را با هم مقایسه کنید با توجه به تعدد کارخانجات تولیدی در این زمینه هر محصول از هر کارخانه اعم از میلگرد، تیرآهن و ... وزن مشخصی دارد که اطلاعات آن در دست",
      logo: (
        <MdCheckCircleOutline
          className="text-accent hover:rotate-[360deg] transition-transform"
          size="8em"
        />
      ),
    },
  ];

  const weblogFilters = [
    { label: "اخبار بازار آهن" },
    { label: "اخبار بازار مسکن" },
    { label: "اخبار بازار فولاد" },
    { label: "دانشنامه تصویری فلزات" },
    { label: "دانشنامه" },
  ];

  const handleGetPosts = async () => {
    setLoading(true);

    await httpService
      .get("getPosts")
      .then((res) => {
        if (res?.data) setPageData({ ...pageData, posts: res.data });
      })
      .catch();
  };

  const handleGetProducts = async () => {
    setLoading(true);

    await httpService
      .get("getProducts")
      .then((res) => {
        if (res?.data) setPageData({ ...pageData, posts: res.data });
      })
      .catch();
  };

  const handleGetFilters = async () => {
    setLoading(true);

    await httpService
      .get("filters", {
        params: {
          // categories: ["shyralat", "anoaaa-ork"],
          cities: ["kzoyn"],
        },
      })
      .then((res) => {})
      .catch();
  };

  useEffect(() => {
    handleGetPosts();
    handleGetFilters();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col justify-start items-center mx-auto">
        {/* landing gif */}
        <video
          autoPlay={true}
          controls={false}
          className="w-full h-[400px] my-5 rounded-lg max-w-[1600px] px-5 object-contain"
        >
          <source src="/assets/landing/gif.mp4" type="video/mp4" />
        </video>

        {/* banner and reminder */}
        <div className="w-full lg:h-[170px] flex flex-col items-center justify-center lg:flex-row my-5 max-w-[1600px] px-5">
          {/* banner */}
          <div className="w-full lg:w-[60%] h-full">
            <Image
              src={banner}
              alt=""
              className="w-full h-full rounded-lg object-cover"
            />
          </div>

          {/* reminder */}
          <div className="lg:w-[30%] w-full h-full rounded-lg flex flex-col gap-5 justify-between bg-white shadow-md p-4">
            <span className="text-lg">اطلاع از قیمت روز آهن آلات</span>
            <span className="text-sm text-gray-400">
              اطلاع از سیگنال های مهم کاهشی یا افزایشی قیمت اهن.
            </span>

            <Input
              className="w-full outline-blue-500 outline-2 h-[50px]"
              placeholder="شماره موبایل خود را وارد کنید"
            />
          </div>
        </div>

        {/* text */}
        <div className="w-full flex flex-col gap-3 justify-between items-center lg:flex-row my-10 max-w-[1600px] px-5 py-10">
          <h1 className="text-4xl flex flex-col min-w-[50%]">
            <span className="font-extralight">فروش و قیمت روز آهن آلات</span>
            <span className="font-black">قیمت اهن الات ساختمانی و صنعتی</span>
          </h1>

          <span className="text-gray-400 text-2xl">
            مشاوره رایگان پیش از خرید آهن آلات، تحلیل به روز بازار و قیمت اهن،
            ارائه ضمانت نامه کتبی کیفیت محصولات و قیمت اهن الات صنعتی و ساختمانی
          </span>
        </div>

        {/* table and descriptions */}
        <div className="w-full flex flex-col gap-10 bg-pagesBackground py-16">
          {/* table */}
          <div className="w-full px-[100px]">
            <Tabs items={dataTableTabs} size="large" />
            <Table columns={[]} dataSource={[]} />
          </div>

          {/* descriptions */}
          <div className="w-full flex flex-col lg:flex-row gap-10 px-[100px]">
            <div className="w-full lg:w-[50%] flex flex-col gap-4">
              <p className="text-3xl">سورنا فلز، خرید مطمئن آهن آلات</p>
              <p className="text-gray-400 leading-[180%] text-justify">
                اعتماد یکی از مهمترین سرمایه های اجتماعی است، سرمایه ای که
                پایداری، همدلی و پیشرفت و شکوفایی یک ملت را رقم میزنه. در دنیای
                تجارت هم، اعتماد مشتریان ضمانتی برای بقا و پیشرفت هر کسب و کار
                محسوب میشه. قابل اعتماد بودن چیزی است فراتر از پذیرش مسئولیت،
                باور به صداقت یک فرد یا سازمان یعنی اطمینان از برآورده شدن
                انتظارات و امنیت منافع شما. اعتماد یک پیمان دو جانبه است برای
                دستیابی به اهداف و انجام درست یک رفتار. ما در مجموعه آهن پرایس
                با عشق و انگیزه فراوان در تلاشیم تا خالق و حافظ این اعتماد باشیم
                و تجربه ای راحت و مطمئن از خرید آهن آلات رو به شما ارائه بدیم.
              </p>
            </div>

            <div className="w-full lg:w-[50%]">
              <video controls className="w-full h-full rounded-md">
                <source
                  src={"https://www.aparat.com/v/j73i61p"}
                  className="w-full"
                />
              </video>
            </div>
          </div>
        </div>

        {/* employees preview */}
        <div className="w-full flex flex-col gap-3 items-center py-5 px-5 max-w-[1600px]">
          {/* title */}
          <p className="text-3xl">استعلام لحظه ای قیمت آهن آلات</p>

          <div className="w-full">
            <Tabs items={employeesCategory} className="" />

            <div className="py-5">
              <Swiper slidesPerView={"auto"}>
                {employeesList.map((em, index) => (
                  <SwiperSlide className="!w-fit mx-5" key={index}>
                    <div className="flex">
                      {/* profile */}
                      <div className="w-[120px]">
                        <Image
                          src={em.image}
                          alt={em.name}
                          className="w-full h-full object-cover rounded-lg"
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
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* features */}
        <div className="w-full flex flex-wrap justify-between gap-7 py-5 px-5 max-w-[1600px]">
          {features.map((f, index) => {
            if (index < 3) {
              return (
                <div
                  key={f.title}
                  className="flex flex-col items-center gap-4 lg:w-[30%]"
                >
                  <div className="flex justify-center items-center p-5">
                    {f.logo}
                  </div>

                  <div>
                    <h4 className="text-2xl">{f.title}</h4>
                  </div>

                  <div className="text-gray-500 text-justify text-lg">
                    {f.description}
                  </div>
                </div>
              );
            }
          })}

          <div className="w-full h-auto flex flex-col items-center justify-between lg:flex-row gap-2 my-5-between p-4 lg:p-7 bg-pagesBackground max-w-[1600px] rounded-xl">
            <span className="text-5xl">آهن پرایس ، قیمت روز آهن آلات</span>
            <span className="text-gray-400 text-3xl w-full lg:max-w-[50%]">
              ضمانتنامه کتبی برای کیفیت تمامی آهن آلات و انجام امور فنی و
              آزمایشگاهی و امکان خرید اعتباری اهن بخشی از خدمات ما در آهن پرایس
              به مشتریان مان است.
            </span>
          </div>

          {features.map((f, index) => {
            if (index >= 3) {
              return (
                <div
                  key={f.title}
                  className="flex flex-col items-center gap-4 lg:w-[30%]"
                >
                  <div className="flex justify-center items-center p-5">
                    {f.logo}
                  </div>

                  <div>
                    <h4 className="text-2xl">{f.title}</h4>
                  </div>

                  <div className="text-gray-500 text-justify text-lg">
                    {f.description}
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* employees */}
        <div className="w-full h-fit py-5">
          <Image
            src={employees}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* weblogs */}
        <div className="w-full flex flex-wrap gap-5 my-5 px-5 max-w-[1600px]">
          {/* filters */}
          <div className="flex flex-col gap-5 min-w-[350px]">
            <span className="text-2xl">جستجو مطالب</span>
            <Search size="large" placeholder="عبارت مورد نظر خود را بنویسید" />

            <div className="flex flex-col gap-3">
              <span className="text-2xl mb-5">دسته بندی</span>
              {weblogFilters.map((wf, index) => (
                <div
                  key={index}
                  className={`${index == 0 ? "border-t" : ""} border-b p-4`}
                >
                  {wf.label}
                </div>
              ))}
            </div>
          </div>

          {/* weblogs */}
          <div className="flex flex-col">
            <h2 className="text-3xl border-b-2 pb-3">
              جدید ترین های بازار آهن
            </h2>

            {pageData.posts
              ? pageData.posts.map((post, index) => (
                  <div key={index} className="flex gap-5 border-y">
                    <div className="w-[120px] py-5">
                      <Image
                        width={100}
                        height={50}
                        src={imageUrl + post?.image}
                        alt=""
                        className="w-full h-full rounded-lg"
                      />
                    </div>

                    <div className="flex flex-col">
                      <span>{formatHelper.cutString(post?.title)}</span>
                      <span>
                        {post?.created_at
                          ? formatHelper.toPersianString(
                              moment(post?.created_at)
                                .locale("fa")
                                .format("YYYY/MM/DD")
                            )
                          : null}
                        {post?.created_at
                          ? formatHelper.toPersianString(
                              moment(post?.created_at)
                                .locale("fa")
                                .format("HH:mm")
                            )
                          : null}
                      </span>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
}

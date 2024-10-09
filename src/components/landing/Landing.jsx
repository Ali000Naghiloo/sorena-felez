"use client";
import Image from "next/image";
// import gif from "";
import banner from "@/public/assets/landing/banner.jpg";
import employee from "@/public/assets/landing/employee.webp";
import employeeImage from "@/public/assets/landing/employees.webp";
import { Button, Input, Table, Tabs } from "antd";
import dynamic from "next/dynamic";
import { FaHeart, FaWeightScale } from "react-icons/fa6";
import useHttp, { imageUrl } from "@/src/hooks/useHttps";
import formatHelper from "../helper/formatHelper";
import moment from "jalali-moment";
import { MdCheckCircleOutline } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import Link from "next/link";
import MobileLanding from "./MobileLanding";
import EmployeesPreview from "./EmployeesPreview";
import { useWindowWidth } from "@/src/hooks/useClientWidth";
import { useWindowSize } from "@uidotdev/usehooks";
import WeblogFilters from "../weblogs/WeblogFilters";

export default function Landing({
  posts,
  employees,
  weblogCategories,
  employeesGroups,
}) {
  const { httpService } = useHttp();
  const size = useWindowSize();
  // const categories = useAppSelector((state) => state?.categories?.categories);

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

  const features = [
    {
      title: "خرید اعتباری آهن آلات",
      description:
        "امکان خرید آهن آلات به صورت اعتباری و مدت دار، خدمت دیگری است از آهن پرایس در راستای جلب حداکثری رضایت مشتریان. شما مشتریان عزیز میتوانید انواع محصولات آهنی و مقاطع فولادی را با روش های مختلف : قسطی، چکی، ال سی و... با قیمت روز اهن الات از آهن پرایس خریداری نمایید.",
      logo: (
        <MdCheckCircleOutline
          className="text-accent hover:rotate-[360deg] transition-rotate duration-300"
          size="8em"
        />
      ),
    },
    {
      title: "تضمین قیمت آهن آلات",
      description:
        " تلاش ما در آهن پرایس همواره بر این بوده تا با ارائه ضمانتنامه کتبی کمترین قیمت آهن آلات، آسودگی و راحتی در خرید محصولات آهنی را برای شما فراهم کنیم. آهن پرایس با ارائه ضمانتنامه کتبی بهترین قیمت اهن آلات و تضمین کیفیت، به دنبال لبخند رضایت شما بعد از خرید اهن آلات است.",
      logo: (
        <IoMdSettings
          className="text-accent hover:rotate-[360deg] transition-rotate duration-300"
          size="8em"
        />
      ),
    },
    {
      title: "تضمین کیفیت آهن",
      description:
        "در تمامی پیش فاکتور های صادره شده از آهن پرایس به صورت کتبی کیفیت و قیمت آهن آلات تضمین شده که ارائه ضمانت نامه کتبی از طرف آهن پرایس به شما در زمان خرید آهن آلات تلاشی است در راستای عمل به تحقق شعارخود مبنی بر تجربه خرید مطمئن آهن آلات ساختمانی و صنعتی.",
      logo: (
        <BsBookmarkCheckFill
          className="text-accent hover:rotate-[360deg] transition-rotate duration-300"
          size="8em"
        />
      ),
    },
    {
      title: "هزینه حمل بار",
      description:
        "آهن پرایس به منظور خدمت رسانی و آگاه سازی شما مشتریان گرامی، هزینه حمل بار اهن الات از نقاط مختلف کشور به شهر مورد نظر شما را گردآوری کرده است. شما می توانید برای کسب اطلاعات بیشتر در مورد هزینه و تعرفه های باربری از قسمت هزینه حمل بار استفاده نمایید.",
      logo: (
        <FaTruck
          className="text-accent hover:rotate-[360deg] transition-rotate duration-300"
          size="8em"
        />
      ),
    },
    {
      title: "لیست علاقمندی ها",
      description:
        "در این بخش می توانید محصولات مورد نظر خود را به لیست محبوب خود اضافه نمایید و در مواردی که به دلیل نوسانات قیمت آهن نیاز به بررسی و رصد روزانه باشد، در بازدید های روزانه خود بدون فوت وقت، فقط قیمت ها و نوسانات لیست مورد نظر خود را بررسی کنید.",
      logo: (
        <FaHeart
          className="text-accent hover:rotate-[360deg] transition-rotate duration-300"
          size="8em"
        />
      ),
    },
    {
      title: "جدول وزن آهن آلات",
      description:
        "در قسمت محاسبه وزن اهن الات شما میتوانید اطلاعات دقیقی از وزن و قیمت آهن آلات داشته باشید و آنها را با هم مقایسه کنید با توجه به تعدد کارخانجات تولیدی در این زمینه هر محصول از هر کارخانه اعم از میلگرد، تیرآهن و ... وزن مشخصی دارد که اطلاعات آن در دست",
      logo: (
        <FaWeightScale
          className="text-accent hover:rotate-[360deg] transition-rotate duration-300"
          size="8em"
        />
      ),
    },
  ];

  if (size && size.width > 1000) {
    return (
      <>
        <div className="w-full flex flex-col justify-start items-center mx-auto">
          {/* landing gif */}
          <div className="max-w-[1300px] overflow-hidden rounded-lg">
            <video
              autoPlay={true}
              loop
              controls={false}
              className="w-full h-full my-5 rounded-lg px-5 object-contain"
            >
              <source src="/assets/landing/gif.mp4" type="video/mp4" />
            </video>
          </div>

          {/* banner and reminder */}
          <div className="w-full flex flex-col items-center justify-center lg:flex-row my-5 max-w-[1300px] px-5">
            {/* banner */}
            <div className="w-full lg:w-[70%] h-full">
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
          <div className="w-full flex flex-col gap-7 justify-between items-center lg:flex-row lg:my-10 max-w-[1300px] px-5 py-10">
            <h1 className="text-2xl lg:text-4xl flex flex-col min-w-fit">
              <span className="font-extralight">فروش و قیمت روز آهن آلات</span>
              <span className="font-bold">قیمت اهن الات ساختمانی و صنعتی</span>
            </h1>

            <span className="w-full text-gray-400 text-xl lg:text-2xl text-justify">
              مشاوره رایگان پیش از خرید آهن آلات، تحلیل به روز بازار و قیمت اهن،
              ارائه ضمانت نامه کتبی کیفیت محصولات و قیمت اهن الات صنعتی و
              ساختمانی
            </span>
          </div>

          {/* table and descriptions */}
          <div className="w-full flex flex-col gap-10 bg-pagesBackground py-16">
            {/* table */}
            <div className="w-full px-5 max-w-[1300px] mx-auto">
              <Tabs items={dataTableTabs} size="large" />
              <Table columns={[]} dataSource={[]} className="w-full" />
            </div>

            {/* descriptions */}
            <div className="w-full flex flex-col lg:flex-row gap-10 max-w-[1300px] mx-auto px-3">
              <div className="w-full lg:w-[50%] flex flex-col gap-4">
                <p className="text-3xl">سورنا فلز، خرید مطمئن آهن آلات</p>
                <p className="text-gray-400 leading-[180%] text-justify">
                  اعتماد یکی از مهمترین سرمایه های اجتماعی است، سرمایه ای که
                  پایداری، همدلی و پیشرفت و شکوفایی یک ملت را رقم میزنه. در
                  دنیای تجارت هم، اعتماد مشتریان ضمانتی برای بقا و پیشرفت هر کسب
                  و کار محسوب میشه. قابل اعتماد بودن چیزی است فراتر از پذیرش
                  مسئولیت، باور به صداقت یک فرد یا سازمان یعنی اطمینان از
                  برآورده شدن انتظارات و امنیت منافع شما. اعتماد یک پیمان دو
                  جانبه است برای دستیابی به اهداف و انجام درست یک رفتار. ما در
                  مجموعه آهن پرایس با عشق و انگیزه فراوان در تلاشیم تا خالق و
                  حافظ این اعتماد باشیم و تجربه ای راحت و مطمئن از خرید آهن آلات
                  رو به شما ارائه بدیم.
                </p>
              </div>

              <div className="w-full lg:w-[50%] px-5">
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
          <div className="w-full flex flex-col gap-3 items-center py-5 px-5 max-w-[1300px]">
            {/* title */}
            <p className="text-3xl">استعلام لحظه ای قیمت آهن آلات</p>

            <EmployeesPreview
              employeesGroups={employeesGroups}
              allEmployees={employees}
            />
          </div>

          {/* features */}
          <div className="w-full flex flex-wrap justify-between gap-7 py-5 px-5 max-w-[1300px]">
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

            <div className="w-full h-auto flex flex-col items-center justify-between lg:flex-row gap-2 my-5-between p-4 lg:p-7 bg-pagesBackground max-w-[1300px] rounded-xl">
              <span className="text-3xl lg:text-5xl">
                آهن پرایس ، قیمت روز آهن آلات
              </span>
              <span className="text-gray-400 text-xl text-2xl w-full lg:max-w-[50%]">
                ضمانتنامه کتبی برای کیفیت تمامی آهن آلات و انجام امور فنی و
                آزمایشگاهی و امکان خرید اعتباری اهن بخشی از خدمات ما در آهن
                پرایس به مشتریان مان است.
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
              src={employeeImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* weblogs */}
          <div className="w-full flex flex-wrap flex-col justify-evenly lg:flex-row items-center lg:items-start gap-16 lg:gap-10 my-14 px-5 max-w-[1300px]">
            {/* filters */}
            <WeblogFilters weblogCategories={weblogCategories} />

            {/* weblogs */}
            {weblogCategories
              ? weblogCategories?.map((pc) => (
                  <div className="max-w-[350px] flex flex-col">
                    <h2 className="text-3xl border-b-2 pb-3">{pc?.name}</h2>

                    {posts
                      ? posts.map((post, index) => {
                          if (pc?.id === post?.categorypost_id) {
                            return (
                              <div
                                key={index}
                                className="w-full h-[80px] flex items-center gap-5 border-y py-3"
                              >
                                <div className="w-[40%] h-full cursor-pointer rounded-lg">
                                  <Image
                                    width={100}
                                    height={50}
                                    src={imageUrl + post?.image}
                                    alt=""
                                    className="w-full h-full rounded-lg object-contain"
                                  />
                                </div>

                                <div className="flex flex-col">
                                  <Link
                                    href={`weblogs/weblog?slug=${post.slug}`}
                                    className="text-sm cursor-pointer hover:text-accent"
                                  >
                                    {formatHelper.cutString(post?.title)}
                                  </Link>
                                  <span className="text-sm text-gray-400">
                                    {post?.created_at
                                      ? formatHelper.toPersianString(
                                          moment(post?.created_at)
                                            .locale("fa")
                                            .format("HH:mm")
                                        )
                                      : null}{" "}
                                    -
                                    {post?.created_at
                                      ? formatHelper.toPersianString(
                                          moment(post?.created_at)
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
                ))
              : null}
          </div>
        </div>
      </>
    );
  } else {
    return <MobileLanding posts={posts} weblogCategories={weblogCategories} />;
  }
}

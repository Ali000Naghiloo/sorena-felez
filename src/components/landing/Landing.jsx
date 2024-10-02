import Image from "next/image";
// import gif from "";
import banner from "@/src/assets/landing/banner.jpg";
import { Button, Input, Table, Tabs } from "antd";
import dynamic from "next/dynamic";

export default function Landing() {
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
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

  return (
    <>
      <div className="w-full flex flex-col justify-start items-center mx-auto">
        {/* landing gif */}
        <video
          autoPlay
          controls
          className="w-full h-[400px] my-5 rounded-lg max-w-[1600px] px-5"
        >
          <source src={`/assets/gif.mp4`} type="video/mp4" />
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
        <div className="w-full flex flex-col gap-3 justify-between items-center lg:flex-row my-10 max-w-[1600px] px-5">
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
        <div className="w-full flex flex-col gap-10 bg-pagesBackground min-h-[700px]">
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
              <video className="w-full">
                <source src="https://www.aparat.com/v/j73i61p" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

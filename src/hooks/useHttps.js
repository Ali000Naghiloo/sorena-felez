import axios from "axios";
import { toast } from "react-hot-toast";
import { getLocal } from "./functions";

export const baseURL = "https://panel.sepantaahvaz.com/api/v1/";
export const imageUrl = "https://panel.sepantaahvaz.com/uploads/images/";

const useHttp = () => {
  var token = getLocal("token");

  const httpService = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    baseURL: baseURL,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        }
      : {},
  });

  httpService.interceptors.response.use(
    (response) => response,
    async ({ error, response }) => {
      if (response?.status == 401) {
        localStorage.removeItem("token");
        window.location.replace("/login");
        toast.error("شما از برنامه خارج شده اید");
      }
      if (response?.status === 400) {
        toast.error("مشکلی در اطلاعات ارسالی وجود دارد");
      } else if (response?.status === 403) {
        toast.error("شما به این بخش دسترسی ندارید");
      } else if (response?.status === 404) {
        toast.error("درخواست مورد نظر شما پیدا نشد");
      } else if (response?.status === 429) {
        toast.error(
          "به علت تعداد درخواست زیاد شما قادر به ارسال درخواست بیشتر نیستید"
        );
      } else if (response?.status === 500) {
        toast.error("مشکلی از سمت سرور پیش آمده لطفا بعدا تلاش کنید");
      } else if (response?.data?.msg) {
        toast.error(response?.data?.msg);
      } else {
        console.log(error, response);
        toast.error("خطا در برقراری ارتباط");
      }
    }
  );

  const exports = { httpService };

  return exports;
};

export default useHttp;

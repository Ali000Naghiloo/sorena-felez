import localFont from "next/font/local";
import "./globals.css";
import Header from "@/src/components/header/Header";
import Footer from "@/src/components/footer/Footer";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import fa_IR from "antd/locale/fa_IR";
import "swiper/css";
import { Toaster } from "react-hot-toast";
// import "swiper/swiper.min.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const persianFont = localFont({
  // src: "./fonts/yekan/Yekan.woff",
  src: "./fonts/IRANSansWeb_FaNum.ttf",
  variable: "--font-yekan",
  weight: "100 900",
});

export const metadata = {
  title: "سورنا فلز",
  description: "best metal creator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        style={persianFont.style}
        className={`${persianFont.variable} antialiased`}
      >
        <Header />
        <AntdRegistry>
          <ConfigProvider
            locale={fa_IR}
            direction="rtl"
            theme={{
              token: {
                colorPrimary: "#15a1ed",
                fontFamily: persianFont.style,
              },
            }}
          >
            <Toaster
              position="bottom-center"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{ marginBottom: "50px" }}
              toastOptions={{
                // Define default options
                className: "",
                duration: 5000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },

                // Default options for specific types
                success: {
                  duration: 4000,
                  theme: {
                    primary: "green",
                    secondary: "black",
                  },
                },
              }}
            />
            <div className="mx-auto">{children}</div>
          </ConfigProvider>
        </AntdRegistry>
        <Footer />
      </body>
    </html>
  );
}

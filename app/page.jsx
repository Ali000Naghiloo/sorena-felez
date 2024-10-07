import Landing from "@/src/components/landing/Landing";
import axios from "axios";

export const getPosts = async () => {
  const datas = await axios
    .get("getMenus")
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });

  return datas;
};

export default async function Home() {
  const data = await axios
    .get("https://sorena.webcomdemo.ir/api/v1/getMenus")
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });
  console.log(data);

  return (
    <>
      {data && data.length !== 0 ? (
        data.map((d) => <div>{d.name}</div>)
      ) : (
        <>دیتایی نیست</>
      )}
      {/* <Landing /> */}
    </>
  );
}

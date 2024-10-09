import Weblog from "@/src/components/weblogs/Weblog";
import { baseURL } from "@/src/hooks/useHttps";
import axios from "axios";
import React from "react";

export const getWeblogCategories = async () => {
  const datas = await axios
    .get(`${baseURL}getPostCategories`)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });

  return datas;
};

export default async function page() {
  const weblogCategories = await getWeblogCategories();

  return (
    <>
      <Weblog weblogCategories={weblogCategories} />
    </>
  );
}

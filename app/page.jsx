import Landing from "@/src/components/landing/Landing";
import { baseURL } from "@/src/hooks/useHttps";
import axios from "axios";

export const getPosts = async () => {
  const datas = await axios
    .get(`${baseURL}getPosts`)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });

  return datas;
};

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

export const getEmployeesGroups = async () => {
  const datas = await axios
    .get(`${baseURL}getGroups`)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });

  return datas;
};

export const getEmployeesByGroup = async () => {
  const datas = await axios
    .get(`${baseURL}getTeamByGroup`)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });

  return datas;
};

export default async function Home() {
  const posts = await getPosts();
  const weblogCategories = await getWeblogCategories();
  const groups = await getEmployeesGroups();
  const employees = await getEmployeesByGroup();

  return (
    <>
      <Landing
        posts={posts}
        employees={employees}
        weblogCategories={weblogCategories}
        employeesGroups={groups}
      />
    </>
  );
}

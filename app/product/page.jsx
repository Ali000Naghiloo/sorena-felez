import Product from "@/src/components/product/Product";
import axios from "axios";
import React, { Suspense } from "react";

// // Implement generateStaticParams
// export async function generateStaticParams() {
//   let data = [];

//   // Fetch your data source here. This could be from an API, filesystem, database, etc.
//   await axios
//     .get("filters")
//     .then((res) => {
//       data = res.data;
//     })
//     .catch(() => {});

//   // Map the data to the required params format
//   return data.map((item) => ({
//     slug: item.slug,
//   }));
// }

export default function page() {
  return (
    <Suspense fallback={<></>}>
      <Product />
    </Suspense>
  );
}

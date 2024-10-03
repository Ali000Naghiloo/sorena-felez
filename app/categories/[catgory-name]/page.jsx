import Category from "@/src/components/category/Category";
import React from "react";

export default function page({ params }) {
  return (
    <>
      <Category category={params} />
    </>
  );
}

import Filters from "@/src/components/filters/Filters";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<></>}>
      <Filters />
    </Suspense>
  );
}

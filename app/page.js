"use client";
import { Suspense, lazy } from "react";
import CheckAuth from "@/auth/checkAuth";
import Loading from "@/components/Loading";

const Products = lazy(() => import("@/components/Products"));

export default function Home() {
  return (
    <CheckAuth>
      <Suspense fallback={<Loading title={"تحميل الصفحة"} />}>
        <Products />
      </Suspense>
    </CheckAuth>
  );
}

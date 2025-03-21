"use client";
import { Suspense, lazy } from "react";
import CheckAuth from "@/auth/checkAuth";
import Loading from "@/components/Loading";

const Products = lazy(() => import("@/components/Products"));
const UsersTable = lazy(() => import("@/components/UsersTable"));

export default function Home() {
  return (
    <CheckAuth>
      <h1 className="text-3xl font-bold mb-5 flex items-center gap-1">
        <span className="py-3">قائمة المنتجات</span>
      </h1>
      <Suspense fallback={<Loading />}>
        <Products />
        <UsersTable />
      </Suspense>
    </CheckAuth>
  );
}

"use client";
import { Suspense, lazy } from "react";
import CheckAuth from "@/auth/checkAuth";
import Loading from "@/components/Loading";
import { useSelector } from "react-redux";

const Products = lazy(() => import("@/components/Products"));
const UsersTable = lazy(() => import("@/components/UsersTable"));
const Messages = lazy(() => import("@/components/Messages"));

export default function Home() {
  const { userData } = useSelector((state) => state.user);

  return (
    <CheckAuth>
      <h1 className="text-3xl font-bold mb-5 flex items-center gap-1">
        <span className="py-3">قائمة المنتجات</span>
      </h1>
      <Suspense fallback={<Loading title={"تحميل الصفحة"} />}>
        <Products />
        {userData?.position !== "normal" && <UsersTable />}
        {userData?.position === "owner" && <Messages />}
      </Suspense>
    </CheckAuth>
  );
}

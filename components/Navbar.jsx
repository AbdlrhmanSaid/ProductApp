"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { IoLogOutOutline, IoMenu } from "react-icons/io5";
import { IoIosPersonAdd } from "react-icons/io";
import { MdInventory, MdPeople, MdAddShoppingCart } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";
import { logoutUser } from "@/store/slices/userSlice";
import Image from "next/image";
import Link from "next/link";

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const reduxUser = useSelector((state) => state.user.userData);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setUser(reduxUser);
  }, [reduxUser]);

  const signOut = () => {
    sessionStorage.removeItem("user_data");
    dispatch(logoutUser());
    router.push("/login");
  };

  // إخفاء النافبار إذا كان المسار هو /login
  if (pathname === "/login") {
    return null;
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-400 p-4 md:hidden">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image src="/favicon.png" width={100} height={50} alt="Logo" />
        </Link>

        {user ? (
          <>
            <button
              className=" text-white"
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
              <IoMenu className="w-7 h-7" />
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="text-white border border-white px-4 py-2 rounded"
          >
            تسجيل الدخول
          </Link>
        )}
      </div>

      {isMenuOpen && user && (
        <div className="md:hidden  p-4 mt-2 space-y-3 text-center">
          <Link
            href="/"
            className="text-white flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <MdInventory />
            المنتجات
          </Link>
          {user?.position !== "normal" && (
            <>
              <Link
                href="/users"
                className="text-white flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <MdPeople />
                المستخدمون
              </Link>
              <Link
                href="/add-user"
                className="text-white flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <IoIosPersonAdd />
                اضافة مستخدم
              </Link>
              <Link
                href="/add-product"
                className="text-white flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <MdAddShoppingCart />
                اضافة منتج
              </Link>
              <Link
                href="/stands"
                className="text-white flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <MdOutlineInventory2 />
                المخازن
              </Link>
            </>
          )}
          {user?.position === "owner" && (
            <Link
              href="/messages"
              className="text-white flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <BiMessageDetail />
              الاشاعارات
            </Link>
          )}
          <Link
            href={`/profile/${user._id}`}
            className="text-white flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <FaUser />
            الصفحه الشخصيه
          </Link>
          <button
            onClick={() => {
              signOut();
              setMenuOpen(false);
            }}
            className="text-white flex items-center gap-2"
          >
            <IoLogOutOutline className="m-auto h-7 w-7" />
          </button>
        </div>
      )}
    </nav>
  );
}

export default ResponsiveAppBar;

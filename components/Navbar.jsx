"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { IoPerson, IoLogOutOutline, IoMenu } from "react-icons/io5";
import { MdInventory, MdPeople } from "react-icons/md";
import { logoutUser } from "@/store/slices/userSlice";
import Image from "next/image";
import Link from "next/link";

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const router = useRouter();
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

  return (
    <nav className="bg-[#1976D2] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image src="/favicon.png" width={100} height={50} alt="Logo" />
        </Link>

        {user ? (
          <>
            <div className="hidden md:flex space-x-6">
              <Link
                href="/#products"
                className="text-white flex items-center gap-2"
              >
                <MdInventory />
                المنتجات
              </Link>
              <Link
                href="/#users"
                className="text-white flex items-center gap-2"
              >
                <MdPeople />
                المستخدمون
              </Link>
            </div>

            {/* User Actions */}
            <div className="hidden md:flex space-x-4">
              <Link href={`/profile/${user._id}`} className="text-white">
                <IoPerson className="w-7 h-7" />
              </Link>
              <button onClick={signOut} className="text-white">
                <IoLogOutOutline className="w-7 h-7" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
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
            href="/#products"
            className="block text-white"
            onClick={() => setMenuOpen(false)}
          >
            المنتجات
          </Link>
          <Link
            href="/#users"
            className="block text-white"
            onClick={() => setMenuOpen(false)}
          >
            المستخدمون
          </Link>
          <Link
            href={`/profile/${user._id}`}
            className="block text-white"
            onClick={() => setMenuOpen(false)}
          >
            الملف الشخصي
          </Link>
          <button
            onClick={() => {
              signOut();
              setMenuOpen(false);
            }}
            className="block text-white w-full text-center"
          >
            <IoLogOutOutline className="m-auto h-7 w-7" />
          </button>
        </div>
      )}
    </nav>
  );
}

export default ResponsiveAppBar;

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { IoMdHome, IoIosLogOut, IoIosPersonAdd } from "react-icons/io";

import { MdAddShoppingCart } from "react-icons/md";
import { FaUserFriends, FaUser } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { logoutUser } from "@/store/slices/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const reduxUser = useSelector((state) => state.user.userData);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(reduxUser);
  }, [reduxUser]);

  const signOut = () => {
    sessionStorage.removeItem("user_data");
    dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <>
      {user && (
        <div className="m-[1%] hidden md:flex flex-col items-center bg-white h-screen px-4 py-6 shadow-xl rounded-lg">
          <div className="mb-8 ">
            <Image
              src={"/smIcon.png"}
              width={70}
              height={70}
              alt="logo"
              className="rounded-full shadow-md border"
            />
          </div>

          <nav className="flex-1 ">
            <ul className="space-y-4">
              <SidebarItem href="/" icon={<IoMdHome />} />
              {user?.position !== "normal" && (
                <>
                  <SidebarItem href="/users" icon={<FaUserFriends />} />
                  <SidebarItem href="/add-user" icon={<IoIosPersonAdd />} />
                  <SidebarItem
                    href="/add-product"
                    icon={<MdAddShoppingCart />}
                  />
                </>
              )}
              {user?.position === "owner" && (
                <SidebarItem href="/messages" icon={<TiMessages />} />
              )}
            </ul>
          </nav>

          <div className=" mt-auto">
            <ul className="space-y-4">
              <SidebarItem href={`/profile/${user._id}`} icon={<FaUser />} />
              <li>
                <button
                  onClick={signOut}
                  className="flex items-center  text-red-600 bg-red-100 hover:bg-red-200 p-3 rounded-lg transition duration-300"
                >
                  <IoIosLogOut className="text-2xl" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

const SidebarItem = ({ href, icon }) => (
  <li>
    <Link
      href={href}
      className="flex items-center justify-center w-full text-blue-600 bg-blue-100 hover:bg-blue-200 p-3 rounded-lg transition duration-300"
    >
      <span className="text-2xl">{icon}</span>
    </Link>
  </li>
);

export default Sidebar;

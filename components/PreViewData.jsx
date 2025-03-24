import React from "react";
import Image from "next/image";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { BiCategory } from "react-icons/bi";
import { IoPerson } from "react-icons/io5";

const PreViewData = ({ data, ...props }) => {
  return data === "user" ? <PreUser {...props} /> : <PreCard {...props} />;
};

const PreCard = ({
  image = "/warehoues.jpg",
  title = "لا يوجد",
  category = "لا يوجد",
  price = "لا يوجد",
}) => {
  return (
    <div className="hidden sm:block border p-6 rounded-xl shadow-lg bg-white transition-all transform hover:scale-105 hover:shadow-xl">
      <Image
        width={300}
        height={300}
        src={image ? image : "/warehoues.jpg"}
        alt={title}
        priority
        className="w-full h-48 object-cover rounded-lg cursor-pointer"
      />
      <div className="mt-4">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <h1 className="text-gray-600 flex items-center gap-2 font-semibold text-lg mt-2">
          <BiCategory className="text-xl text-gray-500" />
          <span>{category}</span>
        </h1>
        <p className="text-green-700 font-bold flex items-center gap-2 mt-2 text-lg">
          <HiOutlineCurrencyDollar className="text-xl text-green-600" />
          <span>{price} $</span>
        </p>
      </div>
    </div>
  );
};

const PreUser = ({
  username = "غير متوفر",
  email = "غير متوفر",
  position = "غير متوفر",
}) => {
  return (
    <div className="hidden sm:flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-extrabold text-center text-[#1976D2] mb-6">
          بيانات المستخدم
        </h1>
        <div className="flex flex-col items-center">
          <IoPerson className="w-28 h-28 rounded-full border-4 bg-[#1976D2] border-[#1976D2] shadow-lg text-white" />
          <div className="mt-5 text-center space-y-4">
            <p className="text-lg text-gray-700 font-medium">
              <strong className="text-gray-900">الاسم: </strong>
              {username}
            </p>
            <p className="text-lg text-gray-700 font-medium">
              <strong className="text-gray-900">البريد الإلكتروني: </strong>
              {email}
            </p>
            <p className="text-lg text-gray-700 font-medium">
              <strong className="text-gray-900">الصلاحية: </strong>
              {position}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreViewData;

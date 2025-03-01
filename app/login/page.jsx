"use client";
import { useState } from "react";
import Image from "next/image";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import AlertMsg from "@/components/AlertMsg";

const Page = () => {
  const [typeEmail, setTypeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nextBtn, setNextBtn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // جلب بيانات المستخدم من الـ API
  const fetchUserData = async (email) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://nodeproject-production-dc03.up.railway.app/getUserByEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("مستخدم غير موجود");
      }

      const data = await response.json();
      setUserData(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  // إرسال البريد الإلكتروني والتحقق من وجود المستخدم
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = await fetchUserData(typeEmail);
    if (data) {
      setNextBtn(true);
    }
  };

  // التحقق من كلمة المرور
  const handlePasswordCheck = async () => {
    setError("");

    if (!userData) {
      setError("يرجى إدخال البريد الإلكتروني أولاً");
      return;
    }

    // التحقق من كلمة المرور مباشرة بدون جلب البيانات مرة أخرى
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (passwordMatch) {
      sessionStorage.setItem("user_id", userData._id);
      router.push("/");
    } else {
      setError("كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-xl font-semibold bg-gray-700 mb-4 text-center">
          <Image
            src="/favicon.png"
            width={100}
            height={50}
            alt="Logo"
            className="m-auto"
          />
        </h2>

        {/* إدخال البريد الإلكتروني */}
        <div className="mb-4">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            value={typeEmail}
            onChange={(e) => setTypeEmail(e.target.value)}
            disabled={nextBtn}
            required
          />
        </div>

        {/* إدخال كلمة المرور */}
        {nextBtn && (
          <div className="mb-4">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="أدخل كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={handlePasswordCheck}
              className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              تحقق
            </button>
          </div>
        )}

        {/* زر إرسال البريد الإلكتروني */}
        {!nextBtn && (
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 mb-3"
          >
            {loading ? "جاري التحميل..." : "إدخال"}
          </button>
        )}

        {error && (
          <div>
            <AlertMsg msg={error} />
            <button
              onClick={() => {
                setError("");
                setNextBtn(false);
                setTypeEmail("");
                setPassword("");
                setUserData(null);
              }}
              className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              إعادة المحاولة
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Page;

"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const NotAdmin = ({ children }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user.userData);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (user) {
      if (user.position === "normal") {
        router.replace("/");
      }
      setIsChecking(false);
    }
  }, [user, router]);

  if (!user || isChecking) {
    return <Loading title="جاري التحقق من الصلاحيات..." />;
  }

  if (user.position === "normal") {
    return null;
  }

  return <>{children}</>;
};

export default NotAdmin;

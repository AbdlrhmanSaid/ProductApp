import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const NotAdmin = ({ children }) => {
  const user = useSelector((state) => state.user.userData);
  const router = useRouter();

  useEffect(() => {
    if (user.position === "normal") {
      router.push("/");
    }
  }, [user, router]);

  if (user.position === "normal") {
    return null;
  }

  return <>{children}</>;
};

export default NotAdmin;

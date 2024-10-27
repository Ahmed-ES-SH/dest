"use client";
import ScrollToTopButton from "../_componants/_webiste/Go_up";
import Topbar from "../_componants/_dashboard/Topbar.jsx";
import SidebarComponent from "../_componants/_dashboard/Sidebar";
import { useEffect, useState } from "react";
import { instance } from "../Api/axios";
import Cookie from "cookie-universal";
import Forbidden from "../_componants/Forbidden";
export default function DashbordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = Cookie();
  const token = cookie.get("madad_token");
  const [currentuser, setcurrentuser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(true); // حالة للتحقق من التفويض

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) {
          throw new Error("No token found");
        }
        const response = await instance.get("/currentuser");
        setcurrentuser(response.data.user);
        console.log(response);
        // تحقق من دور المستخدم
        if (response.data.user.role !== "Admin") {
          setIsAuthorized(false);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setIsAuthorized(false); // في حال حدوث خطأ، تعتبر غير مصرح
      }
    };

    fetchUser();
  }, [token]);

  console.log(currentuser);

  // إذا لم يكن المستخدم مصرحًا، تظهر الرسالة
  if (!isAuthorized) {
    return (
      <div className="text-center h-screen flex items-center justify-center mt-10 text-red-600">
        <Forbidden />
      </div>
    );
  }

  return (
    <>
      <Topbar />
      <div className="flex gap-2 w-[99%]">
        <SidebarComponent />
        <div className="pt-2 w-[99%] mx-auto overflow-hidden">{children}</div>
      </div>
      <ScrollToTopButton />
    </>
  );
}

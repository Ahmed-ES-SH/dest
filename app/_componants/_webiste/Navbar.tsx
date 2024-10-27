/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Img from "../Image";
import Link from "next/link";
import DarkmodeButton from "../DarkmodeButton";
import { navlinks } from "@/app/constants/websitecontent";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { motion } from "framer-motion";
import { MdOutlineLogout } from "react-icons/md";
import { Usevariables } from "@/app/context/VariablesProvider";
import { RiArrowDropDownLine } from "react-icons/ri"; // استبدال أيقونة السهم
import { instance } from "@/app/Api/axios";
import Cookie from "cookie-universal";
import LoadingSpiner from "../LoadingSpiner";
export default function Navbar() {
  const cookie = Cookie();
  const {
    currentuser,
    setLanguage,
    language,
    global_loading,
    setglobal_loading,
  }: {
    global_loading: any;
    setglobal_loading: any;
    currentuser: any;
    setLanguage: any;
    language: any;
  } = Usevariables();
  const token = cookie.get("madad_token");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isActive, setActive] = useState<boolean>(false); // حالة لتحديد إذا كانت الصفحة متاحة
  const [title_en, settitle_en] = useState<boolean>(true); // حالة التحميل
  const [title_ar, settitle_ar] = useState<string>(""); // حالة التحميل
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const userMenuItems = [
    {
      name: language == "en" ? "dashboard" : "لوحة التحكم",
      href: "/dashboard",
    },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageChange = (mainlanguage: React.SetStateAction<string>) => {
    setSelectedLanguage(mainlanguage);
    setLanguage(mainlanguage === "English" ? "en" : "ar");
    setIsDropdownOpen(false);
  };

  const handlelogout = async () => {
    try {
      setglobal_loading(true);
      const response = await instance.post("/logout");
      cookie.remove("madad_token");
      if (typeof window !== undefined) {
        window.location.pathname = "/signin";
      }
      setglobal_loading(false);
      throw response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await instance.get("/get-status");
        const response_2 = await instance.get("/gettitle");
        // تحقق مما إذا كانت الحالة "active"
        setActive(response.data.status === "active");
        settitle_en(response_2.data.title_en);
        settitle_ar(response_2.data.title_ar);
      } catch (error) {
        console.error("Error fetching status:", error);
        setActive(false); // إذا حدث خطأ، نفترض أن الصفحة غير متاحة
      }
    };

    fetchStatus();
  }, []);

  return (
    <>
      {global_loading ? (
        <div className="relative h-screen">
          {/* شاشة التحميل */}
          <div className="fixed inset-0 bg-white z-[9999999999999] flex items-center justify-center">
            <LoadingSpiner />
          </div>
          {/* باقي المحتوى */}
          <div>{/* المحتويات الأخرى */}</div>
        </div>
      ) : (
        <>
          <div className="w-full z-[999] h-[70px] shadow-md px-2 py-2 fixed bg-main_blue">
            <div className="mainbar w-[90%] m-auto flex items-center justify-between">
              <div className="logo relative">
                <Link className=" outline-none" href={"/"}>
                  <Img
                    imgsrc="/logo.png"
                    styles="w-[90px]  outline-none object-contain"
                  />
                </Link>
              </div>
              <div className="links max-lg:hidden text-white">
                <ul className="flex items-center gap-6 text-[16px]">
                  {navlinks.map((link, index) => (
                    <Link
                      href={link.link ? link.link : "/#contactus"}
                      key={index}
                      className="group main_link  relative hover:text-sky-200 duration-150 cursor-pointer"
                    >
                      <p>{language === "en" ? link.text.en : link.text.ar}</p>
                      {/* تعديل هنا */}
                      <div className="line group-hover:w-full duration-300 w-0 bg-sky-400 h-[2px] absolute"></div>
                      <div className="circle group-hover:visible duration-300 w-[3px] invisible left-2 h-[3px] rounded-full bg-white z-[999] absolute"></div>
                    </Link>
                  ))}
                  {isActive && (
                    <Link
                      href={"/landingpage"}
                      className="group main_link  relative hover:text-sky-200 duration-150 cursor-pointer"
                    >
                      <p>{language === "en" ? title_en : title_ar}</p>
                      {/* تعديل هنا */}
                      <div className="line group-hover:w-full duration-300 w-0 bg-sky-400 h-[2px] absolute"></div>
                      <div className="circle group-hover:visible duration-300 w-[3px] invisible left-2 h-[3px] rounded-full bg-white z-[999] absolute"></div>
                    </Link>
                  )}
                </ul>
              </div>
              <div className="btn+toggel relative flex items-center gap-2 ">
                {/* زر تبديل اللغة بشكل dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex  items-center px-4 py-2 text-white bg-main_blue rounded-md shadow-md"
                  >
                    {selectedLanguage} {/* عرض اللغة المختارة */}
                    <RiArrowDropDownLine className="w-4 h-4 ml-2" />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute  right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleLanguageChange("العربية")}
                      >
                        العربية
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleLanguageChange("English")}
                      >
                        English
                      </button>
                    </div>
                  )}
                </div>
                {token ? (
                  <div className="">
                    <button
                      type="button"
                      className="overflow-hidden mt-2 rounded-full shadow-inner"
                      onClick={toggleUserMenu}
                    >
                      <span className="sr-only">Toggle dashboard menu</span>
                      <Img
                        imgsrc={
                          currentuser && currentuser.image
                            ? currentuser.image
                            : "/avatar-1.jpg"
                        }
                        styles="w-[40px] h-[40px]"
                      />
                    </button>

                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute right-8 z-10 mt-0.5 w-56 divide-y rounded-md bg-white dark:bg-secend_dash dark:text-secend_text  shadow-lg"
                        role="menu"
                      >
                        <div className="p-2">
                          {userMenuItems.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:hover:text-white dark:hover:bg-sky-300"
                              role="menuitem"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>

                        <div className="p-2">
                          <button
                            onClick={handlelogout}
                            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                          >
                            <MdOutlineLogout className="size-4" />
                            {language == "en" ? "Logout" : "تسجيل خروج"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={"/signup"}
                    className=" max-lg:hidden   px-4 block shadow-md group overflow-hidden h-full relative py-2 rounded-full bg-main_blue"
                  >
                    <p className="z-[999] relative group-hover:text-black text-white duration-300 ">
                      {language == "en" ? "Join now" : "إنضم الأن"}
                    </p>
                    <div className="group-hover:w-full left absolute right-0 top-0 bg-white w-0 duration-700 h-[500px]"></div>
                    <div className="group-hover:w-full right absolute left-0 top-0 bg-white w-0 duration-700 h-[500px]"></div>
                  </Link>
                )}
                <button className="w-[40px] h-[40px] max-lg:hidden relative overflow-hidden rounded-full bg-white shadow-md flex items-center justify-center">
                  <DarkmodeButton />
                </button>
                <div
                  className="bars text-white cursor-pointer lg:hidden"
                  onClick={toggleSidebar}
                >
                  <HiOutlineBars3BottomRight size={30} />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`fixed lg:hidden top-0 right-0 w-[250px] h-full text-white bg-main_blue shadow-md z-[9999] transform ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out lg:hidden`}
          >
            <div className="logo relative">
              <Link className=" outline-none" href={"/"}>
                <Img
                  imgsrc="/logo.png"
                  styles="w-[90px]  outline-none object-contain"
                />
              </Link>
            </div>
            <div className="flex flex-col items-start p-4 w-full">
              <div className="flex items-baseline justify-between w-full">
                <button className="w-[30px] h-[30px] relative overflow-hidden rounded-full bg-transparent shadow-md flex items-center justify-center">
                  <DarkmodeButton />
                </button>
                <button className="self-end mb-4" onClick={toggleSidebar}>
                  <HiOutlineBars3BottomRight size={30} className="text-white" />
                </button>
              </div>
              <ul className="flex flex-col items-start gap-4 text-sky-300 w-full">
                {navlinks.map((link, index) => (
                  <Link
                    href={link.link ? link.link : "/#contactus"}
                    key={index}
                    className="group main_link text-[18px] relative hover:text-sky-200 duration-150 cursor-pointer"
                  >
                    <p>{language === "en" ? link.text.en : link.text.ar}</p>{" "}
                    {/* تعديل هنا */}
                    <div className="line group-hover:w-full duration-300 w-0 bg-sky-400 h-[2px] absolute"></div>
                    <div className="circle group-hover:visible duration-300 w-[3px] invisible left-2 h-[3px] rounded-full bg-white z-[999] absolute"></div>
                  </Link>
                ))}
                {isActive && (
                  <Link
                    href={"/landingpage"}
                    className="group main_link  relative hover:text-sky-200 duration-150 cursor-pointer"
                  >
                    <p>{language === "en" ? title_en : title_ar}</p>
                    {/* تعديل هنا */}
                    <div className="line group-hover:w-full duration-300 w-0 bg-sky-400 h-[2px] absolute"></div>
                    <div className="circle group-hover:visible duration-300 w-[3px] invisible left-2 h-[3px] rounded-full bg-white z-[999] absolute"></div>
                  </Link>
                )}
                <Link
                  href={"/signup"}
                  className="group main_link text-[18px] relative hover:text-sky-200 duration-150 cursor-pointer"
                >
                  <p>{language === "en" ? "Join Now" : "انضم الأن"}</p>
                  {/* تعديل هنا */}
                  <div className="line group-hover:w-full duration-300 w-0 bg-sky-400 h-[2px] absolute"></div>
                  <div className="circle group-hover:visible duration-300 w-[3px] invisible left-2 h-[3px] rounded-full bg-white z-[999] absolute"></div>
                </Link>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}

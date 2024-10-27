"use client";
import React, { useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { motion } from "framer-motion";
import Img from "../Image";
import Link from "next/link";
import { Usevariables } from "@/app/context/VariablesProvider";
import { FaBars, FaSortDown } from "react-icons/fa";
import DarkmodeButton from "../DarkmodeButton";
import { instance } from "@/app/Api/axios";

const HeaderComponent = () => {
  const { setLanguage, setopensidebar, language, currentuser } = Usevariables();
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuItems = [{ name: "Home", href: "/" }];

  // دالة تسجيل الخروج
  const handleLogout = async () => {
    try {
      const response = await instance.post("/logout");

      if (response.status === 200) {
        console.log("Logout successful");
        // إعادة التوجيه إلى صفحة تسجيل الدخول
        if (typeof window !== undefined) {
          window.location.pathname = "/login";
        }
      } else {
        console.error("Logout failed:", response.data);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setLanguage(language === "English" ? "en" : "ar");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-main_blue fixed w-full z-[999999]">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link className="block" href="/">
              <span className="sr-only">Home</span>
              <Img imgsrc="/logo.png" styles="w-[80px] object-contain" />
            </Link>
            <FaBars
              onClick={() => setopensidebar((prev) => !prev)}
              className="size-6 text-white cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-4">
            {currentuser && (
              <div className="md:relative">
                <button
                  type="button"
                  className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
                  onClick={toggleUserMenu}
                >
                  <span className="sr-only">Toggle dashboard menu</span>
                  {currentuser ? ( // شرط التحقق من وجود المستخدم
                    <Img
                      imgsrc={
                        currentuser.image ? currentuser.image : "/avatar-1.jpg"
                      }
                      styles="w-[40px] object-cover"
                    />
                  ) : (
                    <span className="w-[40px] h-[40px] bg-gray-300 rounded-full" />
                  )}
                </button>

                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute ${
                      language === "en" ? "right-8" : "left-8"
                    } z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg`}
                    role="menu"
                  >
                    <div className="p-2">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                          role="menuitem"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>

                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                        role="menuitem"
                      >
                        <MdOutlineLogout className="size-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
            <div className="w-[40px] h-[40px] border bg-white border-gray-300 rounded-full relative flex items-center justify-center">
              <DarkmodeButton />
            </div>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-between px-2 w-[100px] py-2 text-white bg-main_blue rounded-md shadow-md"
              >
                {selectedLanguage}
                <FaSortDown />
              </button>
              {isDropdownOpen && (
                <div
                  className={`absolute ${
                    language === "en" ? "right-0" : "left-0"
                  } mt-2 w-40 bg-white rounded-md shadow-lg z-10`}
                >
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleLanguageChange("عربي")}
                  >
                    عربي
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;

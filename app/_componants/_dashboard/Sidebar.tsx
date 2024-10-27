"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiFilePlus, FiHome } from "react-icons/fi";
import Link from "next/link";
import {
  FaBorderAll,
  FaCommentAlt,
  FaComments,
  FaLayerGroup,
  FaStop,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import {
  FaClipboardQuestion,
  FaGears,
  FaNoteSticky,
  FaPhoneFlip,
  FaPlus,
  FaRegNewspaper,
} from "react-icons/fa6";
import { ImBlogger } from "react-icons/im";
import { BsPlusCircleDotted } from "react-icons/bs";
import { Usevariables } from "@/app/context/VariablesProvider";
import { GiTeamDowngrade } from "react-icons/gi";
import { GrDomain } from "react-icons/gr";
import { MdAddHome } from "react-icons/md";

const navs = [
  {
    name: { en: "main section", ar: "  الواجهة الرئيسية" },
    icon: <GrDomain className="size-8 my-2 opacity-75" />,
    to: "/dashboard/hero-section",
  },
  {
    name: { en: "Home", ar: "الرئيسية" },
    icon: <FiHome className="size-8 my-2 opacity-75" />,
    to: "/dashboard/mainpage",
  },
  {
    name: { en: "Newsletter", ar: "النشرة البريدية" },
    icon: <FaRegNewspaper className="size-8 my-2 opacity-75" />,
    to: "/dashboard/newsletter",
  },
  {
    name: { en: "Landing page", ar: "صفحة الهبوط" },
    icon: <MdAddHome className="size-8 my-2 opacity-75" />,
    to: "/dashboard/landingpage",
  },
  {
    name: { en: "Requests", ar: "الطلبات" },
    icon: <FaBorderAll className="size-8 my-2 opacity-75" />,
    to: "/dashboard/orders",
  },
  {
    name: { en: "Users", ar: "المستخدمين" },
    icon: <FaUsers className="size-8 my-2 opacity-75" />,
    to: "/dashboard/users",
  },
  {
    name: { en: "Add User", ar: "أضف مستخدم" },
    icon: <FaUserPlus className="size-8 my-2 opacity-75" />,
    to: "/dashboard/adduser",
  },
  {
    name: { en: "Portfolio", ar: "معرض الأعمال" },
    icon: <FaLayerGroup className="size-8 my-2 opacity-75" />,
    to: "/dashboard/portfolio",
  },
  {
    name: { en: "Add New Project", ar: "أضف مشروع جديد" },
    icon: <FaPlus className="size-8 my-2 opacity-75" />,
    to: "/dashboard/addproject",
  },
  {
    name: { en: "Team Members", ar: "أعضاء الفريق" },
    icon: <GiTeamDowngrade className="size-8 my-2 opacity-75" />,
    to: "/dashboard/teammembers",
  },
  {
    name: { en: "Services", ar: "الخدمات" },
    icon: <FaGears className="size-8 my-2 opacity-75" />,
    to: "/dashboard/services",
  },
  {
    name: { en: "Add New Service", ar: "أضف خدمة جديدة" },
    icon: <BsPlusCircleDotted className="size-8 my-2 opacity-75" />,
    to: "/dashboard/addservice",
  },
  {
    name: { en: "Customer Testimonials", ar: "آراء العملاء" },
    icon: <FaComments className="size-8 my-2 opacity-75" />,
    to: "/dashboard/testimonial",
  },
  {
    name: { en: "Blog", ar: "المدونة" },
    icon: <ImBlogger className="size-8 my-2 opacity-75" />,
    to: "/dashboard/blog",
  },
  {
    name: { en: "Add New Post", ar: "أضف مقال جديد" },
    icon: <FiFilePlus className="size-8 my-2 opacity-75" />,
    to: "/dashboard/addpost",
  },
  {
    name: { en: "Company Details", ar: "تفاصيل الشركة" },
    icon: <FaNoteSticky className="size-8 my-2 opacity-75" />,
    to: "/dashboard/companydetailes",
  },
  {
    name: { en: "Contact Information", ar: "معلومات الاتصال" },
    icon: <FaPhoneFlip className="size-8 my-2 opacity-75" />,
    to: "/dashboard/calldetailes",
  },
  {
    name: {
      en: "Customer Messages and Complaints",
      ar: "رسائل وشكاوى العملاء",
    },
    icon: <FaCommentAlt className="size-8 my-2 opacity-75" />,
    to: "/dashboard/problems",
  },
  {
    name: { en: "FAQ Section", ar: "قسم الأسئلة والأجوبة" },
    icon: <FaClipboardQuestion className="size-8 my-2 opacity-75" />,
    to: "/dashboard/FAQ",
  },
  {
    name: { en: "Site Footer Links", ar: "روابط نهاية الموقع" },
    icon: <FaStop className="size-8 my-2 opacity-75" />,
    to: "/dashboard/footerdash",
  },
];

const SidebarComponent = () => {
  const { opensidebar, language } = Usevariables();

  // قم بتعريف حالة فتح الشريط الجانبي

  return (
    <motion.div
      className={`${
        opensidebar ? "md:w-64" : "w-16"
      } transition-width duration-300`} // تحديد العرض بناءً على opensidebar
      initial={{ width: opensidebar ? "4rem" : "0" }} // العرض الابتدائي
      animate={{ width: opensidebar ? "4rem" : "0" }} // العرض عند الفتح
    >
      <div className="flex h-full  relative z-[99999] flex-col justify-between border-e dark:bg-secend_dash dark:border-transparent bg-white">
        <div>
          <div className="inline-flex size-16 items-center justify-center">
            <span className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
              L
            </span>
          </div>

          <div className="border-t border-gray-100 dark:border-transparent">
            <div className="">
              <ul className="space-y-1 border-t border-gray-100 dark:border-transparent pt-4">
                {navs.map((item, index) => (
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }} // تأخير بسيط لكل عنصر
                    key={index}
                  >
                    <Link
                      href={item.to}
                      className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-main_orange hover:text-white duration-200 "
                    >
                      {item.icon}
                      <span className="invisible order-[99999999] z-[99999999999999999999] whitespace-nowrap absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-main_orange px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                        {item.name[language]}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SidebarComponent;

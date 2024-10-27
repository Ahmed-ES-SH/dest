/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Img from "../Image";
import { instance } from "@/app/Api/axios";
import { Usevariables } from "@/app/context/VariablesProvider";
import Link from "next/link";

export default function Footer() {
  const { language } = Usevariables();
  const [menus, setMenus] = useState([]); // إضافة حالة لتخزين القوائم
  const [email, setemail] = useState("");
  const [form, setform] = useState({
    facbook: "",
    youtube: "",
    instgram: "",
    x_account: "",
  });
  const [done_ar, setdone_ar] = useState("");
  const [done_en, setdone_en] = useState("");
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await instance.get("/footer-lists");
        const data = response.data;

        // إعداد هيكل القوائم بشكل صحيح
        const combinedLists: any = [
          { title: "قائمة 1", links: data.list1 },
          { title: "قائمة 2", links: data.list2 },
          { title: "قائمة 3", links: data.list3 },
          { title: "قائمة 4", links: data.list4 },
          { title: "قائمة 5", links: data.list5 },
        ];

        setMenus(combinedLists);
      } catch (error) {
        console.error("Error fetching footer lists:", error);
      }
    };

    fetchMenus();
  }, []);

  const handlesubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("subscriber_email", email);
    try {
      const response = await instance.post("/add-subscriber", formdata);
      setdone_ar(
        "شكرا على اشتراكك سنبقيك مطلع على أخر الأخبار الخاصة ب مدد ! "
      );
      setdone_en(
        "Thank you for subscribing, we will keep you updated with the latest news about Madad ! "
      );
      setemail("");
      throw response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getdata = async () => {
      const response = await instance.get("/getsociallinks");
      const data = response.data;
      setform({
        facbook: data.facebook,
        youtube: data.youtube,
        instgram: data.instgram,
        x_account: data.x_account,
      });
    };
    getdata();
  }, []);

  const socialicons = [
    { imgsrc: "/facebook.png", link: form.facbook },
    { imgsrc: "/instagram.png", link: form.instgram },
    { imgsrc: "/x.png", link: form.youtube },
    { imgsrc: "/youtube.png", link: form.x_account },
  ];

  return (
    <footer className="bg-main_blue dark:bg-main_dash">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-start lg:gap-8">
          <div className="text-teal-600">
            <Img imgsrc="/logo.png" styles="w-[120px] object-contain" />
          </div>

          <div className="mt-8  gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16 w-full">
            {/* قائمة الأخبار */}
            <div className="flex max-lg:flex-col w-full items-center justify-between">
              <div className="col-span-2">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {language == "en"
                      ? "Get the Last News"
                      : "احصل على آخر الأخبار!"}
                  </h2>
                  <p className="mt-4 text-gray-200 w-[430px] max-md:w-fit">
                    {language == "en"
                      ? "Follow The Last News!"
                      : "تابع جميع آخر الأخبار"}
                  </p>
                </div>
              </div>
              <div className=" ">
                <form onSubmit={handlesubmit} className="w-full">
                  <label htmlFor="UserEmail" className="sr-only">
                    Email
                  </label>

                  <div className="p-2 sm:flex sm:items-center sm:gap-4">
                    <input
                      type="email"
                      id="UserEmail"
                      placeholder="john@rhcp.com"
                      name="email"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setemail(e.target.value)
                      }
                      value={email}
                      className="w-[300px] max-md:w-full h-[5vh] outline-none rounded-md px-3 placeholder-shown:px-3 border-none focus:border-transparent focus:ring-transparent sm:text-sm"
                    />
                    <button className="mt-1 w-full bg-teal-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-teal-600 sm:mt-0 sm:w-auto sm:shrink-0">
                      {language == "en" ? "Subscribe" : "اشترك"}
                    </button>
                  </div>
                  {
                    <p className="mt-4 text-green-400 text-[18px] text-center ">
                      {language == "en" ? done_en : done_ar}
                    </p>
                  }
                </form>
              </div>
            </div>
            <div className="w-full grid grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2 gap-16 items-center justify-items-center my-6">
              {/* عرض القوائم من الـ API */}
              {menus &&
                menus.map((menu: any, index) => (
                  <div key={index} className="w-full">
                    <ul className="mt-6 space-y-4 text-sm">
                      {menu.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            href={link.url}
                            className="text-gray-100 transition hover:opacity-75"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
            <div className="flex items-center flex-wrap gap-4 pt-8">
              {socialicons.map((item, index) => (
                <Link
                  href={item.link ? item.link : "#"}
                  key={index}
                  className="group relative overflow-hidden w-[34px] h-[34px] flex items-center justify-center rounded-md bg-slate-200/80 shadow-sm"
                >
                  <Img
                    imgsrc={item.imgsrc}
                    styles="w-[20px] z-[999] cursor-pointer"
                  />
                  <div className="group-hover:w-full left absolute left-0 top-0 bg-main_orange w-0 duration-300 cursor-pointer h-[500px]"></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

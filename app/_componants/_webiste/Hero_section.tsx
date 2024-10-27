/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Img from "../Image";

import { PiCaretDoubleDownDuotone } from "react-icons/pi";
import Link from "next/link";
import { instance } from "@/app/Api/axios";
import { Usevariables } from "@/app/context/VariablesProvider";
import LoadingSpiner from "../LoadingSpiner";

export default function Hero_section() {
  const { language } = Usevariables(); // متغير لتحديد اللغة
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await instance.get("./texts");
        const data = response.data.data[0];

        // تخزين البيانات في الحالة
        if (data) {
          setText1({ en: data.text1_en, ar: data.text1_ar });
          setText2({ en: data.text2_en, ar: data.text2_ar });
          setText3({ en: data.text3_en, ar: data.text3_ar });
          setcurrentimage(data.image); // تأكد من أن لديك حقل للصورة في البيانات المسترجعة
          setText4({ en: data.text4_en, ar: data.text4_ar });
        }
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  // حالات النصوص المختلفة
  const [text1, setText1] = useState({ en: "", ar: "" });
  const [text2, setText2] = useState({ en: "", ar: "" });
  const [text3, setText3] = useState({ en: "", ar: "" });
  const [text4, setText4] = useState({ en: "", ar: "" });
  const [form, setform] = useState({
    facbook: "",
    youtube: "",
    instgram: "",
    x_account: "",
  });
  // حالات الصور

  const [currentimage, setcurrentimage] = useState("");

  // إعدادات الحركة للصورة (من اليمين)
  const imageVariants = {
    hidden: { opacity: 0, x: 300 }, // تبدأ الصورة خارج الشاشة من اليمين
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }, // تتحرك إلى المكان الأصلي
  };

  // إعدادات الحركة للنص (من اليسار)
  const textVariants = {
    hidden: { opacity: 0, x: -300 }, // يبدأ النص خارج الشاشة من اليسار
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }, // يتحرك إلى المكان الأصلي
  };

  // إعدادات الحركة للموجة (من الأسفل)
  const waveVariants = {
    hidden: { opacity: 0, y: 300 }, // تبدأ الموجة خارج الشاشة من الأسفل
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // تتحرك إلى المكان الأصلي
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
    <>
      {loading ? (
        <div className="h-screen relative">
          <LoadingSpiner />
        </div>
      ) : (
        <div className="overflow-hidden  ">
          <div className="flex items-center overflow-hidden justify-between  w-[90%] mx-auto   px-2  max-md:flex-col max-md:items-center">
            {/* نص متحرك من اليسار */}
            <motion.div
              className="content w-[75%] max-lg:w-full mt-10 max-md:pt-20 flex flex-col gap-6 z-[99]"
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
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
              <h1
                style={{ overflowWrap: "anywhere" }}
                className={`${
                  language == "en" ? "text-6xl" : "text-3xl"
                }  max-md:text-4xl font-semibold my-1 text-main_text dark:text-secend_text cursor-pointer`}
              >
                {text1[language]} {/* عرض النص بناءً على اللغة */}
              </h1>
              <h1
                style={{ overflowWrap: "anywhere" }}
                className={`${
                  language == "en" ? "text-5xl" : "text-4xl"
                }  max-md:text-3xl font-semibold my-1 text-main_text dark:text-secend_text cursor-pointer`}
              >
                <span className="text-main_red">{text2[language]}</span>
                {/* عرض النص بناءً على اللغة */}
              </h1>
              <h1
                style={{ overflowWrap: "anywhere" }}
                className={`${
                  language == "en" ? "text-6xl" : "text-4xl"
                }  max-md:text-3xl font-semibold text-main_text dark:text-secend_text cursor-pointer`}
              >
                {text3[language]} {/* عرض النص بناءً على اللغة */}
              </h1>
              <p className="my-2 text-[18px]  h-[170px] overflow-ellipsis overflow-hidden cursor-pointer w-[80%] max-lg:w-3/4 max-md:w-full">
                {text4[language]} {/* عرض النص بناءً على اللغة */}
              </p>
              <Link
                href={"/signup"}
                className="px-4 block w-fit h-fit shadow-md group overflow-hidden  relative py-2 rounded-full bg-main_blue"
              >
                <p className="z-[999] relative group-hover:text-black text-white duration-300">
                  {language == "en" ? "Join now" : "إنضم الأن"}
                </p>
                <div className="group-hover:w-full left absolute right-0 top-0 bg-white w-0 duration-700 h-[500px]"></div>
                <div className="group-hover:w-full right absolute left-0 top-0 bg-white w-0 duration-700 h-[500px]"></div>
              </Link>
            </motion.div>

            {/* صورة متحركة من اليمين */}
            <motion.div
              className="z-[99] img-animate"
              initial="hidden"
              animate="visible"
              variants={imageVariants}
            >
              <Img
                imgsrc={currentimage || "/image-3-copyright.svg"}
                styles=" w-[1130px]  self-center z-[999] relative rounded-md"
              />
            </motion.div>
          </div>
          {/* موجة متحركة من الأسفل */}
          <motion.div
            className="absolute bottom-0 left-0 z-0 w-full"
            initial="hidden"
            animate="visible"
            variants={waveVariants}
          >
            <Img
              imgsrc="/big-wave.png"
              styles="w-full  h-[300px] max-lg:h-full z-[9]"
            />
          </motion.div>
          <Link
            className="up-down-2 z-[99]  absolute bottom-[20%] max-md:bottom-4 left-1/2 -translate-x-1/2 text-center m-auto w-fit cursor-pointer"
            href={"#about"}
          >
            <PiCaretDoubleDownDuotone
              size={33}
              className="    dark:text-white"
            />
          </Link>
        </div>
      )}
    </>
  );
}

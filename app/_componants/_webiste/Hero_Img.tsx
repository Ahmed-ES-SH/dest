/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Usevariables } from "@/app/context/VariablesProvider";
import { instance } from "@/app/Api/axios";
import LoadingSpiner from "../LoadingSpiner";
import Img from "../Image";

export default function Hero_Img() {
  const { language } = Usevariables();
  const [text1, setText1] = useState({ en: "", ar: "" });
  const [text2, setText2] = useState({ en: "", ar: "" });
  const [text3, setText3] = useState({ en: "", ar: "" });
  const [text4, setText4] = useState({ en: "", ar: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await instance.get("./texts");
        const data = response.data.data[0];

        if (data) {
          setText1({ en: data.text1_en, ar: data.text1_ar });
          setText2({ en: data.text2_en, ar: data.text2_ar });
          setText3({ en: data.text3_en, ar: data.text3_ar });
          setText4({ en: data.text4_en, ar: data.text4_ar });
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-screen relative">
          <LoadingSpiner />
        </div>
      ) : (
        <div className="w-full">
          <section
            className="overflow-hidden h-screen bg-cover bg-top bg-no-repeat"
            style={{ backgroundImage: `url(${"/main-img.jpg"})` }}
          >
            <div className="bg-black/50 h-screen  relative p-8 md:p-12 lg:px-16 lg:py-24">
              <div className="content absolute top-1/2 left-12 max-md:left-2 -translate-y-1/2  w-[75%] max-lg:w-full flex flex-col gap-6 z-[99]">
                <h1
                  style={{ overflowWrap: "anywhere" }}
                  className={`${
                    language == "en" ? "text-6xl" : "text-3xl"
                  } max-md:text-4xl font-semibold my-1 text-white dark:text-secend_text cursor-pointer`}
                >
                  {text1[language]}
                </h1>
                <h1
                  style={{ overflowWrap: "anywhere" }}
                  className={`${
                    language == "en" ? "text-5xl" : "text-4xl"
                  } max-md:text-3xl font-semibold my-1 text-white dark:text-secend_text cursor-pointer`}
                >
                  <span className="text-main_orange">{text2[language]}</span>
                </h1>
                <h1
                  style={{ overflowWrap: "anywhere" }}
                  className={`${
                    language == "en" ? "text-6xl" : "text-4xl"
                  } max-md:text-3xl font-semibold text-white dark:text-secend_text cursor-pointer`}
                >
                  {text3[language]}
                </h1>
                <p className="my-2 text-[18px]  text-gray-400 overflow-ellipsis overflow-hidden cursor-pointer w-[60%] max-lg:w-3/4 max-md:w-full">
                  {text4[language]}
                </p>
                <Link
                  href={"/signup"}
                  className="px-4 block relative  w-fit h-fit text-main_orange text-xl pb-2 border-b border-main_blue group overflow-hidden   "
                >
                  <p className=" group-hover:text-white z-[99] relative duration-200">
                    {" "}
                    {language == "en" ? "Join now" : "إنضم الأن"}
                  </p>
                  <div className="group-hover:w-full left absolute left-0 top-0 bg-main_orange w-0 duration-700 h-[500px]"></div>
                </Link>
              </div>
            </div>
          </section>
          <div className="absolute bottom-0 left-0 z-0 w-full">
            <Img
              imgsrc="/big-wave.png"
              styles="w-full  h-[300px] max-lg:h-full z-[9]"
            />
          </div>
        </div>
      )}
    </>
  );
}

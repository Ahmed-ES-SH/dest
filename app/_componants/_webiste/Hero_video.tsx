/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { PiCaretDoubleDownDuotone } from "react-icons/pi";
import { FaPlayCircle } from "react-icons/fa";
import { Usevariables } from "@/app/context/VariablesProvider";
import { instance } from "@/app/Api/axios";
import LoadingSpiner from "../LoadingSpiner";

export default function Hero_video() {
  const { language } = Usevariables();
  const [text1, setText1] = useState({ en: "", ar: "" });
  const [text2, setText2] = useState({ en: "", ar: "" });
  const [text3, setText3] = useState({ en: "", ar: "" });
  const [text4, setText4] = useState({ en: "", ar: "" });
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true); // حالة تشغيل الفيديو
  const videoRef = useRef<any>(null); // مرجع للفيديو

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

  // التحكم في تشغيل/إيقاف الفيديو
  const handleVideoControl = () => {
    if (isPlaying) {
      videoRef.current.pause(); // إيقاف الفيديو
    } else {
      videoRef.current.play(); // تشغيل الفيديو
    }
    setIsPlaying(!isPlaying); // تبديل الحالة
  };

  return (
    <>
      {loading ? (
        <div className="h-screen relative">
          <LoadingSpiner />
        </div>
      ) : (
        <>
          <div className="relative h-screen flex items-center justify-center w-full">
            {/* فيديو الخلفية */}
            <video
              ref={videoRef} // مرجع للفيديو
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={"/videos/hero-vedio.mp4"}
              autoPlay
              loop
              muted
              playsInline
            ></video>

            {/* طبقة سوداء شفافة فوق الفيديو */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

            {/* المحتوى النصي */}
            <div className="flex items-center justify-between w-[90%]">
              <div className="content  w-[75%] max-lg:w-full flex flex-col gap-6 z-[99]">
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
              <div
                className="z-[99]   text-center  cursor-pointer"
                onClick={handleVideoControl}
              >
                <FaPlayCircle size={250} className="text-main_orange" />
              </div>
            </div>
            <Link
              className="up-down-2 z-[99] absolute bottom-[10%] max-md:bottom-4 left-1/2 -translate-x-1/2 text-center m-auto w-fit cursor-pointer"
              href={"#about"}
            >
              <PiCaretDoubleDownDuotone size={40} className="text-white" />
            </Link>
          </div>
          {/* <div className="absolute bottom-0 left-0 z-0 w-full">
            <Img
              imgsrc="/big-wave.png"
              styles="w-full  h-[300px] max-lg:h-full z-[9]"
            />
          </div> */}
        </>
      )}
    </>
  );
}

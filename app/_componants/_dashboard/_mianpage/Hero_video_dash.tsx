/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { PiCaretDoubleDownDuotone } from "react-icons/pi";
import { FaCheckCircle, FaPlayCircle, FaPlus, FaVideo } from "react-icons/fa";
import { Usevariables } from "@/app/context/VariablesProvider";
import { instance } from "@/app/Api/axios";
import LoadingSpiner from "../../LoadingSpiner";

export default function Hero_video_dash() {
  const { language } = Usevariables();
  const [video, setvideo] = useState<any>("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [timer, setTimer] = useState(3);
  const [text1, setText1] = useState({ en: "", ar: "" });
  const [text2, setText2] = useState({ en: "", ar: "" });
  const [text3, setText3] = useState({ en: "", ar: "" });
  const [text4, setText4] = useState({ en: "", ar: "" });
  const [loading, setloading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true); // حالة تشغيل الفيديو
  const videoRef = useRef<any>(null); // مرجع للفيديو
  const chossevideoref = useRef<any>(null); // مرجع للفيديو

  // حالات فتح وإغلاق الـ popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentText, setCurrentText] = useState({
    en: "",
    ar: "",
  });
  const [activeText, setActiveText] = useState<any>(null);

  // حالة الـ toggle لتحديد قيمة main_screen
  const [mainScreen, setMainScreen] = useState<any>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await instance.get("/show-content/2");
        const data = response.data.data;

        if (data) {
          setText1({ en: data.text1_en, ar: data.text1_ar });
          setText2({ en: data.text2_en, ar: data.text2_ar });
          setText3({ en: data.text3_en, ar: data.text3_ar });
          setText4({ en: data.text4_en, ar: data.text4_ar });
          setMainScreen(data.main_screen);
        }
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const onchangevideo = (e) => {
    setvideo(e.target.files[0]);
  };

  // التحكم في تشغيل/إيقاف الفيديو
  const handleVideoControl = () => {
    if (isPlaying) {
      videoRef.current.pause(); // إيقاف الفيديو
    } else {
      videoRef.current.play(); // تشغيل الفيديو
    }
    setIsPlaying(!isPlaying); // تبديل الحالة
  };

  // دالة لفتح الـ popup مع النص والنص المحدد
  const openPopup = (text, setText) => {
    setCurrentText({ en: text.en, ar: text.ar }); // تعيين النصوص الحالية
    setActiveText(() => setText); // تخزين دالة setText
    setIsPopupOpen(true);
  };

  const updateText = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // إضافة النصوص إلى FormData
    if (text1.ar) formData.append("text1_ar", text1.ar);
    if (text1.en) formData.append("text1_en", text1.en);
    if (text2.ar) formData.append("text2_ar", text2.ar);
    if (text2.en) formData.append("text2_en", text2.en);
    if (text3.ar) formData.append("text3_ar", text3.ar);
    if (text3.en) formData.append("text3_en", text3.en);
    if (text4.ar) formData.append("text4_ar", text4.ar);
    if (text4.en) formData.append("text4_en", text4.en);
    if (video) formData.append("video", video);
    // إضافة قيمة main_screen إلى FormData
    formData.append("main_screen", mainScreen ? "1" : "0");
    try {
      setloading(true);
      const response = await instance.post(`/firstsection/2`, formData);
      if (mainScreen) {
        await instance.post(`/update-screen/2`, formData);
      }
      setShowSuccessPopup(true);
      setloading(false);
      throw response;
    } catch (error) {
      console.error("Error updating text:", error);
      setloading(false);
    }
  };

  // دالة لحفظ التعديلات وإغلاق الـ popup
  const handleSave = () => {
    // التحقق من وجود نصوص في أي من اللغتين
    if (currentText.en.trim() !== "" || currentText.ar.trim() !== "") {
      // تحديث النصوص باستخدام اللغة المحددة
      activeText((prev) => ({
        en: currentText.en.trim() !== "" ? currentText.en.trim() : prev.en,
        ar: currentText.ar.trim() !== "" ? currentText.ar.trim() : prev.ar,
      }));
      console.log("نص عربي:", currentText.ar.trim());
      console.log("نص إنجليزي:", currentText.en.trim());
    } else {
      console.log("لا يوجد نص جديد ليتم حفظه."); // يمكن إضافة رسالة تنبيه هنا
    }

    setIsPopupOpen(false); // إغلاق الـ popup
  };

  useEffect(() => {
    let countdown;
    if (showSuccessPopup && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowSuccessPopup(false);
      setTimer(3);
    }

    return () => clearInterval(countdown);
  }, [showSuccessPopup, timer]);

  return (
    <>
      {loading ? (
        <div className="h-screen relative">
          <LoadingSpiner />
        </div>
      ) : (
        <>
          <form
            onSubmit={updateText}
            className="w-full py-2 px-2 dark:bg-secend_dash"
          >
            <div className="flex flex-col gap-2">
              <label className="dark:text-white">
                {language == "en" ? "chosse video" : "اختر فيديو جديد"}
              </label>
              <input
                type="file"
                onChange={onchangevideo}
                ref={chossevideoref}
                id="video"
                className="peer hidden border-none px-4 h-[40px] bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="Username"
              />
              <div
                onClick={() => chossevideoref.current.click()}
                className={`w-full cursor-pointer h-32 flex items-center justify-center border-2 border-dashed ${
                  video
                    ? "bg-green-100 border-green-500"
                    : "bg-transparent border-sky-300"
                }`}
              >
                {video ? (
                  <FaVideo className="text-green-500" />
                ) : (
                  <FaPlus className="text-main_blue" />
                )}
              </div>
              {video && (
                <p className="mt-2 text-center text-green-500">
                  {language == "en"
                    ? `File Name : ${video?.name} `
                    : `اسم الملف : ${video?.name} `}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4 mt-4">
              <label className="mr-2 dark:text-secend_text">
                {language === "en" ? "Main Screen:" : "الشاشة الرئيسية:"}
              </label>
              <div
                className={`toggle ${mainScreen ? "active" : ""}`}
                onClick={() => setMainScreen((prev) => !prev)} // تغيير قيمة الـ toggle
              >
                <div className="toggle-circle"></div>

                {/* علامة check عند التفعيل */}
              </div>
            </div>
            <input
              type="submit"
              value={language == "en" ? "Save" : "حفظ"}
              className="px-6 cursor-pointer border border-transparent hover:border-green-400 duration-200 hover:bg-transparent bg-green-400 mt-4 py-1 text-white text-center rounded-md w-fit mx-auto"
            />
          </form>
          <div className="relative h-screen flex items-center justify-center  w-full">
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
            <div className="flex items-center justify-between max-md:w-[96%] max-md:flex-col w-[90%]">
              <div className="content  w-[75%] max-lg:w-full flex flex-col gap-6 z-[99]">
                <h1
                  style={{ overflowWrap: "anywhere" }}
                  onClick={() => openPopup(text1, setText1)}
                  className={`${
                    language == "en" ? "text-6xl" : "text-3xl"
                  } max-md:text-4xl border-2 border-transparent hover:border-sky-400 transition-all duration-300 font-semibold my-1 text-white dark:text-secend_text cursor-pointer`}
                >
                  {text1[language]}
                </h1>
                <h1
                  style={{ overflowWrap: "anywhere" }}
                  onClick={() => openPopup(text2, setText2)}
                  className={`${
                    language == "en" ? "text-5xl" : "text-4xl"
                  } max-md:text-3xl border-2 border-transparent hover:border-sky-400 transition-all duration-300 font-semibold my-1 text-white dark:text-secend_text cursor-pointer`}
                >
                  <span className="text-main_orange">{text2[language]}</span>
                </h1>
                <h1
                  style={{ overflowWrap: "anywhere" }}
                  onClick={() => openPopup(text3, setText3)}
                  className={`${
                    language == "en" ? "text-6xl" : "text-4xl"
                  } max-md:text-3xl border-2 border-transparent hover:border-sky-400 transition-all duration-300 font-semibold text-white dark:text-secend_text cursor-pointer`}
                >
                  {text3[language]}
                </h1>
                <p
                  onClick={() => openPopup(text4, setText4)}
                  className="my-2 text-[18px] border-2 border-transparent hover:border-sky-400 transition-all duration-300  text-gray-400 overflow-ellipsis overflow-hidden cursor-pointer w-[60%] max-lg:w-3/4 max-md:w-full"
                >
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
          {/* الـ popup للتعديل على النصوص */}
          {isPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-[9999999] bg-black bg-opacity-50">
              <div className="bg-white p-6 w-[80%] mx-auto  max-h-fit rounded-md">
                {/* حقل لإدخال النص العربي */}
                <textarea
                  value={currentText.ar}
                  onChange={(e) =>
                    setCurrentText((prev) => ({
                      ...prev,
                      ar: e.target.value,
                    }))
                  }
                  placeholder="Arabic text"
                  className="border border-gray-300 p-2 w-full h-[50px] mb-2"
                />
                {/* حقل لإدخال النص الإنجليزي */}
                <textarea
                  value={currentText.en}
                  onChange={(e) =>
                    setCurrentText((prev) => ({
                      ...prev,
                      en: e.target.value,
                    }))
                  }
                  placeholder="English text"
                  className="border border-gray-300 p-2 w-full h-[50px] mb-4"
                />
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {showSuccessPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black bg-opacity-50">
              <div className="bg-white p-6 w-[90%] max-w-sm mx-auto rounded-lg shadow-lg flex flex-col items-center relative">
                {/* أيقونة التحقق */}
                <FaCheckCircle className="text-green-500 w-12 h-12 mb-4" />

                {/* نص رسالة النجاح */}
                <p className="text-green-600 text-lg font-semibold text-center mb-4">
                  {language === "en"
                    ? "Update Successful!"
                    : "تم التحديث بنجاح!"}
                </p>

                {/* شريط التقدم */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(timer / 3) * 100}%` }} // تصحيح هنا
                  ></div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

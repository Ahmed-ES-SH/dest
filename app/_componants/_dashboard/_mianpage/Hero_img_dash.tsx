/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Usevariables } from "@/app/context/VariablesProvider";
import { instance } from "@/app/Api/axios";
import LoadingSpiner from "../../LoadingSpiner";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import Img from "../../Image";

export default function Hero_Img_dash() {
  const openinput = useRef<any>(null);
  const { language } = Usevariables();
  const [text1, setText1] = useState({ en: "", ar: "" });
  const [text2, setText2] = useState({ en: "", ar: "" });
  const [text3, setText3] = useState({ en: "", ar: "" });
  const [text4, setText4] = useState({ en: "", ar: "" });
  const [loading, setloading] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [timer, setTimer] = useState(3);
  const [image, setImage] = useState<any>("");
  const [currentimage, setcurrentimage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentText, setCurrentText] = useState({ en: "", ar: "" });
  const [activeText, setActiveText] = useState<any>(null);

  // حالة الـ toggle لتحديد قيمة main_screen
  const [mainScreen, setMainScreen] = useState<any>(false);

  const openPopup = (text, setText) => {
    setCurrentText({ en: text.en, ar: text.ar });
    setActiveText(() => setText);
    setIsPopupOpen(true);
  };

  const handleSave = () => {
    if (currentText.en.trim() !== "" || currentText.ar.trim() !== "") {
      activeText((prev) => ({
        en: currentText.en.trim() !== "" ? currentText.en.trim() : prev.en,
        ar: currentText.ar.trim() !== "" ? currentText.ar.trim() : prev.ar,
      }));
    }
    setIsPopupOpen(false);
  };

  const onchange = (e) => {
    setImage(e.target.files[0]);
  };

  const updateText = async () => {
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
    if (image) formData.append("image", image);

    // إضافة قيمة main_screen إلى FormData
    formData.append("main_screen", mainScreen ? "1" : "0");

    try {
      setloading(true);
      const response = await instance.post(`/firstsection/3`, formData);
      if (mainScreen) {
        await instance.post(`/update-screen/3`, formData);
      }
      console.log(response.data.message);
      setloading(false);
      setShowSuccessPopup(true);
      setImage(null);
    } catch (error) {
      console.error("Error updating text:", error);
      setloading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await instance.get("/show-content/3");
        const data = response.data.data;

        if (data) {
          setText1({ en: data.text1_en, ar: data.text1_ar });
          setText2({ en: data.text2_en, ar: data.text2_ar });
          setText3({ en: data.text3_en, ar: data.text3_ar });
          setText4({ en: data.text4_en, ar: data.text4_ar });
          setcurrentimage(data.image);
          setMainScreen(data.main_screen); // تعيين قيمة main_screen من البيانات
        }
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

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
                {language === "en" ? "Choose Image" : "اختر خلفية جديدة"}
              </label>
              <input
                type="file"
                onChange={onchange}
                ref={openinput}
                id="video"
                className="peer hidden border-none px-4 h-[40px] bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="Username"
              />
              <div
                onClick={() => openinput.current.click()}
                className={`w-full cursor-pointer h-32 flex items-center justify-center border-2 border-dashed`}
              >
                {image ? (
                  <Img imgsrc={URL.createObjectURL(image)} styles="w-[200px]" />
                ) : (
                  <FaPlus className="text-main_blue" />
                )}
              </div>
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
              value={language === "en" ? "Save" : "حفظ"}
              className="px-6 cursor-pointer border border-transparent hover:border-green-400 duration-200 hover:bg-transparent bg-green-400 mt-4 py-1 text-white text-center rounded-md w-fit mx-auto"
            />
          </form>
          <section
            className="overflow-hidden h-screen bg-cover bg-top bg-no-repeat"
            style={{
              backgroundImage: `url(${
                image
                  ? URL.createObjectURL(image)
                  : currentimage || "/main-img.jpg"
              })`,
            }}
          >
            <div className="bg-black/50 h-screen relative p-8 md:p-12 lg:px-16 lg:py-24">
              <div
                className={`content absolute top-1/2 ${
                  language === "en" ? "left-12" : "right-12"
                } max-md:left-2 -translate-y-1/2 w-[75%] max-lg:w-full flex flex-col gap-6 z-[99]`}
              >
                <h1
                  onClick={() => openPopup(text1, setText1)}
                  style={{ overflowWrap: "anywhere" }}
                  className={`text-6xl max-md:text-4xl border-2 border-transparent hover:border-sky-400 transition-all duration-300 font-semibold my-1 text-white dark:text-secend_text cursor-pointer`}
                >
                  {text1[language]}
                </h1>
                <h1
                  onClick={() => openPopup(text2, setText2)}
                  style={{ overflowWrap: "anywhere" }}
                  className={`text-5xl max-md:text-3xl border-2 border-transparent hover:border-sky-400 transition-all duration-300 font-semibold my-1 text-white dark:text-secend_text cursor-pointer`}
                >
                  <span className="text-main_orange">{text2[language]}</span>
                </h1>
                <h1
                  onClick={() => openPopup(text3, setText3)}
                  style={{ overflowWrap: "anywhere" }}
                  className={`text-6xl max-md:text-3xl border-2 border-transparent hover:border-sky-400 transition-all duration-300 font-semibold text-white dark:text-secend_text cursor-pointer`}
                >
                  {text3[language]}
                </h1>
                <p
                  onClick={() => openPopup(text4, setText4)}
                  className="my-2 text-[18px] border-2 border-transparent hover:border-sky-400 transition-all duration-300 text-white dark:text-secend_text cursor-pointer"
                >
                  {text4[language]}
                </p>
              </div>
            </div>
          </section>
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

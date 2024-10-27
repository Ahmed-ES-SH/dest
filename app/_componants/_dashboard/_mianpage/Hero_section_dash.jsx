/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useRef, useState } from "react";
import Img from "../../Image";
import { instance } from "@/app/Api/axios";
import LoadingSpiner from "../../LoadingSpiner";
import { FaCheckCircle } from "react-icons/fa";
import { Usevariables } from "@/app/context/VariablesProvider";

export default function HeroSectionDash() {
  const { language } = Usevariables(); // متغير لتحديد اللغة
  const [loading, setloading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [timer, setTimer] = useState(3);
  const [mainScreen, setMainScreen] = useState(false);
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
          setMainScreen(data.main_screen);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const openinput = useRef(null);
  // حالات النصوص المختلفة
  const [text1, setText1] = useState({ en: "", ar: "" });
  const [text2, setText2] = useState({ en: "", ar: "" });
  const [text3, setText3] = useState({ en: "", ar: "" });
  const [text4, setText4] = useState({ en: "", ar: "" });
  // حالات الصور
  const [image, setImage] = useState("");
  const [currentimage, setcurrentimage] = useState("");
  // حالات فتح وإغلاق الـ popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentText, setCurrentText] = useState({
    en: "",
    ar: "",
  });
  const [activeText, setActiveText] = useState(null);

  // دالة لفتح الـ popup مع النص والنص المحدد
  const openPopup = (text, setText) => {
    setCurrentText({ en: text.en, ar: text.ar }); // تعيين النصوص الحالية
    setActiveText(() => setText); // تخزين دالة setText
    setIsPopupOpen(true);
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
    formData.append("main_screen", mainScreen ? "1" : "0");
    if (image) formData.append("image", image);
    try {
      setloading(true);
      const response = await instance.post(`/firstsection/1`, formData);
      if (mainScreen) {
        await instance.post(`/update-screen/1`, formData);
      }
      console.log(response.data.message);
      setloading(false);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Error updating text:", error);
      setloading(false);
    }
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

  const socialicons = [
    { imgsrc: "/facebook.png", link: "" },
    { imgsrc: "/instagram.png", link: "" },
    { imgsrc: "/x.png", link: "" },
    { imgsrc: "/youtube.png", link: "" },
  ];

  return (
    <>
      {loading ? (
        <div className="h-[60vh] relative">
          <LoadingSpiner />
        </div>
      ) : (
        <>
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
          <div className="overflow-hidden ">
            <input
              onChange={onchange}
              type="file"
              name=""
              hidden
              ref={openinput}
            />
            <div className="flex items-center overflow-hidden justify-between w-[90%] mx-auto px-2 max-md:flex-col max-md:items-center">
              {/* نصوص قابلة للتعديل */}
              <div className="content max-lg:w-full mt-10 max-md:pt-20 flex items-start flex-col gap-6 z-[99]">
                {/* مجموعة الأيقونات */}
                <div className="flex items-center gap-4 mb-6">
                  {socialicons.map((src, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden w-[34px] h-[34px] flex items-center justify-center rounded-md bg-slate-200/80 shadow-sm"
                    >
                      <Img
                        imgsrc={src.imgsrc}
                        styles="w-[20px] z-[999] cursor-pointer"
                      />
                      <div className="group-hover:w-full absolute left-0 top-0 bg-main_orange w-0 duration-300 cursor-pointer h-[500px]"></div>
                    </div>
                  ))}
                </div>

                {/* النصوص */}
                <h1
                  style={{ overflowWrap: "anywhere" }}
                  onClick={() => openPopup(text1, setText1)}
                  className={`${
                    language === "en" ? "text-6xl" : "text-3xl"
                  } leading-relaxed border-2 border-transparent hover:border-sky-400 transition-all duration-300 max-md:text-4xl font-semibold my-2 text-main_text dark:text-secend_text cursor-pointer`}
                >
                  {text1[language]}
                </h1>

                <h1
                  style={{ overflowWrap: "anywhere" }}
                  onClick={() => openPopup(text2, setText2)}
                  className={`${
                    language === "en" ? "text-6xl" : "text-4xl"
                  } leading-relaxed self-start border-2 border-transparent hover:border-sky-400 transition-all duration-300 max-md:text-4xl font-semibold my-2 text-main_text dark:text-secend_text cursor-pointer`}
                >
                  <span className="text-main_red">{text2[language]}</span>
                </h1>

                <h1
                  style={{ overflowWrap: "anywhere" }}
                  onClick={() => openPopup(text3, setText3)}
                  className={`${
                    language === "en" ? "text-6xl" : "text-4xl"
                  } leading-relaxed border-2 border-transparent hover:border-sky-400 transition-all duration-300 max-md:text-3xl font-semibold my-2 text-main_text dark:text-secend_text cursor-pointer`}
                >
                  {text3[language]}
                </h1>

                {/* عنصر popup للتعديل على النصوص */}
                {isPopupOpen && (
                  <div className="fixed inset-0 flex items-center justify-center z-[9999999] bg-black bg-opacity-50">
                    <div className="bg-white p-6 w-[80%] mx-auto max-h-fit rounded-md">
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

                {/* النص الرابع مع overflow محدود */}
                <p
                  onClick={() => openPopup(text4, setText4)}
                  className="my-4 text-[18px] leading-relaxed border-2 dark:text-white border-transparent hover:border-sky-400 transition-all duration-300 h-[170px] overflow-ellipsis overflow-hidden cursor-pointer w-[80%] max-lg:w-3/4 max-md:w-full"
                >
                  {text4[language]}
                </p>
              </div>

              {/* صورة بدون حركة */}
              <div
                onClick={() => openinput.current.click()}
                className="z-[9] border-2 border-transparent hover:border-sky-400 transition-all duration-300 cursor-pointer"
              >
                {image ? (
                  <Img
                    imgsrc={URL.createObjectURL(image)}
                    styles="w-[1130px] self-center z-[9] relative rounded-md"
                  />
                ) : (
                  <Img
                    imgsrc={currentimage}
                    styles="w-[1130px] self-center z-[9] relative rounded-md"
                  />
                )}
              </div>
            </div>
            <button
              onClick={updateText}
              className="px-4 mx-auto mt-4 block w-fit h-fit shadow-md group overflow-hidden relative py-2 rounded-md bg-green-400"
            >
              {language == "en" ? "save" : "تحديث"}
            </button>
          </div>
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

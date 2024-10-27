/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Usevariables } from "@/app/context/VariablesProvider";
import { instance } from "@/app/Api/axios";
import LoadingSpiner from "../LoadingSpiner";

export default function HeroSection() {
  const { language } = Usevariables();
  const [hero, setHero] = useState({
    title: { en: "", ar: "" },
    description: { en: "", ar: "" },
    image: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const heroRes = await instance.get("/getherodetailes");
      setHero({
        title: { en: heroRes.data.title_en, ar: heroRes.data.title_ar },
        description: {
          en: heroRes.data.description_en,
          ar: heroRes.data.description_ar,
        },
        image: heroRes.data.image,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const texts: any = {
    ar: {
      button: "انطلق الآن",
    },
    en: {
      button: "Get Started Now",
    },
  };

  // استخدام النصوص المسترجعة
  const { title, description } = hero;
  const buttonText = texts[language]?.button || texts.en.button; // نص الزر

  if (loading) {
    return (
      <div className="h-screen relative">
        <LoadingSpiner />
      </div>
    ); // يمكن إضافة تصميم أفضل لواجهة التحميل
  }

  return (
    <div
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${hero.image || "/main-img.jpg"})`, // استخدام الصورة المسترجعة من الـ API
      }}
    >
      {/* خلفية شفافة لتعتيم الصورة */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* محتوى Hero Section */}
      <motion.div
        className="relative z-10 text-center text-white p-8 max-w-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {title[language] || title.en}{" "}
          {/* استخدام العنوان المناسب حسب اللغة */}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-6 opacity-80"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {description[language] || description.en}{" "}
          {/* استخدام الوصف المناسب حسب اللغة */}
        </motion.p>

        <motion.a
          href="#cta" // رابط للزر
          className="inline-block px-8 py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {buttonText} {/* نص الزر */}
        </motion.a>
      </motion.div>
    </div>
  );
}

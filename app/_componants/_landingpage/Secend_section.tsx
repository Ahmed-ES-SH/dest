/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Usevariables } from "@/app/context/VariablesProvider";
import { instance } from "@/app/Api/axios";
import Img from "../Image";

export default function ProductFeatures() {
  const { language } = Usevariables(); // استخدام VariablesProvider
  const [features, setFeatures] = useState<any[]>([]); // حالة لتخزين الميزات
  const [loading, setLoading] = useState(true); // حالة لتحميل البيانات

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await instance.get("/productfeatchers");
        setFeatures(response.data.data); // تخزين الميزات المسترجعة
      } catch (error) {
        console.error("Error fetching features:", error);
      } finally {
        setLoading(false); // تعيين حالة التحميل كـ false بعد الانتهاء
      }
    };

    fetchFeatures();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // واجهة التحميل
  }

  return (
    <section className="w-[90%] mx-auto my-20 text-center">
      <motion.h2
        className="text-3xl font-bold text-blue-600 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {language === "ar" ? "مميزات المنتج" : "Product Features"}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {(features || []).map((feature, index) => (
          <motion.div
            key={index}
            className="relative p-6 rounded-lg shadow-lg bg-white dark:bg-secend_dash dark:text-secend_text overflow-hidden transition-transform duration-300"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* خلفية متحركة */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 rounded-lg blur-lg animate-pulse"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1.5 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />

            {/* محتوى البطاقة */}
            <div className="relative z-10">
              <Img
                imgsrc={
                  feature.image ? feature.image : "/servicessection/3.png"
                }
                styles="w-[90px] mx-auto"
              />
              {/* استخدام صورة الميزة إذا كانت متاحة */}
              <h3 className="text-xl font-semibold text-blue-500 mb-2">
                {language === "ar" ? feature.title_ar : feature.title_en}{" "}
                {/* استخدام العنوان المناسب حسب اللغة */}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "ar"
                  ? feature.description_ar
                  : feature.description_en}{" "}
                {/* استخدام الوصف المناسب حسب اللغة */}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

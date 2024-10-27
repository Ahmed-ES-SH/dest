/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { instance } from "@/app/Api/axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingSpiner from "@/app/_componants/LoadingSpiner";
import { Usevariables } from "@/app/context/VariablesProvider";

export default function Problem({ params }: any) {
  const { language } = Usevariables();
  const id = params.id;
  const [problem, setProblem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await instance.get(`/messages/${id}`);
        setProblem(response.data.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen relative">
        <LoadingSpiner />
      </div>
    );
  }

  return (
    <div
      className={`w-[90%] max-md:w-[97%] mx-auto mt-20 p-8 bg-white dark:bg-secend_dash dark:text-secend_text rounded-xl shadow-lg ${
        language === "ar" ? "text-right" : "text-left"
      }`}
    >
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-extrabold text-blue-600">
          {language === "ar" ? "تفاصيل المشكلة" : "Problem Details"}
        </h2>
      </motion.div>

      <motion.div
        className="space-y-6 divide-y divide-gray-200 dark:divide-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-gray-800 pt-4">
          <span className="block font-semibold text-blue-500">
            {language === "ar" ? "الاسم" : "Name"}
          </span>
          <p className="text-lg font-medium bg-gray-50 dark:bg-main_dash dark:text-white my-2 p-3 rounded-lg shadow-sm">
            {problem?.name ||
              (language === "ar" ? "غير متوفر" : "Not Available")}
          </p>
        </div>

        <div className="text-gray-800 pt-4">
          <span className="block font-semibold text-blue-500">
            {language === "ar" ? "البريد الإلكتروني" : "Email"}
          </span>
          <p className="text-lg font-medium bg-gray-50 dark:bg-main_dash dark:text-white my-2 p-3 rounded-lg shadow-sm">
            {problem?.email ||
              (language === "ar" ? "غير متوفر" : "Not Available")}
          </p>
        </div>

        <div className="text-gray-800 pt-4">
          <span className="block font-semibold text-blue-500">
            {language === "ar" ? "رقم الهاتف" : "Phone Number"}
          </span>
          <p className="text-lg font-medium bg-gray-50 dark:bg-main_dash dark:text-white my-2 p-3 rounded-lg shadow-sm">
            {problem?.phone_number ||
              (language === "ar" ? "غير متوفر" : "Not Available")}
          </p>
        </div>

        <div className="text-gray-800 pt-4">
          <span className="block font-semibold text-blue-500">
            {language === "ar" ? "الرسالة" : "Message"}
          </span>
          <p className="text-lg font-medium bg-gray-50 dark:bg-main_dash dark:text-white my-2 p-3 rounded-lg shadow-sm">
            {problem?.message ||
              (language === "ar" ? "غير متوفرة" : "Not Available")}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

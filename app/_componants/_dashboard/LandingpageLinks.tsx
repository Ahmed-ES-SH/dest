"use client";
import { instance } from "@/app/Api/axios";
import { Usevariables } from "@/app/context/VariablesProvider";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaImages, FaStar, FaArrowRight } from "react-icons/fa";

const Landingpagelinks = () => {
  const { language } = Usevariables();

  // نصوص الروابط بناءً على اللغة
  const links = {
    landing: language === "en" ? "Landing Page" : "صفحة الهبوط",
    features: language === "en" ? "Product Features" : "مميزات المنتج",
    slider: language === "en" ? "Slider" : "السلايدر",
  };

  const [mainScreen, setMainScreen] = useState(false); // حالة الشاشة الرئيسية
  const [loading, setLoading] = useState(true);

  // دالة لتحميل الحالة الحالية من API
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await instance.get("/get-status");
        setMainScreen(response.data.status); // تأكد من أن استجابة API تحتوي على الحالة
      } catch (error) {
        console.error("Error fetching status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  // دالة لحفظ الحالة الجديدة
  const handleSave = async () => {
    try {
      await instance.post("/update-status", {
        status: mainScreen ? "active" : "inactive",
      });
      alert("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex items-center gap-4  mt-16">
          <label className="mr-2 dark:text-secend_text">
            {language === "en" ? "Landing page:" : "صفحة الهبوط :"}
          </label>
          <div
            className={`toggle ${mainScreen ? "active" : ""}`}
            onClick={() => setMainScreen((prev) => !prev)} // تغيير قيمة الـ toggle
          >
            <div className="toggle-circle"></div>
          </div>
          <button
            onClick={handleSave}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      )}
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-secend_dash">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* رابط إلى صفحة الهبوط */}
          <Link
            href="/dashboard/landingpage/landing"
            className="flex flex-col items-center justify-center bg-blue-600 text-white w-40 h-40 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:bg-blue-700"
          >
            <FaArrowRight size={36} className="mb-2" />
            <span className="font-semibold text-lg">{links.landing}</span>
          </Link>

          {/* رابط إلى قسم مميزات المنتج */}
          <Link
            href="/dashboard/landingpage/product-features"
            className="flex flex-col items-center justify-center bg-green-600 text-white w-40 h-40 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:bg-green-700"
          >
            <FaStar size={36} className="mb-2" />
            <span className="font-semibold text-lg">{links.features}</span>
          </Link>

          {/* رابط إلى السلايدر */}
          <Link
            href="/dashboard/landingpage/slider"
            className="flex flex-col items-center justify-center bg-purple-600 text-white w-40 h-40 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:bg-purple-700"
          >
            <FaImages size={36} className="mb-2" />
            <span className="font-semibold text-lg">{links.slider}</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Landingpagelinks;

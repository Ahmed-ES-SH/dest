"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "../_componants/_landingpage/Hero_landing";
import Navbar from "../_componants/_webiste/Navbar";
import Secend_section from "../_componants/_landingpage/Secend_section";
import ProductGallery from "../_componants/_landingpage/Product_slider";
import VideoSection from "../_componants/_landingpage/Video_section";
import Footer from "../_componants/_webiste/Footer";
import { instance } from "../Api/axios";
import LoadingSpiner from "../_componants/LoadingSpiner";

export default function Page() {
  const [isActive, setActive] = useState<boolean>(false); // حالة لتحديد إذا كانت الصفحة متاحة
  const [loading, setLoading] = useState<boolean>(true); // حالة التحميل

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await instance.get("/get-status");
        // تحقق مما إذا كانت الحالة "active"
        setActive(response.data.status === "active");
      } catch (error) {
        console.error("Error fetching status:", error);
        setActive(false); // إذا حدث خطأ، نفترض أن الصفحة غير متاحة
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className="h-screen relative">
        <LoadingSpiner />
      </div>
    ); // عرض رسالة التحميل
  }

  if (!isActive) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">هذه الصفحة غير متاحة</h1>
      </div>
    ); // عرض رسالة الصفحة غير متاحة
  }

  return (
    <>
      <Navbar />
      <div className="w-full pb-4 dark:bg-secend_dash">
        <HeroSection />
        <Secend_section />
        <ProductGallery />
        <VideoSection />
      </div>
      <Footer />
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Usevariables } from "@/app/context/VariablesProvider";
import { instance } from "@/app/Api/axios";

const VideoSection = () => {
  const { language } = Usevariables(); // استخدام المتغير language
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const videoRes = await instance.get("/getvideodetailes");
      setVideo({
        title: { en: videoRes.data.title_en, ar: videoRes.data.title_ar },
        description: {
          en: videoRes.data.description_en,
          ar: videoRes.data.description_ar,
        },
        link: videoRes.data.video,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="relative w-[90%] max-md:w-[98%] h-[70vh] max-md:h-[50vh] mx-auto mt-20 rounded-lg overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <video
          className="w-full h-full object-cover"
          src={video.link} // استخدام رابط الفيديو من البيانات
          autoPlay
          loop
          muted
          style={{ filter: "brightness(0.5)" }} // لتعتيم الفيديو
        />
      </motion.div>
      <div className="relative z-10 p-8 text-center text-white">
        <motion.h2
          className="text-3xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {language === "ar" ? video.title.ar : video.title.en}{" "}
          {/* استخدام العنوان من البيانات */}
        </motion.h2>
        <p className="text-lg">
          {language === "ar" ? video.description.ar : video.description.en}{" "}
          {/* استخدام الوصف من البيانات */}
        </p>
      </div>
    </div>
  );
};

export default VideoSection;

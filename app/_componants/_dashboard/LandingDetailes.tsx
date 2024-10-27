/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { instance } from "@/app/Api/axios";
import { Usevariables } from "@/app/context/VariablesProvider";
import Img from "../Image";
import LoadingSpiner from "../LoadingSpiner";

export default function LandingDetailes() {
  const { language } = Usevariables();
  const [loading, setloading] = useState(true);
  const [title, setTitle] = useState({ en: "", ar: "" });
  const [hero, setHero] = useState({
    title: { en: "", ar: "" },
    description: { en: "", ar: "" },
    image: "",
  });
  const [video, setVideo] = useState({
    title: { en: "", ar: "" },
    description: { en: "", ar: "" },
    link: "",
  });
  const [newImage, setNewImage] = useState<any>(null);
  const [newVideo, setNewVideo] = useState<any>(null);

  const fetchData = async () => {
    try {
      const [titleRes, heroRes, videoRes] = await Promise.all([
        instance.get("/gettitle"),
        instance.get("/getherodetailes"),
        instance.get("/getvideodetailes"),
      ]);
      setTitle({ en: titleRes.data.title_en, ar: titleRes.data.title_ar });
      setHero({
        title: { en: heroRes.data.title_en, ar: heroRes.data.title_ar },
        description: {
          en: heroRes.data.description_en,
          ar: heroRes.data.description_ar,
        },
        image: heroRes.data.image,
      });
      setVideo({
        title: { en: videoRes.data.title_en, ar: videoRes.data.title_ar },
        description: {
          en: videoRes.data.description_en,
          ar: videoRes.data.description_ar,
        },
        link: videoRes.data.video,
      });
      setloading(false);
    } catch (error) {
      setloading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async () => {
    const formData = new FormData();
    setloading(true);
    formData.append("main_title_en", title.en);
    formData.append("main_title_ar", title.ar);
    formData.append("hero_title_en", hero.title.en);
    formData.append("hero_title_ar", hero.title.ar);
    formData.append("hero_description_en", hero.description.en);
    formData.append("hero_description_ar", hero.description.ar);
    formData.append("video_title_en", video.title.en);
    formData.append("video_title_ar", video.title.ar);
    formData.append("video_par_en", video.description.en);
    formData.append("video_par_ar", video.description.ar);
    if (newImage) formData.append("image", newImage);
    if (newVideo) formData.append("video", newVideo);

    try {
      await instance.post("/landing-update", formData);
      alert("Data Updated Successfully");
      fetchData();
      setloading(false);
    } catch (error) {
      setloading(false);
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="h-screen relative">
          <LoadingSpiner />
        </div>
      ) : (
        <div className="p-8  bg-gray-50 dark:bg-secend_dash dark:text-secend_text min-h-screen mt-16">
          <motion.h1
            className="text-4xl font-bold text-blue-600 dark:text-secend_text mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {language === "ar" ? "العنوان الرئيسي" : "Main Title"}
          </motion.h1>
          <motion.input
            type="text"
            value={language === "ar" ? title.ar : title.en}
            onChange={(e) => setTitle({ ...title, [language]: e.target.value })}
            placeholder={
              language === "ar"
                ? "عنوان رئيسي بالعربية"
                : "Main Title in English"
            }
            className="w-full px-4 dark:bg-main_dash py-2 mb-6 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          />

          <motion.section
            className="mb-8 p-6 bg-white dark:bg-secend_dash dark:text-secend_text shadow-md rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-secend_text mb-4">
              {language === "ar" ? "قسم الواجهة" : "Hero Section"}
            </h2>
            <input
              type="text"
              value={language === "ar" ? hero.title.ar : hero.title.en}
              onChange={(e) =>
                setHero({
                  ...hero,
                  title: { ...hero.title, [language]: e.target.value },
                })
              }
              placeholder={
                language === "ar"
                  ? "عنوان الواجهة بالعربية"
                  : "Hero Title in English"
              }
              className="w-full px-4 dark:bg-main_dash py-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={
                language === "ar" ? hero.description.ar : hero.description.en
              }
              onChange={(e) =>
                setHero({
                  ...hero,
                  description: {
                    ...hero.description,
                    [language]: e.target.value,
                  },
                })
              }
              placeholder={
                language === "ar"
                  ? "وصف الواجهة بالعربية"
                  : "Hero Description in English"
              }
              className="w-full px-4 dark:bg-main_dash py-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            />
            <Img imgsrc={hero.image} styles="w-full h-auto mb-4 rounded-lg" />
            <input
              type="file"
              onChange={(e: any) => setNewImage(e.target.files[0])}
              className="w-full px-4 dark:bg-main_dash py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
            />
          </motion.section>

          <motion.section
            className="mb-8 p-6 bg-white dark:bg-secend_dash dark:text-secend_text shadow-md rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-secend_text mb-4">
              {language === "ar" ? "قسم الفيديو" : "Video Section"}
            </h3>
            <input
              type="text"
              value={language === "ar" ? video.title.ar : video.title.en}
              onChange={(e) =>
                setVideo({
                  ...video,
                  title: { ...video.title, [language]: e.target.value },
                })
              }
              placeholder={
                language === "ar"
                  ? "عنوان الفيديو بالعربية"
                  : "Video Title in English"
              }
              className="w-full px-4 dark:bg-main_dash py-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={
                language === "ar" ? video.description.ar : video.description.en
              }
              onChange={(e) =>
                setVideo({
                  ...video,
                  description: {
                    ...video.description,
                    [language]: e.target.value,
                  },
                })
              }
              placeholder={
                language === "ar"
                  ? "وصف الفيديو بالعربية"
                  : "Video Description in English"
              }
              className="w-full px-4 dark:bg-main_dash py-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            />
            <video
              controls
              src={video.link}
              className="w-full h-auto mb-4 rounded-lg"
            ></video>
            <input
              type="file"
              onChange={(e: any) => setNewVideo(e.target.files[0])}
              className="w-full px-4 dark:bg-main_dash py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
            />
          </motion.section>

          <motion.button
            onClick={handleUpdate}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {language === "ar" ? "تحديث البيانات" : "Update Data"}
          </motion.button>
        </div>
      )}
    </>
  );
}

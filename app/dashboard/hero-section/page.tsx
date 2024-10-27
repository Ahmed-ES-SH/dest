"use client";
import React, { useState } from "react";
import HeroSectionDash from "@/app/_componants/_dashboard/_mianpage/Hero_section_dash";
import Hero_video_dash from "@/app/_componants/_dashboard/_mianpage/Hero_video_dash";
import Hero_Img_dash from "@/app/_componants/_dashboard/_mianpage/Hero_img_dash";
import { Usevariables } from "@/app/context/VariablesProvider";

export default function Page() {
  const { language } = Usevariables();
  // تعريف حالات toggle للمكونات
  const [showHeroSectionDash, setShowHeroSectionDash] = useState(false);
  const [showHeroVideo, setShowHeroVideo] = useState(false);
  const [showHeroImg, setShowHeroImg] = useState(false);

  const showtargetcomponent = (targetset) => {
    setShowHeroImg(false);
    setShowHeroSectionDash(false);
    setShowHeroVideo(false);
    targetset(true);
  };

  return (
    <>
      <div className="w-full">
        {/* أزرار التفعيل (Toggle) */}
        <div className="flex gap-4 mt-16 w-fit mx-auto">
          <button
            onClick={() => showtargetcomponent(setShowHeroSectionDash)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            <div className="flex items-center gap-2">
              {language == "en" ? "main screen 1" : "الرئسية - 1"}
              <input
                name="main_1"
                type="checkbox"
                className="size-4 rounded border-gray-300"
                checked={showHeroSectionDash}
              />
            </div>
          </button>
          <button
            onClick={() => showtargetcomponent(setShowHeroVideo)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            <div className="flex items-center gap-2">
              {language == "en" ? "main screen 2" : "الرئسية - 2"}
              <input
                name="main_2"
                type="checkbox"
                className="size-4 rounded border-gray-300"
                checked={showHeroVideo}
              />
            </div>
          </button>
          <button
            onClick={() => showtargetcomponent(setShowHeroImg)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            <div className="flex items-center gap-2">
              {language == "en" ? "main screen 3" : "الرئسية - 3"}
              <input
                name="main_3"
                type="checkbox"
                checked={showHeroImg}
                className="size-4 rounded border-gray-300"
              />
            </div>
          </button>
        </div>

        {/* إظهار المكونات بناءً على تفعيل التوغل */}
        {showHeroSectionDash && <HeroSectionDash />}
        {showHeroVideo && <Hero_video_dash />}
        {showHeroImg && <Hero_Img_dash />}
      </div>
    </>
  );
}

"use client";
import { instance } from "@/app/Api/axios";
import React, { useEffect, useState } from "react";
import Hero_section from "./Hero_section";
import Hero_video from "./Hero_video";
import Hero_Img from "./Hero_Img";

export default function Hero() {
  const [main_screen, setmain_screen] = useState("");
  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await instance.get("/main-screen");
        const type = response.data.type;
        setmain_screen(type);
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  }, []);

  if (main_screen == "default") {
    return <Hero_section />;
  }

  if (main_screen == "video") {
    return <Hero_video />;
  }
  if (main_screen == "image") {
    return <Hero_Img />;
  }
}

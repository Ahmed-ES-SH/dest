/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Img from "../../Image";

interface props {
  newimage: File;
  mianimage: string;
}

export default function Change_img({ newimage, mianimage }: props) {
  return (
    <div className="overflow-hidden hidden  md:block">
      <div
        className="flex items-center gap-4 overflow-hidden justify-between w-[90%] mx-auto px-2 max-md:flex-col max-md:items-center"
        style={{ height: "200px" }}
      >
        {/* نص متحرك من اليسار */}

        {/* صورة بدون حركة */}
        <div className="z-[99]">
          {newimage ? (
            <Img
              imgsrc={URL.createObjectURL(newimage)}
              styles="  h-full w-[200px] object-contain"
            />
          ) : (
            <Img
              imgsrc={mianimage}
              styles="  h-full w-[200px] object-contain"
            />
          )}
        </div>
        <div
          className="content mt-2 max-md:pt-20 flex flex-col gap-2 z-[99]"
          style={{ maxHeight: "200px", overflow: "hidden" }}
        >
          {/* <div className="flex items-center gap-4 mb-2">
            {socialicons.map((src, index) => (
              <div
                key={index}
                className="group relative overflow-hidden w-[34px] h-[34px] flex items-center justify-center rounded-md bg-slate-200/80 shadow-sm"
              >
                <Img imgsrc={src} styles="w-[20px] z-[999] cursor-pointer" />
                <div className="group-hover:w-full left absolute left-0 top-0 bg-main_orange w-0 duration-300 cursor-pointer h-[500px]"></div>
              </div>
            ))}
          </div> */}
          <Skeleton
            height={30}
            count={1}
            className="text-main_text dark:text-secend_text"
          />
          <Skeleton
            height={30}
            count={1}
            className="text-main_text dark:text-secend_text"
          />
          <Skeleton
            height={30}
            count={1}
            className="text-main_text dark:text-secend_text"
          />
          <Skeleton height={20} count={1} className="my-2 w-[80%]" />
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { Usevariables } from "@/app/context/VariablesProvider";
import { instance } from "@/app/Api/axios";
import dynamic from "next/dynamic";
import LoadingSpiner from "@/app/_componants/LoadingSpiner";

const MapDash = dynamic(() => import("../../_componants/_dashboard/MapDash"), {
  ssr: false,
});

export default function Calldetailes() {
  const { language } = Usevariables();
  const [form, setform] = useState({
    whatsapp_number: "",
    address: "",
    gmail_account: "",
    show_map: false, // إضافة show_map
    facbook: "",
    youtube: "",
    instgram: "",
    x_account: "",
  });

  const [location, setLocation] = useState({});
  const [done, setdone] = useState("");
  const [loading, setloading] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setform((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchContactInfo = async () => {
    try {
      const response = await instance.get("/all-details");
      const data = response.data.data[0];
      setform({
        whatsapp_number: data.whatsapp_number,
        gmail_account: data.gmail_account,
        address: data.address,
        show_map: data.show_map, // جلب قيمة show_map
        facbook: data.facbook,
        youtube: data.youtube,
        instgram: data.instgram,
        x_account: data.x_account,
      });
      setloading(false);
    } catch (error) {
      setloading(false);
      console.error("Error fetching contact info:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    const formdata = new FormData();
    formdata.append("whatsapp_number", form.whatsapp_number);
    formdata.append("gmail_account", form.gmail_account);
    formdata.append("address", JSON.stringify(location));
    formdata.append("show_map", String(form.show_map)); // إضافة show_map إلى البيانات المرسلة
    formdata.append("facbook", form.facbook);
    formdata.append("youtube", form.youtube);
    formdata.append("instgram", form.instgram);
    formdata.append("x_account", form.x_account);
    try {
      await instance.post("/updateContactInfo", formdata);
      setdone("تم تحديث المعلومات بنجاح");
      setloading(false);
    } catch (error) {
      setloading(false);
      console.error("Error updating contact info:", error);
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-screen relative">
          <LoadingSpiner />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-[90%] max-md:w-[98%] mx-auto mt-16 bg-white dark:bg-secend_dash dark:text-secend_text px-2 py-2 rounded-md"
        >
          <h1 className="text-center text-xl font-semibold py-2">
            {language === "ar"
              ? "معلومات الاتصال مع الشركة"
              : "Company Contact Information"}
          </h1>

          <div className="w-full mb-4">
            <label htmlFor="whatsapp_number" className="text-[18px] py-2">
              {language === "ar" ? "رقم الواتساب" : "WhatsApp Number"}
            </label>
            <input
              type="text"
              value={form.whatsapp_number}
              onChange={handleChange}
              id="whatsapp_number"
              name="whatsapp_number"
              className="text-xl h-[60px] px-4 py-2 placeholder-shown:px-4 w-full border border-gray-300 dark:bg-main_dash dark:text-secend_text dark:border-gray-600 shadow-md rounded-md outline-none font-semibold text-gray-800"
            />
          </div>

          <div className="w-full mb-4">
            <label htmlFor="facbook" className="text-[18px] py-2">
              {language === "ar" ? "حساب فيسبوك" : "facebook Account"}
            </label>
            <input
              type="text"
              value={form.facbook}
              onChange={handleChange}
              id="facbook"
              name="facbook"
              className="text-xl h-[60px] px-4 py-2 placeholder-shown:px-4 w-full border border-gray-300 dark:bg-main_dash dark:text-secend_text dark:border-gray-600 shadow-md rounded-md outline-none font-semibold text-gray-800"
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="instgram" className="text-[18px] py-2">
              {language === "ar" ? "حساب انستجرام" : "instgram Account"}
            </label>
            <input
              type="text"
              value={form.instgram}
              onChange={handleChange}
              id="instgram"
              name="instgram"
              className="text-xl h-[60px] px-4 py-2 placeholder-shown:px-4 w-full border border-gray-300 dark:bg-main_dash dark:text-secend_text dark:border-gray-600 shadow-md rounded-md outline-none font-semibold text-gray-800"
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="youtube" className="text-[18px] py-2">
              {language === "ar" ? "حساب يوتيوب" : "youtube Account"}
            </label>
            <input
              type="text"
              value={form.youtube}
              onChange={handleChange}
              id="youtube"
              name="youtube"
              className="text-xl h-[60px] px-4 py-2 placeholder-shown:px-4 w-full border border-gray-300 dark:bg-main_dash dark:text-secend_text dark:border-gray-600 shadow-md rounded-md outline-none font-semibold text-gray-800"
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="x_account" className="text-[18px] py-2">
              {language === "ar" ? "حساب X" : "X Account"}
            </label>
            <input
              type="text"
              value={form.x_account}
              onChange={handleChange}
              id="x_account"
              name="x_account"
              className="text-xl h-[60px] px-4 py-2 placeholder-shown:px-4 w-full border border-gray-300 dark:bg-main_dash dark:text-secend_text dark:border-gray-600 shadow-md rounded-md outline-none font-semibold text-gray-800"
            />
          </div>

          <div className="w-full mb-4">
            <label htmlFor="gmail_account" className="text-[18px] py-2">
              {language === "ar" ? "حساب (gmail)" : "Gmail Account"}
            </label>
            <input
              type="text"
              value={form.gmail_account}
              onChange={handleChange}
              id="gmail_account"
              name="gmail_account"
              className="text-xl h-[60px] px-4 py-2 placeholder-shown:px-4 w-full border border-gray-300 dark:bg-main_dash dark:text-secend_text dark:border-gray-600 shadow-md rounded-md outline-none font-semibold text-gray-800"
            />
          </div>

          <div className="w-full mb-4">
            <label htmlFor="address" className="text-[18px] py-2">
              {language === "ar" ? "عنوان الشركة" : "Company Address"}
            </label>
            <MapDash setLocation={setLocation} />
          </div>

          <div className="w-full mb-4 flex items-center">
            <label htmlFor="show_map" className="text-[18px] py-2 mr-2">
              {language === "ar" ? "إظهار الخريطة" : "Show Map"}
            </label>
            <input
              type="checkbox"
              checked={form.show_map}
              onChange={handleChange}
              id="show_map"
              name="show_map"
              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2 transition duration-150 ease-in-out"
            />
          </div>

          <div className="w-1/2 mx-auto">
            <input
              type="submit"
              value={language === "ar" ? "حفظ" : "Save"}
              className="px-4 py-2 cursor-pointer bg-green-500 rounded-md shadow-md w-full"
            />
          </div>
          {done && (
            <p className="text-green-400 w-fit mx-auto text-[18px] my-4">
              {done}
            </p>
          )}
        </form>
      )}
    </>
  );
}

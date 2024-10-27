/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
// import Link from "next/link";
import { instance } from "@/app/Api/axios";
import { Usevariables } from "@/app/context/VariablesProvider";
import Img from "@/app/_componants/Image";
import Navbar from "@/app/_componants/_webiste/Navbar";
import Footer from "@/app/_componants/_webiste/Footer";
import LoadingSpiner from "@/app/_componants/LoadingSpiner";

export default function SubServicesComponent({ params }) {
  const id = params.mainserviceid;
  const { language } = Usevariables();
  const [data, setData] = useState<any>([]);
  const [selectedSubService, setSelectedSubService] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setloading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await instance.get(`/subservices/${id}`);
        setData(response.data.data);
        setloading(false);
      } catch (error) {
        setloading(false);
        console.log(error);
      }
    };
    getData();
  }, [id]);

  const handleSubServiceClick = (subService: any) => {
    setSelectedSubService(subService);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubService) return;

    const requestData = {
      phone_number: phoneNumber,
      request_description: description,
      sub_service: `${selectedSubService.id}`,
      main_service: id,
    };

    try {
      // هنا يمكنك إضافة الطلب إلى API الخاص بك
      await instance.post("/add-order", requestData);
      setSuccessMessage("تم تقديم الطلب بنجاح!");
      // إعادة تعيين القيم
      setSelectedSubService(null);
      setPhoneNumber("");
      setDescription("");

      // إخفاء الرسالة بعد 3 ثواني
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("خطأ في تقديم الطلب:", error);
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="h-screen relative">
          <LoadingSpiner />
        </div>
      ) : (
        <section className="dark:bg-main_dash dark:text-secend_text h-[70vh]">
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
            <div className="mx-auto max-w-lg text-center">
              <h2 className="text-xl text-main_orange my-4 font-bold sm:text-2xl">
                {language === "en" ? "Sub Services" : "الخدمات الفرعية"}
              </h2>
            </div>

            {!selectedSubService && (
              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 ">
                {data.map((subService, index) => (
                  <div
                    key={index}
                    onClick={() => handleSubServiceClick(subService)}
                    className="block group rounded-xl border border-gray-500 dark:border-gray-800 p-8 shadow-xl transition hover:border-main_orange hover:shadow-main_orange relative overflow-hidden cursor-pointer"
                  >
                    <Img
                      imgsrc={
                        subService.image
                          ? subService.image
                          : "/servicessection/2.png"
                      }
                      styles="w-[50px]"
                    />
                    <h2 className="mt-4 group-hover:text-white text-xl font-bold text-main_blue dark:text-secend_text">
                      {language === "en"
                        ? subService.title_en
                        : subService.title_ar}
                    </h2>
                    <p className="mt-1 group-hover:text-white text-sm text-black/70 dark:text-secend_text">
                      {language === "en"
                        ? subService.description_en
                        : subService.description_ar}
                    </p>
                    <div className="w-0 h-full absolute top-0 left-0 bg-main_orange z-[-1] group-hover:w-full duration-500"></div>
                  </div>
                ))}
              </div>
            )}

            {selectedSubService && (
              <div className="mt-8 p-4 border rounded shadow">
                <h3 className="text-lg font-bold">
                  {language === "en" ? "Request Service" : "طلب الخدمة"}
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm">
                      {language === "en" ? "Phone Number" : "رقم الهاتف"}
                    </label>
                    <input
                      type="text"
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="mt-1 block w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm">
                      {language === "en" ? "Description" : "الوصف"}
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 block w-full p-2 border rounded"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-main_orange text-white p-2 rounded"
                  >
                    {language === "en" ? "Submit" : "إرسال"}
                  </button>
                </form>
              </div>
            )}

            {/* رسالة النجاح */}
            {successMessage && (
              <div className="mt-4 p-2 text-center text-green-500">
                {successMessage}
              </div>
            )}
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}

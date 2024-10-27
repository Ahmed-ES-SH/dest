/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Img from "../Image";
import { instance } from "@/app/Api/axios";
import { Usevariables } from "@/app/context/VariablesProvider";
import LoadingSpiner from "../LoadingSpiner";

export default function ContanctUS() {
  const { language } = Usevariables();
  const [currentimage, setcurrentimage] = useState("");
  const [done_ar, setdone_ar] = useState("");
  const [done_en, setdone_en] = useState("");
  const [loading, setloading] = useState(false);
  const [form, setform] = useState({
    name: "",
    email: "",
    phone_number: "",
    message: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await instance.get("/contactimage");
        const data = response.data.contact_img;

        // تخزين البيانات في الحالة
        if (data) {
          setcurrentimage(data); // تأكد من أن لديك حقل للصورة في البيانات المسترجعة
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const onchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    const formdata = new FormData();
    formdata.append("name", form.name);
    formdata.append("email", form.email);
    formdata.append("phone_number", form.phone_number);
    formdata.append("message", form.message);
    try {
      const response = await instance.post("/add-message", formdata);
      setdone_ar("شكرا لتواصلك معنا سنعمل على الرد عليك فى أسرع وقت ! ");
      setdone_en(
        "Thank you for contacting us, we will work to get back to you as soon as possible ! "
      );
      setloading(false);
      throw response;
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  // كائن النصوص لدعم اللغتين
  const textContent: any = {
    en: {
      title: "Contact us",
      name: "Name",
      email: "Email address",
      phone: "Phone Number",
      message: "Message",
      send: "Send Message",
    },
    ar: {
      title: "تواصل معنا",
      name: "الاسم",
      email: "عنوان البريد الإلكتروني",
      phone: "رقم الهاتف",
      message: "رسالة",
      send: "إرسال الرسالة",
    },
  };

  return (
    <>
      {loading ? (
        <div className="h-[60vh] relative">
          <LoadingSpiner />
        </div>
      ) : (
        <section
          id="contactus"
          className="bg-gray-100 dark:bg-secend_dash pt-3"
        >
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="title relative w-fit group">
              <h1 className="text-4xl text-main_blue duration-200">
                {textContent[language].title}
              </h1>
              <div className="line group-hover:w-full duration-300 w-0 bg-sky-400 h-[2px] absolute"></div>
              <div className="circle group-hover:visible duration-300 w-[3px] invisible left-2 h-[3px] rounded-full bg-white z-[999] absolute"></div>
            </div>
            <div className="grid grid-cols-1 mt-2 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <Img
                  imgsrc={currentimage ? currentimage : "/contact-bg.jpg"}
                  styles="w-full h-full object-cover"
                />
              </div>

              <div className="rounded-lg dark:rounded-none bg-white dark:bg-main_dash p-8 shadow-lg lg:col-span-3 lg:p-12">
                <form onSubmit={handlesubmit} className="space-y-4">
                  <div>
                    <label className="sr-only" htmlFor="name">
                      {textContent[language].name}
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-300 outline-none shadow-md p-3 text-sm"
                      placeholder={textContent[language].name}
                      type="text"
                      id="name"
                      name="name"
                      onChange={onchange}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="sr-only" htmlFor="email">
                        {textContent[language].email}
                      </label>
                      <input
                        className="w-full rounded-lg border-gray-300 outline-none shadow-md p-3 text-sm"
                        placeholder={textContent[language].email}
                        type="email"
                        id="email"
                        name="email"
                        onChange={onchange}
                      />
                    </div>

                    <div>
                      <label className="sr-only" htmlFor="phone">
                        {textContent[language].phone}
                      </label>
                      <input
                        className="w-full rounded-lg border-gray-300 outline-none shadow-md p-3 text-sm"
                        placeholder={textContent[language].phone}
                        type="tel"
                        id="phone"
                        name="phone_number"
                        onChange={onchange}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="message">
                      {textContent[language].message}
                    </label>

                    <textarea
                      className="w-full h-[20vh] border border-gray-300 outline-none shadow-md rounded-lg p-3 text-sm"
                      placeholder={textContent[language].message}
                      id="message"
                      name="message"
                      onChange={onchange}
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-block w-full rounded-lg bg-black dark:bg-main_orange px-5 py-3 font-medium text-white sm:w-auto"
                    >
                      {textContent[language].send}
                    </button>
                  </div>
                </form>
                {done_ar && (
                  <p className="w-full mt-4 text-green-500 text-[18px]">
                    {language == "en" ? done_en : done_ar}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

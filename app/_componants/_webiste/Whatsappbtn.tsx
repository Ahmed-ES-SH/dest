"use client";
import { instance } from "@/app/Api/axios";
import React, { useEffect, useState } from "react"; // تأكد من استيراد useState
import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  const [whatsappNumber, setWhatsappNumber] = useState(""); // إضافة حالة لتخزين رقم الواتساب

  const fetchContactInfo = async () => {
    try {
      const response = await instance.get("/getContactInfo");
      const data = response.data;
      setWhatsappNumber(data.whatsapp_number); // تحديث رقم الواتساب من الـ API
    } catch (error) {
      console.error("Error fetching contact info:", error);
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}`; // استخدم رقم الواتساب المخزن
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="flex group w-[60px] h-[60px] items-center justify-center gap-2 z-[9999] fixed bottom-2 left-8 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
    >
      <FaWhatsapp size={40} />
    </button>
  );
};

export default WhatsappButton;

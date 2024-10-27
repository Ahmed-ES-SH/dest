/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import Img from "../Image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { Usevariables } from "@/app/context/VariablesProvider";
import { instance } from "@/app/Api/axios";

const ProductGallery = () => {
  const { language } = Usevariables(); // استخدام المتغير language
  const [sliders, setSliders] = useState<any[]>([]); // حالة لتخزين البيانات
  const [loading, setLoading] = useState(true); // حالة لتحميل البيانات
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // دالة لاسترجاع البيانات من الـ API
  const fetchSliders = async () => {
    try {
      const response = await instance.get("/sliders");
      setSliders(response.data.data); // تخزين البيانات المسترجعة
    } catch (error) {
      console.error("Error fetching sliders:", error);
    } finally {
      setLoading(false); // تعيين حالة التحميل كـ false بعد الانتهاء
    }
  };

  // استدعاء دالة fetchSliders عند تحميل المكون
  useEffect(() => {
    fetchSliders();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // واجهة التحميل
  }

  return (
    <div className="product-slider w-[90%] max-w-screen-xl mx-auto my-10">
      <h2 className="text-3xl dark:text-white font-bold text-center mb-5">
        {language === "ar" ? "استعرض المنتج" : "View Product"}
      </h2>
      <Swiper
        style={{ direction: "ltr" }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={30}
        slidesPerView={1} // الحد الأدنى لعدد العناصر
        pagination={{ clickable: true }}
        navigation={false}
        onSlideChange={({ isBeginning: beginning, isEnd: end }) => {
          setIsBeginning(beginning);
          setIsEnd(end);
        }}
        breakpoints={{
          640: { slidesPerView: 1 }, // أقل من 640 بيكسل: عنصر واحد
          768: { slidesPerView: 2 }, // أقل من 768 بيكسل: عنصرين
          1024: { slidesPerView: 3 }, // أقل من 1024 بيكسل: ثلاثة عناصر
        }}
      >
        {sliders.map((slider, index) => (
          <SwiperSlide
            key={index}
            className="relative rounded-lg overflow-hidden shadow-lg group"
          >
            <div className="relative w-full h-full">
              <Img
                imgsrc={slider.image ? slider.image : "/portfoliosection/2.jpg"}
                styles="w-full h-full object-cover"
              />
              {/* استخدام الصورة من البيانات */}
              <motion.h3
                className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-lg font-semibold p-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300"
                initial={{ opacity: 0, translateY: "20%" }}
                animate={{ opacity: 0, translateY: "20%" }}
                whileHover={{ opacity: 1, translateY: "0" }}
                transition={{ duration: 0.3 }}
              >
                {language === "ar" ? slider.title_ar : slider.title_en}{" "}
                {/* استخدام العنوان حسب اللغة */}
              </motion.h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex items-center gap-8 mt-6 w-fit mx-auto">
        <div className="z-10">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            className={`bg-sky-400 hover:bg-transparent hover:text-black hover:border-gray-800 duration-200 border border-transparent text-white p-2 rounded-full shadow-lg ${
              isBeginning ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaArrowLeft />
          </button>
        </div>
        <div className="z-10">
          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            className={`bg-sky-400 hover:bg-transparent hover:text-black hover:border-gray-800 duration-200 border border-transparent text-white p-2 rounded-full shadow-lg ${
              isEnd ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { instance } from "@/app/Api/axios";
import Img from "@/app/_componants/Image";
import Navbar from "@/app/_componants/_webiste/Navbar";
import Footer from "@/app/_componants/_webiste/Footer";
import Link from "next/link";
import LoadingSpiner from "@/app/_componants/LoadingSpiner";
import { Usevariables } from "@/app/context/VariablesProvider";
import "swiper/css";
import "swiper/css/navigation";

const ProjectDetail = ({ params }) => {
  const swiperRef = useRef<any>(null);
  const { language } = Usevariables();
  const projectId = params.projectid;
  const [project, setProject] = useState<any>({
    title_en: "",
    title_ar: "",
    description_en: "",
    description_ar: "",
    image: "",
    technologies_used: "",
  });
  const [relatedProjects, setRelatedProjects] = useState<any>([]);
  const [isBeginning, setIsBeginning] = useState(true); // حالة لمعرفة إذا كنا في أول شريحة
  const [isEnd, setIsEnd] = useState(false);

  // جلب بيانات المشروع
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await instance.get(`/project/${projectId}`);
        const projectData = response.data.data;

        // إعداد البيانات بناءً على اللغة
        setProject({
          title_en: projectData.title_en,
          title_ar: projectData.title_ar,
          description_ar: projectData.description_ar,
          description_en: projectData.description_en,
          image: projectData.image,
          technologies_used: projectData.technologies_used, // إضافة تقنيات المشروع
        });
      } catch (error) {
        console.error(
          language === "ar"
            ? "حدث خطأ في جلب بيانات المشروع"
            : "Error fetching project data",
          error
        );
      }
    };

    fetchProject();
  }, [projectId, language]);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  };

  // جلب المشاريع ذات الصلة
  const fetchRelatedProjects = async () => {
    try {
      const response = await instance.get("/projects?page=1");
      const randomProjects = response.data.data;
      setRelatedProjects(randomProjects);
    } catch (error) {
      console.error("Error fetching related projects", error);
    }
  };

  useEffect(() => {
    fetchRelatedProjects();
  }, []);

  if (!project)
    return (
      <div className="h-screen relative">
        <LoadingSpiner />
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="py-24 px-4 sm:px-6 lg:px-8 dark:bg-secend_dash">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-4 text-main_text dark:text-secend_text">
            {language == "en" ? project.title_en : project.title_ar}
          </h2>
          <Img
            imgsrc={project.image ? project.image : "/portfoliosection/2.jpg"}
            styles="w-full h-96 object-cover mb-6  rounded-md shadow-md"
          />
          <p className="text-lg text-main_text dark:text-secend_text">
            {language == "en" ? project.description_en : project.description_ar}
          </p>

          {/* عرض التقنيات المستخدمة */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2 text-main_text dark:text-secend_text">
              {language === "en" ? "Technologies Used" : "التقنيات المستخدمة"}
            </h3>
            <ul className="flex items-center flex-wrap gap-4">
              {project.technologies_used.length > 0 &&
                project.technologies_used.map((skill, index) => (
                  <li
                    key={index}
                    className="text-lg whitespace-nowrap  text-main_text dark:text-text-white rounded-md   px-2 py-1 text-white  shadow-sm bg-main_blue text-center "
                  >
                    #{skill}
                  </li>
                ))}
            </ul>
          </div>
        </motion.div>

        <h3 className="text-2xl border-b border-sky-600 mx-auto pb-3 w-fit font-bold text-center mb-8 text-main_text dark:text-secend_text">
          {language == "en" ? "Related Projects" : "المشاريع ذات الصلة"}
        </h3>
        <div style={{ direction: "ltr" }} className="relative">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="max-w-xl mx-auto md:max-w-3xl lg:max-w-full"
          >
            {relatedProjects.map((relatedProject) => (
              <SwiperSlide
                key={relatedProject.id}
                className="overflow-hidden rounded-lg"
              >
                <Link
                  href={`/portfolio/${relatedProject.id}`}
                  className="relative group cursor-pointer rounded-md"
                >
                  <div className="relative overflow-hidden">
                    <Img
                      imgsrc={
                        relatedProject.image
                          ? relatedProject.image
                          : "/portfoliosection/3.jpg"
                      }
                      styles="w-full h-52 group-hover:scale-110 group-hover:rotate-2 duration-300 object-cover rounded-md shadow-sm"
                    />
                  </div>
                  <h1 className="absolute -bottom-32   group-hover:bottom-4 duration-200 text-white z-[99] text-left px-2 my-2">
                    {language == "en"
                      ? relatedProject.title_en
                      : relatedProject.title_ar}
                  </h1>
                  <div className="w-full h-full absolute left-0 top-0 bg-black opacity-50 "></div>
                  <ul className="flex flex-col gap-2 items-end absolute -right-[300px] group-hover:right-0 duration-200 top-2">
                    {relatedProject.technologies_used.map((skill, index) => (
                      <li
                        key={index}
                        className="text-sm text-white rounded-l-md w-fit whitespace-nowrap px-2 py-1 bg-main_blue shadow-sm"
                      >
                        #{skill}
                      </li>
                    ))}
                  </ul>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* أزرار التنقل المخصصة */}
          <div className="flex items-center gap-8 mt-6 w-fit mx-auto">
            <div className="z-10">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={isBeginning} // تعطيل الزر إذا كنا في أول شريحة
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
                disabled={isEnd} // تعطيل الزر إذا كنا في آخر شريحة
                className={`bg-sky-400 hover:bg-transparent hover:text-black hover:border-gray-800 duration-200 border border-transparent text-white p-2 rounded-full shadow-lg ${
                  isEnd ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProjectDetail;

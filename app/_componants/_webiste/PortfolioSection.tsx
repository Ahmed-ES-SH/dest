/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { instance } from "@/app/Api/axios";
import { Usevariables } from "@/app/context/VariablesProvider";
import { motion } from "framer-motion";
import Img from "../Image";
import Link from "next/link";

export default function PortfolioSection() {
  const { language } = Usevariables(); // جلب اللغة المختارة
  const [projects, setProjects] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(true);
  const [allSkills, setallSkills] = useState<any>([]);
  const [selectedSkill, setSelectedSkill] = useState("All");

  useEffect(() => {
    const getData = async () => {
      setloading(true);
      const response = await instance.get(`/projects?page=1`).then((data) => {
        setProjects(data.data.data);
      });
      setloading(false);
      throw response;
    };
    getData(); // جلب البيانات للصفحة الحالية
  }, []);

  console.log(loading);

  useEffect(() => {
    const getservices = async () => {
      const response = await instance
        .get("/services")
        .then((data) => setallSkills(data.data.data));
      throw response;
    };
    getservices();
  }, []);

  // Filter projects based on the selected skill
  const filteredProjects =
    selectedSkill === "All"
      ? projects
      : projects.filter((project: any) => project.category === selectedSkill);

  // Animation variants for project cards
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <section className="bg-white dark:bg-gray-900 antialiased w-full">
      <div className="max-w-screen-xl px-4 py-6 mx-auto lg:px-6 sm:py-16 lg:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-main_text sm:text-4xl dark:text-secend_text">
            {language === "en" ? "Our Portfolio" : "معرض أعمالنا"}
          </h2>
          <p className="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
            {language === "en"
              ? "Crafted with skill and care to help our clients grow their business!"
              : "مصمم بحرفية وعناية لمساعدة عملائنا على تنمية أعمالهم!"}
          </p>
        </div>

        {/* Filter section */}
        <div className="mt-8 flex justify-center mb-6">
          <div className="space-x-4 flex items-center justify-center flex-wrap max-md:flex-col gap-2">
            {allSkills.map((skill, index) => (
              <button
                key={index}
                className={`px-4 py-2 text-[12px] rounded-md ${
                  selectedSkill === skill.title_en
                    ? "bg-main_blue text-white"
                    : "bg-gray-200 dark:bg-gray-800 whitespace-nowrap text-gray-800 dark:text-white"
                }`}
                onClick={() => setSelectedSkill(skill.title_en)}
              >
                {language === "en" ? skill.title_en : skill.title_ar}
              </button>
            ))}
            <button
              className={`px-4 py-2 text-[12px] rounded-md ${
                selectedSkill === "All"
                  ? "bg-main_blue text-white"
                  : "bg-gray-200 dark:bg-gray-800 whitespace-nowrap text-gray-800 dark:text-white"
              }`}
              onClick={() => setSelectedSkill("All")}
            >
              {language === "en" ? "Show All" : "عرض الكل"}
            </button>
          </div>
        </div>

        {/* Projects section */}
        {filteredProjects.length === 0 ? (
          <div className="h-[60vh] relative">
            <p className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-lg font-semibold text-gray-500 dark:text-gray-400">
              {language === "en"
                ? "There are no projects related to this skill yet."
                : "لا يوجد مشاريع متعلقة بتلك الخدمة حتى الآن."}
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={projectVariants}
                className="border cursor-pointer border-gray-300 dark:border-gray-600 w-full max-h-[60vh] overflow-hidden group relative rounded-lg shadow-lg"
              >
                <Link href={`portfolio/${project?.id}`}>
                  <Img
                    imgsrc={
                      project.image ? project.image : "/portfoliosection/2.jpg"
                    }
                    styles="w-full h-[250px] rounded-t-lg group-hover:scale-110 group-hover:rotate-1 duration-300"
                  />
                  <div className="content h-[20vh] px-3 flex flex-col items-start gap-3">
                    <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white mt-4">
                      {language === "ar" ? project.title_ar : project.title_en}
                    </h3>
                    <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                      {language === "ar"
                        ? project.description_ar.length > 150
                          ? project.description_ar.slice(0, 150) + "..."
                          : project.description_ar
                        : project.description_en.length > 150
                        ? project.description_en.slice(0, 150) + "..."
                        : project.description_en}
                    </p>
                  </div>
                  <div className="skills duration-300 group-hover:opacity-100 opacity-0 left-0 w-full flex items-center gap-1 flex-wrap px-2">
                    {project.technologies_used &&
                      project.technologies_used.map((skill, index) => (
                        <div
                          key={index}
                          className="px-2 py-1 text-center text-[14px] rounded-md shadow-md dark:text-white"
                        >
                          #{skill}
                        </div>
                      ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
        <Link
          href="/portfolio"
          className="group w-fit mx-auto relative overflow-hidden mt-4 block bg-main_blue px-12 py-3 text-sm font-medium transition focus:outline-none hover:border-main_blue border border-transparent rounded-md duration-300"
        >
          <p className="group-hover:text-black text-white relative z-[99]">
            {language == "en" ? "Show More" : "شاهد المزيد"}
          </p>
          <div className="group-hover:w-full left absolute right-0 top-0 bg-white w-0 duration-700 h-[500px] -z-1"></div>
          <div className="group-hover:w-full right absolute left-0 top-0 bg-white w-0 duration-700 h-[500px] -z-1"></div>
        </Link>
      </div>
    </section>
  );
}

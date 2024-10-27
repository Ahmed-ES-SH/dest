import { Metadata } from "next";
import React from "react";
import Navbar from "./_componants/_webiste/Navbar";
import ServicesSection from "./_componants/_webiste/ServicesSection";
import About from "./_componants/_webiste/About";
import Value from "./_componants/_webiste/value";
import PortfolioSection from "./_componants/_webiste/PortfolioSection";
import ContanctUS from "./_componants/_webiste/ContanctUS";
import BlogSlider from "./_componants/_webiste/Blog";
import Footer from "./_componants/_webiste/Footer";
import Quations_Answers from "./_componants/_FAQ/Quations_Answers";
import dynamic from "next/dynamic";
import Hero from "./_componants/_webiste/Hero";

export const metadata: Metadata = {
  title: "مدد للدعاية والإعلان | الرئيسية ",
  description:
    "شركة مدد للدعاية والاعلان والتخصص فى الخدمات الافتراضية مثل - (بناء التطبيقات - بناء المواقع الالكترونية - تنيظم حملات التسويق - مراجعة الخطط التسويقية وتطويرها - بناء خطط تسويقية تناسب السوق المستهدف - بناء إحصائيات تخص النظام الاقتصادى للسوق المستهدف )",
};

const DynamicMap = dynamic(() => import("./_componants/MapComponent"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="h-screen w-full relative overflow-hidden bg-[#f8f6f4] flex items-center justify-center  lg:overflow-hidden  dark:bg-main_dash dark:text-secend_text">
        <Hero />
      </div>
      <About />
      <Value />
      <ServicesSection />
      <PortfolioSection />
      <BlogSlider />
      <Quations_Answers />
      <ContanctUS />
      <DynamicMap />
      <Footer />
    </>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import About_dash from "./About_section";
import Value_dash from "./value_dash";
import Blog_dash from "./Blog_dash";
import FAQ_dash from "./FAQ";
import ContanctUS_dash from "./ContactUs_dash";
import { instance } from "@/app/Api/axios";
import LoadingSpiner from "../../LoadingSpiner";
export default function Main() {
  const [Data, setdata] = useState("");
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await instance.get("./texts");
        const data = response.data.data[0];
        setdata(data);
        setloading(false);
        throw Data;
      } catch (error) {
        setloading(false);
        console.log(error);
      }
    };

    getData();
  }, []);
  return (
    <>
      {!loading ? (
        <div className="mt-8">
          <About_dash />
          <Value_dash />
          <Blog_dash />
          <FAQ_dash />
          <ContanctUS_dash />
        </div>
      ) : (
        <div className="h-screen relative">
          <LoadingSpiner />
        </div>
      )}
    </>
  );
}

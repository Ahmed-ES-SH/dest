"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookie from "cookie-universal";
import { instance } from "../Api/axios";
const VariablesContext = createContext(null);
// مكون المزود الذي يلتف حول تطبيقك ويوفر اللغة لكل المكونات
export const VariablesProvider = ({ children }) => {
  const cookie = Cookie();
  const token = cookie.get("madad_token");
  const [language, setLanguage] = useState("en"); // اللغة الافتراضية هي الإنجليزية
  const [opensidebar, setopensidebar] = useState(false);
  const [currentuser, setcurrentuser] = useState(null); // اللغة الافتراضية هي الإنجليزية
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) {
          throw new Error("No token found");
        }
        const response = await instance.get("/currentuser");

        console.log(response);
        setcurrentuser(response.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <VariablesContext.Provider
      value={{
        language,
        setLanguage,
        currentuser,
        opensidebar,
        setopensidebar,
      }}
    >
      {children}
    </VariablesContext.Provider>
  );
};

// هوك مخصص للوصول إلى الـ Context بسهولة
export const Usevariables = () => {
  const context = useContext(VariablesContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
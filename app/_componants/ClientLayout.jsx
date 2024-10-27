"use client";
import React from "react";
import WhatsappButton from "./_webiste/Whatsappbtn";
import ScrollToTopButton from "./_webiste/Go_up";
import { Usevariables, VariablesProvider } from "../context/VariablesProvider";

export default function ClientLayout({ children }) {
  return (
    <VariablesProvider>
      <Content>{children}</Content>
    </VariablesProvider>
  );
}

function Content({ children }) {
  const { language } = Usevariables();
  return (
    <div style={{ direction: language === "en" ? "ltr" : "rtl" }}>
      {children}
      <WhatsappButton />
      <ScrollToTopButton />
    </div>
  );
}

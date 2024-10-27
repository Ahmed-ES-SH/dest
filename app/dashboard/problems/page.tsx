"use client";
import HeadTable from "@/app/_componants/_dashboard/Head_table";
import PaginatedTable from "@/app/_componants/PagenationTable.jsx";
import { Usevariables } from "@/app/context/VariablesProvider";
import React from "react";

export default function Problems() {
  const { language } = Usevariables();
  const headers = [
    "id",
    "الاسم",
    "البريد الإلكترونى ",
    "رقم الهاتف",
    "الرسالة",
    "وقت الإنشاء",
  ];
  const keys = ["id", "name", "email", "phone_number", "message", "created_at"];
  return (
    <>
      <HeadTable title="رسائل المستخدمين" linktitle="" path="" />
      <PaginatedTable
        keys={keys}
        headers={language == "en" ? keys : headers}
        api="/messages"
        apidelete="/delete-message"
      />
    </>
  );
}

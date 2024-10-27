"use client";
import HeadTable from "@/app/_componants/_dashboard/Head_table";
import PaginatedTable from "@/app/_componants/PagenationTable.jsx";
import { Usevariables } from "@/app/context/VariablesProvider";
import React from "react";

export default function Newsletter() {
  const { language } = Usevariables();
  const headers = ["id", "الحساب", "وقت الإنشاء"];
  const keys = ["id", "subscriber_email", "created_at"];
  return (
    <>
      <HeadTable title="رسائل المستخدمين" linktitle="" path="" />
      <PaginatedTable
        keys={keys}
        headers={language == "en" ? keys : headers}
        api="/subscribers"
        apidelete="/delete-message"
      />
    </>
  );
}

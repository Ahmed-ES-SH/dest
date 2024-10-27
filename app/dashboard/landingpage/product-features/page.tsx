/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { instance } from "@/app/Api/axios";
import { motion } from "framer-motion";
import Img from "@/app/_componants/Image";
import { Usevariables } from "@/app/context/VariablesProvider";
import LoadingSpiner from "@/app/_componants/LoadingSpiner";

// مكون Popup
const Popup = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600"
        >
          &times;
        </button>
        {children}
      </motion.div>
    </div>
  );
};

// مكون ProductFeatures
const ProductFeatures = () => {
  const { language } = Usevariables();
  const [features, setFeatures] = useState<any>([]);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setloading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newFeature, setNewFeature] = useState({
    title_ar: "",
    title_en: "",
    description_ar: "",
    description_en: "",
    image: null,
  });

  // جلب المميزات من API
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await instance.get("/productfeatchers");
        setFeatures(response.data.data);
        setloading(false);
      } catch (error) {
        setloading(false);
        console.error("Error fetching features:", error);
      }
    };

    fetchFeatures();
  }, []);

  // التعامل مع تعديل الميزة
  const handleEdit = (feature) => {
    setSelectedFeature(feature);
    setNewFeature({
      title_ar: feature.title_ar,
      title_en: feature.title_en,
      description_ar: feature.description_ar,
      description_en: feature.description_en,
      image: null,
    });
    setIsEditing(true);
    setShowPopup(true);
  };

  // التعامل مع حذف الميزة
  const handleDelete = async (id) => {
    try {
      await instance.delete(`/delete-productfeatcher/${id}`);
      setFeatures(features.filter((feature) => feature.id !== id));
    } catch (error) {
      console.error("Error deleting feature:", error);
    }
  };

  // التعامل مع إضافة ميزة جديدة
  const handleAdd = () => {
    setNewFeature({
      title_ar: "",
      title_en: "",
      description_ar: "",
      description_en: "",
      image: null,
    });
    setIsEditing(false);
    setShowPopup(true);
  };

  // التعامل مع حفظ الميزة (التعديل أو الإضافة)
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title_ar", newFeature.title_ar);
      formData.append("title_en", newFeature.title_en);
      formData.append("description_ar", newFeature.description_ar);
      formData.append("description_en", newFeature.description_en);
      if (newFeature.image) {
        formData.append("image", newFeature.image);
      }

      if (isEditing && selectedFeature) {
        await instance.post(
          `/update-productfeatcher/${selectedFeature.id}`,
          formData
        );
      } else {
        await instance.post("/add-productfeatcher", formData);
      }

      const response = await instance.get("/productfeatchers");
      setFeatures(response.data.data);
      setShowPopup(false);
    } catch (error) {
      console.error("Error saving feature:", error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="h-screen relative">
          <LoadingSpiner />
        </div>
      ) : (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">مميزات المنتج</h1>
          <button
            onClick={handleAdd}
            className="mb-4 p-2 flex items-center gap-2 bg-blue-600 text-white rounded"
          >
            <FaPlus className="mr-2" />
            إضافة ميزة جديدة
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="p-4 border rounded shadow hover:shadow-lg transition-shadow duration-300"
              >
                <Img
                  imgsrc={
                    feature.image ? feature.image : "/servicessection/3.png"
                  }
                  styles="mb-2 w-[150px] rounded"
                />

                <h2 className="text-xl font-semibold">
                  {language === "en" ? feature.title_en : feature.title_ar}
                </h2>
                <p className="mb-2">
                  {language === "en"
                    ? feature.description_en
                    : feature.description_ar}
                </p>
                <div className="flex justify-end gap-3 mt-2">
                  <button
                    onClick={() => handleEdit(feature)}
                    className="text-blue-600 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(feature.id)}
                    className="text-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* نافذة منبثقة لإضافة أو تعديل الميزة */}
          {showPopup && (
            <Popup onClose={() => setShowPopup(false)}>
              <h2 className="text-xl font-semibold mb-4">
                {isEditing ? "تعديل الميزة" : "إضافة ميزة جديدة"}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
                {isEditing && (
                  <div className="mb-4">
                    <label className="block mb-1">الصورة الحالية:</label>
                    <Img
                      imgsrc={
                        selectedFeature.image
                          ? selectedFeature.image
                          : "/servicessection/3.png"
                      }
                      styles="mb-2 w-[150px] rounded"
                    />
                  </div>
                )}
                <div className="mb-4">
                  <label className="block mb-1">العنوان (عربي):</label>
                  <input
                    type="text"
                    value={newFeature.title_ar}
                    onChange={(e) =>
                      setNewFeature({ ...newFeature, title_ar: e.target.value })
                    }
                    className="border rounded w-full p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">العنوان (إنجليزي):</label>
                  <input
                    type="text"
                    value={newFeature.title_en}
                    onChange={(e) =>
                      setNewFeature({ ...newFeature, title_en: e.target.value })
                    }
                    className="border rounded w-full p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">الوصف (عربي):</label>
                  <textarea
                    value={newFeature.description_ar}
                    onChange={(e) =>
                      setNewFeature({
                        ...newFeature,
                        description_ar: e.target.value,
                      })
                    }
                    className="border rounded w-full p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">الوصف (إنجليزي):</label>
                  <textarea
                    value={newFeature.description_en}
                    onChange={(e) =>
                      setNewFeature({
                        ...newFeature,
                        description_en: e.target.value,
                      })
                    }
                    className="border rounded w-full p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">
                    اختر صورة جديدة (اختياري):
                  </label>
                  <input
                    type="file"
                    onChange={(e: any) =>
                      setNewFeature({ ...newFeature, image: e.target.files[0] })
                    }
                    className="border rounded w-full p-2"
                    accept="image/*"
                  />
                </div>
                <button
                  type="submit"
                  className="p-2 bg-green-600 text-white rounded"
                >
                  حفظ
                </button>
              </form>
            </Popup>
          )}
        </div>
      )}
    </>
  );
};

export default ProductFeatures;

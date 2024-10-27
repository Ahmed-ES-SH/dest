/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { instance } from "@/app/Api/axios";
import Img from "@/app/_componants/Image";
import LoadingSpiner from "@/app/_componants/LoadingSpiner";
import { FaPlus } from "react-icons/fa";

const LandingSlider = () => {
  const [sliders, setSliders] = useState<any>([]);
  const [formData, setFormData] = useState({
    title_en: "",
    title_ar: "",
    image: null,
  });
  const [editingSlider, setEditingSlider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // حالة للنافذة المنبثقة

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const response = await instance.get("/sliders");
      setSliders(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sliders:", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title_en", formData.title_en);
    form.append("title_ar", formData.title_ar);
    if (formData.image) form.append("image", formData.image);

    try {
      if (editingSlider) {
        await instance.post(`/update-slider/${editingSlider}`, form);
      } else {
        await instance.post("/add-slider", form);
      }
      fetchSliders();
      setFormData({ title_en: "", title_ar: "", image: null });
      setEditingSlider(null);
      setIsPopupOpen(false); // أغلق النافذة المنبثقة بعد الإرسال
    } catch (error) {
      console.error("Error saving slider:", error);
    }
  };

  const handleEdit = (slider) => {
    setEditingSlider(slider.id);
    setFormData({
      title_en: slider.title_en,
      title_ar: slider.title_ar,
      image: null,
    });
    setIsPopupOpen(true); // افتح النافذة المنبثقة عند التعديل
  };

  const handleDelete = async (id) => {
    try {
      await instance.delete(`/delete-slider/${id}`);
      fetchSliders();
    } catch (error) {
      console.error("Error deleting slider:", error);
    }
  };

  return (
    <div className="w-[90%] max-md:w-[98%] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Landing Sliders</h1>

      {/* زر إضافة شريحة جديدة */}
      <button
        onClick={() => {
          setEditingSlider(null); // تعيين التحرير إلى null لإضافة شريحة جديدة
          setFormData({ title_en: "", title_ar: "", image: null }); // إعادة تعيين البيانات
          setIsPopupOpen(true); // افتح النافذة المنبثقة
        }}
        className="bg-green-500 flex items-center gap-3 text-white px-4 py-2 rounded mb-4"
      >
        <p>Add New Slider</p>
        <FaPlus />
      </button>

      {loading ? (
        <div className="h-screen relative">
          <LoadingSpiner />
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {sliders.map((slider) => (
            <motion.div
              key={slider.id}
              className="bg-white rounded-lg shadow-md p-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-semibold">{slider.title_en}</h2>
              <h3 className="text-gray-600">{slider.title_ar}</h3>
              <Img
                imgsrc={slider.image ? slider.image : "/portfoliosection/3.jpg"}
                styles="mt-2 w-[150px] rounded"
              />
              <div className="mt-4 flex justify-between">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleEdit(slider)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(slider.id)}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {isPopupOpen && ( // تحقق مما إذا كانت النافذة المنبثقة مفتوحة
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-2">
              {editingSlider ? "Edit Slider" : "Add Slider"}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title_en"
                placeholder="Title (English)"
                value={formData.title_en}
                onChange={handleChange}
                className="block w-full p-2 mb-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="title_ar"
                placeholder="Title (Arabic)"
                value={formData.title_ar}
                onChange={handleChange}
                className="block w-full p-2 mb-2 border border-gray-300 rounded"
                required
              />
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="block w-full p-2 mb-2 border border-gray-300 rounded"
                accept="image/*"
              />
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  {editingSlider ? "Update Slider" : "Add Slider"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)} // أغلق النافذة المنبثقة
                  className="bg-gray-300 text-black px-4 py-2 rounded mt-2"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingSlider;

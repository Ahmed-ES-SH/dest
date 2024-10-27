/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { instance } from "@/app/Api/axios";
import { Usevariables } from "@/app/context/VariablesProvider";
import Navbar from "@/app/_componants/_webiste/Navbar";
import Footer from "@/app/_componants/_webiste/Footer";
import LoadingSpiner from "@/app/_componants/LoadingSpiner";
import Link from "next/link";
import Img from "@/app/_componants/Image";

const BlogPost = ({ params }) => {
  const { language } = Usevariables();
  const postId = params.blogid;
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await instance.get(`/blog-posts/${postId}`);
        setPost(response.data.data);
        const relatedResponse = await instance.get(`/blog-posts?page=1`);
        setRelatedPosts(relatedResponse.data.data);
      } catch (err: any) {
        setError("حدث خطأ أثناء تحميل المقال.");
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <div className="h-screen relative">
        <LoadingSpiner />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="w-[90%] max-md:w-[98%] mx-auto pt-32 h-fit mb-10 p-6 bg-white dark:bg-secend_dash dark:text-secend_text rounded-lg shadow-lg">
        <motion.h1
          className="text-3xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {language === "en" ? post.title_en : post.title_ar}
        </motion.h1>

        <motion.img
          src={post.image || "/portfoliosection/5.jpg"}
          className="mb-4 w-full h-72 object-cover rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        <motion.div
          className="post-content mb-6 text-justify h-[50vh] px-2 py-1 border dark:border-gray-500 rounded-md overflow-y-auto"
          dangerouslySetInnerHTML={{
            __html: language === "en" ? post.content_en : post.content_ar,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        <div className="flex justify-between mb-4 text-gray-600 dark:text-white">
          <span>المؤلف: {post.author || "Admin"}</span>
          <span>
            تاريخ النشر: {new Date(post.published_date).toLocaleDateString()}
          </span>
        </div>

        <div className="mb-4 text-gray-800">
          <span className="font-semibold">الفئة: </span>
          {post.category}
        </div>

        {post.tags && (
          <div className="mb-4">
            <span className="font-semibold">العلامات: </span>
            {post.tags.split(",").map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 mr-2 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-4">اقتراحات مشابهة</h2>
        <div className="related-posts space-y-4">
          {relatedPosts.length > 0 ? (
            relatedPosts.map((relatedPost) => (
              <motion.div
                key={relatedPost.id}
                className=" max-md:flex-col-reverse flex max-md:pb-3 items-center bg-gray-100  rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                initial={{ scale: 0.95 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className=" pr-4 px-4 w-[35%] max-md:w-full">
                  <h3 className="text-lg  font-semibold lg:whitespace-nowrap">
                    {language === "en"
                      ? relatedPost.title_en
                      : relatedPost.title_ar}
                  </h3>
                  <p className="text-gray-600">
                    {language === "en"
                      ? relatedPost.content_en.length > 40
                        ? relatedPost.content_en.slice(0, 40) + "..."
                        : relatedPost.content_en
                      : relatedPost.content_ar.length > 40
                      ? relatedPost.content_ar.slice(0, 40) + "..."
                      : relatedPost.content_ar}
                  </p>
                  <Link
                    href={`/blog/${relatedPost.id}`}
                    className="text-blue-500 underline"
                  >
                    {language == "en" ? "Read more ..." : "اقرأ المزيد"}
                  </Link>
                </div>
                <div
                  style={{
                    clipPath:
                      language === "en"
                        ? "polygon(0 0, 100% 0, 100% 100%)" // مثلث لجهة اليسار (LTR)
                        : "polygon(100% 0, 0 0, 0 100%)", // مثلث لجهة اليمين (RTL)
                  }}
                  className="w-[65%] h-44 max-md:w-full"
                >
                  <Img
                    styles="w-full h-30"
                    imgsrc={relatedPost.image || "/portfoliosection/2.jpg"}
                  />
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">لا توجد مقالات مشابهة.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPost;

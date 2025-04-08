import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { categoryId } = useParams(); // Lấy categoryId từ URL params
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        // Lấy bài viết theo category
        const articlesResponse = await axios.get(
          `https://apinews-c75x.onrender.com/articles/getByCategoryId/${categoryId}`
        );
        const article = articlesResponse.data;
        setArticles(article["articles"]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchCategoryData();
  }, [categoryId]); // Re-fetch khi categoryId thay đổi

  // Hàm để trích xuất văn bản thuần túy từ HTML và giới hạn độ dài
  const extractTextFromHTML = (html) => {
    if (!html) return "";
    // Tạo một div tạm để chuyển HTML thành text
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";

    // Giới hạn khoảng 5-6 dòng (khoảng 350 ký tự)
    const limitedText = text.substring(0, 350);
    return limitedText + (text.length > 350 ? "..." : "");
  };

  if (loading)
    return <div className="text-center py-8">Đang tải bài viết...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {articles.map((article) => (
          <Link
            to={`/detail/${article.id}`}
            key={article.id}
            className="bg-white rounded-lg border border-green-500 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-row">
              <div className="w-1/3 p-4 flex items-center justify-center">
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={article.image || "/default-image.jpg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/default-image.jpg";
                    }}
                  />
                </div>
              </div>
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <h2 className="font-bold text-xl mb-3">{article.title}</h2>
                  <p className="text-gray-700 line-clamp-4">
                    {extractTextFromHTML(article.content)}
                  </p>
                </div>
                <div className="text-right mt-3">
                  <p className="text-sm text-gray-500 italic">
                    {article.author || "Không có tác giả"}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

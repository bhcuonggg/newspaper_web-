import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import Link và useNavigate từ react-router-dom

const MainContent = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [categoryArticles, setCategoryArticles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook để điều hướng
  
  // List of categories to display
  const categories = ["Thời sự", "Thế giới", "Kinh doanh", "Giải trí"];
  
  // Sử dụng đúng API URL đã triển khai trên Render
  const API_BASE_URL = "https://apinews-c75x.onrender.com";
  
  // Get all articles for featured section
  const fetchFeaturedArticles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles?page=1`);
      if (response.data && response.data.articles) {
        setFeaturedArticles(response.data.articles);
      }
    } catch (err) {
      setError("Không thể tải tin nổi bật");
      console.error("Error fetching featured articles:", err);
    }
  };
  
  // Get articles by category
  const fetchCategoryArticles = async (categoryId, categoryName) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles/getByCategoryId/${categoryId}?page=1&limit=4`);
      if (response.data && response.data.articles) {
        setCategoryArticles(prev => ({
          ...prev,
          [categoryName]: response.data.articles
        }));
      }
    } catch (err) {
      console.error(`Error fetching articles for category ${categoryName}:`, err);
    }
  };
  
  // Fetch all required data
  useEffect(() => {
    setLoading(true);
    
    const fetchAllData = async () => {
      await fetchFeaturedArticles();
      
      // Assuming you have a mapping of category names to IDs
      // You'll need to replace these with your actual category IDs
      const categoryIds = {
        "Thời sự": 1,
        "Thế giới": 2,
        "Kinh doanh": 3,
        "Giải trí": 4
      };
      
      // Fetch articles for each category
      const categoryPromises = categories.map(category => 
        fetchCategoryArticles(categoryIds[category], category)
      );
      
      await Promise.all(categoryPromises);
      setLoading(false);
    };
    
    fetchAllData();
  }, []);

  // Hàm xử lý khi bấm vào bài viết
  const handleArticleClick = (articleId, event) => {
    event.preventDefault(); // Ngăn hành vi mặc định của thẻ a
    navigate(`/detail/${articleId}`); // Điều hướng đến trang detail với ID bài viết
  };
  
  // Handle loading state with graceful UI feedback
  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </main>
    );
  }
  
  // Handle error state
  if (error) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center py-12 bg-red-50 rounded-lg">
          <div className="text-red-600 text-xl mb-2">⚠️ Có lỗi xảy ra</div>
          <div className="text-gray-700">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Thử lại
          </button>
        </div>
      </main>
    );
  }

  // Get the first article for main featured news
  const mainFeaturedArticle = featuredArticles[0] || null;
  // Get the next 3 articles for side featured news
  const sideFeaturedArticles = featuredArticles.slice(1, 4) || [];
  
  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      {/* Featured news */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold border-b-2 border-red-600 pb-2 mb-4">TIN NỔI BẬT</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main featured news */}
          {mainFeaturedArticle ? (
            <div className="md:col-span-2">
              <Link 
                to={`/detail/${mainFeaturedArticle.id}`} 
                className="block"
              >
                <div className="relative rounded overflow-hidden h-[350px]">
                  <img 
                    src={mainFeaturedArticle.image || "/anhnen.png"}
                    alt={mainFeaturedArticle.title} 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold inline-block">NÓNG</span>
                    <h3 className="text-white text-xl font-bold mt-2 mb-1">{mainFeaturedArticle.title}</h3>
                  </div>
                </div>
              </Link>
            </div>
          ) : (
            <div className="md:col-span-2 bg-gray-100 h-[350px] flex items-center justify-center rounded">
              <p className="text-gray-500">Không có bài viết nổi bật</p>
            </div>
          )}
          
          {/* Side featured news */}
          <div className="flex flex-col gap-4">
            {sideFeaturedArticles.length > 0 ? (
              sideFeaturedArticles.map((article) => (
                <Link 
                  key={article.id} 
                  to={`/detail/${article.id}`} 
                  className="flex gap-3 hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <img 
                    src={article.image || "/anhnen.png"}
                    alt={article.title} 
                    className="w-32 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <span className="text-gray-500 text-sm">
                      {article.article_categories && article.article_categories.length > 0 
                        ? article.article_categories[0].name 
                        : "Tin tức"}
                    </span>
                    <h3 className="font-bold text-base my-1">{article.title}</h3>
                    <p className="text-gray-500 text-xs mt-1">
                      {article.createdAt ? new Date(article.createdAt).toLocaleString('vi-VN', { 
                        hour: '2-digit', 
                        minute: '2-digit', 
                        hour12: false 
                      }) : "Mới đăng"}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="bg-gray-100 p-4 rounded text-center text-gray-500">
                Không có bài viết phụ
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {categories.map((category) => (
          <div key={category} className="border border-gray-200 rounded-lg overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-lg">
            <h2 className="bg-gray-900 text-white p-3 m-0 text-lg font-bold">{category}</h2>
            <div className="p-3">
              {categoryArticles[category] && categoryArticles[category].length > 0 ? (
                <>
                  <div className="mb-3">
                    <Link to={`/detail/${categoryArticles[category][0].id}`} className="block">
                      <img 
                        src={categoryArticles[category][0].image || "/anhnen.png"}
                        alt={categoryArticles[category][0].title} 
                        className="w-full h-[180px] object-cover rounded mb-2"
                      />
                      <h3 className="font-bold my-2 text-base hover:text-red-600 transition-colors">
                        {categoryArticles[category][0].title}
                      </h3>
                    </Link>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-2">
                    {categoryArticles[category].slice(1, 4).map((article) => (
                      <Link 
                        key={article.id} 
                        to={`/detail/${article.id}`} 
                        className="block text-gray-800 py-1 transition-colors duration-200 hover:text-red-600"
                      >
                        • {article.title}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-center py-4 text-gray-500">Không có bài viết</p>
              )}
            </div>
          </div>
        ))}
      </section>
      
      {/* Videos section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold border-b-2 border-red-600 pb-2 mb-4">VIDEO NỔI BẬT</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {featuredArticles.length > 0 ? (
            featuredArticles.slice(0, 4).map((article) => (
              <Link 
                key={article.id} 
                to={`/detail/${article.id}`} 
                className="block transition duration-200 hover:-translate-y-1"
              >
                <div className="relative rounded-lg overflow-hidden mb-2">
                  <img 
                    src={article.image || "/anhnen.png"}
                    alt={article.title} 
                    className="w-full aspect-video object-cover block"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-600/80 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-red-600">
                    <div className="text-white text-xl">▶</div>
                  </div>
                </div>
                <h3 className="font-bold my-2 text-base hover:text-red-600 transition-colors">{article.title}</h3>
                <p className="text-gray-500 text-xs m-0">
                  {article.createdAt ? new Date(article.createdAt).toLocaleString('vi-VN', { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    day: '2-digit',
                    month: '2-digit',
                    hour12: false 
                  }) : "Mới đăng"} • {Math.floor(Math.random() * 10)}K lượt xem
                </p>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8 bg-gray-100 rounded">
              <p className="text-gray-500">Không có video nổi bật</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MainContent;
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const MainContent = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [categoryArticles, setCategoryArticles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [displayedArticleIds, setDisplayedArticleIds] = useState(new Set()); // Track displayed articles
  const navigate = useNavigate();
  const categoryCarouselRef = useRef(null);
  
  // API Base URL
  const API_BASE_URL = "https://apinews-c75x.onrender.com";
  
  // Fetch all categories from API
  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category`);
      if (response.data) {
        setAllCategories(response.data);
        return response.data;
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      return [];
    }
  };
  
  // Get all articles for featured section
  const fetchFeaturedArticles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles?page=1`);
      if (response.data && response.data.articles) {
        const articles = response.data.articles;
        setFeaturedArticles(articles);
        
        // Track featured article IDs
        const featuredIds = new Set(articles.map(article => article.id));
        setDisplayedArticleIds(featuredIds);
      }
    } catch (err) {
      setError("Không thể tải tin nổi bật");
      console.error("Error fetching featured articles:", err);
    }
  };
  
  // Get articles by category
  const fetchCategoryArticles = async (categoryId, categoryName) => {
    try {
      // Fetch more articles than needed to account for possible exclusions
      const response = await axios.get(`${API_BASE_URL}/articles/getByCategoryId/${categoryId}?page=1&limit=8`);
      if (response.data && response.data.articles) {
        // Filter out articles that have already been displayed in featured section
        const filteredArticles = response.data.articles.filter(article => 
          !displayedArticleIds.has(article.id)
        );
        
        // Take only the first 4 articles after filtering
        const articlesToDisplay = filteredArticles.slice(0, 4);
        
        setCategoryArticles(prev => ({
          ...prev,
          [categoryName]: articlesToDisplay
        }));
      }
    } catch (err) {
      console.error(`Error fetching articles for category ${categoryName}:`, err);
    }
  };
  
  // Carousel navigation functions
  const scrollLeft = () => {
    if (categoryCarouselRef.current) {
      categoryCarouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (categoryCarouselRef.current) {
      categoryCarouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  // Navigate to category page
  const goToCategoryPage = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };
  
  // Fetch all required data
  useEffect(() => {
    setLoading(true);
    
    const fetchAllData = async () => {
      // First fetch featured articles
      await fetchFeaturedArticles();
      
      // Fetch all categories
      const categories = await fetchAllCategories();
      
      // Then fetch articles for each category (after we know which articles are featured)
      if (categories && categories.length > 0) {
        const categoryPromises = categories.map(category => 
          fetchCategoryArticles(category.id, category.name)
        );
        
        await Promise.all(categoryPromises);
      }
      
      setLoading(false);
    };
    
    fetchAllData();
  }, []);

  // Handle article click
  const handleArticleClick = (articleId, event) => {
    event.preventDefault();
    navigate(`/detail/${articleId}`);
  };
  
  // Handle loading state
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
      
      {/* Categories Carousel */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold border-b-2 border-red-600 pb-2">DANH MỤC</h2>
          <div className="flex gap-2">
            <button 
              onClick={scrollLeft}
              className="bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              aria-label="Scroll left"
            >
              ◀
            </button>
            <button 
              onClick={scrollRight}
              className="bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              aria-label="Scroll right"
            >
              ▶
            </button>
          </div>
        </div>
        
        <div 
          ref={categoryCarouselRef}
          className="overflow-x-auto hide-scrollbar flex gap-6 pb-4 snap-x scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {allCategories.length > 0 ? (
            allCategories.map((category) => {
              const categoryData = categoryArticles[category.name] || [];
              
              // If there are no articles after filtering, show a message
              if (categoryData.length === 0) {
                return (
                  <div 
                    key={category.id} 
                    className="border border-gray-200 rounded-lg overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-lg flex-shrink-0 w-80 snap-start"
                  >
                    <h2 className="bg-gray-900 text-white p-3 m-0 text-lg font-bold">{category.name}</h2>
                    <div className="p-3">
                      <p className="text-center py-4 text-gray-500">Không có bài viết</p>
                    </div>
                  </div>
                );
              }
              
              const mainArticle = categoryData[0];
              // Filter out main article from the list of secondary articles
              const secondaryArticles = categoryData.slice(1).filter(article => article.id !== mainArticle.id);
              
              return (
                <div 
                  key={category.id} 
                  className="border border-gray-200 rounded-lg overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-lg flex-shrink-0 w-80 snap-start flex flex-col"
                >
                  <h2 className="bg-gray-900 text-white p-3 m-0 text-lg font-bold">{category.name}</h2>
                  <div className="p-3 flex-grow">
                    <div className="mb-3">
                      <Link to={`/detail/${mainArticle.id}`} className="block">
                        <img 
                          src={mainArticle.image || "/anhnen.png"}
                          alt={mainArticle.title} 
                          className="w-full h-[180px] object-cover rounded mb-2"
                        />
                        <h3 className="font-bold my-2 text-base hover:text-red-600 transition-colors">
                          {mainArticle.title}
                        </h3>
                      </Link>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-2">
                      {secondaryArticles.length > 0 ? (
                        secondaryArticles.map((article) => (
                          <Link 
                            key={article.id} 
                            to={`/detail/${article.id}`} 
                            className="block text-gray-800 py-1 transition-colors duration-200 hover:text-red-600"
                          >
                            • {article.title}
                          </Link>
                        ))
                      ) : (
                        <p className="text-center py-2 text-gray-500">Không có bài viết phụ</p>
                      )}
                    </div>
                  </div>
                  
                  {/* View More button */}
                  <div className="px-3 pb-3 mt-auto">
                    <button
                      onClick={() => goToCategoryPage(category.id)}
                      className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded text-center transition-colors"
                    >
                      Xem thêm
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-8 bg-gray-100 rounded w-full">
              <p className="text-gray-500">Không có danh mục</p>
            </div>
          )}
        </div>
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
      
      {/* Add CSS for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
};

export default MainContent;
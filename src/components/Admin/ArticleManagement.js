import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://apinews-c75x.onrender.com/articles';
const CATEGORIES_URL = 'https://apinews-c75x.onrender.com/category';

const ArticleManagement = () => {
  const [articles, setArticles] = useState([]);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [categories, setCategories] = useState([]);
  
  const [articleFormData, setArticleFormData] = useState({
    title: '',
    content: '',
    image: '',
    author: 'Admin', // Adding a default author value since it's required by the API
    category_ids: []
  });

  useEffect(() => {
    fetchArticles(pagination.currentPage);
    fetchCategories();
  }, [pagination.currentPage]);

  const fetchArticles = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}?page=${page}&limit=10`);
      setArticles(response.data.articles);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalItems: response.data.totalItems
      });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải dữ liệu');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const searchArticles = async () => {
    if (!searchKeyword.trim()) {
      fetchArticles(1);
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/search?keyword=${searchKeyword}&page=1&limit=10`);
      setArticles(response.data.articles);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalItems: response.data.totalItems
      });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Không tìm thấy kết quả phù hợp');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(CATEGORIES_URL);
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticleFormData({
      ...articleFormData,
      [name]: value
    });
  };

  const handleCategoryChange = (e) => {
    const value = parseInt(e.target.value);
    const checked = e.target.checked;
  
    setArticleFormData(prevState => {
      const updatedCategories = checked
        ? [...prevState.category_ids, value]
        : prevState.category_ids.filter(id => id !== value);
  
      return {
        ...prevState,
        category_ids: updatedCategories
      };
    });
  };

  const initializeArticleForm = (article = null) => {
    if (article) {
      const categoryIds = article.article_categories?.map(cat => cat.category_id) || [];
  
      setArticleFormData({
        title: article.title || '',
        content: article.content || '',
        image: article.image || '',
        author: article.author || 'Admin',
        category_ids: categoryIds
      });
      setEditingArticle(article);
    } else {
      setArticleFormData({
        title: '',
        content: '',
        image: '',
        author: 'Admin',
        category_ids: []
      });
      setEditingArticle(null);
    }
    setShowArticleForm(true);
  };

  const handleSaveArticle = async () => {
    try {
      const { title, content, image, author, category_ids } = articleFormData;
  
      if (!title || !content || !image) {
        alert('Vui lòng điền đầy đủ thông tin bài viết!');
        return;
      }
  
      if (category_ids.length === 0) {
        alert('Vui lòng chọn ít nhất một danh mục!');
        return;
      }
  
      const payload = {
        title,
        content,
        image,
        author,
        category_ids
      };
  
      if (editingArticle) {
        await axios.put(`${API_URL}/${editingArticle.id}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }
  
      fetchArticles(pagination.currentPage);
      setShowArticleForm(false);
      alert(editingArticle ? 'Cập nhật thành công!' : 'Thêm bài viết thành công!');
    } catch (err) {
      alert(`Lỗi: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDeleteArticle = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchArticles(pagination.currentPage);
        alert('Xóa thành công!');
      } catch (err) {
        alert(`Lỗi: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  const changePage = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination({...pagination, currentPage: newPage});
    }
  };

  const renderPaginationButtons = () => {
    const pageButtons = [];
    const maxButtonsToShow = 5;
    
    let startPage = Math.max(1, pagination.currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxButtonsToShow - 1);
    
    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => changePage(i)}
          className={`relative inline-flex items-center px-4 py-2 border ${
            i === pagination.currentPage
              ? 'bg-red-50 border-red-500 text-red-600 z-10'
              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }
    
    return pageButtons;
  };

  if (loading && articles.length === 0) {
    return <div className="text-center py-10">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Quản lý bài báo</h3>
          <button 
            onClick={() => initializeArticleForm()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Thêm bài báo mới
          </button>
        </div>
        
        {/* Search bar */}
        <div className="mb-6 flex">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Tìm kiếm bài báo theo tiêu đề..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
            onKeyPress={(e) => e.key === 'Enter' && searchArticles()}
          />
          <button
            onClick={searchArticles}
            className="px-4 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-700 transition-colors"
          >
            Tìm kiếm
          </button>
        </div>
        
        {showArticleForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-xl font-medium mb-6 text-center border-b border-gray-200 pb-3">
              {editingArticle ? 'Sửa bài báo' : 'Thêm bài báo mới'}
            </h4>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Tiêu đề <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="title"
                value={articleFormData.title}
                onChange={handleInputChange}
                placeholder="Nhập tiêu đề bài báo"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">URL Hình ảnh <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="image"
                value={articleFormData.image}
                onChange={handleInputChange}
                placeholder="Nhập URL hình ảnh"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              {articleFormData.image && (
                <div className="mt-2">
                  <img 
                    src={articleFormData.image} 
                    alt="Preview" 
                    className="h-24 object-cover rounded border border-gray-200" 
                    onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                  />
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Danh mục <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      name="category_ids"
                      value={category.id}
                      checked={articleFormData.category_ids.includes(category.id)}
                      onChange={handleCategoryChange}
                      className="mr-2 focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300"
                    />
                    <label htmlFor={`category-${category.id}`} className="text-gray-700">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
              {categories.length === 0 && (
                <p className="text-yellow-600 text-sm mt-2">
                  Không có danh mục nào. Vui lòng tạo danh mục trước khi thêm bài viết.
                </p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Tác giả <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="author"
                value={articleFormData.author}
                onChange={handleInputChange}
                placeholder="Nhập tên tác giả"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Nội dung <span className="text-red-500">*</span></label>
              <textarea
                name="content"
                value={articleFormData.content}
                onChange={handleInputChange}
                rows="8"
                placeholder="Nhập nội dung bài báo"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              ></textarea>
            </div>
            
            <div className="flex space-x-3 justify-center">
              <button 
                onClick={handleSaveArticle}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                {editingArticle ? 'Cập nhật' : 'Đăng bài'}
              </button>
              <button 
                onClick={() => setShowArticleForm(false)}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tác giả</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles.length > 0 ? (
                  articles.map(article => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{article.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <img 
                            src={article.image || 'https://via.placeholder.com/50'} 
                            alt={article.title}
                            className="w-10 h-10 object-cover rounded mr-3"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/50'}
                          />
                          <span className="font-medium">{article.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex flex-wrap gap-1">
                          {article.article_categories?.map(cat => (
                            <span key={cat.category_id} className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {cat.name}
                            </span>
                          )) || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {article.author || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(article.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => initializeArticleForm(article)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      {loading ? 'Đang tải dữ liệu...' : 'Không có bài viết nào'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => changePage(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  pagination.currentPage === 1 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                &laquo; Trước
              </button>
              
              {renderPaginationButtons()}
              
              <button
                onClick={() => changePage(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  pagination.currentPage === pagination.totalPages
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                Tiếp &raquo;
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleManagement;
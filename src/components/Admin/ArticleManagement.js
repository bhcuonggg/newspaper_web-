// src/component/Admin/ArticleManagement.js
import React, { useState } from 'react';

const ArticleManagement = () => {
  // Dữ liệu mẫu, trong thực tế sẽ được lấy từ API
  const [articles, setArticles] = useState([
    { 
      id: 1, 
      title: 'Bài viết đầu tiên', 
      slug: 'bai-viet-dau-tien', 
      category: 'Tin tức', 
      status: 'published',
      createdAt: '2023-10-15'
    },
    { 
      id: 2, 
      title: 'Trận đấu quan trọng sắp diễn ra', 
      slug: 'tran-dau-quan-trong-sap-dien-ra', 
      category: 'Thể thao', 
      status: 'published',
      createdAt: '2023-10-18'
    },
    { 
      id: 3, 
      title: 'Sự kiện văn hóa cuối tuần', 
      slug: 'su-kien-van-hoa-cuoi-tuan', 
      category: 'Giải trí', 
      status: 'draft',
      createdAt: '2023-10-20'
    },
  ]);
  
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [articleFormData, setArticleFormData] = useState({
    title: '',
    slug: '',
    content: '',
    category: 'Tin tức',
    status: 'draft'
  });

  // Giả lập các danh mục có sẵn
  const availableCategories = ['Tin tức', 'Thể thao', 'Giải trí'];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticleFormData({
      ...articleFormData,
      [name]: value
    });
  };

  const initializeArticleForm = (article = null) => {
    if (article) {
      setArticleFormData({
        title: article.title,
        slug: article.slug,
        content: article.content || '',
        category: article.category,
        status: article.status
      });
      setEditingArticle(article);
    } else {
      setArticleFormData({
        title: '',
        slug: '',
        content: '',
        category: 'Tin tức',
        status: 'draft'
      });
      setEditingArticle(null);
    }
    setShowArticleForm(true);
  };

  const handleSaveArticle = () => {
    // Trong thực tế sẽ gọi API để lưu bài viết
    if (articleFormData.title.trim() === '') return;
    
    const slug = articleFormData.slug.trim() === '' 
      ? articleFormData.title.toLowerCase().replace(/\s+/g, '-')
      : articleFormData.slug;
    
    const currentDate = new Date().toISOString().split('T')[0];
    
    if (editingArticle) {
      // Cập nhật bài viết
      setArticles(articles.map(article => 
        article.id === editingArticle.id 
          ? { 
              ...article, 
              title: articleFormData.title,
              slug,
              category: articleFormData.category,
              content: articleFormData.content,
              status: articleFormData.status
            } 
          : article
      ));
    } else {
      // Thêm bài viết mới
      const newId = articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1;
      setArticles([
        ...articles,
        {
          id: newId,
          title: articleFormData.title,
          slug,
          category: articleFormData.category,
          content: articleFormData.content,
          status: articleFormData.status,
          createdAt: currentDate
        }
      ]);
    }
    
    setShowArticleForm(false);
  };

  const handleDeleteArticle = (id) => {
    // Trong thực tế sẽ gọi API để xóa bài viết
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      setArticles(articles.filter(article => article.id !== id));
    }
  };

  const toggleArticleStatus = (id) => {
    // Trong thực tế sẽ gọi API để thay đổi trạng thái
    setArticles(articles.map(article => 
      article.id === id 
        ? { 
            ...article, 
            status: article.status === 'published' ? 'draft' : 'published' 
          } 
        : article
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Quản lý bài báo</h3>
        <button 
          onClick={() => initializeArticleForm()}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Thêm bài báo mới
        </button>
      </div>
      
      {showArticleForm && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="text-md font-medium mb-4">
            {editingArticle ? 'Sửa bài báo' : 'Thêm bài báo mới'}
          </h4>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Tiêu đề</label>
            <input
              type="text"
              name="title"
              value={articleFormData.title}
              onChange={handleInputChange}
              placeholder="Nhập tiêu đề bài báo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Slug (tùy chọn)</label>
            <input
              type="text"
              name="slug"
              value={articleFormData.slug}
              onChange={handleInputChange}
              placeholder="Nhập slug hoặc để trống để tự động tạo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Danh mục</label>
            <select
              name="category"
              value={articleFormData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {availableCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Nội dung</label>
            <textarea
              name="content"
              value={articleFormData.content}
              onChange={handleInputChange}
              rows="6"
              placeholder="Nhập nội dung bài báo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Trạng thái</label>
            <select
              name="status"
              value={articleFormData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Bản nháp</option>
              <option value="published">Đã xuất bản</option>
            </select>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleSaveArticle}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Lưu
            </button>
            <button 
              onClick={() => setShowArticleForm(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map(article => (
              <tr key={article.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{article.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{article.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{article.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{article.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    onClick={() => toggleArticleStatus(article.id)}
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${
                      article.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {article.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                  </span>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArticleManagement;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'https://apinews-c75x.onrender.com/category';

  // Fetch categories when component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE_URL);
      setCategories(response.data);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh mục. Vui lòng thử lại sau.');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingCategory) {
      setEditingCategory({ ...editingCategory, [name]: value });
    } else {
      setNewCategory({ ...newCategory, [name]: value });
    }
  };

  const handleAddCategory = async () => {
    // Validate
    if (newCategory.name.trim() === '') return;
    
    try {
      setLoading(true);
      // Call API to create new category
      const response = await axios.post(API_BASE_URL, {
        name: newCategory.name
      });
      
      // Add new category to state with data returned from API
      const createdCategory = response.data;
      setCategories([...categories, createdCategory]);
      
      // Reset form
      setNewCategory({ name: '' });
      setIsAdding(false);
      setError(null);
    } catch (err) {
      setError('Không thể thêm danh mục. Vui lòng thử lại.');
      console.error('Error adding category:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory({ ...category });
  };

  const handleUpdateCategory = async () => {
    // Validate
    if (!editingCategory || editingCategory.name.trim() === '') return;
    
    try {
      setLoading(true);
      // Call API to update category
      const response = await axios.put(`${API_BASE_URL}/${editingCategory.id}`, {
        name: editingCategory.name
      });
      
      // Update state
      setCategories(categories.map(c => 
        c.id === editingCategory.id ? response.data : c
      ));
      
      setEditingCategory(null);
      setError(null);
    } catch (err) {
      setError('Không thể cập nhật danh mục. Vui lòng thử lại.');
      console.error('Error updating category:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      return;
    }
    
    try {
      setLoading(true);
      // Call API to delete category
      await axios.delete(`${API_BASE_URL}/${id}`);
      
      // Update state
      setCategories(categories.filter(c => c.id !== id));
      setError(null);
    } catch (err) {
      setError('Không thể xóa danh mục. Vui lòng thử lại.');
      console.error('Error deleting category:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Quản lý danh mục</h3>
        <button 
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          disabled={loading}
        >
          Thêm danh mục mới
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {isAdding && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="text-md font-medium mb-4">Thêm danh mục mới</h4>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Tên danh mục</label>
            <input
              type="text"
              name="name"
              value={newCategory.name}
              onChange={handleInputChange}
              placeholder="Nhập tên danh mục"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handleAddCategory}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Lưu'}
            </button>
            <button 
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              disabled={loading}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
      
      {editingCategory && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="text-md font-medium mb-4">Sửa danh mục</h4>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Tên danh mục</label>
            <input
              type="text"
              name="name"
              value={editingCategory.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handleUpdateCategory}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Cập nhật'}
            </button>
            <button 
              onClick={() => setEditingCategory(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              disabled={loading}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
      
      {loading && !isAdding && !editingCategory && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-500">Đang tải dữ liệu...</p>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên danh mục</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.length > 0 ? (
              categories.map(category => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      disabled={loading}
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-900"
                      disabled={loading}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                  {loading ? 'Đang tải dữ liệu...' : 'Không có danh mục nào'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryManagement;
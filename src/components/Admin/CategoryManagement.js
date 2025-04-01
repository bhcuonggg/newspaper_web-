// src/component/Admin/CategoryManagement.js
import React, { useState } from 'react';

const CategoryManagement = () => {
  // Dữ liệu mẫu, trong thực tế sẽ được lấy từ API
  const [categories, setCategories] = useState([
    { id: 1, name: 'Tin tức', slug: 'tin-tuc', status: 'active' },
    { id: 2, name: 'Thể thao', slug: 'the-thao', status: 'active' },
    { id: 3, name: 'Giải trí', slug: 'giai-tri', status: 'active' },
  ]);
  
  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingCategory) {
      setEditingCategory({ ...editingCategory, [name]: value });
    } else {
      setNewCategory({ ...newCategory, [name]: value });
    }
  };

  const handleAddCategory = () => {
    // Trong thực tế sẽ gọi API để tạo danh mục
    if (newCategory.name.trim() === '') return;
    
    const slug = newCategory.slug.trim() === '' 
      ? newCategory.name.toLowerCase().replace(/\s+/g, '-')
      : newCategory.slug;
    
    const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    
    setCategories([
      ...categories,
      { id: newId, name: newCategory.name, slug, status: 'active' }
    ]);
    
    setNewCategory({ name: '', slug: '' });
    setIsAdding(false);
  };

  const handleEditCategory = (category) => {
    setEditingCategory({ ...category });
  };

  const handleUpdateCategory = () => {
    // Trong thực tế sẽ gọi API để cập nhật danh mục
    if (!editingCategory || editingCategory.name.trim() === '') return;
    
    setCategories(categories.map(c => 
      c.id === editingCategory.id ? editingCategory : c
    ));
    
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id) => {
    // Trong thực tế sẽ gọi API để xóa danh mục
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const toggleCategoryStatus = (id) => {
    // Trong thực tế sẽ gọi API để thay đổi trạng thái
    setCategories(categories.map(c => 
      c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Quản lý danh mục</h3>
        <button 
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Thêm danh mục mới
        </button>
      </div>
      
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
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Slug (tùy chọn)</label>
            <input
              type="text"
              name="slug"
              value={newCategory.slug}
              onChange={handleInputChange}
              placeholder="Nhập slug hoặc để trống để tự động tạo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handleAddCategory}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Lưu
            </button>
            <button 
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
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
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Slug</label>
            <input
              type="text"
              name="slug"
              value={editingCategory.slug}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handleUpdateCategory}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Cập nhật
            </button>
            <button 
              onClick={() => setEditingCategory(null)}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên danh mục</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map(category => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.slug}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    onClick={() => toggleCategoryStatus(category.id)}
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${
                      category.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {category.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
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

export default CategoryManagement;
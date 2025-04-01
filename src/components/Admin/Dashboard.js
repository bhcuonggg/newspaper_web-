// src/component/Admin/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import CategoryManagement from './CategoryManagement';
import ArticleManagement from './ArticleManagement';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('categories');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1">
        <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
          <h2 className="text-xl font-semibold text-gray-800">Bảng điều khiển quản trị</h2>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Đăng xuất
          </button>
        </div>
        
        <div className="p-6">
          <div className="bg-white rounded-lg shadow p-6">
            {activeTab === 'categories' && <CategoryManagement />}
            {activeTab === 'articles' && <ArticleManagement />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
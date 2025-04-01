// src/component/Admin/Sidebar.js
import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-5 border-b border-gray-700">
        <h3 className="text-lg font-medium">Quản trị viên</h3>
      </div>
      
      <nav className="mt-5">
        <ul>
          <li>
            <button
              className={`flex items-center w-full py-3 px-5 text-left hover:bg-gray-700 transition-colors ${
                activeTab === 'categories' ? 'bg-blue-600' : ''
              }`}
              onClick={() => setActiveTab('categories')}
            >
              <span className="mr-2">📁</span>
              <span>Quản lý danh mục</span>
            </button>
          </li>
          
          <li>
            <button
              className={`flex items-center w-full py-3 px-5 text-left hover:bg-gray-700 transition-colors ${
                activeTab === 'articles' ? 'bg-blue-600' : ''
              }`}
              onClick={() => setActiveTab('articles')}
            >
              <span className="mr-2">📝</span>
              <span>Quản lý bài báo</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const menuItems = [
    { name: "TRANG CHỦ", subItems: [] },
    { 
      name: "THẾ GIỚI", 
      subItems: ["Châu Á", "Châu Âu", "Châu Mỹ", "Châu Phi", "Quốc tế"] 
    },
    { 
      name: "KINH DOANH", 
      subItems: ["Tài chính", "Bất động sản", "Chứng khoán", "Doanh nghiệp"] 
    },
    { 
      name: "THỂ THAO", 
      subItems: ["Bóng đá", "Tennis", "Các môn khác"] 
    },
    { 
      name: "GIẢI TRÍ", 
      subItems: ["Sao Việt", "Điện ảnh", "Âm nhạc", "Thời trang"] 
    },
  ];

  return (
    <header className="shadow-md">
      {/* Breaking news bar */}
      <div className="bg-red-600 text-white px-4 py-2 flex items-center">
        <span className="font-bold mr-3">NÓNG:</span>
        <div className="overflow-hidden relative flex-1">
          <div className="whitespace-nowrap animate-marquee">
            Tin mới nhất: Giá vàng tiếp tục tăng mạnh • COVID-19: Cập nhật tình hình dịch bệnh • Thời tiết: Dự báo mưa lớn ở miền Trung
          </div>
        </div>
      </div>

      {/* Top bar */}
      <div className="bg-gray-100 py-1 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex gap-4">
            <span>Thứ Hai, 31/03/2025</span>
            <a href="#" className="text-gray-800 hover:text-red-600">Mới nhất</a>
            <a href="#" className="text-gray-800 hover:text-red-600">Tin nóng</a>
          </div>
          <div className="flex gap-4 items-center">
            <a href="#" className="text-gray-800 hover:text-red-600 flex items-center">
              <span className="inline-block w-4 h-4 mr-1 bg-contain bg-bell"></span>
              Thông báo
            </a>
            <a href="#" className="text-gray-800 hover:text-red-600 flex items-center">
              <span className="inline-block w-4 h-4 mr-1 bg-contain bg-bookmark"></span>
              Đã lưu
            </a>
          </div>
        </div>
      </div>

      {/* Hero banner */}
      <div className="w-full relative">
        <img
          src="https://media.vneconomy.vn/w800/images/upload/2021/06/19/anh-chup-man-hinh-2021-06-19-luc-06-02-48.png"
          alt="Banner Tin Tức"
          className="w-full h-64 object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-white text-2xl font-bold m-0">Cập nhật tin tức mới nhất, nhanh nhất, chính xác nhất</h2>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="image.png"
              alt="Logo"
              className="h-14"
            />
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center">
            {menuItems.map((item, index) => (
              <div key={index} className="relative">
                <button
                  className="text-gray-800 mx-3 font-bold px-3 py-2 flex items-center hover:text-red-600 bg-transparent border-none cursor-pointer text-sm"
                  onClick={() => handleDropdown(index)}
                >
                  {item.name}
                  {item.subItems.length > 0 && (
                    <span className="text-xs ml-1">▼</span>
                  )}
                </button>
                
                {item.subItems.length > 0 && activeDropdown === index && (
                  <div className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-md py-1 z-10">
                    {item.subItems.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-red-600"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Search and login */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center mr-2 border border-gray-200 rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="px-3 py-1 w-48 border-none focus:outline-none"
              />
              <button className="p-2 bg-gray-50 border-none cursor-pointer">🔍</button>
            </div>
            
            <button className="px-4 py-2 bg-green-600 text-white border-none rounded-md cursor-pointer font-bold flex items-center hover:bg-green-700">
              <span className="inline-block w-4 h-4 mr-1 bg-contain bg-user"></span>
              Đăng nhập
            </button>
            
            <button 
              className="md:hidden ml-2 p-1 bg-transparent border-none text-2xl cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden p-4 border-t border-gray-200">
            {menuItems.map((item, index) => (
              <div key={index}>
                <button
                  className="w-full text-left py-3 px-3 mb-1 bg-gray-50 border-none rounded-md flex justify-between items-center font-medium cursor-pointer"
                  onClick={() => handleDropdown(index)}
                >
                  {item.name}
                  {item.subItems.length > 0 && (
                    <span className={`text-xs ${activeDropdown === index ? 'rotate-180' : ''}`}>▼</span>
                  )}
                </button>
                
                {item.subItems.length > 0 && activeDropdown === index && (
                  <div className="pl-6 mb-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href="#"
                        className="block py-2 text-gray-600"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="flex items-center border border-gray-200 rounded-md overflow-hidden mt-4">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="px-3 py-2 w-full border-none focus:outline-none"
              />
              <button className="p-2 bg-gray-50 border-none cursor-pointer">🔍</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
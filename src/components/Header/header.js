import React, { useState } from "react";
import "./header.css";

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
    <header className="header">
      {/* Breaking news bar */}
      <div className="breaking-news">
        <span className="breaking-news-label">NÓNG:</span>
        <div className="marquee-container">
          <div className="marquee">
            Tin mới nhất: Giá vàng tiếp tục tăng mạnh • COVID-19: Cập nhật tình hình dịch bệnh • Thời tiết: Dự báo mưa lớn ở miền Trung
          </div>
        </div>
      </div>

      {/* Top bar */}
      <div className="top-bar">
        <div className="top-bar-container">
          <div className="top-bar-left">
            <span>Thứ Hai, 31/03/2025</span>
            <a href="#" className="top-bar-link">Mới nhất</a>
            <a href="#" className="top-bar-link">Tin nóng</a>
          </div>
          <div className="top-bar-right">
            <a href="#" className="top-bar-link">
              <span className="icon-bell"></span>
              Thông báo
            </a>
            <a href="#" className="top-bar-link">
              <span className="icon-bookmark"></span>
              Đã lưu
            </a>
          </div>
        </div>
      </div>

      {/* Hero banner */}
      <div className="hero">
        <img
          src="https://luathungson.vn/wp-content/uploads/2023/01/bao-chi-la-gi.jpg"
          alt="Banner Tin Tức"
          className="hero-image"
        />
        <div className="hero-overlay">
          <div className="hero-content">
            <h2 className="hero-title">Cập nhật tin tức mới nhất, nhanh nhất, chính xác nhất</h2>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="nav">
        <div className="container">
          {/* Logo */}
          <div className="logo">
            <img
              src="image.png"
              alt="Logo"
              className="logo-image"
            />
          </div>

          {/* Desktop menu */}
          <div className="menu">
            {menuItems.map((item, index) => (
              <div key={index} className="menu-item">
                <button
                  className="nav-link"
                  onClick={() => handleDropdown(index)}
                >
                  {item.name}
                  {item.subItems.length > 0 && (
                    <span className="dropdown-icon">▼</span>
                  )}
                </button>
                
                {item.subItems.length > 0 && activeDropdown === index && (
                  <div className="dropdown">
                    {item.subItems.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href="#"
                        className="dropdown-item"
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
          <div className="actions">
            <div className="search-box">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="input"
              />
              <button className="search-button">🔍</button>
            </div>
            
            <button className="login-button">
              <span className="icon-user"></span>
              Đăng nhập
            </button>
            
            <button 
              className="mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            {menuItems.map((item, index) => (
              <div key={index}>
                <button
                  className="mobile-menu-item"
                  onClick={() => handleDropdown(index)}
                >
                  {item.name}
                  {item.subItems.length > 0 && (
                    <span className={`dropdown-icon ${activeDropdown === index ? 'rotate' : ''}`}>▼</span>
                  )}
                </button>
                
                {item.subItems.length > 0 && activeDropdown === index && (
                  <div className="mobile-submenu">
                    {item.subItems.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href="#"
                        className="mobile-submenu-item"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="mobile-search-box">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="mobile-input"
              />
              <button className="search-button">🔍</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
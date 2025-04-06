import React, { useState, useEffect } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { googleLogin } from '../Service/AuthService';
import axios from 'axios'; // Thêm axios để gọi API

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]); // State để lưu danh mục từ API

  const handleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  
  // Lưu session user 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
    }
    
    // Gọi API để lấy danh mục
    fetchCategories();
  }, []);

  // Hàm gọi API lấy danh mục
  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://apinews-c75x.onrender.com/category'); // Thay API_URL bằng URL thực tế của API
      // Chuyển đổi dữ liệu API thành định dạng menuItems
      const formattedCategories = formatCategories(response.data);
      setCategories(formattedCategories);
    } catch (error) {
      console.error('Lỗi khi lấy danh mục:', error);
    }
  };

  const formatCategories = (categoriesData) => {
    // Danh mục mặc định - Trang chủ
    const formattedMenu = [
      { name: "TRANG CHỦ", subItems: [], link: "/" }
    ];
    
    // Thêm các danh mục từ API - Đơn giản hóa vì không có thông tin về danh mục con
    categoriesData.forEach(category => {
      formattedMenu.push({
        id: category.id,
        name: category.name.toUpperCase(),
        subItems: [], // Mảng rỗng vì API không trả về danh mục con
        link: `/category/${category.id}` // Tạo link dựa vào ID
      });
    });
    
    return formattedMenu;
  };

  //handle Login
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const data = await googleLogin(credentialResponse.credential);
      console.log('Login success:', data);
      // Lưu token vào localStorage hoặc cookie
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      
      alert(`Đăng nhập thành công! Chào mừng ${data.user.name}`);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Đăng nhập thất bại: ' + (error.response?.data?.error || error.message));
    }
  };
  
  // handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    alert('Đã đăng xuất!');
  };

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
              src="/image.png"
              alt="Logo"
              className="h-14"
            />
          </div>

          {/* Desktop menu - Sử dụng danh mục từ API */}
          <div className="hidden md:flex items-center">
            {categories.map((item, index) => (
              <div key={index} className="relative">
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-gray-800 mx-3 font-bold px-3 py-2 flex items-center hover:text-red-600 text-sm"
                  >
                    {item.name}
                  </a>
                ) : (
                  <button
                    className="text-gray-800 mx-3 font-bold px-3 py-2 flex items-center hover:text-red-600 bg-transparent border-none cursor-pointer text-sm"
                    onClick={() => handleDropdown(index)}
                  >
                    {item.name}
                    {item.subItems && item.subItems.length > 0 && <span className="text-xs ml-1">▼</span>}
                  </button>
                )}

                {item.subItems && item.subItems.length > 0 && activeDropdown === index && (
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
                className="px-3 py-1 w-64 order-none focus:outline-none"
              />
              <button className="p-2 bg-gray-50 border-none cursor-pointer">🔍</button>
            </div>
            
            {user ? (
              <div className="flex items-center">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <button
                  onClick={handleLogout}
                  className="px-4 w-36 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => {
                  console.log('Login Failed');
                  alert('Đăng nhập bằng Google thất bại');
                }}
                useOneTap // Tuỳ chọn hiển thị one-tap sign-in
                render={({ onClick }) => (
                  <button
                    onClick={onClick}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032 1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.667-4.166-2.685-6.735-2.685-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.167-0.009-0.334-0.015-0.5h-9.985z"/>
                    </svg>
                    Đăng nhập bằng Google
                  </button>
                )}
              />
            )}
            
            <button 
              className="md:hidden ml-2 p-1 bg-transparent border-none text-2xl cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu - Cũng sử dụng danh mục từ API */}
        {isMenuOpen && (
          <div className="md:hidden p-4 border-t border-gray-200">
            {categories.map((item, index) => (
              <div key={index}>
                <button
                  className="w-full text-left py-3 px-3 mb-1 bg-gray-50 border-none rounded-md flex justify-between items-center font-medium cursor-pointer"
                  onClick={() => handleDropdown(index)}
                >
                  {item.name}
                  {item.subItems && item.subItems.length > 0 && (
                    <span className={`text-xs ${activeDropdown === index ? 'rotate-180' : ''}`}>▼</span>
                  )}
                </button>
                
                {item.subItems && item.subItems.length > 0 && activeDropdown === index && (
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
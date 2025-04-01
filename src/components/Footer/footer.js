import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Cột 1 - Logo và thông tin */}
          <div className="flex flex-col">
            <img
              src="/image.png"
              alt="Logo"
              className="w-32 mb-4"
            />
            <p className="text-sm text-gray-300 mb-5 leading-relaxed">
              Cung cấp tin tức nhanh nhất, chính xác nhất về thời sự, kinh tế, thể thao, giải trí...
            </p>
            <div className="flex space-x-3 mt-auto">
              <a href="#" className="bg-blue-800 w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-8 h-8" />
              </a>
              <a href="#" className="bg-blue-500 w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                <img src="/twister.png" alt="Twitter" className="w-8 h-8 object-cover" />
              </a>
              <a href="#" className="bg-red-600 w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                <img src="youtube.png" alt="Youtube" className="w-8 h-8" />
              </a>
            </div>
          </div>
          
          {/* Cột 2 - Danh mục */}
          <div>
            <h4 className="text-base font-bold mb-5 pb-2 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-red-600">
              DANH MỤC
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-300 hover:text-red-600 transition-colors">Thời sự</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-red-600 transition-colors">Thế giới</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-red-600 transition-colors">Kinh doanh</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-red-600 transition-colors">Bất động sản</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-red-600 transition-colors">Thể thao</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-red-600 transition-colors">Giải trí</a></li>
            </ul>
          </div>
          
          {/* Cột 3 - Thông tin */}
          <div>
            <h4 className="text-base font-bold mb-5 pb-2 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-red-600">
              THÔNG TIN
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-300 hover:text-red-600 transition-colors">Giới thiệu</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-red-600 transition-colors">Điều khoản sử dụng</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-red-600 transition-colors">Quảng cáo</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-red-600 transition-colors">Liên hệ</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-red-600 transition-colors">Tuyển dụng</a></li>
            </ul>
          </div>
          
          {/* Cột 4 - Liên hệ */}
          <div>
            <h4 className="text-base font-bold mb-5 pb-2 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-red-600">
              LIÊN HỆ
            </h4>
            <p className="text-sm text-gray-300 mb-3">
              <span className="font-bold">Địa chỉ:</span> Số nhà 61, Đường 783 Tạ Quang Bửu, Phường 4, Quận 8, TP.HCM
            </p>
            <p className="text-sm text-gray-300 mb-3">
              <span className="font-bold">Điện thoại:</span> 036 3437 706
            </p>
            <p className="text-sm text-gray-300 mb-3">
              <span className="font-bold">Email:</span> bhcuonggg@gmail.com
            </p>
            
            <div className="mt-5">
              <h5 className="text-sm text-white mb-4">TẢI ỨNG DỤNG</h5>
              <div className="flex space-x-2">
                <a href="#" className="block w-28 py-2 px-3 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" alt="App Store" className="w-full h-8 object-contain invert" />
                </a>
                <a href="#" className="block w-28 py-2 px-3 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors">
                  <img src="https://www.svgrepo.com/show/223032/playstore.svg" alt="Google Play" className="w-full h-8 object-contain invert" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer phía dưới */}
        <div className="pt-5 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-500 my-2">© 2025 Dân Trí. Tất cả các quyền được bảo lưu.</p>
          <p className="text-xs text-gray-500 my-2">
            Ghi rõ nguồn "Dân Trí" khi phát hành lại thông tin từ website này.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
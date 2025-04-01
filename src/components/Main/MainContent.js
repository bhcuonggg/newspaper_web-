import React from "react";

const MainContent = () => {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      {/* Featured news */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold border-b-2 border-red-600 pb-2 mb-4">TIN NỔI BẬT</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main featured news */}
          <div className="md:col-span-2">
            <div className="relative rounded overflow-hidden h-[350px]">
              <img 
                src="/anhnen.png"
                alt="Tin tức nổi bật" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold inline-block">NÓNG</span>
                <h3 className="text-white text-xl font-bold mt-2 mb-1">Chính sách mới về thuế có hiệu lực từ tháng 4/2025</h3>
                <p className="text-gray-200 text-sm mt-1">Những thay đổi quan trọng mà người dân cần biết về chính sách thuế mới</p>
              </div>
            </div>
          </div>
          
          {/* Side featured news */}
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-3">
                <img 
                  src={`/anhnen.png`}
                  alt={`Tin ${item}`} 
                  className="w-32 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <span className="text-gray-500 text-sm">Thời sự</span>
                  <h3 className="font-bold text-base my-1">Cập nhật diễn biến mới nhất về tình hình kinh tế Việt Nam</h3>
                  <p className="text-gray-500 text-xs mt-1">3 giờ trước</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {["Thời sự", "Thế giới", "Kinh doanh", "Giải trí"].map((category) => (
          <div key={category} className="border border-gray-200 rounded-lg overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-lg">
            <h2 className="bg-gray-900 text-white p-3 m-0 text-lg font-bold">{category}</h2>
            <div className="p-3">
              <div className="mb-3">
                <img 
                  src={`/anhnen.png`}
                  alt={category} 
                  className="w-full h-[180px] object-cover rounded mb-2"
                />
                <h3 className="font-bold my-2 text-base">Tin chính trong lĩnh vực {category.toLowerCase()}</h3>
                <p className="text-gray-500 text-sm my-1">Mô tả ngắn về tin tức quan trọng nhất trong ngày</p>
              </div>
              
              <div className="border-t border-gray-200 pt-2">
                {[1, 2, 3].map((item) => (
                  <a key={item} href="#" className="block text-gray-800 py-1 transition-colors duration-200 hover:text-red-600">
                    • Tin {item} thuộc danh mục {category.toLowerCase()}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
      
      {/* Videos section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold border-b-2 border-red-600 pb-2 mb-4">VIDEO NỔI BẬT</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="transition duration-200 hover:-translate-y-1">
              <div className="relative rounded-lg overflow-hidden mb-2">
                <img 
                  src={`/anhnen.png`}
                  alt={`Video ${item}`} 
                  className="w-full aspect-video object-cover block"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-600/80 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-red-600">
                  <div className="text-white text-xl">▶</div>
                </div>
              </div>
              <h3 className="font-bold my-2 text-base">Video {item}: Sự kiện quan trọng</h3>
              <p className="text-gray-500 text-xs m-0">2 giờ trước • 1.2K lượt xem</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MainContent;
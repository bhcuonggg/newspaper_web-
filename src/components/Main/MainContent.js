import React from "react";
import "./MainContent.css";

const MainContent = () => {
  return (
    <main className="main">
      {/* Featured news */}
      <section className="section">
        <h2 className="section-title">TIN NỔI BẬT</h2>
        
        <div className="featured-grid">
          {/* Main featured news */}
          <div className="main-featured">
            <div className="featured-image-container">
              <img 
                src="/anhnen.png"
                alt="Tin tức nổi bật" 
                className="featured-image"
              />
              <div className="featured-overlay">
                <span className="featured-tag">NÓNG</span>
                <h3 className="featured-title">Chính sách mới về thuế có hiệu lực từ tháng 4/2025</h3>
                <p className="featured-desc">Những thay đổi quan trọng mà người dân cần biết về chính sách thuế mới</p>
              </div>
            </div>
          </div>
          
          {/* Side featured news */}
          <div className="side-featured">
            {[1, 2, 3].map((item) => (
              <div key={item} className="side-news-item">
                <img 
                //   src={`/anhnen.png${item}`}
                  src={`/anhnen.png`}
                  alt={`Tin ${item}`} 
                  className="side-news-image"
                />
                <div className="side-news-content">
                  <span className="category-label">Thời sự</span>
                  <h3 className="side-news-title">Cập nhật diễn biến mới nhất về tình hình kinh tế Việt Nam</h3>
                  <p className="timestamp">3 giờ trước</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="category-section">
        {["Thời sự", "Thế giới", "Kinh doanh", "Giải trí"].map((category) => (
          <div key={category} className="category-card">
            <h2 className="category-header">{category}</h2>
            <div className="category-content">
              <div className="category-main">
                <img 
                //   src={`https://via.placeholder.com/400x220?text=${category}`}
                  src={`/anhnen.png`}
                  alt={category} 
                  className="category-image"
                />
                <h3 className="category-title">Tin chính trong lĩnh vực {category.toLowerCase()}</h3>
                <p className="category-desc">Mô tả ngắn về tin tức quan trọng nhất trong ngày</p>
              </div>
              
              <div className="category-list">
                {[1, 2, 3].map((item) => (
                  <a key={item} href="#" className="category-link">
                    • Tin {item} thuộc danh mục {category.toLowerCase()}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
      
      {/* Videos section */}
      <section className="section">
        <h2 className="section-title">VIDEO NỔI BẬT</h2>
        
        <div className="video-grid">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="video-item">
              <div className="video-image-container">
                <img 
                //   src={`https://via.placeholder.com/300x200?text=Video${item}`}
                  src={`/anhnen.png`}

                  alt={`Video ${item}`} 
                  className="video-image"
                />
                <div className="play-button">
                  <div className="play-icon">▶</div>
                </div>
              </div>
              <h3 className="video-title">Video {item}: Sự kiện quan trọng</h3>
              <p className="video-meta">2 giờ trước • 1.2K lượt xem</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MainContent;
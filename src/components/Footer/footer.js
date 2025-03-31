import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <img
              src="/image.png"
              alt="Logo"
              className="footer-logo"
            />
            <p className="footer-text">Cung cấp tin tức nhanh nhất, chính xác nhất về thời sự, kinh tế, thể thao, giải trí...</p>
            <div className="social-links">
                <a href="#" className="social-button facebook">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
                </a>
                <a href="#" className="social-button twitter">
                    <img className="img-logo" src="/twister.png" />
                </a>
                <a href="#" className="social-button youtube">
                    <img src="youtube.png" />
                </a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">DANH MỤC</h4>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">Thời sự</a></li>
              <li><a href="#" className="footer-link">Thế giới</a></li>
              <li><a href="#" className="footer-link">Kinh doanh</a></li>
              <li><a href="#" className="footer-link">Bất động sản</a></li>
              <li><a href="#" className="footer-link">Thể thao</a></li>
              <li><a href="#" className="footer-link">Giải trí</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">THÔNG TIN</h4>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">Giới thiệu</a></li>
              <li><a href="#" className="footer-link">Điều khoản sử dụng</a></li>
              <li><a href="#" className="footer-link">Quảng cáo</a></li>
              <li><a href="#" className="footer-link">Liên hệ</a></li>
              <li><a href="#" className="footer-link">Tuyển dụng</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">LIÊN HỆ</h4>
            <p className="contact-info">
              <strong>Địa chỉ:</strong> Số nhà 61, Đường 783 Tạ Quang Bửu, Phường 4, Quận 8, TP.HCM
            </p>
            <p className="contact-info">
              <strong>Điện thoại:</strong> 036 3437 706
            </p>
            <p className="contact-info">
              <strong>Email:</strong> bhcuonggg@gmail.com
            </p>
            <div className="app-links">
              <h5 className="app-heading">TẢI ỨNG DỤNG</h5>
              <div className="app-buttons">
                <a href="#" className="app-button">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" alt="App Store" />
                </a>
                <a href="#" className="app-button">
                  <img src="https://www.svgrepo.com/show/223032/playstore.svg" alt="Google Play" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© 2025 Dân Trí. Tất cả các quyền được bảo lưu.</p>
          <p className="legal">
            Ghi rõ nguồn "Dân Trí" khi phát hành lại thông tin từ website này.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
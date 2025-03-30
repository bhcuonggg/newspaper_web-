import React from "react";

const Header = () => {
  return (
    <header>
      {/* Hình ảnh lớn phía trên */}
      <div style={styles.hero}>
        <img
          src="https://luathungson.vn/wp-content/uploads/2023/01/bao-chi-la-gi.jpg" // Ảnh demo, có thể thay bằng ảnh của bạn
          alt="Header"
          style={styles.heroImage}
        />
      </div>

      {/* Menu */}
      <nav style={styles.nav}>
        <div style={styles.container}>
          <a href="#" style={styles.navLink}>TRANG CHỦ</a>
          <a href="#" style={styles.navLink}>THẾ GIỚI</a>
          <a href="#" style={styles.navLink}>KINH DOANH</a>
          <a href="#" style={styles.navLink}>THỂ THAO</a>
          <a href="#" style={styles.navLink}>GIẢI TRÍ</a>

          {/* Ô tìm kiếm */}
          <div style={styles.searchBox}>
            <input type="text" placeholder="Tìm kiếm..." style={styles.input} />
            <button style={styles.searchButton}>🔍</button>
          </div>
        </div>
      </nav>
      {/* Button đăng nhập */}

    </header>
  );
};

const styles = {
  hero: {
    width: "100%",
  },
  heroImage: {
    width: "100%",
    height: "200px",
    display: "block",
    objectFit: "cover",
    ObjectPosition: "center",
  },
  nav: {
    backgroundColor: "#C0C0C0",
    padding: "10px 0",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navLink: {
    color: "black",
    textDecoration: "none",
    
    margin: "0 15px",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    padding: "5px",
    border: "none",
    borderRadius: "5px 0 0 5px",
  },
  searchButton: {
    padding: "5px 10px",
    border: "none",
    backgroundColor: "white",
    borderRadius: "0 5px 5px 0",
    cursor: "pointer",
  },
};

export default Header;

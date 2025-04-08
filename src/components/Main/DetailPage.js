import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header/header";
import Footer from "../Footer/footer";

const DetailPage = () => {
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();  // Lấy ID bài viết từ tham số URL
  const [commentContent, setCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState("");
  const [users, setUsers] = useState({}); // State lưu trữ thông tin người dùng
  const [isDeleting, setIsDeleting] = useState(false); // State để kiểm soát trạng thái xóa
  const [loggedInUser, setLoggedInUser] = useState(null); // State lưu trữ người dùng đăng nhập
  const [lastLoginCheck, setLastLoginCheck] = useState(Date.now()); // State để kiểm tra đăng nhập thay đổi

  // Kiểm tra trạng thái đăng nhập và cập nhật khi thay đổi
  useEffect(() => {
    const checkUserLogin = () => {
      const userData = localStorage.getItem('user') 
        ? JSON.parse(localStorage.getItem('user')) 
        : null;
      
      // Nếu trạng thái người dùng thay đổi, cập nhật state
      if (JSON.stringify(userData) !== JSON.stringify(loggedInUser)) {
        setLoggedInUser(userData);
        
        // Kích hoạt lại việc lấy bình luận khi người dùng đăng nhập/đăng xuất
        if (id) {
          fetchComments();
          // Không cần tải lại bài viết vì nó không phụ thuộc vào người dùng
        }
      }
    };

    // Kiểm tra khi component mount
    checkUserLogin();

    // Thêm event listener để kiểm tra đăng nhập thay đổi
    const handleStorageChange = () => {
      setLastLoginCheck(Date.now()); // Kích hoạt useEffect
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Thiết lập interval để kiểm tra thường xuyên
    const intervalId = setInterval(checkUserLogin, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, [id, loggedInUser, lastLoginCheck]);

  // Lấy dữ liệu bài viết sử dụng ID động từ params
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://apinews-c75x.onrender.com/articles/getByArticleId/${id}`
        );
        setArticle(data.article);
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  // Hàm lấy tất cả bình luận
  // Trong hàm fetchComments, không cần gọi fetchUserData nữa
const fetchComments = async () => {
  try {
    const { data } = await axios.get(
      `https://apinews-c75x.onrender.com/comment/${id}`
    );
    
    // Nếu nhận được mảng, cập nhật state
    if (Array.isArray(data)) {
      setComments(data);
      // Không cần gọi fetchUserData vì thông tin người dùng đã có trong comment
    }
  } catch (error) {
    console.error("Lỗi khi lấy bình luận:", error);
    // Kiểm tra nếu là lỗi 404, điều này được mong đợi khi không có bình luận
    if (error.response && error.response.status === 404) {
      // Đặt comments là mảng trống khi không có bình luận
      setComments([]);
    } else {
      setCommentError("Không thể tải bình luận. Vui lòng thử lại sau.");
    }
  }
};

  // Lấy bình luận sử dụng ID động từ params
  useEffect(() => {
    if (id) {
      fetchComments();
    }
  }, [id]);

  // Hàm lấy thông tin người dùng
  const fetchUserData = async (userIds) => {
    try {
      // Tạo một object để lưu trữ thông tin người dùng
      const usersData = {};
      
      // Lấy thông tin người dùng hiện tại đang đăng nhập (nếu có)
      const currentUser = localStorage.getItem('user') 
        ? JSON.parse(localStorage.getItem('user')) 
        : null;
      
      if (currentUser) {
        usersData[currentUser.id] = {
          name: currentUser.name,
          avatar: currentUser.avatar || "/avatar.png"
        };
      }
      

      try {
        // Gọi API để lấy danh sách người dùng theo ID
        // Giả sử API trả về dạng: { users: [{id: 1, name: "Name", avatar: "url"}, ...] }
        const { data } = await axios.post("https://apinews-c75x.onrender.com/users/byIds", { userIds });
        data.users.forEach(user => {
          usersData[user.id] = {
            name: user.name,
            avatar: user.avatar || "/avatar.png"
          };
        });
        
        // Vì chưa có API thực tế, chúng ta sẽ giữ các user_id chưa biết
        // và chỉ hiển thị tên và avatar mặc định
      } catch (apiError) {
        console.error("Lỗi khi lấy thông tin từ API người dùng:", apiError);
      }
      
      // Thêm thông tin mặc định cho các user không có dữ liệu
      userIds.forEach(userId => {
        if (!usersData[userId]) {
          // Chuyển userId sang string để đảm bảo so sánh chính xác
          userId = String(userId);
          usersData[userId] = {
            name: `Người dùng #${userId}`,
            avatar: "/avatar.png"
          };
        }
      });
      
      setUsers(usersData);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };

  // Xử lý gửi bình luận với ID bài viết động
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) {
      alert("Vui lòng nhập nội dung bình luận");
      return;
    }

    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!loggedInUser) {
      alert("Vui lòng đăng nhập để bình luận");
      return;
    }
    
    try {
      setIsSubmitting(true);
      setCommentError("");
      
      // Lấy ID người dùng từ dữ liệu đăng nhập
      const userId = loggedInUser.id;
      
      // Gửi yêu cầu POST để thêm bình luận
      const response = await axios.post("https://apinews-c75x.onrender.com/comment/addComment", {
        content: commentContent,
        article_id: id,
        user_id: userId,
      });

      // Xóa biểu mẫu và hiển thị thông báo thành công
      setCommentContent("");
      
      if (response.data && response.data.success) {
        // Tải lại toàn bộ bình luận sau khi thêm mới để đảm bảo dữ liệu chính xác
        await fetchComments();
      }
    } catch (error) {
      console.error("Lỗi khi thêm bình luận:", error);
      setCommentError("Có lỗi xảy ra khi thêm bình luận. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Xử lý xóa bình luận
  const handleDeleteComment = async (commentId) => {
    if (!loggedInUser) {
      alert("Vui lòng đăng nhập để thực hiện chức năng này");
      return;
    }
    
    // Xác nhận trước khi xóa
    if (!window.confirm("Bạn có chắc chắn muốn xóa bình luận này?")) {
      return;
    }

    try {
      setIsDeleting(true);
      
      // Gọi API để xóa bình luận
      await axios.delete(`https://apinews-c75x.onrender.com/comment/${commentId}`);
      
      // Cập nhật UI bằng cách loại bỏ bình luận đã xóa
      setComments(comments.filter(comment => comment.id !== commentId));
      
      // Hiển thị thông báo thành công
      alert("Đã xóa bình luận thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa bình luận:", error);
      alert("Có lỗi xảy ra khi xóa bình luận. Vui lòng thử lại sau.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
        <p className="ml-4 text-gray-600">Đang tải bài viết...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy bài viết</h2>
        <p className="text-gray-600 mb-6">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <button 
          onClick={() => navigate('/')} 
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Quay về trang chủ
        </button>
      </div>
    );
  }

  // Hàm định dạng ngày
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (e) {
      return "Không xác định";
    }
  };

  return (
    <div>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Phần nội dung chính - chiếm 2/3 bên phải */}
          <div className="lg:col-span-2">
            {/* Nội dung bài viết */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
              <div className="flex items-center text-gray-500 text-sm mb-6">
                <span>
                  {article.article_categories && article.article_categories.length > 0
                    ? article.article_categories[0].name
                    : "Tin tức"}
                </span>
                <span className="mx-2">•</span>
                <span>{formatDate(article.createdAt)}</span>
              </div>
              <img
                src={article.image || "/anhnen.png"}
                alt={article.title}
                className="w-full rounded-lg mb-6"
              />
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </div>

          {/* Phần sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200">
                Tin liên quan
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-3">
                    <img
                      src="/anhnen.png"
                      alt={`Tin ${item}`}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium text-sm hover:text-red-600 cursor-pointer">
                        Tin tức liên quan #{item}
                      </h4>
                      <p className="text-gray-500 text-xs mt-1">1 giờ trước</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Phần comments */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold mb-6">
            Bình luận ({comments.length})
          </h3>

          {/* Form bình luận */}
          <div className="mb-8">
            {loggedInUser ? (
              <div className="flex items-center mb-4">
                <img
                  src={loggedInUser.avatar || "/avatar.png"}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="font-medium">Bình luận với tư cách {loggedInUser.name}</span>
              </div>
            ) : (
              <div className="bg-yellow-50 p-4 rounded-lg mb-4 text-yellow-800">
                <p className="font-medium">Vui lòng đăng nhập để bình luận</p>
              </div>
            )}
            
            <textarea
              className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-red-600"
              rows="4"
              placeholder={loggedInUser ? "Viết bình luận của bạn..." : "Đăng nhập để viết bình luận"}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              disabled={!loggedInUser}
            ></textarea>
            
            {commentError && (
              <p className="text-red-500 mt-2">{commentError}</p>
            )}
            
            <button
              className="mt-2 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
              onClick={handleAddComment}
              disabled={isSubmitting || !loggedInUser}
            >
              {isSubmitting ? "Đang gửi..." : "Gửi bình luận"}
            </button>
          </div>

          {/* Danh sách comments */}
          <div className="space-y-6">
            {/* Danh sách comments */}
<div className="space-y-6">
  {comments.length > 0 ? (
    comments.map((comment) => {
      // Lấy thông tin người dùng trực tiếp từ comment.user
      const user = comment.user || {
        name: `Người dùng #${comment.user_id}`,
        avatar: "/avatar.png"
      };
      
      // Kiểm tra xem người đăng nhập có phải là người đã viết bình luận không
      const isCommentOwner = loggedInUser && String(loggedInUser.id) === String(comment.user_id);
      
      return (
        <div key={comment.id} className="flex gap-4">
          <img
            src={user.avatar || "/avatar.png"}
            alt="Avatar"
            className="w-10 h-10 rounded-full"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "/avatar.png";
            }}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold">{user.name}</span>
              {/* <span className="text-gray-500 text-sm">
                {formatDate(comment.createdAt || comment.created_at || new Date())}
              </span> */}
            </div>
            <p className="text-gray-700">{comment.content}</p>
            
            {/* Hiển thị nút xóa nếu người dùng đã đăng nhập và là người viết bình luận */}
            {isCommentOwner && (
              <div className="mt-2">
                <button
                  className="text-red-600 text-sm hover:text-red-800 flex items-center gap-1"
                  onClick={() => handleDeleteComment(comment.id)}
                  disabled={isDeleting}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  Xóa
                </button>
              </div>
            )}
          </div>
        </div>
      );
    })
  ) : (
    <p className="text-gray-500 text-center py-4">
      Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
    </p>
  )}
</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailPage;
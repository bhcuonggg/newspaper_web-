import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header/header";
import Footer from "../Footer/footer";

const DetailPage = () => {
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();  // Get the article ID from URL params
  const [commentContent, setCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState([]);

  // Fetch article using the dynamic ID from params
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://apinews-c75x.onrender.com/articles/getByArticleId/${id}`
        );
        setArticle(data.article);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  // Fetch comments using the dynamic ID from params
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(
          `https://apinews-c75x.onrender.com/comment/${id}`
        );
        setComments(data || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      }
    };

    if (id) {
      fetchComments();
    }
  }, [id]);

  // Handle comment submission with dynamic article ID
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) {
      alert("Vui lòng nhập nội dung bình luận");
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.post("https://apinews-c75x.onrender.com/comment/addComment", {
        content: commentContent,
        article_id: id,  // Use the dynamic ID here
        user_id: 2,
      });

      // Clear form and show success message
      setCommentContent("");
      alert("Bình luận đã được thêm thành công!");

      // Refresh comments
      const { data } = await axios.get(
        `https://apinews-c75x.onrender.com/comment/${id}`
      );
      setComments(data || []);
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Có lỗi xảy ra khi thêm bình luận");
    } finally {
      setIsSubmitting(false);
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
                <span>
                  {article.createdAt
                    ? new Date(article.createdAt).toLocaleString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "Mới đăng"}
                </span>
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
            <textarea
              className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-red-600"
              rows="4"
              placeholder="Viết bình luận của bạn..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            ></textarea>
            <button
              className="mt-2 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
              onClick={handleAddComment}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang gửi..." : "Gửi bình luận"}
            </button>
          </div>

          {/* Danh sách comments */}
          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <img
                    src="/avatar.png"
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold">
                        {comment.user ? comment.user.username : "Người dùng"}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(comment.created_at).toLocaleDateString(
                          "vi-VN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailPage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { CreatePost } from '../components/CreatePost';
import { PostCard, Post } from '../components/PostCard';

export function FeedPage() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const token = localStorage.getItem("token");

      // 🔹 Get logged in user
      const userRes = await fetch("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = await userRes.json();
      setCurrentUser(userData);

      // 🔹 Get all posts
      const postRes = await fetch("http://localhost:5000/api/posts", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const postData = await postRes.json();
      setPosts(postData);

    } catch (error) {
      console.error("Feed load error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  // ✅ CREATE POST
  const handleCreatePost = async (content: string) => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    });

    fetchFeed();
  };

  // ✅ LIKE
  const handleLike = async (postId: string) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchFeed();
  };

  // ✅ COMMENT
  const handleComment = async (postId: string, comment: string) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text: comment })
    });

    fetchFeed();
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!currentUser) return <div className="p-6">No user found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">

          <CreatePost
            currentUser={currentUser}
            onCreatePost={handleCreatePost}
          />

          {posts.map(post => (
            <PostCard
              key={post._id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
            />
          ))}

        </div>
      </div>
    </div>
  );
}
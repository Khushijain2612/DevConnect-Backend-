import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { PostCard, Post } from '../components/PostCard';
import { MapPin, Link as LinkIcon, Calendar } from 'lucide-react';

export function ProfilePage() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      // 🔹 Get logged in user
      const userRes = await fetch("https://devconnect-backend-1-jm73.onrender.com/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const userData = await userRes.json();
      setCurrentUser(userData);

      // 🔹 Get user posts
      const postRes = await fetch(
        `https://devconnect-backend-1-jm73.onrender.com/api/posts/user/${userData._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const postData = await postRes.json();
      setPosts(postData);

    } catch (error) {
      console.error("Error loading profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  const handleLike = async (postId: string) => {
    const token = localStorage.getItem("token");

    await fetch(`https://devconnect-backend-1-jm73.onrender.com/api/posts/${postId}/like`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchProfile();
  };

  const handleComment = async (postId: string, comment: string) => {
    const token = localStorage.getItem("token");

    await fetch(`https://devconnect-backend-1-jm73.onrender.com/api/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text: comment })
    });

    fetchProfile();
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!currentUser) return <div className="p-6">No user found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">

          <div className="h-32 bg-gradient-to-r from-indigo-500 to-blue-600"></div>

          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16 mb-4">
              <img
                src={currentUser.profilePic || "https://via.placeholder.com/150"}
                alt={currentUser.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
              />
              <div className="flex-1 mt-4 sm:mt-0 sm:mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
                <p className="text-gray-500">@{currentUser.username}</p>
              </div>
              <button className="mt-4 sm:mt-0 px-6 py-2 bg-indigo-600 text-white rounded-lg">
                Edit Profile
              </button>
            </div>

            <p className="text-gray-700 mb-4">{currentUser.bio}</p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              {currentUser.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{currentUser.location}</span>
                </div>
              )}

              {currentUser.website && (
                <div className="flex items-center space-x-1">
                  <LinkIcon className="w-4 h-4" />
                  <a href={currentUser.website} className="text-indigo-600">
                    {currentUser.website}
                  </a>
                </div>
              )}

              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>
                  Joined {new Date(currentUser.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            {posts.length === 0 ? (
              <p>No posts yet</p>
            ) : (
              posts.map(post => (
                <PostCard
                  key={post._id}
                  post={post}
                  onLike={handleLike}
                  onComment={handleComment}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
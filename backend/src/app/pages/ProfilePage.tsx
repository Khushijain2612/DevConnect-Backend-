import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { PostCard, Post } from '../components/PostCard';
import { MapPin, Link as LinkIcon, Calendar, Users } from 'lucide-react';

export function ProfilePage() {
  const navigate = useNavigate();

  const [currentUser] = useState({
    id: '1',
    name: 'Alex Johnson',
    username: 'alexj',
    avatar: 'https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzE1ODE3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'Full-stack developer passionate about building amazing web experiences. React | Node.js | TypeScript enthusiast.',
    location: 'San Francisco, CA',
    website: 'alexjohnson.dev',
    joinedDate: 'January 2024',
    followers: 342,
    following: 189
  });

  const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        username: currentUser.username
      },
      content: 'Excited to share my latest project! Built a real-time collaboration tool using WebSockets. Check it out and let me know what you think! 🚀',
      timestamp: '3d ago',
      likes: 56,
      isLiked: true,
      comments: [
        { id: 'c1', author: 'Sarah', content: 'This looks amazing! Great work!' },
        { id: 'c2', author: 'Mike', content: 'Love the UI design' }
      ]
    },
    {
      id: '2',
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        username: currentUser.username
      },
      content: 'Just finished reading "Clean Code" by Robert Martin. Highly recommend it to all developers looking to improve their craft. What are your favorite tech books?',
      timestamp: '1w ago',
      likes: 38,
      isLiked: false,
      comments: [
        { id: 'c3', author: 'Emma', content: 'Try "Design Patterns" next!' }
      ]
    },
    {
      id: '3',
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        username: currentUser.username
      },
      content: 'Working on optimizing our CI/CD pipeline. Reduced build time from 15 minutes to 5 minutes by implementing better caching strategies. Small wins! 💪',
      timestamp: '2w ago',
      likes: 73,
      isLiked: true,
      comments: []
    }
  ]);

  const handleLogout = () => {
    navigate('/');
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: string, comment: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now().toString(),
              author: currentUser.name,
              content: comment
            }
          ]
        };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          {/* Cover / Background */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-blue-600"></div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16 mb-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
              />
              <div className="flex-1 mt-4 sm:mt-0 sm:mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
                <p className="text-gray-500">@{currentUser.username}</p>
              </div>
              <button className="mt-4 sm:mt-0 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Edit Profile
              </button>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">{currentUser.bio}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{currentUser.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <LinkIcon className="w-4 h-4" />
                <a href={`https://${currentUser.website}`} className="text-indigo-600 hover:underline">
                  {currentUser.website}
                </a>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {currentUser.joinedDate}</span>
              </div>
            </div>

            {/* Followers/Following */}
            <div className="flex space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-gray-900">{currentUser.followers}</span>
                <span className="text-gray-600">Followers</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-gray-900">{currentUser.following}</span>
                <span className="text-gray-600">Following</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('posts')}
                className={`px-6 py-4 font-medium transition-colors relative ${
                  activeTab === 'posts'
                    ? 'text-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Posts
                {activeTab === 'posts' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`px-6 py-4 font-medium transition-colors relative ${
                  activeTab === 'about'
                    ? 'text-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                About
                {activeTab === 'about' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
                )}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'posts' ? (
              <div className="space-y-6">
                {posts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onComment={handleComment}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Passionate full-stack developer with 5+ years of experience building scalable web applications.
                    Specialized in React, Node.js, and cloud technologies. Love contributing to open source and
                    mentoring junior developers.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'Next.js'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Experience</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-900">Senior Frontend Developer</p>
                      <p className="text-sm text-gray-600">TechCorp Inc. • 2022 - Present</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Full-stack Developer</p>
                      <p className="text-sm text-gray-600">StartupXYZ • 2020 - 2022</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

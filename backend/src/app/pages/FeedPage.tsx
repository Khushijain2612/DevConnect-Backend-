import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { CreatePost } from '../components/CreatePost';
import { PostCard, Post } from '../components/PostCard';
import { ProfileCard, SuggestedUser } from '../components/ProfileCard';

export function FeedPage() {
  const navigate = useNavigate();

  const [currentUser] = useState({
    id: '1',
    name: 'Alex Johnson',
    username: 'alexj',
    avatar: 'https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzE1ODE3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  });

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1580894908361-967195033215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzb2Z0d2FyZSUyMGVuZ2luZWVyfGVufDF8fHx8MTc3MTY1OTg5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        username: 'sarachen'
      },
      content: 'Just deployed my first full-stack app using React and Node.js! The feeling of seeing everything come together is incredible. Any tips for optimizing performance? 🚀',
      timestamp: '2h ago',
      likes: 24,
      isLiked: false,
      comments: [
        { id: 'c1', author: 'Mike', content: 'Congrats! Try implementing code splitting with React.lazy()' },
        { id: 'c2', author: 'Emma', content: 'Great work! Look into caching strategies too' }
      ]
    },
    {
      id: '2',
      author: {
        name: 'Marcus Williams',
        avatar: 'https://images.unsplash.com/photo-1710770563074-6d9cc0d3e338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZGV2ZWxvcGVyJTIwY29kaW5nfGVufDF8fHx8MTc3MTY2ODM3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        username: 'marcusw'
      },
      content: 'Working on a new AI-powered code review tool. It analyzes your pull requests and suggests improvements based on best practices. Beta testers needed! Drop a comment if interested.',
      timestamp: '5h ago',
      likes: 42,
      isLiked: true,
      comments: [
        { id: 'c3', author: 'DevGirl', content: "I'd love to test this out!" }
      ]
    },
    {
      id: '3',
      author: {
        name: 'Emily Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1582138825658-fb952c08b282?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWVyJTIwd29ya2luZyUyMGxhcHRvcHxlbnwxfHx8fDE3NzE2NjgzNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        username: 'emilydev'
      },
      content: 'Hot take: TypeScript has made me a better JavaScript developer. The type safety catches so many bugs before they reach production. What are your thoughts?',
      timestamp: '1d ago',
      likes: 67,
      isLiked: false,
      comments: []
    },
    {
      id: '4',
      author: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1766066014773-0074bf4911de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGRldmVsb3BlciUyMHNtaWxpbmd8ZW58MXx8fHwxNzcxNjY4Mzc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        username: 'davidk'
      },
      content: 'Finally cracked a LeetCode hard problem that I\'ve been stuck on for days! The key was recognizing it as a dynamic programming problem. Persistence pays off! 💪',
      timestamp: '1d ago',
      likes: 31,
      isLiked: false,
      comments: [
        { id: 'c4', author: 'CodeMaster', content: 'Which problem was it?' }
      ]
    }
  ]);

  const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([
    {
      id: '2',
      name: 'Sarah Chen',
      username: 'sarachen',
      avatar: 'https://images.unsplash.com/photo-1580894908361-967195033215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzb2Z0d2FyZSUyMGVuZ2luZWVyfGVufDF8fHx8MTc3MTY1OTg5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      bio: 'Full-stack developer | React enthusiast | Open source contributor',
      isFollowing: false
    },
    {
      id: '3',
      name: 'Marcus Williams',
      username: 'marcusw',
      avatar: 'https://images.unsplash.com/photo-1710770563074-6d9cc0d3e338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZGV2ZWxvcGVyJTIwY29kaW5nfGVufDF8fHx8MTc3MTY2ODM3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      bio: 'AI/ML Engineer | Building the future with code',
      isFollowing: false
    },
    {
      id: '4',
      name: 'Emily Rodriguez',
      username: 'emilydev',
      avatar: 'https://images.unsplash.com/photo-1582138825658-fb952c08b282?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWVyJTIwd29ya2luZyUyMGxhcHRvcHxlbnwxfHx8fDE3NzE2NjgzNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      bio: 'TypeScript advocate | Senior Frontend Engineer',
      isFollowing: true
    }
  ]);

  const handleLogout = () => {
    navigate('/');
  };

  const handleCreatePost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        username: currentUser.username
      },
      content,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false,
      comments: []
    };
    setPosts([newPost, ...posts]);
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

  const handleFollow = (userId: string) => {
    setSuggestedUsers(suggestedUsers.map(user => {
      if (user.id === userId) {
        return { ...user, isFollowing: !user.isFollowing };
      }
      return user;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Feed - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <CreatePost currentUser={currentUser} onCreatePost={handleCreatePost} />
            
            {posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
              />
            ))}
          </div>

          {/* Sidebar - Right Column */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Suggested Developers
                </h2>
                <div className="space-y-4">
                  {suggestedUsers.map(user => (
                    <ProfileCard
                      key={user.id}
                      user={user}
                      onFollow={handleFollow}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

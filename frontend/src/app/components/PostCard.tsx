import React, { useState } from 'react';
import { Heart, MessageCircle, Send } from 'lucide-react';

export interface Post {
  _id: string;
  content: string;
  user: {
    _id: string;
    name: string;
    profilePic?: string;
  };
  likes: string[];
  comments: {
    _id: string;
    user: {
      name: string;
    };
    text: string;
  }[];
  createdAt: string;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
}

export function PostCard({ post, onLike, onComment }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post._id, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      
      {/* Post Header */}
      <div className="flex items-start space-x-3 mb-4">
        <img
          src={post.user?.profilePic || "https://via.placeholder.com/40"}
          alt={post.user?.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
            {post.user?.name}
          </h3>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 mb-4 leading-relaxed">
        {post.content}
      </p>

      {/* Post Actions */}
      <div className="flex items-center space-x-6 pt-3 border-t border-gray-100">
        <button
          onClick={() => onLike(post._id)}
          className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
        >
          <Heart className="w-5 h-5" />
          <span className="text-sm font-medium">
            {post.likes.length}
          </span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">
            {post.comments.length}
          </span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-100">

          {post.comments.map((comment) => (
            <div key={comment._id} className="mb-3 last:mb-0">
              <p className="text-sm">
                <span className="font-semibold text-gray-900">
                  {comment.user?.name}
                </span>
                <span className="text-gray-700 ml-2">
                  {comment.text}
                </span>
              </p>
            </div>
          ))}

          {/* Add Comment */}
          <form onSubmit={handleSubmitComment} className="mt-3 flex space-x-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
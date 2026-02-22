import React from 'react';
import { Button } from './Button';

export interface SuggestedUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  isFollowing: boolean;
}

interface ProfileCardProps {
  user: SuggestedUser;
  onFollow: (userId: string) => void;
}

export function ProfileCard({ user, onFollow }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{user.name}</h4>
          <p className="text-sm text-gray-500 truncate">@{user.username}</p>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{user.bio}</p>
        </div>
      </div>
      <button
        onClick={() => onFollow(user.id)}
        className={`w-full mt-3 px-4 py-2 rounded-lg font-medium transition-colors ${
          user.isFollowing
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        {user.isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
}

import React from 'react';

export default function AuthButtons({ onSignInClick, onSignUpClick }) {
  return (
    <div className="flex space-x-4">
      <button 
        onClick={onSignInClick} 
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Sign In
      </button>
      <button 
        onClick={onSignUpClick} 
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Sign Up
      </button>
    </div>
  );
}
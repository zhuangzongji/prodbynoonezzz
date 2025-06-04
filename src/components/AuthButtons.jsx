import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

export default function AuthButtons({ onSignInClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center justify-center cursor-pointer group w-[80px] h-[80px]"
      onClick={onSignInClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 大頭貼圖示 */}
      <div
        className={`text-white transition-transform duration-300 ${
          hovered ? 'scale-125' : 'scale-100'
        }`}
      >
        <FaUserCircle className="text-5xl" />
      </div>

      {/* 滑出 LOGIN 字樣 */}
      <div
        className={`absolute top-[72px] text-m font-semibold text-white bg-black px-3 py-1 rounded-full  transition-all duration-300 ${
          hovered
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
        style={{
          fontFamily: 'Orbitron, sans-serif',
         
        }}
      >
        LOGIN
      </div>
    </div>
  );
}
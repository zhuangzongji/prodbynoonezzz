import { useState } from "react";
import { Link } from "react-router";
import CartSummary from "./CartSummary";

function Header({ title, slogan }) {
  const [isOnTouch, setIsOnTouch] = useState(false);

  return (
    <header data-theme="luxury" className="text-center flex flex-col items-center header ">
      <Link to="/">
        <h2
          className="pt-5 pb-2 font-extrabold text-white transition-transform duration-300 hover:scale-110"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(1.5rem, 6vw, 3rem)' // RWD 字級
          }}
        >
          {title}
        </h2>
      </Link>

      <p
        className="text-gray-200 text-opacity-90 text-lg leading-relaxed xl:w-1/2 lg:w-3/4 mx-auto"
        style={{ fontFamily: 'Orbitron, sans-serif' }}
      >
        {slogan}
      </p>

      <CartSummary />

      <div className="flex mt-6 justify-center">
        <hr className="my-[25px] mx-auto w-[100px] border-0 border-t-[6px] opacity-100 rounded-full bg-gradient-to-r from-orange-400 via-yellow-500 to-pink-600" />
      </div>
    </header>
  );
}

export default Header;
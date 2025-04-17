import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { Play, Pause } from 'lucide-react';
import _ from 'lodash';

function ProductItem({ product, onTagClick, selectedTags = [] }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(`/audio/${product.title}.mp3`));

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const handleStopAudio = (e) => {
      if (e.detail !== product.title) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener('stopAllAudio', handleStopAudio);
    return () => {
      window.removeEventListener('stopAllAudio', handleStopAudio);
    };
  }, [product.title]);

  const handlePlayAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      const event = new CustomEvent('stopAllAudio', { detail: product.title });
      window.dispatchEvent(event);
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="pt-4 px-3 lg:px-4">
      <div
        className="max-w-4xl mx-auto overflow-hidden rounded-xl shadow-xl bg-gradient-to-r from-purple-800 via-purple-600 to-orange-500 p-2"
        style={{ height: '140px' }}
      >
        <div className="flex items-center h-full space-x-4">
          {/* 圖片區塊 */}
          <div className="relative aspect-square w-32 overflow-hidden border-2 border-transparent hover:border-indigo-400 rounded-lg flex-shrink-0">
            <img
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-300 ease-in-out hover:opacity-100"
              src={product.cover}
              alt={product.title}
            />
            <button
              onClick={handlePlayAudio}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-red-500 text-white p-3 rounded-full hover:scale-110 transition-all shadow-xl"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </div>

          {/* 內容區塊 */}
          <div className="flex-1 h-full flex flex-col justify-between p-2 bg-black bg-opacity-60 backdrop-blur-lg rounded-xl">
            <div>
              <h4
                className="text-2xl font-semibold text-white mb-1"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {product.title}
              </h4>
              <p
                className="text-gray-300 opacity-80 text-sm"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {_.truncate(product.summary, { length: 60, omission: ' ... ' })}
              </p>

              {/* Tag 顯示與點擊 */}
              {product.tags && (
                <div className="mt-1 flex flex-wrap gap-2 justify-center">
                  {product.tags.map((tag, index) => {
                    const isActive = selectedTags.includes(tag);
                    return (
                      <button
                        key={index}
                        onClick={() => onTagClick?.(tag)}
                        className={`text-xs px-2 py-1 rounded-full transition-all ${
                          isActive
                            ? 'bg-orange-500 text-black'
                            : 'text-orange-300 hover:text-orange-500'
                        }`}
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                      >
                        #{tag}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 購買按鈕 */}
<div className="flex justify-end mt-2">
  <Link
    to={`/products/id/${product.id}`}
    className="text-orange-400 hover:text-orange-600 font-semibold text-m flex items-center text-base transition-colors duration-200"
    style={{ fontFamily: 'Orbitron, sans-serif' }}
  >
    PURCHASE
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      className="ml-2"
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  </Link>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductItem;
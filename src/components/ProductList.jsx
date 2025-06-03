import { useState, useEffect, useRef } from 'react';
import ProductItem from './ProductItem';

import beats from '../json/beats.json';
import drumkits from '../json/drumkits.json';
import loops from '../json/loops.json';

function ProductList() {
  const [category, setCategory] = useState('beats');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const loader = useRef(null);

  const getProductsByCategory = () => {
    switch (category) {
      case 'drumkits':
        return drumkits;
      case 'loops':
        return loops;
      case 'beats':
      default:
        return beats;
    }
  };

  const products = getProductsByCategory();

  const allTags = Array.from(
    new Set(products.flatMap((product) => product.tags || []))
  ).sort();

  const handleTagClick = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchTerm
      ? product.title?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesTags =
      selectedTags.length === 0
        ? true
        : selectedTags.every((tag) => product.tags?.includes(tag));

    return matchesSearch && matchesTags;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  useEffect(() => {
    setVisibleCount(5);
  }, [searchTerm, selectedTags, category]);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          setVisibleCount((prev) =>
            Math.min(prev + 5, filteredProducts.length)
          );
          setIsLoading(false);
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loader.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, filteredProducts.length, isLoading]);

  return (
    <div className="flex flex-col items-center gap-6 content w-full px-4">
      {/* 🔍 分類欄位 */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-3 gap-4 mt-4">
          {['beats', 'drumkits', 'loops'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setSearchTerm('');
                setSelectedTags([]);
              }}
              className={`w-full py-3 font-bold transition-all 
                ${
                  category === cat
                    ? ' border-b-4 border-orange-400 text-white'
                    : 'hover:bg-gray-700 border-b-4 border-transparent text-white'
                }`}
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 🔍 搜尋欄位 */}
      <div className="w-full max-w-xl">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search ${category}...`}
          className="w-full px-4 py-2 rounded-xl text-white bg-black bg-opacity-30 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        />
      </div>

      {/* 🔍 Tag 篩選區塊 */}
      {allTags.length > 0 && (
        <div className="w-full max-w-xl flex flex-wrap gap-2 justify-center mt-2">
          {allTags.map((tag) => {
            const isActive = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`text-sm px-3 py-1 rounded-full border transition-all ${
                  isActive
                    ? 'bg-orange-400 text-black font-bold border-orange-500'
                    : 'text-orange-300 border-orange-300 hover:bg-orange-500 hover:text-black'
                }`}
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      )}

      {/* 🎵 商品列表 */}
      <div className="w-full max-w-6xl flex flex-col gap-4">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onTagClick={handleTagClick}
              selectedTags={selectedTags}
            />
          ))
        ) : (
          <p
            className="text-white text-center mt-10 text-lg opacity-60"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            No {category} found.
          </p>
        )}

        {hasMore && (
          <div ref={loader} className="flex justify-center mt-4">
            <div
              className="flex items-center gap-2 text-orange-400 text-sm"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              <svg
                className="animate-spin h-5 w-5 text-orange-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Loading more {category}...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
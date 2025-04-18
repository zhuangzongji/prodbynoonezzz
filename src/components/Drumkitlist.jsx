import { useState, useEffect, useRef } from 'react';
import ProductItem from './ProductItem';
import drumkits from '../json/drumkits.json';

function DrumKitList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const loader = useRef(null);

  const handleTagClick = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredProducts = drumkits.filter((product) => {
    const matchesSearch = searchTerm
      ? product.title?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesTags =
      selectedTags.length === 0
        ? true
        : product.tags?.some((tag) => selectedTags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  useEffect(() => {
    setVisibleCount(5);
  }, [searchTerm, selectedTags]);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) =>
              Math.min(prev + 5, filteredProducts.length)
            );
            setIsLoading(false);
          }, 1500);
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
      <div className="w-full max-w-xl">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search drum kits by title"
          className="w-full px-4 py-2 rounded-xl text-white bg-black bg-opacity-30 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        />
      </div>

      <div className="w-full max-w-6xl flex flex-col gap-4">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <ProductItem
              key={product.ID}
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
            No drum kits found.
          </p>
        )}

        {hasMore && (
          <div
            ref={loader}
            className="text-orange-400 text-center mt-4 text-sm animate-spin"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            {isLoading ? 'Loading more kits...' : 'Scroll down to load more'}
          </div>
        )}
      </div>
    </div>
  );
}

export default DrumKitList;
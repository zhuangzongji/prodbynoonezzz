function DrumkitItem({ product, onTagClick, selectedTags }) {
  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-md">
      <h2 className="text-white text-xl font-bold">{product.title}</h2>
      <p className="text-orange-300 mt-2">${product.price}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {product.tags?.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className={`text-xs px-2 py-1 rounded-full border ${
              selectedTags.includes(tag)
                ? 'bg-orange-400 text-black font-bold border-orange-500'
                : 'text-orange-300 border-orange-300 hover:bg-orange-500 hover:text-black'
            }`}
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DrumkitItem;
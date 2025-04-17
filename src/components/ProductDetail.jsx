import { useRef, useState, useEffect } from "react";
import AddToBasket from "./AddToBasket";
import { Play, Pause } from "lucide-react";

function ProductDetail({ product }) {
    const [selectedFormat, setSelectedFormat] = useState("mp3");
    const [qty, setQty] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio(`/audio/${product.title}.mp3`));

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);

    const handlePlayAudio = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const formatPrice = product.prices[selectedFormat];
    const totalPrice = (formatPrice * qty).toFixed(2);

    return (
        <div className="max-w-3xl mx-auto scale-90">
            <div data-theme="luxury" className="grid grid-cols-1 lg:grid-cols-12 gap-6 justify-center">
                {/* 左側：產品圖片 */}
                <div className="lg:col-span-5 relative group">
                    <div className="relative">
                        <img
                            alt={product.title}
                            className="w-full h-full object-cover object-center rounded-lg shadow-lg"
                            style={{ aspectRatio: '1' }}
                            src={product.cover}
                            onClick={handlePlayAudio}
                        />
                        <button
                            onClick={handlePlayAudio}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 rounded-full shadow-xl hover:scale-110 transition-transform duration-300"
                        >
                            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                        </button>
                    </div>
                </div>

                {/* 右側：產品資訊與購買選項 */}
                <div className="lg:col-span-7 px-6 py-8 bg-gradient-to-r from-purple-900 via-purple-800 to-orange-600 rounded-lg shadow-xl text-white">
                    <h1 className="text-4xl font-extrabold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {product.title}
                    </h1>
                    <h2 className="text-lg mb-4 opacity-80" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {product.author}
                    </h2>
                    <p className="opacity-90 text-base mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {product.summary}
                    </p>

                    {/* 價格與格式選擇 */}
                    <div className="flex flex-col gap-4 mb-4 items-center" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        <div className="flex items-center gap-6">
                            <span className="font-bold">Format:</span>
                            <div className="flex gap-4">
                                <div
                                    onClick={() => setSelectedFormat("mp3")}
                                    className={`cursor-pointer px-4 py-2 rounded-lg transition-colors ${selectedFormat === "mp3" ? "text-yellow-400" : "text-white hover:text-yellow-400 hover:bg-gray-700"}`}
                                >
                                    MP3
                                </div>
                                <div
                                    onClick={() => setSelectedFormat("wav")}
                                    className={`cursor-pointer px-4 py-2 rounded-lg transition-colors ${selectedFormat === "wav" ? "text-yellow-400" : "text-white hover:text-yellow-400 hover:bg-gray-700"}`}
                                >
                                    WAV
                                </div>
                            </div>
                        </div>
                        <p className="text-lg mt-2 font-semibold">
                            Total Price: US${totalPrice}
                        </p>
                    </div>

                    {/* 加入購物車 */}
                    <div className="mt-6">
                        <AddToBasket
                            product={{
                                ...product,
                                selectedFormat,
                                price: formatPrice,
                            }}
                            qty={qty}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
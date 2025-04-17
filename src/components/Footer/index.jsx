

export default function Footer() {
  return (
    <div data-theme="luxury">
      {/* 分隔線 */}
      <hr className="my-6 w-full border-t-2 rounded-sm opacity-100" />
      <footer className="footer text-white py-8 px-4 max-w-6xl mx-auto flex flex-wrap justify-between gap-8 text-sm">
        {/* 描述區塊 */}
        <div className="footer-content max-w-sm">
          <p className="font-extrabold text-lg mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            DESCRIPTIONS
          </p>
          <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            thanks for not stealing my shit.
          </p>
        </div>

        {/* 追蹤我們 */}
        <div className="footer-followUs">
          <p className="font-extrabold text-lg mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            FOLLOW US
          </p>
          <div className="flex items-center space-x-4">
            <a href="https://www.instagram.com/no.onezzz_/" target="_blank" rel="noopener noreferrer">
              <img className="w-7 h-7 hover:scale-110 transition-transform" src="/images/nn-icon-instagram.svg" alt="instagram" />
            </a>
            <a href="https://www.instagram.com/no.onezzz_/" target="_blank" rel="noopener noreferrer">
              <img className="w-7 h-7 hover:scale-110 transition-transform" src="/images/nn-icon-tiktok.svg" alt="tiktok" />
            </a>
          </div>
        </div>

        {/* 聯絡我們 */}
        <div className="footer-contactUs">
          <p className="font-extrabold text-lg mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            CONTACT US
          </p>
          <p className="text-gray-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            please don't.
          </p>
        </div>

        {/* 版權聲明 */}
        <div className="w-full text-center mt-6">
          <p className="text-gray-400 text-xs opacity-60" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            hashtagmtfk2516represent
          </p>
        </div>
      </footer>
    </div>
  );
}
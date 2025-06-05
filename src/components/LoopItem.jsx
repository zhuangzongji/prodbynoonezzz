import { Typewriter } from 'react-simple-typewriter';

export default function LoopItem() {
  return (
    <div className="flex justify-center items-center h-40">
      <h2 className="text-white text-lg md:text-xl font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
        <Typewriter
          words={['Coming soon...']}
          loop={0} // 不重複
          cursor
          cursorStyle="_"
          typeSpeed={80}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>
    </div>
  );
}
import React, { useEffect, useRef } from 'react';

// Lightweight smooth cursor inspired by MagicUI behavior
export function SmoothCursor() {
  const ringRef = useRef(null);
  const arrowRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (arrowRef.current) {
        arrowRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove);
    const id = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <div ref={ringRef} className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-black/80"></div>
      <svg
        ref={arrowRef}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="black"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 2L3 20L8.2 14.8L12.5 22L15.3 20.4L11 13.2L18 13.2L3 2Z" />
      </svg>
    </div>
  );
}

export default SmoothCursor;
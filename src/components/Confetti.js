import React, { useEffect, useState } from 'react';

function randomRange(a, b) { return Math.random() * (b - a) + a }

export default function Confetti({ active = true, count = 40 }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (!active) return setPieces([]);
    const arr = Array.from({ length: count }).map(() => ({
      id: Math.random().toString(36).slice(2, 9),
      left: randomRange(5, 95),
      top: randomRange(-10, 10),
      delay: randomRange(0, 0.8),
      rot: randomRange(-360, 360),
      color: ['#FF6EC7', '#7EFFF5', '#9B59FF', '#FFD166'][Math.floor(Math.random() * 4)]
    }));
    setPieces(arr);
    // Auto-clear after animation
    const t = setTimeout(() => setPieces([]), 3000);
    return () => clearTimeout(t);
  }, [active, count]);

  return (
    <>
      {pieces.map(p => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{ left: p.left + '%', top: p.top + '%', background: p.color, transform: `rotate(${p.rot}deg)`, animation: `confetti-fall 2.2s ${p.delay}s cubic-bezier(.2,.8,.2,1) forwards` }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall{
          0%{ opacity:1; transform: translateY(0) rotate(0deg) }
          100%{ opacity:0; transform: translateY(110vh) rotate(420deg) }
        }
      `}</style>
    </>
  );
}

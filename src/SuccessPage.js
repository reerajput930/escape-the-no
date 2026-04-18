import React, { useEffect, useState } from 'react';
import './SuccessPage.css';

const emojis = ['🎉', '🥳', '🎊', '💚', '✨', '🐱', '💌', '🎈', '🌟', '💥'];

function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2.5 + Math.random() * 2,
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
    size: 16 + Math.floor(Math.random() * 20),
  }));

  return (
    <div className="confetti-container" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

export default function SuccessPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className="success-root">
      <Confetti />
      <div className={`success-card ${visible ? 'pop-in' : ''}`}>
        <p className="success-top-emoji">🐱✨</p>
        <h1 className="success-title">noice choice</h1>
        <p className="success-sub">saturday google meet — it's happening bestie 💚</p>
        {/* <p className="success-heart">u said yes and that's all that matters 🥺🎉</p> */}
        <div className="success-badge">10:00 pm • locked in 🔒</div>
      </div>
    </div>
  );
}

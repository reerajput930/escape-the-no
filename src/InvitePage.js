import React, { useState, useRef } from 'react';
import './InvitePage.css';

const shockedCat = process.env.PUBLIC_URL + '/shocked-cat.png';
const smilingCat = process.env.PUBLIC_URL + '/smiling-cat.png';

function FloatAwayButton({ label, onClick, className, onTryBad }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [floating, setFloating] = useState(false);
  const btnRef = useRef(null);

  const handleMouseEnter = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rect = btnRef.current.getBoundingClientRect();

    const randX = (Math.random() - 0.5) * vw * 1.2;
    const randY = (Math.random() - 0.5) * vh * 1.2;

    setPos({ x: randX, y: randY });
    setFloating(true);
    if (onTryBad) onTryBad();
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    handleMouseEnter();
  };

  return (
    <button
      ref={btnRef}
      className={`choice-btn float-away-btn ${className || ''} ${floating ? 'was-floated' : ''}`}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: floating ? 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
      }}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default function InvitePage({ onSuccess }) {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [triedNo, setTriedNo] = useState(false);

  const correctTime = '10:00 pm';
  const correctAnswer = 'yes';

  const timeOptions = ['not available', 'not today', '10:00 pm', 'next time'];
  const answerOptions = ['yes', 'no'];

  const bottomState = (() => {
    if (selectedTime === correctTime || selectedAnswer === correctAnswer) return 'good';
    if (triedNo) return 'bad';
    return 'idle';
  })();

  const handleTimeClick = (option) => {
    if (option === correctTime) setSelectedTime(option);
  };

  const handleAnswerClick = (option) => {
    if (option === correctAnswer) setSelectedAnswer(option);
  };

  const canProceed = selectedTime === correctTime && selectedAnswer === correctAnswer;

  return (
    <div className="invite-wrapper">
      <div className="invite-card">

        {/* Time Section */}
        <div className="section time-section">
          <p style={{color:'white',fontSize:"bold"}} className="section-label">choose yr free time</p>
          <div className="btn-row">
            {timeOptions.map((opt) =>
              opt === correctTime ? (
                <button
                  key={opt}
                  className={`choice-btn correct-btn ${selectedTime === opt ? 'selected' : ''}`}
                  onClick={() => handleTimeClick(opt)}
                >
                  {opt}
                </button>
              ) : (
                <FloatAwayButton key={opt} label={opt} onTryBad={() => setTriedNo(true)} />
              )
            )}
          </div>
        </div>

        {/* Greeting */}
        <div className="section greeting-section">
          <p style={{color:'black',fontSize:"bold"}} className="greeting-text">Hy Smittt dudee</p>
          <p style={{color:'black',fontWeight:"700"}} className="question-text">let's have gmeet meetup on Saturday, u wanna come?</p>
        </div>

        {/* Yes / No */}
        <div className="section answer-section">
          <div className="btn-row">
            {answerOptions.map((opt) =>
              opt === correctAnswer ? (
                <button
                  key={opt}
                  className={`choice-btn correct-btn ${selectedAnswer === opt ? 'selected' : ''}`}
                  onClick={() => handleAnswerClick(opt)}
                >
                  {opt}
                </button>
              ) : (
                <FloatAwayButton key={opt} label={opt} onTryBad={() => setTriedNo(true)} />
              )
            )}
          </div>
        </div>

        {/* Bottom Block */}
        <div
          className={`bottom-block ${bottomState}`}
          style={
            bottomState === 'bad'
              ? { backgroundImage: `url(${shockedCat})` }
              : bottomState === 'good'
              ? { backgroundImage: `url(${smilingCat})` }
              : {}
          }
        >
          {bottomState === 'bad' && (
            <p className="block-msg bad-msg">don't make wrong life decisions 😬</p>
          )}
          {bottomState === 'good' && (
            <p className="block-msg good-msg">u have good taste 😻</p>
          )}
        </div>

        {/* Proceed Button */}
        {canProceed && (
          <button className="proceed-btn" onClick={onSuccess}>
            let's gooo! 🎉
          </button>
        )}
      </div>
    </div>
  );
}

import React from 'react';

interface Props {
  timeLeft: number;
}

const Timer: React.FC<Props> = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft <= 60;

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className={`timer ${isLowTime ? 'warning' : ''}`}>
      <div className="timer-icon">⏱️</div>
      <div className="timer-display">
        <span className="time">
          {formatTime(minutes)}:{formatTime(seconds)}
        </span>
        <span className="label">Time Remaining</span>
      </div>
      {isLowTime && (
        <div className="low-time-alert">⚠️ Hurry up!</div>
      )}
    </div>
  );
};

export default Timer;

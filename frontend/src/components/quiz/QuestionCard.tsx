import React, { useState } from 'react';
import type { Question } from '../../types/quiz.types';

interface Props {
  question: Question;
  onSubmit: (answer: string) => void;
}

const QuestionCard: React.FC<Props> = ({ question, onSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const text =
    typeof (question as unknown as { text?: unknown }).text === 'string'
      ? (question as unknown as { text: string }).text
      : null;

  const handleSubmit = () => {
    if (selectedAnswer) {
      onSubmit(selectedAnswer);
      setSelectedAnswer('');
    }
  };

  return (
    <div className="question-card">
      {text && (
        <div className="question-text">
          <h2>{text}</h2>
        </div>
      )}

      <div className="options">
        {question.options?.map((option, index) => (
          <div key={index} className="option">
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedAnswer === option}
              onChange={(e) => setSelectedAnswer(e.target.value)}
            />
            <label>{option}</label>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} disabled={!selectedAnswer}>
        Submit Answer
      </button>
    </div>
  );
};

export default QuestionCard;

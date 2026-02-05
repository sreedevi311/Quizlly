import React from 'react';

interface Feedback {
  questionId: number;
  isCorrect: boolean;
  explanation?: string;
  correctAnswer?: string;
  userAnswer?: string;
}

interface Props {
  feedback: Feedback;
}

const ImmediateFeedback: React.FC<Props> = ({ feedback }) => {
  return (
    <div className={`immediate-feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
      <div className="feedback-header">
        {feedback.isCorrect ? (
          <div className="success">
            <span className="icon">✓</span>
            <span className="status">Correct!</span>
          </div>
        ) : (
          <div className="error">
            <span className="icon">✗</span>
            <span className="status">Incorrect</span>
          </div>
        )}
      </div>

      {!feedback.isCorrect && feedback.userAnswer && feedback.correctAnswer && (
        <div className="answer-info">
          <div className="user-answer">
            <strong>Your answer:</strong> {feedback.userAnswer}
          </div>
          <div className="correct-answer">
            <strong>Correct answer:</strong> {feedback.correctAnswer}
          </div>
        </div>
      )}

      {feedback.explanation && (
        <div className="explanation">
          <strong>Explanation:</strong>
          <p>{feedback.explanation}</p>
        </div>
      )}

      <button className="next-button">Continue</button>
    </div>
  );
};

export default ImmediateFeedback;

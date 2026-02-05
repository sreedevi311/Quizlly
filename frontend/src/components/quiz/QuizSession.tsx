// components/quiz/QuizSession.tsx
import React, { useEffect } from 'react';
import { useQuizSession } from '../../hooks/useQuizSession';
import { useTimer } from '../../hooks/useTimer';
import QuestionCard from './QuestionCard';
import Timer from './Timer';
import ImmediateFeedback from '../feedback/ImmediateFeedback';

interface Props {
  contentId: number;
  timerEnabled: boolean;
  durationMinutes?: number;
  onComplete: () => void;
}

const QuizSession: React.FC<Props> = ({ contentId, timerEnabled, durationMinutes, onComplete }) => {
  const { session, currentQuestionIndex, feedback, startQuiz, submitAnswer } = useQuizSession();
  
  const { timeLeft, start } = useTimer(durationMinutes || 30, onComplete);

  useEffect(() => {
    startQuiz(contentId, timerEnabled, durationMinutes);
    if (timerEnabled) start();
  }, [contentId, timerEnabled, durationMinutes]);

  if (!session) return <div>Loading quiz...</div>;

  const currentQuestion = session.questions[currentQuestionIndex];
  const currentFeedback = feedback.find(f => f.questionId === currentQuestion?.id);
  const isQuizComplete = currentQuestionIndex >= session.questions.length;

  return (
    <div className="quiz-session">
      {timerEnabled && <Timer timeLeft={timeLeft} />}
      
      <div className="progress">
        Question {currentQuestionIndex + 1} of {session.questions.length}
      </div>

      {!isQuizComplete && currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          onSubmit={(answer: string) => submitAnswer(currentQuestion.id, answer)}
        />
      )}

      {currentFeedback && (
        <ImmediateFeedback feedback={currentFeedback} />
      )}

      {isQuizComplete && (
        <button onClick={onComplete}>View Results</button>
      )}
    </div>
  );
};

export default QuizSession;
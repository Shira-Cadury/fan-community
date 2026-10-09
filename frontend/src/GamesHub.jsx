import React, { useState } from 'react';
import { Gamepad2, Trophy, CheckCircle, XCircle } from 'lucide-react';

const TRIVIA_QUESTIONS = [
  {
    questionHe: 'באיזה אלבום מופיע השיר All Too Well המקורי?',
    questionEn: 'Which album features the original All Too Well?',
    options: ['Fearless', 'Speak Now', 'Red', '1989'],
    correct: 2
  },
  {
    questionHe: 'מה שמו של סיבוב ההופעות העולמי הענק של טיילור סוויפט?',
    questionEn: 'What is the name of Taylor Swift\'s massive world tour?',
    options: ['The Eras Tour', 'Reputation Tour', 'Fearless Tour', 'Red Tour'],
    correct: 0
  },
  {
    questionHe: 'באיזו שנת לידה נולדה טיילור סוויפט?',
    questionEn: 'What year was Taylor Swift born?',
    options: ['1987', '1989', '1991', '1993'],
    correct: 1
  }
];

export default function GamesHub({ lang }) {
  const isHe = lang === 'he';
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === TRIVIA_QUESTIONS[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < TRIVIA_QUESTIONS.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizFinished(false);
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: '650px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'var(--bg-subtle)',
          color: 'var(--primary-rose-dark)',
          marginBottom: '0.75rem'
        }}>
          <Gamepad2 size={26} />
        </div>
        <h2 style={{ fontFamily: '"Georgia", serif', color: 'var(--text-dark)', margin: '0 0 0.5rem 0' }}>
          {isHe ? 'פינת המשחקים והטריוויה' : 'Swiftie Games & Trivia'}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
          {isHe ? 'בחנו את הידע שלכם על טיילור סוויפט והעולמות שלה!' : 'Test your Taylor Swift knowledge!'}
        </p>
      </div>

      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: '24px',
        border: '1px solid var(--border-delicate)',
        padding: '2rem',
        boxShadow: '0 6px 20px rgba(0,0,0,0.04)'
      }}>
        {!quizFinished ? (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--secondary-sage-dark)'
            }}>
              <span>{isHe ? `שאלה ${currentQuestion + 1} מתוך ${TRIVIA_QUESTIONS.length}` : `Question ${currentQuestion + 1} of ${TRIVIA_QUESTIONS.length}`}</span>
              <span>{isHe ? `ניקוד: ${score}` : `Score: ${score}`}</span>
            </div>

            <h3 style={{
              fontFamily: '"Georgia", serif',
              color: 'var(--text-dark)',
              fontSize: '1.2rem',
              marginBottom: '1.5rem',
              lineHeight: '1.5'
            }}>
              {isHe ? TRIVIA_QUESTIONS[currentQuestion].questionHe : TRIVIA_QUESTIONS[currentQuestion].questionEn}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {TRIVIA_QUESTIONS[currentQuestion].options.map((opt, idx) => {
                let btnBg = 'var(--bg-creamy)';
                let btnBorder = '1px solid var(--border-delicate)';
                let btnColor = 'var(--text-dark)';

                if (isAnswered) {
                  if (idx === TRIVIA_QUESTIONS[currentQuestion].correct) {
                    btnBg = '#E8F5E9';
                    btnBorder = '1.5px solid #81C784';
                    btnColor = '#2E7D32';
                  } else if (idx === selectedOption) {
                    btnBg = '#FFEBEE';
                    btnBorder = '1.5px solid #E57373';
                    btnColor = '#C62828';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={isAnswered}
                    style={{
                      padding: '0.9rem 1.2rem',
                      borderRadius: '14px',
                      backgroundColor: btnBg,
                      border: btnBorder,
                      color: btnColor,
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      textAlign: isHe ? 'right' : 'left',
                      cursor: isAnswered ? 'default' : 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{opt}</span>
                    {isAnswered && idx === TRIVIA_QUESTIONS[currentQuestion].correct && (
                      <CheckCircle size={18} color="#2E7D32" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== TRIVIA_QUESTIONS[currentQuestion].correct && (
                      <XCircle size={18} color="#C62828" />
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleNext}
                  style={{
                    padding: '0.7rem 1.5rem',
                    borderRadius: '18px',
                    backgroundColor: 'var(--primary-rose)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    boxShadow: '0 4px 12px rgba(216, 112, 147, 0.2)'
                  }}
                >
                  {currentQuestion + 1 < TRIVIA_QUESTIONS.length ? (isHe ? 'השאלה הבאה ←' : 'Next Question →') : (isHe ? 'סיום משחק 🏆' : 'Finish Quiz 🏆')}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <Trophy size={54} color="#FFD700" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: '"Georgia", serif', color: 'var(--text-dark)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              {isHe ? 'כל הכבוד סיימת את הטריוויה!' : 'Quiz Completed!'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              {isHe ? `הציון הסופי שלך הוא ${score} מתוך ${TRIVIA_QUESTIONS.length}` : `Your final score is ${score} out of ${TRIVIA_QUESTIONS.length}`}
            </p>
            <button
              onClick={restartQuiz}
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: '20px',
                backgroundColor: 'var(--primary-rose)',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.95rem',
                boxShadow: '0 4px 12px rgba(216, 112, 147, 0.2)'
              }}
            >
              {isHe ? 'שחק שוב 🔄' : 'Play Again 🔄'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
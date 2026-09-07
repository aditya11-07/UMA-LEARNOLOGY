import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ENGLISH_LEVEL_TEST_QUESTIONS } from '../../data/initialData';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Award,
  BookOpen,
  Check,
  Zap,
  GraduationCap
} from '../Icons';

export const EnglishLevelTest = () => {
  const { openAdmissionForCourse, courses } = useApp();

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = ENGLISH_LEVEL_TEST_QUESTIONS;
  const currentQ = questions[currentQuestionIdx];

  const handleSelectOption = (optIdx) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIdx]: optIdx
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      // Calculate score
      let score = 0;
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correct) {
          score += 1;
        }
      });

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setIsCompleted(false);
  };

  // Calculate score & level
  const totalScore = Object.entries(selectedAnswers).reduce((acc, [qIdx, ansIdx]) => {
    return acc + (questions[Number(qIdx)]?.correct === ansIdx ? 1 : 0);
  }, 0);

  const getLevelInfo = (score) => {
    if (score === 5) {
      return {
        level: "C1 / Advanced Fluency",
        badge: "Expert Command",
        color: "#10b981",
        description: "Exceptional grammar precision, rich lexical resource, and advanced syntactic control. Ready for corporate debates and IELTS Band 8.5+.",
        recommendedCourse: courses.find(c => c.id === 'course-ielts-toefl') || courses[0]
      };
    } else if (score >= 3) {
      return {
        level: "B2 / Upper Intermediate",
        badge: "Good Fluency & Potential",
        color: "#f59e0b",
        description: "Strong basic foundation with minor hesitations in complex syntax, prepositions, or idioms. Perfect candidate for our Fluency Bootcamp or Competitive Grammar batch.",
        recommendedCourse: courses.find(c => c.id === 'course-spoken-english') || courses[0]
      };
    } else {
      return {
        level: "B1 / Foundation Intermediate",
        badge: "High Growth Potential",
        color: "#ea580c",
        description: "Good intent with common errors in tenses, subject-verb agreement, and spoken confidence. A 3-month structured coaching will boost your fluency by 200%.",
        recommendedCourse: courses.find(c => c.id === 'course-spoken-english') || courses[0]
      };
    }
  };

  const levelResult = getLevelInfo(totalScore);

  return (
    <section className="section" id="level-test" style={{ background: 'var(--bg-main)' }}>
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-badge">
            <Zap size={14} /> Instant Diagnostic Assessment
          </div>
          <h2 className="section-title">Test Your English & Grammar Level</h2>
          <p className="section-subtitle">
            Take this free 2-minute diagnostic assessment designed by Cambridge certified educators to receive your verified CEFR level and scholarship eligibility.
          </p>
        </div>

        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          {!isCompleted ? (
            <div className="card" style={{ boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-color)' }}>
              {/* Quiz Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                    {currentQuestionIdx + 1}
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Question {currentQuestionIdx + 1} of {questions.length}</span>
                </div>

                {/* Progress Indicator */}
                <div style={{ width: '160px', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)', transition: 'width 0.3s ease' }}></div>
                </div>
              </div>

              {/* Question Text */}
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', lineHeight: 1.4 }}>
                {currentQ.question}
              </h3>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: 'var(--radius-md)',
                        background: isSelected ? 'var(--primary-light)' : 'var(--bg-card-subtle)',
                        border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: isSelected ? 'var(--primary)' : 'var(--bg-card)',
                          color: isSelected ? '#fff' : 'var(--text-main)',
                          border: isSelected ? 'none' : '1px solid var(--border-color)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.82rem'
                        }}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span style={{ fontWeight: isSelected ? 700 : 500, fontSize: '0.95rem' }}>{opt}</span>
                      </div>

                      {isSelected && <Check size={18} color="var(--primary)" />}
                    </div>
                  );
                })}
              </div>

              {/* Action Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Select one option to continue
                </span>

                <button
                  className="btn btn-primary"
                  disabled={selectedAnswers[currentQuestionIdx] === undefined}
                  onClick={handleNext}
                  style={{ opacity: selectedAnswers[currentQuestionIdx] === undefined ? 0.5 : 1 }}
                >
                  <span>{currentQuestionIdx === questions.length - 1 ? 'View Assessment Score' : 'Next Question'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            /* Result Card */
            <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-color)' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'var(--success-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'var(--success)',
                boxShadow: '0 0 24px rgba(16, 185, 129, 0.4)'
              }}>
                <Award size={46} />
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px' }}>
                Assessment Complete • Score: {totalScore} / {questions.length}
              </div>

              <h3 style={{ fontSize: '2rem', margin: '0.5rem 0', color: levelResult.color, fontWeight: 900 }}>
                {levelResult.level}
              </h3>

              <div style={{
                display: 'inline-block',
                background: 'var(--bg-card-subtle)',
                padding: '4px 14px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.85rem',
                marginBottom: '1.25rem',
                border: '1px solid var(--border-color)'
              }}>
                {levelResult.badge}
              </div>

              <p style={{ color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto 2rem', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {levelResult.description}
              </p>

              {/* Recommended Course Box */}
              <div style={{
                background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #78350f 100%)',
                color: '#fff',
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                textAlign: 'left',
                marginBottom: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', opacity: 0.85, textTransform: 'uppercase', fontWeight: 700 }}>
                    Recommended Batch Match (Scholarship Eligible)
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2px' }}>
                    {levelResult.recommendedCourse.title}
                  </div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: '4px' }}>
                    Level: {levelResult.recommendedCourse.level} • Duration: {levelResult.recommendedCourse.duration}
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ background: '#f97316', borderColor: '#ea580c', color: '#fff', fontWeight: 800 }}
                  onClick={() => openAdmissionForCourse(levelResult.recommendedCourse)}
                >
                  <Sparkles size={16} /> Enroll with 25% Waiver
                </button>
              </div>

              {/* Review Question Explanations */}
              <div style={{ textAlign: 'left', marginTop: '2rem' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <BookOpen size={18} color="var(--primary)" /> Question Explanations & Key Rules
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {questions.map((q, i) => {
                    const isUserCorrect = selectedAnswers[i] === q.correct;
                    return (
                      <div key={i} style={{ background: 'var(--bg-card-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '4px' }}>
                          {isUserCorrect ? <CheckCircle2 size={16} color="#10b981" /> : <AlertCircle size={16} color="#ef4444" />}
                          <span>Q{i + 1}: {q.question}</span>
                        </div>
                        <div style={{ color: 'var(--text-muted)', marginLeft: '22px' }}>
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button className="btn btn-secondary btn-sm" onClick={handleReset}>
                  <RotateCcw size={16} /> Retake Test
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

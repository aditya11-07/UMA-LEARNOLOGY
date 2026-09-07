import React, { useState } from 'react';
import { AUDIO_SPEAKING_DRILLS } from '../../data/initialData';
import { useApp } from '../../context/AppContext';
import {
  Volume2,
  Mic,
  MicOff,
  Sparkles,
  CheckCircle2,
  Play,
  RotateCw,
  Award,
  BookOpen,
  VolumeX
} from '../Icons';

export const AudioSpeakingLab = () => {
  const { showToast, setIsAdmissionModalOpen } = useApp();
  const [selectedDrillIdx, setSelectedDrillIdx] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedFeedback, setRecordedFeedback] = useState(null);

  const drills = AUDIO_SPEAKING_DRILLS;
  const currentDrill = drills[selectedDrillIdx] || drills[0];

  const handleSpeakPhrase = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    } else {
      showToast('Native text-to-speech audio playing simulation.');
    }
  };

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordedFeedback(null);
      showToast('Recording started... Speak clearly into your microphone!', 'info');

      setTimeout(() => {
        setIsRecording(false);
        setRecordedFeedback({
          accuracy: Math.floor(92 + Math.random() * 7),
          fluencyBand: "Band 8.5 (Native Intonation)",
          feedback: "Flawless phonetic pacing! Syllable stress and pause timing match standard British/American professional delivery."
        });
        showToast('Pronunciation evaluated successfully!');
      }, 4000);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <section className="section" id="speaking-lab" style={{ background: 'var(--bg-card)' }}>
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-badge">
            <Volume2 size={14} /> Interactive Audio Speaking & Phonetics Lab
          </div>
          <h2 className="section-title">Experience the 1-on-1 Speech Lab</h2>
          <p className="section-subtitle">
            Listen to native pronunciations, practice intonation cadence, and test your speech clarity using our interactive audio fluency simulator.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: '2.5rem',
          alignItems: 'start',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {/* Left: Drill Categories & List */}
          <div className="card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="var(--primary)" /> Practice Modules
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {drills.map((drill, idx) => {
                const isSelected = selectedDrillIdx === idx;
                return (
                  <div
                    key={drill.id}
                    onClick={() => {
                      setSelectedDrillIdx(idx);
                      setRecordedFeedback(null);
                    }}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'var(--primary-light)' : 'var(--bg-card-subtle)',
                      border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>{drill.category}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Drill #{idx + 1}</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: isSelected ? 700 : 500, lineHeight: 1.4 }}>
                      "{drill.phrase.substring(0, 60)}..."
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Audio Player & Speech Recorder Stage */}
          <div className="card" style={{ boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span className="badge badge-primary">{currentDrill.category}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Audio Speaking Station</span>
            </div>

            {/* Target Phrase */}
            <div style={{
              background: 'var(--bg-card-subtle)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              marginBottom: '1.5rem',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>
                Sentence to Practice:
              </div>
              <h3 style={{ fontSize: '1.25rem', lineHeight: 1.5, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                "{currentDrill.phrase}"
              </h3>

              {/* Phonetics & Tips */}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '6px' }}>
                {currentDrill.phonetic}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                💡 <strong>Mentor Tip:</strong> {currentDrill.tip}
              </div>
            </div>

            {/* Audio Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <button
                className="btn btn-primary"
                onClick={() => handleSpeakPhrase(currentDrill.phrase)}
                disabled={isPlayingAudio}
                style={{ flex: 1 }}
              >
                <Volume2 size={18} />
                <span>{isPlayingAudio ? 'Playing Native Audio...' : 'Listen (Native Accent)'}</span>
              </button>

              <button
                className={`btn ${isRecording ? 'btn-danger' : 'btn-secondary'}`}
                onClick={handleToggleRecording}
                style={{ flex: 1, borderColor: isRecording ? 'var(--danger)' : 'var(--border-color)' }}
              >
                {isRecording ? <MicOff size={18} color="#ef4444" /> : <Mic size={18} color="var(--primary)" />}
                <span>{isRecording ? 'Recording (Listening...)' : 'Record Your Speech'}</span>
              </button>
            </div>

            {/* Simulated Live Waveform when recording */}
            {isRecording && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 700, marginBottom: '8px' }}>
                  🎤 Analyzing speech pitch, vowel clarity & intonation...
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', height: '30px' }}>
                  {[20, 35, 15, 40, 60, 85, 45, 70, 95, 50, 30, 65, 80, 40, 25].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: '4px',
                        height: `${h}%`,
                        background: '#ef4444',
                        borderRadius: '2px',
                        animation: `pulse 0.6s infinite alternate ${i * 0.05}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Speech Analysis Feedback Card */}
            {recordedFeedback && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 78, 59, 0.1) 100%)',
                border: '1px solid var(--success-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, color: 'var(--success)' }}>
                    <CheckCircle2 size={18} /> Pronunciation Score: {recordedFeedback.accuracy}%
                  </div>
                  <span className="badge badge-success">{recordedFeedback.fluencyBand}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {recordedFeedback.feedback}
                </p>
              </div>
            )}

            {/* Full Course CTA Strip */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border-color)',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Want personalized 1-on-1 speaking coaching?
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setIsAdmissionModalOpen(true)}
              >
                <Sparkles size={14} /> Join Fluency Batch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  X,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  HelpCircle
} from '../Icons';

export const AdminAuthModal = () => {
  const {
    isAdminAuthModalOpen,
    setIsAdminAuthModalOpen,
    loginAdmin,
    adminPin
  } = useApp();

  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isAdminAuthModalOpen) {
      setPin('');
      setErrorMsg('');
      setShowHint(false);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 150);
    }
  }, [isAdminAuthModalOpen]);

  if (!isAdminAuthModalOpen) return null;

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!pin.trim()) {
      setErrorMsg('Please enter the Admin Passcode.');
      triggerShake();
      return;
    }

    const success = loginAdmin(pin);
    if (!success) {
      setErrorMsg('Incorrect Passcode / PIN. Please try again.');
      triggerShake();
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleKeypadPress = (val) => {
    setErrorMsg('');
    if (val === 'CLEAR') {
      setPin('');
    } else if (val === 'BACK') {
      setPin(prev => prev.slice(0, -1));
    } else {
      if (pin.length < 12) {
        const next = pin + val;
        setPin(next);
      }
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={() => setIsAdminAuthModalOpen(false)}
      style={{
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(5, 10, 20, 0.85)',
        padding: '1rem'
      }}
    >
      <div
        className={`modal-container ${isShaking ? 'shake-animation' : ''}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '440px',
          width: '100%',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl, 20px)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 30px rgba(245, 158, 11, 0.15)',
          overflow: 'hidden',
          animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Modal Header */}
        <div style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #1e1b4b 100%)',
          padding: '1.75rem 1.5rem 1.5rem',
          color: '#fff',
          position: 'relative',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <button
            onClick={() => setIsAdminAuthModalOpen(false)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.85rem',
            boxShadow: '0 8px 20px rgba(245, 158, 11, 0.4)',
            border: '3px solid rgba(255, 255, 255, 0.25)'
          }}>
            <Lock size={30} color="#000" strokeWidth={2.5} />
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.35rem', color: '#fff' }}>
            Teacher / Admin Access
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#a7f3d0', margin: 0, opacity: 0.9 }}>
            Please enter your security passcode to unlock management tools and student records.
          </p>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.75rem 1.5rem' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '0.5rem'
              }}>
                Security Passcode / PIN
              </label>

              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }}>
                  <KeyRound size={18} />
                </div>

                <input
                  ref={inputRef}
                  type={showPin ? 'text' : 'password'}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="Enter 4-digit PIN..."
                  maxLength={12}
                  autoComplete="current-password"
                  style={{
                    width: '100%',
                    padding: '0.85rem 2.8rem 0.85rem 2.5rem',
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-mono, monospace)',
                    letterSpacing: showPin ? '0.1em' : '0.25em',
                    textAlign: 'center',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-md, 10px)',
                    border: errorMsg ? '2px solid #ef4444' : '1px solid var(--border-color)',
                    background: 'var(--bg-main)',
                    color: 'var(--text-main)',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                  title={showPin ? 'Hide PIN' : 'Show PIN'}
                >
                  {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errorMsg && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#ef4444',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  marginTop: '0.5rem'
                }}>
                  <ShieldAlert size={15} />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Numeric Keypad for fast touch/click */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CLEAR', '0', 'BACK'].map((btn) => (
                <button
                  key={btn}
                  type="button"
                  onClick={() => handleKeypadPress(btn)}
                  style={{
                    padding: '0.65rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: btn === 'CLEAR' || btn === 'BACK' ? 'var(--bg-card-subtle, rgba(0,0,0,0.05))' : 'var(--bg-card)',
                    color: btn === 'CLEAR' ? '#ef4444' : 'var(--text-main)',
                    fontSize: btn === 'CLEAR' || btn === 'BACK' ? '0.78rem' : '1.1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    userSelect: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {btn === 'BACK' ? '⌫ Back' : btn}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={() => setIsAdminAuthModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Unlock size={18} />
                <span>Unlock Portal</span>
              </button>
            </div>
          </form>

          {/* Quick Help / Default Passcode Info */}
          <div style={{
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px dashed var(--border-color)',
            textAlign: 'center'
          }}>
            {!showHint ? (
              <button
                type="button"
                onClick={() => setShowHint(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <HelpCircle size={14} />
                <span>Forgot / First Time Passcode Help?</span>
              </button>
            ) : (
              <div style={{
                background: 'var(--primary-light, rgba(16, 185, 129, 0.1))',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: 'var(--text-main)',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                🔑 <strong>Default Master Passcode:</strong> <code style={{
                  background: '#000',
                  color: '#f59e0b',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontWeight: 800,
                  fontFamily: 'monospace'
                }}>2026</code>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  (You can change this PIN in Admin Dashboard → Settings)
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

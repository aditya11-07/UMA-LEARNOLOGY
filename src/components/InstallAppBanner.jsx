import React, { useState, useEffect } from 'react';
import { Download, Sparkles, X, Smartphone, CheckCircle2, Share2, PlusSquare, ArrowUpRight } from './Icons';

export const InstallAppBanner = ({ isOpenManual = false, onCloseManual }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);

  useEffect(() => {
    // Check if already installed & running in standalone mode
    const isRunningStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://');

    setIsStandalone(isRunningStandalone);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Check session dismiss status
    const dismissed = sessionStorage.getItem('uma_install_dismissed') === 'true';
    setIsBannerDismissed(dismissed);

    // Listen for beforeinstallprompt (Chrome / Android / Edge)
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      window.__umaInstallPrompt = e;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosGuide(true);
      return;
    }

    const prompt = deferredPrompt || window.__umaInstallPrompt;
    if (prompt) {
      prompt.prompt();
      const { outcome } = await prompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        window.__umaInstallPrompt = null;
      }
    } else {
      // Fallback for browsers that don't support beforeinstallprompt
      setShowIosGuide(true);
    }
  };

  const handleDismiss = () => {
    setIsBannerDismissed(true);
    sessionStorage.setItem('uma_install_dismissed', 'true');
  };

  // If already installed or user opened manually
  if (isStandalone && !isOpenManual) return null;

  // Manual iOS / Desktop Guide Modal
  const renderGuideModal = (
    <div className="modal-backdrop" onClick={() => { setShowIosGuide(false); onCloseManual && onCloseManual(); }}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)'
            }}>
              <Smartphone size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Install UMA Learnology App</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Add to your Home Screen for full-screen offline access
              </p>
            </div>
          </div>
          <button className="btn btn-secondary btn-icon-only" onClick={() => { setShowIosGuide(false); onCloseManual && onCloseManual(); }}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {isIos ? (
            /* iOS Safari Instructions */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                background: 'var(--bg-card-subtle)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ background: 'var(--primary)', color: '#000', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                  1
                </div>
                <div style={{ fontSize: '0.88rem' }}>
                  Tap the <strong>Share button</strong> in Safari toolbar at the bottom of your screen.
                </div>
              </div>

              <div style={{
                background: 'var(--bg-card-subtle)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ background: 'var(--primary)', color: '#000', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                  2
                </div>
                <div style={{ fontSize: '0.88rem' }}>
                  Scroll down and tap <strong>"Add to Home Screen"</strong> (➕).
                </div>
              </div>

              <div style={{
                background: 'var(--bg-card-subtle)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ background: 'var(--primary)', color: '#000', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
                  3
                </div>
                <div style={{ fontSize: '0.88rem' }}>
                  Tap <strong>"Add"</strong> in the top-right corner. Launch UMA Learnology directly like a native iOS app!
                </div>
              </div>
            </div>
          ) : (
            /* Android / Chrome / Desktop Instructions */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span style={{ fontSize: '0.88rem' }}>Instant launch from your Android App Drawer or Windows Taskbar</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span style={{ fontSize: '0.88rem' }}>Offline access to study materials, syllabus, and contact hotline</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span style={{ fontSize: '0.88rem' }}>No storage overhead & automatic background updates</span>
              </div>

              <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.75rem', justifyContent: 'center' }}
                  onClick={() => {
                    const prompt = deferredPrompt || window.__umaInstallPrompt;
                    if (prompt) {
                      prompt.prompt();
                    } else {
                      alert('In Chrome/Edge on Desktop or Android, click the install icon (⬇️) in your address bar or browser menu.');
                    }
                    setShowIosGuide(false);
                    onCloseManual && onCloseManual();
                  }}
                >
                  <Download size={16} /> Tap to Install Now
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer" style={{ justifyContent: 'center' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => { setShowIosGuide(false); onCloseManual && onCloseManual(); }}>
            Got it, Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Floating Bottom App Install Bar (visible if not dismissed and not standalone) */}
      {!isBannerDismissed && !isStandalone && (
        <div
          className="no-print"
          style={{
            position: 'fixed',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 32px)',
            maxWidth: '640px',
            zIndex: 999,
            background: 'rgba(15, 23, 42, 0.94)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '16px',
            padding: '0.85rem 1.25rem',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(245, 158, 11, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            animation: 'slideUp 0.35s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              overflow: 'hidden',
              background: '#fff',
              border: '2px solid var(--primary)',
              flexShrink: 0
            }}>
              <img src="/logo.png" alt="UMA Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#fff', whiteSpace: 'nowrap' }}>
                  UMA Learnology App
                </span>
                <span className="badge badge-primary" style={{ fontSize: '0.62rem', padding: '2px 6px' }}>
                  FREE PWA
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Install to phone home screen for instant lectures & offline access
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleInstallClick}
              style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Download size={14} />
              <span>Install App</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-icon-only btn-sm"
              onClick={handleDismiss}
              style={{ width: '28px', height: '28px', padding: 0 }}
              title="Dismiss for this session"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Manual / iOS Modal Trigger */}
      {(showIosGuide || isOpenManual) && renderGuideModal}
    </>
  );
};

import React, { useState, useEffect } from 'react';
import defaultLogo from '../assets/logo.png';
import {
  Download,
  Sparkles,
  X,
  Smartphone,
  CheckCircle2,
  Share2,
  PlusSquare,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe,
  Wifi,
  Laptop
} from './Icons';

export const InstallAppBanner = ({ isOpenManual = false, onCloseManual }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [activeTab, setActiveTab] = useState('android'); // 'android' | 'ios' | 'desktop'
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [isInstalledSuccess, setIsInstalledSuccess] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed as PWA)
    const isRunningStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://');

    setIsStandalone(isRunningStandalone);

    // Auto-detect platform for active tab
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setActiveTab('ios');
    } else if (/android/.test(userAgent)) {
      setActiveTab('android');
    } else {
      setActiveTab('desktop');
    }

    // Check session dismiss status
    const dismissed = sessionStorage.getItem('uma_install_dismissed') === 'true';
    setIsBannerDismissed(dismissed);

    // Listen for beforeinstallprompt
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      window.__umaInstallPrompt = e;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Listen for appinstalled
    const handleAppInstalled = () => {
      setIsInstalledSuccess(true);
      setDeferredPrompt(null);
      window.__umaInstallPrompt = null;
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    const prompt = deferredPrompt || window.__umaInstallPrompt;
    if (prompt) {
      prompt.prompt();
      const { outcome } = await prompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalledSuccess(true);
        setDeferredPrompt(null);
        window.__umaInstallPrompt = null;
      }
    } else {
      // If no native prompt event, open the step-by-step guide modal
      if (onCloseManual) {
        // Already in manual modal, switch to respective tab
      }
    }
  };

  const handleDismiss = () => {
    setIsBannerDismissed(true);
    sessionStorage.setItem('uma_install_dismissed', 'true');
  };

  // If already running standalone and not opened from menu, hide floating banner
  const showBanner = !isBannerDismissed && !isStandalone;
  const showModal = isOpenManual;

  // Manual Multi-Platform Guide Modal
  const renderGuideModal = (
    <div className="modal-backdrop" onClick={onCloseManual} style={{ zIndex: 1100 }}>
      <div
        className="modal-card modal-card-lg"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '560px', borderRadius: '24px', overflow: 'hidden' }}
      >
        {/* Header */}
        <div
          className="modal-header"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: '#fff',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.25rem 1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#ffffff',
                border: '2px solid #f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                flexShrink: 0
              }}
            >
              <img src={defaultLogo} alt="UMA Classes Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                Download & Install UMA Learnology
              </h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8' }}>
                Official Standalone Progressive Web App (PWA)
              </p>
            </div>
          </div>
          <button
            className="btn btn-secondary btn-icon-only"
            onClick={onCloseManual}
            style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#fff', border: 'none', width: '32px', height: '32px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Direct 1-Click Install CTA Box */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
              border: '1.5px solid rgba(234, 88, 12, 0.3)',
              borderRadius: '16px',
              padding: '1.15rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={16} color="var(--primary)" /> 1-Click Fast Installation
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Install directly to your home screen or desktop taskbar.
              </div>
            </div>

            <button
              className="btn btn-primary btn-sm"
              onClick={handleInstallClick}
              style={{ padding: '0.55rem 1.15rem', fontWeight: 800, flexShrink: 0 }}
            >
              <Download size={15} /> Install Now
            </button>
          </div>

          {/* Platform Switcher Tabs */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Step-by-Step Installation Guides:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              <button
                className={`btn btn-sm ${activeTab === 'android' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setActiveTab('android')}
                style={{ fontSize: '0.8rem', padding: '0.5rem 0.25rem' }}
              >
                <Smartphone size={14} /> Android
              </button>
              <button
                className={`btn btn-sm ${activeTab === 'ios' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setActiveTab('ios')}
                style={{ fontSize: '0.8rem', padding: '0.5rem 0.25rem' }}
              >
                🍏 iPhone/iPad
              </button>
              <button
                className={`btn btn-sm ${activeTab === 'desktop' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setActiveTab('desktop')}
                style={{ fontSize: '0.8rem', padding: '0.5rem 0.25rem' }}
              >
                <Laptop size={14} /> PC / Mac
              </button>
            </div>
          </div>

          {/* Step Instructions Content */}
          <div style={{ background: 'var(--bg-card-subtle)', borderRadius: '14px', padding: '1.15rem', border: '1px solid var(--border-color)' }}>
            {activeTab === 'android' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0 }}>
                    1
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>
                    Open website in <strong>Google Chrome</strong> or Samsung Internet.
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0 }}>
                    2
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>
                    Tap the <strong>three dots menu (⋮)</strong> at the top right of your browser.
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0 }}>
                    3
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>
                    Select <strong>"Install App"</strong> or <strong>"Add to Home screen"</strong>.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ios' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0 }}>
                    1
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>
                    Open this website in <strong>Safari Browser</strong> on your iPhone or iPad.
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0 }}>
                    2
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>
                    Tap the <strong>Share button (rectangle with arrow pointing up)</strong> at the bottom toolbar.
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0 }}>
                    3
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>
                    Scroll down and tap <strong>"Add to Home Screen" (➕)</strong>, then tap <strong>Add</strong>.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'desktop' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0 }}>
                    1
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>
                    Open in <strong>Google Chrome</strong> or <strong>Microsoft Edge</strong> on Windows / Mac.
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0 }}>
                    2
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>
                    Click the <strong>Install icon (🖥️ / ⬇️)</strong> located in the right side of the address bar.
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0 }}>
                    3
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>
                    Click <strong>"Install"</strong> to launch as a dedicated standalone desktop app!
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* App Key Highlights */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.78rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} color="#10b981" />
              <span>Full Screen Standalone UI</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} color="#10b981" />
              <span>Offline Video Notes & Syllabus</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} color="#10b981" />
              <span>Smart Student ID Badge</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} color="#10b981" />
              <span>Auto-Updates / Zero Storage</span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Status: {isStandalone ? '✅ Running in App Mode' : '🌐 Browser Mode'}
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onCloseManual}>
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Floating Bottom App Install Bar (visible if not dismissed and not standalone) */}
      {showBanner && (
        <div
          className="no-print"
          style={{
            position: 'fixed',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 32px)',
            maxWidth: '620px',
            zIndex: 999,
            background: 'rgba(15, 23, 42, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
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
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                overflow: 'hidden',
                background: '#fff',
                border: '2px solid var(--primary)',
                flexShrink: 0
              }}
            >
              <img src={defaultLogo} alt="UMA Classes Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#fff', whiteSpace: 'nowrap' }}>
                  UMA Learnology App
                </span>
                <span className="badge badge-primary" style={{ fontSize: '0.62rem', padding: '2px 6px' }}>
                  OFFICIAL PWA
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                Install to phone home screen or desktop for offline access
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

      {/* Manual / Menu Trigger Modal */}
      {showModal && renderGuideModal}
    </>
  );
};

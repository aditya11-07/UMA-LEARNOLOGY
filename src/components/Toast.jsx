import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from './Icons';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'error':
        return <AlertCircle size={20} color="#ef4444" />;
      case 'warning':
        return <AlertTriangle size={20} color="#f59e0b" />;
      case 'info':
        return <Info size={20} color="#0284c7" />;
      default:
        return <CheckCircle2 size={20} color="#10b981" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'error': return 'rgba(239, 68, 68, 0.4)';
      case 'warning': return 'rgba(245, 158, 11, 0.4)';
      case 'info': return 'rgba(2, 132, 199, 0.4)';
      default: return 'rgba(16, 185, 129, 0.4)';
    }
  };

  return (
    <div
      className="no-print"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 20px',
        borderRadius: '14px',
        background: 'var(--bg-card)',
        color: 'var(--text-main)',
        boxShadow: 'var(--shadow-xl)',
        border: `1px solid ${getBorderColor()}`,
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        maxWidth: '420px'
      }}
    >
      <div style={{ flexShrink: 0 }}>{getIcon()}</div>
      <span style={{ fontSize: '0.92rem', fontWeight: 600, lineHeight: 1.4 }}>{toast.message}</span>
    </div>
  );
};

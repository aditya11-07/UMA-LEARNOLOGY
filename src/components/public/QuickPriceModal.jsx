import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, DollarSign, Save, Sparkles, BookOpen } from '../Icons';

export const QuickPriceModal = ({ isOpen, onClose, course = null }) => {
  const { updateCoursePrice } = useApp();
  const [totalFee, setTotalFee] = useState('');
  const [installments, setInstallments] = useState(2);

  useEffect(() => {
    if (course) {
      setTotalFee(course.totalFee || '');
      setInstallments(course.installments || 2);
    }
  }, [course, isOpen]);

  if (!isOpen || !course) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCoursePrice(course.id, totalFee, installments);
    onClose();
  };

  const perInstallment = installments > 0 ? Math.round(Number(totalFee || 0) / installments) : Number(totalFee || 0);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card modal-card-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <DollarSign size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Fast Price & Fee Editor</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {course.title}
              </p>
            </div>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={onClose} style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Total Program Fee (₹) *</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: 'var(--text-muted)' }}>₹</span>
              <input
                type="number"
                min="0"
                step="500"
                required
                className="form-control"
                style={{ paddingLeft: '32px', fontSize: '1.2rem', fontWeight: 800 }}
                value={totalFee}
                onChange={(e) => setTotalFee(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Available Installment Options</label>
            <select
              className="form-control"
              value={installments}
              onChange={(e) => setInstallments(Number(e.target.value))}
            >
              <option value="1">1 (Full One-Time Payment)</option>
              <option value="2">2 Installments (₹{Math.round(Number(totalFee || 0)/2).toLocaleString()} x 2)</option>
              <option value="3">3 Installments (₹{Math.round(Number(totalFee || 0)/3).toLocaleString()} x 3)</option>
              <option value="4">4 Installments (₹{Math.round(Number(totalFee || 0)/4).toLocaleString()} x 4)</option>
            </select>
          </div>

          <div style={{
            background: 'var(--bg-card-subtle)',
            padding: '0.85rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            fontSize: '0.85rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Student Monthly Breakdown:</span>
              <strong>₹{perInstallment.toLocaleString()} / installment</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary)', fontWeight: 700 }}>
              <span>Total Payable:</span>
              <span>₹{Number(totalFee || 0).toLocaleString()}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} /> Save Price
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

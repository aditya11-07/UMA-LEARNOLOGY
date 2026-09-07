import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Bell, Plus, Trash2, Save } from '../Icons';

export const QuickNoticeModal = ({ isOpen, onClose }) => {
  const { notices, addNotice, deleteNotice } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Admissions'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;
    addNotice({
      title: formData.title,
      content: formData.content,
      category: formData.category,
      isUrgent: true,
      publishedDate: new Date().toISOString().split('T')[0]
    });
    setFormData({ title: '', content: '', category: 'Admissions' });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
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
              <Bell size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Teacher Editor: Announcement Ticker</h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Add or remove breaking top ticker announcements visible to all visitors
              </p>
            </div>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={onClose} style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', padding: '1.5rem' }}>
          {/* Left Column: Existing Notices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '420px', overflowY: 'auto' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              Active Ticker Notices ({notices.length})
            </div>

            {notices.map((notice) => (
              <div
                key={notice.id}
                style={{
                  background: 'var(--bg-card-subtle)',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '8px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{notice.category}</span>
                    <strong style={{ fontSize: '0.9rem' }}>{notice.title}</strong>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {notice.content}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => deleteNotice(notice.id)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '4px' }}
                  title="Delete Notice"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Right Column: New Notice Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={16} /> Post Breaking Announcement
            </div>

            <div className="form-group">
              <label className="form-label">Category Badge</label>
              <select
                className="form-control"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Admissions">Admissions</option>
                <option value="Scholarship">Scholarship</option>
                <option value="YouTube Live">YouTube Live</option>
                <option value="Exam Alert">Exam Alert</option>
                <option value="Weekend Workshop">Weekend Workshop</option>
                <option value="Holiday Notice">Holiday Notice</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Headline / Title *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="e.g. Free 3-Day Demo Starting Monday"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Announcement Text *</label>
              <textarea
                rows="3"
                required
                className="form-control"
                placeholder="Details of the announcement (e.g., Register now for Super-30 batch slots...)"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
              <Save size={16} /> Publish Announcement
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

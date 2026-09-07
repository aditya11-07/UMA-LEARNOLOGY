import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare, Plus, Edit, Trash2 } from '../Icons';
import { useApp } from '../../context/AppContext';

export const FAQSection = ({ onOpenEdit }) => {
  const {
    faqs,
    deleteFaq,
    isTeacherMode,
    setIsEditFaqModalOpen,
    setEditingFaq,
    coachingInfo,
    setIsAdmissionModalOpen
  } = useApp();

  const [openIdx, setOpenIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = (faqs || []).filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (idx) => {
    setOpenIdx(prev => (prev === idx ? null : idx));
  };

  const handleOpenAddModal = () => {
    if (setEditingFaq) setEditingFaq(null);
    if (onOpenEdit) onOpenEdit(null);
    else if (setIsEditFaqModalOpen) setIsEditFaqModalOpen(true);
  };

  const handleOpenEditModal = (faq, e) => {
    e.stopPropagation();
    if (setEditingFaq) setEditingFaq(faq);
    if (onOpenEdit) onOpenEdit(faq.id);
    else if (setIsEditFaqModalOpen) setIsEditFaqModalOpen(true);
  };

  const handleDeleteFaq = (faq, e) => {
    e.stopPropagation();
    if (confirm(`Delete FAQ: "${faq.question}"?`)) {
      deleteFaq(faq.id);
    }
  };

  return (
    <section className="section" id="faqs" style={{ background: 'var(--bg-main)' }}>
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-badge">
            <HelpCircle size={14} /> Questions & Answers
          </div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find immediate answers about our demo classes, batch timings, hybrid modes, fee installment plans, and Cambridge certified mentorship.
          </p>

          {isTeacherMode && (
            <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleOpenAddModal}
                style={{ borderRadius: 'var(--radius-full)', padding: '0.35rem 0.9rem', fontSize: '0.78rem' }}
              >
                <Plus size={13} /> Teacher: Add New FAQ Question
              </button>
            </div>
          )}
        </div>

        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          {/* Search bar */}
          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search questions (e.g., demo class, installments, certificate, hybrid)..."
              className="form-control"
              style={{ paddingLeft: '46px', borderRadius: 'var(--radius-full)' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Accordion List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={faq.id || idx}
                  className="card"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    border: isOpen ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div
                    onClick={() => toggleFaq(idx)}
                    style={{
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      background: isOpen ? 'var(--bg-card-subtle)' : 'var(--bg-card)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700, background: 'var(--primary-light)', padding: '2px 8px', borderRadius: '4px' }}>
                        {faq.category}
                      </span>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
                        {faq.question}
                      </h3>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '1rem', flexShrink: 0 }}>
                      {isTeacherMode && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} onClick={(e) => e.stopPropagation()}>
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '2px 6px', fontSize: '0.7rem', height: '22px' }}
                            onClick={(e) => handleOpenEditModal(faq, e)}
                            title="Edit FAQ as Teacher"
                          >
                            <Edit size={11} /> Edit
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '2px 6px', fontSize: '0.7rem', height: '22px', color: 'var(--danger)' }}
                            onClick={(e) => handleDeleteFaq(faq, e)}
                            title="Delete FAQ"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      )}
                      <div style={{ color: 'var(--primary)' }}>
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                  </div>

                  {isOpen && (
                    <div style={{
                      padding: '1.25rem 1.5rem',
                      fontSize: '0.92rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.65,
                      borderTop: '1px solid var(--border-subtle)',
                      background: 'var(--bg-card)'
                    }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredFaqs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
              <HelpCircle size={40} style={{ margin: '0 auto 0.75rem', opacity: 0.4 }} />
              <p>No matching questions found.</p>
              {isTeacherMode && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleOpenAddModal}
                  style={{ marginTop: '0.5rem' }}
                >
                  <Plus size={14} /> Add This Question Now
                </button>
              )}
            </div>
          )}

          {/* Still have questions card */}
          <div style={{
            marginTop: '3rem',
            background: 'var(--bg-card-subtle)',
            padding: '1.5rem 2rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '2px' }}>Have more specific questions?</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Speak directly with an academic counselor on our helpline: <strong>{coachingInfo.phone}</strong>
              </p>
            </div>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => setIsAdmissionModalOpen(true)}
            >
              <MessageSquare size={16} /> Request Callback
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


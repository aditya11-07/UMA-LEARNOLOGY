import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  GraduationCap,
  Calendar,
  CreditCard,
  CheckCircle2,
  Minimize2
} from '../Icons';

export const LiveAICounselor = () => {
  const { coachingInfo, setIsAdmissionModalOpen, openAdmissionForCourse, courses, showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hello! 👋 I'm **Uma Advisor**, your instant academic counselor for **${coachingInfo.name}**.\n\nHow can I assist your learning journey today? Feel free to ask about batch timings, fees, demo classes, or course recommendations!`,
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const quickChips = [
    "What are the batch fees?",
    "When do new batches start?",
    "How to book a free demo?",
    "IELTS Band 8 preparation",
    "Spoken English vs Grammar"
  ];

  const generateBotReply = (userQuery) => {
    const q = userQuery.toLowerCase();

    if (q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('installment')) {
      return `Our comprehensive programs range from ₹18,000 to ₹28,000 for English modules, and ₹65,000 for the Science Foundation. Flexible **2 to 3 zero-interest installments** and up to **90% merit scholarship waivers** are available!\n\nWould you like me to open the Fee Calculator?`;
    }

    if (q.includes('demo') || q.includes('book') || q.includes('trial') || q.includes('admission')) {
      return `You can attend a **Free 3-Day Live Demo Masterclass** without any upfront payment! Simply click below to reserve your seat in the upcoming batch.`;
    }

    if (q.includes('batch') || q.includes('timing') || q.includes('time') || q.includes('when')) {
      return `We run **Morning Batches (7:30 AM - 9:00 AM)**, **Evening Batches (6:30 PM - 8:00 PM)**, and **Special Weekend Batches**. New batches start every Monday with only 30 students per cohort!`;
    }

    if (q.includes('ielts') || q.includes('toefl') || q.includes('abroad')) {
      return `Our **IELTS & TOEFL Academic Pinnacle Batch** is led by certified British Council & IDP trainers, with unlimited 1-on-1 speaking interview mock drills and Task 2 essay reviews aiming for **Band 8.5+**!`;
    }

    if (q.includes('spoken') || q.includes('hesitation') || q.includes('speak') || q.includes('fluency')) {
      return `Our **Master Spoken English & Fluency Bootcamp** features daily 1-on-1 audio speech lab drills, accent reduction, phonetic guidance, and group discussions to completely eradicate stage fear and hesitation within 90 days!`;
    }

    if (q.includes('location') || q.includes('address') || q.includes('where') || q.includes('offline')) {
      return `Our main campus is at **${coachingInfo.address}, ${coachingInfo.city}**. All classes are 100% hybrid, allowing you to attend in-person or live stream in HD on your Student Portal.`;
    }

    return `Thank you for your question! **${coachingInfo.name}** provides premier coaching in Spoken English, Grammar for Competitive Exams, IELTS/TOEFL, and School Boards. You can book a free demo or connect directly with our chief mentor on **${coachingInfo.phone}**.`;
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const newMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const reply = generateBotReply(query);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 800);
  };

  return (
    <div className="no-print">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 99,
            background: 'linear-gradient(135deg, #ea580c 0%, #10b981 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 10px 30px rgba(234, 88, 12, 0.45)',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            fontWeight: 800,
            fontSize: '0.95rem'
          }}
          className="live-chat-trigger"
        >
          <div style={{ position: 'relative' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={20} />
            </div>
            <div style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#10b981',
              border: '2px solid #fff'
            }}></div>
          </div>
          <span>Chat with Counselor</span>
        </button>
      )}

      {/* Floating Chatbot Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 100,
          width: '380px',
          maxWidth: '92vw',
          height: '520px',
          maxHeight: '85vh',
          background: 'var(--bg-card)',
          borderRadius: '20px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'modalScale 0.25s ease'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #1e1b4b 100%)',
            color: '#fff',
            padding: '1rem 1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f59e0b', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                <Bot size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.98rem' }}>Uma Academic Advisor</div>
                <div style={{ fontSize: '0.72rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399' }}></span>
                  Online • Admissions Desk
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '1.25rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            background: 'var(--bg-main)'
          }}>
            {messages.map((m, i) => {
              const isBot = m.sender === 'bot';
              return (
                <div
                  key={i}
                  style={{
                    alignSelf: isBot ? 'flex-start' : 'flex-end',
                    maxWidth: '85%',
                    background: isBot ? 'var(--bg-card)' : 'linear-gradient(135deg, var(--primary) 0%, #c2410c 100%)',
                    color: isBot ? 'var(--text-main)' : '#fff',
                    padding: '0.85rem 1rem',
                    borderRadius: isBot ? '14px 14px 14px 2px' : '14px 14px 2px 14px',
                    border: isBot ? '1px solid var(--border-color)' : 'none',
                    fontSize: '0.86rem',
                    lineHeight: 1.5,
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>
                  <div style={{ fontSize: '0.68rem', opacity: 0.7, textAlign: 'right', marginTop: '4px' }}>
                    {m.time}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div style={{ alignSelf: 'flex-start', background: 'var(--bg-card)', padding: '8px 14px', borderRadius: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Uma Advisor is typing...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div style={{
            padding: '0.5rem 0.75rem',
            background: 'var(--bg-card-subtle)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            gap: '0.35rem',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}>
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-muted)',
                  fontSize: '0.74rem',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  flexShrink: 0
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div style={{
            padding: '0.75rem',
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <input
              type="text"
              placeholder="Ask anything about batches or fees..."
              className="form-control"
              style={{ fontSize: '0.85rem', padding: '0.6rem 0.85rem' }}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <button
              className="btn btn-primary btn-icon-only"
              style={{ width: '38px', height: '38px', flexShrink: 0 }}
              onClick={() => handleSendMessage()}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

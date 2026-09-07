import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FeeReceiptModal } from './FeeReceiptModal';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Search,
  Plus,
  Printer,
  FileText,
  Send,
  QrCode,
  Wallet,
  Building,
  User,
  ArrowRight,
  Sparkles,
  X,
  Download,
  MessageCircle,
  Clock
} from '../Icons';

export const FeeManagement = () => {
  const {
    students,
    transactions,
    recordFeePayment,
    activeReceipt,
    setActiveReceipt,
    coachingInfo,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isCollectModalOpen, setIsCollectModalOpen] = useState(false);
  const [selectedStudentForPay, setSelectedStudentForPay] = useState(null);

  // Form State for Payment
  const [payAmount, setPayAmount] = useState('');
  const [payMode, setPayMode] = useState('UPI');
  const [payRemarks, setPayRemarks] = useState('');

  // WhatsApp Reminder Modal
  const [reminderModalStudent, setReminderModalStudent] = useState(null);

  // Calculations
  const totalValue = students.reduce((acc, s) => acc + (Number(s.totalFee) || 0), 0);
  const totalCollected = students.reduce((acc, s) => acc + (Number(s.paidFee) || 0), 0);
  const totalPending = totalValue - totalCollected;
  const collectionRate = totalValue > 0 ? ((totalCollected / totalValue) * 100).toFixed(1) : 0;

  const filteredStudents = students.filter(s => {
    const matchesFilter = filterStatus === 'All' || s.feeStatus === filterStatus;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.batch.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleOpenCollectModal = (student) => {
    setSelectedStudentForPay(student);
    const balance = (Number(student.totalFee) || 0) - (Number(student.paidFee) || 0);
    setPayAmount(balance > 0 ? String(balance) : '10000');
    setPayRemarks(`Tuition Fee Installment Payment for ${student.batch}`);
    setIsCollectModalOpen(true);
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    if (!selectedStudentForPay || !payAmount || Number(payAmount) <= 0) {
      showToast('Please enter a valid payment amount.', 'error');
      return;
    }

    try {
      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    recordFeePayment({
      studentId: selectedStudentForPay.id,
      amount: payAmount,
      paymentMode: payMode,
      remarks: payRemarks,
      collectedBy: 'Accounts Desk — Official Billing'
    });

    setIsCollectModalOpen(false);
  };

  // Export Transactions as CSV
  const handleExportCSV = () => {
    const headers = ['Receipt No', 'Roll No', 'Student Name', 'Course', 'Amount (INR)', 'Payment Date', 'Payment Mode', 'Transaction Ref', 'Status'];
    const rows = transactions.map(t => [
      t.receiptNo,
      t.rollNo,
      `"${t.studentName}"`,
      `"${t.courseName}"`,
      t.amount,
      t.paymentDate,
      t.paymentMode,
      t.transactionRef,
      t.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `uma_learnology_fee_transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Transaction records exported to CSV!');
  };

  return (
    <div className="section" style={{ background: 'var(--bg-main)', minHeight: '85vh', paddingTop: '2.5rem' }}>
      <div className="container">
        {/* Title */}
        <div className="section-title-wrap no-print">
          <div className="section-badge">
            <CreditCard size={14} /> Official Accounts & Fee Management
          </div>
          <h2 className="section-title">Fee Ledger & GST Tax Invoice Management</h2>
          <p className="section-subtitle">
            Track student fee collections, generate compliant tax invoices, issue payment receipts, and send automated WhatsApp fee reminders.
          </p>
        </div>

        {/* Financial KPI Summary Cards */}
        <div className="no-print" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Invoiced</span>
              <div style={{ padding: '6px', background: 'var(--primary-light)', borderRadius: '8px', color: 'var(--primary)' }}>
                <Wallet size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>₹{totalValue.toLocaleString()}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Across {students.length} Enrolled Students
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Fee Collected</span>
              <div style={{ padding: '6px', background: 'var(--success-light)', borderRadius: '8px', color: 'var(--success)' }}>
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--success)' }}>
              ₹{totalCollected.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--success)', marginTop: '4px', fontWeight: 600 }}>
              Collection Rate: {collectionRate}%
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Outstanding Balance Due</span>
              <div style={{ padding: '6px', background: 'var(--warning-light)', borderRadius: '8px', color: 'var(--accent-hover)' }}>
                <AlertTriangle size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-hover)' }}>
              ₹{totalPending.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Automated reminders ready
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Verified Tax Receipts</span>
              <div style={{ padding: '6px', background: 'var(--info-light)', borderRadius: '8px', color: 'var(--info)' }}>
                <FileText size={18} />
              </div>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--info)' }}>
              {transactions.length}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              With QR Tax Verification
            </div>
          </div>
        </div>

        {/* Student Fee Roster Card */}
        <div className="card no-print" style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem' }}>Student Fee Records</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Search and manage individual student fee statuses, record payments, and issue receipts.
              </p>
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['All', 'Paid', 'Partial', 'Overdue'].map((status) => (
                <button
                  key={status}
                  className={`btn btn-sm ${filterStatus === status ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setFilterStatus(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by student name, roll number, or batch..."
              className="form-control"
              style={{ paddingLeft: '44px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Student Info</th>
                  <th>Program & Batch</th>
                  <th>Total Fee</th>
                  <th>Paid Fee</th>
                  <th>Due Balance</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => {
                  const total = Number(s.totalFee) || 0;
                  const paid = Number(s.paidFee) || 0;
                  const balance = total - paid;

                  return (
                    <tr key={s.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--primary)' }}>
                            <img src={s.photo} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 700 }}>{s.name}</div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--primary)' }}>
                              {s.rollNo}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{s.courseName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.batch}</div>
                      </td>

                      <td style={{ fontWeight: 700 }}>₹{total.toLocaleString()}</td>
                      <td style={{ fontWeight: 700, color: 'var(--success)' }}>₹{paid.toLocaleString()}</td>
                      <td style={{ fontWeight: 700, color: balance > 0 ? 'var(--accent-hover)' : 'var(--text-muted)' }}>
                        ₹{balance.toLocaleString()}
                      </td>

                      <td>
                        <span className={`badge badge-${s.feeStatus === 'Paid' ? 'success' : (s.feeStatus === 'Partial' ? 'warning' : 'danger')}`}>
                          {s.feeStatus}
                        </span>
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleOpenCollectModal(s)}
                            title="Collect Fee & Issue Receipt"
                          >
                            <CreditCard size={14} /> Collect
                          </button>
                          {balance > 0 && (
                            <button
                              className="btn btn-secondary btn-sm"
                              style={{ color: '#10b981', borderColor: 'var(--success-border)' }}
                              onClick={() => setReminderModalStudent(s)}
                              title="Send WhatsApp Fee Reminder"
                            >
                              <MessageCircle size={14} /> WhatsApp
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction History Ledger */}
        <div className="card no-print">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem' }}>Official Transaction Ledger ({transactions.length})</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Immutable audit trail of all recorded fee collections with QR verification.
              </p>
            </div>

            <button className="btn btn-secondary btn-sm" onClick={handleExportCSV}>
              <Download size={16} /> Export Ledger to CSV
            </button>
          </div>

          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Receipt No</th>
                  <th>Student</th>
                  <th>Amount</th>
                  <th>Payment Mode</th>
                  <th>Date</th>
                  <th>Ref ID</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Receipt</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.82rem', color: 'var(--primary)' }}>
                      {txn.receiptNo}
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{txn.studentName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{txn.rollNo}</div>
                    </td>
                    <td style={{ fontWeight: 800, color: 'var(--success)' }}>
                      ₹{txn.amount.toLocaleString()}
                    </td>
                    <td>{txn.paymentMode}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{txn.paymentDate}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {txn.transactionRef}
                    </td>
                    <td>
                      <span className="badge badge-success">Completed</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setActiveReceipt(txn)}
                        title="View & Print Official Tax Invoice"
                      >
                        <FileText size={14} /> View Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Collect Fee Modal */}
      {isCollectModalOpen && selectedStudentForPay && (
        <div className="modal-backdrop" onClick={() => setIsCollectModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CreditCard size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.25rem' }}>Collect Fee Payment</h3>
              </div>
              <button className="btn btn-secondary btn-icon-only" onClick={() => setIsCollectModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleProcessPayment}>
              <div className="modal-body">
                {/* Student Info Box */}
                <div style={{ background: 'var(--bg-card-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{selectedStudentForPay.name}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Roll: <strong style={{ color: 'var(--primary)' }}>{selectedStudentForPay.rollNo}</strong> • {selectedStudentForPay.batch}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Current Due</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-hover)' }}>
                      ₹{((Number(selectedStudentForPay.totalFee) || 0) - (Number(selectedStudentForPay.paidFee) || 0)).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Payment Amount (INR) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="form-control"
                    placeholder="Enter amount to collect"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Payment Mode *</label>
                  <select
                    className="form-control"
                    value={payMode}
                    onChange={(e) => setPayMode(e.target.value)}
                  >
                    <option value="UPI / QR Code">UPI (GPay / PhonePe / Paytm)</option>
                    <option value="NetBanking (NEFT/IMPS)">NetBanking (NEFT / IMPS)</option>
                    <option value="Credit / Debit Card">Credit / Debit Card (POS)</option>
                    <option value="Cash Receipt">Cash Counter Receipt</option>
                    <option value="Cheque / DD">Bank Cheque / Demand Draft</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Payment Remarks / Description</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Installment 2 fee payment"
                    value={payRemarks}
                    onChange={(e) => setPayRemarks(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsCollectModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Sparkles size={16} /> Record Payment & Issue Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WhatsApp Reminder Modal */}
      {reminderModalStudent && (
        <div className="modal-backdrop" onClick={() => setReminderModalStudent(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageCircle size={20} color="#10b981" />
                <h3 style={{ fontSize: '1.25rem' }}>Send Fee Reminder Notice</h3>
              </div>
              <button className="btn btn-secondary btn-icon-only" onClick={() => setReminderModalStudent(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                The following official reminder message will be generated for <strong>{reminderModalStudent.name}</strong> ({reminderModalStudent.parentPhone || reminderModalStudent.phone}):
              </p>

              <div style={{
                background: 'var(--bg-card-subtle)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                border: '1px solid var(--border-color)',
                fontFamily: 'var(--font-mono)'
              }}>
                Dear Parent/Student ({reminderModalStudent.name}),<br /><br />
                This is a gentle reminder from <strong>{coachingInfo.name}</strong> regarding the pending tuition fee installment of <strong>₹{((Number(reminderModalStudent.totalFee) || 0) - (Number(reminderModalStudent.paidFee) || 0)).toLocaleString()}</strong> for batch <em>{reminderModalStudent.batch}</em>.<br /><br />
                Kindly clear the due at the accounts desk or online to ensure uninterrupted access to classroom sessions and test portals.<br /><br />
                Helpline: {coachingInfo.phone} | Admissions Office
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setReminderModalStudent(null)}>
                Close
              </button>
              <a
                href={`https://wa.me/${(reminderModalStudent.parentPhone || reminderModalStudent.phone).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Dear ${reminderModalStudent.name}, this is a reminder from ${coachingInfo.name} regarding your fee balance of ₹${((Number(reminderModalStudent.totalFee) || 0) - (Number(reminderModalStudent.paidFee) || 0)).toLocaleString()}. Please clear the dues at your earliest convenience. Thank you!`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ background: '#10b981', borderColor: '#10b981' }}
                onClick={() => setReminderModalStudent(null)}
              >
                <Send size={16} /> Open in WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Global Receipt Modal */}
      {activeReceipt && (
        <FeeReceiptModal
          receipt={activeReceipt}
          onClose={() => setActiveReceipt(null)}
        />
      )}
    </div>
  );
};

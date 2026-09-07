import React from 'react';
import { useApp } from '../../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import {
  Printer,
  Download,
  X,
  CheckCircle2,
  Building,
  Phone,
  Mail,
  FileText,
  ShieldCheck
} from '../Icons';

export const FeeReceiptModal = ({ receipt, onClose }) => {
  const { coachingInfo, showToast } = useApp();

  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast(`Tax Invoice & Fee Receipt ${receipt.receiptNo} downloaded.`);
  };

  const verifyQrPayload = JSON.stringify({
    receiptNo: receipt.receiptNo,
    student: receipt.studentName,
    rollNo: receipt.rollNo,
    amount: receipt.amount,
    date: receipt.paymentDate,
    gstin: coachingInfo.gstin,
    coaching: coachingInfo.name,
    verifyUrl: `https://umalearnology.com/verify-receipt?no=${receipt.receiptNo}`
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card modal-card-lg"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '820px', padding: '0', background: '#ffffff', color: '#0f172a' }}
      >
        {/* Modal Top Actions (No Print) */}
        <div className="modal-header no-print" style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} color="#ea580c" />
            <h3 style={{ fontSize: '1.15rem', color: '#0f172a' }}>Official Tax Invoice & Fee Receipt</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button className="btn btn-primary btn-sm" onClick={handlePrint}>
              <Printer size={16} /> Print Receipt (A4)
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleDownload}>
              <Download size={16} /> Download PDF
            </button>
            <button className="btn btn-secondary btn-icon-only" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Formal Invoice Area */}
        <div
          className="printable-area"
          style={{
            padding: '2.5rem',
            background: '#ffffff',
            color: '#0f172a',
            fontFamily: 'var(--font-body)'
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingBottom: '1.5rem',
            borderBottom: '2px solid #064e3b'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #f59e0b', background: '#fff', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                  <img src="/logo.png" alt="UMA Classes Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#064e3b', letterSpacing: '-0.5px', margin: 0 }}>
                  {coachingInfo.name}
                </h1>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#475569', maxWidth: '420px', lineHeight: 1.4 }}>
                {coachingInfo.address}, {coachingInfo.city}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                <strong>Reg No:</strong> {coachingInfo.registrationNo} | <strong>GSTIN:</strong> {coachingInfo.gstin}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                <strong>Phone:</strong> {coachingInfo.phone} | <strong>Email:</strong> {coachingInfo.email}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{
                background: '#ecfdf5',
                color: '#065f46',
                border: '1px solid #a7f3d0',
                padding: '4px 12px',
                borderRadius: '6px',
                fontWeight: 800,
                fontSize: '0.82rem',
                display: 'inline-block',
                marginBottom: '6px'
              }}>
                OFFICIAL TAX INVOICE
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
                {receipt.receiptNo}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>
                <strong>Date:</strong> {receipt.paymentDate}
              </div>
            </div>
          </div>

          {/* Student & Payment Info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '1.5rem',
            padding: '1.25rem 0',
            borderBottom: '1px solid #e2e8f0',
            fontSize: '0.88rem'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
                Billed To (Student Details)
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>{receipt.studentName}</div>
              <div style={{ color: '#475569', marginTop: '2px' }}>
                <strong>Roll No:</strong> <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#ea580c' }}>{receipt.rollNo}</span>
              </div>
              <div style={{ color: '#475569' }}>
                <strong>Program:</strong> {receipt.courseName}
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
                Payment Summary
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ color: '#64748b' }}>Payment Mode:</span>
                <strong>{receipt.paymentMode}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ color: '#64748b' }}>Txn Ref:</span>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{receipt.transactionRef}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Status:</span>
                <strong style={{ color: '#10b981' }}>{receipt.status} (Verified)</strong>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div style={{ padding: '1.5rem 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 800, color: '#334155' }}>#</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 800, color: '#334155' }}>Particulars / Description</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 800, color: '#334155' }}>SAC Code</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 800, color: '#334155' }}>Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px' }}>1</td>
                  <td style={{ padding: '12px' }}>
                    <strong>{receipt.description || 'Academic Tuition & Coaching Fee'}</strong>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                      Batch Enrollment, Study Handbooks & Audio Speaking Lab Access
                    </div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>999293</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700 }}>₹{receipt.amount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            {/* Total Calculations */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
              <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Taxable Subtotal:</span>
                  <span>₹{receipt.amount.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>CGST (9%) & SGST (9%):</span>
                  <span>Inclusive</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '8px',
                  borderTop: '2px solid #0f172a',
                  fontSize: '1.15rem',
                  fontWeight: 900,
                  color: '#0f172a'
                }}>
                  <span>Total Paid:</span>
                  <span>₹{receipt.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer QR & Verification */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingTop: '1.5rem',
            borderTop: '1px solid #e2e8f0',
            marginTop: '1rem'
          }}>
            {/* QR Code */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                background: '#ffffff',
                padding: '4px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                display: 'inline-block'
              }}>
                <QRCodeSVG value={verifyQrPayload} size={76} level="M" />
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', maxWidth: '240px' }}>
                <div style={{ fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} color="#10b981" /> QR Verified Receipt
                </div>
                Scan QR code with any smartphone camera to verify receipt authenticity.
              </div>
            </div>

            {/* Signatures */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'cursive', fontSize: '1.1rem', color: '#064e3b', marginBottom: '2px' }}>
                Uma Nandini
              </div>
              <div style={{ borderTop: '1px solid #94a3b8', width: '160px', paddingTop: '4px', fontSize: '0.75rem', color: '#64748b' }}>
                Authorized Signatory
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: '0.7rem', color: '#94a3b8', marginTop: '1.5rem' }}>
            This is a computer-generated tax invoice and receipt issued by {coachingInfo.name}. Valid for all tax and academic reimbursement purposes.
          </div>
        </div>
      </div>
    </div>
  );
};

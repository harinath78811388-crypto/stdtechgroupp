import { useEffect, useRef } from 'react';
import { Award, CheckCircle, Download, Printer, X, ShieldAlert, ExternalLink, Calendar, Clock } from 'lucide-react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { CertificateItem } from '../types';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
  onVerifyPublic?: (certId: string) => void;
}

export default function CertificateModal({
  certificate,
  onClose,
  onVerifyPublic,
}: CertificateModalProps) {
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!certificate) return;

    // Trigger celebration confetti on view
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (e) {
      // ignore
    }

    // Generate QR Code onto canvas
    if (qrCanvasRef.current) {
      const publicUrl = `${window.location.origin}/verify/${certificate.certificateId}`;
      QRCode.toCanvas(
        qrCanvasRef.current,
        publicUrl,
        {
          width: 110,
          margin: 1,
          color: {
            dark: '#0f172a',
            light: '#ffffff',
          },
        },
        (err) => {
          if (err) console.error('Error generating QR:', err);
        }
      );
    }
  }, [certificate]);

  if (!certificate) return null;

  const isValid = certificate.status === 'valid';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="certificate-modal fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="certificate-modal-panel relative w-full max-w-5xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-4 sm:p-7 my-8 text-slate-100 max-h-[92vh] overflow-y-auto">
        {/* Top bar controls */}
        <div className="certificate-controls flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Official Certificate Viewer</h3>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                isValid
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                  : 'bg-rose-950 text-rose-300 border border-rose-500/40'
              }`}
            >
              {isValid ? 'Valid & Verified' : 'Revoked'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================== */}
        {/* THE OFFICIAL CERTIFICATE TEMPLATE (Print & Screen Compliant) */}
        {/* ========================================================== */}
        <div
          id="official-certificate-container"
          className="certificate-print-container relative overflow-hidden rounded-2xl bg-white text-slate-900 p-7 sm:p-10 border-[10px] border-double border-emerald-900 shadow-2xl"
        >
          {/* Ornate corner borders */}
          <div className="absolute top-3 left-3 w-12 h-12 border-t-[3px] border-l-[3px] border-emerald-800" />
          <div className="absolute top-3 right-3 w-12 h-12 border-t-[3px] border-r-[3px] border-emerald-800" />
          <div className="absolute bottom-3 left-3 w-12 h-12 border-b-[3px] border-l-[3px] border-emerald-800" />
          <div className="absolute bottom-3 right-3 w-12 h-12 border-b-[3px] border-r-[3px] border-emerald-800" />

          {/* Watermark Logo in center */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.045] pointer-events-none select-none">
            <div className="text-8xl sm:text-[10rem] font-black text-emerald-900 tracking-widest rotate-[-8deg]">
              STDTECH
            </div>
          </div>

          {/* Certificate Header */}
          <div className="text-center relative z-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <img
                src="/images/logo.png"
                alt="STDTech Group Logo"
                className="w-11 h-11 object-contain drop-shadow-sm"
                onError={(e) => {
                  e.currentTarget.src = "https://i.postimg.cc/6qRt0h7H/file-00000000ee20821182e188b87dbc276d.png";
                }}
              />
              <span className="text-[10px] sm:text-[11px] font-black tracking-[0.32em] uppercase text-emerald-800 border-b-2 border-emerald-700/30 pb-1">
                STDTech Group Pvt Ltd • Established 2026
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black tracking-[0.01em] text-slate-950 uppercase mt-3">
              Certificate of Completion
            </h1>
            <p className="text-xs sm:text-sm font-sans tracking-[0.08em] text-slate-500 italic mt-2">
              "Technology | Innovation | Impact" • Official Academic Registry
            </p>
          </div>

          {/* Certificate Body */}
          <div className="my-7 sm:my-8 text-center relative z-10">
            <p className="text-[11px] font-sans uppercase tracking-[0.28em] text-emerald-800 font-bold mb-3">
              This is proudly conferred upon
            </p>
            <div className="inline-block border-b-2 border-emerald-700 pb-2 px-10 mb-4">
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-emerald-950 tracking-tight">
                {certificate.studentName}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed mt-2">
              for successfully completing the rigorous industry curriculum, practical laboratory projects, and final competency evaluations for
            </p>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-4 mb-2">
              {certificate.courseTitle}
            </h3>

            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 mt-4 text-xs font-sans text-slate-600">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                <strong>Duration:</strong> {certificate.courseDuration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                <strong>Date:</strong> {certificate.completionDate}
              </span>
            </div>
          </div>

          {/* Certificate Footer with QR Code, Seals & Signatures */}
          <div className="mt-8 pt-6 border-t-2 border-emerald-900/20 grid grid-cols-1 sm:grid-cols-3 items-end gap-6 relative z-10">
            {/* QR Code Verification Block */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="p-1.5 rounded-lg bg-white border-2 border-emerald-900/30 shadow-sm inline-block">
                <canvas ref={qrCanvasRef} className="w-28 h-28" />
              </div>
              <span className="text-[10px] font-mono text-emerald-900 mt-1 font-semibold uppercase tracking-wide">
                Scan QR to Verify
              </span>
              <span className="text-[10px] font-mono text-emerald-800 font-bold">
                ID: {certificate.certificateId}
              </span>
            </div>

            {/* Official Gold/Emerald Emblem */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full border-[5px] border-double border-emerald-800 bg-emerald-50 flex items-center justify-center mb-2 shadow-sm">
                <CheckCircle className="w-10 h-10 text-emerald-800" />
              </div>
              <span className="text-[10px] font-serif font-bold uppercase tracking-[0.2em] text-emerald-900">
                Official Authenticity Seal
              </span>
              <span className="text-[9px] text-slate-500">STDTech Group Pvt Ltd</span>
            </div>

            {/* Authorizing Executive Signature */}
            <div className="text-center sm:text-right flex flex-col items-center sm:items-end">
              <div className="h-14 w-40 flex items-center justify-center sm:justify-end mb-1">
                <img
                  src="/images/signature.png"
                  alt="Harinath Verma Signature"
                  className="max-h-full max-w-full object-contain filter contrast-125"
                  onError={(e) => {
                    e.currentTarget.src = "https://i.postimg.cc/MTQTKMhM/signature.png";
                  }}
                />
              </div>
              <div className="w-40 border-b border-slate-400 mb-1" />
              <p className="text-xs font-bold text-slate-900 mt-0.5">Harinath Verma</p>
              <p className="text-[10px] font-sans uppercase tracking-wider text-slate-500">
                Founder & Chief Executive Officer
              </p>
              <p className="text-[9px] text-slate-400">STDTech Group Pvt Ltd</p>
            </div>
          </div>
        </div>

        {/* Bottom verification link */}
        <div className="certificate-controls mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <span className="font-mono text-slate-500 truncate max-w-md">
            Cryptographic Hash: {certificate.verificationHash}
          </span>

          {onVerifyPublic && (
            <button
              onClick={() => onVerifyPublic(certificate.certificateId)}
              className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Test Public Verification Page</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

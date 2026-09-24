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
      const publicUrl = `https://stdtechgroup.com/verify/${certificate.certificateId}`;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto ">
     <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 my-8 text-slate-100 max-h-[92vh] overflow-y-auto">
        {/* Top bar controls */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
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
          className="certificate-print-container relative overflow-hidden rounded-2xl bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900 p-8 sm:p-12 border-8 border-double border-emerald-900/40 shadow-2xl"
        >
          {/* Ornate corner borders */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-emerald-800" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-emerald-800" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-emerald-800" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-emerald-800" />

          {/* Watermark Logo in center */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
            <div className="text-8xl font-black text-slate-900 tracking-widest">
              STDTECH
            </div>
          </div>

          {/* Certificate Header */}
          <div className="text-center relative z-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <img
                src="/images/logo.png"
                alt="STDTech Group Logo"
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://i.postimg.cc/6qRt0h7H/file-00000000ee20821182e188b87dbc276d.png";
                }}
              />
              <span className="text-[11px] font-black tracking-[0.3em] uppercase text-emerald-800 border-b border-emerald-700/40 pb-1">
                STDTech Group Pvt Ltd • Established 2026
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-slate-950 uppercase mt-2">
              Certificate of Completion
            </h1>
            <p className="text-xs sm:text-sm font-sans tracking-wide text-slate-600 italic mt-1">
              "Technology | Innovation | Impact" • Official Academic Registry
            </p>
          </div>

          {/* Certificate Body */}
          <div className="my-8 text-center relative z-10">
            <p className="text-sm font-sans uppercase tracking-widest text-slate-500 mb-2">
              This is proudly conferred upon
            </p>
            <div className="inline-block border-b-2 border-emerald-700 pb-1 px-8 mb-4">
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-emerald-950 tracking-tight">
                {certificate.studentName}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed mt-2">
              for successfully completing the rigorous industry curriculum, practical laboratory projects, and final competency evaluations for
            </p>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-3 mb-1">
              {certificate.courseTitle}
            </h3>

            <div className="flex items-center justify-center gap-6 mt-3 text-xs font-sans text-slate-600">
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
          <div className="mt-10 pt-6 border-t border-slate-300 grid grid-cols-1 sm:grid-cols-3 items-end gap-6 relative z-10">
            {/* QR Code Verification Block */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="p-1 rounded bg-white border border-slate-300 shadow-sm inline-block">
                <canvas ref={qrCanvasRef} className="w-24 h-24" />
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-1 font-semibold">
                Scan QR to Verify
              </span>
              <span className="text-[10px] font-mono text-emerald-800 font-bold">
                ID: {certificate.certificateId}
              </span>
            </div>

            {/* Official Gold/Emerald Emblem */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full border-4 border-double border-emerald-800 bg-emerald-900/10 flex items-center justify-center mb-1">
                <CheckCircle className="w-8 h-8 text-emerald-800" />
              </div>
              <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-emerald-900">
                Official Authenticity Seal
              </span>
              <span className="text-[9px] text-slate-500">STDTech Group Pvt Ltd</span>
            </div>

            {/* Authorizing Executive Signature */}
            <div className="text-center sm:text-right flex flex-col items-center sm:items-end">
              <div className="h-12 w-36 flex items-center justify-center sm:justify-end mb-1">
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
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
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

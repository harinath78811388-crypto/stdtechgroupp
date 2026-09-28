import { useState, useEffect } from 'react';
import {
  Award,
  CheckCircle,
  XCircle,
  Search,
  ShieldCheck,
  Calendar,
  Clock,
  Building,
  User,
  ExternalLink,
  Printer,
  Sparkles,
} from 'lucide-react';
import { CertificateItem } from '../types';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface CertificateVerificationViewProps {
  initialCertId?: string;
  onViewCertificateModal: (cert: CertificateItem) => void;
}

export default function CertificateVerificationView({
  initialCertId = 'STDT-2026-00001',
  onViewCertificateModal,
}: CertificateVerificationViewProps) {
  const [certIdInput, setCertIdInput] = useState(initialCertId);
  const [searchedCertId, setSearchedCertId] = useState(initialCertId);
  const [certificate, setCertificate] = useState<CertificateItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verifyTimestamp, setVerifyTimestamp] = useState('');

  const performVerification = async (idToVerify: string) => {
    const cleanId = idToVerify.trim();
    if (!cleanId) return;
    setLoading(true);
    setError('');

    try {
      // 1. Check live Firestore first
      try {
        const firestoreDoc = await getDoc(doc(db, 'certificates', cleanId));
        if (firestoreDoc.exists()) {
          const certData = firestoreDoc.data() as CertificateItem;
          setCertificate(certData);
          setSearchedCertId(cleanId);
          setVerifyTimestamp(new Date().toUTCString());
          return;
        }
      } catch (fsErr) {
        console.warn('Firestore direct certificate lookup warning:', fsErr);
      }

      // 2. Fallback to API endpoint
      const res = await fetch(`/api/certificates/${cleanId}`);
      if (!res.ok) {
        throw new Error(`No certificate found matching ID: ${cleanId}`);
      }
      const data = await res.json();
      setCertificate(data);
      setSearchedCertId(cleanId);
      setVerifyTimestamp(new Date().toUTCString());
    } catch (err: any) {
      setError(err.message || 'Verification lookup failed');
      setCertificate(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCertId) {
      performVerification(initialCertId);
    }
  }, [initialCertId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performVerification(certIdInput);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-500/30 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>STDTech Trust Registry</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Public Certificate Verification
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Verify the authenticity of any completion certificate, corporate credential, or student diploma issued by STDTech Group Pvt Ltd.
        </p>
      </div>

      {/* Verification Lookup Bar */}
      <form onSubmit={handleSubmit} className="mb-10 max-w-xl mx-auto">
        <div className="relative flex items-center">
          <input
            type="text"
            required
            value={certIdInput}
            onChange={(e) => setCertIdInput(e.target.value.toUpperCase())}
            placeholder="Enter Certificate ID (e.g. STDT-2026-00001)"
            className="w-full pl-4 pr-32 py-3.5 rounded-2xl bg-slate-900 border-2 border-slate-700 text-white font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 shadow-xl"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{loading ? 'Verifying...' : 'Verify'}</span>
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-slate-500 px-2">
          <span>Sample Valid IDs: STDT-2026-00001, STDT-2026-00002</span>
          <button
            type="button"
            onClick={() => {
              setCertIdInput('STDT-2026-00001');
              performVerification('STDT-2026-00001');
            }}
            className="text-emerald-400 hover:underline font-semibold"
          >
            Load Sample
          </button>
        </div>
      </form>

      {/* Error state */}
      {error && (
        <div className="p-6 rounded-3xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-center space-y-2 mb-8 animate-shake">
          <XCircle className="w-10 h-10 text-rose-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Record Not Found</h3>
          <p className="text-xs text-rose-300 max-w-md mx-auto">{error}</p>
          <p className="text-[11px] text-slate-400">
            Please check the certificate identifier format or contact STDTech Group Academic Registrar at harinathkushwaha12@gmail.com.
          </p>
        </div>
      )}

      {/* Verified Certificate Card */}
      {certificate && (
        <div className="rounded-3xl bg-slate-900/90 border border-emerald-500/40 p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Status Ribbon */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  certificate.status === 'valid'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                    : 'bg-rose-950 text-rose-400 border border-rose-500/40'
                }`}
              >
                {certificate.status === 'valid' ? (
                  <CheckCircle className="w-7 h-7" />
                ) : (
                  <XCircle className="w-7 h-7" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    ID: {certificate.certificateId}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      certificate.status === 'valid'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {certificate.status === 'valid' ? 'AUTHENTIC & VALID' : 'REVOKED'}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mt-0.5">
                  Official Verification Record
                </h2>
              </div>
            </div>

            <button
              onClick={() => onViewCertificateModal(certificate)}
              className="px-4 py-2 rounded-xl bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-500/40 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <Printer className="w-4 h-4" />
              <span>View Full Printable Certificate</span>
            </button>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs flex items-center gap-1.5 font-semibold">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>Student Full Name</span>
              </span>
              <p className="text-lg font-bold text-white">{certificate.studentName}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs flex items-center gap-1.5 font-semibold">
                <Building className="w-3.5 h-3.5 text-emerald-400" />
                <span>Issuing Authority</span>
              </span>
              <p className="text-lg font-bold text-white">STDTech Group Pvt Ltd</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1 md:col-span-2">
              <span className="text-slate-400 text-xs flex items-center gap-1.5 font-semibold">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>Course & Certification Credential</span>
              </span>
              <p className="text-base sm:text-lg font-bold text-emerald-300">
                {certificate.courseTitle}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs flex items-center gap-1.5 font-semibold">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Program Duration</span>
              </span>
              <p className="text-base font-bold text-white">{certificate.courseDuration}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs flex items-center gap-1.5 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Date of Completion</span>
              </span>
              <p className="text-base font-bold text-white">{certificate.completionDate}</p>
            </div>
          </div>

          {/* Official Signatory & Seal Endorsement */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-950/60 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-emerald-500/30 p-1 flex items-center justify-center shrink-0">
                <img
                  src="/images/logo.png"
                  alt="STDTech Group"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://i.postimg.cc/6qRt0h7H/file-00000000ee20821182e188b87dbc276d.png";
                  }}
                />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Official Corporate Endorsement</p>
                <p className="text-[11px] text-slate-400">STDTech Group Pvt Ltd — Registrar of Academic Credentials</p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-6">
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Authorized Signatory</p>
                <p className="text-xs font-bold text-white">Harinath Verma</p>
                <p className="text-[10px] text-emerald-400">Founder & CEO</p>
              </div>
              <div className="h-10 w-28 bg-white/5 rounded-lg p-1 border border-slate-700/60 flex items-center justify-center">
                <img
                  src="/images/signature.png"
                  alt="Harinath Verma Official Signature"
                  className="max-h-full max-w-full object-contain filter invert opacity-90"
                  onError={(e) => {
                    e.currentTarget.src = "https://i.postimg.cc/MTQTKMhM/signature.png";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Cryptographic Proof and Timestamp Footer */}
          <div className="mt-8 pt-6 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-400">
              <span className="font-mono text-[11px] text-slate-500 truncate max-w-md">
                Verification Hash: {certificate.verificationHash}
              </span>
              <span className="text-slate-400 text-[11px]">
                Verified at: <strong className="text-white">{verifyTimestamp || 'Just now'}</strong>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              This verification record was retrieved directly from the STDTech Group Pvt Ltd cryptographic database. It confirms the credential holder met all graduation and industry evaluation standards.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

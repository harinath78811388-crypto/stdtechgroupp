import { useState, useEffect } from 'react';
import {
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle,
  Clock,
  Download,
  ExternalLink,
  Layers,
  Bell,
  UserCheck,
} from 'lucide-react';
import { User, CourseItem, CertificateItem } from '../../types';

interface StudentDashboardProps {
  currentUser: User | null;
  onViewCertificate?: (cert: CertificateItem) => void;
  onOpenCertificateModal?: (cert: CertificateItem) => void;
  onNavigateVerify?: (certId: string) => void;
  onBrowseCourses?: () => void;
  onExploreCourses?: () => void;
}

export default function StudentDashboard({
  currentUser,
  onViewCertificate,
  onOpenCertificateModal,
  onNavigateVerify = () => {},
  onBrowseCourses,
  onExploreCourses,
}: StudentDashboardProps) {
  const handleViewCert = onOpenCertificateModal || onViewCertificate || (() => {});
  const handleBrowse = onExploreCourses || onBrowseCourses || (() => {});
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);

  useEffect(() => {
    // Fetch student data
    fetch('/api/certificates')
      .then((res) => res.json())
      .then((data: CertificateItem[]) => {
        // Filter or display student certificates
        setCertificates(data);
      })
      .catch(console.error);

    fetch('/api/courses')
      .then((res) => res.json())
      .then((data: CourseItem[]) => setCourses(data))
      .catch(console.error);
  }, []);

  const enrolled = [
    {
      courseTitle: 'Full-Stack Web & Mobile App Development Bootcamp',
      progress: 100,
      status: 'Completed & Certified',
      certId: 'STDT-2026-00001',
      duration: '6 Months (240 Hours)',
      instructor: 'STDTech Academic Council',
    },
    {
      courseTitle: 'AI, Machine Learning & Predictive Systems Engineering',
      progress: 68,
      status: 'In Progress (Module 5 of 8)',
      certId: null,
      duration: '16 Weeks',
      instructor: 'Harinath Verma',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Student Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-pink-500/30 mb-8 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-pink-950 border border-pink-500/40 flex items-center justify-center text-pink-400">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">
                Student Learning Portal
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40">
                Academy Scholar
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Welcome back, <strong>{currentUser?.fullName || 'Aditya Sharma'}</strong> • Student ID: STD-STU-2026-09
            </p>
          </div>
        </div>

        <button
          onClick={onBrowseCourses}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
        >
          Explore More Courses
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Enrolled Courses & Progress */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <span>Enrolled Programs & Progress</span>
            </h2>
          </div>

          <div className="space-y-4">
            {enrolled.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-white">{item.courseTitle}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Duration: {item.duration} • Mentor: {item.instructor}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold self-start sm:self-auto ${
                      item.progress === 100
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'bg-blue-950 text-blue-300 border border-blue-500/40'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-semibold">
                    <span>Curriculum Completion</span>
                    <span className="text-emerald-400">{item.progress}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>

                {/* Certificate Action if 100% */}
                {item.certId && (
                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      Official Certificate ID: {item.certId}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const cert = certificates.find((c) => c.certificateId === item.certId);
                          if (cert) handleViewCert(cert);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-900 transition-colors flex items-center gap-1.5"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>View / Print Certificate</span>
                      </button>
                      <button
                        onClick={() => onNavigateVerify(item.certId!)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Verify Seal</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Practical Projects & Assignments */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Assigned Capstone Projects</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white">Full-Stack CRM with Realtime Notifications</h4>
                  <p className="text-slate-400">Status: Graded (Score: 98/100 • Grade A+)</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  Completed
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white">Heart Disease Risk Prediction Model Pipeline</h4>
                  <p className="text-slate-400">Status: Under Evaluation by Faculty</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-500/30 text-[10px] font-bold">
                  Submitted
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Verified Credentials & Academy Notices */}
        <div className="space-y-6">
          {/* Certificate Badge Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 text-center shadow-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Cryptographic Credentials</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Your credentials are cryptographically stamped and verifiable by employers globally via QR code.
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs font-mono mb-4">
              <div className="text-slate-400">Issuer: STDTech Group Pvt Ltd</div>
              <div className="text-emerald-400 font-bold">Total Earned: 1 Credential</div>
              <div className="text-slate-500 text-[11px] mt-1">Verification Status: LIVE</div>
            </div>

            {certificates.length > 0 && (
              <button
                onClick={() => handleViewCert(certificates[0])}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Inspect Official Certificate
              </button>
            )}
          </div>

          {/* Academy Announcements */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Bell className="w-4 h-4 text-pink-400" />
              <span>Academy Announcements</span>
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-[10px] text-pink-400 font-bold block mb-1">
                  Live Masterclass • Weekend
                </span>
                <p className="font-semibold text-white">Modern Microservices & Vite Production Flow</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Presented by Harinath Verma (Founder & CEO). Saturday 6:00 PM IST.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-[10px] text-emerald-400 font-bold block mb-1">
                  Certification Policy
                </span>
                <p className="text-[11px] text-slate-400">
                  Certificates require 80%+ attendance and successful defense of the capstone project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import {
  Briefcase,
  CheckSquare,
  Users,
  Award,
  Layers,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { User, CertificateItem } from '../../types';

interface StaffDashboardProps {
  currentUser: User | null;
  onViewCertificate?: (cert: CertificateItem) => void;
  onOpenCertificateModal?: (cert: CertificateItem) => void;
}

export default function StaffDashboard({
  currentUser,
  onViewCertificate,
  onOpenCertificateModal,
}: StaffDashboardProps) {
  const handleViewCert = onOpenCertificateModal || onViewCertificate || (() => {});
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Code Review: AutoCAD Automation Addin v1.2', status: 'In Progress', priority: 'High', due: 'Today' },
    { id: 2, title: 'Verify Student Submissions for Machine Learning Capstone', status: 'Pending', priority: 'Medium', due: 'Tomorrow' },
    { id: 3, title: 'Client Sprint Demo: Loan Approval Prediction Engine', status: 'Scheduled', priority: 'High', due: 'Friday' },
    { id: 4, title: 'Draft Technical Blog on Vite Production SSR Best Practices', status: 'Done', priority: 'Low', due: 'Completed' },
  ]);

  const [certificates, setCertificates] = useState<CertificateItem[]>([]);

  useEffect(() => {
    fetch('/api/certificates')
      .then((res) => res.json())
      .then((data) => setCertificates(data))
      .catch(console.error);
  }, []);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status: t.status === 'Done' ? 'In Progress' : 'Done' } : t
      )
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Staff Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-blue-500/30 mb-8 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Briefcase className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">Staff Operational Console</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                Operations & Faculty
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Logged in as: <strong>{currentUser?.fullName || 'Akash Verma (Co-Founder)'}</strong> • Role: Staff / Operations Lead
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
            Active Tasks: {tasks.filter((t) => t.status !== 'Done').length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Assigned Tasks & Project Milestones */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-blue-400" />
              <span>Assigned Engineering & Academy Tasks</span>
            </h2>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs ${
                    task.status === 'Done'
                      ? 'bg-slate-950/40 border-slate-800/40 text-slate-500 line-through'
                      : 'bg-slate-950 border-slate-800 hover:border-blue-500/40 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.status === 'Done'}
                      onChange={() => {}}
                      className="rounded bg-slate-900 border-slate-700 text-blue-500 pointer-events-none"
                    />
                    <div>
                      <h4 className="font-semibold text-sm text-white">{task.title}</h4>
                      <p className="text-[11px] text-slate-400">Due: {task.due}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      task.priority === 'High'
                        ? 'bg-rose-950 text-rose-300 border border-rose-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {task.priority} Priority
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Internal Client Projects */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Active Client Project Streams</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-white text-sm">Industrial CAD Automation Addin</h4>
                  <p className="text-slate-400">Client: Precision Tooling & Fabrication • Lead: Akash Verma</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold self-start sm:self-auto">
                  Phase 3: Integration Testing
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-white text-sm">FinTech Loan Risk Classifier</h4>
                  <p className="text-slate-400">Client: Apex Credit Advisory • Lead: Harinath Verma</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-950 text-blue-400 border border-blue-500/30 font-bold self-start sm:self-auto">
                  Phase 2: Data Pipeline Calibration
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Permitted Certificate Verification & Faculty Directory */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-400" />
              <span>Certificate Review Operations</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Staff members can inspect registered certificates and evaluate candidate submissions.
            </p>

            <div className="space-y-2">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => handleViewCert(cert)}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/40 cursor-pointer transition-colors text-xs flex items-center justify-between"
                >
                  <div>
                    <h5 className="font-bold text-white">{cert.studentName}</h5>
                    <span className="text-[10px] font-mono text-emerald-400">{cert.certificateId}</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">Inspect →</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-xs space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Operational Guidelines</span>
            </h3>
            <p className="text-slate-400 leading-relaxed">
              All client code deliveries adhere to STDTech Group Pvt Ltd standard security policies, encryption at rest, and zero third-party data leaks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

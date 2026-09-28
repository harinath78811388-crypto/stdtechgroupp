import { useState } from 'react';
import {
  Briefcase,
  Layers,
  MessageSquare,
  FileCheck2,
  Clock,
  Send,
  PlusCircle,
  HelpCircle,
  Phone,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { User } from '../../types';

interface CustomerDashboardProps {
  currentUser: User | null;
  onRequestProject: () => void;
}

export default function CustomerDashboard({
  currentUser,
  onRequestProject,
}: CustomerDashboardProps) {
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  const clientProjects = [
    {
      id: 'PRJ-2026-08',
      title: 'Enterprise Inventory Management System with Offline Sync',
      service: 'Software & Business Solutions',
      status: 'Active Development (Sprint 3)',
      milestone: 'API Schema & Database Models Finalized',
      completion: 65,
      lead: 'Harinath Verma',
    },
    {
      id: 'PRJ-2026-14',
      title: 'AutoCAD Mechanical Component Generator Utility',
      service: 'AutoCAD Automation & Custom Engineering',
      status: 'Quality Assurance & Delivery',
      milestone: 'Final User Acceptance Testing',
      completion: 90,
      lead: 'Akash Verma',
    },
  ];

  const handleSendTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage) return;
    setSupportSubmitted(true);
    setSupportMessage('');
    setTimeout(() => setSupportSubmitted(false), 5000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Customer Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-emerald-500/30 mb-8 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Briefcase className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">Client Project Portal</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Verified Business Client
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Client Account: <strong>{currentUser?.fullName || 'Rajesh Gupta (Apex Industries)'}</strong> • ID: CLI-2026-042
            </p>
          </div>
        </div>

        <button
          onClick={onRequestProject}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/20"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Project Proposal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Active Projects & Milestones */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>Active Contracts & Delivery Streams</span>
            </h2>
            <span className="text-xs text-slate-400">2 Active Projects</span>
          </div>

          <div className="space-y-4">
            {clientProjects.map((p) => (
              <div
                key={p.id}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      {p.id} • {p.service}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">{p.title}</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-xs font-bold self-start sm:self-auto">
                    {p.status}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                  <strong className="text-slate-400 block mb-1">Current Sprint Milestone:</strong>
                  <span>{p.milestone}</span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-semibold">
                    <span>Overall Project Completion</span>
                    <span className="text-emerald-400">{p.completion}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                      style={{ width: `${p.completion}%` }}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Project Lead: <strong className="text-white">{p.lead}</strong></span>
                  <button
                    onClick={onRequestProject}
                    className="text-emerald-400 font-semibold hover:underline"
                  >
                    Request Modification / Meeting →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Project Deliverables & SLA */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-xs space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>Signed Deliverables & Documentation</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span>Architecture Specification Document (PDF)</span>
                <span className="text-emerald-400 font-bold">Approved</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span>Non-Disclosure Agreement (NDA)</span>
                <span className="text-emerald-400 font-bold">Executed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Direct Dedicated Support & Communication */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Direct Support & Engineering Desk</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Need assistance, code modifications, or SLA inquiry? Connect directly with our lead architects.
            </p>

            {supportSubmitted && (
              <div className="p-3 mb-4 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Ticket logged! Our team responds within 2 hours.</span>
              </div>
            )}

            <form onSubmit={handleSendTicket} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Message / Urgent Request
                </label>
                <textarea
                  rows={4}
                  required
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="Describe your question, feature request, or issue..."
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Priority Ticket</span>
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Executive Helpline: +91 7318514528</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Direct: harinathkushwaha12@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

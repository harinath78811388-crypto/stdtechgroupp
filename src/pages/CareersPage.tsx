import { useState } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  ShieldCheck,
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { JobItem } from '../types';

interface CareersPageProps {
  jobs: JobItem[];
  onApplyForJob: (job: JobItem) => void;
}

export default function CareersPage({ jobs, onApplyForJob }: CareersPageProps) {
  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-500/30">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Careers & Talent</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Join Our Growing Engineering Team
        </h1>
        <p className="text-sm font-semibold text-emerald-400 tracking-wide uppercase">
          Build Technology That Matters
        </p>
        <p className="text-base text-slate-400 leading-relaxed">
          At STDTech Group Pvt Ltd, we are building homegrown software products, AI platforms, and technology training academies. We value craftsmanship, hunger to learn, and practical problem solving.
        </p>
      </div>

      {/* Mandatory Authentic Status Notice */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 mb-3">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Team Expansion Phase</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Technical & Development Team — Growing
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto mt-2 leading-relaxed">
          STDTech Group is proudly scaling its foundational software engineering, algorithmic research, and educational mentoring staff. We do not inflate headcount or fabricate credentials — we invite genuine builders to grow with us.
        </p>
      </div>

      {/* Open Positions List */}
      <div className="space-y-6">
        <SectionHeader
          badge="Current Openings"
          title="Open Engineering & Research Roles"
          description="Explore opportunities to contribute to SWAYNIS, predictive AI engines, and enterprise software client projects."
          accentColor="mint"
        />

        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-950 text-emerald-400 border border-emerald-500/20">
                    {job.department}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300">
                    {job.jobType}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-950 text-blue-300 border border-blue-500/20">
                    {job.workplaceType}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">{job.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
                  {job.description}
                </p>

                <div className="space-y-1 pt-2">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Key Requirements:
                  </span>
                  {job.requirements.slice(0, 3).map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <button
                  onClick={() => onApplyForJob(job)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/30"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

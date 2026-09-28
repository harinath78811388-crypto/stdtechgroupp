import { Award, BookOpen, Briefcase, Github, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

interface FounderCardProps {
  onApplyOrContact?: () => void;
}

export default function FounderCard({ onApplyOrContact }: FounderCardProps) {
  return (
    <div className="space-y-16">
      {/* Leadership Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Founder & CEO — Harinath Verma */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-emerald-50/40 to-pink-50/30 border-2 border-emerald-300/80 p-8 shadow-xl flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Founder & CEO
            </span>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-emerald-50 border-2 border-emerald-400 shadow-md shrink-0 group">
                <ImageWithFallback
                  src="/images/founder.png"
                  fallbackSrc="https://i.postimg.cc/HxhfF7GQ/file-00000000db048211aaa76d0c88a3f63a.png"
                  alt="Harinath Verma — Founder & CEO"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  fallbackInitials="HV"
                  fallbackColor="bg-gradient-to-br from-emerald-600 to-teal-700"
                />
              </div>

              <div className="text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Harinath Verma
                </h3>
                <p className="text-sm font-bold text-emerald-700 mt-1">
                  Founder & Chief Executive Officer
                </p>

                <div className="mt-4 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Diploma in Information Technology — 2nd Year</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Branch: Information Technology</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 justify-center sm:justify-start">
                  <a
                    href="https://github.com/harinath78811388-crypto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-xs font-bold text-emerald-800 border border-emerald-300 transition-colors shadow-xs"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>harinath78811388-crypto</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Strategic Role & Responsibilities */}
            <div className="space-y-3 pt-4 border-t border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Strategic Leadership & Role
              </h4>
              <p>
                Founder and strategic leader of STDTech Group, responsible for the company’s vision, technology direction, product development, and overall growth.
              </p>
              <div className="p-3.5 rounded-xl bg-white border border-emerald-200/80 space-y-2 text-xs text-slate-700 shadow-xs">
                <div className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>Leads architecture for core AI software products including SWAYNIS and predictive systems.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>Drives practical curriculum design and quality standards for STDTech Academy.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Co-Founder — Akash Verma */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-pink-50/40 to-emerald-50/30 border-2 border-pink-300/80 p-8 shadow-xl flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-100 text-pink-800 border border-pink-300">
              <UserCheck className="w-3.5 h-3.5 text-pink-600" />
              Co-Founder
            </span>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-pink-50 border-2 border-pink-400 shadow-md shrink-0 group">
                <ImageWithFallback
                  src="/images/co-founder.png"
                  fallbackSrc="https://i.postimg.cc/SQXsR6KX/file-0000000093508211969f4d8c76fb4de5.png"
                  alt="Akash Verma — Co-Founder"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  fallbackInitials="AV"
                  fallbackColor="bg-gradient-to-br from-pink-600 to-rose-700"
                />
              </div>

              <div className="text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Akash Verma
                </h3>
                <p className="text-sm font-bold text-pink-700 mt-1">
                  Co-Founder & Operational Strategy
                </p>

                <div className="mt-4 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <BookOpen className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                    <span>Diploma in Mechanical Engineering — 3rd Year</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Award className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                    <span>Branch: Mechanical Engineering</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 justify-center sm:justify-start">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-pink-50 text-xs font-bold text-pink-800 border border-pink-200 shadow-xs">
                    <Briefcase className="w-3.5 h-3.5 text-pink-600" />
                    <span>Operations & CAD Automation</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Strategic Role & Responsibilities */}
            <div className="space-y-3 pt-4 border-t border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Operational Leadership & Role
              </h4>
              <p>
                Co-Founder responsible for supporting company operations, strategy, project execution, and business development.
              </p>
              <div className="p-3.5 rounded-xl bg-white border border-pink-200/80 space-y-2 text-xs text-slate-700 shadow-xs">
                <div className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0" />
                  <span>Spearheads industrial design automation & AutoCAD project engineering.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0" />
                  <span>Manages organizational partnerships, student community relations, and regional outreach.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Status Card (Mandated Rule: STDTech currently does not have a full team. Do NOT invent fake employees!) */}
      <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-r from-emerald-100/90 via-white to-pink-100/90 p-8 text-center max-w-4xl mx-auto shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 mb-4">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Active Growth Phase</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
          Technical & Development Team — Growing
        </h3>

        <p className="text-sm text-slate-700 max-w-xl mx-auto leading-relaxed mb-6 font-normal">
          STDTech Group is proudly expanding its core software engineering, AI research, and teaching faculty. We believe in authenticity, transparent credentials, and building an exceptional homegrown team.
        </p>

        {onApplyOrContact && (
          <button
            onClick={onApplyOrContact}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-md shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
          >
            <span>Join Our Growing Team • View Openings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

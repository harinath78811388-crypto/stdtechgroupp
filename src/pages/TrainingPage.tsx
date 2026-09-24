import { useState } from 'react';
import {
  GraduationCap,
  Award,
  Clock,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import CourseCard from '../components/CourseCard';
import { CourseItem } from '../types';

interface TrainingPageProps {
  courses: CourseItem[];
  selectedCourseSlug?: string;
  onNavigate: (page: string, param?: string) => void;
  onEnroll: (course: CourseItem) => void;
}

export default function TrainingPage({
  courses,
  selectedCourseSlug,
  onNavigate,
  onEnroll,
}: TrainingPageProps) {
  const currentCourse = selectedCourseSlug
    ? courses.find((c) => c.slug === selectedCourseSlug) || null
    : null;

  return (
    <div className="space-y-20 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {currentCourse ? (
        /* Course Detail View */
        <div className="space-y-12">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button onClick={() => onNavigate('training')} className="hover:text-emerald-700">
              STDTech Academy
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">{currentCourse.title}</span>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-pink-200 shadow-xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-50 text-pink-800 border border-pink-300">
                {currentCourse.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
                Skill Level: {currentCourse.skillLevel}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {currentCourse.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 mt-4 leading-relaxed max-w-3xl font-normal">
              {currentCourse.overview}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-8 max-w-xl text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="text-slate-500 block font-medium">Duration</span>
                  <strong className="text-slate-900 font-bold">{currentCourse.duration}</strong>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                <Award className="w-4 h-4 text-pink-600" />
                <div>
                  <span className="text-slate-500 block font-medium">Credential</span>
                  <strong className="text-slate-900 font-bold">QR Verifiable</strong>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <div>
                  <span className="text-slate-500 block font-medium">Curriculum</span>
                  <strong className="text-slate-900 font-bold">Industry Lab</strong>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onEnroll(currentCourse)}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md"
              >
                <span>Enroll / Course Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('verify-cert')}
                className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Verify Sample Certificate</span>
              </button>
            </div>
          </div>

          {/* Curriculum & Outcomes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                <span>Structured Curriculum Modules</span>
              </h3>
              <div className="space-y-4 pt-2">
                {currentCourse.curriculum.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900 mb-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 text-[10px] flex items-center justify-center text-emerald-800 font-black">
                        {idx + 1}
                      </span>
                      <span>{item.module}</span>
                    </div>
                    <ul className="space-y-1 pl-7 text-xs text-slate-600 font-normal">
                      {item.topics.map((t, i) => (
                        <li key={i}>• {t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Key Learning Outcomes</h3>
                <div className="space-y-2 text-xs text-slate-700">
                  {(currentCourse.learningOutcomes || []).map((out: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span className="font-medium">{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Official Certificate Issuance Criteria</span>
                </div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Every enrolled student must complete practical assignments and submit a defended capstone project. Upon verification by faculty, an official Certificate with an individual ID (e.g. STDT-2026-00001) and QR verification seal will be issued.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full Academy Courses View */
        <div className="space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-50 text-pink-800 border border-pink-300">
              <GraduationCap className="w-3.5 h-3.5 text-pink-600" />
              <span>STDTech Academy</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Practical Technology & Engineering Academy
            </h1>
            <p className="text-sm font-bold text-emerald-700 tracking-wide uppercase">
              10 Industry-Aligned Disciplines • Cryptographic QR Credentials
            </p>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Equipping students, fresh graduates, and career changers with production-ready software development, machine learning, cloud architecture, and industrial design capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onSelect={(slug) => onNavigate('training-detail', slug)}
                onEnrollClick={(c) => onEnroll(c)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

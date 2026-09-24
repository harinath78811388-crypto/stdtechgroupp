import { Clock, Award, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { CourseItem } from '../types';

interface CourseCardProps {
  course: CourseItem;
  onSelect: (slug: string) => void;
  onEnrollClick?: (course: CourseItem) => void;
}

export default function CourseCard({ course, onSelect, onEnrollClick }: CourseCardProps) {
  return (
    <div className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/95 hover:bg-white border border-slate-200 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-emerald-900/5">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300 truncate max-w-[200px]">
            {course.category}
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-pink-50 text-pink-800 border border-pink-200">
            {course.skillLevel}
          </span>
        </div>

        <h3
          onClick={() => onSelect(course.slug)}
          className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2.5 cursor-pointer leading-snug"
        >
          {course.title}
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed mb-5 line-clamp-3 font-normal">
          {course.overview}
        </p>

        {/* Metadata badges */}
        <div className="grid grid-cols-2 gap-2 mb-5 text-xs text-slate-700">
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate font-semibold">{course.duration}</span>
          </div>

          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <Award className="w-3.5 h-3.5 text-pink-600 shrink-0" />
            <span className="truncate font-semibold">QR Certificate</span>
          </div>
        </div>

        {/* Curriculum highlights */}
        <div className="space-y-1 mb-5">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-emerald-600" />
            <span>Curriculum Highlights</span>
          </div>
          {course.curriculum.slice(0, 2).map((m, idx) => (
            <p key={idx} className="text-xs text-slate-700 truncate font-normal">
              • {m.module}
            </p>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => onSelect(course.slug)}
          className="text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors flex items-center gap-1"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Full Syllabus</span>
        </button>

        <button
          onClick={() => (onEnrollClick ? onEnrollClick(course) : onSelect(course.slug))}
          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-1 shadow-xs"
        >
          <span>Enroll / Info</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

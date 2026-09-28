import { ExternalLink, Github, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (slug: string) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <div className="group flex flex-col justify-between p-6 rounded-2xl bg-white/95 hover:bg-white border border-slate-200 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-emerald-900/5">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300">
            {project.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{project.status}</span>
          </div>
        </div>

        <h3
          onClick={() => onSelect(project.slug)}
          className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2 cursor-pointer"
        >
          {project.title}
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3 font-normal">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technology.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200 font-semibold"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => onSelect(project.slug)}
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors"
        >
          <span>Deep Dive</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors"
              title="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 text-emerald-800 transition-colors flex items-center gap-1 text-xs font-bold shadow-xs"
              title="Live Domain"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">Live</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

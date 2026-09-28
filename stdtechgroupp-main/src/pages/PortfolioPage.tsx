import { useState } from 'react';
import { Briefcase, Github, ExternalLink, Filter, CheckCircle2, ChevronRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import { ProjectItem } from '../types';

interface PortfolioPageProps {
  projects: ProjectItem[];
  selectedProjectSlug?: string;
  onNavigate: (page: string, param?: string) => void;
}

export default function PortfolioPage({
  projects,
  selectedProjectSlug,
  onNavigate,
}: PortfolioPageProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const currentProject = selectedProjectSlug
    ? projects.find((p) => p.slug === selectedProjectSlug) || null
    : null;

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'Artificial Intelligence', label: 'AI & Data Science' },
    { id: 'Full-Stack Software', label: 'Full-Stack Web' },
    { id: 'Engineering Automation', label: 'CAD & Engineering' },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category.toLowerCase().includes(activeFilter.toLowerCase()) || p.category === activeFilter);

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {currentProject ? (
        /* Project Detail Deep Dive */
        <div className="space-y-10">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button onClick={() => onNavigate('portfolio')} className="hover:text-emerald-700">
              All Projects
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">{currentProject.title}</span>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-emerald-300 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                {currentProject.category}
              </span>
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{currentProject.status}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {currentProject.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 mt-4 leading-relaxed max-w-3xl font-normal">
              {currentProject.description}
            </p>

            {/* Links */}
            <div className="pt-8 mt-8 border-t border-slate-100 flex flex-wrap items-center gap-4">
              {currentProject.demoUrl && (
                <a
                  href={currentProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
                >
                  <span>Open Live Application</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 flex items-center gap-2 transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>Inspect Source Code</span>
                </a>
              )}
              <button
                onClick={() => onNavigate('portfolio')}
                className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-bold transition-colors"
              >
                Back to Projects
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-xl font-bold text-slate-900">System Architecture & Pipeline</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Designed to operate in low-latency production environments with clear separation of data ingestion, model inference, and client-side visualization.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-xl font-bold text-slate-900">Technologies Employed</h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {currentProject.technology.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-mono text-xs border border-emerald-200 font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full Portfolio Grid */
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>Engineered Systems</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Portfolio & Engineering Showcase
            </h1>
            <p className="text-sm font-bold text-emerald-700 tracking-wide uppercase">
              Technology | Innovation | Impact
            </p>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Explore deployed software, applied algorithmic classification systems, and CAD automation projects created by STDTech Group.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === cat.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md'
                    : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                onSelect={(slug) => onNavigate('portfolio-detail', slug)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

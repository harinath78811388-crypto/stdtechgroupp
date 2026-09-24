import { ArrowRight, Code2, BrainCircuit, Cpu, ShieldCheck, Sparkles } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  onSelect: (slug: string) => void;
}

export default function ServiceCard({ service, onSelect }: ServiceCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-6 h-6 text-emerald-600" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-6 h-6 text-blue-600" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-pink-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-600" />;
      default:
        return <Code2 className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(service.slug)}
      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/95 hover:bg-white border border-emerald-200/80 hover:border-emerald-400 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-emerald-900/5 cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-emerald-50/90 border border-emerald-200 flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
            {getIcon(service.icon)}
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">0{service.displayOrder}</span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2.5">
          {service.title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3 font-normal">
          {service.shortDescription}
        </p>

        {/* Highlighted Key Features */}
        <div className="space-y-1.5 mb-6">
          {service.features.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="truncate">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {service.techStack.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-semibold"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}

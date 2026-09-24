import { ShieldCheck, ArrowLeft } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import FounderCard from '../components/FounderCard';

interface LeadershipPageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenApplyModal: () => void;
}

export default function LeadershipPage({ onNavigate, onOpenApplyModal }: LeadershipPageProps) {
  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Executive Leadership</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Leadership & Technical Founders
        </h1>
        <p className="text-sm font-bold text-emerald-700 tracking-wide uppercase">
          Authentic Credentials • Transparent Vision
        </p>
        <p className="text-base text-slate-600 leading-relaxed font-normal">
          STDTech Group Pvt Ltd was founded in 2026 by Harinath Verma and Akash Verma. Our leadership blends information technology software architecture with mechanical and CAD engineering disciplines.
        </p>
      </div>

      <FounderCard onApplyOrContact={onOpenApplyModal} />
    </div>
  );
}

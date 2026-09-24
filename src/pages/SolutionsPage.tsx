import { Layers, ShieldCheck, Cpu, Database, Cloud, Zap, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

interface SolutionsPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export default function SolutionsPage({ onNavigate }: SolutionsPageProps) {
  const solutions = [
    {
      title: 'Enterprise Cloud Microservices & Scalability',
      description: 'Decoupled, containerized distributed systems utilizing Docker, Kubernetes, and event-driven message buses designed for 99.99% uptime.',
      icon: Cloud,
      tags: ['Docker', 'Kubernetes', 'Cloud Run', 'gRPC', 'RabbitMQ'],
    },
    {
      title: 'Autonomous AI & Real-Time Predictive Engines',
      description: 'End-to-end machine learning pipelines from ingestion and feature extraction to sub-100ms model inference and drift monitoring.',
      icon: Cpu,
      tags: ['Scikit-Learn', 'PyTorch', 'TensorFlow', 'FastAPI', 'MLOps'],
    },
    {
      title: 'Industrial CAD & Drawing Process Automation',
      description: 'Custom plugins, AutoLISP routines, and parametric scripts that compress multi-day manual blueprint drafts into instantaneous generations.',
      icon: Zap,
      tags: ['AutoCAD API', '.NET C#', 'AutoLISP', 'Mechanical Scripting'],
    },
    {
      title: 'Zero-Trust Cybersecurity & Cryptographic Verification',
      description: 'Hardened identity enforcement, role-based access control (RBAC), tamper-evident QR verification, and end-to-end encrypted databases.',
      icon: ShieldCheck,
      tags: ['JWT', 'Argon2', 'HMAC-SHA256', 'SSL/TLS', 'Audit Logs'],
    },
    {
      title: 'High-Throughput Relational & Document Data Stores',
      description: 'Optimized PostgreSQL relational schemas with ACID compliance alongside flexible in-memory cache layers for sub-millisecond retrieval.',
      icon: Database,
      tags: ['PostgreSQL', 'Redis', 'Connection Pooling', 'Indexing'],
    },
    {
      title: 'Cross-Platform React & Native Client Ecosystems',
      description: 'Mobile-first responsive web apps and native applications with fluid 60fps animations and offline-first state synchronization.',
      icon: Layers,
      tags: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'PWA'],
    },
  ];

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-500/30">
          <Layers className="w-3.5 h-3.5" />
          <span>Architectural Frameworks</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Industrial Solutions & Systems Architecture
        </h1>
        <p className="text-sm font-semibold text-emerald-400 tracking-wide uppercase">
          Technology | Innovation | Impact
        </p>
        <p className="text-base text-slate-400 leading-relaxed">
          We combine cloud-native engineering, artificial intelligence, and mechanical automation to construct robust, enterprise-grade technology ecosystems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.map((sol, idx) => {
          const Icon = sol.icon;
          return (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 text-blue-400 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{sol.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{sol.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {sol.tags.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => onNavigate('contact', sol.title)}
                  className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Request Solution Blueprint</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

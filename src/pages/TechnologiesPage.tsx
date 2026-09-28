import { Code2, BrainCircuit, Database, Cloud, Terminal, Compass } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

interface TechnologiesPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export default function TechnologiesPage({ onNavigate }: TechnologiesPageProps) {
  const categories = [
    {
      title: 'Frontend Engineering',
      icon: Code2,
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
      description: 'Declarative, type-safe interfaces built with modern component frameworks.',
      techs: [
        { name: 'React 18', desc: 'Component architecture with hooks and concurrent mode' },
        { name: 'TypeScript', desc: 'Rigorous type safety across contracts and client logic' },
        { name: 'Vite', desc: 'High-speed build tool and optimized asset pipeline' },
        { name: 'Tailwind CSS', desc: 'Utility-first styling with responsive design tokens' },
        { name: 'Next.js', desc: 'Hybrid server-rendered and static generation' },
      ],
    },
    {
      title: 'Backend & APIs',
      icon: Terminal,
      color: 'text-blue-400 border-blue-500/30 bg-blue-950/40',
      description: 'Asynchronous event loops, RESTful microservices, and gRPC endpoints.',
      techs: [
        { name: 'Node.js & Express', desc: 'High concurrency async I/O server infrastructure' },
        { name: 'Python & FastAPI', desc: 'Type-hinted asynchronous API for ML inference' },
        { name: 'Django REST', desc: 'Robust enterprise backend with ORM security' },
        { name: 'GraphQL & REST', desc: 'Flexible client query schemas and structured endpoints' },
      ],
    },
    {
      title: 'Databases & Storage',
      icon: Database,
      color: 'text-pink-400 border-pink-500/30 bg-pink-950/40',
      description: 'ACID transactional integrity, indexing, and distributed caching.',
      techs: [
        { name: 'PostgreSQL', desc: 'Primary relational database with complex indexing' },
        { name: 'Redis', desc: 'In-memory caching and distributed session management' },
        { name: 'MongoDB', desc: 'Flexible document store for unstructured event logs' },
        { name: 'Drizzle ORM', desc: 'Type-safe SQL dialect generation with migrations' },
      ],
    },
    {
      title: 'AI, Machine Learning & Data Science',
      icon: BrainCircuit,
      color: 'text-purple-400 border-purple-500/30 bg-purple-950/40',
      description: 'Predictive mathematical models, feature engineering, and neural networks.',
      techs: [
        { name: 'Scikit-Learn', desc: 'Supervised classification, regression, and clustering' },
        { name: 'TensorFlow / Keras', desc: 'Deep learning neural architectures and computer vision' },
        { name: 'PyTorch', desc: 'Dynamic tensor computation and modern LLM finetuning' },
        { name: 'Pandas & NumPy', desc: 'Vectorized data cleaning, ETL, and numerical manipulation' },
        { name: 'OpenCV', desc: 'Image processing and real-time visual recognition' },
      ],
    },
    {
      title: 'Cloud & DevOps Infrastructure',
      icon: Cloud,
      color: 'text-teal-400 border-teal-500/30 bg-teal-950/40',
      description: 'Containerized deployment pipelines and scalable cluster topologies.',
      techs: [
        { name: 'Docker', desc: 'Reproducible container images and multi-stage builds' },
        { name: 'Kubernetes', desc: 'Automated pod orchestration and horizontal autoscaling' },
        { name: 'Google Cloud (GCP)', desc: 'Cloud Run, Cloud SQL, and production networking' },
        { name: 'GitHub Actions', desc: 'Automated CI/CD linting, testing, and deployment' },
      ],
    },
    {
      title: 'Engineering & CAD Automation',
      icon: Compass,
      color: 'text-amber-400 border-amber-500/30 bg-amber-950/40',
      description: 'Industrial draft automation, 3D modeling scripts, and mechanical plugins.',
      techs: [
        { name: 'AutoCAD API', desc: 'Direct automation of .dwg geometric pipelines' },
        { name: 'AutoLISP & .NET', desc: 'Custom macros and mechanical parametric tools' },
        { name: 'SolidWorks API', desc: 'Assembly automation and bill-of-materials generation' },
      ],
    },
  ];

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-500/30">
          <Code2 className="w-3.5 h-3.5" />
          <span>Technology Matrix</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Production Technology Stack
        </h1>
        <p className="text-sm font-semibold text-emerald-400 tracking-wide uppercase">
          Technology | Innovation | Impact
        </p>
        <p className="text-base text-slate-400 leading-relaxed">
          Our engineering workflows leverage industry-proven languages, libraries, and cloud platforms engineered for zero downtime and maximum developer velocity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${cat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{cat.title}</h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">{cat.description}</p>

                <div className="space-y-3">
                  {cat.techs.map((t, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                      <strong className="text-xs font-bold text-slate-200 block">{t.name}</strong>
                      <span className="text-[11px] text-slate-400">{t.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

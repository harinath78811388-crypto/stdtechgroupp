import {
  ShieldCheck,
  Target,
  Compass,
  Heart,
  Award,
  Users,
  MapPin,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import FounderCard from '../components/FounderCard';

interface AboutPageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenApplyModal: () => void;
}

export default function AboutPage({ onNavigate, onOpenApplyModal }: AboutPageProps) {
  const values = [
    {
      title: 'Technological Innovation',
      desc: 'Constantly exploring cutting-edge paradigms in artificial intelligence, cloud microservices, and CAD workflow automation.',
      icon: Sparkles,
      color: 'text-emerald-700 border-emerald-300 bg-emerald-50',
    },
    {
      title: 'Authenticity & Integrity',
      desc: 'Transparent business practices, honest credentials, zero simulated claims, and enterprise security at rest and in transit.',
      icon: ShieldCheck,
      color: 'text-blue-700 border-blue-300 bg-blue-50',
    },
    {
      title: 'Practical Excellence',
      desc: 'Delivering software and academic curriculum grounded in measurable industrial outcomes rather than abstract theory.',
      icon: Award,
      color: 'text-pink-700 border-pink-300 bg-pink-50',
    },
    {
      title: 'Community Impact',
      desc: 'Creating direct opportunities for students, businesses, and engineering talent across India and global markets.',
      icon: Heart,
      color: 'text-amber-700 border-amber-300 bg-amber-50',
    },
  ];

  return (
    <div className="space-y-24 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>About STDTech Group Pvt Ltd</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Empowering Progress Through Next-Generation Engineering
        </h1>
        <p className="text-sm font-bold text-emerald-700 tracking-wide uppercase">
          Technology | Innovation | Impact • Founded 2026
        </p>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          STDTech Group is a technology company focused on building software products, delivering digital solutions, developing AI-powered technologies, and providing practical technology education.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-emerald-200 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 mb-6">
              <Target className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
              Our Core Mission
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 mb-4">
              "To empower people, businesses and communities through innovative technology."
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              We design digital infrastructure, production-grade applications, and intelligent systems that give enterprises the agility to lead and provide students with industry-relevant, practical skills.
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-slate-100 text-xs text-slate-600 flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Dedicated to human-centric technological advancement</span>
          </div>
        </div>

        {/* Vision */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-pink-200 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-pink-50 border border-pink-300 flex items-center justify-center text-pink-600 mb-6">
              <Compass className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-pink-800">
              Our Long-Term Vision
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 mb-4">
              "To be a technology company that creates new opportunities for businesses, students and communities in India and around the world."
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              We envision a borderless technological ecosystem where robust software, autonomous AI, and practical education bridge regional divides, fueling global economic and personal growth.
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-slate-100 text-xs text-slate-600 flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-pink-600" />
            <span>Rooted in Ballia, Uttar Pradesh — Serving the Global Stage</span>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <section>
        <SectionHeader
          badge="Guiding Principles"
          title="The Values That Shape Our Craft"
          description="Every software release, client partnership, and training module adheres strictly to our foundational principles."
          accentColor="mint"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${val.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{val.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{val.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Founder & Leadership Section */}
      <section>
        <SectionHeader
          badge="Authentic Leadership"
          title="Founders & Executive Stewardship"
          description="Meet the founders leading STDTech Group with technical vision, operational focus, and genuine transparency."
          accentColor="blue"
        />

        <FounderCard onApplyOrContact={onOpenApplyModal} />
      </section>

      {/* Registered Office Coordinates */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start text-xs font-bold uppercase tracking-wider text-emerald-700">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Registered Headquarters</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">STDTech Group Pvt Ltd</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg font-normal">
            Jitoura, Bansdih, Ballia, Uttar Pradesh, India — 277202
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://maps.app.goo.gl/irMyZbLojZ2Bofk1A"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 border border-slate-200 transition-colors"
          >
            Google Maps Link
          </a>
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md"
          >
            Contact Company
          </button>
        </div>
      </div>
    </div>
  );
}

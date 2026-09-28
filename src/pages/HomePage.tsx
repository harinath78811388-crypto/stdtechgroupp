import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Award,
  Cpu,
  GraduationCap,
  Code2,
  BrainCircuit,
  Layers,
  MapPin,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import Hero3DVisual from '../components/Hero3DVisual';
import SectionHeader from '../components/SectionHeader';
import ServiceCard from '../components/ServiceCard';
import ProductCard from '../components/ProductCard';
import ProjectCard from '../components/ProjectCard';
import CourseCard from '../components/CourseCard';
import FounderCard from '../components/FounderCard';
import {
  ServiceItem,
  ProductItem,
  ProjectItem,
  CourseItem,
  BlogPostItem,
} from '../types';

interface HomePageProps {
  services: ServiceItem[];
  products: ProductItem[];
  projects: ProjectItem[];
  courses: CourseItem[];
  blogPosts: BlogPostItem[];
  onNavigate: (page: string, param?: string) => void;
  onOpenApplyModal: () => void;
}

export default function HomePage({
  services,
  products,
  projects,
  courses,
  blogPosts,
  onNavigate,
  onOpenApplyModal,
}: HomePageProps) {
  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      {/* ========================================================================= */}
      {/* HERO SECTION WITH 3D INTERACTIVE VISUAL */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-8 sm:pt-20 sm:pb-16 overflow-hidden">
        {/* Ambient background glows with mint green and blush pink mixture */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-emerald-400/20 via-pink-400/20 to-teal-300/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero Messaging & CTAs */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-emerald-300 text-emerald-800 text-xs font-bold shadow-xs backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span>STDTech Group Pvt Ltd • Founded 2026</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Building Intelligent Technologies.{' '}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-pink-600 bg-clip-text text-transparent">
                  Delivering Practical Digital Solutions.
                </span>
              </h1>

              <p className="text-sm font-bold tracking-wide text-emerald-700 uppercase">
                Technology | Innovation | Impact
              </p>

              <p className="text-base sm:text-lg text-slate-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                STDTech Group is a technology company focused on building software products, delivering digital solutions, developing AI-powered technologies, and providing practical technology education.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => onNavigate('services')}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm tracking-wide shadow-md shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-slate-900 hover:text-emerald-800 font-bold text-sm border border-emerald-300/80 shadow-xs transition-all flex items-center gap-2"
                >
                  <span>Start a Project</span>
                </button>

                <button
                  onClick={() => onNavigate('verify-cert')}
                  className="px-4 py-3.5 rounded-2xl bg-pink-50 hover:bg-pink-100 text-pink-800 font-bold text-xs border border-pink-300 shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4 text-pink-600" />
                  <span>Verify Certificate</span>
                </button>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Enterprise Code Standards</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>QR Verifiable Credentials</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-pink-600" />
                  <span>Production Domain Ready</span>
                </div>
              </div>
            </div>

            {/* Right Col: 3D Interactive Canvas Visual */}
            <div className="lg:col-span-6">
              <Hero3DVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TRUST METRICS / COMPANY STATS BAR */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-white/90 border border-emerald-200/80 shadow-lg shadow-emerald-950/5 backdrop-blur-md">
          <div className="text-center p-3">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">2026</span>
            <p className="text-xs font-bold text-emerald-700 mt-1 uppercase tracking-wider">
              Incorporated & Founded
            </p>
            <span className="text-[11px] font-medium text-slate-600">Ballia, UP, India</span>
          </div>

          <div className="text-center p-3">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">5</span>
            <p className="text-xs font-bold text-blue-700 mt-1 uppercase tracking-wider">
              Core IT Services
            </p>
            <span className="text-[11px] font-medium text-slate-600">Web, Mobile, AI, Cloud, Consulting</span>
          </div>

          <div className="text-center p-3">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">6+</span>
            <p className="text-xs font-bold text-pink-700 mt-1 uppercase tracking-wider">
              Proprietary Systems
            </p>
            <span className="text-[11px] font-medium text-slate-600">SWAYNIS & Predictive AI</span>
          </div>

          <div className="text-center p-3">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">10</span>
            <p className="text-xs font-bold text-teal-700 mt-1 uppercase tracking-wider">
              Academy Disciplines
            </p>
            <span className="text-[11px] font-medium text-slate-600">Industry-Ready Certification</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5 CORE IT SERVICES SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="End-to-End Capabilities"
          title="Full-Cycle Technology & IT Services"
          description="From custom full-stack software development to advanced neural prediction engines, we engineer secure, scalable solutions built for sustainable growth."
          accentColor="mint"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={(slug) => onNavigate('service-detail', slug)}
            />
          ))}

          {/* Quick CTA card in services grid */}
          <div className="p-7 rounded-2xl bg-gradient-to-br from-emerald-100/90 via-white to-pink-100/80 border border-emerald-300/80 flex flex-col justify-between shadow-md">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white border border-emerald-300 flex items-center justify-center text-emerald-700 mb-4 shadow-xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Need a Custom Digital Architecture?
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                Consult directly with our leadership team for technical discovery, milestone planning, and dedicated engineering support.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Request Technical Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FLAGSHIP PRODUCTS SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Product Portfolio"
          title="Software Products & Autonomous Systems"
          description="Engineered to solve real industrial and business bottlenecks. Featuring our upcoming SWAYNIS AI assistant and specialized machine learning classification systems."
          accentColor="pink"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={(slug) => onNavigate('product-detail', slug)}
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PORTFOLIO HIGHLIGHTS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <SectionHeader
            badge="Executed Engineering"
            title="Portfolio & Case Studies"
            description="Explore our applied machine learning pipelines, full-stack systems, and industrial engineering tools."
            centered={false}
            accentColor="blue"
          />
          <button
            onClick={() => onNavigate('portfolio')}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-800 shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>View All Projects</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 6).map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onSelect={(slug) => onNavigate('portfolio-detail', slug)}
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOUNDER & LEADERSHIP PRESENTATION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Executive Leadership"
          title="Guiding Vision & Operational Precision"
          description="Transparent, authentic leadership committed to transforming ideas into scalable software and creating sustainable technology careers in India and beyond."
          accentColor="mint"
        />

        <FounderCard onApplyOrContact={onOpenApplyModal} />
      </section>

      {/* ========================================================================= */}
      {/* STDTECH ACADEMY & CERTIFICATION BANNER */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50/90 via-white to-pink-50/90 border-2 border-emerald-300/80 p-8 sm:p-12 shadow-xl shadow-emerald-950/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span>STDTech Academy</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Practical Technology Education with Cryptographic QR Verification
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                We bridge the gap between academic theory and high-performance production engineering. Graduates receive a QR-verifiable digital credential with an online verification record.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('training')}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                >
                  Explore 10 Academy Programs
                </button>
                <button
                  onClick={() => onNavigate('verify-cert')}
                  className="px-6 py-3 rounded-xl bg-white hover:bg-pink-50 text-pink-800 font-bold text-xs border border-pink-300 transition-all flex items-center gap-2 shadow-xs"
                >
                  <Award className="w-4 h-4 text-pink-600" />
                  <span>Try Online Verification Tool</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-emerald-200/80 text-center shadow-md">
              <Award className="w-12 h-12 text-emerald-600 mb-2" />
              <h4 className="text-lg font-bold text-slate-900">Live Verification Registry</h4>
              <p className="text-xs text-slate-600 mt-1 mb-4 font-normal">
                Enter an official certificate ID (e.g. STDT-2026-00001) to check its current record, course details, and verification status.
              </p>
              <button
                onClick={() => onNavigate('verify-cert', 'STDT-2026-00001')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
              >
                <span>Verify Sample STDT-2026-00001 →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TECHNICAL ARTICLES & BLOG HIGHLIGHTS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <SectionHeader
            badge="Knowledge & Insights"
            title="Latest Technical Articles"
            description="Engineering deep dives, architectural breakdowns, and best practices from STDTech Group."
            centered={false}
            accentColor="blue"
          />
          <button
            onClick={() => onNavigate('blog')}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white hover:bg-blue-50 border border-blue-300 text-xs font-bold text-blue-800 shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>View All Articles</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              onClick={() => onNavigate('blog-detail', post.slug)}
              className="p-6 rounded-2xl bg-white/95 hover:bg-white border border-slate-200 hover:border-pink-300 transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-700">
                  {post.category} • {post.readingTime}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2 mb-2 line-clamp-2 hover:text-emerald-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                  {post.summary}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>By {post.authorName}</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  Read Article →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-emerald-100 via-white to-pink-100 border-2 border-emerald-300 text-center space-y-6 shadow-xl shadow-emerald-950/5">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Ready to Build Your Next Digital Frontier?
          </h2>
          <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed font-normal">
            Partner with STDTech Group Pvt Ltd to design, engineer, and deploy high-reliability software, scalable AI models, and automated engineering workflows.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-md shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>Schedule Initial Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:7318514528"
              className="px-8 py-4 rounded-2xl bg-white hover:bg-pink-50 text-pink-800 font-bold text-sm border border-pink-300 shadow-xs transition-all"
            >
              Call +91 7318514528
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Landmark, Stethoscope, ShoppingBag, Factory, GraduationCap, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

interface IndustriesPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export default function IndustriesPage({ onNavigate }: IndustriesPageProps) {
  const industries = [
    {
      title: 'Banking, Financial Services & FinTech',
      icon: Landmark,
      description: 'Automated credit underwriting, fraud anomaly detection, loan approval classifiers, and secure transactional banking portals.',
      caseStudy: 'Engineered sub-second loan approval risk classifier processing credit variables.',
      tags: ['Loan Underwriting', 'Risk Scoring', 'Regulatory Compliance', 'Fraud ML'],
    },
    {
      title: 'Healthcare & Medical Diagnostics',
      icon: Stethoscope,
      description: 'Predictive risk stratification, clinical record automation, HIPAA/compliance architectures, and cardiovascular risk classifiers.',
      caseStudy: 'Developed medical metric evaluator calculating patient cardiovascular vulnerability.',
      tags: ['Risk Stratification', 'Clinical Dashboards', 'Patient Portals'],
    },
    {
      title: 'Retail, E-Commerce & Consumer Goods',
      icon: ShoppingBag,
      description: 'Customer segmentation, product return propensity models, inventory telemetry, and omni-channel storefronts.',
      caseStudy: 'Formulated algorithmic return likelihood scoring to reduce reverse logistics costs.',
      tags: ['Return Prediction', 'Inventory Telemetry', 'User Segmentation'],
    },
    {
      title: 'Manufacturing & Industrial CAD Automation',
      icon: Factory,
      description: 'Parametric drawing generators, automated assembly schedules, tolerance analyzers, and shop-floor management software.',
      caseStudy: 'Implemented AutoCAD scripting engine reducing blueprint generation from 4 hours to 90 seconds.',
      tags: ['AutoCAD Scripting', '.dwg Generation', 'Bill of Materials'],
    },
    {
      title: 'Education & EdTech Platforms',
      icon: GraduationCap,
      description: 'Cryptographic certificate verification registries, course management systems, interactive coding sandboxes, and student progress tracking.',
      caseStudy: 'Architected STDTech Trust Registry issuing tamper-proof QR certificates.',
      tags: ['QR Verification', 'LMS Portals', 'Interactive Labs'],
    },
  ];

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-500/30">
          <Factory className="w-3.5 h-3.5" />
          <span>Industry Solutions</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Domain-Specific Technological Solutions
        </h1>
        <p className="text-sm font-semibold text-emerald-400 tracking-wide uppercase">
          Technology | Innovation | Impact
        </p>
        <p className="text-base text-slate-400 leading-relaxed">
          Tailored engineering frameworks addressing compliance, regulatory standards, and operational demands across critical sectors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((ind, idx) => {
          const Icon = ind.icon;
          return (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{ind.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{ind.description}</p>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                    Applied STDTech Case:
                  </span>
                  <p className="text-xs text-slate-300">{ind.caseStudy}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('contact', ind.title)}
                  className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Explore Industry Fit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

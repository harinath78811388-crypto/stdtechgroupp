import { useState } from 'react';
import {
  Code2,
  BrainCircuit,
  Cpu,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  ChevronRight,
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ServiceCard from '../components/ServiceCard';
import { ServiceItem } from '../types';

interface ServicesPageProps {
  services: ServiceItem[];
  selectedServiceSlug?: string;
  onNavigate: (page: string, param?: string) => void;
}

export default function ServicesPage({
  services,
  selectedServiceSlug,
  onNavigate,
}: ServicesPageProps) {
  const currentService = selectedServiceSlug
    ? services.find((s) => s.slug === selectedServiceSlug) || null
    : null;

  return (
    <div className="space-y-20 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* If looking at a single service detail */}
      {currentService ? (
        <div className="space-y-12">
          {/* Breadcrumb navigation */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={() => onNavigate('services')}
              className="hover:text-emerald-700 transition-colors"
            >
              All Services
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">{currentService.title}</span>
          </div>

          {/* Service Detail Hero */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-emerald-300 shadow-xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300">
                Service 0{currentService.displayOrder} • Enterprise Solution
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                {currentService.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                {currentService.detailedDescription || currentService.shortDescription}
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-100 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('contact', currentService.title)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
              >
                Back to All Services
              </button>
            </div>
          </div>

          {/* Features and Architectural Deliverables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Core Functional Capabilities</span>
              </h3>
              <p className="text-xs text-slate-600">
                Engineered with high security, maintainable architecture, and production SLA considerations.
              </p>
              <div className="space-y-3 pt-2">
                {currentService.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-800"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    <span className="leading-relaxed font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <span>Supported Technologies & Frameworks</span>
              </h3>
              <p className="text-xs text-slate-600">
                Modern industry standard frameworks verified for enterprise throughput and stability.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {currentService.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-mono text-xs border border-emerald-200 font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-pink-50 border border-pink-200 mt-6 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-pink-800">
                  Engineering Commitment
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  STDTech Group ensures clean Git repository handoff, modular components, end-to-end testing, and complete documentation for your in-house team.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* All Services Overview */
        <div className="space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300">
              <Code2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>5 Core Offerings</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Enterprise Technology & IT Services
            </h1>
            <p className="text-sm font-bold text-emerald-700 tracking-wide uppercase">
              Technology | Innovation | Impact
            </p>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              We provide comprehensive full-lifecycle technology consulting, software architecture, machine learning engineering, and secure infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={(slug) => onNavigate('service-detail', slug)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Consultation Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-bold text-slate-900">Have a Unique Business Requirement?</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-normal">
            We architect bespoke solutions combining proprietary machine learning algorithms, automated CAD plugins, and responsive cloud apps.
          </p>
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shrink-0 shadow-md"
        >
          Book Technical Discovery Call
        </button>
      </div>
    </div>
  );
}

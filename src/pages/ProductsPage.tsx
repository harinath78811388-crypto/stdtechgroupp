import { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Activity,
  Users,
  Box,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sliders,
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ProductCard from '../components/ProductCard';
import { ProductItem } from '../types';

interface ProductsPageProps {
  products: ProductItem[];
  selectedProductSlug?: string;
  onNavigate: (page: string, param?: string) => void;
}

export default function ProductsPage({
  products,
  selectedProductSlug,
  onNavigate,
}: ProductsPageProps) {
  const currentProduct = selectedProductSlug
    ? products.find((p) => p.slug === selectedProductSlug) || null
    : null;

  // =========================================================================
  // INTERACTIVE ALGORITHMIC SIMULATORS FOR PREDICTION SYSTEMS
  // =========================================================================
  // Loan Simulator
  const [loanIncome, setLoanIncome] = useState(650000);
  const [loanCreditScore, setLoanCreditScore] = useState(740);
  const [loanAmount, setLoanAmount] = useState(1500000);
  const [loanResult, setLoanResult] = useState<any>(null);

  const runLoanSimulation = () => {
    // Standard banking heuristic score
    const dtiRatio = (loanAmount * 0.02) / (loanIncome / 12);
    let score = (loanCreditScore / 850) * 0.6 + (1 - Math.min(1, dtiRatio / 0.5)) * 0.4;
    const isApproved = score >= 0.65;
    const probability = Math.min(99, Math.max(12, Math.round(score * 100)));

    setLoanResult({
      isApproved,
      probability,
      riskTier: score >= 0.8 ? 'Low Risk' : score >= 0.65 ? 'Moderate Risk' : 'High Risk',
      recommendedTerm: '36–60 Months',
    });
  };

  // Heart Risk Simulator
  const [heartAge, setHeartAge] = useState(48);
  const [heartCholesterol, setHeartCholesterol] = useState(210);
  const [heartBP, setHeartBP] = useState(130);
  const [heartMaxHR, setHeartMaxHR] = useState(155);
  const [heartResult, setHeartResult] = useState<any>(null);

  const runHeartSimulation = () => {
    let riskFactor = 0;
    if (heartAge > 45) riskFactor += 0.25;
    if (heartCholesterol > 200) riskFactor += 0.3;
    if (heartBP > 130) riskFactor += 0.25;
    if (heartMaxHR < 140) riskFactor += 0.2;

    const riskPercent = Math.min(94, Math.max(8, Math.round(riskFactor * 100)));
    setHeartResult({
      riskPercent,
      category: riskPercent < 35 ? 'Low Cardiovascular Risk' : riskPercent < 65 ? 'Elevated Risk' : 'High Risk Profile',
      recommendation: riskPercent > 50 ? 'Recommend immediate clinical consultation & lipid panel.' : 'Parameters within normal ranges. Maintain active lifestyle.',
    });
  };

  return (
    <div className="space-y-20 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Product Detail View if selected */}
      {currentProduct ? (
        <div className="space-y-12">
          {/* Header */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-blue-200 shadow-xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
                {currentProduct.category}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  currentProduct.status === 'COMING SOON'
                    ? 'bg-pink-50 text-pink-800 border border-pink-300'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                }`}
              >
                Status: {currentProduct.status}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {currentProduct.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 mt-3 leading-relaxed max-w-3xl font-normal">
              {currentProduct.description}
            </p>

            {currentProduct.status === 'COMING SOON' && (
              <div className="mt-6 p-4 rounded-2xl bg-pink-50 border border-pink-200 text-xs text-pink-900 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-pink-950 font-bold mb-0.5">
                    Official Product Roadmap Notice:
                  </strong>
                  SWAYNIS is currently in active research & development at STDTech Group. Commercial access will be announced during late 2026.
                </div>
              </div>
            )}

            <div className="pt-8 mt-8 border-t border-slate-100 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('contact', currentProduct.name)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md"
              >
                <span>Request Enterprise Demo / Pilot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('products')}
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
              >
                Back to All Products
              </button>
            </div>
          </div>

          {/* Problem & Solution Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                Industry Problem Statement
              </span>
              <h3 className="text-xl font-bold text-slate-900">Challenges Addressed</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {currentProduct.problem}
              </p>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-2">
                  Engineered Solution
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {currentProduct.solution}
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Key Capabilities & Features</h3>
              <div className="space-y-2.5">
                {currentProduct.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 block mb-2">
                  Technology Frameworks:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentProduct.technology.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-mono text-xs border border-emerald-200 font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Live Simulator if applicable */}
          {currentProduct.slug === 'loan-approval-prediction-system' && (
            <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-emerald-200 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <Sliders className="w-5 h-5 text-emerald-600" />
                <h3 className="text-xl font-bold text-slate-900">
                  Interactive Algorithm Testbed: Loan Risk Classifier
                </h3>
              </div>
              <p className="text-xs text-slate-600 mb-6 font-normal">
                Test the algorithmic decision pipeline with sample credit metrics to evaluate classification accuracy.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-xs">
                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Annual Applicant Income (₹): {loanIncome.toLocaleString('en-IN')}
                  </label>
                  <input
                    type="range"
                    min="200000"
                    max="3000000"
                    step="50000"
                    value={loanIncome}
                    onChange={(e) => setLoanIncome(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Credit Bureau Score (CIBIL): {loanCreditScore}
                  </label>
                  <input
                    type="range"
                    min="300"
                    max="850"
                    step="5"
                    value={loanCreditScore}
                    onChange={(e) => setLoanCreditScore(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Requested Loan Amount (₹): {loanAmount.toLocaleString('en-IN')}
                  </label>
                  <input
                    type="range"
                    min="100000"
                    max="5000000"
                    step="50000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={runLoanSimulation}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Run Model Inference</span>
                </button>
              </div>

              {loanResult && (
                <div className="mt-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-300 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-600 font-medium">Classification Outcome:</span>
                    <p
                      className={`text-lg font-black mt-1 ${
                        loanResult.isApproved ? 'text-emerald-700' : 'text-rose-600'
                      }`}
                    >
                      {loanResult.isApproved ? 'APPROVED (HIGH CONFIDENCE)' : 'DECLINED / ELEVATED DTI'}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-600 font-medium">Predicted Approval Probability:</span>
                    <p className="text-lg font-black text-slate-900 mt-1">
                      {loanResult.probability}%
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-600 font-medium">Portfolio Risk Tier:</span>
                    <p className="text-lg font-black text-blue-700 mt-1">
                      {loanResult.riskTier}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentProduct.slug === 'heart-disease-prediction-system' && (
            <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-pink-200 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-rose-600" />
                <h3 className="text-xl font-bold text-slate-900">
                  Interactive Healthcare Testbed: Cardiovascular Risk Estimator
                </h3>
              </div>
              <p className="text-xs text-slate-600 mb-6 font-normal">
                Demonstrates feature weighting and predictive probability calibrated on standardized medical datasets.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-xs">
                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Age: {heartAge} yrs
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="85"
                    value={heartAge}
                    onChange={(e) => setHeartAge(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Cholesterol: {heartCholesterol} mg/dL
                  </label>
                  <input
                    type="range"
                    min="140"
                    max="350"
                    value={heartCholesterol}
                    onChange={(e) => setHeartCholesterol(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Resting BP: {heartBP} mmHg
                  </label>
                  <input
                    type="range"
                    min="90"
                    max="180"
                    value={heartBP}
                    onChange={(e) => setHeartBP(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Max Heart Rate: {heartMaxHR} bpm
                  </label>
                  <input
                    type="range"
                    min="80"
                    max="210"
                    value={heartMaxHR}
                    onChange={(e) => setHeartMaxHR(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>
              </div>

              <button
                onClick={runHeartSimulation}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Evaluate Health Metrics</span>
              </button>

              {heartResult && (
                <div className="mt-6 p-6 rounded-2xl bg-pink-50 border border-pink-300 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-600 font-medium">Risk Assessment:</span>
                    <p className="text-lg font-black text-rose-700 mt-1">
                      {heartResult.category}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-600 font-medium">Relative Probability:</span>
                    <p className="text-lg font-black text-slate-900 mt-1">
                      {heartResult.riskPercent}%
                    </p>
                  </div>
                  <div className="sm:col-span-3 pt-2 text-slate-700 border-t border-pink-200 font-medium">
                    <strong className="text-slate-900">Algorithmic Assessment: </strong> {heartResult.recommendation}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* All Products Grid View */
        <div className="space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-50 text-pink-800 border border-pink-300">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>Proprietary Software Systems</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Software Products & Autonomous Models
            </h1>
            <p className="text-sm font-bold text-emerald-700 tracking-wide uppercase">
              Technology | Innovation | Impact
            </p>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Explore our software products, from automated CAD engineering plugins to intelligent predictive systems designed for financial, medical, and e-commerce decision pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onSelect={(slug) => onNavigate('product-detail', slug)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

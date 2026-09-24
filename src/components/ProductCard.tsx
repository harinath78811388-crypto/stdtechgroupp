import { ArrowRight, Sparkles, Activity, ShieldCheck, Box, Users } from 'lucide-react';
import { ProductItem } from '../types';

interface ProductCardProps {
  product: ProductItem;
  onSelect: (slug: string) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const isComingSoon = product.status === 'COMING SOON';

  const getStatusBadge = () => {
    if (isComingSoon) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-100 text-pink-800 border border-pink-300">
          <span className="h-1.5 w-1.5 rounded-full bg-pink-500 animate-pulse" />
          COMING SOON
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        {product.status}
      </span>
    );
  };

  const getCategoryIcon = () => {
    if (product.name.includes('SWAYNIS')) return <Sparkles className="w-5 h-5 text-pink-600" />;
    if (product.name.includes('Heart')) return <Activity className="w-5 h-5 text-rose-600" />;
    if (product.name.includes('Loan')) return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
    if (product.name.includes('Segment')) return <Users className="w-5 h-5 text-blue-600" />;
    return <Box className="w-5 h-5 text-amber-600" />;
  };

  return (
    <div
      onClick={() => onSelect(product.slug)}
      className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/95 hover:bg-white border border-slate-200 hover:border-pink-300 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-pink-900/5 cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-pink-50/80 border border-pink-200">
              {getCategoryIcon()}
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {product.category}
            </span>
          </div>
          {getStatusBadge()}
        </div>

        <h3 className="text-xl font-bold text-slate-900 group-hover:text-pink-700 transition-colors mb-2">
          {product.name}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3 font-normal">
          {product.description}
        </p>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mb-4 space-y-2">
          <div className="text-[11px] text-slate-700 font-medium">
            <strong className="text-pink-700 font-bold">Problem: </strong>
            <span className="text-slate-600">{product.problem}</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.technology.slice(0, 3).map((t, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-pink-50/60 text-pink-900 border border-pink-200/60 font-semibold"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            {isComingSoon ? 'Expected 2026' : 'Available for Demo'}
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-pink-700 group-hover:translate-x-1 transition-transform">
            <span>Product Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

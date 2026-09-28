interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
  accentColor?: 'mint' | 'blue' | 'pink';
}

export default function SectionHeader({
  badge,
  title,
  description,
  centered = true,
  accentColor = 'mint',
}: SectionHeaderProps) {
  const badgeClasses = {
    mint: 'text-emerald-800 bg-emerald-100/90 border-emerald-300/80 shadow-sm',
    blue: 'text-blue-800 bg-blue-100/90 border-blue-300/80 shadow-sm',
    pink: 'text-pink-800 bg-pink-100/90 border-pink-300/80 shadow-sm',
  }[accentColor];

  return (
    <div className={`mb-12 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${badgeClasses}`}>
            {badge}
          </span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
}

const ProductPlaceholder = ({ className = '' }) => (
  <div className={`relative flex flex-col items-center justify-center bg-paper-200 text-ink-300 ${className}`}>
    <svg width="72" height="72" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="16" y="26" width="32" height="26" rx="3" />
      <rect x="12" y="24" width="40" height="5" rx="2" />
      <line x1="26" y1="52" x2="22" y2="60" />
      <line x1="38" y1="52" x2="42" y2="60" />
      <line x1="24" y1="22" x2="22" y2="14" />
      <line x1="40" y1="22" x2="42" y2="14" />
    </svg>
    <span className="mt-3 text-[10px] uppercase tracking-eyebrow text-ink-400">Photo Coming Soon</span>
  </div>
);

export default ProductPlaceholder;
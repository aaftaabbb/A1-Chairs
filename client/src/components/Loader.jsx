const Loader = ({ text = 'Loading…' }) => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="w-9 h-[3px] bg-paper-300 overflow-hidden">
      <div className="h-full w-1/3 bg-rust-600 animate-[load_1.2s_ease-in-out_infinite]" style={{ animationName: 'load' }} />
    </div>
    <p className="mt-4 text-xs uppercase tracking-eyebrow text-ink-400">{text}</p>
    <style>{`@keyframes load { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%);} }`}</style>
  </div>
);

export default Loader;
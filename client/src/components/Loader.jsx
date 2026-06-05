const Loader = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = { sm: 'w-5 h-5 border-2', md: 'w-8 h-8 border-2', lg: 'w-12 h-12 border-3' };
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div
        className={`${sizes[size]} rounded-full border-slate-600 border-t-cyan-400 animate-spin`}
      />
      {text && <p className="text-slate-400 text-sm">{text}</p>}
    </div>
  );
};

export default Loader;

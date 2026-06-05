const ServiceCard = ({ service, featured = false }) => {
  return (
    <div
      className={`group relative bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 ${
        featured ? 'ring-1 ring-cyan-500/30' : ''
      }`}
    >
      {featured && (
        <span className="absolute top-4 right-4 text-xs font-semibold bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/30">
          Featured
        </span>
      )}
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {service.icon || '🔧'}
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{service.description}</p>
      {service.price && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <span className="text-cyan-400 font-semibold text-sm">{service.price}</span>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;

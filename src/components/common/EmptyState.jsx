import { LuTriangleAlert } from 'react-icons/lu';

export default function EmptyState({
  title = 'Not Found',
  message = 'We couldn’t find what you’re looking for.',
  action,
  variant = 'danger',
  icon: Icon = LuTriangleAlert,
  outline = false,
}) {
  const variants = {
    danger: `text-red-500 ${
      !outline ? 'border-transparent' : 'border-red-500/40'
    } bg-red-500/10`,
    warning: `text-yellow-500 ${
      !outline ? 'border-transparent' : 'border-yellow-500/40'
    } bg-yellow-500/10`,
    info: `text-cyan-500 ${
      !outline ? 'border-transparent' : 'border-cyan-500/40'
    } bg-cyan-500/10`,
    neutral: `text-gray-400 ${
      !outline ? 'border-transparent' : 'border-gray-400/40'
    } bg-gray-400/10`,
  };

  return (
    <div
      className={`p-6 flex flex-col items-center justify-center text-center space-y-3 border ${variants[variant]} animate-fade-in-up`}>
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10">
        <Icon className="w-10 h-10" />
      </div>

      <h2 className="text-heading-md text-slate-400">{title}</h2>
      <p className="text-body-sm text-t-tertiary max-w-sm">{message}</p>

      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

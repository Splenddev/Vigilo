import { LuTriangleAlert } from 'react-icons/lu';

export default function EmptyState({
  title = 'Not Found',
  message = 'We couldn’t find what you’re looking for.',
  action,
  variant = 'danger', // "danger" | "warning" | "info" | "neutral"
  icon: Icon = LuTriangleAlert,
  outline = false,
  background = 'transparent', // "solid" | "transparent" | "gradient"
}) {
  const colors = {
    danger: 'red',
    warning: 'yellow',
    info: 'cyan',
    neutral: 'gray',
  };

  const textColors = {
    danger: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-cyan-500',
    neutral: 'text-gray-400',
  };

  const outlineStyles = {
    danger: 'border-red-500/40',
    warning: 'border-yellow-500/40',
    info: 'border-cyan-500/40',
    neutral: 'border-gray-400/40',
  };

  const bgStyles = {
    solid: `bg-${colors[variant]}-50`,
    transparent: 'bg-transparent',
    gradient: `bg-gradient-to-r from-${colors[variant]}-50 via-white to-${colors[variant]}-50`,
  };

  return (
    <div
      className={`
        p-6 flex flex-col items-center justify-center text-center space-y-3
        border rounded-lg animate-fade-in-up
        ${textColors[variant]}
        ${outline ? outlineStyles[variant] : 'border-transparent'}
        ${bgStyles[background]}
      `}>
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10">
        <Icon className="w-10 h-10" />
      </div>

      <h2 className="text-heading-md text-slate-700 dark:text-slate-300">
        {title}
      </h2>
      <p className="text-body-sm text-slate-500 dark:text-slate-400 max-w-sm">
        {message}
      </p>

      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

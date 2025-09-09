import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import IconRenderer from '../atoms/IconRenderer';

const COLOR_MAP = {
  blue: {
    text: 'text-blue-500',
    bgLight: 'bg-blue-400/10',
    bgDark: 'bg-blue-900/30',
    borderLight: 'border-blue-400/20',
    borderDark: 'border-blue-700',
  },
  emerald: {
    text: 'text-emerald-600',
    bgLight: 'bg-emerald-400/10',
    bgDark: 'bg-emerald-900/30',
    borderLight: 'border-emerald-400/20',
    borderDark: 'border-emerald-700',
  },
  purple: {
    text: 'text-purple-600',
    bgLight: 'bg-purple-400/10',
    bgDark: 'bg-purple-900/30',
    borderLight: 'border-purple-400/20',
    borderDark: 'border-purple-700',
  },
  orange: {
    text: 'text-orange-500',
    bgLight: 'bg-orange-400/10',
    bgDark: 'bg-orange-900/30',
    borderLight: 'border-orange-400/20',
    borderDark: 'border-orange-700',
  },
  red: {
    text: 'text-red-500',
    bgLight: 'bg-red-400/10',
    bgDark: 'bg-red-900/30',
    borderLight: 'border-red-400/20',
    borderDark: 'border-red-700',
  },
  yellow: {
    text: 'text-yellow-500',
    bgLight: 'bg-yellow-400/10',
    bgDark: 'bg-yellow-900/30',
    borderLight: 'border-yellow-400/20',
    borderDark: 'border-yellow-700',
  },
  indigo: {
    text: 'text-indigo-500',
    bgLight: 'bg-indigo-400/10',
    bgDark: 'bg-indigo-900/30',
    borderLight: 'border-indigo-400/20',
    borderDark: 'border-indigo-700',
  },
  pink: {
    text: 'text-pink-500',
    bgLight: 'bg-pink-400/10',
    bgDark: 'bg-pink-900/30',
    borderLight: 'border-pink-400/20',
    borderDark: 'border-pink-700',
  },
  teal: {
    text: 'text-teal-500',
    bgLight: 'bg-teal-400/10',
    bgDark: 'bg-teal-900/30',
    borderLight: 'border-teal-400/20',
    borderDark: 'border-teal-700',
  },
  gray: {
    text: 'text-gray-600',
    bgLight: 'bg-gray-400/10',
    bgDark: 'bg-gray-900/30',
    borderLight: 'border-gray-400/20',
    borderDark: 'border-gray-700',
  },
};

const VARIANTS = {
  light: {
    wrapper: 'bg-white border border-slate-200 shadow-sm hover:shadow-md',
    value: 'text-t-primary',
    label: 'text-t-tertiary',
    icon: 'text-slate-600',
  },
  dark: {
    wrapper: 'bg-slate-800 border border-slate-700 shadow-sm hover:shadow-md',
    value: 'text-t-primary',
    label: 'text-slate-300',
    icon: 'text-slate-300',
  },
  glass: {
    wrapper: 'glass',
    value: 'text-t-primary',
    label: 'text-slate-400 font-semibold',
    icon: 'text-t-tertiary',
  },
};

const ICON_SIZES = {
  sm: 'w-5 h-5',
  md: 'w-7 h-7',
  lg: 'w-9 h-9',
};

const DIRECTION_PRESETS = {
  default: 'icon-value-label-subtitle-trend',
  compact: 'icon-value-label-trend',
  reverse: 'trend-subtitle-label-value-icon',
  minimal: 'value-label-trend',
  iconTop: 'icon-value-label-trend-subtitle',
  valueOnly: 'value',
};

const StatCard = ({
  icon,
  value,
  label,
  trend,
  subtitle,
  className = '',
  variant = 'glass',
  iconColor,
  layout = 'card',
  iconSize = 'md',
  direction,
  trendPosition = 'inline',
  preset = 'default',
  positiveColor = 'text-emerald-500',
  negativeColor = 'text-red-500',
  positiveIcon: PositiveIcon = FiTrendingUp,
  negativeIcon: NegativeIcon = FiTrendingDown,
  formatTrend = (t) => `${Math.abs(t)}%`,
}) => {
  const baseDirection =
    direction || DIRECTION_PRESETS[preset] || DIRECTION_PRESETS.default;

  const styles = VARIANTS[variant] || VARIANTS.glass;

  const color =
    typeof iconColor === 'string' && COLOR_MAP[iconColor]
      ? COLOR_MAP[iconColor]
      : null;
  const colorClasses = {
    text: color ? color.text : styles.icon,
    bg:
      variant === 'light'
        ? color?.bgLight
        : variant === 'dark'
        ? color?.bgDark
        : '',
    border:
      variant === 'light'
        ? color?.borderLight
        : variant === 'dark'
        ? color?.borderDark
        : '',
  };

  const iconClasses = ICON_SIZES[iconSize] || iconSize;

  const renderIcon = () =>
    icon ? (
      <IconRenderer
        icon={icon}
        className={`${iconClasses} ${colorClasses.text}`}
      />
    ) : null;

  const renderTrend = () => {
    if (typeof trend !== 'number') return null;
    const positive = trend > 0;
    const TrendIcon = positive ? PositiveIcon : NegativeIcon;
    return (
      <div
        className={`flex items-center text-sm font-medium ${
          positive ? positiveColor : negativeColor
        }`}>
        <TrendIcon className="mr-1" />
        {formatTrend(trend)}
      </div>
    );
  };

  const parts = {
    icon: renderIcon(),
    value: <div className={`font-bold ${styles.value}`}>{value}</div>,
    label: <div className={`text-sm ${styles.label}`}>{label}</div>,
    subtitle: subtitle && (
      <div className="text-xs text-t-secondary">{subtitle}</div>
    ),
    trend:
      trendPosition === 'inline' && baseDirection.includes('trend')
        ? renderTrend()
        : null,
  };

  const renderContent = () =>
    baseDirection
      .split('-')
      .map((key, i) => <React.Fragment key={i}>{parts[key]}</React.Fragment>);

  if (layout === 'list') {
    return (
      <div
        className={`flex relative items-center gap-3 px-5 rounded-xl py-4 ${className} ${colorClasses.bg} ${colorClasses.border}`}>
        {parts.icon && <div className="flex-shrink-0">{parts.icon}</div>}
        <div className="flex-1">
          {parts.value}
          {parts.label}
          {parts.subtitle}
        </div>
        {trendPosition === 'inline' ? parts.trend : null}
        {trendPosition === 'absolute' && (
          <div className="absolute top-3 right-4">{renderTrend()}</div>
        )}
      </div>
    );
  }

  if (layout === 'inline') {
    return (
      <div
        className={`flex relative items-center gap-2 ${className} ${colorClasses.bg} ${colorClasses.border}`}>
        {renderContent()}
        {trendPosition === 'absolute' && (
          <div className="absolute top-3 right-4">{renderTrend()}</div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl p-4 transition-all flex h-full gap-2 relative flex-col duration-300 ${styles.wrapper} ${colorClasses.bg} ${colorClasses.border} ${className}`}>
      {renderContent()}
      {trendPosition === 'absolute' && (
        <div className="absolute top-3 right-4">{renderTrend()}</div>
      )}
    </div>
  );
};

export default StatCard;

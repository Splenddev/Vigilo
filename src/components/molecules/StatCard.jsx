import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import IconRenderer from '../atoms/IconRenderer';

const COLOR_MAP = {
  blue: {
    text: 'text-blue-500',
    bgLight: 'bg-blue-400/10',
    bgDark: 'bg-blue-600/20',
    borderLight: 'border-blue-400/20',
    borderDark: 'border-blue-400',
  },
  emerald: {
    text: 'text-emerald-600',
    bgLight: 'bg-emerald-400/10',
    bgDark: 'bg-emerald-600/20',
    borderLight: 'border-emerald-400/20',
    borderDark: 'border-emerald-400',
  },
  purple: {
    text: 'text-purple-600',
    bgLight: 'bg-purple-400/10',
    bgDark: 'bg-purple-600/20',
    borderLight: 'border-purple-400/20',
    borderDark: 'border-purple-400',
  },
  orange: {
    text: 'text-orange-500',
    bgLight: 'bg-orange-400/10',
    bgDark: 'bg-orange-600/20',
    borderLight: 'border-orange-400/20',
    borderDark: 'border-orange-400',
  },
  red: {
    text: 'text-red-500',
    bgLight: 'bg-red-400/10',
    bgDark: 'bg-red-600/20',
    borderLight: 'border-red-400/20',
    borderDark: 'border-red-400',
  },
  yellow: {
    text: 'text-yellow-500',
    bgLight: 'bg-yellow-400/10',
    bgDark: 'bg-yellow-600/20',
    borderLight: 'border-yellow-400/20',
    borderDark: 'border-yellow-400',
  },
  green: {
    text: 'text-green-500',
    bgLight: 'bg-green-400/10',
    bgDark: 'bg-green-600/20',
    borderLight: 'border-green-400/20',
    borderDark: 'border-green-400',
  },
  indigo: {
    text: 'text-indigo-500',
    bgLight: 'bg-indigo-400/10',
    bgDark: 'bg-indigo-600/20',
    borderLight: 'border-indigo-400/20',
    borderDark: 'border-indigo-400',
  },
  pink: {
    text: 'text-pink-500',
    bgLight: 'bg-pink-400/10',
    bgDark: 'bg-pink-600/20',
    borderLight: 'border-pink-400/20',
    borderDark: 'border-pink-400',
  },
  teal: {
    text: 'text-teal-500',
    bgLight: 'bg-teal-400/10',
    bgDark: 'bg-teal-600/20',
    borderLight: 'border-teal-400/20',
    borderDark: 'border-teal-400',
  },
  gray: {
    text: 'text-gray-600',
    bgLight: 'bg-gray-400/10',
    bgDark: 'bg-gray-600/20',
    borderLight: 'border-gray-400/20',
    borderDark: 'border-gray-400',
  },
};

const VARIANTS = {
  light: {
    wrapper: 'bg-white shadow-sm hover:shadow-md',
    value: 'text-t-primary',
    label: 'text-t-tertiary',
  },
  dark: {
    wrapper: 'bg-slate-800 shadow-sm hover:shadow-md',
    value: 'text-t-primary',
    label: 'text-slate-300',
  },
  glass: {
    wrapper: 'glass',
    value: 'text-t-primary',
    label: 'text-slate-400 font-semibold',
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

const TREND_POSITION_MAP = {
  'absolute-top': 'absolute top-3 inset-x-0 flex justify-center',
  'absolute-bottom': 'absolute bottom-3 inset-x-0 flex justify-center',
  'absolute-left': 'absolute inset-y-0 left-3 flex items-center',
  'absolute-right': 'absolute inset-y-0 right-3 flex items-center',
  'absolute-top-left': 'absolute top-3 left-3',
  'absolute-top-right': 'absolute top-3 right-3',
  'absolute-bottom-left': 'absolute bottom-3 left-3',
  'absolute-bottom-right': 'absolute bottom-3 right-3',
};

const StatCard = ({
  align = 'start',
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
  onClick = () => {},
}) => {
  const baseDirection =
    direction || DIRECTION_PRESETS[preset] || DIRECTION_PRESETS.default;

  const styles = VARIANTS[variant] || VARIANTS.glass;

  const color = COLOR_MAP[iconColor] || COLOR_MAP.gray;

  const clickable = typeof onClick === 'function';

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
        <TrendIcon className='mr-1' />
        {formatTrend(trend)}
      </div>
    );
  };

  const renderTrendAbsolute = () => {
    if (!trendPosition?.startsWith('absolute')) return null;
    const posClass =
      TREND_POSITION_MAP[trendPosition] ||
      TREND_POSITION_MAP['absolute-top-right'];
    return <div className={posClass}>{renderTrend()}</div>;
  };

  const parts = {
    icon: renderIcon(),
    value: <div className={`font-bold ${styles.value}`}>{value}</div>,
    label: <div className={`text-sm ${colorClasses.text}`}>{label}</div>,
    subtitle: subtitle && (
      <div className='text-xs text-t-secondary'>{subtitle}</div>
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
        onClick={onClick}
        className={`flex relative items-center gap-3 px-5 rounded-xl py-4 ${className} ${
          colorClasses.bg
        } ${colorClasses.border} ${
          clickable ? 'cursor-pointer hover:shadow-lg' : ''
        }`}>
        {parts.icon && <div className='flex-shrink-0'>{parts.icon}</div>}
        <div className='flex-1'>
          {parts.value}
          {parts.label}
          {parts.subtitle}
        </div>
        {trendPosition === 'inline' ? parts.trend : null}
        {renderTrendAbsolute()}
      </div>
    );
  }

  if (layout === 'inline') {
    return (
      <div
        onClick={onClick}
        className={`flex relative items-center border gap-2 ${className} ${
          colorClasses.bg
        } p-4 rounded-xl ${colorClasses.border} ${
          clickable ? 'cursor-pointer hover:shadow-lg' : ''
        }`}>
        {renderContent()}
        {renderTrendAbsolute()}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-4 transition-all flex h-full border gap-2 relative flex-col items-${align} duration-300 ${
        variant === 'glass' ? styles.wrapper : colorClasses.bg
      } ${colorClasses.border} ${className} ${
        clickable ? 'cursor-pointer hover:shadow-lg' : ''
      }`}>
      {renderContent()}
      {renderTrendAbsolute()}
    </div>
  );
};

export default StatCard;

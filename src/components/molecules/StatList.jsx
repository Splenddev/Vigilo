import StatCard from './StatCard';

const StatList = ({ stats = [], variant = 'glass', onStatClick }) => {
  return (
    <div className='grid grid-cols-1  sm:grid-cols-2 gap-3'>
      {stats.map((s, i) => (
        <StatCard
          key={i}
          icon={s.icon}
          value={s.value}
          label={s.label}
          variant={variant}
          layout='list'
          iconColor={s.iconColor}
          onClick={onStatClick ? () => onStatClick(s.key || i, s) : undefined}
        />
      ))}
    </div>
  );
};

export default StatList;

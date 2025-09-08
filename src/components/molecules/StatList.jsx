import StatCard from './StatCard';

const StatList = ({ stats = [], variant = 'glass' }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map((s, i) => (
        <StatCard
          key={i}
          icon={s.icon}
          value={s.value}
          label={s.label}
          variant={variant}
          layout="list"
          iconColor={s.iconColor}
        />
      ))}
    </div>
  );
};

export default StatList;

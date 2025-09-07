// StatList.jsx
import StatCard from './StatCard';

const StatList = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map((s, i) => (
        <StatCard
          key={i}
          icon={s.icon}
          value={s.value}
          label={s.label}
          layout="list"
          iconColor={s.iconColor}
        />
      ))}
    </div>
  );
};

export default StatList;

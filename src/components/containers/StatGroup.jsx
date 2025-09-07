import StatCard from '../molecules/StatCard';

export const StatGroup = ({
  items = [],
  layout = 'grid', // "grid" | "list" | "inline"
  columns = 3, // only for grid
  gap = 'gap-4',
  ...rest
}) => {
  let layoutClasses = '';

  switch (layout) {
    case 'grid':
      layoutClasses = `grid grid-cols-1 sm:grid-cols-${columns} ${gap}`;
      break;
    case 'list':
      layoutClasses = `flex flex-col ${gap}`;
      break;
    case 'inline':
      layoutClasses = `flex flex-wrap ${gap}`;
      break;
    default:
      layoutClasses = `grid grid-cols-1 sm:grid-cols-${columns} ${gap}`;
  }

  return (
    <div className={layoutClasses}>
      {items.map((item, idx) => (
        <StatCard
          key={idx}
          {...item}
          {...rest}
        />
      ))}
    </div>
  );
};

import Info from './Info';

export const HealthStatus = ({ issues, title }) => {
  if (!issues?.length) return null;

  return (
    <div className='my-3'>
      {title && (
        <h3 className='font-semibold mb-2 text-sm text-gray-700'>{title}</h3>
      )}
      <div className='space-y-2'>
        {issues.map((issue, i) => {
          const { type, message } = issue;
          return (
            <Info
              key={i}
              message={message}
              variant={type}
              size='sm'
            />
          );
        })}
      </div>
    </div>
  );
};

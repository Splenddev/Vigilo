import { LuTriangleAlert, LuInfo, LuCircleX, LuCircleCheck } from 'react-icons/lu';

const iconMap = {
  error: <LuCircleX className="w-4 h-4 text-red-600" />,
  warning: <LuTriangleAlert className="w-4 h-4 text-yellow-600" />,
  info: <LuInfo className="w-4 h-4 text-blue-600" />,
  success: <LuCircleCheck className="w-4 h-4 text-green-600" />,
};

const colorMap = {
  error: 'bg-red-50 border-red-300 text-red-700',
  warning: 'bg-yellow-50 border-yellow-300 text-yellow-700',
  info: 'bg-blue-50 border-blue-300 text-blue-700',
  success: 'bg-green-50 border-green-300 text-green-700',
};

export const HealthStatus = ({ issues, title }) => {
  if (!issues?.length) return null;

  return (
    <div className="my-3">
      {title && <h3 className="font-semibold mb-2 text-sm text-gray-700">{title}</h3>}
      <div className="space-y-2">
        {issues.map((issue, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 px-4 py-2 text-sm rounded-lg border shadow-sm ${colorMap[issue.type]}`}
          >
            <div className="mt-0.5">{iconMap[issue.type]}</div>
            <p>{issue.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

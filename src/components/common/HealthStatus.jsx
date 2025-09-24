import {
  LuTriangleAlert,
  LuInfo,
  LuCircleX,
  LuCircleCheck,
} from 'react-icons/lu';
import Button from '../atoms/Button';

const iconMap = {
  error: <LuCircleX className='w-4 h-4 text-red-600' />,
  warning: <LuTriangleAlert className='w-4 h-4 text-yellow-600' />,
  info: <LuInfo className='w-4 h-4 text-blue-600' />,
  success: <LuCircleCheck className='w-4 h-4 text-green-600' />,
};

const colorMap = {
  error: 'bg-red-50 border-red-300 text-red-700',
  warning: 'bg-yellow-50 border-yellow-300 text-yellow-700',
  info: 'bg-blue-50 border-blue-300 text-blue-700',
  success: 'bg-green-50 border-green-300 text-green-700',
};

// 🔑 button style variants that match issue types
const buttonColorMap = {
  error:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400 focus:ring-offset-1',
  warning:
    'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-400 focus:ring-offset-1',
  info: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400 focus:ring-offset-1',
  success:
    'bg-green-600 text-white hover:bg-green-700 focus:ring-green-400 focus:ring-offset-1',
};

export const HealthStatus = ({ issues, title }) => {
  if (!issues?.length) return null;

  return (
    <div className='my-3'>
      {title && (
        <h3 className='font-semibold mb-2 text-sm text-gray-700'>{title}</h3>
      )}
      <div className='space-y-2'>
        {issues.map((issue, i) => {
          const { actionTargetId, actionText, type, message, tabKey } = issue;
          return (
            <div
              key={i}
              className={`flex items-start gap-2 px-4 py-2 text-sm rounded-lg border shadow-sm ${colorMap[type]}`}>
              <div className='mt-0.5'>{iconMap[type]}</div>
              <div>
                <p>{message}</p>
                {actionText && actionTargetId && (
                  <Button
                    size='sm'
                    text={actionText}
                    className={`mt-1.5 ${buttonColorMap[type]}`}
                    variant=''
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import { LuInfo } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const StudentRosterExplainer = () => {
  const navigate = useNavigate();

  return (
    <div className='mb-6'>
      <h2 className='text-xl font-bold'>Student Roster & Enrollment</h2>
      <ul className='list-disc list-inside text-sm text-t-secondary mt-2 space-y-1'>
        <li>Roster entries auto-match with registered student accounts.</li>
        <li>Matched students join automatically after login/sign-up.</li>
        <li>Unmatched students stay “pending” until they register.</li>
        <li>
          Lecturers can send invites or allow self-join (depending on privacy
          settings).
        </li>
      </ul>
      <div className='relative'>
        <button
          onClick={() => navigate('/help', { state: { tab: 'courses' } })}
          className='text-blue-500 text-sm mt-2 inline-flex items-center gap-1 hover:underline relative'>
          <LuInfo className='w-4 h-4' />
          Learn more about enrollment rules
        </button>
      </div>
    </div>
  );
};

export default StudentRosterExplainer;

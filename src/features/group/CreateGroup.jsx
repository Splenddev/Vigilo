import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuLock } from 'react-icons/lu';
import {
  HiOutlineBookOpen,
  HiOutlineInformationCircle,
  HiOutlineLockOpen,
} from 'react-icons/hi';
import Select from '../../components/molecules/Select';
import { faculties, departments } from '../../utils/facultiesDepartments';
import { generateGroupNameSuggestions } from '../../utils/helpers';
import FormInput from '../../components/molecules/FormInput';
import Button from '../../components/atoms/Button';
import TextArea from '../../components/atoms/TextArea';

const CreateGroup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseCode: '',
    name: '',
    faculty: '',
    department: '',
    level: '',
    description: '',
    privacy: 'public',
    policy: 'strict',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset department when faculty changes
    if (name === 'faculty') {
      setFormData((prev) => ({ ...prev, faculty: value, department: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Group created:', formData);
    // TODO: connect to backend API
    navigate('/lecturer/groups');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-heading-xl gradient-text">Create a New Group</h1>
        <p className="text-body-sm text-gray-400 mt-2 max-w-2xl mx-auto">
          Set up a new course-based group for your students. Groups help manage
          sessions, attendance, and resources effectively.
        </p>
      </header>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="card grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
        {/* Course Code */}
        <FormInput
          label="Course Code"
          onChange={handleChange}
          name="courseCode"
          value={formData.courseCode}></FormInput>
        {/* Faculty */}
        <Select
          name="faculty"
          label="Faculty"
          value={formData.faculty}
          onChange={handleChange}
          required
          placeholder="Select Faculty"
          options={faculties.map((faculty) => ({
            value: faculty,
            label: faculty,
          }))}
        />
        {/* Department */}
        <Select
          name="department"
          label="Department"
          value={formData.department}
          onChange={handleChange}
          required
          placeholder={`Select ${
            formData.faculty ? 'Department' : 'a faculty first'
          }`}
          options={
            formData.faculty
              ? departments[formData.faculty]?.map((dept) => ({
                  value: dept.toLowerCase(),
                  label: dept,
                }))
              : []
          }
          disabled={!formData.faculty}
        />
        {/* Level */}
        <Select
          label="Level"
          options={[
            { value: '100', label: '100 Level' },
            { value: '200', label: '200 Level' },
            { value: '300', label: '300 Level' },
            { value: '400', label: '400 Level' },
            { value: '500', label: '500 Level' },
          ]}
          name="level"
          placeholder="Select level"
          value={formData.level}
          onChange={handleChange}
          required
        />
        {/* Group Name */}
        <div className="col-span-1 md:col-span-2">
          <FormInput
            label={
              <div className="flex items-center gap-2">
                Group Name
                <span className="text-gray-400 text-xs flex items-center gap-1">
                  <HiOutlineInformationCircle className="w-4 h-4" />
                  Auto-generated from course details
                </span>
              </div>
            }
            disabled
            value={formData.name}
            placeholder="e.g. BCH303 - Faculty of Pure and Applied Sciences Biochemistry 300 Level"
            onChange={handleChange}
            required
            name="name"
            inputClassName="capitalize"
          />

          {/* Suggestions Box */}
          {generateGroupNameSuggestions(formData).length > 0 && (
            <div className="mt-3 p-4 rounded-xl bg-gray-800/50 border border-gray-700 ">
              <h4 className="text-sm font-medium text-gray-200 mb-2 flex items-center gap-2">
                <HiOutlineBookOpen className="w-4 h-4 text-blue-400" />
                Suggested Group Names
              </h4>
              <p className="text-xs text-gray-400 mb-3">
                Based on the course code, faculty, department, and level you
                selected. Click a suggestion to use it directly.
              </p>
              <ul className="grid sm:grid-cols-2 gap-2">
                {generateGroupNameSuggestions(formData).map((sug, idx) => (
                  <li
                    key={idx}
                    className="h-full">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, name: sug }))
                      }
                      className="block w-full text-left text-sm h-full px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 hover:text-white transition">
                      {sug}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Description */}
        <TextArea
          label="Description (Controlled)"
          name="description"
          value={formData.description}
          className="col-span-1 md:col-span-2"
          onChange={handleChange}
          placeholder="Type description..."
          showClear
          onClear={() => setFormData((p) => ({ ...p, description: '' }))}
          // maxLength={200}
        />
        {/* Attendance Policy */}
        <div>
          <Select
            label="Attendance Policy"
            options={[
              { value: 'strict', label: 'Strict (No late marking)' },
              { value: 'lenient', label: 'Lenient (Grace period allowed)' },
              { value: 'manual', label: 'Manual approval' },
            ]}
            name="policy"
            value={formData.policy}
            onChange={handleChange}
          />
        </div>
        {/* Action Buttons */}
        <div className="col-span-1 md:col-span-2 flex justify-end gap-4 pt-4">
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit">Create Group</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;

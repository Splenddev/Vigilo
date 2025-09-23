import { useState, useEffect } from 'react';
import {
  LuBookOpen,
  LuUsers,
  LuBuilding,
  LuGraduationCap,
  LuFileText,
  LuInfo,
  LuCircleCheck,
  LuCircleAlert,
  LuLightbulb,
  LuArrowRight,
  LuArrowLeft,
  LuUser,
  LuMapPin,
} from 'react-icons/lu';
import { faculties, departments } from '../../utils/facultiesDepartments';
import { generateGroupNameSuggestions } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { useCreateGroup } from '../../hooks/useGroups';
import { useAuth } from '../../hooks/useAuth';
import { useErrorModal } from '../../context/ErrorModalProvider';
import SelectField from '../../components/molecules/Select';
import InputField from '../../components/molecules/FormInput';
import InfoRow from '../../components/molecules/InfoRow';
import Button from '../../components/atoms/Button';
import TextAreaField from '../../components/atoms/TextArea';
import { motion, AnimatePresence } from 'framer-motion';

const CreateGroup = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    courseCode: '',
    name: '',
    venue: '',
    faculty: '',
    department: '',
    level: '',
    description: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { showError, hideError } = useErrorModal();
  const { createGroup, loading, error } = useCreateGroup();
  const { user } = useAuth();

  const steps = [
    {
      number: 1,
      title: 'Course Information',
      description: 'Basic course details and academic structure',
      icon: LuBookOpen,
      fields: ['courseCode', 'faculty', 'department', 'level', 'venue'],
    },
    {
      number: 2,
      title: 'Group Details',
      description: 'Group name and description',
      icon: LuUsers,
      fields: ['name', 'description'],
    },
    {
      number: 3,
      title: 'Review & Create',
      description: 'Confirm all details before creating',
      icon: LuCircleCheck,
      fields: [],
    },
  ];

  // Validation function
  const validateField = (name, value) => {
    const errors = { ...validationErrors };

    switch (name) {
      case 'courseCode':
        if (!value) {
          errors[name] = 'Course code is required';
        } else if (!/^[A-Z]{2,4}\d{3}$/.test(value)) {
          errors[name] =
            'Format: 2-4 letters + 3 digits (e.g., CS101, MATH201)';
        } else {
          delete errors[name];
        }
        break;
      case 'faculty':
        if (!value) {
          errors[name] = 'Faculty selection is required';
        } else {
          delete errors[name];
        }
        break;
      case 'venue':
        if (!value) {
          errors[name] =
            'Please specify the primary venue where this class will be held';
        } else {
          delete errors[name];
        }
        break;
      case 'department':
        if (!value) {
          errors[name] = 'Department selection is required';
        } else {
          delete errors[name];
        }
        break;
      case 'level':
        if (!value) {
          errors[name] = 'Level selection is required';
        } else {
          delete errors[name];
        }
        break;
      case 'name':
        if (!value) {
          errors[name] = 'Group name is required';
        } else if (value.length < 5) {
          errors[name] = 'Group name must be at least 5 characters';
        } else {
          delete errors[name];
        }
        break;
      default:
        break;
    }

    setValidationErrors(errors);
    return !errors[name];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const newData = { ...prev };

      if (name === 'faculty') {
        newData.faculty = value;
        newData.department = '';
      } else if (name === 'courseCode') {
        newData[name] = value.toUpperCase();
      } else {
        newData[name] = value;
      }

      // Auto-generate group name when key fields change
      if (['courseCode', 'department', 'level'].includes(name) && !prev.name) {
        const suggestions = generateGroupNameSuggestions(newData);
        if (suggestions.length > 0) {
          newData.name = suggestions[0];
          setShowSuggestions(true);
        }
      }

      return newData;
    });

    // Validate the field
    validateField(name, value);
  };

  const canProceedToStep = (step) => {
    const stepFields = steps[step - 1].fields;
    return stepFields.every(
      (field) => formData[field] && !validationErrors[field]
    );
  };

  const handleNext = () => {
    if (canProceedToStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user?.schoolId) {
        alert('Missing school info. Please re-login.');
        return;
      }
      const res = await createGroup({ ...formData, schoolId: user.schoolId });

      if (res.success) navigate(`/lecturer/groups/${res.group?._id}/info`);
    } catch (err) {
      console.log(err);
      showError(err, [
        {
          label: 'Retry',
          onClick: handleSubmit,
          variant: 'info',
        },
      ]);
    }
  };

  return (
    <div className='min-h-screen text-white'>
      <div className='max-w-5xl mx-auto px-4 py-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold gradient-text mb-4'>
            Create a New Group
          </h1>
          <p className='text-gray-400 max-w-2xl mx-auto'>
            Set up a course-based group to manage your students, track
            attendance, and organize learning sessions effectively.
          </p>
        </div>

        {/* Progress Steps */}
        <div className='relative flex items-center justify-between mb-12'>
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            const canAccess = currentStep >= step.number;

            return (
              <div
                key={step.number}
                className='flex-1 flex flex-col items-center relative'>
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isCompleted ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute top-6 left-1/2 h-0.5 w-full origin-left ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-700'
                    }`}
                  />
                )}

                {/* Step Circle */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    opacity: 1,
                    backgroundColor: isCompleted
                      ? '#22c55e' // green-500
                      : isActive
                      ? '#3b82f6' // blue-500
                      : canAccess
                      ? '#4b5563' // gray-600
                      : '#374151', // gray-700
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className='w-12 h-12 rounded-full flex items-center justify-center mb-2 z-10 text-white'>
                  {isCompleted ? (
                    <LuCircleCheck className='w-6 h-6' />
                  ) : (
                    <Icon className='w-6 h-6' />
                  )}
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`text-sm font-semibold text-center ${
                    isActive
                      ? 'text-blue-400'
                      : isCompleted
                      ? 'text-green-400'
                      : 'text-gray-400'
                  }`}>
                  {step.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 * index }}
                  className='text-xs text-gray-500 text-center mt-1 max-w-[140px]'>
                  {step.description}
                </motion.p>
              </div>
            );
          })}
        </div>

        {/* Form */}
        <form className='bg-bg-primary rounded-lg shadow-2xl p-8'>
          {/* Step 1: Course Information */}
          {currentStep === 1 && (
            <div className='space-y-6'>
              <div className='flex items-center gap-3 mb-6'>
                <LuBookOpen className='w-6 h-6 text-blue-400' />
                <h2 className='text-2xl font-semibold'>Course Information</h2>
              </div>

              <div className='bg-blue-300/20 border border-blue-500/30 rounded-lg p-4 mb-6'>
                <div className='flex items-start gap-3'>
                  <LuInfo className='w-5 h-5 text-blue-500 mt-0.5 shrink-0' />
                  <div>
                    <h3 className='text-blue-500 font-medium mb-1'>
                      What is this step about?
                    </h3>
                    <p className='text-blue-300 text-sm'>
                      This information helps organize your group within your
                      institution's academic structure. Students will see these
                      details when they join your group.
                    </p>
                  </div>
                </div>
              </div>

              <div className='grid md:grid-cols-2 gap-6'>
                <InputField
                  label='Course Code'
                  name='courseCode'
                  value={formData.courseCode}
                  onChange={handleChange}
                  placeholder='e.g., CS101, MATH201'
                  required
                  error={validationErrors.courseCode}
                  helpText='Official course identifier from your curriculum (letters followed by numbers)'
                />

                <InputField
                  label='Course Venue'
                  name='venue'
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder='e.g., Main Auditorium, Room 204'
                  required
                  error={validationErrors.venue}
                  helpText='Enter the main location where this class is held'
                />

                <SelectField
                  label='Faculty'
                  name='faculty'
                  value={formData.faculty}
                  onChange={handleChange}
                  options={faculties.map((faculty) => ({
                    value: faculty,
                    label: faculty,
                  }))}
                  placeholder='Select your faculty'
                  required
                  error={validationErrors.faculty}
                  helpText='The broad academic division this course belongs to'
                />

                <SelectField
                  label='Department'
                  name='department'
                  value={formData.department}
                  onChange={handleChange}
                  options={
                    formData.faculty
                      ? departments[formData.faculty]?.map((dept) => ({
                          value: dept,
                          label: dept,
                        })) || []
                      : []
                  }
                  placeholder={
                    formData.faculty
                      ? 'Select department'
                      : 'Choose faculty first'
                  }
                  disabled={!formData.faculty}
                  required
                  error={validationErrors.department}
                  helpText='Specific academic department offering this course'
                />

                <SelectField
                  label='Academic Level'
                  name='level'
                  value={formData.level}
                  onChange={handleChange}
                  options={[
                    { value: '100', label: '100 Level (Year 1)' },
                    { value: '200', label: '200 Level (Year 2)' },
                    { value: '300', label: '300 Level (Year 3)' },
                    { value: '400', label: '400 Level (Year 4)' },
                    { value: '500', label: '500 Level (Year 5)' },
                    { value: '600', label: '600 Level (Year 6)' },
                  ]}
                  placeholder='Select academic level'
                  required
                  error={validationErrors.level}
                  helpText='Academic year/level of students taking this course'
                />
              </div>
            </div>
          )}

          {/* Step 2: Group Details */}
          {currentStep === 2 && (
            <div className='space-y-6'>
              <div className='flex items-center gap-3 mb-6'>
                <LuUsers className='w-6 h-6 text-blue-400' />
                <h2 className='text-2xl font-semibold'>Group Details</h2>
              </div>

              <div className='bg-purple-300/20 border border-purple-500/30 rounded-lg p-4 mb-6'>
                <div className='flex items-start gap-3'>
                  <LuLightbulb className='w-5 h-5 text-purple-500 mt-0.5' />
                  <div>
                    <h3 className='text-purple-500 font-medium mb-1'>
                      Naming your group
                    </h3>
                    <p className='text-purple-300 text-sm'>
                      A good group name should be clear and include the course
                      code.
                    </p>
                  </div>
                </div>
              </div>

              <InputField
                label='Group Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='e.g., CS101 - Introduction to Programming'
                required
                error={validationErrors.name}
                helpText='A descriptive name that students can easily identify'
              />

              {/* Name Suggestions */}
              {showSuggestions &&
                generateGroupNameSuggestions(formData).length > 0 && (
                  <div className='bg-bg-secondary rounded-lg p-4 border border-bg-glass-md'>
                    <div className='flex items-center gap-2 mb-3'>
                      <LuLightbulb className='w-5 h-5 text-yellow-400' />
                      <h3 className='text-sm font-medium text-yellow-400'>
                        Suggested Names
                      </h3>
                    </div>
                    <p className='text-xs text-gray-400 mb-3'>
                      Based on your course information. Click any suggestion to
                      use it:
                    </p>
                    <div className='space-y-2'>
                      {generateGroupNameSuggestions(formData).map(
                        (suggestion, index) => (
                          <button
                            key={index}
                            type='button'
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                name: suggestion,
                              }));
                              setShowSuggestions(false);
                            }}
                            className='block w-full text-left px-3 py-2 bg-bg-tertiary hover:bg-bg-glass-lg rounded-lg text-sm text-t-tertiary hover:text-t-primary transition-colors'>
                            {suggestion}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}

              <TextAreaField
                label='Group Description'
                name='description'
                value={formData.description}
                onChange={handleChange}
                placeholder='Describe what this group is for, any specific requirements, or additional information for students...'
                maxLength={300}
                helpText='Optional: Provide context about the course content, prerequisites, or expectations'
              />
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className='space-y-6'>
              <div className='flex items-center gap-3 mb-6'>
                <LuCircleCheck className='w-6 h-6 text-green-400' />
                <h2 className='text-2xl font-semibold'>Review & Create</h2>
              </div>

              <div className='bg-green-300/20 border border-green-500/30 rounded-lg p-4 mb-6'>
                <div className='flex items-start gap-3'>
                  <LuInfo className='w-7 h-7 text-green-500 mt-0.5 shrink-0' />
                  <div>
                    <h3 className='text-green-500 font-medium mb-1'>
                      Almost done!
                    </h3>
                    <p className='text-green-300 text-sm'>
                      Review all the information below. Once created, you can
                      modify most details later, but the course code and
                      academic structure will be permanent.
                    </p>
                  </div>
                </div>
              </div>

              <div className='card space-y-4'>
                <h3 className='text-lg font-medium mb-4'>Group Summary</h3>

                <div className='grid md:grid-cols-2 gap-6'>
                  <div className='space-y-4'>
                    <InfoRow
                      label='Course Code'
                      icon={LuBookOpen}
                      textColor='text-blue-400'
                      subLabel={formData.courseCode}
                    />
                    <InfoRow
                      label='Faculty'
                      icon={LuBuilding}
                      textColor='text-blue-400'
                      subLabel={formData.faculty}
                    />
                    <InfoRow
                      label='Department'
                      icon={LuGraduationCap}
                      textColor='text-blue-400'
                      subLabel={formData.department}
                    />
                    <InfoRow
                      label='Venue'
                      icon={LuMapPin}
                      textColor='text-blue-400'
                      subLabel={formData.venue}
                    />
                  </div>
                  <div className='space-y-4'>
                    <InfoRow
                      label='Academic Level'
                      icon={LuUsers}
                      textColor='text-purple-400'
                      subLabel={`${formData.level}L`}
                    />
                    <InfoRow
                      label='Group Name'
                      icon={LuFileText}
                      textColor='text-purple-400'
                      subLabel={formData.name}
                    />
                    <InfoRow
                      label='Created By'
                      icon={LuUser}
                      textColor='text-purple-400'
                      subLabel={`${user.firstName} ${user.lastName}`}
                    />
                  </div>
                </div>

                {formData.description && (
                  <div className='mt-6 pt-4 border-t border-bg-glass-md'>
                    <p className='text-sm text-gray-400 mb-2'>Description</p>
                    <p className='text-t-tertiary'>{formData.description}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className='flex justify-between mt-8 pt-6 border-t border-bg-glass-md'>
            <Button
              type='button'
              onClick={handleBack}
              disabled={currentStep === 1}
              size='sm'
              variant='ghost'>
              <LuArrowLeft className='w-4 h-4' /> Previous
            </Button>

            <div className='flex gap-3'>
              {currentStep < steps.length ? (
                <Button
                  type='button'
                  onClick={handleNext}
                  disabled={!canProceedToStep(currentStep)}
                  className='px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2'>
                  Next <LuArrowRight className='w-4 h-4' />
                </Button>
              ) : (
                <Button
                  type='button'
                  onClick={handleSubmit}
                  disabled={loading || Object.keys(validationErrors).length > 0}
                  className='px-8 py-3 bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2 font-medium'
                  loading={loading}>
                  <LuCircleCheck className='w-5 h-5' />
                  Create Group
                </Button>
              )}
            </div>
          </div>
        </form>

        {/* Additional Information */}
        <div className='mt-8 card'>
          <h3 className='text-lg font-medium mb-3 flex items-center gap-2'>
            <LuInfo className='w-5 h-5 text-blue-400' />
            What happens after creating a group?
          </h3>
          <div className='space-y-2 text-sm text-t-secondary'>
            <p>
              • Students can search for and join your group using the course
              code
            </p>
            <p>
              • You'll get a unique group ID that you can share directly with
              students
            </p>
            <p>
              • You can start creating sessions, taking attendance, and sharing
              resources
            </p>
            <p>
              • Group settings can be modified anytime from the group management
              page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;

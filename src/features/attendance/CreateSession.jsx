import { useState } from 'react';
import {
  LuCalendar,
  LuClock,
  LuMapPin,
  LuUsers,
  LuBookOpen,
  LuUser,
  LuMail,
  LuTimer,
  LuSave,
  LuX,
} from 'react-icons/lu';
import Header from '../../components/molecules/Header';

export default function CreateSession() {
  const [formData, setFormData] = useState({
    course: { id: '', name: '' },
    instructor: { id: '', name: '', email: '' },
    date: '',
    time: '',
    duration: 60,
    location: { room: '', building: '' },
    sessionType: 'lecture',
    attendance: { present: 0, total: 0 },
  });

  const [errors, setErrors] = useState({});

  const sessionTypes = [
    'lecture',
    'tutorial',
    'laboratory',
    'seminar',
    'workshop',
    'exam',
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.course.name)
      newErrors['course.name'] = 'Course name is required';
    if (!formData.instructor.name)
      newErrors['instructor.name'] = 'Instructor name is required';
    if (!formData.instructor.email)
      newErrors['instructor.email'] = 'Instructor email is required';
    if (!formData.date) newErrors['date'] = 'Date is required';
    if (!formData.time) newErrors['time'] = 'Time is required';
    if (!formData.location.room)
      newErrors['location.room'] = 'Room is required';
    if (!formData.location.building)
      newErrors['location.building'] = 'Building is required';
    if (formData.duration < 15)
      newErrors['duration'] = 'Duration must be at least 15 minutes';
    if (formData.attendance.total < 0)
      newErrors['attendance.total'] = 'Total attendance cannot be negative';

    if (formData.instructor.email && !formData.instructor.email.includes('@')) {
      newErrors['instructor.email'] = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Generate a unique ID for the session
      const sessionData = {
        ...formData,
        id: `session_${Date.now()}`,
        course: {
          ...formData.course,
          id: formData.course.id || `course_${Date.now()}`,
        },
        instructor: {
          ...formData.instructor,
          id: formData.instructor.id || `instructor_${Date.now()}`,
        },
      };

      console.log('Session created:', sessionData);
      alert('Attendance session created successfully!');
    }
  };

  const handleReset = () => {
    setFormData({
      course: { id: '', name: '' },
      instructor: { id: '', name: '', email: '' },
      date: '',
      time: '',
      duration: 60,
      location: { room: '', building: '' },
      sessionType: 'lecture',
      attendance: { present: 0, total: 0 },
    });
    setErrors({});
  };

  const getFieldError = (field) => errors[field];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div>
        {/* Header */}
        <div className="text-center mb-5 animate-fade-in-up">
          <h1 className="text-2xl text-white mb-4 gradient-text">
            Create New Attendance Session
          </h1>
          <p className="text-body text-gray-300">
            Set up a new attendance tracking session for your course
          </p>
        </div>

        {/* Main Form */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Course Information */}
            <div className="card-hover animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <LuBookOpen className="w-6 h-6 text-purple-400" />
                <h2 className="text-heading-md text-white">
                  Course Information
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-body-sm font-medium text-gray-300 mb-2">
                    Course Name *
                  </label>
                  <input
                    type="text"
                    value={formData.course.name}
                    onChange={(e) =>
                      handleInputChange('course.name', e.target.value)
                    }
                    placeholder="e.g., Computer Science 101"
                    className={`w-full ${
                      getFieldError('course.name')
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : ''
                    }`}
                  />
                  {getFieldError('course.name') && (
                    <p className="text-red-400 text-body-xs mt-1">
                      {getFieldError('course.name')}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-body-sm font-medium text-gray-300 mb-2">
                    Session Type *
                  </label>
                  <select
                    value={formData.sessionType}
                    onChange={(e) =>
                      handleInputChange('sessionType', e.target.value)
                    }
                    className="w-full">
                    {sessionTypes.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="bg-slate-800 text-white">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Session Details */}
            <div className="card-hover animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <LuCalendar className="w-6 h-6 text-cyan-400" />
                <h2 className="text-heading-md text-white">Session Details</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-body-sm font-medium text-gray-300 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        handleInputChange('date', e.target.value)
                      }
                      className={`w-full ${
                        getFieldError('date')
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : ''
                      }`}
                    />
                    {getFieldError('date') && (
                      <p className="text-red-400 text-body-xs mt-1">
                        {getFieldError('date')}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-body-sm font-medium text-gray-300 mb-2">
                      Time *
                    </label>
                    <div className="relative">
                      <LuClock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) =>
                          handleInputChange('time', e.target.value)
                        }
                        className={`w-full pl-12 ${
                          getFieldError('time')
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : ''
                        }`}
                      />
                    </div>
                    {getFieldError('time') && (
                      <p className="text-red-400 text-body-xs mt-1">
                        {getFieldError('time')}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-body-sm font-medium text-gray-300 mb-2">
                    Duration (minutes) *
                  </label>
                  <div className="relative">
                    <LuTimer className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      min="15"
                      max="480"
                      value={formData.duration}
                      onChange={(e) =>
                        handleInputChange(
                          'duration',
                          parseInt(e.target.value) || 0
                        )
                      }
                      placeholder="60"
                      className={`w-full pl-12 ${
                        getFieldError('duration')
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : ''
                      }`}
                    />
                  </div>
                  {getFieldError('duration') && (
                    <p className="text-red-400 text-body-xs mt-1">
                      {getFieldError('duration')}
                    </p>
                  )}
                  <p className="text-body-xs text-gray-400 mt-1">
                    Enter duration in minutes (15-480)
                  </p>
                </div>
              </div>
            </div>

            {/* Location & Attendance */}
            <div className="card-hover animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <LuMapPin className="w-6 h-6 text-purple-400" />
                <h2 className="text-heading-md text-white">Location</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-body-sm font-medium text-gray-300 mb-2">
                      Building *
                    </label>
                    <input
                      type="text"
                      value={formData.location.building}
                      onChange={(e) =>
                        handleInputChange('location.building', e.target.value)
                      }
                      placeholder="e.g., Science Building"
                      className={`w-full ${
                        getFieldError('location.building')
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : ''
                      }`}
                    />
                    {getFieldError('location.building') && (
                      <p className="text-red-400 text-body-xs mt-1">
                        {getFieldError('location.building')}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-body-sm font-medium text-gray-300 mb-2">
                      Room *
                    </label>
                    <input
                      type="text"
                      value={formData.location.room}
                      onChange={(e) =>
                        handleInputChange('location.room', e.target.value)
                      }
                      placeholder="e.g., 101"
                      className={`w-full ${
                        getFieldError('location.room')
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : ''
                      }`}
                    />
                    {getFieldError('location.room') && (
                      <p className="text-red-400 text-body-xs mt-1">
                        {getFieldError('location.room')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="glass rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="btn-ghost flex items-center justify-center gap-2 px-6 py-3">
                <LuX className="w-5 h-5" />
                Reset Form
              </button>

              <button
                type="submit"
                className="btn-primary flex items-center justify-center gap-2 px-8 py-3 rounded-xl">
                <LuSave className="w-5 h-5" />
                Create Session
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="card mt-8 text-center animate-fade-in-up">
          <div className="flex items-center justify-center gap-2 mb-3">
            <LuUsers className="w-5 h-5 text-cyan-400" />
            <p className="text-body-sm text-gray-300">
              Once created, you can start tracking attendance for this session
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

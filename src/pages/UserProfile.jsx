import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit } from 'react-icons/fi';
import {
  LuUser,
  LuMail,
  LuPhone,
  LuMapPin,
  LuCalendar,
  LuBookOpen,
  LuAward,
  LuUsers,
  LuSettings,
  LuBell,
  LuStar,
  LuTrendingUp,
  LuClock,
  LuGraduationCap,
  LuArrowLeft,
  LuCalendarDays,
} from 'react-icons/lu';
import { fadeInUpChild } from '../utils/animationVariants';

const UserProfile = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState('student');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const studentData = {
    name: 'Alex Chen',
    email: 'alex.chen@university.edu',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    avatar: 'AC',
    joinDate: 'September 2022',
    role: 'student',
    year: '3rd Year',
    gpa: '98%',
    credits: '90/120',
    department: 'Computer Science',
    stats: [
      { label: 'Courses Completed', value: '24', icon: LuBookOpen },
      { label: 'Overall Attendance', value: '98%', icon: LuTrendingUp },
      { label: 'Credits Earned', value: '90', icon: LuAward },
      { label: 'Study Groups', value: '5', icon: LuUsers },
    ],
    recentActivity: [
      'Completed Assignment: Data Structures Project',
      'Joined Study Group: Advanced Algorithms',
      'Submitted Midterm: Database Systems',
      'Attended Seminar: AI in Healthcare',
    ],
    skills: [
      'JavaScript',
      'Python',
      'React',
      'Node.js',
      'SQL',
      'Machine Learning',
    ],
  };

  const lecturerData = {
    name: 'Dr. Sarah Martinez',
    email: 's.martinez@university.edu',
    phone: '+1 (555) 987-6543',
    location: 'Boston, MA',
    avatar: 'SM',
    joinDate: 'August 2018',
    role: 'lecturer',
    department: 'Computer Science',
    office: 'Room 304, Tech Building',
    teachingLoad: '12 hours/week',
    stats: [
      { label: 'Active Courses', value: '4', icon: LuBookOpen },
      { label: 'Students Taught', value: '240', icon: LuUsers },
      { label: 'Research Papers', value: '28', icon: LuAward },
      { label: 'Years Experience', value: '8', icon: LuClock },
    ],
    recentActivity: [
      'Published: Neural Networks in Medical Diagnosis',
      'Graded: Machine Learning Final Exams',
      'Scheduled: Office Hours for Algorithm Design',
      'Updated: Course Materials for Spring 2024',
    ],
    expertise: [
      'Machine Learning',
      'Data Mining',
      'Neural Networks',
      'Algorithm Design',
      'Research Methodology',
    ],
  };

  const currentData = activeRole === 'student' ? studentData : lecturerData;

  // Handle editing inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    // Normally would send to backend
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-4 md:p-8"
      style={{
        background:
          'linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)',
      }}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUpChild}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all">
              <LuArrowLeft className="w-4 h-4" />
              Back
            </button>
            <h1 className="text-2xl font-bold gradient-text">Profile</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button className="p-3 bg-white/5 border border-white/20 rounded-xl hover:bg-white/10">
                <LuBell className="w-5 h-5 text-gray-300" />
              </button>
              <button className="p-3 bg-white/5 border border-white/20 rounded-xl hover:bg-white/10">
                <LuSettings className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>
        </motion.div>
        <div className="flex place-self-end bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-1">
          {['student', 'lecturer'].map((role) => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                activeRole === role
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}>
              {role === 'student' ? (
                <LuGraduationCap className="w-4 h-4 inline-block mr-2" />
              ) : (
                <LuUser className="w-4 h-4 inline-block mr-2" />
              )}
              {role === 'student' ? 'Student View' : 'Lecturer View'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="bg-white/5 border border-white/20 rounded-2xl p-6 mb-3 h-full">
              <div className="text-center flex flex-col h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white shadow-xl">
                  {currentData.avatar}
                </motion.div>

                {isEditing ? (
                  <div className="space-y-3 text-left">
                    {['name', 'email', 'phone', 'location'].map((field) => (
                      <input
                        key={field}
                        name={field}
                        defaultValue={currentData[field]}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ))}
                    <button
                      onClick={handleSave}
                      className="w-full mt-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-xl shadow-lg hover:scale-105 transition">
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {currentData.name}
                    </h2>
                    <p className="text-purple-400 mb-2">{currentData.role}</p>

                    <div className="items-center mb-6 flex flex-wrap md:flex-col gap-6">
                      <p className="text-sm text-gray-300 flex items-center">
                        <LuMail className="mr-2 text-purple-400" />{' '}
                        {currentData.email}
                      </p>
                      <p className="text-sm text-gray-300 flex items-center">
                        <LuPhone className="mr-2 text-purple-400" />{' '}
                        {currentData.phone}
                      </p>
                      <p className="text-sm text-gray-300 flex items-center">
                        <LuGraduationCap className="mr-2 text-purple-400" />{' '}
                        {currentData.department}
                      </p>
                      <p className="text-sm text-gray-300 flex items-center">
                        <LuMapPin className="mr-2 text-purple-400" />{' '}
                        {currentData.location}
                      </p>
                      <p className="text-sm text-gray-300 flex items-center">
                        <LuCalendarDays className="mr-2 text-purple-400" />{' '}
                        {currentData.year}
                      </p>

                      <p className="text-sm text-gray-300 flex items-center">
                        <LuCalendar className="mr-2 text-purple-400" /> Joined{' '}
                        {currentData.joinDate}
                      </p>
                    </div>

                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full mt-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-xl hover:scale-105 transform transition-all duration-200 shadow-lg">
                      <FiEdit className="w-4 h-4 inline-block mr-2" />
                      Edit Profile
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {currentData.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUpChild}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 border border-white/20 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-6 h-6 text-purple-400" />
                    <span className="text-2xl font-bold text-white">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUpChild}
              className="bg-white/5 border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <LuClock className="w-5 h-5 mr-2 text-purple-400" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {currentData.recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {activity}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skills/Expertise */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUpChild}
              className="bg-white/5 border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <LuStar className="w-5 h-5 mr-2 text-purple-400" />
                {activeRole === 'student' ? 'Skills' : 'Areas of Expertise'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(activeRole === 'student'
                  ? currentData.skills
                  : currentData.expertise
                ).map((skill, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm">
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;

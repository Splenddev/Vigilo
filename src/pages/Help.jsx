import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuSearch,
  LuUser,
  LuGraduationCap,
  LuCalendar,
  LuUsers,
  LuSettings,
  LuBookOpen,
  LuClock,
  LuMapPin,
  LuFileText,
  LuDownload,
  LuFilter,
  LuChevronDown,
  LuChevronRight,
  LuChartBar,
  LuUserCheck,
  LuPlus,
  LuTrash2,
  LuUpload,
  LuMail,
  LuPhone,
  LuCircleHelp,
  LuCircleCheck,
  LuTriangleAlert,
  LuInfo,
  LuX,
} from 'react-icons/lu';
import {FiHome, FiEdit3 } from 'react-icons/fi';

const HelpPage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [activeRole, setActiveRole] = useState('lecturer');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.3 },
    },
  };

  const faqVariants = {
    closed: { height: 0, opacity: 0 },
    open: {
      height: 'auto',
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const sections = [
    { id: 'overview', title: 'Overview', icon: FiHome },
    { id: 'quick-start', title: 'Quick Start', icon: LuCircleCheck },
    { id: 'courses', title: 'Courses & Groups', icon: LuBookOpen },
    { id: 'sessions', title: 'Sessions', icon: LuCalendar },
    { id: 'students', title: 'Students', icon: LuUsers },
    { id: 'filters', title: 'Filters & Search', icon: LuFilter },
    { id: 'workflows', title: 'Workflows', icon: LuChartBar },
    { id: 'troubleshooting', title: 'Troubleshooting', icon: LuCircleHelp },
  ];

  const keyTerms = [
    {
      term: 'Course',
      definition:
        'A subject or class (e.g., Data Structures). Courses can have one or more groups.',
      icon: LuBookOpen,
    },
    {
      term: 'Course-based Groups',
      definition:
        'Subsets of students within a course used for sessions, filtering, or reports.',
      icon: LuUsers,
    },
    {
      term: 'Session',
      definition:
        'A single class meeting with status: scheduled, ongoing, or completed.',
      icon: LuClock,
    },
    {
      term: 'Attendance',
      definition:
        'Presence data for a session displayed as both count and percentage.',
      icon: LuUserCheck,
    },
  ];

  const quickStartSteps = {
    lecturer: [
      {
        step: 'Create a Course',
        description: 'Add course details and optional groups',
        icon: LuPlus,
      },
      {
        step: 'Add Students',
        description: 'Import or add students individually',
        icon: LuUsers,
      },
      {
        step: 'Schedule Sessions',
        description: 'Set type, date, time, and location',
        icon: LuCalendar,
      },
      {
        step: 'Run Session',
        description: 'Start session and mark attendance',
        icon: LuUserCheck,
      },
      {
        step: 'Complete & Export',
        description: 'Finalize and export attendance data',
        icon: LuDownload,
      },
    ],
    student: [
      { step: 'Sign In', description: 'Access your dashboard', icon: LuUser },
      {
        step: 'View Sessions',
        description: "Check today's or weekly schedule",
        icon: LuCalendar,
      },
      {
        step: 'Track Attendance',
        description: 'Monitor your attendance history',
        icon: LuChartBar,
      },
      {
        step: 'Update Profile',
        description: 'Manage your personal information',
        icon: LuSettings,
      },
    ],
  };

  const sessionTypes = [
    { type: 'Lecture', icon: LuGraduationCap, color: 'text-purple-400' },
    { type: 'Lab', icon: LuSettings, color: 'text-cyan-400' },
    { type: 'Seminar', icon: LuUsers, color: 'text-pink-400' },
    { type: 'Workshop', icon: LuBookOpen, color: 'text-yellow-400' },
    { type: 'Ad-hoc', icon: LuClock, color: 'text-green-400' },
  ];

  const faqData = [
    {
      question: 'Can I create a session without a course?',
      answer:
        'Yes. Use a Guest/Seminar session by leaving the Course field blank. This is useful for one-off events or seminars.',
    },
    {
      question: 'What do the session statuses mean?',
      answer:
        'Scheduled: Future or not yet started. Ongoing: Currently in progress. Completed: Finished and usually locked for edits.',
    },
    {
      question: 'How is attendance rate calculated?',
      answer:
        'Attendance rate is calculated as: present students ÷ total students × 100. The app shows both the fraction (38/45) and percentage (84%).',
    },
    {
      question: "I can't see my course. What should I do?",
      answer:
        "Confirm you're enrolled (Students) or assigned as a lecturer (Lecturers). Also check your active filters - you might be filtering it out.",
    },
    {
      question: 'Can I edit attendance after completing a session?',
      answer:
        "Depending on your organization's policy, you may need admin permission to reopen a completed session. Contact your administrator.",
    },
    {
      question: 'What file format is supported for student import?',
      answer:
        'CSV files with UTF-8 encoding. Required columns: Name, Email/ID, and Course/Group mappings. Ensure comma separators are used.',
    },
  ];

  const filteredSections = sections.filter((section) =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderOverview = () => (
    <motion.div
      key="overview"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold gradient-text mb-6"
          variants={itemVariants}>
          Welcome to Vigilo Attendance
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 mb-8"
          variants={itemVariants}>
          Your comprehensive guide to managing attendance efficiently for
          lecturers and students
        </motion.p>
      </div>

      <motion.div
        className="grid md:grid-cols-2 gap-6 mb-12"
        variants={itemVariants}>
        <div className="card-hover text-center">
          <LuGraduationCap className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-3">For Lecturers</h3>
          <p className="text-gray-300 text-sm">
            Create courses, schedule sessions, manage students, and track
            attendance with powerful tools and reports.
          </p>
        </div>
        <div className="card-hover text-center">
          <LuUser className="w-16 h-16 text-pink-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-3">For Students</h3>
          <p className="text-gray-300 text-sm">
            View schedules, track your attendance history, and manage your
            profile with an intuitive interface.
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <LuInfo className="text-cyan-400" />
          Key Terms
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {keyTerms.map((term, index) => (
            <motion.div
              key={term.term}
              className="card border-l-4 border-purple-500"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}>
              <div className="flex items-start gap-3">
                <term.icon className="w-6 h-6 text-purple-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-purple-400 mb-1">
                    {term.term}
                  </h4>
                  <p className="text-gray-300 text-sm">{term.definition}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  const renderQuickStart = () => (
    <motion.div
      key="quick-start"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-6 gradient-text">
          Quick Start Guide
        </h2>
        <p className="text-gray-300 mb-8">
          Get started quickly based on your role in the system.
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <motion.button
          onClick={() => setActiveRole('lecturer')}
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            activeRole === 'lecturer'
              ? 'btn-primary'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <LuGraduationCap className="w-5 h-5 inline mr-2" />
          Lecturer
        </motion.button>
        <motion.button
          onClick={() => setActiveRole('student')}
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            activeRole === 'student'
              ? 'btn-primary'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <LuUser className="w-5 h-5 inline mr-2" />
          Student
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeRole}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="space-y-4">
          {quickStartSteps[activeRole].map((step, index) => (
            <motion.div
              key={step.step}
              className="card-hover flex items-center gap-4"
              variants={itemVariants}
              custom={index}>
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <step.icon className="w-6 h-6 text-purple-400" />
              <div>
                <h4 className="font-semibold text-white">{step.step}</h4>
                <p className="text-gray-300 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );

  const renderCourses = () => (
    <motion.div
      key="courses"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-6 gradient-text">
          Courses & Groups
        </h2>
        <p className="text-gray-300 mb-8">
          Learn how to create and manage courses and organize students into
          groups for targeted sessions.
        </p>
      </div>

      <motion.div
        className="space-y-6"
        variants={itemVariants}>
        <div className="card">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <LuPlus className="text-green-400" />
            Creating a Course
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>
              Navigate to{' '}
              <span className="text-purple-400 font-medium">
                Courses → New Course
              </span>
            </li>
            <li>
              Enter the{' '}
              <span className="text-purple-400 font-medium">Course Name</span>{' '}
              and optional code/description
            </li>
            <li>
              Click <span className="text-purple-400 font-medium">Create</span>{' '}
              to save your course
            </li>
          </ol>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <LuUsers className="text-blue-400" />
            Managing Groups
          </h3>
          <div className="space-y-3 text-gray-300">
            <p>
              Groups help you organize students within a course for better
              session management:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                Create groups like <em>Level 300</em>, <em>Group A</em>, or{' '}
                <em>Lab Section B</em>
              </li>
              <li>Assign students to specific groups for targeted sessions</li>
              <li>Filter reports and attendance by group</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <LuUpload className="text-yellow-400" />
            Adding Students
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-purple-400">
                Individual Addition
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                <li>Search by name or email</li>
                <li>
                  Click <em>Add</em> to enroll
                </li>
                <li>Assign to specific groups</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-pink-400">
                Bulk Import (CSV)
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                <li>Required: Name, Email, ID</li>
                <li>Optional: Group assignments</li>
                <li>UTF-8 encoding with commas</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderSessions = () => (
    <motion.div
      key="sessions"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-6 gradient-text">
          Sessions Management
        </h2>
        <p className="text-gray-300 mb-8">
          Create, schedule, and manage class sessions with comprehensive
          attendance tracking.
        </p>
      </div>

      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-semibold mb-4">Session Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {sessionTypes.map((type, index) => (
            <motion.div
              key={type.type}
              className="card text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}>
              <type.icon className={`w-8 h-8 mx-auto mb-2 ${type.color}`} />
              <span className="text-sm font-medium">{type.type}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 gap-6"
        variants={itemVariants}>
        <div className="card">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <LuCalendar className="text-green-400" />
            Creating a Session
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
            <li>
              Go to{' '}
              <span className="text-purple-400">Sessions → New Session</span>
            </li>
            <li>
              Select <span className="text-purple-400">Course</span> (optional
              for guest sessions)
            </li>
            <li>
              Choose <span className="text-purple-400">Session Type</span>
            </li>
            <li>
              Set <span className="text-purple-400">Date, Time & Duration</span>
            </li>
            <li>
              Add <span className="text-purple-400">Location</span> (Room +
              Building)
            </li>
            <li>
              Optionally limit to specific{' '}
              <span className="text-purple-400">Groups</span>
            </li>
            <li>
              Click <span className="text-purple-400">Schedule</span>
            </li>
          </ol>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <LuUserCheck className="text-blue-400" />
            Running a Session
          </h3>
          <div className="space-y-3 text-gray-300 text-sm">
            <p>Once your session starts:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                Click <em>Start</em> to begin attendance
              </li>
              <li>
                Toggle <em>Present/Absent</em> for each student
              </li>
              <li>
                Use bulk actions like <em>Mark all present</em>
              </li>
              <li>Add session notes if needed</li>
              <li>
                Click <em>Complete</em> when finished
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="card bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30"
        variants={itemVariants}>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
          <LuChartBar className="text-yellow-400" />
          Session Status & Attendance Rates
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-green-400 mb-2">Scheduled</h4>
            <p className="text-gray-300">Future sessions or not yet started</p>
          </div>
          <div>
            <h4 className="font-medium text-yellow-400 mb-2">Ongoing</h4>
            <p className="text-gray-300">Currently in progress</p>
          </div>
          <div>
            <h4 className="font-medium text-blue-400 mb-2">Completed</h4>
            <p className="text-gray-300">Finished and locked</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-white/5 rounded-xl">
          <p className="text-gray-300 text-sm">
            <span className="text-purple-400 font-medium">
              Attendance Rate:
            </span>
            Calculated as present ÷ total × 100. Displayed as both fraction
            (38/45) and percentage (84%).
          </p>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderStudents = () => (
    <motion.div
      key="students"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-6 gradient-text">
          Student Management
        </h2>
        <p className="text-gray-300 mb-8">
          Comprehensive tools for managing student profiles, enrollment, and
          attendance history.
        </p>
      </div>

      <motion.div
        className="grid md:grid-cols-2 gap-6"
        variants={itemVariants}>
        <div className="card">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <LuUserCheck className="text-green-400" />
            For Lecturers
          </h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <LuPlus className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>Add individual students via search</span>
            </li>
            <li className="flex items-start gap-2">
              <LuUpload className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span>Bulk import via CSV with required columns</span>
            </li>
            <li className="flex items-start gap-2">
              <FiEdit3 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>Manage student profiles and course memberships</span>
            </li>
            <li className="flex items-start gap-2">
              <LuChartBar className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
              <span>View detailed attendance history and analytics</span>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <LuUser className="text-blue-400" />
            For Students
          </h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <LuCalendar className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>View today's sessions and weekly schedule</span>
            </li>
            <li className="flex items-start gap-2">
              <LuChartBar className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Track personal attendance history</span>
            </li>
            <li className="flex items-start gap-2">
              <LuSettings className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>Update profile information and preferences</span>
            </li>
            <li className="flex items-start gap-2">
              <LuMail className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
              <span>Manage notification settings</span>
            </li>
          </ul>
        </div>
      </motion.div>

      <motion.div
        className="card"
        variants={itemVariants}>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
          <LuFileText className="text-yellow-400" />
          CSV Import Guidelines
        </h3>
        <div className="bg-white/5 rounded-xl p-4">
          <h4 className="font-medium text-purple-400 mb-2">Required Format</h4>
          <div className="space-y-2 text-sm text-gray-300">
            <p>
              <span className="text-green-400 font-medium">✓</span> UTF-8
              encoding
            </p>
            <p>
              <span className="text-green-400 font-medium">✓</span> Comma
              separators
            </p>
            <p>
              <span className="text-green-400 font-medium">✓</span> Required
              columns: Name, Email, Student ID
            </p>
            <p>
              <span className="text-blue-400 font-medium">○</span> Optional:
              Course, Group assignments
            </p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
          <p className="text-red-300 text-sm flex items-start gap-2">
            <LuTriangleAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
            Common import issues: Missing required columns, incorrect encoding,
            or duplicate entries.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderFilters = () => (
    <motion.div
      key="filters"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-6 gradient-text">
          Filters & Search
        </h2>
        <p className="text-gray-300 mb-8">
          Master the filtering system to quickly find sessions, courses, and
          students.
        </p>
      </div>

      <motion.div
        className="grid md:grid-cols-2 gap-6"
        variants={itemVariants}>
        <div className="card">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <LuFilter className="text-purple-400" />
            Advanced Filters
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-white/5 rounded-lg">
              <h4 className="font-medium text-purple-400 mb-1">
                Status Filters
              </h4>
              <p className="text-gray-300 text-sm">
                Filter by scheduled, ongoing, or completed sessions
              </p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <h4 className="font-medium text-blue-400 mb-1">Session Type</h4>
              <p className="text-gray-300 text-sm">
                Filter by lecture, lab, seminar, workshop, or ad-hoc
              </p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <h4 className="font-medium text-green-400 mb-1">
                Attendance Range
              </h4>
              <p className="text-gray-300 text-sm">
                Filter sessions by attendance percentage (0-100%)
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <LuSearch className="text-pink-400" />
            Search & Sorting
          </h3>
          <div className="space-y-4 text-gray-300 text-sm">
            <div>
              <h4 className="font-medium text-pink-400 mb-2">Quick Search</h4>
              <p>
                Use the search bar to find sessions, courses, or students by
                name instantly.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-cyan-400 mb-2">
                Sorting Options
              </h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Date & Time</li>
                <li>Course Name</li>
                <li>Location</li>
                <li>Duration</li>
                <li>Attendance Rate</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="card bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30"
        variants={itemVariants}>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
          <LuCircleHelp className="text-cyan-400" />
          Pro Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p className="text-green-400 font-medium">✓ Filter Persistence</p>
            <p className="text-gray-300">
              Your filter selections persist while the page is open
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-blue-400 font-medium">✓ Multi-Select</p>
            <p className="text-gray-300">
              Use checkboxes to select multiple filter options
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-purple-400 font-medium">✓ Quick Clear</p>
            <p className="text-gray-300">
              Use the Clear button to reset all filters
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-yellow-400 font-medium">✓ Combine Filters</p>
            <p className="text-gray-300">
              Stack multiple filters for precise results
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderWorkflows = () => (
    <motion.div
      key="workflows"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-6 gradient-text">
          Common Workflows
        </h2>
        <p className="text-gray-300 mb-8">
          Step-by-step guides for the most common tasks in Vigilo Attendance.
        </p>
      </div>

      <motion.div
        className="space-y-6"
        variants={itemVariants}>
        <div className="card">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <LuUserCheck className="text-green-400" />
            Quick Attendance Taking
          </h3>
          <div className="space-y-2 text-gray-300 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>
                Open <em>Sessions</em> and filter to <em>ongoing</em>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>
                Click <em>View Details</em> on your session
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                3
              </span>
              <span>
                Use <em>Mark all present</em> then uncheck absentees
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                4
              </span>
              <span>
                Add optional notes and click <em>Complete</em>
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <LuDownload className="text-blue-400" />
            Export Weekly Report
          </h3>
          <div className="space-y-2 text-gray-300 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>
                Filter <em>Sessions</em> by <em>Course</em> and{' '}
                <em>Date range</em>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>
                Click <em>Export</em> from toolbar or individual sessions
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
                3
              </span>
              <span>Choose file format and download</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <LuUsers className="text-yellow-400" />
            Manage Lab Group Rotations
          </h3>
          <div className="space-y-2 text-gray-300 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>
                In <em>Courses → Groups</em>, create rotation groups
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>Assign students to appropriate groups</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center font-bold">
                3
              </span>
              <span>When creating sessions, limit to specific groups</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 gap-6"
        variants={itemVariants}>
        <div className="card bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/30">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <LuGraduationCap className="text-green-400" />
            Lecturer Best Practices
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <LuCircleCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Schedule sessions in advance for better planning</span>
            </li>
            <li className="flex items-start gap-2">
              <LuCircleCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Use groups for efficient lab management</span>
            </li>
            <li className="flex items-start gap-2">
              <LuCircleCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Export attendance regularly for records</span>
            </li>
            <li className="flex items-start gap-2">
              <LuCircleCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Add session notes for context</span>
            </li>
          </ul>
        </div>

        <div className="card bg-gradient-to-br from-pink-900/20 to-purple-900/20 border-pink-500/30">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <LuUser className="text-pink-400" />
            Student Tips
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <LuCircleCheck className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
              <span>Check dashboard daily for session updates</span>
            </li>
            <li className="flex items-start gap-2">
              <LuCircleCheck className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
              <span>Keep profile information up to date</span>
            </li>
            <li className="flex items-start gap-2">
              <LuCircleCheck className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
              <span>Monitor attendance percentages regularly</span>
            </li>
            <li className="flex items-start gap-2">
              <LuCircleCheck className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
              <span>Enable notifications for reminders</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderTroubleshooting = () => (
    <motion.div
      key="troubleshooting"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-6 gradient-text">
          Troubleshooting
        </h2>
        <p className="text-gray-300 mb-8">
          Common issues and solutions to help you resolve problems quickly.
        </p>
      </div>

      <motion.div
        className="space-y-6"
        variants={itemVariants}>
        <div className="card border-l-4 border-red-500">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-red-400">
            <LuTriangleAlert />
            Common Issues
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-white mb-1">
                Can't see my course
              </h4>
              <p className="text-gray-300 text-sm">
                Confirm enrollment status or check if filters are hiding it
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">
                Dropdown menu gets cut off
              </h4>
              <p className="text-gray-300 text-sm">
                Menus auto-position. If still clipped, try scrolling or report
                the issue
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">CSV import fails</h4>
              <p className="text-gray-300 text-sm">
                Ensure UTF-8 encoding, comma separators, and required columns
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">
                Need to edit completed session
              </h4>
              <p className="text-gray-300 text-sm">
                May require admin permission depending on organization policy
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
          <LuCircleHelp className="text-purple-400" />
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="card cursor-pointer"
              onClick={() =>
                setExpandedFAQ(expandedFAQ === index ? null : index)
              }
              whileHover={{ scale: 1.01 }}>
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-white">{faq.question}</h4>
                <motion.div
                  animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}>
                  <LuChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </div>
              <AnimatePresence>
                {expandedFAQ === index && (
                  <motion.div
                    variants={faqVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="overflow-hidden">
                    <div className="pt-3 border-t border-white/10 mt-3">
                      <p className="text-gray-300 text-sm">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="card bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-500/30"
        variants={itemVariants}>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
          <LuPhone className="text-cyan-400" />
          Need More Help?
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-cyan-400 mb-2">Contact Support</h4>
            <ul className="space-y-1 text-gray-300">
              <li>Include browser and device info</li>
              <li>Provide screenshots if applicable</li>
              <li>Describe steps to reproduce the issue</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-purple-400 mb-2">
              Organization Policies
            </h4>
            <ul className="space-y-1 text-gray-300">
              <li>Check with your department admin</li>
              <li>Review institutional guidelines</li>
              <li>Understand feature availability</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'quick-start':
        return renderQuickStart();
      case 'courses':
        return renderCourses();
      case 'sessions':
        return renderSessions();
      case 'students':
        return renderStudents();
      case 'filters':
        return renderFilters();
      case 'workflows':
        return renderWorkflows();
      case 'troubleshooting':
        return renderTroubleshooting();
      default:
        return renderOverview();
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          className="text-center mb-12"
          variants={itemVariants}>
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            whileHover={{ scale: 1.05 }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <LuGraduationCap className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">
              Vigilo Help Center
            </h1>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="max-w-md mx-auto relative"
            variants={itemVariants}>
            <LuSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:bg-white/15 transition-all"
            />
          </motion.div>
        </motion.header>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.aside
            className="lg:col-span-1"
            variants={itemVariants}>
            <div className="card sticky top-8">
              <h2 className="text-lg font-semibold mb-4 text-purple-400">
                Navigation
              </h2>
              <nav className="space-y-2">
                {filteredSections.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}>
                    <section.icon className="w-5 h-5" />
                    <span className="font-medium">{section.title}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
          </main>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-16 text-center border-t border-white/10 pt-8"
          variants={itemVariants}>
          <p className="text-gray-400 text-sm">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <motion.a
              href="#"
              className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-2 transition-colors"
              whileHover={{ scale: 1.05 }}>
              <LuMail className="w-4 h-4" />
              Contact Support
            </motion.a>
            <motion.a
              href="#"
              className="text-pink-400 hover:text-pink-300 text-sm flex items-center gap-2 transition-colors"
              whileHover={{ scale: 1.05 }}>
              <LuFileText className="w-4 h-4" />
              Documentation
            </motion.a>
          </div>
        </motion.footer>
      </div>
    </motion.div>
  );
};

export default HelpPage;

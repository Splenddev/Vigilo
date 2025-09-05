import React, { useState } from 'react';
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiUsers,
  FiBook,
  FiActivity,
  FiCheckCircle,
  FiAlertCircle,
  FiXCircle,
  FiEdit3,
  FiArrowLeft,
  FiMoreHorizontal,
} from 'react-icons/fi';
import { formatDate, formatTime, toggleState } from '../../utils/helpers';
import { useSuccessModal } from '../../hooks/useStatusModal';
import { sessionInfoDropdown } from '../attendance/assets/assets';
import DropdownPortal from '../../components/containers/DropdownPortal';
import Dropdown from '../../components/atoms/Dropdown';
import { useSharedView } from '../../hooks/useSharedView';

const sessionData = {
  id: 'BCH402-2024-S1-L12',
  course: {
    code: 'BCH402',
    name: 'Molecular Biology of the Cell',
    credits: 4,
  },
  instructor: {
    name: 'Prof. Emmanuel Okafor',
    email: 'emmanuel.okafor@university.edu',
    avatar:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face',
  },
  date: '2024-09-05',
  time: '10:00',
  duration: 150, // minutes
  location: {
    room: 'B201',
    building: 'Faculty of Biological Sciences',
  },
  sessionType: 'Lecture',
  attendance: {
    present: 95,
    total: 102,
  },
  status: 'completed',
  description:
    'Exploring the structure and function of cellular organelles, gene expression, and signal transduction pathways with emphasis on molecular techniques.',
  materials: [
    'Lecture Notes - Cellular Organelles',
    'Lab Manual: DNA Extraction',
    'Assignment 2 - Signal Pathways',
  ],
  nextSession: {
    date: '2024-09-12',
    time: '10:00',
    topic: 'Protein Synthesis and Regulation',
  },
};

const SessionInfoPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);

  const { showSuccess } = useSuccessModal();
  const isSharedView = useSharedView();

  const handleAction = (key, sessionId) => {
    if (isSharedView) return;
    switch (key) {
      case 'export':
        alert('downloading...');
        // Call backend export route or trigger CSV/PDF
        // downloadAttendanceReport(sessionId);
        break;

      case 'share':
        // Copy session link to clipboard
        navigator.clipboard.writeText(
          `${window.location.origin}/lecturer/sessions/${sessionId}/info?shared=true`
        );
        showSuccess('Session link copied!');
        break;

      case 'cancel':
        // Confirm + cancel session
        if (window.confirm('Are you sure you want to cancel this session?')) {
          alert('cancelling session...');
        }
        break;

      default:
        break;
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      completed: {
        color: 'text-green-400',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/20',
        icon: FiCheckCircle,
        label: 'Completed',
      },
      upcoming: {
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        icon: FiClock,
        label: 'Upcoming',
      },
      cancelled: {
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/20',
        icon: FiXCircle,
        label: 'Cancelled',
      },
      inprogress: {
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/10',
        borderColor: 'border-orange-500/20',
        icon: FiActivity,
        label: 'In Progress',
      },
    };
    return configs[status] || configs.upcoming;
  };

  const statusConfig = getStatusConfig(sessionData.status);
  const StatusIcon = statusConfig.icon;

  const getAttendancePercentage = () => {
    return Math.round(
      (sessionData.attendance.present / sessionData.attendance.total) * 100
    );
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'materials', label: 'Materials' },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="space-y-6">
        {isSharedView && (
          <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-center p-3 rounded-xl">
            You are viewing a shared preview of this session
          </div>
        )}

        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="btn-ghost p-3">
              <FiArrowLeft className="w-5 h-5 text-slate-400" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-t-primary">
                Session Details
              </h1>
              <p className="text-slate-400">
                {isSharedView
                  ? 'Public preview of session information'
                  : 'Manage and view session information'}
              </p>
            </div>
          </div>
          {!isSharedView && (
            <div className="flex items-center space-x-3">
              <button className="btn-ghost p-3">
                <FiEdit3 className="w-5 h-5" />
              </button>

              <div className="relative">
                <button
                  id="moreOptions"
                  onClick={() => toggleState(sessionData.id, setMenuOpen)}
                  className="p-1 rounded-lg hover:bg-white/10 text-t-secondary hover:text-t-primary transition-colors duration-200">
                  <FiMoreHorizontal className="w-4 h-4" />
                </button>

                {menuOpen && (
                  <DropdownPortal
                    anchorRef="moreOptions"
                    onClose={() => toggleState(sessionData.id, setMenuOpen)}>
                    <div className="py-1">
                      {sessionInfoDropdown.map((action) => (
                        <Dropdown
                          icon={action.icon}
                          label={action.label}
                          key={action.key}
                          onAction={() =>
                            handleAction(action.key, sessionData.id)
                          }
                          className={`capitalize ${action.className} z-10`}
                        />
                      ))}
                    </div>
                  </DropdownPortal>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Session Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Session Header Card */}
            <div className="card">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm font-medium text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                      {sessionData.course.code}
                    </span>
                    <div
                      className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${statusConfig.bgColor} ${statusConfig.borderColor}`}>
                      <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                      <span
                        className={`text-sm font-medium ${statusConfig.color}`}>
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-t-primary mb-2">
                    {sessionData.course.name}
                  </h2>
                  <p className="text-t-secondary text-lg mb-4">
                    {sessionData.description}
                  </p>
                </div>
              </div>

              {/* Session Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <FiCalendar className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Date</p>
                    <p className="text-t-primary font-medium">
                      {formatDate(sessionData.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <FiClock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Time & Duration</p>
                    <p className="text-t-primary font-medium">
                      {formatTime(sessionData.time)} • {sessionData.duration}{' '}
                      mins
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center">
                    <FiMapPin className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Location</p>
                    <p className="text-t-primary font-medium">
                      {sessionData.location.room},{' '}
                      {sessionData.location.building}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                    <FiBook className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Session Type</p>
                    <p className="text-t-primary font-medium">
                      {sessionData.sessionType}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="card">
              <div className="border-b border-white/10 mb-6">
                <nav className="flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-purple-400 text-purple-400'
                          : 'border-transparent text-slate-400 hover:text-slate-300'
                      }`}>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-t-primary mb-3">
                      Session Description
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {sessionData.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-t-primary mb-3">
                      Next Session
                    </h3>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-t-primary font-medium">
                            {sessionData.nextSession.topic}
                          </p>
                          <p className="text-slate-400 text-sm">
                            {formatDate(sessionData.nextSession.date)} at{' '}
                            {formatTime(sessionData.nextSession.time)}
                          </p>
                        </div>
                        <FiArrowLeft className="w-5 h-5 text-slate-400 rotate-180" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'materials' && (
                <div>
                  <h3 className="text-lg font-semibold text-t-primary mb-4">
                    Session Materials
                  </h3>
                  <div className="space-y-3">
                    {sessionData.materials.map((material, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                            <FiBook className="w-4 h-4 text-purple-400" />
                          </div>
                          <span className="text-t-primary font-medium">
                            {material}
                          </span>
                        </div>
                        <button className="text-slate-400 hover:text-t-primary transition-colors">
                          <FiArrowLeft className="w-4 h-4 rotate-180" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Instructor & Attendance */}
          <div className="space-y-6">
            {/* Attendance Card */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-t-primary">Attendance</h3>
                <div className="flex items-center space-x-2">
                  <FiUsers className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-1">
                    {getAttendancePercentage()}%
                  </div>
                  <p className="text-slate-400 text-sm">Attendance Rate</p>
                </div>

                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${getAttendancePercentage()}%` }}></div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">
                    Present: {sessionData.attendance.present}
                  </span>
                  <span className="text-slate-400">
                    Total: {sessionData.attendance.total}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-400">
                      {sessionData.attendance.present}
                    </div>
                    <p className="text-xs text-slate-400">Present</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-red-400">
                      {sessionData.attendance.total -
                        sessionData.attendance.present}
                    </div>
                    <p className="text-xs text-slate-400">Absent</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Session ID Card */}
            <div className="card">
              <h3 className="font-semibold text-t-primary mb-3">
                Session Information
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Session ID</span>
                  <span className="text-t-primary font-mono">
                    {sessionData.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Credits</span>
                  <span className="text-t-primary">
                    {sessionData.course.credits}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Type</span>
                  <span className="text-t-primary">
                    {sessionData.sessionType}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionInfoPage;

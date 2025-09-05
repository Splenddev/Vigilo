import React, { useState } from 'react';
import {
  LuArrowLeft as ArrowLeft,
  LuUsers as Users,
  LuClock as Clock,
  LuMapPin as MapPin,
  LuCalendar as Calendar,
  LuDownload as Download,
  LuShare2 as Share2,
  LuCircleCheck as CheckCircle2,
  LuTriangleAlert as AlertTriangle,
  LuX as X,
  LuTrendingUp as TrendingUp,
  LuTrendingDown as TrendingDown,
} from 'react-icons/lu';

// Mock session data with detailed information
const mockSessionDetail = {
  id: 1,
  groupName: 'CSC 201 – Data Structures',
  lecturer: 'Dr. Sarah Johnson',
  status: 'completed',
  location: 'Room A-205',
  building: 'Engineering Block',
  startTime: '10:00 AM',
  endTime: '10:20 AM',
  actualEndTime: '10:18 AM',
  date: new Date(),
  sessionCode: 'DS2024',
  maxAttendees: 50,
  totalAttended: 42,
  attendanceRate: 84,
  description: 'Introduction to Binary Trees and Tree Traversal Algorithms',
  requirements: ['Location verification required', 'Camera access needed'],
  createdBy: 'Dr. Sarah Johnson',
  createdAt: '9:45 AM',
  duration: '18 minutes',
};

// Mock attendees data
const mockAttendees = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@student.edu',
    studentId: 'CS2021001',
    status: 'present',
    attendedAt: '10:02 AM',
    location: 'Room A-205',
    method: 'QR Code',
    avatar: null,
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@student.edu',
    studentId: 'CS2021002',
    status: 'present',
    attendedAt: '10:01 AM',
    location: 'Room A-205',
    method: 'Manual Code',
    avatar: null,
  },
  {
    id: 3,
    name: 'Carol Davis',
    email: 'carol.davis@student.edu',
    studentId: 'CS2021003',
    status: 'present',
    attendedAt: '10:05 AM',
    location: 'Room A-205',
    method: 'QR Code',
    avatar: null,
  },
  {
    id: 4,
    name: 'David Wilson',
    email: 'david.wilson@student.edu',
    studentId: 'CS2021004',
    status: 'absent',
    reason: 'No attendance recorded',
    avatar: null,
  },
  {
    id: 5,
    name: 'Emma Brown',
    email: 'emma.brown@student.edu',
    studentId: 'CS2021005',
    status: 'late',
    attendedAt: '10:15 AM',
    location: 'Room A-205',
    method: 'Manual Code',
    avatar: null,
  },
  // Add more mock data to demonstrate pagination
  ...Array.from({ length: 45 }, (_, i) => ({
    id: i + 6,
    name: `Student ${i + 6}`,
    email: `student${i + 6}@student.edu`,
    studentId: `CS2021${String(i + 6).padStart(3, '0')}`,
    status:
      Math.random() > 0.15
        ? 'present'
        : Math.random() > 0.5
        ? 'late'
        : 'absent',
    attendedAt:
      Math.random() > 0.15
        ? `10:${String(Math.floor(Math.random() * 18) + 1).padStart(2, '0')} AM`
        : null,
    location: Math.random() > 0.15 ? 'Room A-205' : null,
    method: Math.random() > 0.5 ? 'QR Code' : 'Manual Code',
    reason: Math.random() > 0.15 ? null : 'No attendance recorded',
    avatar: null,
  })),
];

const ViewAttendancePage = () => {
  const [currentTab, setCurrentTab] = useState('overview');
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Filter attendees based on search and filter

  // Get attendance statistics
  const getAttendanceStats = () => {
    const present = mockAttendees.filter((a) => a.status === 'present').length;
    const late = mockAttendees.filter((a) => a.status === 'late').length;
    const absent = mockAttendees.filter((a) => a.status === 'absent').length;

    return {
      present,
      late,
      absent,
      total: mockAttendees.length,
      onTime: present,
      attended: present + late,
    };
  };

  const stats = getAttendanceStats();

  const handleGoBack = () => {
    alert('Returning to attendance list...');
  };

  const handleExport = (format) => {
    alert(`Exporting attendance data as ${format}...`);
    setShowExportMenu(false);
  };

  const handleShare = () => {
    alert('Sharing attendance session...');
  };

  return (
    <div className="min-h-screen glass p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleGoBack}
              className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-105">
              <ArrowLeft className="text-xl text-t-secondary" />
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                {mockSessionDetail.groupName}
              </h1>
              <p className="text-slate-400">{mockSessionDetail.lecturer}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-105">
                <Download className="text-t-secondary" />
              </button>

              {showExportMenu && (
                <div className="absolute right-0 top-full mt-2 bg-slate-800 border border-white/10 rounded-xl p-2 min-w-40 z-10 animate-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => handleExport('CSV')}
                    className="w-full text-left px-3 py-2 text-t-secondary hover:bg-white/10 rounded-lg transition-colors">
                    Export as CSV
                  </button>
                  <button
                    onClick={() => handleExport('Excel')}
                    className="w-full text-left px-3 py-2 text-t-secondary hover:bg-white/10 rounded-lg transition-colors">
                    Export as Excel
                  </button>
                  <button
                    onClick={() => handleExport('PDF')}
                    className="w-full text-left px-3 py-2 text-t-secondary hover:bg-white/10 rounded-lg transition-colors">
                    Export as PDF
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleShare}
              className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-105">
              <Share2 className="text-t-secondary" />
            </button>
          </div>
        </div>

        {/* Session Info Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Clock className="text-cyan-400 text-xl" />
              <div>
                <p className="text-slate-300 text-sm">Duration</p>
                <p className="text-t-secondary font-semibold">
                  {mockSessionDetail.startTime} -{' '}
                  {mockSessionDetail.actualEndTime}
                </p>
                <p className="text-slate-400 text-xs">
                  {mockSessionDetail.duration}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-purple-400 text-xl" />
              <div>
                <p className="text-slate-300 text-sm">Location</p>
                <p className="text-t-secondary font-semibold">
                  {mockSessionDetail.location}
                </p>
                <p className="text-slate-400 text-xs">
                  {mockSessionDetail.building}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="text-pink-400 text-xl" />
              <div>
                <p className="text-slate-300 text-sm">Attendance</p>
                <p className="text-t-secondary font-semibold">
                  {stats.attended}/{stats.total}
                </p>
                <p className="text-slate-400 text-xs">
                  {mockSessionDetail.attendanceRate}% rate
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-blue-400 text-xl" />
              <div>
                <p className="text-slate-300 text-sm">Session Code</p>
                <p className="text-t-secondary font-semibold">
                  {mockSessionDetail.sessionCode}
                </p>
                <p className="text-slate-400 text-xs">Active session</p>
              </div>
            </div>
          </div>

          {mockSessionDetail.description && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-slate-300 text-sm mb-1">Description</p>
              <p className="text-t-secondary">
                {mockSessionDetail.description}
              </p>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white/5 border border-white/10 rounded-xl p-1">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                currentTab === tab.id
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                  : 'text-slate-400 hover:text-t-secondary hover:bg-white/5'
              }`}>
              <tab.icon className="text-sm" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {currentTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center hover:scale-105 transition-transform duration-200">
                <CheckCircle2 className="text-3xl text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">
                  {stats.present}
                </div>
                <div className="text-sm text-slate-400">Present</div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center hover:scale-105 transition-transform duration-200">
                <Clock className="text-3xl text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-400">
                  {stats.late}
                </div>
                <div className="text-sm text-slate-400">Late</div>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center hover:scale-105 transition-transform duration-200">
                <AlertTriangle className="text-3xl text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-400">
                  {stats.absent}
                </div>
                <div className="text-sm text-slate-400">Absent</div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center hover:scale-105 transition-transform duration-200">
                <Users className="text-3xl text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">
                  {mockSessionDetail.attendanceRate}%
                </div>
                <div className="text-sm text-slate-400">Rate</div>
              </div>
            </div>

            {/* Quick Summary */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-t-secondary mb-4">
                Session Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">
                    Total Registered Students
                  </span>
                  <span className="text-t-secondary">{stats.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Students Attended</span>
                  <span className="text-green-400">{stats.attended}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">On-time Attendance</span>
                  <span className="text-cyan-400">{stats.onTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Session Created</span>
                  <span className="text-t-secondary">
                    {mockSessionDetail.createdAt}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-t-secondary mb-4">
                  Attendance Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Present on Time</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-white/10 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                          style={{
                            width: `${(stats.present / stats.total) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-green-400 font-medium">
                        {stats.present}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Late Arrivals</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-white/10 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full transition-all duration-1000 delay-200"
                          style={{
                            width: `${(stats.late / stats.total) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-yellow-400 font-medium">
                        {stats.late}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Absent</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-white/10 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full transition-all duration-1000 delay-400"
                          style={{
                            width: `${(stats.absent / stats.total) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-red-400 font-medium">
                        {stats.absent}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-t-secondary mb-4">
                  Attendance Methods
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">QR Code</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-white/10 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full w-3/4 transition-all duration-1000" />
                      </div>
                      <span className="text-purple-400 font-medium">32</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Manual Code</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-white/10 rounded-full h-2">
                        <div className="bg-cyan-500 h-2 rounded-full w-1/4 transition-all duration-1000 delay-200" />
                      </div>
                      <span className="text-cyan-400 font-medium">11</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-t-secondary mb-4">
                Session Performance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    84%
                  </div>
                  <div className="text-slate-300 text-sm">Overall Rate</div>
                  <div className="text-slate-400 text-xs">Above average</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">
                    18m
                  </div>
                  <div className="text-slate-300 text-sm">Session Duration</div>
                  <div className="text-slate-400 text-xs">2 min early</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    2.3m
                  </div>
                  <div className="text-slate-300 text-sm">
                    Avg Check-in Time
                  </div>
                  <div className="text-slate-400 text-xs">Fast response</div>
                </div>
              </div>
            </div>

            {/* Attendance Timeline */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-t-secondary mb-4">
                Attendance Timeline
              </h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10"></div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center relative z-10">
                      <CheckCircle2 className="w-4 h-4 text-t-secondary" />
                    </div>
                    <div>
                      <p className="text-t-secondary font-medium">
                        Session Started
                      </p>
                      <p className="text-slate-400 text-sm">
                        10:00 AM - First students began checking in
                      </p>
                    </div>
                    <div className="ml-auto text-green-400 font-medium">
                      35 students
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center relative z-10">
                      <Clock className="w-4 h-4 text-t-secondary" />
                    </div>
                    <div>
                      <p className="text-t-secondary font-medium">
                        Peak Check-in Period
                      </p>
                      <p className="text-slate-400 text-sm">
                        10:01 - 10:05 AM - Highest activity
                      </p>
                    </div>
                    <div className="ml-auto text-yellow-400 font-medium">
                      5 students
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center relative z-10">
                      <AlertTriangle className="w-4 h-4 text-t-secondary" />
                    </div>
                    <div>
                      <p className="text-t-secondary font-medium">
                        Late Arrivals
                      </p>
                      <p className="text-slate-400 text-sm">
                        10:10 - 10:15 AM - Students arriving late
                      </p>
                    </div>
                    <div className="ml-auto text-red-400 font-medium">
                      2 students
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center relative z-10">
                      <X className="w-4 h-4 text-t-secondary" />
                    </div>
                    <div>
                      <p className="text-t-secondary font-medium">
                        Session Ended
                      </p>
                      <p className="text-slate-400 text-sm">
                        10:18 AM - Session closed early
                      </p>
                    </div>
                    <div className="ml-auto text-slate-400 font-medium">
                      Final count
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-t-secondary mb-4">
                  Compared to Previous Sessions
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Attendance Rate</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="text-green-400 w-4 h-4" />
                      <span className="text-green-400">+5.2%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">On-time Rate</span>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="text-red-400 w-4 h-4" />
                      <span className="text-red-400">-2.1%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Check-in Speed</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="text-green-400 w-4 h-4" />
                      <span className="text-green-400">+0.8s</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-t-secondary mb-4">
                  Session Insights
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-t-secondary text-sm">
                        High attendance rate indicates good student engagement
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-t-secondary text-sm">
                        Session ended 2 minutes early - consider extending
                        content
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-t-secondary text-sm">
                        QR code method preferred by 74% of students
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-t-secondary text-sm">
                        Late arrivals mostly between 10:10-10:15 AM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAttendancePage;

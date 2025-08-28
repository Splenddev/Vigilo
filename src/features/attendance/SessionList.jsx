import React, { useState, useEffect } from 'react';
import { FaFileExport, FaSortDown, FaSortUp } from 'react-icons/fa';
import { FiEdit3, FiMoreVertical } from 'react-icons/fi';
import {
  LuSearch,
  LuFilter,
  LuCalendar,
  LuClock,
  LuUsers,
  LuBookOpen,
  LuDownload,
  LuEye,
  LuTrash2,
  LuTrash,
  LuUser,
  LuMapPin,
  LuTimer,
  LuX,
} from 'react-icons/lu';
import Button from '../../components/atoms/Button';
import IconText from '../../components/atoms/IconText';
import InfoRow from '../../components/molecules/InfoRow';
import Select from '../../components/molecules/Select';
import { formatDate } from '../../utils/helpers';
import { getSessionTypeColor } from '../../hooks/useAttendance';
import { useLocation } from 'react-router-dom';
// Mock data
const mockSessions = [
  {
    id: 1,
    course: { id: 'c1', name: 'Computer Science 101' },
    instructor: {
      id: 'i1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
    },
    date: '2025-08-20',
    time: '10:30 AM',
    duration: 90, // minutes
    location: { room: 'Room 204', building: 'Computer Science Building' },
    sessionType: 'lecture',
    attendance: { present: 42, total: 50 },
    status: 'completed',
  },
  {
    id: 2,
    course: { id: 'c2', name: 'Data Structures' },
    instructor: {
      id: 'i2',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@university.edu',
    },
    date: '2025-08-19',
    time: '2:15 PM',
    duration: 75,
    location: { room: 'Lab 101', building: 'Engineering Hall' },
    sessionType: 'lab',
    attendance: { present: 38, total: 45 },
    status: 'completed',
  },
  {
    id: 3,
    course: null, // Guest lecture or special session
    instructor: {
      id: 'i3',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@university.edu',
    },
    date: '2025-08-18',
    time: '9:00 AM',
    duration: 60,
    location: { room: 'Auditorium A', building: 'Main Hall' },
    sessionType: 'seminar',
    attendance: { present: 25, total: 30 },
    status: 'completed',
  },
  {
    id: 4,
    course: { id: 'c3', name: 'Database Management' },
    instructor: {
      id: 'i4',
      name: 'Dr. James Wilson',
      email: 'james.wilson@university.edu',
    },
    date: '2025-08-17',
    time: '11:00 AM',
    duration: 90,
    location: { room: 'Room 305', building: 'Computer Science Building' },
    sessionType: 'lecture',
    attendance: { present: 35, total: 40 },
    status: 'ongoing',
  },
  {
    id: 8,
    course: { id: 'c2', name: 'Data Structures' },
    instructor: {
      id: 'i2',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@university.edu',
    },
    date: '2025-08-19',
    time: '2:15 PM',
    duration: 75,
    location: { room: 'Lab 101', building: 'Engineering Hall' },
    sessionType: 'lab',
    attendance: { present: 38, total: 45 },
    status: 'completed',
  },
  {
    id: 7,
    course: null,
    instructor: {
      id: 'i3',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@university.edu',
    },
    date: '2025-08-18',
    time: '9:00 AM',
    duration: 60,
    location: { room: 'Auditorium A', building: 'Main Hall' },
    sessionType: 'seminar',
    attendance: { present: 25, total: 30 },
    status: 'completed',
  },
  {
    id: 5,
    course: { id: 'c7', name: 'Computer Science in Biological Science 101' },
    instructor: {
      id: 'i5',
      name: 'Dr. Lisa Park',
      email: 'lisa.park@university.edu',
    },
    date: '2025-08-16',
    time: '10:30 AM',
    duration: 90,
    location: { room: 'Room 102', building: 'Biology Building' },
    sessionType: 'lecture',
    attendance: { present: 48, total: 50 },
    status: 'completed',
  },
  {
    id: 6,
    course: { id: 'c4', name: 'Software Engineering' },
    instructor: {
      id: 'i6',
      name: 'Prof. David Kim',
      email: 'david.kim@university.edu',
    },
    date: '2025-08-22',
    time: '3:00 PM',
    duration: 120,
    location: { room: 'Lab 205', building: 'Computer Science Building' },
    sessionType: 'workshop',
    attendance: { present: 0, total: 45 }, // Future session
    status: 'scheduled',
  },
];

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const { state } = useLocation();
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    course: state?.id || '',
  });

  const [showFilters, setShowFilters] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [showActions, setShowActions] = useState({});

  useEffect(() => {
    setSessions(mockSessions);
    setFilteredSessions(mockSessions);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...sessions];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (session) =>
          session.course?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          session.location?.room
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          session.location?.building
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          session.sessionType
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          session.date.includes(searchTerm) ||
          session.time.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply course filter

    if (filters.status) {
      filtered = filtered.filter((s) => s.status === filters.status);
    }

    if (filters.type) {
      filtered = filtered.filter((s) => s.sessionType === filters.type);
    }

    if (filters.course) {
      if (filters.course === 'adhoc') {
        filtered = filtered.filter((s) => !s.course);
      } else {
        filtered = filtered.filter((s) => s.course?.id === filters.course);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal, bVal;

      switch (sortBy) {
        case 'date':
          aVal = new Date(a.date + ' ' + a.time);
          bVal = new Date(b.date + ' ' + b.time);
          break;
        case 'course':
          aVal = a.course?.name || 'Unnamed Session';
          bVal = b.course?.name || 'Unnamed Session';
          break;
        case 'location':
          aVal = `${a.location?.building || ''} ${a.location?.room || ''}`;
          bVal = `${b.location?.building || ''} ${b.location?.room || ''}`;
          break;
        case 'duration':
          aVal = a.duration || 0;
          bVal = b.duration || 0;
          break;
        case 'attendance':
          aVal = a.attendance.present / a.attendance.total;
          bVal = b.attendance.present / b.attendance.total;
          break;
        default:
          aVal = a[sortBy];
          bVal = b[sortBy];
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredSessions(filtered);
  }, [sessions, searchTerm, sortBy, sortOrder, filters]);

  const formatDuration = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  const getAttendanceRate = (attendance) => {
    if (attendance.total === 0) return 0;
    return Math.round((attendance.present / attendance.total) * 100);
  };

  const getAttendanceColor = (rate) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleSelectSession = (sessionId) => {
    setSelectedSessions((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const handleSelectAll = () => {
    if (selectedSessions.length === filteredSessions.length) {
      setSelectedSessions([]);
    } else {
      setSelectedSessions(filteredSessions.map((s) => s.id));
    }
  };

  const toggleActions = (sessionId) => {
    setShowActions((prev) => ({
      ...prev,
      [sessionId]: !prev[sessionId],
    }));
  };

  const handleAction = (action, sessionId) => {
    console.log(`${action} session ${sessionId}`);
    setShowActions((prev) => ({ ...prev, [sessionId]: false }));
  };

  const getUniqueFilter = () => {
    const courses = [
      ...new Set(
        sessions
          .filter((s) => s.course)
          .map((s) => ({ value: s.course.id, label: s.course.name }))
          .map((c) => JSON.stringify(c))
      ),
    ].map((c) => JSON.parse(c));

    return courses;
  };

  return (
    <div className="card text-white">
      {/* Header */}
      <div className="py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Sessions</h2>
            <p className="text-sm text-gray-300 mt-1">
              {filteredSessions.length} of {sessions.length} sessions
            </p>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative group">
              <LuSearch className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-purple-400 transition duration-300" />
              <input
                type="text"
                placeholder="Search sessions, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 pl-9 pr-4 py-2 bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:bg-white/10 text-sm outline-0 transition-all duration-300"
              />
            </div>

            {!showFilters && (
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary text-sm"
                variant="primary"
                size="sm">
                <LuFilter className="w-4 h-4" />
                Filter
              </Button>
            )}
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 p-4 glass rounded-2xl">
            <div
              className="place-self-end cursor-pointer text-xl text-gray-300 hover:text-white transition-colors"
              onClick={() => setShowFilters(!showFilters)}>
              <LuX />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Course Filter */}
              <Select
                label="Status"
                onChange={(e) =>
                  setFilters((p) =>
                    e.target.value
                      ? { ...p, status: e.target.value }
                      : { ...p, status: '' }
                  )
                }
                value={filters.status}
                options={[
                  { value: 'scheduled', label: 'Scheduled' },
                  { value: 'ongoing', label: 'Ongoing' },
                  { value: 'completed', label: 'Completed' },
                ]}
                placeholder="All"
              />
              <Select
                label="Type"
                onChange={(e) =>
                  setFilters((p) =>
                    e.target.value
                      ? { ...p, type: e.target.value }
                      : { ...p, type: '' }
                  )
                }
                value={filters.type}
                options={[
                  { value: 'lecture', label: 'Lecture' },
                  { value: 'lab', label: 'Lab' },
                  { value: 'seminar', label: 'Seminar' },
                  { value: 'workshop', label: 'Workshop' },
                  { value: 'adhoc', label: 'Ad-hoc Session' },
                ]}
                placeholder="All"
              />
              <Select
                label="Courses"
                value={filters.course}
                onChange={(e) =>
                  setFilters((p) =>
                    e.target.value
                      ? { ...p, course: e.target.value }
                      : { ...p, course: '' }
                  )
                }
                options={getUniqueFilter()}
                placeholder="All"
              />

              <Select
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
                value={sortBy}
                options={[
                  { value: 'date', label: 'Date' },
                  { value: 'course', label: 'Course Name' },
                  { value: 'location', label: 'Location' },
                  { value: 'duration', label: 'Duration' },
                  { value: 'attendance', label: 'Attendance Rate' },
                ]}
              />

              {/* Sort Order */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Order
                </label>
                <button
                  onClick={() =>
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                  }
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 hover:border-purple-500/50 text-sm font-medium w-full justify-center transition-all duration-200">
                  {sortOrder === 'asc' ? (
                    <>
                      <FaSortUp className="w-4 h-4" />
                      Ascending
                    </>
                  ) : (
                    <>
                      <FaSortDown className="w-4 h-4" />
                      Descending
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedSessions.length > 0 && (
        <div className="px-4 py-3 bg-purple-900/30 border border-purple-500/30 rounded-xl mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-300 font-medium">
              {selectedSessions.length} session(s) selected
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="px-3 py-1 text-sm font-medium text-cyan-300 hover:text-cyan-200 hover:bg-cyan-900/20 rounded-xl border border-cyan-500/30">
                <FaFileExport />
                Export
              </Button>
              <Button
                variant="custom"
                size="sm"
                className="btn-danger px-3 py-1 text-sm font-medium">
                <LuTrash /> Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Session List */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="glass-strong border-b border-white/10">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedSessions.length === filteredSessions.length &&
                    filteredSessions.length > 0
                  }
                  onChange={handleSelectAll}
                  className="rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Course & Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Attendance
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filteredSessions.map((session, index) => {
              const attendanceRate = getAttendanceRate(session.attendance);
              return (
                <tr
                  key={`session-${session.id}-${index}`}
                  className="hover:bg-white/5 transition-colors duration-200">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedSessions.includes(session.id)}
                      onChange={() => handleSelectSession(session.id)}
                      className="rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                    />
                  </td>

                  <td className="px-4 py-4">
                    <InfoRow
                      icon={LuBookOpen}
                      className="items-start text-sm font-medium truncate"
                      iconClassName="text-purple-400"
                      label={session.course?.name || 'Unnamed Session'}>
                      {session.course && (
                        <IconText
                          text={session.course.id}
                          className="text-xs text-gray-400"
                        />
                      )}
                      <IconText
                        text={session.sessionType}
                        className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${getSessionTypeColor(
                          session.sessionType
                        )}`}
                      />
                    </InfoRow>
                  </td>

                  <td className="px-4 py-4">
                    <InfoRow
                      label={session.location?.room}
                      icon={LuMapPin}
                      iconClassName="text-pink-400">
                      <IconText
                        className="truncate text-gray-300"
                        text={session.location?.building}
                      />
                    </InfoRow>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <InfoRow
                      icon={LuCalendar}
                      iconClassName="text-cyan-400"
                      label={formatDate(session.date)}>
                      <IconText
                        icon={LuClock}
                        text={session.time}
                        className="text-gray-300"
                      />
                      <IconText
                        icon={LuTimer}
                        text={formatDuration(session.duration)}
                        className="text-gray-300"
                      />
                    </InfoRow>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <InfoRow
                      icon={LuUsers}
                      label={`${session.attendance.present}/
                          ${session.attendance.total}`}
                      iconClassName="text-purple-400">
                      <IconText
                        className={`font-semibold ${getAttendanceColor(
                          attendanceRate
                        )}`}
                        text={`${attendanceRate}% present`}
                      />
                    </InfoRow>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        session.status === 'completed'
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                          : session.status === 'ongoing'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      }`}>
                      {session.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative">
                      <button
                        onClick={() => toggleActions(session.id)}
                        className="p-1 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors duration-200">
                        <FiMoreVertical className="w-4 h-4" />
                      </button>

                      {showActions[session.id] && (
                        <div className="absolute right-0 mt-2 w-48 bg-bg-secondary rounded-xl shadow-xl ring-1 ring-white/10 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => handleAction('view', session.id)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200">
                              <LuEye className="w-4 h-4 mr-3" />
                              View Details
                            </button>
                            <button
                              onClick={() => handleAction('edit', session.id)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200">
                              <FiEdit3 className="w-4 h-4 mr-3" />
                              Edit Session
                            </button>
                            <button
                              onClick={() => handleAction('export', session.id)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200">
                              <LuDownload className="w-4 h-4 mr-3" />
                              Export Data
                            </button>
                            <hr className="my-1 border-white/10" />
                            <button
                              onClick={() => handleAction('delete', session.id)}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-200">
                              <LuTrash2 className="w-4 h-4 mr-3" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredSessions.length === 0 && (
        <div className="text-center py-12">
          <LuBookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            No sessions found
          </h3>
          <p className="text-gray-300">
            {searchTerm || filters !== 'all'
              ? 'Try adjusting your search or filters'
              : "You haven't created any sessions yet"}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/10 glass">
        <div className="flex items-center justify-between text-sm text-gray-300">
          <span>
            Showing {filteredSessions.length} of {sessions.length} sessions
          </span>
          {selectedSessions.length > 0 && (
            <button
              onClick={() => setSelectedSessions([])}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
              Clear Selection
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionList;

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
} from 'react-icons/lu';
import Button from '../../components/atoms/Button';
import IconText from '../../components/atoms/IconText';
import Grid from '../../components/molecules/Grid';
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
    course: { id: 'c1', name: 'Computer Science in Biological Science 101' },
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
  const [filterBy, setFilterBy] = useState('all');
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
    if (filterBy !== 'all') {
      if (filterBy === 'adhoc') {
        filtered = filtered.filter((session) => !session.course);
      } else if (filterBy === 'scheduled') {
        filtered = filtered.filter((session) => session.status === 'scheduled');
      } else if (filterBy === 'completed') {
        filtered = filtered.filter((session) => session.status === 'completed');
      } else if (filterBy === 'ongoing') {
        filtered = filtered.filter((session) => session.status === 'ongoing');
      } else if (filterBy === 'lecture') {
        filtered = filtered.filter(
          (session) => session.sessionType === 'lecture'
        );
      } else if (filterBy === 'lab') {
        filtered = filtered.filter((session) => session.sessionType === 'lab');
      } else if (filterBy === 'seminar') {
        filtered = filtered.filter(
          (session) => session.sessionType === 'seminar'
        );
      } else if (filterBy === 'workshop') {
        filtered = filtered.filter(
          (session) => session.sessionType === 'workshop'
        );
      } else {
        filtered = filtered.filter(
          (session) => session.course?.id === filterBy
        );
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
  }, [sessions, searchTerm, sortBy, sortOrder, filterBy]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

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

  const getSessionTypeColor = (type) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800';
      case 'lab':
        return 'bg-purple-100 text-purple-800';
      case 'seminar':
        return 'bg-indigo-100 text-indigo-800';
      case 'workshop':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
          .map((s) => ({ id: s.course.id, name: s.course.name }))
          .map((c) => JSON.stringify(c))
      ),
    ].map((c) => JSON.parse(c));

    return courses;
  };

  return (
    <div className="bg-white p-4">
      {/* Header */}
      <div className="px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Sessions</h2>
            <p className="text-sm text-gray-500 mt-1">
              {filteredSessions.length} of {sessions.length} sessions
            </p>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative group">
              <LuSearch className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-secondary transition duration-300" />
              <input
                type="text"
                placeholder="Search sessions, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent text-sm outline-0 transition duration-300"
              />
            </div>

            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
              variant="outline"
              size="md">
              <LuFilter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Course Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by
                </label>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  <option value="all">All Sessions</option>
                  <optgroup label="Status">
                    <option value="scheduled">Scheduled</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </optgroup>
                  <optgroup label="Type">
                    <option value="lecture">Lectures</option>
                    <option value="lab">Labs</option>
                    <option value="seminar">Seminars</option>
                    <option value="workshop">Workshops</option>
                    <option value="adhoc">Ad-hoc Sessions</option>
                  </optgroup>
                  <optgroup label="Courses">
                    {getUniqueFilter().map((course) => (
                      <option
                        key={course.id}
                        value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  <option value="date">Date & Time</option>
                  <option value="course">Course Name</option>
                  <option value="location">Location</option>
                  <option value="duration">Duration</option>
                  <option value="attendance">Attendance Rate</option>
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order
                </label>
                <button
                  onClick={() =>
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                  }
                  className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-white text-sm font-medium w-full justify-center">
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
        <div className="px-4 py-3 bg-blue-50 border-b border-gray-300">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700 font-medium">
              {selectedSessions.length} session(s) selected
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-100 rounded-lg">
                <FaFileExport />
                Export
              </Button>
              <Button
                variant="custom"
                size="sm"
                className="px-3 py-1 text-sm font-medium text-white bg-danger-dark hover:bg-danger rounded-lg">
                <LuTrash /> Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Session List */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-b-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedSessions.length === filteredSessions.length &&
                    filteredSessions.length > 0
                  }
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course & Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attendance
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSessions.map((session) => {
              const attendanceRate = getAttendanceRate(session.attendance);
              return (
                <tr
                  key={session.id}
                  className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedSessions.includes(session.id)}
                      onChange={() => handleSelectSession(session.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-start">
                      <LuBookOpen className="w-4 h-4 text-secondary mr-2 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {session.course?.name || 'Unnamed Session'}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {session.course && (
                            <span className="text-xs text-gray-500">
                              {session.course.id}
                            </span>
                          )}
                          <span
                            className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${getSessionTypeColor(
                              session.sessionType
                            )}`}>
                            {session.sessionType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <LuMapPin className="w-4 h-4 mr-1 text-gray-400" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span className="truncate">
                            {session.location?.room},{' '}
                            {session.location?.building}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <Grid
                      baseIcon={LuCalendar}
                      baseText={formatDate(session.date)}>
                      <IconText
                        icon={LuClock}
                        text={session.time}
                      />
                      <IconText
                        icon={LuTimer}
                        text={formatDuration(session.duration)}
                      />
                    </Grid>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <LuUsers className="w-4 h-4 text-green-500 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {session.attendance.present}/
                          {session.attendance.total}
                        </div>
                        <div
                          className={`text-xs font-semibold ${getAttendanceColor(
                            attendanceRate
                          )}`}>
                          {attendanceRate}% present
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        session.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : session.status === 'ongoing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {session.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative">
                      <button
                        onClick={() => toggleActions(session.id)}
                        className="p-1 rounded-lg hover:bg-gray-100 text-gray-500">
                        <FiMoreVertical className="w-4 h-4" />
                      </button>

                      {showActions[session.id] && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-gray-200 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => handleAction('view', session.id)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <LuEye className="w-4 h-4 mr-3" />
                              View Details
                            </button>
                            <button
                              onClick={() => handleAction('edit', session.id)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <FiEdit3 className="w-4 h-4 mr-3" />
                              Edit Session
                            </button>
                            <button
                              onClick={() => handleAction('export', session.id)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <LuDownload className="w-4 h-4 mr-3" />
                              Export Data
                            </button>
                            <hr className="my-1" />
                            <button
                              onClick={() => handleAction('delete', session.id)}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No sessions found
          </h3>
          <p className="text-gray-500">
            {searchTerm || filterBy !== 'all'
              ? 'Try adjusting your search or filters'
              : "You haven't created any sessions yet"}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-4 border-t bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Showing {filteredSessions.length} of {sessions.length} sessions
          </span>
          {selectedSessions.length > 0 && (
            <button
              onClick={() => setSelectedSessions([])}
              className="text-blue-600 hover:text-blue-800 font-medium">
              Clear Selection
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionList;

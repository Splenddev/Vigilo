import React, { useState, useEffect, useRef } from 'react';
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
  LuFileOutput,
} from 'react-icons/lu';
import Button from '../../components/atoms/Button';
import IconText from '../../components/atoms/IconText';
import InfoRow from '../../components/molecules/InfoRow';
import { formatDate, toggleState } from '../../utils/helpers';
import { getSessionTypeColor } from '../../hooks/useAttendance';
import LabelCheckbox from '../../components/atoms/LabelCheckbox';
import AdvancedFilters from '../../components/modal/AdvancedFilters';
import { createMockSessions } from '../../utils/data';
import DropdownPortal from '../../components/containers/DropdownPortal';
import Dropdown from '../../components/atoms/Dropdown';
import { sessionListDropdown } from './assets/assets';
import { useNavigate } from 'react-router-dom';
// Mock data
const mockSessions = createMockSessions(50);

const SessionList = () => {
  const actionRefs = useRef({}); // store refs for all sessions

  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filters, setFilters] = useState({
    status: [],
    type: [],
    course: [],
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

    if (filters.status.length > 0) {
      filtered = filtered.filter((s) => filters.status.includes(s.status));
    }

    if (filters.type.length > 0) {
      filtered = filtered.filter((s) => filters.type.includes(s.sessionType));
    }

    if (filters.course.length > 0) {
      if (filters.course === 'adhoc') {
        filtered = filtered.filter((s) => !s.course);
      } else {
        filtered = filtered.filter((s) =>
          filters.course.includes(s.course?.id)
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
  }, [sessions, searchTerm, sortBy, sortOrder, filters]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
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

  const navigate = useNavigate();

  const handleAction = (action, sessionId) => {
    console.log(`${action} session ${sessionId}`);
    if (action === 'view') {
      navigate(`${sessionId}/info`);
    }
    // setShowActions((prev) => ({ ...prev, [sessionId]: false }));
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

  const uniqueCourses = getUniqueFilter();

  return (
    <div className="glass p-6 text-t-primary">
      {/* Header */}
      <div className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-t-primary">Sessions</h2>
            <p className="text-sm text-t-secondary mt-1">
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
                className="flex-1 pl-9 pr-4 py-2 bg-white/5 border border-white/20 text-t-primary placeholder-gray-400 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:bg-white/10 text-sm outline-0 transition-all duration-300"
              />
            </div>

            {!showFilters && (
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="text-sm glass"
                variant="custom">
                <LuFilter className="w-4 h-4" />
                Filter
              </Button>
            )}
          </div>
        </div>

        {/* Filters */}
        <AdvancedFilters
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          title="Filter Sessions"
          filters={[
            {
              key: 'status',
              label: 'Status',
              type: 'multi',
              options: ['scheduled', 'ongoing', 'completed'],
            },
            {
              key: 'type',
              label: 'Type',
              type: 'multi',
              options: ['lecture', 'lab', 'seminar', 'workshop', 'adhoc'],
            },
            {
              key: 'course',
              label: 'Courses',
              type: 'multi',
              options: uniqueCourses.map((c) => c.value),
            },
          ]}
          selected={filters}
          setSelected={setFilters}
          onApply={(selected) => {
            console.log(selected);
            setFilters(selected);
            setShowFilters(false);
          }}
          onClear={() => {
            setFilters({
              status: '',
              type: '',
              course: '',
            });
          }}
        />
      </div>

      {/* Bulk Actions */}
      {selectedSessions.length > 0 && (
        <div className="px-4 py-3 glass border border-purple-500/30 rounded-xl mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-t-accent font-medium ">
              {selectedSessions.length} session(s) selected
            </span>
            <div className="flex items-center gap-2">
              <Button>
                <LuFileOutput />
                Export
              </Button>
              <Button
                variant="custom"
                className="btn-danger px-3 py-1 text-sm font-semibold">
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
                <LabelCheckbox
                  checked={
                    selectedSessions.length === filteredSessions.length &&
                    filteredSessions.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-t-secondary uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('course')}>
                Course & Type
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-t-secondary uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('location')}>
                Location
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-t-secondary uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('date')}>
                Date & Time
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-t-secondary uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('attendance')}>
                Attendance
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-t-secondary uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}>
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-t-secondary uppercase tracking-wider">
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
                    <LabelCheckbox
                      onChange={() => handleSelectSession(session.id)}
                      checked={selectedSessions.includes(session.id)}
                    />
                  </td>

                  <td className="px-4 py-4">
                    <InfoRow
                      icon={LuBookOpen}
                      className="items-start text-sm font-medium truncate"
                      iconClassName="text-purple-400"
                      label={session.course?.name || 'Unnamed Session'}>
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
                        className="truncate text-t-secondary"
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
                        className="text-t-secondary"
                      />
                      <IconText
                        icon={LuTimer}
                        text={formatDuration(session.duration)}
                        className="text-t-secondary"
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
                        ref={(el) => (actionRefs[session.id] = el)}
                        onClick={() => toggleState(session.id,setShowActions)}
                        className="p-1 rounded-lg hover:bg-white/10 text-t-secondary hover:text-t-primary transition-colors duration-200">
                        <FiMoreVertical className="w-4 h-4" />
                      </button>

                      {showActions[session.id] && (
                        <DropdownPortal
                          anchorRef={{ current: actionRefs[session.id] }}
                          onClose={() => toggleState(session.id,setShowActions)}>
                          <div className="py-1">
                            {sessionListDropdown.map((action) => (
                              <Dropdown
                                icon={action.icon}
                                label={action.label}
                                key={action.key}
                                onAction={() =>
                                  handleAction(action.key, session.id)
                                }
                                className={`capitalize ${action.className} z-10`}
                              />
                            ))}
                          </div>
                        </DropdownPortal>
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
          <h3 className="text-lg font-medium text-t-primary mb-2">
            No sessions found
          </h3>
          <p className="text-t-secondary">
            {searchTerm || filters !== 'all'
              ? 'Try adjusting your search or filters'
              : "You haven't created any sessions yet"}
          </p>
        </div>
      )}
    </div>
  );
};

export default SessionList;

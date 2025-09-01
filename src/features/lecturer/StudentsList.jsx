import React, { useState, useMemo } from 'react';
import {
  LuSearch as Search,
  LuFilter as Filter,
  LuDownload as Download,
  LuChevronUp as ChevronUp,
  LuChevronDown as ChevronDown,
  LuMail as Mail,
  LuCircleCheck as CheckCircle2,
  LuCircleX as XCircle,
  LuUsers as Users,
} from 'react-icons/lu';
import { generateStudentData } from '../../utils/data';
import AdvancedFilters from '../../components/modal/AdvancedFilters';
import LabelCheckbox from '../../components/atoms/LabelCheckbox';
import { useNavigate } from 'react-router-dom';
import FilterSummary from '../../components/molecules/FilterSummary';
import { studentsFilters } from '../attendance/assets/assets';

const studentsData = generateStudentData(75);

const StudentsList = () => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    departments: [],
    levels: [],
    statuses: [],
    attendanceRange: [0, 100],
    absentRate: [0, 100],
  });

  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(20);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filters
  const uniqueDepartments = [...new Set(studentsData.map((s) => s.department))];
  const uniqueLevels = [...new Set(studentsData.map((s) => s.level))];

  const filteredAndSortedStudents = useMemo(() => {
    let list = [...studentsData];

    // Search
    if (search) {
      const searchLower = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(searchLower) ||
          s.email.toLowerCase().includes(searchLower) ||
          s.department.toLowerCase().includes(searchLower)
      );
    }

    // Departments filter
    if (filters.departments.length > 0) {
      list = list.filter((s) => filters.departments.includes(s.department));
    }

    // Levels filter
    if (filters.levels.length > 0) {
      list = list.filter((s) => filters.levels.includes(s.level));
    }

    // Status filter
    if (filters.statuses.length > 0) {
      list = list.filter((s) => filters.statuses.includes(s.status));
    }

    // Attendance range
    list = list.filter(
      (s) =>
        s.attendance.rate >= filters.attendanceRange[0] &&
        s.attendance.rate <= filters.attendanceRange[1]
    );
    list = list.filter(
      (s) =>
        s.attendance.summary.absent >= filters.absentRate[0] &&
        s.attendance.summary.absent <= filters.absentRate[1]
    );

    // Sorting
    list.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      return sortOrder === 'asc'
        ? aVal > bVal
          ? 1
          : -1
        : aVal < bVal
        ? 1
        : -1;
    });

    return list;
  }, [search, filters, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedStudents.length / studentsPerPage
  );
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = filteredAndSortedStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  const filtersData = studentsFilters({
    dpts: uniqueDepartments,
    lvls: uniqueLevels,
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStudents(currentStudents.map((s) => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (id, checked) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, id]);
    } else {
      setSelectedStudents(selectedStudents.filter((sid) => sid !== id));
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Name',
      'Email',
      'Department',
      'Level',
      'Group',
      'Attendance',
      'Status',
    ];
    const csvContent = [
      headers.join(','),
      ...filteredAndSortedStudents.map((s) =>
        [
          s.name,
          s.email,
          s.department,
          s.level,
          s.group,
          s.attendance.rate,
          s.status,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students-list.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const AttendanceBar = ({ percentage }) => (
    <div className="w-full bg-white/10 rounded-full h-2 relative">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${
          percentage >= 80
            ? 'bg-green-500'
            : percentage >= 60
            ? 'bg-yellow-500'
            : 'bg-red-500'
        }`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Students Directory
          </h1>
          <p className="text-gray-400">
            {filteredAndSortedStudents.length} students found
            {selectedStudents.length > 0 &&
              ` • ${selectedStudents.length} selected`}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {selectedStudents.length > 0 && (
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/50 text-purple-300 rounded-xl hover:bg-purple-600/30 transition-all">
              <Users size={16} />
              Bulk Actions ({selectedStudents.length})
            </button>
          )}

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              showFilters ? 'bg-purple-600/30 border-purple-500' : 'glass'
            }`}>
            <Filter size={16} />
            Filters
          </button>

          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 btn-primary rounded-xl">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="glass rounded-xl p-4 mb-6">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search students by name, email, or department..."
            className="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-2 focus:ring-purple-500 rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {showFilters && (
        <AdvancedFilters
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          selected={filters}
          setSelected={setFilters}
          filters={filtersData}
          onApply={(selected) => {
            setFilters(selected);
            setCurrentPage(1);
            setShowFilters(false);
          }}
          onClear={() => {
            setFilters({
              departments: [],
              levels: [],
              statuses: [],
              attendanceRange: [0, 100],
            });
            setCurrentPage(1);
          }}
        />
      )}

      <FilterSummary
        filters={filtersData}
        selected={filters}
        setSelected={setFilters}
      />

      {/* Table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-4 text-left">
                  <LabelCheckbox
                    checked={
                      selectedStudents.length === currentStudents.length &&
                      currentStudents.length > 0
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th className="p-4 text-left"></th>
                {[
                  { key: 'name', label: 'Name' },
                  { key: 'department', label: 'Department' },
                  { key: 'level', label: 'Level' },
                  { key: 'group', label: 'Group' },
                  { key: 'attendance', label: 'Attendance' },
                  { key: 'status', label: 'Status' },
                ].map((column) => (
                  <th
                    key={column.key}
                    className="p-4 text-left cursor-pointer hover:bg-white/5 transition-colors"
                    onClick={() => handleSort(column.key)}>
                    <div className="flex items-center gap-2 text-sm font-medium text-t-secondary">
                      {column.label}
                      <div className="flex flex-col">
                        <ChevronUp
                          size={12}
                          className={`${
                            sortBy === column.key && sortOrder === 'asc'
                              ? 'text-purple-400'
                              : 'text-gray-600'
                          }`}
                        />
                        <ChevronDown
                          size={12}
                          className={`${
                            sortBy === column.key && sortOrder === 'desc'
                              ? 'text-purple-400'
                              : 'text-gray-600'
                          } -mt-1`}
                        />
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => navigate(`${student.id}`)}
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                    selectedStudents.includes(student.id)
                      ? 'bg-purple-500/10'
                      : ''
                  }`}>
                  <td className="p-4">
                    <LabelCheckbox
                      checked={selectedStudents.includes(student.id)}
                      onChange={(e) =>
                        handleSelectStudent(student.id, e.target.checked)
                      }
                    />
                  </td>
                  <td className="p-4">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-full border-2 border-purple-500/30"
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-t-primary">
                        {student.name}
                      </div>
                      <a
                        href={`mailto:${student.email}`}
                        className="text-sm text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-1 mt-1">
                        <Mail size={12} />
                        {student.email}
                      </a>
                    </div>
                  </td>
                  <td className="p-4 text-t-secondary">{student.department}</td>
                  <td className="p-4 text-t-secondary">{student.level}</td>
                  <td className="p-4 text-t-secondary">{student.group}</td>
                  <td className="p-4">
                    <div className="w-24">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-t-secondary">
                          {student.attendance.rate}%
                        </span>
                      </div>
                      <AttendanceBar percentage={student.attendance.rate} />
                    </div>
                  </td>
                  <td className="p-4">
                    <div
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        student.status === 'active'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                      {student.status === 'active' ? (
                        <CheckCircle2 size={12} />
                      ) : (
                        <XCircle size={12} />
                      )}
                      {student.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {currentStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No students found</div>
            <p className="text-sm text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-sm text-gray-400">
            Showing {startIndex + 1} to{' '}
            {Math.min(
              startIndex + studentsPerPage,
              filteredAndSortedStudents.length
            )}{' '}
            of {filteredAndSortedStudents.length} students
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm glass rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors">
              Previous
            </button>

            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-purple-600 text-t-primary'
                          : 'glass hover:bg-white/10'
                      }`}>
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <span
                      key={page}
                      className="px-2 text-gray-500">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm glass rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsList;

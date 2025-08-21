import React, { useState, useEffect } from 'react';
import {
  LuDownload,
  LuCalendar,
  LuUsers,
  LuClock,
  LuBookOpen,
  LuPin,
} from 'react-icons/lu';
import Title from '../../components/atoms/Title';

const LecturerDashboard = () => {
  const [recentSessions, setRecentSessions] = useState([]);

  // Simulate API fetch
  useEffect(() => {
    const fetchRecentSessions = async () => {
      // TODO: Replace with real API call
      const mock = [
        {
          id: 1,
          course: { id: 'c1', name: 'Computer Science 101' },
          date: '2025-08-20',
          time: '10:30 AM',
          attendance: { present: 42, total: 50 },
        },
        {
          id: 2,
          course: { id: 'c2', name: 'Data Structures' },
          date: '2025-08-19',
          time: '2:15 PM',
          attendance: { present: 38, total: 45 },
        },
        {
          id: 3,
          course: null, // ad-hoc session
          date: '2025-08-18',
          time: '9:00 AM',
          attendance: { present: 25, total: 30 },
        },
      ];
      setRecentSessions(mock);
    };
    fetchRecentSessions();
  }, []);

  const handleStartSession = () => {
    // Navigate to session setup page
    console.log('Navigating to /session/new');
    // In a real app, this would be: navigate('/session/new');
  };

  const handleExport = (sessionId) => {
    console.log(`Exporting session ${sessionId}`);
    // TODO: hook API Ludownload
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      {/* Hidden Sidebar Scaffold */}
      <div className="hidden">
        <nav className="bg-white w-64 h-full fixed left-0 top-16 border-r shadow-sm"></nav>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* CTA Card */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-brand-green-light to-brand-green-dark rounded-2xl shadow-lg overflow-hidden">
            <div className="px-8 py-12 text-center">
              <Title
                contents={'Start Attendance Session'}
                className="font-bold text-white mb-2"
              />
              <p className="text-blue-100 mb-8 text-lg">
                Take attendance in seconds with Vigilo's smart session setup
              </p>
              <button
                onClick={handleStartSession}
                className="bg-white  font-semibold px-8 py-3 rounded-xl text-brand-green-dark hover:bg-brand-green-soft transition shadow-md">
                Go to Session Setup
              </button>
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <section className="mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Recent Sessions
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recentSessions.map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition group">
                <div className="p-6">
                  {/* Course Name */}
                  <div className="flex items-center mb-3">
                    <LuBookOpen className="w-5 h-5 text-blue-500 mr-2" />
                    <h4 className="font-semibold text-gray-900 truncate group-hover:text-blue-600">
                      {session.course?.name || 'Unnamed Session'}
                    </h4>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center mb-2 text-sm text-gray-600">
                    <LuCalendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(session.date)}</span>
                  </div>
                  <div className="flex items-center mb-4 text-sm text-gray-600">
                    <LuClock className="w-4 h-4 mr-2" />
                    <span>{session.time}</span>
                  </div>

                  {/* Attendance */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center text-sm">
                      <LuUsers className="w-4 h-4 text-green-500 mr-2" />
                      <span className="font-medium text-gray-900">
                        {session.attendance.present}/{session.attendance.total}
                      </span>
                      <span className="text-gray-500 ml-1">present</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">
                        Attendance Rate
                      </div>
                      <div className="text-sm font-semibold text-green-600">
                        {Math.round(
                          (session.attendance.present /
                            session.attendance.total) *
                            100
                        )}
                        %
                      </div>
                    </div>
                  </div>

                  {/* Export Button */}
                  <button
                    onClick={() => handleExport(session.id)}
                    className="w-full flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition">
                    <LuDownload className="w-4 h-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Teaser */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-start space-x-3">
            <LuPin className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 mb-1">
                Coming in v1.5
              </h4>
              <p className="text-amber-800">
                Weekly schedules & class history to manage your courses more
                efficiently.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LecturerDashboard;

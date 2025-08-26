import React from 'react';
import {
  LuBookOpen,
  LuCalendar,
  LuDownload,
  LuPin,
  LuTrendingUp,
  LuUsers,
  LuClock,
  LuPlay,
} from 'react-icons/lu';
import { formatDate } from '../../../utils/helpers';
import Button from '../../../components/atoms/Button';

const RecentSession = ({ groupedSessions }) => {
  const handleExport = (sessionId) => {
    console.log('Exporting session:', sessionId);
  };

  return (
    <div>
      {['Ongoing', 'Scheduled', 'Completed'].map(
        (group) =>
          groupedSessions[group].length > 0 && (
            <section
              key={group}
              className="mb-8">
              <h2 className="text-lg font-bold mb-4">{group} Sessions</h2>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {groupedSessions[group].map((session) => (
                  <div
                    key={session.id}
                    className="card-hover overflow-hidden group">
                    <div>
                      {/* Course Name */}
                      <div className="flex items-start mb-4 min-w-0">
                        <div className="bg-[var(--color-primary-purple-soft)] p-2 rounded-lg mr-3 shrink-0 group-hover:bg-[var(--color-primary-pink-soft)] transition-colors">
                          <LuBookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-primary)]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-white text-sm sm:text-base leading-tight group-hover:text-[var(--color-primary-pink)] transition-colors">
                            {session.course?.name || 'Unnamed Session'}
                          </h3>
                          <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                            {session.status}
                          </p>
                        </div>
                      </div>

                      {/* Session Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-xs sm:text-sm text-[var(--color-text-tertiary)]">
                          <LuCalendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 shrink-0 text-[var(--color-neutral-light)]" />
                          <span>{formatDate(session.date)}</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-[var(--color-text-tertiary)]">
                          <LuClock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 shrink-0 text-[var(--color-neutral-light)]" />
                          <span>{session.time}</span>
                        </div>
                      </div>

                      {/* Attendance Stats */}
                      <div className="bg-[var(--color-bg-secondary)] rounded-lg p-3 sm:p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center text-xs sm:text-sm">
                            <LuUsers className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--color-success)] mr-2 shrink-0" />
                            <span className="font-semibold text-white">
                              {session.attendance.present}/
                              {session.attendance.total}
                            </span>
                            <span className="text-[var(--color-text-tertiary)] ml-1">
                              present
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-[var(--color-text-tertiary)] mb-1">
                              Rate
                            </div>
                            <div className="text-xs sm:text-sm font-bold text-[var(--color-success)]">
                              {Math.round(
                                (session.attendance.present /
                                  session.attendance.total) *
                                  100
                              )}
                              %
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-[var(--color-bg-tertiary)] rounded-full h-1.5 sm:h-2">
                          <div
                            className="bg-[var(--color-success)] h-1.5 sm:h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${
                                (session.attendance.present /
                                  session.attendance.total) *
                                100
                              }%`,
                            }}></div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          onClick={() => handleExport(session.id)}
                          className="bg-[var(--color-primary-purple-soft)] flex-1 justify-center">
                          <LuDownload className="w-3 h-3 sm:w-4 sm:h-4 mr-2 shrink-0" />
                          Export Data
                        </Button>
                        {/* <button
                          className="flex items-center justify-center w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 
                     rounded-lg text-xs sm:text-sm font-semibold 
                     text-[var(--color-primary)] border border-[var(--color-border-accent)] 
                     bg-[var(--color-primary-purple-soft)] 
                     hover:bg-[var(--color-primary-pink-soft)] 
                     transition-all duration-200 group-hover:shadow-sm">
                          <LuDownload className="w-3 h-3 sm:w-4 sm:h-4 mr-2 shrink-0" />
                          Export Data
                        </button> */}

                        {/* Only show "End" if Ongoing */}
                        {session.status === 'Ongoing' && (
                          <Button
                            onClick={() => console.log(session.id)}
                            className=""
                            variant="danger">
                            End
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
      )}
    </div>
  );
};

export default RecentSession;

import React from 'react';
import {
  LuBookOpen,
  LuCalendar,
  LuDownload,
  LuTrendingUp,
  LuUsers,
  LuClock,
} from 'react-icons/lu';
import { formatDate } from '../../../utils/helpers';
import Button from '../../../components/atoms/Button';
import { motion } from 'framer-motion';
import {
  cardVariants,
  containerVariants,
} from '../../../utils/animationVariants';
import InfoRow from '../../../components/molecules/InfoRow';

const RecentSession = ({ groupedSessions }) => {
  const handleExport = (sessionId) => {
    console.log('Exporting session:', sessionId);
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}>
      {['Ongoing', 'Scheduled', 'Completed'].map(
        (group) =>
          groupedSessions[group].length > 0 && (
            <motion.section
              key={group}
              className="mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}>
              <h2 className="text-lg font-bold mb-4">{group} Sessions</h2>

              <motion.div
                className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                variants={containerVariants}>
                {groupedSessions[group].map((session, index) => (
                  <motion.div
                    key={session.id}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    custom={index}
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="card-hover overflow-hidden group">
                    <div>
                      {/* Course Name */}
                      <InfoRow
                        label={session.course?.name || 'Unnamed Session'}
                        labelClassName="font-bold text-md"
                        icon={LuBookOpen}
                        align="center">
                        <p className="text-xs">{session.status}</p>
                      </InfoRow>

                      {/* Session Info */}
                      <div className="space-y-2 my-4">
                        <InfoRow
                          icon={LuCalendar}
                          iconClassName="w-3 h-3 sm:w-4 sm:h-4 shrink-0"
                          label={formatDate(session.date)}
                          align="center"
                        />
                        <InfoRow
                          iconClassName="w-3 h-3 sm:w-4 sm:h-4 shrink-0"
                          icon={LuClock}
                          label={session.time}
                          align="center"
                        />
                      </div>

                      {/* Attendance Stats */}
                      <div className="bg-bg-secondary rounded-lg p-3 sm:p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <InfoRow
                            iconClassName="w-3 h-3 sm:w-4 sm:h-4 text-success shrink-0"
                            labelClassName="font-semibold"
                            icon={LuUsers}
                            label={`${session.attendance.present}/
                              ${session.attendance.total} `}
                            text="success"
                            align="center"
                            direction="row">
                            present
                          </InfoRow>
                          <div className="text-right">
                            <div className="text-xs text-t-secondary mb-1">
                              Rate
                            </div>
                            <div className="text-xs sm:text-sm font-bold text-success">
                              {Math.round(
                                (session.attendance.present /
                                  session.attendance.total) *
                                  100
                              )}
                              %
                            </div>
                          </div>
                        </div>

                        {/* Animated Progress Bar */}
                        <div className="w-full bg-bg-tertiary rounded-full h-1.5 sm:h-2 overflow-hidden">
                          <motion.div
                            className="bg-success h-1.5 sm:h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${
                                (session.attendance.present /
                                  session.attendance.total) *
                                100
                              }%`,
                            }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                          />
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2">
                        <motion.div whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="primary"
                            onClick={() => handleExport(session.id)}
                            className=" flex-1 justify-center">
                            <LuDownload className="w-5 h-5 mr-2 shrink-0" />
                            Export Data
                          </Button>
                        </motion.div>

                        {session.status === 'Ongoing' && (
                          <motion.div whileTap={{ scale: 0.95 }}>
                            <Button
                              onClick={() => console.log(session.id)}
                              className=""
                              variant="danger">
                              End
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )
      )}
    </motion.div>
  );
};

export default RecentSession;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LuCalendar as Calendar, 
  LuMapPin as MapPin, 
  LuUsers as Users, 
  LuBookOpen as BookOpen, 
  LuGraduationCap as GraduationCap, 
  LuBuilding as Building, 
  LuClock as Clock,
  LuInfo as Info,
  LuStar as Star,
  LuTrophy as Trophy,
  LuTarget as Target
} from 'react-icons/lu';

const CourseOverview = ({ activeTab, group, student, fadeIn }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showTooltip, setShowTooltip] = useState(null);

  // Mock data for enhanced experience (replace with real data)
  const courseStats = {
    completionRate: 85,
    averageGrade: 'B+',
    studyHours: 120,
    assignments: 12,
    nextDeadline: '2024-01-15'
  };

  const courseInfo = [
    {
      id: 'session',
      icon: Calendar,
      label: 'Academic Year',
      value: group?.studentsRosterId?.session,
      description: 'Current academic session you\'re enrolled in',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 'faculty',
      icon: Building,
      label: 'Faculty',
      value: group?.faculty,
      description: 'Your academic faculty division',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      id: 'department',
      icon: GraduationCap,
      label: 'Department',
      value: group?.department,
      description: 'Specialized department for your field of study',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      id: 'venue',
      icon: MapPin,
      label: 'Class Venue',
      value: group?.venue,
      description: 'Primary classroom location for lectures',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      id: 'level',
      icon: Target,
      label: 'Level',
      value: `${group?.level}L`,
      description: 'Your current academic level',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    {
      id: 'enrollment',
      icon: Clock,
      label: 'Enrolled Since',
      value: student?.enrollmentDate,
      description: 'Date you joined this course',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    }
  ];

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: { 
      width: '100%',
      transition: { 
        duration: 1.5, 
        ease: "easeOut",
        delay: 0.5
      }
    }
  };

  const InfoCard = ({ info, index }) => (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="relative group cursor-pointer"
      onMouseEnter={() => {
        setHoveredCard(info.id);
        setShowTooltip(info.id);
      }}
      onMouseLeave={() => {
        setHoveredCard(null);
        setShowTooltip(null);
      }}
    >
      <div className={`
        relative p-4 rounded-xl border border-slate-200/50 
        bg-gradient-to-br from-white/80 to-slate-50/80 backdrop-blur-sm
        shadow-sm group-hover:shadow-lg transition-all duration-300
        overflow-hidden
      `}>
        {/* Gradient overlay on hover */}
        <div className={`
          absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 
          group-hover:opacity-5 transition-opacity duration-300
        `} />
        
        {/* Icon */}
        <div className={`
          w-12 h-12 rounded-lg ${info.bgColor} flex items-center justify-center mb-3
          group-hover:scale-110 transition-transform duration-300
        `}>
          <info.icon className={`w-6 h-6 ${info.iconColor}`} />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <p className="text-sm text-slate-500 font-medium mb-1">
            {info.label}
          </p>
          <p className="text-lg font-bold text-slate-800 mb-2">
            {info.value || 'Not specified'}
          </p>
          
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip === info.id && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full left-0 right-0 mb-2 z-20"
              >
                <div className="bg-slate-800 text-white text-xs p-2 rounded-lg shadow-xl">
                  <div className="flex items-center gap-1 mb-1">
                    <Info className="w-3 h-3" />
                    <span className="font-medium">Info</span>
                  </div>
                  <p>{info.description}</p>
                  <div className="absolute top-full left-4 w-2 h-2 bg-slate-800 rotate-45 -mt-1" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: hoveredCard === info.id ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );

  if (activeTab !== 'overview') return null;

  return (
    <motion.div
      key="overview"
      className="space-y-8"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200/50">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Progress</span>
          </div>
          <div className="text-2xl font-bold text-blue-900">{courseStats.completionRate}%</div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200/50">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-800">Grade</span>
          </div>
          <div className="text-2xl font-bold text-emerald-900">{courseStats.averageGrade}</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200/50">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Study Hours</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">{courseStats.studyHours}h</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200/50">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Tasks</span>
          </div>
          <div className="text-2xl font-bold text-orange-900">{courseStats.assignments}</div>
        </div>
      </motion.div>

      {/* Course Information Cards */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
            Course Information
          </h2>
          <p className="text-slate-600 mb-6">
            Hover over each card to learn more about your course details
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseInfo.map((info, index) => (
            <InfoCard key={info.id} info={info} index={index} />
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl border border-slate-200/50"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Course Progress</h3>
            <p className="text-sm text-slate-600">You're doing great! Keep it up!</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{courseStats.completionRate}%</div>
            <div className="text-xs text-slate-500">Complete</div>
          </div>
        </div>
        
        <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            variants={progressVariants}
            initial="hidden"
            animate="visible"
            style={{ width: `${courseStats.completionRate}%` }}
          />
          <motion.div
            className="absolute right-2 top-0 w-1 h-full bg-white/50 rounded-full"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="flex justify-between items-center mt-3 text-xs text-slate-500">
          <span>Started {student?.enrollmentDate}</span>
          <span>Next deadline: {courseStats.nextDeadline}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CourseOverview;
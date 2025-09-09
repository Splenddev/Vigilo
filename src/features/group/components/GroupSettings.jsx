import React from 'react';
import {
  FiSettings,
  FiUsers,
  FiLock,
  FiMapPin,
  FiBell,
  FiFileText,
  FiUser,
  FiShield,
  FiTrash2,
  FiCode,
  FiGlobe,
} from 'react-icons/fi';

const GroupSettings = ({ settings }) => {
  if (!settings) return null;

  return (
    <div className="card-hover animate-fade-in-up p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold gradient-text">
          <FiSettings className="text-indigo-400" />
          Group Settings
        </h2>
        <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          Last updated: {new Date(settings.updatedAt).toLocaleDateString()}
        </span>
      </div>

      {/* General */}
      <section>
        <h3 className="flex items-center gap-2 text-lg font-medium text-slate-300 mb-2">
          <FiGlobe className="text-blue-400" /> General
        </h3>
        <div className="space-y-1 text-sm text-slate-400">
          <p>
            <strong>Name:</strong> {settings.general.groupName}
          </p>
          <p>
            <strong>Description:</strong> {settings.general.description}
          </p>
          <p>
            <strong>Visibility:</strong> {settings.general.visibility}
          </p>
          <p>
            <strong>File Uploads:</strong>{' '}
            {settings.general.allowFileUploads ? 'Enabled' : 'Disabled'}
          </p>
        </div>
      </section>

      {/* Privacy */}
      <section>
        <h3 className="flex items-center gap-2 text-lg font-medium text-slate-300 mb-2">
          <FiLock className="text-purple-400" /> Privacy
        </h3>
        <div className="space-y-1 text-sm text-slate-400">
          <p>
            <strong>Join Policy:</strong> {settings.privacy.joinPolicy}
          </p>
          {settings.privacy.groupCode && (
            <p className="flex items-center gap-2">
              <FiCode className="text-cyan-400" /> Code:{' '}
              <span className="font-mono">{settings.privacy.groupCode}</span>
            </p>
          )}
          <p>
            <strong>Students Can View Roster:</strong>{' '}
            {settings.privacy.allowStudentsViewRoster ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Student Messaging:</strong>{' '}
            {settings.privacy.allowStudentMessaging ? 'Enabled' : 'Disabled'}
          </p>
        </div>
      </section>

      {/* Attendance */}
      <section>
        <h3 className="flex items-center gap-2 text-lg font-medium text-slate-300 mb-2">
          <FiMapPin className="text-emerald-400" /> Attendance
        </h3>
        <div className="space-y-1 text-sm text-slate-400">
          <p>
            <strong>Geo Restriction:</strong>{' '}
            {settings.attendance.geoRestriction ? 'Enabled' : 'Disabled'}
          </p>
          <p>
            <strong>Max Distance:</strong>{' '}
            {settings.attendance.maxDistanceMeters}m
          </p>
          <p>
            <strong>Auto Close:</strong> {settings.attendance.autoCloseMinutes}{' '}
            mins
          </p>
          <p>
            <strong>Plea Window:</strong> {settings.attendance.pleaWindowDays}{' '}
            days
          </p>
          <p>
            <strong>Late Threshold:</strong>{' '}
            {settings.attendance.lateThresholdMinutes} mins
          </p>
        </div>
      </section>

      {/* Notifications */}
      <section>
        <h3 className="flex items-center gap-2 text-lg font-medium text-slate-300 mb-2">
          <FiBell className="text-yellow-400" /> Notifications
        </h3>
        <div className="space-y-1 text-sm text-slate-400">
          <p>
            <strong>Class Reminders:</strong>{' '}
            {settings.notifications.enableClassReminders ? 'On' : 'Off'}
          </p>
          <p>
            <strong>Absence Alerts:</strong>{' '}
            {settings.notifications.enableAbsenceAlerts ? 'On' : 'Off'}
          </p>
          <p>
            <strong>Push Notifications:</strong>{' '}
            {settings.notifications.pushNotifications ? 'On' : 'Off'}
          </p>
          <p>
            <strong>Email Notifications:</strong>{' '}
            {settings.notifications.emailNotifications ? 'On' : 'Off'}
          </p>
        </div>
      </section>

      {/* Assignments */}
      <section>
        <h3 className="flex items-center gap-2 text-lg font-medium text-slate-300 mb-2">
          <FiFileText className="text-orange-400" /> Assignments
        </h3>
        <div className="space-y-1 text-sm text-slate-400">
          <p>
            <strong>Virtual Submissions:</strong>{' '}
            {settings.assignments.allowVirtualSubmissions
              ? 'Allowed'
              : 'Not Allowed'}
          </p>
          <p>
            <strong>Late Submissions:</strong>{' '}
            {settings.assignments.allowLateSubmissions
              ? 'Allowed'
              : 'Not Allowed'}
          </p>
          <p>
            <strong>Grading:</strong>{' '}
            {settings.assignments.gradingEnabled ? 'Enabled' : 'Disabled'}
          </p>
          <p>
            <strong>Max File Size:</strong> {settings.assignments.maxFileSizeMB}{' '}
            MB
          </p>
        </div>
      </section>

      {/* Roles */}
      <section>
        <h3 className="flex items-center gap-2 text-lg font-medium text-slate-300 mb-2">
          <FiUsers className="text-cyan-400" /> Roles
        </h3>
        <div className="space-y-1 text-sm text-slate-400">
          <p className="flex items-center gap-2">
            <FiUser className="text-emerald-400" />
            <strong>Class Rep:</strong> {settings.roles.classRep.name} (
            {settings.roles.classRep.email})
          </p>
          {settings.roles.assistants.map((a) => (
            <p
              key={a.id}
              className="flex items-center gap-2">
              <FiShield className="text-purple-400" />
              <strong>Assistant:</strong> {a.name} ({a.email})
            </p>
          ))}
        </div>
      </section>

      {/* Danger Zone */}
      <section className="border-t border-red-500/30 pt-4">
        <h3 className="flex items-center gap-2 text-lg font-medium text-red-400 mb-2">
          <FiTrash2 /> Danger Zone
        </h3>
        <p className="text-sm text-red-300">
          {settings.dangerZone.deletionWarning}
        </p>
        <div className="flex items-center gap-4 mt-3">
          {settings.dangerZone.allowDeleteGroup && (
            <button className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20">
              Delete Group
            </button>
          )}
          {settings.dangerZone.allowTransferOwnership && (
            <button className="px-4 py-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/30 hover:bg-orange-500/20">
              Transfer Ownership
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default GroupSettings;

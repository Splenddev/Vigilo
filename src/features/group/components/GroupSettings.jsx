import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiSettings,
  FiUsers,
  FiMapPin,
  FiShield,
  FiBell,
  FiFileText,
  FiUser,
  FiCopy,
  FiSave,
  FiRotateCcw,
} from 'react-icons/fi';
import { dummyGroupSettings } from '../../../utils/data';

// Custom Toggle Component
const Toggle = ({ enabled, onChange, label }) => (
  <label
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
    }}>
    <div
      onClick={() => onChange(!enabled)}
      style={{
        width: '48px',
        height: '24px',
        borderRadius: '12px',
        background: enabled
          ? 'linear-gradient(to right, #7c3aed, #ec4899)'
          : 'var(--color-bg-glass-md)',
        position: 'relative',
        transition: 'all 0.3s ease',
        border: enabled ? 'none' : '1px solid var(--color-border-primary)',
      }}>
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: '#ffffff',
          position: 'absolute',
          top: '2px',
          left: enabled ? '26px' : '2px',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      />
    </div>
    <span style={{ color: 'var(--color-t-primary)', fontSize: '0.875rem' }}>
      {label}
    </span>
  </label>
);

// Custom Radio Group Component
const RadioGroup = ({ options, value, onChange, name }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {options.map((option) => (
      <label
        key={option.value}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
        }}>
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={(e) => onChange(e.target.value)}
          style={{ accentColor: 'var(--color-primary-purple)' }}
        />
        <span style={{ color: 'var(--color-t-primary)', fontSize: '0.875rem' }}>
          {option.label}
        </span>
      </label>
    ))}
  </div>
);

// Custom Input Component
const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  readOnly,
  style,
  ...props
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    readOnly={readOnly}
    style={{
      width: '100%',
      padding: '12px 16px',
      borderRadius: '12px',
      border: '1px solid var(--color-border-primary)',
      background: readOnly
        ? 'var(--color-bg-glass-xs)'
        : 'var(--color-bg-glass)',
      color: 'var(--color-t-primary)',
      fontSize: '0.875rem',
      transition: 'all 0.2s ease',
      outline: 'none',
      ...style,
    }}
    onFocus={(e) => {
      if (!readOnly) {
        e.target.style.borderColor = 'var(--color-primary-purple)';
        e.target.style.background = 'var(--color-bg-glass-strong)';
      }
    }}
    onBlur={(e) => {
      if (!readOnly) {
        e.target.style.borderColor = 'var(--color-border-primary)';
        e.target.style.background = 'var(--color-bg-glass)';
      }
    }}
    {...props}
  />
);

// Custom Textarea Component
const Textarea = ({ value, onChange, placeholder, rows = 3, ...props }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    style={{
      width: '100%',
      padding: '12px 16px',
      borderRadius: '12px',
      border: '1px solid var(--color-border-primary)',
      background: 'var(--color-bg-glass)',
      color: 'var(--color-t-primary)',
      fontSize: '0.875rem',
      resize: 'vertical',
      minHeight: '80px',
      outline: 'none',
      transition: 'all 0.2s ease',
    }}
    onFocus={(e) => {
      e.target.style.borderColor = 'var(--color-primary-purple)';
      e.target.style.background = 'var(--color-bg-glass-strong)';
    }}
    onBlur={(e) => {
      e.target.style.borderColor = 'var(--color-border-primary)';
      e.target.style.background = 'var(--color-bg-glass)';
    }}
    {...props}
  />
);

// Custom Select Component
const Select = ({ value, onChange, options, ...props }) => (
  <select
    value={value}
    onChange={onChange}
    style={{
      width: '100%',
      padding: '12px 16px',
      borderRadius: '12px',
      border: '1px solid var(--color-border-primary)',
      background: 'var(--color-bg-glass)',
      color: 'var(--color-t-primary)',
      fontSize: '0.875rem',
      outline: 'none',
      transition: 'all 0.2s ease',
    }}
    onFocus={(e) => {
      e.target.style.borderColor = 'var(--color-primary-purple)';
      e.target.style.background = 'var(--color-bg-glass-strong)';
    }}
    onBlur={(e) => {
      e.target.style.borderColor = 'var(--color-border-primary)';
      e.target.style.background = 'var(--color-bg-glass)';
    }}
    {...props}>
    {options.map((option) => (
      <option
        key={option.value}
        value={option.value}
        style={{ background: 'var(--color-bg-secondary)' }}>
        {option.label}
      </option>
    ))}
  </select>
);

// Section Card Component
const SectionCard = ({ icon: Icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    style={{
      background: 'var(--color-bg-glass)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid var(--color-border-primary)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px',
    }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
      }}>
      <Icon
        size={20}
        style={{ color: 'var(--color-primary-purple)' }}
      />
      <h2
        style={{
          margin: 0,
          fontSize: '1.25rem',
          fontWeight: '600',
          color: 'var(--color-t-primary)',
        }}>
        {title}
      </h2>
    </div>
    {children}
  </motion.div>
);

// Form Row Component
const FormRow = ({ label, children, description }) => (
  <div style={{ marginBottom: '20px' }}>
    <label
      style={{
        display: 'block',
        marginBottom: '8px',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: 'var(--color-t-secondary)',
      }}>
      {label}
    </label>
    {children}
    {description && (
      <p
        style={{
          margin: '4px 0 0 0',
          fontSize: '0.75rem',
          color: 'var(--color-t-muted)',
        }}>
        {description}
      </p>
    )}
  </div>
);

// Copy Button Component
const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        position: 'absolute',
        right: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: copied
          ? 'var(--color-success)'
          : 'var(--color-bg-glass-md)',
        border: '1px solid var(--color-border-primary)',
        borderRadius: '6px',
        padding: '6px 8px',
        color: 'var(--color-t-primary)',
        cursor: 'pointer',
        fontSize: '0.75rem',
        transition: 'all 0.2s ease',
      }}>
      <FiCopy size={14} />
    </button>
  );
};

// Role Card Component
const RoleCard = ({ person, role, isClassRep = false }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px',
      background: 'var(--color-bg-glass-sm)',
      border: '1px solid var(--color-border-primary)',
      borderRadius: '12px',
      marginBottom: '12px',
    }}>
    <div
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'linear-gradient(to right, #7c3aed, #ec4899)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: '600',
        fontSize: '0.875rem',
      }}>
      {person.name
        .split(' ')
        .map((n) => n[0])
        .join('')}
    </div>
    <div style={{ flex: 1 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '4px',
        }}>
        <span
          style={{
            color: 'var(--color-t-primary)',
            fontWeight: '500',
            fontSize: '0.875rem',
          }}>
          {person.name}
        </span>
        {isClassRep && (
          <span
            style={{
              background: 'linear-gradient(to right, #7c3aed, #ec4899)',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '500',
            }}>
            Class Rep
          </span>
        )}
      </div>
      <span
        style={{
          color: 'var(--color-t-tertiary)',
          fontSize: '0.75rem',
        }}>
        {person.email}
      </span>
    </div>
  </div>
);

// Main Component
export default function GroupSettingsPage() {
  const [settings, setSettings] = useState(dummyGroupSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const updateSettings = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
    setHasChanges(true);
  };

  const updateNestedSettings = (section, subsection, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [key]: value,
        },
      },
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    setHasChanges(false);
    // Here you would typically send the data to your backend
  };

  const handleReset = () => {
    setSettings(dummyGroupSettings);
    setHasChanges(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--gradient-bg-primary)',
        padding: '24px',
      }}>
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            marginBottom: '32px',
            textAlign: 'center',
          }}>
          <h1
            style={{
              fontSize: '2.25rem',
              fontWeight: '700',
              background: 'linear-gradient(to right, #7c3aed, #ec4899)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 8px 0',
            }}>
            Group Settings
          </h1>
          <p
            style={{
              color: 'var(--color-t-secondary)',
              fontSize: '1rem',
              margin: 0,
            }}>
            Configure your group preferences and permissions
          </p>
        </motion.div>

        {/* General Section */}
        <SectionCard
          icon={FiSettings}
          title="General Settings">
          <FormRow label="Group Name">
            <Input
              value={settings.general.groupName}
              onChange={(e) =>
                updateSettings('general', 'groupName', e.target.value)
              }
              placeholder="Enter group name"
            />
          </FormRow>

          <FormRow label="Description">
            <Textarea
              value={settings.general.description}
              onChange={(e) =>
                updateSettings('general', 'description', e.target.value)
              }
              placeholder="Describe your group"
              rows={3}
            />
          </FormRow>

          <FormRow label="Visibility">
            <Select
              value={settings.general.visibility}
              onChange={(e) =>
                updateSettings('general', 'visibility', e.target.value)
              }
              options={[
                { value: 'public', label: 'Public - Anyone can find' },
                { value: 'private', label: 'Private - Invitation only' },
                { value: 'code', label: 'Code Required - Join with code' },
              ]}
            />
          </FormRow>

          <FormRow label="File Upload Settings">
            <Toggle
              enabled={settings.general.allowFileUploads}
              onChange={(value) =>
                updateSettings('general', 'allowFileUploads', value)
              }
              label="Allow file uploads"
            />
          </FormRow>
        </SectionCard>

        {/* Privacy Section */}
        <SectionCard
          icon={FiShield}
          title="Privacy & Access">
          <FormRow label="Join Policy">
            <RadioGroup
              name="joinPolicy"
              value={settings.privacy.joinPolicy}
              onChange={(value) =>
                updateSettings('privacy', 'joinPolicy', value)
              }
              options={[
                {
                  value: 'invite_only',
                  label: 'Invite Only - Admin approval required',
                },
                {
                  value: 'roster_only',
                  label: 'Roster Only - Pre-enrolled students',
                },
                { value: 'open', label: 'Open - Anyone can join' },
                { value: 'code', label: 'Code Required - Need group code' },
              ]}
            />
          </FormRow>

          <FormRow
            label="Group Code"
            description="Share this code for students to join">
            <div style={{ position: 'relative' }}>
              <Input
                value={settings.privacy.groupCode}
                readOnly
                style={{ paddingRight: '60px' }}
              />
              <CopyButton text={settings.privacy.groupCode} />
            </div>
          </FormRow>

          <FormRow label="Student Permissions">
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Toggle
                enabled={settings.privacy.allowStudentsViewRoster}
                onChange={(value) =>
                  updateSettings('privacy', 'allowStudentsViewRoster', value)
                }
                label="Allow students to view class roster"
              />
              <Toggle
                enabled={settings.privacy.allowStudentMessaging}
                onChange={(value) =>
                  updateSettings('privacy', 'allowStudentMessaging', value)
                }
                label="Allow student-to-student messaging"
              />
            </div>
          </FormRow>
        </SectionCard>

        {/* Attendance Section */}
        <SectionCard
          icon={FiMapPin}
          title="Attendance Settings">
          <FormRow label="Location Restrictions">
            <Toggle
              enabled={settings.attendance.geoRestriction}
              onChange={(value) =>
                updateSettings('attendance', 'geoRestriction', value)
              }
              label="Enable geo-location restrictions"
            />
          </FormRow>

          {settings.attendance.geoRestriction && (
            <>
              <FormRow
                label="Maximum Distance (meters)"
                description="Students must be within this range">
                <Input
                  type="number"
                  value={settings.attendance.maxDistanceMeters}
                  onChange={(e) =>
                    updateSettings(
                      'attendance',
                      'maxDistanceMeters',
                      parseInt(e.target.value)
                    )
                  }
                  min="10"
                  max="1000"
                />
              </FormRow>

              <FormRow
                label="Auto-close Time (minutes)"
                description="Attendance closes automatically after this time">
                <Input
                  type="number"
                  value={settings.attendance.autoCloseMinutes}
                  onChange={(e) =>
                    updateSettings(
                      'attendance',
                      'autoCloseMinutes',
                      parseInt(e.target.value)
                    )
                  }
                  min="5"
                  max="120"
                />
              </FormRow>
            </>
          )}
        </SectionCard>

        {/* Check-In Verification Section */}
        <SectionCard
          icon={FiUsers}
          title="Check-In Verification">
          <FormRow label="Primary Verification Method">
            <Select
              value={settings.checkInVerification.primary.type}
              onChange={(e) =>
                updateNestedSettings(
                  'checkInVerification',
                  'primary',
                  'type',
                  e.target.value
                )
              }
              options={[
                { value: 'geo_fence', label: 'Geo-fence - Location based' },
                { value: 'beacon', label: 'Bluetooth Beacon' },
                { value: 'wifi', label: 'WiFi Network Detection' },
              ]}
            />
          </FormRow>

          <FormRow label="Primary Verification Status">
            <Toggle
              enabled={settings.checkInVerification.primary.enabled}
              onChange={(value) =>
                updateNestedSettings(
                  'checkInVerification',
                  'primary',
                  'enabled',
                  value
                )
              }
              label="Enable primary verification"
            />
          </FormRow>

          {settings.checkInVerification.primary.enabled && (
            <>
              <FormRow label="Required Distance (meters)">
                <Input
                  type="number"
                  value={
                    settings.checkInVerification.primary.details
                      .maxDistanceMeters
                  }
                  onChange={(e) =>
                    updateNestedSettings(
                      'checkInVerification',
                      'primary',
                      'details',
                      {
                        ...settings.checkInVerification.primary.details,
                        maxDistanceMeters: parseInt(e.target.value),
                      }
                    )
                  }
                  min="10"
                  max="500"
                />
              </FormRow>

              <FormRow label="Location Accuracy">
                <Select
                  value={
                    settings.checkInVerification.primary.details
                      .requiredAccuracy
                  }
                  onChange={(e) =>
                    updateNestedSettings(
                      'checkInVerification',
                      'primary',
                      'details',
                      {
                        ...settings.checkInVerification.primary.details,
                        requiredAccuracy: e.target.value,
                      }
                    )
                  }
                  options={[
                    { value: 'high', label: 'High Accuracy (GPS + Network)' },
                    { value: 'medium', label: 'Medium Accuracy (Network)' },
                    { value: 'low', label: 'Low Accuracy (Coarse)' },
                  ]}
                />
              </FormRow>
            </>
          )}

          <FormRow label="Secondary Verification Method">
            <Select
              value={settings.checkInVerification.secondary.type}
              onChange={(e) =>
                updateNestedSettings(
                  'checkInVerification',
                  'secondary',
                  'type',
                  e.target.value
                )
              }
              options={[
                { value: 'qr_code', label: 'QR Code - Scan to verify' },
                { value: 'session_code', label: 'Session Code - Enter PIN' },
                { value: 'token', label: 'Access Token' },
                { value: 'face_id', label: 'Face ID / Biometric' },
              ]}
            />
          </FormRow>

          <FormRow label="Secondary Verification Status">
            <Toggle
              enabled={settings.checkInVerification.secondary.enabled}
              onChange={(value) =>
                updateNestedSettings(
                  'checkInVerification',
                  'secondary',
                  'enabled',
                  value
                )
              }
              label="Enable secondary verification"
            />
          </FormRow>

          {settings.checkInVerification.secondary.enabled && (
            <>
              {settings.checkInVerification.secondary.type === 'qr_code' && (
                <FormRow
                  label="QR Code Refresh (seconds)"
                  description="How often QR codes refresh for security">
                  <Input
                    type="number"
                    value={
                      settings.checkInVerification.secondary.options
                        .qrRefreshIntervalSec
                    }
                    onChange={(e) =>
                      updateNestedSettings(
                        'checkInVerification',
                        'secondary',
                        'options',
                        {
                          ...settings.checkInVerification.secondary.options,
                          qrRefreshIntervalSec: parseInt(e.target.value),
                        }
                      )
                    }
                    min="30"
                    max="300"
                  />
                </FormRow>
              )}

              <FormRow label="Session Code Length">
                <Input
                  type="number"
                  value={
                    settings.checkInVerification.secondary.options
                      .sessionCodeLength
                  }
                  onChange={(e) =>
                    updateNestedSettings(
                      'checkInVerification',
                      'secondary',
                      'options',
                      {
                        ...settings.checkInVerification.secondary.options,
                        sessionCodeLength: parseInt(e.target.value),
                      }
                    )
                  }
                  min="4"
                  max="8"
                />
              </FormRow>

              <FormRow label="Fallback Options">
                <Toggle
                  enabled={
                    settings.checkInVerification.secondary.options.allowFallback
                  }
                  onChange={(value) =>
                    updateNestedSettings(
                      'checkInVerification',
                      'secondary',
                      'options',
                      {
                        ...settings.checkInVerification.secondary.options,
                        allowFallback: value,
                      }
                    )
                  }
                  label="Allow fallback methods if primary fails"
                />
              </FormRow>
            </>
          )}
        </SectionCard>

        {/* Notifications Section */}
        <SectionCard
          icon={FiBell}
          title="Notifications">
          <FormRow label="Notification Preferences">
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Toggle
                enabled={settings.notifications.enableClassReminders}
                onChange={(value) =>
                  updateSettings('notifications', 'enableClassReminders', value)
                }
                label="Enable class reminders"
              />
              <Toggle
                enabled={settings.notifications.pushNotifications}
                onChange={(value) =>
                  updateSettings('notifications', 'pushNotifications', value)
                }
                label="Push notifications"
              />
              <Toggle
                enabled={settings.notifications.emailNotifications}
                onChange={(value) =>
                  updateSettings('notifications', 'emailNotifications', value)
                }
                label="Email notifications"
              />
            </div>
          </FormRow>
        </SectionCard>

        {/* Assignments Section */}
        <SectionCard
          icon={FiFileText}
          title="Assignments">
          <FormRow label="Submission Settings">
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Toggle
                enabled={settings.assignments.allowVirtualSubmissions}
                onChange={(value) =>
                  updateSettings(
                    'assignments',
                    'allowVirtualSubmissions',
                    value
                  )
                }
                label="Allow virtual submissions"
              />
              <Toggle
                enabled={settings.assignments.allowLateSubmissions}
                onChange={(value) =>
                  updateSettings('assignments', 'allowLateSubmissions', value)
                }
                label="Allow late submissions"
              />
              <Toggle
                enabled={settings.assignments.gradingEnabled}
                onChange={(value) =>
                  updateSettings('assignments', 'gradingEnabled', value)
                }
                label="Enable grading system"
              />
            </div>
          </FormRow>

          <FormRow
            label="Maximum File Size (MB)"
            description="Maximum size for uploaded assignment files">
            <Input
              type="number"
              value={settings.assignments.maxFileSizeMB}
              onChange={(e) =>
                updateSettings(
                  'assignments',
                  'maxFileSizeMB',
                  parseInt(e.target.value)
                )
              }
              min="1"
              max="100"
            />
          </FormRow>
        </SectionCard>

        {/* Roles Section */}
        <SectionCard
          icon={FiUser}
          title="Roles & Members">
          <FormRow label="Class Representative">
            <RoleCard
              person={settings.roles.classRep}
              role="Class Rep"
              isClassRep={true}
            />
          </FormRow>

          <FormRow label="Teaching Assistants">
            {settings.roles.assistants.map((assistant, index) => (
              <RoleCard
                key={assistant.id}
                person={assistant}
                role="Assistant"
              />
            ))}
          </FormRow>
        </SectionCard>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            marginTop: '32px',
            paddingBottom: '32px',
          }}>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 32px',
              borderRadius: '12px',
              border: 'none',
              background: hasChanges
                ? 'linear-gradient(to right, #7c3aed, #ec4899)'
                : 'var(--color-bg-glass-md)',
              color: hasChanges ? 'white' : 'var(--color-t-muted)',
              fontWeight: '500',
              fontSize: '0.875rem',
              cursor: hasChanges ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              transform: hasChanges ? 'scale(1)' : 'scale(0.95)',
            }}>
            <FiSave size={16} />
            Save Changes
          </button>

          <button
            onClick={handleReset}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '12px',
              border: '1px solid var(--color-border-primary)',
              background: 'var(--color-bg-glass)',
              color: 'var(--color-t-secondary)',
              fontWeight: '500',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--color-bg-glass-md)';
              e.target.style.borderColor = 'var(--color-primary-purple)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'var(--color-bg-glass)';
              e.target.style.borderColor = 'var(--color-border-primary)';
            }}>
            <FiRotateCcw size={16} />
            Reset to Default
          </button>
        </motion.div>
      </div>
    </div>
  );
}

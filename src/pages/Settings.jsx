import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineUserCircle,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import { FiLock } from 'react-icons/fi';
import { FaUsersCog, FaUserShield } from 'react-icons/fa';
import { AiOutlineCalendar } from 'react-icons/ai';
import { IoNotificationsOutline } from 'react-icons/io5';
import { MdOutlineAssignment } from 'react-icons/md';

// Animation variants - reference your animations.js file
import * as anim from '../utils/animationVariants';

const NAV_ITEMS = [
  { key: 'general', label: 'General', Icon: HiOutlineUserCircle },
  { key: 'privacy', label: 'Privacy & Security', Icon: FiLock },
  { key: 'group', label: 'Group Settings', Icon: FaUsersCog },
  { key: 'attendance', label: 'Attendance', Icon: AiOutlineCalendar },
  {
    key: 'notifications',
    label: 'Notifications',
    Icon: IoNotificationsOutline,
  },
  {
    key: 'assignments',
    label: 'Assignments & Media',
    Icon: MdOutlineAssignment,
  },
  { key: 'roles', label: 'Roles & Collaboration', Icon: FaUserShield },
  { key: 'danger', label: 'Danger Zone', Icon: HiOutlineExclamationCircle },
];

export default function Settings2({
  initialRole = 'lecturer',
  user: initialUser = {},
}) {
  const [role, setRole] = useState(initialRole); // 'lecturer' | 'student'
  const [active, setActive] = useState('general');
  const [saving, setSaving] = useState(false);

  // Mock state for forms. Replace with form library (RHF) or Redux as needed.
  const [profile, setProfile] = useState({
    firstName: initialUser.firstName || 'John',
    lastName: initialUser.lastName || 'Smooth',
    email: initialUser.email || 'lecturer@example.com',
    faculty: initialUser.faculty || 'Basic Medical Sciences',
    department: initialUser.department || 'Biochemistry',
    theme: 'dark',
  });

  const [security, setSecurity] = useState({ twoFA: false });
  const [groupSettings, setGroupSettings] = useState({
    joinRule: 'request', // open | request | invite
    coReps: [],
  });
  const [attendance, setAttendance] = useState({
    defaultDuration: 30,
    gpsStrict: true,
    pleaWindowDays: 3,
    autoClose: true,
  });
  const [notifications, setNotifications] = useState({
    email: true,
    inApp: true,
    dailySummary: false,
  });
  const [assignments, setAssignments] = useState({
    submissionsEnabled: true,
    approvalRequired: false,
    quotaMb: 512,
  });
  const [rolesState, setRolesState] = useState({ requestEnabled: true });

  const nav = useMemo(() => NAV_ITEMS, []);

  const onSave = async (section) => {
    setSaving(true);
    try {
      // Replace with real API call
      await new Promise((r) => setTimeout(r, 600));
      // show toast / notification
      console.log(`Saved ${section}`);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="min-h-screen p-6"
      data-theme={profile.theme}>
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <motion.aside
          initial="hidden"
          animate="visible"
          variants={anim.drawerLeft}
          className="col-span-3 p-4">
          <nav className="space-y-3 sticky top-6">
            <div className="card p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <HiOutlineUserCircle size={26} />
                </div>
                <div>
                  <div className="font-semibold">
                    {profile.firstName} {profile.lastName}
                  </div>
                  <div className="text-sm text-neutral-light">
                    {role === 'lecturer' ? 'Lecturer' : 'Student'}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <label className="text-sm v-hidden">Switch role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="rounded-lg px-3 py-2 bg-white/5">
                  <option value="lecturer">Lecturer</option>
                  <option value="student">Student</option>
                </select>
              </div>
            </div>

            <div className="card p-2">
              {nav.map((n, idx) => (
                <motion.button
                  key={n.key}
                  onClick={() => setActive(n.key)}
                  variants={anim.navItemVariants}
                  initial="collapsed"
                  animate="expanded"
                  whileHover={{ scale: 1.02 }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-white/5 transition-colors ${
                    active === n.key
                      ? 'border-2 border-accent/40 scale-101'
                      : ''
                  }`}>
                  <n.Icon size={18} />
                  <div className="flex-1">
                    <div className="font-medium">{n.label}</div>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="card p-4 text-sm">
              <div className="font-semibold">Quick Actions</div>
              <div className="mt-3 space-y-2">
                <button className="btn-ghost w-full">Invite member</button>
                <button className="btn-secondary w-full">Export data</button>
                <button className="btn-danger w-full">Report issue</button>
              </div>
            </div>
          </nav>
        </motion.aside>

        {/* Content area */}
        <main className="col-span-9">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={anim.staggerContainer}
            className="space-y-6">
            <header className="flex items-center justify-between">
              <div>
                <h1 className="text-heading-lg">Settings</h1>
                <p className="text-body-sm text-neutral-light">
                  Manage account, groups, and session rules.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-light">Theme</span>
                <select
                  value={profile.theme}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, theme: e.target.value }))
                  }
                  className="px-3 py-2 rounded-lg bg-white/5">
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
            </header>

            {/* Sections rendered based on `active` */}
            <section>
              {active === 'general' && (
                <motion.div
                  variants={anim.cardVariants}
                  custom={0}
                  initial="hidden"
                  animate="visible">
                  <GeneralSettings
                    profile={profile}
                    setProfile={setProfile}
                    onSave={() => onSave('general')}
                    saving={saving}
                  />
                </motion.div>
              )}

              {active === 'privacy' && (
                <motion.div
                  variants={anim.cardVariants}
                  custom={1}
                  initial="hidden"
                  animate="visible">
                  <PrivacySettings
                    security={security}
                    setSecurity={setSecurity}
                    onSave={() => onSave('privacy')}
                    saving={saving}
                  />
                </motion.div>
              )}

              {active === 'group' && (
                <motion.div
                  variants={anim.cardVariants}
                  custom={2}
                  initial="hidden"
                  animate="visible">
                  <GroupSettings
                    role={role}
                    state={groupSettings}
                    setState={setGroupSettings}
                    onSave={() => onSave('group')}
                    saving={saving}
                  />
                </motion.div>
              )}

              {active === 'attendance' && (
                <motion.div
                  variants={anim.cardVariants}
                  custom={3}
                  initial="hidden"
                  animate="visible">
                  <AttendanceSettings
                    role={role}
                    state={attendance}
                    setState={setAttendance}
                    onSave={() => onSave('attendance')}
                    saving={saving}
                  />
                </motion.div>
              )}

              {active === 'notifications' && (
                <motion.div
                  variants={anim.cardVariants}
                  custom={4}
                  initial="hidden"
                  animate="visible">
                  <NotificationsSettings
                    state={notifications}
                    setState={setNotifications}
                    onSave={() => onSave('notifications')}
                    saving={saving}
                  />
                </motion.div>
              )}

              {active === 'assignments' && (
                <motion.div
                  variants={anim.cardVariants}
                  custom={5}
                  initial="hidden"
                  animate="visible">
                  <AssignmentsSettings
                    role={role}
                    state={assignments}
                    setState={setAssignments}
                    onSave={() => onSave('assignments')}
                    saving={saving}
                  />
                </motion.div>
              )}

              {active === 'roles' && (
                <motion.div
                  variants={anim.cardVariants}
                  custom={6}
                  initial="hidden"
                  animate="visible">
                  <RolesSettings
                    role={role}
                    state={rolesState}
                    setState={setRolesState}
                    onSave={() => onSave('roles')}
                    saving={saving}
                  />
                </motion.div>
              )}

              {active === 'danger' && (
                <motion.div
                  variants={anim.cardVariants}
                  custom={7}
                  initial="hidden"
                  animate="visible">
                  <DangerZone role={role} />
                </motion.div>
              )}
            </section>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

/* ----------------------------- Subcomponents ---------------------------- */

function SectionCard({ title, description, children, onSave, saving }) {
  return (
    <div className="card-hover">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-heading-md">{title}</h2>
          {description && (
            <p className="text-body-sm text-neutral-light mt-1">
              {description}
            </p>
          )}
        </div>
        <div className="ml-auto">
          {onSave && (
            <button
              className="btn-primary px-4 py-2 rounded-xl"
              onClick={onSave}
              disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function GeneralSettings({ profile, setProfile, onSave, saving }) {
  return (
    <SectionCard
      title="General"
      description="Your profile and display preferences"
      onSave={onSave}
      saving={saving}>
      <motion.div
        variants={anim.expandVariants}
        initial="collapsed"
        animate="expanded">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-body-sm mb-1">First name</label>
            <input
              value={profile.firstName}
              onChange={(e) =>
                setProfile((p) => ({ ...p, firstName: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-body-sm mb-1">Last name</label>
            <input
              value={profile.lastName}
              onChange={(e) =>
                setProfile((p) => ({ ...p, lastName: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-body-sm mb-1">Email</label>
            <input
              value={profile.email}
              onChange={(e) =>
                setProfile((p) => ({ ...p, email: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-body-sm mb-1">Faculty</label>
            <input
              value={profile.faculty}
              onChange={(e) =>
                setProfile((p) => ({ ...p, faculty: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-body-sm mb-1">Department</label>
            <input
              value={profile.department}
              onChange={(e) =>
                setProfile((p) => ({ ...p, department: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-body-sm mb-1">Profile picture</label>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
                PIC
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                />
                <div className="text-sm text-neutral-light">
                  PNG, JPG up to 2MB
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionCard>
  );
}

function PrivacySettings({ security, setSecurity, onSave, saving }) {
  return (
    <SectionCard
      title="Privacy & Security"
      description="Control access to your account"
      onSave={onSave}
      saving={saving}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-body-sm mb-1">Change password</label>
          <div className="flex gap-2">
            <input
              placeholder="Current password"
              type="password"
              className="flex-1"
            />
            <input
              placeholder="New password"
              type="password"
              className="flex-1"
            />
          </div>
        </div>

        <div>
          <label className="block text-body-sm mb-1">
            Two-factor authentication
          </label>
          <div className="flex items-center gap-3">
            <label className="switch">
              <input
                type="checkbox"
                checked={security.twoFA}
                onChange={(e) =>
                  setSecurity((s) => ({ ...s, twoFA: e.target.checked }))
                }
              />
              <span className="slider" />
            </label>
            <div className="text-body-sm text-neutral-light">
              Enable email/OTP based 2FA
            </div>
          </div>
        </div>

        <div>
          <label className="block text-body-sm mb-1">Active sessions</label>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
              <div>
                <div className="font-medium">Chrome — Windows</div>
                <div className="text-sm text-neutral-light">
                  IP 103.x.x.x • Last active 2 days ago
                </div>
              </div>
              <button className="btn-ghost">Log out</button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-body-sm mb-1">Profile visibility</label>
          <select className="px-3 py-2 rounded-lg bg-white/5">
            <option>Visible to group members</option>
            <option>Visible to co-reps only</option>
            <option>Private</option>
          </select>
        </div>
      </div>
    </SectionCard>
  );
}

function GroupSettings({ role, state, setState, onSave, saving }) {
  if (role === 'student') {
    return (
      <SectionCard
        title="Group Settings"
        description="Groups you belong to"
        onSave={onSave}
        saving={saving}>
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
            <div>
              <div className="font-medium">
                Class of Biochemistry — 400 Level
              </div>
              <div className="text-sm text-neutral-light">
                Lecturer: Dr. Smooth
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn-ghost">View</button>
              <button className="btn-danger-light">Leave</button>
            </div>
          </div>
        </div>
      </SectionCard>
    );
  }

  // Lecturer view
  return (
    <SectionCard
      title="Group Settings"
      description="Manage your course-based groups"
      onSave={onSave}
      saving={saving}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-body-sm mb-1">Group name</label>
          <input defaultValue="Class of Biochemistry — 400 Level" />
        </div>

        <div>
          <label className="block text-body-sm mb-1">Join rule</label>
          <select
            value={state.joinRule}
            onChange={(e) =>
              setState((s) => ({ ...s, joinRule: e.target.value }))
            }>
            <option value="open">Open</option>
            <option value="request">Request approval</option>
            <option value="invite">Invite only</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-body-sm mb-1">Group description</label>
          <textarea
            placeholder="Short description about this course group"
            className="w-full h-28"
          />
        </div>

        <div className="col-span-2 flex items-center gap-2">
          <button className="btn-primary">Save group</button>
          <button className="btn-secondary">Export members (CSV)</button>
        </div>
      </div>
    </SectionCard>
  );
}

function AttendanceSettings({ role, state, setState, onSave, saving }) {
  return (
    <SectionCard
      title="Attendance Settings"
      description="Configure default session behavior"
      onSave={onSave}
      saving={saving}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-body-sm mb-1">
            Default session duration (minutes)
          </label>
          <input
            type="number"
            value={state.defaultDuration}
            onChange={(e) =>
              setState((s) => ({
                ...s,
                defaultDuration: Number(e.target.value),
              }))
            }
          />
        </div>

        <div>
          <label className="block text-body-sm mb-1">GPS strict</label>
          <div className="flex items-center gap-3">
            <label className="switch">
              <input
                type="checkbox"
                checked={state.gpsStrict}
                onChange={(e) =>
                  setState((s) => ({ ...s, gpsStrict: e.target.checked }))
                }
              />
              <span className="slider" />
            </label>
            <div className="text-body-sm text-neutral-light">
              Require student to be within geo proximity
            </div>
          </div>
        </div>

        <div>
          <label className="block text-body-sm mb-1">Plea window (days)</label>
          <select
            value={state.pleaWindowDays}
            onChange={(e) =>
              setState((s) => ({
                ...s,
                pleaWindowDays: Number(e.target.value),
              }))
            }>
            <option value={0}>No plea allowed</option>
            <option value={1}>1 day</option>
            <option value={3}>3 days</option>
            <option value={7}>7 days</option>
          </select>
        </div>

        <div>
          <label className="block text-body-sm mb-1">Auto-close sessions</label>
          <div className="flex items-center gap-3">
            <label className="switch">
              <input
                type="checkbox"
                checked={state.autoClose}
                onChange={(e) =>
                  setState((s) => ({ ...s, autoClose: e.target.checked }))
                }
              />
              <span className="slider" />
            </label>
            <div className="text-body-sm text-neutral-light">
              Enable cron-based auto-close
            </div>
          </div>
        </div>

        <div className="col-span-2 flex items-center gap-2">
          <button className="btn-primary">Export recaps (PDF)</button>
          <button className="btn-ghost">Preview policy</button>
        </div>
      </div>
    </SectionCard>
  );
}

function NotificationsSettings({ state, setState, onSave, saving }) {
  return (
    <SectionCard
      title="Notifications"
      description="Manage how you receive alerts"
      onSave={onSave}
      saving={saving}>
      <div className="grid grid-cols-2 gap-4">
        <ToggleRow
          label="Email alerts"
          checked={state.email}
          onChange={(v) => setState((s) => ({ ...s, email: v }))}
        />
        <ToggleRow
          label="In-app notifications"
          checked={state.inApp}
          onChange={(v) => setState((s) => ({ ...s, inApp: v }))}
        />
        <ToggleRow
          label="Daily summary"
          checked={state.dailySummary}
          onChange={(v) => setState((s) => ({ ...s, dailySummary: v }))}
        />

        <div className="col-span-2">
          <label className="block text-body-sm mb-1">Muted topics</label>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
              <div className="text-body-sm">Assignments</div>
              <ToggleRow
                inline
                checked={false}
                onChange={() => {}}
              />
            </div>

            <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
              <div className="text-body-sm">Group announcements</div>
              <ToggleRow
                inline
                checked={true}
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function AssignmentsSettings({ role, state, setState, onSave, saving }) {
  return (
    <SectionCard
      title="Assignments & Media"
      description="Control submission and media rules"
      onSave={onSave}
      saving={saving}>
      <div className="grid grid-cols-2 gap-4">
        <ToggleRow
          label="Allow submissions"
          checked={state.submissionsEnabled}
          onChange={(v) => setState((s) => ({ ...s, submissionsEnabled: v }))}
        />
        <ToggleRow
          label="Require approval for uploads"
          checked={state.approvalRequired}
          onChange={(v) => setState((s) => ({ ...s, approvalRequired: v }))}
        />

        <div>
          <label className="block text-body-sm mb-1">Storage quota (MB)</label>
          <input
            type="number"
            value={state.quotaMb}
            onChange={(e) =>
              setState((s) => ({ ...s, quotaMb: Number(e.target.value) }))
            }
          />
        </div>

        <div className="col-span-2">
          <div className="w-full bg-white/5 rounded-xl p-3">
            <div className="text-sm text-neutral-light">
              Used 120MB of {state.quotaMb}MB
            </div>
            <div className="h-3 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                style={{ width: `${(120 / state.quotaMb) * 100}%` }}
                className="h-full bg-accent rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function RolesSettings({ role, state, setState, onSave, saving }) {
  return (
    <SectionCard
      title="Roles & Collaboration"
      description="Manage team and delegate responsibilities"
      onSave={onSave}
      saving={saving}>
      {role === 'lecturer' ? (
        <div className="space-y-3">
          <div>
            <label className="block text-body-sm mb-1">Assign co-rep</label>
            <input placeholder="Search user or email" />
          </div>

          <div>
            <label className="block text-body-sm mb-1">Delegation</label>
            <div className="flex gap-2">
              <button className="btn-ghost">Attendance helper</button>
              <button className="btn-ghost">Assignment reviewer</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-body-sm text-neutral-light">
            You are a student in this group. To request an elevated role,
            contact a lecturer or use the request feature if enabled.
          </div>
          <div>
            <button className="btn-primary">Request role (if allowed)</button>
          </div>
        </div>
      )}
    </SectionCard>
  );
}

function DangerZone({ role }) {
  const [confirming, setConfirming] = useState(false);

  return (
    <SectionCard
      title="Danger Zone"
      description="Irreversible or sensitive actions live here">
      <div className="space-y-4">
        {role === 'lecturer' && (
          <div className="p-4 rounded-xl bg-white/5 flex items-center justify-between">
            <div>
              <div className="font-medium">Delete Group</div>
              <div className="text-sm text-neutral-light">
                This will permanently delete the group and all data.
              </div>
            </div>
            <div>
              <motion.button
                whileHover={anim.shake.visible}
                className="btn-danger"
                onClick={() => setConfirming(true)}>
                Delete group
              </motion.button>
            </div>
          </div>
        )}

        <div className="p-4 rounded-xl bg-white/5 flex items-center justify-between">
          <div>
            <div className="font-medium">Deactivate account</div>
            <div className="text-sm text-neutral-light">
              Temporarily disable access to your account.
            </div>
          </div>
          <div>
            <button className="btn-danger-light">Deactivate</button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5 flex items-center justify-between">
          <div>
            <div className="font-medium">Delete account</div>
            <div className="text-sm text-neutral-light">
              This will permanently remove your account. You will lose access.
            </div>
          </div>
          <div>
            <button className="btn-danger">Delete account</button>
          </div>
        </div>

        {confirming && (
          <motion.div
            variants={anim.drawerBottom}
            initial="hidden"
            animate="visible"
            className="fixed inset-0 z-50 flex items-end">
            <div className="w-full card p-6">
              <h3 className="text-heading-md">Confirm delete</h3>
              <p className="text-body-sm text-neutral-light mt-2">
                Type the group name to confirm deletion.
              </p>
              <div className="mt-4 flex gap-2">
                <input
                  placeholder="Group name"
                  className="flex-1"
                />
                <button className="btn-danger">Confirm</button>
                <button
                  className="btn-ghost"
                  onClick={() => setConfirming(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </SectionCard>
  );
}

function ToggleRow({ label, checked, onChange, inline = false }) {
  return (
    <div className={`${inline ? 'flex items-center gap-2' : ''}`}>
      {!inline && <label className="block text-body-sm mb-1">{label}</label>}
      <div className="flex items-center gap-3">
        {!inline && (
          <div className="text-body-sm text-neutral-light">{label}</div>
        )}
        <label className="switch">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span className="slider" />
        </label>
      </div>
    </div>
  );
}

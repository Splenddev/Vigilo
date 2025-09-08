// utils/studentGenerator.js
const firstNames = [
  'Jane',
  'John',
  'Mary',
  'David',
  'Emily',
  'Michael',
  'Sarah',
  'Alex',
  'Daniel',
  'Sophia',
  'Grace',
  'Ethan',
  'Olivia',
  'James',
  'Ava',
  'Liam',
  'Isabella',
  'Noah',
];

const lastNames = [
  'Doe',
  'Smith',
  'Johnson',
  'Brown',
  'Davis',
  'Wilson',
  'Connor',
  'Rodriguez',
  'Taylor',
  'Anderson',
  'Thomas',
  'Jackson',
  'White',
  'Harris',
  'Martin',
  'Thompson',
  'Garcia',
  'Clark',
];

const departments = [
  'Biochemistry',
  'Mechanical Engineering',
  'Computer Science',
  'Economics',
  'Physics',
  'Medicine',
  'Law',
  'Architecture',
];

const levels = ['100', '200', '300', '400'];
const genders = ['male', 'female'];
const statuses = ['present', 'late', 'absent'];

// Helpers
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomPhone = () =>
  `+234${Math.floor(8000000000 + Math.random() * 99999999)}`;

const classStart = { hour: 10, minute: 0 };

const randomCheckInTime = () => {
  const hour = 9 + Math.floor(Math.random() * 2); // 9 or 10
  const minute = Math.floor(Math.random() * 60);
  return { hour, minute };
};

const formatTime = (hour, minute) => {
  const h12 = hour > 12 ? hour - 12 : hour;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  return `${h12}:${minute.toString().padStart(2, '0')} ${ampm}`;
};

const generateRemark = (status, checkIn) => {
  if (status === 'absent') {
    return Math.random() > 0.5
      ? 'Absent in this class'
      : 'Absent in previous class too';
  }

  if (status === 'present' && checkIn) {
    const diff =
      checkIn.hour * 60 +
      checkIn.minute -
      (classStart.hour * 60 + classStart.minute);
    if (diff < 0) return `Early by ${Math.abs(diff)} mins`;
    if (diff === 0) return 'On time';
    return `Checked in at ${formatTime(checkIn.hour, checkIn.minute)}`;
  }

  if (status === 'late' && checkIn) {
    const diff =
      checkIn.hour * 60 +
      checkIn.minute -
      (classStart.hour * 60 + classStart.minute);
    return `Late by ${diff} mins`;
  }

  return 'No remark';
};

export const generateMockStudentsRecord = (count = 10, prefix = 'BIO/19') => {
  const students = [];

  for (let i = 1; i <= count; i++) {
    const first = randomItem(firstNames);
    const last = randomItem(lastNames);
    const status = randomItem(statuses);
    const gender = randomItem(genders);
    const department = randomItem(departments);
    const level = randomItem(levels);

    let checkIn = null;
    if (status !== 'absent') checkIn = randomCheckInTime();

    const checkInTime = checkIn
      ? formatTime(checkIn.hour, checkIn.minute)
      : null;

    students.push({
      id: i,
      name: `${first} ${last}`,
      matricNumber: `${prefix}/${i.toString().padStart(3, '0')}`,
      level,
      department,
      gender,
      phone: randomPhone(),
      status,
      checkInTime,
      remarks: generateRemark(status, checkIn),
      email: `${first.toLowerCase()}.${last.toLowerCase()}@university.edu`,
      lastSeen: checkIn ? new Date().toISOString() : null,
      attendanceCount: Math.floor(Math.random() * 40), // simulate past record
    });
  }

  return students;
};

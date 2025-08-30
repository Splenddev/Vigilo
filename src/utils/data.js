const groups = [
  {
    groupName: 'Class of Biochemistry – 300 Level',
    groupId: 'c1',
    courseId: 'BCH301',
    targets: '300 Level Biochemistry',
    academicYear: { start: '2024-09-01', end: '2025-07-15' },
    createdBy: 'rep123',
    department: 'Biochemistry',
    faculty: 'Sciences',
    description: 'Core academic group for 300 level Biochemistry students.',
    sessions: [
      {
        id: 's1',
        date: '2025-02-15',
        topic: 'Introduction to Metabolism',
        duration: '2h',
        status: 'completed',
        attendance: { present: 42, absent: 8 },
      },
      {
        id: 's2',
        date: '2025-02-22',
        topic: 'Carbohydrate Metabolism',
        duration: '2h',
        status: 'completed',
        attendance: { present: 39, absent: 11 },
      },
    ],
    students: [
      {
        id: 'stu1',
        name: 'Alice Johnson',
        matricNo: 'BCH/300/001',
        email: 'alice.johnson@univ.edu',
        level: '300',
        attendanceRecord: [
          { sessionId: 's1', status: 'present' },
          { sessionId: 's2', status: 'present' },
        ],
      },
      {
        id: 'stu2',
        name: 'David Smith',
        matricNo: 'BCH/300/002',
        email: 'david.smith@univ.edu',
        level: '300',
        attendanceRecord: [
          { sessionId: 's1', status: 'absent' },
          { sessionId: 's2', status: 'present' },
        ],
      },
    ],
  },
  {
    groupName: 'Mechanical Engineering – Final Year',
    groupId: 'MEE-24__25-500l',
    courseId: 'MEE501',
    targets: 'Final Year Mechanical Engineering',
    academicYear: { start: '2024-09-01', end: '2025-07-15' },
    createdBy: 'rep456',
    department: 'Mechanical Engineering',
    faculty: 'Engineering',
    description: 'Final year group for Mechanical Engineering students.',
    sessions: [
      {
        id: 's1',
        date: '2025-02-18',
        topic: 'Advanced Thermodynamics',
        duration: '3h',
        status: 'completed',
        attendance: { present: 55, absent: 5 },
      },
      {
        id: 's2',
        date: '2025-02-25',
        topic: 'Fluid Mechanics Review',
        duration: '2h',
        status: 'completed',
        attendance: { present: 53, absent: 7 },
      },
    ],
    students: [
      {
        id: 'stu3',
        name: 'Michael Lee',
        matricNo: 'MEE/500/010',
        email: 'michael.lee@univ.edu',
        level: '500',
        attendanceRecord: [
          { sessionId: 's1', status: 'present' },
          { sessionId: 's2', status: 'present' },
        ],
      },
      {
        id: 'stu4',
        name: 'Sarah Connor',
        matricNo: 'MEE/500/011',
        email: 'sarah.connor@univ.edu',
        level: '500',
        attendanceRecord: [
          { sessionId: 's1', status: 'present' },
          { sessionId: 's2', status: 'absent' },
        ],
      },
    ],
  },
  {
    groupName: 'Computer Science – 200 Level',
    groupId: 'csc-24__25-200l',

    courseId: 'CSC201',
    targets: '200 Level Computer Science',
    academicYear: { start: '2024-09-01', end: '2025-07-15' },
    createdBy: 'rep789',
    department: 'Computer Science',
    faculty: 'Sciences',
    description: '200 level group for Computer Science undergraduates.',
    sessions: [
      {
        id: 's1',
        date: '2025-02-20',
        topic: 'Data Structures and Algorithms',
        duration: '2h',
        status: 'completed',
        attendance: { present: 70, absent: 10 },
      },
      {
        id: 's2',
        date: '2025-02-27',
        topic: 'Database Systems',
        duration: '2h',
        status: 'scheduled',
        attendance: { present: 0, absent: 0 },
      },
    ],
    students: [
      {
        id: 'stu5',
        name: 'James Brown',
        matricNo: 'CSC/200/023',
        email: 'james.brown@univ.edu',
        level: '200',
        attendanceRecord: [
          { sessionId: 's1', status: 'present' },
          { sessionId: 's2', status: 'pending' },
        ],
      },
      {
        id: 'stu6',
        name: 'Emily Davis',
        matricNo: 'CSC/200/024',
        email: 'emily.davis@univ.edu',
        level: '200',
        attendanceRecord: [
          { sessionId: 's1', status: 'absent' },
          { sessionId: 's2', status: 'pending' },
        ],
      },
    ],
  },
];

const generateStudentData = (length = 120) => {
  const nigerianNames = [
    'Adebayo Ogundimu',
    'Chioma Okafor',
    'Emeka Nwachukwu',
    'Fatima Ibrahim',
    'Kemi Adebayo',
    'Yusuf Mohammed',
    'Ngozi Okwu',
    'Biodun Adeyemi',
    'Hauwa Aliyu',
    'Chinedu Obi',
    'Amina Hassan',
    'Tunde Bakare',
    'Blessing Uzoma',
    'Ibrahim Garba',
    'Funmi Adeyinka',
    'Segun Ogundipe',
    'Mariam Abubakar',
    'Okechukwu Eze',
    'Zainab Yusuf',
    'Babatunde Olatunji',
    'Aisha Bello',
    'Chinonso Ikechukwu',
    'Rasheed Olaleye',
    'Nneka Okoye',
    'Salihu Abdullahi',
    'Olumide Johnson',
    'Hadiza Usman',
    'Chukwuma Okafor',
    'Folake Adebisi',
    'Musa Danjuma',
  ];

  const internationalNames = [
    'James Anderson',
    'Sarah Chen',
    'Michael Rodriguez',
    'Emily Johnson',
    'David Kim',
    'Lisa Thompson',
    'Robert Brown',
    'Maria Garcia',
    'John Wilson',
    'Anna Kowalski',
    'Ahmed Al-Rashid',
    'Priya Sharma',
    'Pierre Dubois',
    'Yuki Tanaka',
    'Carlos Silva',
  ];

  const departments = [
    'Computer Science',
    'Mechanical Engineering',
    'Biochemistry',
    'Civil Engineering',
    'Electrical Engineering',
    'Medicine',
    'Law',
    'Business Administration',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Microbiology',
    'Economics',
    'Political Science',
  ];

  const groups = ['A', 'B', 'C', 'D', 'E'];
  const levels = [100, 200, 300, 400, 500];
  const statuses = ['active', 'inactive'];

  const allNames = [...nigerianNames, ...internationalNames];
  const students = [];

  for (let i = 1; i <= length; i++) {
    const name = allNames[Math.floor(Math.random() * allNames.length)];
    const department =
      departments[Math.floor(Math.random() * departments.length)];
    const level = levels[Math.floor(Math.random() * levels.length)];
    const group = groups[Math.floor(Math.random() * groups.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const attendance = Math.floor(Math.random() * 101); // 0-100

    // Generate email from name
    const emailName = name.toLowerCase().replace(/\s+/g, '.');
    const email = `${emailName}@university.edu`;

    students.push({
      id: i,
      name,
      email,
      department,
      level,
      group: `${department.charAt(0)}${group}`,
      attendance,
      status,
      avatar: `https://i.pravatar.cc/40?img=${i}`,
    });
  }

  return students;
};

// utils/mockSessions.js
const courses = [
  { id: 'c1', name: 'Computer Science 101' },
  { id: 'c2', name: 'Data Structures' },
  { id: 'c3', name: 'Database Management' },
  { id: 'c4', name: 'Software Engineering' },
  { id: 'c5', name: 'Artificial Intelligence' },
  { id: 'c6', name: 'Machine Learning' },
];

const instructors = [
  {
    id: 'i1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
  },
  {
    id: 'i2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@university.edu',
  },
  {
    id: 'i3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@university.edu',
  },
  { id: 'i4', name: 'Dr. James Wilson', email: 'james.wilson@university.edu' },
  { id: 'i5', name: 'Dr. Lisa Park', email: 'lisa.park@university.edu' },
  { id: 'i6', name: 'Prof. David Kim', email: 'david.kim@university.edu' },
];

const sessionTypes = ['lecture', 'lab', 'seminar', 'workshop'];
const statuses = ['scheduled', 'ongoing', 'completed'];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// auto create a single session
function createSession(id) {
  const course = Math.random() > 0.2 ? randomItem(courses) : null; // 20% chance of guest lecture
  const instructor = randomItem(instructors);
  const date = new Date();
  date.setDate(date.getDate() + randomInt(-5, 5)); // within past or next 5 days
  const duration = randomInt(60, 120);
  const present = randomInt(20, 50);
  const total = present + randomInt(0, 10);

  return {
    id,
    course,
    instructor,
    date: date.toISOString().split('T')[0],
    time: `${randomInt(8, 16)}:${randomItem(['00', '15', '30', '45'])} ${
      randomInt(0, 1) ? 'AM' : 'PM'
    }`,
    duration,
    location: {
      room: `Room ${randomInt(100, 400)}`,
      building: randomItem([
        'Computer Science Building',
        'Engineering Hall',
        'Biology Building',
        'Main Hall',
      ]),
    },
    sessionType: randomItem(sessionTypes),
    attendance: { present, total },
    status: randomItem(statuses),
  };
}

// auto create many sessions
function createMockSessions(count = 10) {
  return Array.from({ length: count }, (_, i) => createSession(i + 1));
}

export { groups, generateStudentData, createMockSessions, createSession };

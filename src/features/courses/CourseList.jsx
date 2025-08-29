import React from 'react';

const CourseList = () => {
  const courses = [
    {
      id: 'c1',
      name: 'Computer Science 101',
      level: 100,
      department: 'Computer Science',
    },
    {
      id: 'c2',
      name: 'Introduction to Psychology',
      level: 200,
      department: 'Psychology',
    },
    { id: 'c3', name: 'Calculus I', level: 100, department: 'Mathematics' },
    { id: 'c4', name: 'World History', level: 300, department: 'History' },
    {
      id: 'c5',
      name: 'Organic Chemistry',
      level: 400,
      department: 'Chemistry',
    },
    { id: 'c6', name: 'Microeconomics', level: 200, department: 'Economics' },
    { id: 'c7', name: 'English Literature', level: 300, department: 'English' },
    { id: 'c8', name: 'Physics I', level: 100, department: 'Physics' },
    { id: 'c9', name: 'Sociology Basics', level: 200, department: 'Sociology' },
    { id: 'c10', name: 'Art History', level: 300, department: 'Art' },
  ];
  return (
    <div>
      <h1>Course List</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.name} - Level {course.level} - Department:{' '}
            {course.department}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;

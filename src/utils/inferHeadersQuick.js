// utils/inferHeadersQuick.js
const FIELD_MAP = {
  matric: 'matricNumber',
  matricnumber: 'matricNumber',
  regno: 'matricNumber',
  registration: 'matricNumber',

  email: 'email',
  mail: 'email',

  firstname: 'firstName',
  givenname: 'firstName',
  fname: 'firstName',

  lastname: 'lastName',
  surname: 'lastName',
  lname: 'lastName',
};

export function inferHeadersQuick(sampleRow) {
  if (!sampleRow) return {};

  const inferred = {};
  Object.keys(sampleRow).forEach((header) => {
    const key = header.toLowerCase().replace(/\s+/g, '');
    if (FIELD_MAP[key]) {
      inferred[header] = FIELD_MAP[key];
    }
  });

  return inferred;
}

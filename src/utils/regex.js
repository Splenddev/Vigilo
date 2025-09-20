const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const matricNoRegex = /^\d{2}\/[A-Z0-9]+\/\d+$/;
const academicSessionRegex = /^\d{4}\/\d{4}$/;
export { emailRegex, passwordRegex, matricNoRegex, academicSessionRegex };

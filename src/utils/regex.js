const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const matricNoRegex = /^\d{2}\/[A-Z0-9]+\/\d+$/;
export { emailRegex, passwordRegex, matricNoRegex };

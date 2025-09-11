import { useAuthStore } from '../stores/authStore';

export const useAuth = () => {
  const store = useAuthStore();

  // ---- Actions ----
  const register = async (credentials) => {
    const res = await store.register(credentials);
    return res;
  };

  const createAdmin = async (credentials) => {
    const res = await store.admin(credentials);
    return res;
  };

  const login = async (credentials) => {
    return store.login(credentials);
  };

  const logout = () => store.logout();

  const fetchProfile = () => store.fetchProfile();

  // ---- OTP ----
  const requestOtp = async (email, purpose = 'email_verification') => {
    return store.requestOtp(email, purpose);
  };

  const verifyOtp = async (email, otp, purpose = 'email_verification') => {
    const res = await store.verifyOtp(email, otp, purpose);
    // await fetchProfile();
    return res;
  };

  return {
    // ---- State ----
    user: store.user,
    loading: store.loading,
    error: store.error,

    // ---- Actions ----
    createAdmin,
    register,
    login,
    logout,
    fetchProfile,
    requestOtp,
    verifyOtp,
  };
};

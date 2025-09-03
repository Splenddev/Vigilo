import { FiLock } from 'react-icons/fi';
import {
  fadeIn,
  fadeInUpChild,
  slideUp,
} from '../../../utils/animationVariants';
import { motion } from 'framer-motion';
import Button from '../../../components/atoms/Button';
import PasswordInput from '../../../components/molecules/PasswordInput';
import { useEffect, useState } from 'react';
import { checkPasswordStrength } from '../../../utils/helpers';

const PrivacySecurity = ({ user }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(formData.newPassword));
  }, [formData.newPassword]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    // console.log('Form values changed: ', updatedValues);
    // setFormData(updatedValues);
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="space-y-6">
      <motion.div
        variants={fadeInUpChild}
        className="card-hover">
        <h3 className="text-xl font-bold text-t-primary mb-6">
          Change Password
        </h3>
        <motion.div
          variants={slideUp}
          className="space-y-4">
          <PasswordInput
            label="Current Password"
            value={formData.currentPassword}
            onChange={onChange}
            name="currentPassword"
          />
          <PasswordInput
            label="New Password"
            value={formData.newPassword}
            onChange={onChange}
            notMatch={[formData.currentPassword]}
            name="newPassword"
            showStrength
            passwordStrength={passwordStrength}
          />

          <PasswordInput
            label="Confirm New Password"
            value={formData.confirmPassword}
            onChange={onChange}
            name="confirmPassword"
            shouldMatch={[formData.newPassword]}
          />

          <Button
            text="Update Password"
            className="rounded-xl"
          />
        </motion.div>
      </motion.div>

      <motion.div
        variants={fadeInUpChild}
        className="card-hover">
        <h3 className="text-xl font-bold text-t-primary mb-6 flex">
          Two-Factor Authentication <FiLock className="ml-3" />
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-t-muted">
              Add an extra layer of security to your account
            </p>
            <p className="text-sm text-slate-400 mt-1">
              Receive codes via SMS or authenticator app
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary px-6 py-3 rounded-xl">
            Enable 2FA
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PrivacySecurity;

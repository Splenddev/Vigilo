import { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import { FiMenu } from 'react-icons/fi';
import Button from '../atoms/Button';
import Anchor from '../atoms/Anchor'; /* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from 'framer-motion';
import { fadeIn } from '../../utils/animationVariants';
import { toggleSidebar } from '../../hooks/useSidebar';
import { useAuth } from '../../hooks/useAuth';
import { useAuthStore } from '../../stores/authStore';
import Theme from './ThemeToggler';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const networkStatus = useAuthStore((s) => s.networkStatus);

  const { user, logout, loading } = useAuth();

  const { firstName = '', lastName = '' } = user;

  const catenateName = firstName.split('')[0] + lastName.split('')[0];

  const avatar = user.avatar || catenateName;

  return (
    <nav
      className={`glass sticky ${
        networkStatus === 'online' ? 'top-0' : 'sm:top-13 top-16'
      } z-40 w-full border-b border-white/10`}>
      <div className="px-2 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Logo + Menu */}
          <div className="flex items-center flex-1">
            <button
              onClick={toggleSidebar}
              className="h-10 mr-5 w-10 rounded-xl flex items-center justify-center shadow-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200">
              <FiMenu className="w-6 h-6 text-t-primary" />
            </button>
            <h1 className="text-2xl sm:text-4xl font-bold gradient-text">
              Vigilo
            </h1>
          </div>
          <Theme />

          {/* Profile Dropdown */}
          <div className="relative">
            <Button
              size="sm"
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 transition-all duration-200"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              variant="transparent">
              <div className="w-7 h-7 gradient-bg rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">{avatar}</span>
              </div>
              <LuChevronDown className="w-4 h-4 text-gray-300" />
            </Button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-2 w-48 glass-strong rounded-lg shadow-xl border border-white/20 z-50 overflow-hidden">
                  <div className="flex flex-col decoration-0 bg-bg-tertiary overflow-hidden p-2">
                    {[
                      { text: 'Courses', to: '/lecturer/courses' },
                      { text: 'Profile Settings', to: '/profile' },
                    ].map((link) => (
                      <Anchor
                        key={link.text}
                        size="sm"
                        variant="light"
                        href={link.to}
                        func={link.func}
                        className={`px-4 py-2 rounded-none text-t-primary hover:bg-white/10 transition-all   duration-200 ${
                          link.style || ''
                        }`}>
                        {link.text}
                      </Anchor>
                    ))}
                    <Button
                      variant="dangerLight"
                      func={logout}>
                      Logout
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import { FiMenu } from 'react-icons/fi';
import Button from '../atoms/Button';
import Anchor from '../atoms/Anchor';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeIn } from '../../utils/animationVariants';
import Sidebar from './Sidebar'; // ⬅️ new import

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Menu */}
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="h-9 w-9 rounded-xl flex items-center justify-center shadow-sm hover:bg-gray-100">
              <FiMenu className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="ml-3 text-xl font-semibold text-gray-900">Vigilo</h1>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <Button
              size="sm"
              className="hover:bg-gray-50"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              variant="transparent">
              <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-700">DR</span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                Dr. Rachel Chen
              </span>
              <LuChevronDown className="w-4 h-4 text-gray-500" />
            </Button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-brand-blue-light z-50 overflow-hidden">
                  <div className="flex flex-col decoration-0">
                    {[
                      { text: 'Profile Settings', to: 'profile' },
                      { text: 'Help Center', to: 'help' },
                      {
                        text: 'Sign Out',
                        func: () => alert('Logged Out'),
                        style: 'text-red-600 hover:bg-red-50',
                      },
                    ].map((link) => (
                      <Anchor
                        key={link.text}
                        size="sm"
                        variant="light"
                        href={link.to || null}
                        func={link.func}
                        className={`px-4 py-2 rounded-none ${link.style}`}>
                        {link.text}
                      </Anchor>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

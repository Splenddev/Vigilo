import { AnimatePresence, motion } from 'framer-motion';
import {
  containerVariants,
  itemVariants,
  sidebarVariants,
} from '../../utils/animationVariants';
import Anchor from '../atoms/Anchor';
import { FiActivity, FiHome, FiX } from 'react-icons/fi';
import {
  LuChevronDown,
  LuChevronRight,
  LuChevronUp,
  LuFileText,
  LuFolder,
  LuGraduationCap,
  LuLayoutDashboard,
  LuSettings,
} from 'react-icons/lu';
import { FaHome } from 'react-icons/fa';
import { useState } from 'react';
import Button from '../atoms/Button';

const groups = [{ name: 'CSC101' }, { name: 'MAT101' }];

const Sidebar = ({ isOpen, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/30 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.2 } }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
        exit="exit"
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 px-2 py-3 border-b-2 border-b-gray-200">
          <Button
            variant="transparent"
            onClick={onClose}
            size="sm"
            className="rounded-full p-0">
            <FiX className=" text-gray-700" />
          </Button>
          <h2 className="text-lg font-semibold font">Vigilo</h2>
        </div>

        {/* Links */}
        <nav className="flex flex-col mt p-1.5 min-h-[calc(100dvh-100px)] overflow-y-auto gap-1.5">
          <Anchor
            size="lg"
            variant="secondary"
            className="flex gap-3 text-[1rem]"
            href="dashboard">
            <LuLayoutDashboard className="text-[19px]" />
            Dashboard
          </Anchor>
          <Anchor
            variant="secondary"
            size="lg"
            href="sessions"
            className="flex gap-3 text-[1rem]">
            <LuFileText className="text-[19px]" /> Sessions
          </Anchor>
          <section>
            <Anchor
              variant="secondary"
              size="lg"
              href={'groups'}
              className="flex gap-3 text-[1rem]"
              func={() => setIsExpanded((p) => !p)}>
              <LuGraduationCap className="text-[19px]" />
              <span className="flex-1">Groups</span>
              <span className="text-danger-dark h-6 w-6 flex items-center justify-center text-[14px] rounded-full bg-red-100">
                {groups.length}
              </span>
              {isExpanded ? <LuChevronUp /> : <LuChevronDown />}
            </Anchor>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  className="pl-7.5 overflow-hidden"
                  key="groups-container"
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  variants={containerVariants}>
                  {groups.map((g) => (
                    <motion.div
                      key={g.name}
                      variants={itemVariants}
                      className="mt-1">
                      <Anchor
                        variant="secondary"
                        size="lg"
                        href={`groups/${g.name}`}
                        className="flex text-[1rem]">
                        <span className="flex-1">{g.name}</span>
                        <LuChevronRight />
                      </Anchor>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </nav>
        <section className="mt-auto border-t border-gray-300">
          <Anchor
            // variant="light"
            size="lg"
            href="/settings"
            className="flex  gap-3 text-[1rem]">
            <LuSettings className="text-[19px]" />
            Settings
          </Anchor>
        </section>
      </motion.aside>
    </>
  );
};

export default Sidebar;

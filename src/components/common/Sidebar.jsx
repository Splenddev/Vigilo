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
  LuGraduationCap,
  LuLayoutDashboard,
  LuLogOut,
  LuPlus,
  LuSettings,
} from 'react-icons/lu';
import { useEffect, useRef, useState } from 'react';
import Button from '../atoms/Button';
import { useLocation } from 'react-router-dom';

const groups = [{ name: 'CSC101' }, { name: 'MAT101' }];
const sessions = [{ value: 'New session', icon: LuPlus }];

const Sidebar = ({ isOpen, onClose }) => {
  const [isExpanded, setIsExpanded] = useState({
    group: false,
    session: false,
  });

  const { pathname } = useLocation();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      if (isOpen) onClose?.();
      prevPath.current = pathname;
    }
  }, [pathname, isOpen, onClose]);

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
        <div className="flex items-center gap-4 p-2  border-b-2 border-b-gray-200">
          <div className="flex-1 h-14">
            <img
              className="h-full"
              src="/android-chrome-192x192.png"
            />
          </div>
          <Button
            variant="transparent"
            onClick={onClose}
            size="sm"
            className="rounded-full p-0">
            <FiX className=" text-gray-700" />
          </Button>
        </div>

        {/* Links */}
        <nav className="flex flex-col mt p-1.5 min-h-[calc(100dvh-180px)] overflow-y-auto gap-1.5">
          <Anchor
            size="md"
            className="flex gap-3 text-[1rem]"
            href="dashboard">
            <LuLayoutDashboard className="text-[19px]" />
            Dashboard
          </Anchor>
          <section>
            <Anchor
              size="md"
              href={'sessions'}
              className="flex gap-3 text-[1rem]"
              func={() =>
                setIsExpanded((p) => ({ group: false, session: !p.session }))
              }>
              <LuFileText className="text-[19px]" />
              <span className="flex-1">Sessions</span>
              <span className="text-danger-dark h-6 w-6 flex items-center justify-center text-[14px] rounded-full bg-red-100">
                {sessions.length}
              </span>
              {isExpanded.session ? <LuChevronUp /> : <LuChevronDown />}
            </Anchor>

            <AnimatePresence initial={false}>
              {isExpanded.session && (
                <motion.div
                  className="pl-7.5 overflow-hidden"
                  key="sessions-container"
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  variants={containerVariants}>
                  {sessions.map((s) => (
                    <motion.div
                      key={s.value}
                      variants={itemVariants}
                      className="mt-1">
                      <Anchor
                        size="md"
                        href="sessions/new"
                        className="flex items-center gap-2 text-[1rem]">
                        <s.icon />
                        <span className="flex-1">{s.value}</span>
                        <LuChevronRight />
                      </Anchor>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
          <section>
            <Anchor
              size="md"
              href={'groups'}
              className="flex gap-3 text-[1rem]"
              func={() =>
                setIsExpanded((p) => ({ session: false, group: !p.group }))
              }>
              <LuGraduationCap className="text-[19px]" />
              <span className="flex-1">Groups</span>
              <span className="text-danger-dark h-6 w-6 flex items-center justify-center text-[14px] rounded-full bg-red-100">
                {groups.length}
              </span>
              {isExpanded.group ? <LuChevronUp /> : <LuChevronDown />}
            </Anchor>

            <AnimatePresence initial={false}>
              {isExpanded.group && (
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
                        size="md"
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
          <Button
            variant="dangerLight"
            className="p-4 w-full ">
            <LuLogOut className="text-[19px]" />
            Log out
          </Button>
          <Anchor
            variant="light"
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

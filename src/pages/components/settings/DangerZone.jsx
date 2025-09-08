import { useConfirmationModal } from '../../../hooks/useConfirmationModal';
import { fadeIn, fadeInUpChild, shake } from '../../../utils/animationVariants';
import { motion } from 'framer-motion';

const DangerZone = ({ user }) => {
  const { openModal } = useConfirmationModal();

  const handleDelete = () => {
    openModal({
      title: 'Delete Item',
      message: 'This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => console.log('✅ Deleted'),
      onCancel: () => console.log('❌ Cancelled'),
    });
  };
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="space-y-6">
      <motion.div
        variants={fadeInUpChild}
        whileHover="visible"
        className="border-2 border-red-500/30 rounded-2xl p-6 bg-red-500/5">
        <motion.div variants={shake}>
          <div className="flex items-center gap-3 mb-6">
            <HiOutlineExclamationCircle className="text-2xl text-red-400" />
            <h3 className="text-xl font-bold text-red-400">Danger Zone</h3>
          </div>

          <div className="space-y-6">
            {user.role === 'lecturer' ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <h4 className="font-medium text-t-primary mb-2">
                    Delete Group
                  </h4>
                  <p className="text-sm text-slate-400 mb-4">
                    Permanently delete this group and all associated data. This
                    action cannot be undone.
                  </p>
                  <button
                    onClick={handleDelete}
                    className="btn-danger px-6 py-3 rounded-xl">
                    Delete Group
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <h4 className="font-medium text-t-primary mb-2">
                    Transfer Ownership
                  </h4>
                  <p className="text-sm text-slate-400 mb-4">
                    Transfer group ownership to another lecturer or
                    co-representative.
                  </p>
                  <button className="btn-danger-light">Transfer Group</button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <h4 className="font-medium text-t-primary mb-2">
                  Leave All Groups
                </h4>
                <p className="text-sm text-slate-400 mb-4">
                  Leave all groups you're currently a member of. You can rejoin
                  if groups allow it.
                </p>
                <button className="btn-danger px-6 py-3 rounded-xl">
                  Leave All Groups
                </button>
              </div>
            )}

            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <h4 className="font-medium text-t-primary mb-2">
                Delete Account
              </h4>
              <p className="text-sm text-slate-400 mb-4">
                Permanently delete your Vigilo account and all personal data.
                This action cannot be undone.
              </p>
              <button
                onClick={handleDelete}
                className="btn-danger px-6 py-3 rounded-xl">
                Delete Account
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DangerZone;

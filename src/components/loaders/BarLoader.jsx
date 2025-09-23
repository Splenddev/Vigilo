import {motion} from 'framer-motion'

const BarLoader = ({ color }) => {
  return (
    <div 
      className="relative w-32 h-1 bg-gray-200 rounded-full overflow-hidden"
      role="progressbar"
      aria-label="Loading progress"
    >
      <motion.div
        className={`absolute inset-y-0 left-0 w-1/3 ${color} bg-current rounded-full`}
        animate={{
          x: ['-100%', '400%']
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
};

export default BarLoader
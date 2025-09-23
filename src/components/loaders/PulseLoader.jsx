import {motion} from 'framer-motion'

const PulseLoader = ({ size, color,LOADER_SIZES }) => {
  return (
    <motion.div
      className={`${LOADER_SIZES[size].loader} ${color} rounded-full bg-current`}
      animate={{
        scale: [0.8, 1.2, 0.8],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      aria-hidden="true"
    />
  );
};

export default PulseLoader
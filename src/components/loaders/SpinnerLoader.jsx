import {motion} from 'framer-motion'

const SpinnerLoader = ({ size, color,LOADER_SIZES }) => {
  return (
    <motion.div
      className={`${LOADER_SIZES[size].loader} ${color} rounded-full border-2 border-transparent border-t-current`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
      aria-hidden="true"
    />
  );
};

export default SpinnerLoader
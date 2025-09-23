import {motion} from 'framer-motion'

const DotsLoader = ({ size, color,LOADER_SIZES }) => {
  return (
    <div className="flex items-center space-x-2" role="img" aria-label="Loading dots">
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={i}
          className={`${LOADER_SIZES[size].dot} ${color} rounded-full bg-current`}
          animate={{
            y: [-4, 4, -4],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

export default DotsLoader
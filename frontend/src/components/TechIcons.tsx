import { motion } from 'framer-motion';
import { Database, Server, Code2, Layers, FileJson, Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';

const techStack = [
  { Icon: Code2, name: 'React', color: '#61DAFB', delay: 0 },
  { Icon: Server, name: 'Node.js', color: '#339933', delay: 0.1 },
  { Icon: Database, name: 'MongoDB', color: '#47A248', delay: 0.2 },
  { Icon: Layers, name: 'Express', color: '#000000', delay: 0.3 },
  { Icon: FileJson, name: 'JavaScript', color: '#F7DF1E', delay: 0.4 },
  { Icon: Terminal, name: 'TypeScript', color: '#3178C6', delay: 0.5 },
];

export const TechIcons = () => {
  const [dimensions, setDimensions] = useState({
    radius: 180,
    iconSize: 40,
    boxSize: 80,
    circleSize: 400,
    containerHeight: 500,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        // Mobile
        setDimensions({
          radius: 100,
          iconSize: 24,
          boxSize: 56,
          circleSize: 220,
          containerHeight: 300,
        });
      } else if (width < 768) {
        // Small tablets
        setDimensions({
          radius: 130,
          iconSize: 30,
          boxSize: 64,
          circleSize: 280,
          containerHeight: 380,
        });
      } else if (width < 1024) {
        // Tablets
        setDimensions({
          radius: 150,
          iconSize: 36,
          boxSize: 72,
          circleSize: 330,
          containerHeight: 440,
        });
      } else {
        // Desktop
        setDimensions({
          radius: 180,
          iconSize: 40,
          boxSize: 80,
          circleSize: 400,
          containerHeight: 500,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div 
      className="relative w-full flex items-center justify-center"
      style={{ height: `${dimensions.containerHeight}px` }}
    >
      {techStack.map(({ Icon, name, color, delay }, index) => {
        const angle = (index * 360) / techStack.length;
        const x = Math.cos((angle * Math.PI) / 180) * dimensions.radius;
        const y = Math.sin((angle * Math.PI) / 180) * dimensions.radius;

        return (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x,
              y,
            }}
            transition={{
              duration: 1,
              delay: delay,
              type: 'spring',
            }}
            whileHover={{
              scale: 1.2,
              rotate: 360,
              transition: { duration: 0.5 },
            }}
            className="absolute"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: delay,
              }}
              className="relative group"
            >
              <div
                className="rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg sm:shadow-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 sm:border-2"
                style={{
                  width: `${dimensions.boxSize}px`,
                  height: `${dimensions.boxSize}px`,
                  boxShadow: `0 ${dimensions.boxSize / 8}px ${dimensions.boxSize / 2}px ${color}40`,
                }}
              >
                <Icon
                  size={dimensions.iconSize}
                  className="text-gray-800 dark:text-white"
                  style={{ color: color }}
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              >
                {name}
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}

      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute border border-dashed sm:border-2 border-blue-300 dark:border-blue-700/30 rounded-full"
        style={{
          width: `${dimensions.circleSize}px`,
          height: `${dimensions.circleSize}px`,
        }}
      />
    </div>
  );
};